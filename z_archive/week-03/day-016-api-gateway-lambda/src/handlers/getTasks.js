// GET /tasks - タスク一覧取得
// このデモではメモリ内にデータを保存（実際はDynamoDBを使用）

// サンプルデータ
let tasks = [
  {
    id: '1',
    title: 'AWS SAMを学ぶ',
    description: 'Day 15で学習済み',
    status: 'completed',
    createdAt: '2025-10-25T10:00:00Z'
  },
  {
    id: '2',
    title: 'API Gatewayを理解する',
    description: 'Day 16で学習中',
    status: 'in-progress',
    createdAt: '2025-10-27T09:00:00Z'
  }
];

exports.handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));

  try {
    // クエリパラメータでフィルタリング（オプション）
    const status = event.queryStringParameters?.status;
    
    let filteredTasks = tasks;
    if (status) {
      filteredTasks = tasks.filter(task => task.status === status);
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        count: filteredTasks.length,
        data: filteredTasks
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
