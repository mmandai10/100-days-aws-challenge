# AI Knowledge Base デプロイ手順

## 前提条件
- AWS CLI 設定済み
- Terraform インストール済み
- Node.js 20+ インストール済み

## 手順

### 1. Lambda ビルド
```bash
cd lambda
npm install
npm run build
```

### 2. インフラデプロイ
```bash
cd terraform
terraform init
terraform apply
```

出力される値をメモ:
- `api_endpoint`: API の URL
- `frontend_bucket`: フロントエンド用 S3 バケット
- `cloudfront_url`: 公開 URL

### 3. フロントエンドビルド
```bash
cd frontend
npm install

# .env.local を作成（API エンドポイントを設定）
echo "VITE_API_ENDPOINT=<api_endpoint の値>" > .env.local

npm run build
```

### 4. フロントエンドデプロイ
```bash
# S3 にアップロード
aws s3 sync dist/ s3://<frontend_bucket> --delete

# CloudFront キャッシュ無効化
aws cloudfront create-invalidation --distribution-id <distribution_id> --paths "/*"
```

### 5. 動作確認
`cloudfront_url` にアクセスして動作確認

## ローカル開発
```bash
cd frontend
npm run dev
```
http://localhost:3000 でアクセス（DEMO モード）
