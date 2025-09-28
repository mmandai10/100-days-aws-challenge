// Day 8 - Serverless Blog Frontend JavaScript
console.log('🚀 Blog Platform Started!');

// API Gateway のエンドポイント
const API_ENDPOINT = 'https://stns0klxn2.execute-api.ap-northeast-1.amazonaws.com/prod';

// ページ読み込み時に記事一覧を取得
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM loaded, fetching posts...');
    loadPosts();
    
    // フォームのsubmitイベントを設定
    const form = document.getElementById('new-post');
    form.addEventListener('submit', handleSubmit);
});

// 記事一覧を取得する関数
async function loadPosts() {
    const postsContainer = document.getElementById('posts-list');
    
    try {
        console.log('📡 Fetching posts from API...');
        
        const response = await fetch(`${API_ENDPOINT}/posts`);
        const data = await response.json();
        
        // デバッグ：レスポンスの内容を確認
        console.log('Response data:', data);
        console.log('Type of data:', typeof data);
        console.log('Is Array?:', Array.isArray(data));
        
        // dataが配列でない場合の処理
        let posts = [];
        if (Array.isArray(data)) {
            posts = data;
        } else if (data && Array.isArray(data.Items)) {
            posts = data.Items;
        } else if (data && Array.isArray(data.body)) {
            posts = data.body;
        } else if (typeof data === 'string') {
            // 文字列の場合、再度パースを試みる
            try {
                posts = JSON.parse(data);
            } catch (e) {
                console.error('Failed to parse string data:', e);
                posts = [];
            }
        } else {
            console.warn('Unexpected data format:', data);
            posts = [];
        }
        
        console.log('Final posts array:', posts);
        displayPosts(posts);
        
    } catch (error) {
        console.error('❌ Error loading posts:', error);
        postsContainer.innerHTML = '<p class="error">記事の読み込みに失敗しました</p>';
    }
}

// 記事を画面に表示する関数
function displayPosts(posts) {
    const postsContainer = document.getElementById('posts-list');
    
    if (!posts || !Array.isArray(posts) || posts.length === 0) {
        postsContainer.innerHTML = '<p class="loading">まだ記事がありません</p>';
        return;
    }
    
    // 記事をHTMLに変換
    const postsHTML = posts.map(post => `
        <div class="post-item">
            <h3 class="post-title">${escapeHtml(post.title)}</h3>
            <p class="post-content">${escapeHtml(post.content)}</p>
            <div class="post-meta">
                <span>👤 ${escapeHtml(post.author)}</span>
                <span>📅 ${formatDate(post.timestamp)}</span>
            </div>
        </div>
    `).join('');
    
    postsContainer.innerHTML = postsHTML;
    console.log(`✅ Displayed ${posts.length} posts`);
}

// フォーム送信処理
async function handleSubmit(event) {
    event.preventDefault();
    console.log('📝 Submitting new post...');
    
    // フォームデータを取得
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const author = document.getElementById('author').value;
    
    const postData = {
        title: title,
        content: content,
        author: author,
        timestamp: new Date().toISOString()
    };
    
    console.log('Sending post data:', postData);
    
    try {
        // 実際のAPI呼び出し
        const response = await fetch(`${API_ENDPOINT}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData)
        });
        
        const responseData = await response.json();
        console.log('Post response:', responseData);
        
        if (response.ok) {
            showMessage('success', '記事を投稿しました！');
            document.getElementById('new-post').reset();
            loadPosts(); // 記事一覧を再読み込み
        } else {
            throw new Error('投稿に失敗しました');
        }
        
    } catch (error) {
        console.error('❌ Error posting:', error);
        showMessage('error', '投稿に失敗しました');
    }
}

// メッセージ表示関数
function showMessage(type, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = type;
    messageDiv.textContent = message;
    
    const form = document.getElementById('post-form');
    form.insertBefore(messageDiv, form.firstChild);
    
    // 3秒後に消す
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// HTMLエスケープ関数（セキュリティ対策）
function escapeHtml(text) {
    if (!text) return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, m => map[m]);
}

// 日付フォーマット関数
function formatDate(dateString) {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('ja-JP') + ' ' + date.toLocaleTimeString('ja-JP');
    } catch (e) {
        return dateString;
    }
}

console.log('✅ JavaScript loaded successfully!');