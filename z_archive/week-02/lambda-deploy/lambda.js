const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');

const app = express();

// ミドルウェア
app.use(cors());
app.use(express.json());

// ルート
app.use('/api/tasks', taskRoutes);

// ヘルスチェック
app.get('/', (req, res) => {
  res.json({ 
    message: 'Day 9 - Lambda API is running!',
    timestamp: new Date().toISOString()
  });
});

// Lambda用にエクスポート
module.exports.handler = serverless(app);