import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';

function TaskManager({ user }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  // タスク一覧を取得
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await API.get('taskapi', '/tasks');
      setTasks(response.tasks || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      alert('タスクの取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  // タスクを作成
  const createTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) {
      alert('タイトルを入力してください');
      return;
    }

    setLoading(true);
    try {
      const response = await API.post('taskapi', '/tasks', {
        body: {
          title: newTask.title,
          description: newTask.description,
          status: 'pending'
        }
      });
      
      setTasks([...tasks, response.task]);
      setNewTask({ title: '', description: '' });
      alert('タスクを作成しました！');
    } catch (error) {
      console.error('Error creating task:', error);
      alert('タスクの作成に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  // タスクを削除
  const deleteTask = async (taskId) => {
    if (!window.confirm('このタスクを削除しますか？')) return;

    setLoading(true);
    try {
      await API.del('taskapi', `/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
      alert('タスクを削除しました');
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('タスクの削除に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  // タスクのステータスを更新
  const updateTaskStatus = async (taskId, newStatus) => {
    setLoading(true);
    try {
      const response = await API.put('taskapi', `/tasks/${taskId}`, {
        body: { status: newStatus }
      });
      
      setTasks(tasks.map(task => 
        task.id === taskId ? response.task : task
      ));
    } catch (error) {
      console.error('Error updating task:', error);
      alert('タスクの更新に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  // 初回レンダリング時にタスクを取得
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* タスク作成フォーム */}
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2>新しいタスクを作成</h2>
        <form onSubmit={createTask}>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="タスクのタイトル"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              style={{ 
                width: '100%', 
                padding: '10px', 
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <textarea
              placeholder="説明（オプション）"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              style={{ 
                width: '100%', 
                padding: '10px', 
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                minHeight: '80px'
              }}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              padding: '10px 20px', 
              fontSize: '16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? '処理中...' : 'タスクを作成'}
          </button>
        </form>
      </div>

      {/* タスク一覧 */}
      <div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '15px'
        }}>
          <h2>タスク一覧 ({tasks.length}件)</h2>
          <button 
            onClick={fetchTasks}
            disabled={loading}
            style={{ 
              padding: '8px 15px',
              fontSize: '14px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            🔄 更新
          </button>
        </div>

        {loading && <p>読み込み中...</p>}

        {!loading && tasks.length === 0 && (
          <p style={{ textAlign: 'center', color: '#999' }}>
            タスクがありません。上のフォームから作成してください。
          </p>
        )}

        {!loading && tasks.map(task => (
          <div 
            key={task.id}
            style={{ 
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '10px'
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'start'
            }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 10px 0' }}>{task.title}</h3>
                {task.description && (
                  <p style={{ 
                    margin: '0 0 10px 0', 
                    color: '#666' 
                  }}>
                    {task.description}
                  </p>
                )}
                <div style={{ fontSize: '12px', color: '#999' }}>
                  作成日: {new Date(task.createdAt).toLocaleString('ja-JP')}
                </div>
              </div>

              <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: '5px',
                marginLeft: '15px'
              }}>
                <select
                  value={task.status}
                  onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                  style={{ 
                    padding: '5px',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                  }}
                >
                  <option value="pending">未着手</option>
                  <option value="in-progress">進行中</option>
                  <option value="completed">完了</option>
                </select>

                <button
                  onClick={() => deleteTask(task.id)}
                  style={{ 
                    padding: '5px 10px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  🗑️ 削除
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskManager;