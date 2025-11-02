// PUT /tasks/{id} - タスク更新（DynamoDB版）
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand, PutCommand } = require('@aws-sdk/lib-dynamodb');

// DynamoDB クライアント初期化
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.TABLE_NAME;

exports.handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));

  try {
    // 🆕 ユーザーIDを取得
    const userId = event.requestContext?.authorizer?.claims?.sub;
    
    if (!userId) {
      return {
        statusCode: 401,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          success: false,
          error: 'Unauthorized',
          message: 'User authentication required'
        })
      };
    }

    // パスパラメータからIDを取得
    const id = event.pathParameters?.id;

    if (!id) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          success: false,
          error: 'Bad Request',
          message: 'Task ID is required'
        })
      };
    }

    // リクエストボディをパース
    const body = JSON.parse(event.body || '{}');

    // 🆕 既存のタスクを取得（userId + id）
    const getParams = {
      TableName: TABLE_NAME,
      Key: { 
        userId: userId,
        id: id 
      }
    };

    const getCommand = new GetCommand(getParams);
    const existingTask = await docClient.send(getCommand);

    // タスクが存在しない場合
    if (!existingTask.Item) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          success: false,
          error: 'Not Found',
          message: `Task with id ${id} not found`
        })
      };
    }

    // 更新されたタスクオブジェクトを作成
    const updatedTask = {
      ...existingTask.Item,
      title: body.title || existingTask.Item.title,
      description: body.description !== undefined ? body.description : existingTask.Item.description,
      status: body.status || existingTask.Item.status,
      updatedAt: new Date().toISOString()
    };

    // DynamoDBにタスクを保存
    const putParams = {
      TableName: TABLE_NAME,
      Item: updatedTask
    };

    const putCommand = new PutCommand(putParams);
    await docClient.send(putCommand);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        message: 'Task updated successfully',
        data: updatedTask
      })
    };

  } catch (error) {
    console.error('Error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: false,
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};