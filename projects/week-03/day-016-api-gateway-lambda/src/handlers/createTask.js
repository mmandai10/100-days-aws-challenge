// POST /tasks - タスク作成
const { v4: uuidv4 } = require('uuid');

// サンプルデータ（実際はDynamoDBに保存）
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
    // リクエストボディをパース
    const body = JSON.parse(event.body || '{}');
    
    // バリデーション
    if (!body.title || body.title.trim() === '') {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          success: false,
          error: 'Title is required'
        })
      };
    }

    // 新しいタスクを作成
    const newTask = {
      id: uuidv4(),
      title: body.title.trim(),
      description: body.description?.trim() || '',
      status: body.status || 'pending',
      createdAt: new Date().toISOString()
    };

    // タスクを追加（実際はDynamoDBに保存）
    tasks.push(newTask);

    console.log('Created task:', newTask);

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        message: 'Task created successfully',
        data: newTask
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
