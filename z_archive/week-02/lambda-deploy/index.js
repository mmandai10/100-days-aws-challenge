// 必要なモジュールをインポート
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// 環境変数を読み込み
dotenv.config();

// Expressアプリケーションを作成
const app = express();

// ポート番号
const PORT = process.env.PORT || 3000;

// ミドルウェアの設定
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// タスクルートをインポート
const taskRoutes = require('./routes/tasks');

// タスクルートを使用
app.use('/api/tasks', taskRoutes);

// ヘルスチェック用のエンドポイント
app.get('/', (req, res) => {
  res.json({ 
    message: 'Day 9 - CRUD API is running!',
    timestamp: new Date().toISOString()
  });
});

// サーバーを起動
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop the server');
});