const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// ヘルスチェック
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// メイン
app.get('/', (req, res) => {
  res.json({
    message: 'Hello from ECR!',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown (Day 50 で学んだ)
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
