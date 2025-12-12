# Day 16: API Gateway + Lambda - REST API構築

## 🎯 学習目標
- API Gatewayの理解
- REST APIエンドポイント設計
- Lambda関数とAPI Gatewayの連携
- CORS設定
- HTTPステータスコードの適切な使用

## 📋 作成物
タスク管理REST API
- GET /tasks - タスク一覧取得
- GET /tasks/{id} - 特定タスク取得
- POST /tasks - タスク作成
- PUT /tasks/{id} - タスク更新
- DELETE /tasks/{id} - タスク削除

## 🛠️ 使用技術
- AWS SAM
- AWS Lambda (Node.js 20.x)
- Amazon API Gateway (REST API)
- UUID (タスクID生成)

## 📁 プロジェクト構成
\\\
day-016-api-gateway-lambda/
├── template.yaml          # SAMテンプレート
├── package.json
├── src/
│   └── handlers/
│       ├── getTasks.js    # GET /tasks
│       ├── getTask.js     # GET /tasks/{id}
│       ├── createTask.js  # POST /tasks
│       ├── updateTask.js  # PUT /tasks/{id}
│       └── deleteTask.js  # DELETE /tasks/{id}
├── test/
│   └── api-test.http     # テスト用HTTPリクエスト
└── README.md
\\\

## 🚀 デプロイ手順

### 1. ビルド
\\\powershell
sam build
\\\

### 2. デプロイ
\\\powershell
sam deploy --guided --profile challenge-user
\\\

設定値:
- Stack Name: day16-api-gateway-lambda
- AWS Region: ap-northeast-1
- Confirm changes: Y
- Allow SAM CLI IAM role creation: Y
- Disable rollback: N
- Save arguments to configuration file: Y

### 3. API URLを取得
デプロイ完了後、Outputsに表示されるURLをコピー

## 🧪 テスト方法

### 方法1: VSCode REST Client
1. \	est/api-test.http\ を開く
2. \@baseUrl\ を実際のAPI URLに更新
3. 各リクエストの「Send Request」をクリック

### 方法2: curl コマンド
\\\powershell
# タスク一覧取得
curl https://YOUR-API-URL/tasks

# タスク作成
curl -X POST https://YOUR-API-URL/tasks \
  -H \"Content-Type: application/json\" \
  -d '{\"title\":\"テストタスク\",\"description\":\"説明\"}'

# タスク取得
curl https://YOUR-API-URL/tasks/1

# タスク更新
curl -X PUT https://YOUR-API-URL/tasks/1 \
  -H \"Content-Type: application/json\" \
  -d '{\"status\":\"completed\"}'

# タスク削除
curl -X DELETE https://YOUR-API-URL/tasks/1
\\\

## 📚 学習ポイント

### API Gateway
- REST APIの作成と設定
- CORS設定の重要性
- ステージ管理（prod）

### Lambda + API Gateway 連携
- イベント構造の理解
  - \event.pathParameters\: パスパラメータ
  - \event.queryStringParameters\: クエリパラメータ
  - \event.body\: リクエストボディ
- レスポンスフォーマット
  - \statusCode\: HTTPステータスコード
  - \headers\: レスポンスヘッダー
  - \ody\: JSON文字列

### HTTPステータスコード
- 200: 成功（GET, PUT, DELETE）
- 201: 作成成功（POST）
- 400: バリデーションエラー
- 404: リソースが見つからない
- 500: サーバーエラー

### CORS
- ブラウザからのAPIアクセスに必須
- \Access-Control-Allow-Origin\: リクエスト元
- \Access-Control-Allow-Methods\: 許可するHTTPメソッド
- \Access-Control-Allow-Headers\: 許可するヘッダー

## 🔍 動作確認

### 1. タスク一覧取得
\\\json
GET /tasks
レスポンス:
{
  \"success\": true,
  \"count\": 2,
  \"data\": [...]
}
\\\

### 2. タスク作成
\\\json
POST /tasks
リクエスト:
{
  \"title\": \"新しいタスク\",
  \"description\": \"説明\"
}
レスポンス:
{
  \"success\": true,
  \"message\": \"Task created successfully\",
  \"data\": {...}
}
\\\

## 🗑️ クリーンアップ
\\\powershell
aws cloudformation delete-stack --stack-name day16-api-gateway-lambda --profile challenge-user
\\\

## 📝 次のステップ
- Day 17: DynamoDBと統合してデータを永続化
- APIキー認証の追加
- Lambda Authorizerでカスタム認証

---
Created: 2025-10-27
Status: Completed
