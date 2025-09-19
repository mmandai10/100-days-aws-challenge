// タスク管理アプリのメインJavaScript
'use strict';

// タスクを保存する配列（後でDynamoDBに移行）
let tasks = [];
let taskIdCounter = 1;

// DOM要素の取得
const taskForm = document.getElementById('taskForm');
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const taskCategory = document.getElementById('taskCategory');
const taskPriority = document.getElementById('taskPriority');
const taskDueDate = document.getElementById('taskDueDate');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const filterBtns = document.querySelectorAll('.filter-btn');
const categoryFilter = document.getElementById('categoryFilter');

// 現在のフィルター状態
let currentFilter = 'all';
let currentCategoryFilter = '';

// ページ読み込み時の初期化
window.addEventListener('DOMContentLoaded', () => {
    loadTasksFromLocalStorage();
    renderTasks();
    updateTaskCount();
});

// LocalStorageからタスクを読み込み（一時的な実装）
function loadTasksFromLocalStorage() {
    const stored = localStorage.getItem('tasks');
    if (stored) {
        tasks = JSON.parse(stored);
        // 最大IDを見つけて、カウンターを設定
        if (tasks.length > 0) {
            taskIdCounter = Math.max(...tasks.map(t => t.id)) + 1;
        }
    }
}
// タスクを画面に表示する関数
function renderTasks() {
    // フィルタリング
    let filteredTasks = tasks.filter(task => {
        // ステータスフィルター
        if (currentFilter === 'active' && task.completed) return false;
        if (currentFilter === 'completed' && !task.completed) return false;
        
        // カテゴリーフィルター
        if (currentCategoryFilter && task.category !== currentCategoryFilter) return false;
        
        return true;
    });

    // タスクリストをクリア
    taskList.innerHTML = '';

    // タスクがない場合
    if (filteredTasks.length === 0) {
        taskList.innerHTML = '<p style="text-align:center; color:#999;">タスクがありません</p>';
        return;
    }

    // 各タスクを表示
    filteredTasks.forEach(task => {
        const taskElement = createTaskElement(task);
        taskList.appendChild(taskElement);
    });
}

// タスク数を更新する関数
function updateTaskCount() {
    const activeCount = tasks.filter(t => !t.completed).length;
    taskCount.textContent = `${activeCount} 個のタスク`;
}

// LocalStorageに保存する関数
function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// カテゴリーの日本語表示
function getCategoryLabel(category) {
    const labels = {
        work: '仕事',
        personal: '個人',
        shopping: '買い物',
        study: '学習'
    };
    return labels[category] || '';
}
// タスク要素を作成する関数
function createTaskElement(task) {
    const taskDiv = document.createElement('div');
    taskDiv.className = `task-item priority-${task.priority} ${task.completed ? 'completed' : ''}`;
    
    // 期限の表示用フォーマット
    const dueDateText = task.dueDate ? new Date(task.dueDate).toLocaleDateString('ja-JP') : '';
    
    taskDiv.innerHTML = `
        <input type="checkbox" 
               class="task-checkbox" 
               ${task.completed ? 'checked' : ''}
               data-id="${task.id}">
        <div class="task-content">
            <div class="task-title">${escapeHtml(task.title)}</div>
            ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
            <div class="task-meta">
                ${task.category ? `<span>📁 ${getCategoryLabel(task.category)}</span>` : ''}
                <span>🎯 ${task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}</span>
                ${dueDateText ? `<span>📅 ${dueDateText}</span>` : ''}
            </div>
        </div>
        <button class="delete-btn" data-id="${task.id}">削除</button>
    `;
    
    // チェックボックスのイベントリスナー
    const checkbox = taskDiv.querySelector('.task-checkbox');
    checkbox.addEventListener('change', (e) => {
        toggleTaskComplete(parseInt(e.target.dataset.id));
    });
    
    // 削除ボタンのイベントリスナー
    const deleteBtn = taskDiv.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', (e) => {
        deleteTask(parseInt(e.target.dataset.id));
    });
    
    return taskDiv;
}

// HTMLエスケープ関数（セキュリティ対策）
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// タスクの完了状態を切り替える関数
function toggleTaskComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveToLocalStorage();
        renderTasks();
        updateTaskCount();
    }
}
// タスクを削除する関数
function deleteTask(id) {
    if (confirm('このタスクを削除しますか？')) {
        tasks = tasks.filter(t => t.id !== id);
        saveToLocalStorage();
        renderTasks();
        updateTaskCount();
    }
}

// タスク追加のイベントリスナー
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // 新しいタスクオブジェクトを作成
    const newTask = {
        id: taskIdCounter++,
        title: taskTitle.value.trim(),
        description: taskDescription.value.trim(),
        category: taskCategory.value,
        priority: taskPriority.value,
        dueDate: taskDueDate.value,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    // タスクを配列に追加
    tasks.push(newTask);
    
    // 保存と表示更新
    saveToLocalStorage();
    renderTasks();
    updateTaskCount();
    
    // フォームをリセット
    taskForm.reset();
    taskPriority.value = 'medium'; // デフォルトに戻す
    
    // 成功メッセージ（一時的に表示）
    const btn = taskForm.querySelector('.add-btn');
    const originalText = btn.textContent;
    btn.textContent = '✅ 追加しました！';
    btn.style.background = '#22c55e';
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 1500);
});

// フィルターボタンのイベントリスナー
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

// カテゴリーフィルターのイベントリスナー
categoryFilter.addEventListener('change', () => {
    currentCategoryFilter = categoryFilter.value;
    renderTasks();
});