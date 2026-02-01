const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

// DATABASE_URL 環境変数から接続情報を取得
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// DB 初期化（テーブル作成）
async function initDB() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Table "users" ready');
  } finally {
    client.release();
  }
}

// ヘルスチェック
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});

// ユーザー一覧
app.get('/api/users', async (req, res) => {
  const result = await pool.query('SELECT * FROM users ORDER BY id');
  res.json(result.rows);
});

// ユーザー作成
app.post('/api/users', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'name is required' });
  }
  const result = await pool.query(
    'INSERT INTO users (name) VALUES ($1) RETURNING *',
    [name]
  );
  res.status(201).json(result.rows[0]);
});

// ユーザー数
app.get('/api/users/count', async (req, res) => {
  const result = await pool.query('SELECT COUNT(*) as count FROM users');
  res.json({ count: parseInt(result.rows[0].count) });
});

const PORT = 3000;

// 起動時に DB 初期化
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`DATABASE_URL: ${process.env.DATABASE_URL ? 'set' : 'not set'}`);
  });
}).catch(err => {
  console.error('Failed to initialize DB:', err);
  process.exit(1);
});
