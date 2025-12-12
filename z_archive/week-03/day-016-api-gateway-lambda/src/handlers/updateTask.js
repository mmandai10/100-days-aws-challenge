// PUT /tasks/{id} - タスク更新

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
    // パスパラメータからIDを取得
    const taskId = event.pathParameters?.id;

    if (!taskId) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          success: false,
          error: 'Task ID is required'
        })
      };
    }

    // リクエストボディをパース
    const body = JSON.parse(event.body || '{}');

    // タスクを検索
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          success: false,
          error: 'Task not found',
          taskId: taskId
        })
      };
    }

    // タスクを更新（提供されたフィールドのみ）
    const updatedTask = {
      ...tasks[taskIndex],
      ...(body.title && { title: body.title.trim() }),
      ...(body.description !== undefined && { description: body.description.trim() }),
      ...(body.status && { status: body.status }),
      updatedAt: new Date().toISOString()
    };

    tasks[taskIndex] = updatedTask;

    console.log('Updated task:', updatedTask);

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
