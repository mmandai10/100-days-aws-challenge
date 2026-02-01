const express = require('express');
const app = express();
const PORT = 3000;

// 簡易的な商品データ（メモリ上）
const products = [
  { id: 1, name: 'ノートPC', price: 89800 },
  { id: 2, name: 'マウス', price: 2980 },
  { id: 3, name: 'キーボード', price: 5980 }
];

// CORS 設定（フロントエンドからのアクセス許可）
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// ヘルスチェック
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 商品一覧 API
app.get('/api/products', (req, res) => {
  console.log('[API] GET /api/products');
  res.json(products);
});

// サーバー情報（コンテナ名を表示）
app.get('/api/info', (req, res) => {
  res.json({
    hostname: require('os').hostname(),
    platform: process.platform,
    nodeVersion: process.version
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend API running on port ${PORT}`);
});
