# 100 Days AWS Challenge - Project Guide

## 🎯 プロジェクト概要

ECプラットフォームを段階的に構築しながら、AWSサービスを学ぶ実践型チャレンジ。

---

## 📁 ディレクトリ構造

```
C:\100-days-aws-challenge\
├── docs/                    # ドキュメント
│   ├── learning-roadmap.md  # 学習ロードマップ
│   └── project-guide.md     # このファイル
├── logs/
│   └── daily-log.md         # 日々の進捗記録
├── projects/
│   ├── ec-platform/         # メインプロジェクト
│   │   ├── frontend/        # React フロントエンド
│   │   ├── backend-node/    # Node.js サーバーレス
│   │   ├── backend-java/    # Java/Spring Boot コンテナ
│   │   └── infrastructure/  # IaC (SAM/CDK)
│   └── workshops/           # AWS公式ワークショップ
└── archive/                 # 過去のプロジェクト
```

---

## 🛠 開発環境

### 必須ツール
- **エディタ**: VS Code
- **ターミナル**: PowerShell
- **バージョン管理**: Git
- **Node.js**: v18以上
- **Java**: JDK 17以上
- **Docker**: Docker Desktop
- **AWS CLI**: v2

### VS Code 拡張機能
- AWS Toolkit
- Docker
- Spring Boot Extension Pack
- ESLint / Prettier

---

## 📋 学習の進め方

### 1. Week開始時
1. `learning-roadmap.md` で該当Weekの内容を確認
2. 必要なAWS公式ワークショップを特定
3. 作成するECアプリ機能を把握

### 2. 実装中
1. ワークショップで技術を学ぶ
2. 学んだ技術でECアプリ機能を実装
3. 各ステップで動作確認

### 3. Week終了時
1. `daily-log.md` に学びを記録
2. Git commit & push
3. 次Weekの準備

---

## 🔗 参考リソース

### AWS公式ワークショップ
- [Wild Rydes Serverless](https://webapp.serverlessworkshops.io/)
- [ECS Workshop](https://ecsworkshop.com/)
- [One Observability Workshop](https://observability.workshop.aws/)

### ドキュメント
- [AWS SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/)
- [Spring Boot Reference](https://docs.spring.io/spring-boot/docs/current/reference/html/)

---

## ⚡ よく使うコマンド

### AWS CLI
```bash
# 認証情報確認
aws sts get-caller-identity

# Lambda関数一覧
aws lambda list-functions --query 'Functions[].FunctionName'

# DynamoDBテーブル一覧
aws dynamodb list-tables
```

### Docker
```bash
# イメージビルド
docker build -t my-app .

# ECRログイン
aws ecr get-login-password | docker login --username AWS --password-stdin [ACCOUNT].dkr.ecr.[REGION].amazonaws.com
```

### Git
```bash
# 日次コミット
git add .
git commit -m "Week X Day Y: [内容]"
git push
```