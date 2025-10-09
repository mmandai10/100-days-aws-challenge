// 特定のタスクを取得
const getTaskById = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id }
  };
  
  try {
    const result = await dynamodb.get(params).promise();
    return result.Item;
  } catch (error) {
    throw error;
  }
};

// タスクを更新
const updateTask = async (id, updates) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression: 'set title = :title, completed = :completed',
    ExpressionAttributeValues: {
      ':title': updates.title,
      ':completed': updates.completed
    },
    ReturnValues: 'ALL_NEW'
  };
  
  try {
    const result = await dynamodb.update(params).promise();
    return result.Attributes;
  } catch (error) {
    throw error;
  }
};

// タスクを削除
const deleteTask = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id }
  };
  
  try {
    await dynamodb.delete(params).promise();
    return true;
  } catch (error) {
    throw error;
  }
};

// エクスポートに追加
module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask
};