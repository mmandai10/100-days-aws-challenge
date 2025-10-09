// APIのベースURL
const API_URL = 'http://localhost:3000/api/tasks';

// ページ読み込み時にタスク一覧を取得
window.onload = () => {
    loadTasks();
};

// タスク一覧を取得
async function loadTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        displayTasks(tasks);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('taskList').innerHTML = 
            '<div class="error">エラー: APIに接続できません</div>';
    }
}

// タスクを表示
function displayTasks(tasks) {
    const taskList = document.getElementById('taskList');
    
    if (tasks.length === 0) {
        taskList.innerHTML = '<div class="no-tasks">タスクがありません</div>';
        return;
    }
    
    taskList.innerHTML = tasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}">
            <div class="task-content">
                <span class="task-title">${task.title}</span>
                <span class="task-id">ID: ${task.id}</span>
            </div>
            <div class="task-actions">
                <button onclick="toggleTask('${task.id}', ${!task.completed})" class="btn-toggle">
                    ${task.completed ? '未完了に戻す' : '完了にする'}
                </button>
                <button onclick="deleteTask('${task.id}')" class="btn-delete">削除</button>
            </div>
        </div>
    `).join('');
}

// 新しいタスクを追加
async function addTask() {
    const input = document.getElementById('taskInput');
    const title = input.value.trim();
    
    if (!title) {
        alert('タスクを入力してください');
        return;
    }
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title })
        });
        
        if (response.ok) {
            input.value = '';
            loadTasks();
        }
    } catch (error) {
        console.error('Error:', error);
        alert('タスクの追加に失敗しました');
    }
}

// タスクの完了状態を切り替え
async function toggleTask(id, completed) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed })
        });
        
        if (response.ok) {
            loadTasks();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// タスクを削除
async function deleteTask(id) {
    if (!confirm('このタスクを削除しますか？')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            loadTasks();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// 表示をクリア
function clearDisplay() {
    document.getElementById('taskList').innerHTML = '';
}