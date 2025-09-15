// ToDo App - Day 3 of 100 Days AWS Challenge

// グローバル変数
let tasks = [];
let currentFilter = 'all';

// DOM要素の取得
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const clearCompleted = document.getElementById('clearCompleted');
const filterBtns = document.querySelectorAll('.filter-btn');

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    renderTasks();
    updateStats();
});

// イベントリスナー
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

clearCompleted.addEventListener('click', () => {
    if (confirm('完了済みのタスクをすべて削除しますか？')) {
        tasks = tasks.filter(task => !task.completed);
        saveTasks();
        renderTasks();
        updateStats();
    }
});

// フィルターボタンのイベント
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

// タスク追加関数
function addTask() {
    const text = taskInput.value.trim();
    if (text === '') {
        alert('タスクを入力してください');
        return;
    }

    const task = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.unshift(task);
    taskInput.value = '';
    saveTasks();
    renderTasks();
    updateStats();
}

// タスク表示関数
function renderTasks() {
    taskList.innerHTML = '';

    // フィルタリング
    let filteredTasks = tasks;
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }

    // タスクがない場合
    if (filteredTasks.length === 0) {
        const emptyMsg = document.createElement('li');
        emptyMsg.className = 'empty-message';
        emptyMsg.textContent = 'タスクがありません';
        taskList.appendChild(emptyMsg);
        return;
    }

    // タスクを表示
    filteredTasks.forEach(task => {
        const li = createTaskElement(task);
        taskList.appendChild(li);
    });
}

// タスク要素作成関数
function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.dataset.id = task.id;

    // チェックボックス
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTask(task.id));

    // タスクテキスト
    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text;
    span.addEventListener('dblclick', () => editTask(task.id, span));

    // 削除ボタン
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '削除';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    return li;
}

// タスク完了/未完了切り替え
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
        updateStats();
    }
}

// タスク編集
function editTask(id, spanElement) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const currentText = task.text;
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'task-text editing';
    input.value = currentText;

    spanElement.replaceWith(input);
    input.focus();
    input.select();

    const saveEdit = () => {
        const newText = input.value.trim();
        if (newText && newText !== currentText) {
            task.text = newText;
            saveTasks();
        }
        renderTasks();
    };

    input.addEventListener('blur', saveEdit);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveEdit();
        } else if (e.key === 'Escape') {
            renderTasks();
        }
    });
}

// タスク削除
function deleteTask(id) {
    if (confirm('このタスクを削除しますか？')) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
        updateStats();
    }
}

// 統計更新
function updateStats() {
    const activeCount = tasks.filter(task => !task.completed).length;
    const completedCount = tasks.filter(task => task.completed).length;
    
    if (tasks.length === 0) {
        taskCount.textContent = 'タスクがありません';
    } else {
        taskCount.textContent = `${activeCount} 個の未完了 / ${tasks.length} 個のタスク`;
    }

    // 完了済みタスクがある場合のみ削除ボタンを表示
    clearCompleted.style.display = completedCount > 0 ? 'block' : 'none';
}

// LocalStorage操作
function saveTasks() {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

function loadTasks() {
    const saved = localStorage.getItem('todoTasks');
    if (saved) {
        try {
            tasks = JSON.parse(saved);
        } catch (e) {
            console.error('タスクの読み込みに失敗しました:', e);
            tasks = [];
        }
    }
}

// デバッグ用
console.log('ToDo App initialized - Day 3 of 100 Days AWS Challenge');