// GET /tasks - タスク一覧取得（DynamoDB版）
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand } = require('@aws-sdk/lib-dynamodb');

// DynamoDB クライアント初期化
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.TABLE_NAME;

exports.handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));

  try {
    // クエリパラメータでフィルタリング（オプション）
    const status = event.queryStringParameters?.status;

    // DynamoDBから全タスクを取得
    const params = {
      TableName: TABLE_NAME
    };

    const command = new ScanCommand(params);
    const result = await docClient.send(command);

    let tasks = result.Items || [];

    // ステータスでフィルタリング（オプション）
    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }

    // 作成日時でソート（新しい順）
    tasks.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        count: tasks.length,
        data: tasks
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