// DELETE /tasks/{id} - タスク削除（DynamoDB版）
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');

// DynamoDB クライアント初期化
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.TABLE_NAME;

exports.handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));

  try {
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

    // 削除前に存在確認
    const getParams = {
      TableName: TABLE_NAME,
      Key: { id }
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

    // DynamoDBからタスクを削除
    const deleteParams = {
      TableName: TABLE_NAME,
      Key: { id }
    };

    const deleteCommand = new DeleteCommand(deleteParams);
    await docClient.send(deleteCommand);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        message: 'Task deleted successfully',
        data: existingTask.Item
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