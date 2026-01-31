# AI Knowledge Base

AWS Bedrock Knowledge Bases を使った RAG システム

## 機能

- ドキュメントアップロード（PDF, MD, TXT）
- 自然言語で質問 → AI が回答
- 関連ドキュメントの引用表示

## 技術スタック

- Frontend: React + Vite + Amplify Hosting
- Backend: Lambda + API Gateway
- AI/RAG: Bedrock Knowledge Bases + Claude 3
- IaC: Terraform

## プロジェクト構成

```
knowledge-base/
├── terraform/      # インフラ定義
├── lambda/         # API バックエンド
├── frontend/       # React アプリ
├── sample-docs/    # テスト用ドキュメント
└── docs/           # 設計ドキュメント
```

## セットアップ

```bash
# 1. Terraform でインフラ構築
cd terraform
terraform init
terraform apply

# 2. Lambda デプロイ（Terraform に含む）

# 3. フロントエンド
cd frontend
npm install
npm run dev
```

## 開発状況

- [ ] Terraform 基盤構築
- [ ] Knowledge Bases 設定
- [ ] Lambda API 実装
- [ ] React フロント実装
- [ ] Amplify デプロイ
