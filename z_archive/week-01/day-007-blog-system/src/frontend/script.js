// ブログシステムのメイン機能
document.addEventListener('DOMContentLoaded', function() {
    loadPosts();
});

// 記事データを読み込んで表示する関数
async function loadPosts() {
    try {
        // JSONファイルから記事データを取得
        const response = await fetch('../data/posts.json');
        
        if (!response.ok) {
            throw new Error('記事データの取得に失敗しました');
        }
        
        const data = await response.json();
        displayPosts(data.posts);
        
    } catch (error) {
        console.error('エラー:', error);
        displayError();
    }
}

// 記事一覧を画面に表示する関数
function displayPosts(posts) {
    const postsContainer = document.getElementById('posts-list');
    
    if (posts.length === 0) {
        postsContainer.innerHTML = '<p>記事がありません。</p>';
        return;
    }
    
    // 記事を日付順（新しい順）でソート
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // HTMLを生成
    const postsHTML = posts.map(post => `
        <article class="post-card">
            <a href="../articles/${post.content}" class="post-title">
                ${post.title}
            </a>
            <p class="post-date">${formatDate(post.date)}</p>
            <p class="post-excerpt">${post.excerpt}</p>
        </article>
    `).join('');
    
    postsContainer.innerHTML = postsHTML;
}

// 日付を読みやすい形式にフォーマットする関数
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}年${month}月${day}日`;
}

// エラー時の表示
function displayError() {
    const postsContainer = document.getElementById('posts-list');
    postsContainer.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: #666;">
            <p>⚠️ 記事の読み込みに失敗しました</p>
            <p>しばらくしてから再度お試しください</p>
        </div>
    `;
}

// デバッグ用：コンソールにメッセージ表示
console.log('🚀 AWS Blog System Loaded!');
console.log('S3静的ホスティングで動作中...');