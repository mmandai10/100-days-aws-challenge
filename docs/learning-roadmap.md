# 100 Days AWS Challenge - ロードマップ v5.0

## コンセプト：「作る」から「仕組み化する」へ

AI時代のエンジニアとして、コードを書くだけでなく：
- **IaC** で属人化を解消
- **AI** を深く活用
- **AWS** サービスを実践的に学ぶ

---

## 【進め方】
1. 公式ドキュメントを参照
2. 一つずつ確認しながら進める（各ステップで「OK」を待つ）
3. 理解しながら進める（コピペ職人にしない）
4. daily-log.md を更新する
5. **全インフラは Terraform で管理**

---

## 全体スケジュール

| Phase | Day | テーマ | アプリ |
|-------|-----|--------|--------|
| 0 | 1-28 | ShopX EC Platform | ✅ 完了 |
| 1 | 29-50 | Terraform + AI エージェント | パーソナル AI アシスタント |
| 2 | 51-70 | RAG + Bedrock | AI ナレッジベース |
| 3 | 71-90 | 画像分析 + イベント駆動 | AI 画像/動画分析アプリ |
| 4 | 91-120 | マルチテナント + ECS | AI チャットボット SaaS |
| 5 | 121-150 | 集大成 | インフラ自動化ダッシュボード |

---

## Phase 0: ShopX EC Platform（Day 1-28）✅ 完了

**成果物:**
- フロントエンド: React + TypeScript + Vite
- バックエンド: Lambda + API Gateway + DynamoDB
- 認証: Cognito
- 決済: Stripe
- CI: GitHub Actions
- CD: Amplify Hosting
- 本番URL: https://main.d20nytcowp331l.amplifyapp.com

---

## Phase 1: パーソナル AI アシスタント（Day 29-50）🔄 進行中

### 目標
自分専用の AI アシスタントを Terraform で構築

### スケジュール

| Day | テーマ | 内容 |
|-----|--------|------|
| 29-32 | Terraform 基礎 | インストール、AWS Provider、基本リソース |
| 33-36 | Terraform 実践 | モジュール化、状態管理、ベストプラクティス |
| 37-40 | AI エージェント設計 | Claude API 復習、Tool Use、エージェント設計 |
| 41-44 | MCP サーバー構築 | MCP 完成、ツール連携（GitHub/カレンダー等） |
| 45-48 | インフラ構築 | Lambda, API Gateway, DynamoDB を Terraform で |
| 49-50 | デプロイ + 仕上げ | CI/CD、ドキュメント |

### AWS サービス
- Lambda
- API Gateway
- DynamoDB
- Bedrock
- Secrets Manager
- IAM

### 成果物
- 自分が毎日使える AI アシスタント
- 全インフラが Terraform 管理
- MCP でツール連携

---

## Phase 2: AI ナレッジベース（Day 51-70）

### 目標
ドキュメント → AI が回答するシステム

### スケジュール

| Day | テーマ | 内容 |
|-----|--------|------|
| 51-54 | RAG アーキテクチャ | Embedding、ベクトル検索の仕組み |
| 55-58 | ベクトルDB | OpenSearch Serverless 構築 |
| 59-62 | Bedrock 統合 | Claude on Bedrock、Knowledge Bases |
| 63-66 | バックエンド | Lambda、S3 アップロード処理 |
| 67-70 | フロントエンド | React、Amplify デプロイ |

### AWS サービス
- Bedrock
- OpenSearch Serverless
- S3
- Lambda
- Amplify

### 成果物
- PDF/Markdown アップロード → AI 回答
- 実務の属人化解消に応用可能

---

## Phase 3: AI 画像/動画分析アプリ（Day 71-90）

### 目標
画像/動画をアップロード → AI 分析 → 通知

### スケジュール

| Day | テーマ | 内容 |
|-----|--------|------|
| 71-74 | イベント駆動設計 | S3 イベント、EventBridge、Lambda トリガー |
| 75-78 | Rekognition | 顔検出、物体検出、テキスト抽出 |
| 79-82 | Bedrock 画像分析 | マルチモーダル、高度な画像理解 |
| 83-86 | 通知システム | SNS、Slack/メール連携 |
| 87-90 | ダッシュボード | CloudWatch、分析結果可視化 |

### AWS サービス
- Rekognition
- Bedrock
- S3
- Lambda
- SNS
- EventBridge

### 成果物
- 画像アップロード → 自動分析 → 通知
- 分析結果ダッシュボード

---

## Phase 4: AI チャットボット SaaS（Day 91-120）

### 目標
企業向けマルチテナント AI チャットボット

### スケジュール

| Day | テーマ | 内容 |
|-----|--------|------|
| 91-96 | マルチテナント設計 | テナント分離、データ設計 |
| 97-102 | 認証・認可 | Cognito、IAM ポリシー |
| 103-108 | ECS/Fargate | コンテナ構築、Terraform |
| 109-114 | MCP ツール連携 | 顧客ごとのカスタムツール |
| 115-120 | 管理画面 + 課金 | 管理ダッシュボード、Stripe |

### AWS サービス
- ECS/Fargate
- ALB
- ECR
- Cognito
- DynamoDB
- CloudWatch

### 成果物
- マルチテナント SaaS アプリ
- テナントごとデータ分離
- 実務のマルチテナント経験に直結

---

## Phase 5: インフラ自動化ダッシュボード（Day 121-150）

### 目標
自然言語でインフラを操作する集大成

### スケジュール

| Day | テーマ | 内容 |
|-----|--------|------|
| 121-126 | 自然言語 → IaC | プロンプト設計、Terraform 生成 |
| 127-132 | Step Functions | 承認フロー、状態管理 |
| 133-138 | 安全な自動実行 | CI/CD 統合、Terraform 実行 |
| 139-144 | コスト分析 AI | Cost Explorer、最適化提案 |
| 145-150 | ダッシュボード | 可視化、アラート、仕上げ |

### AWS サービス
- Step Functions
- Bedrock
- Lambda
- Cost Explorer
- CloudWatch
- IAM

### 成果物
- 自然言語 → Terraform → 承認 → 実行
- コスト分析 AI
- 全スキルの集大成

---

## プロジェクト構成

```
C:\100-days-aws-challenge\projects\
├── ai-learning/           # 12月 AI学習（完了）
├── ec-platform/           # ShopX（完了）
├── personal-assistant/    # Phase 1
├── knowledge-base/        # Phase 2
├── image-analyzer/        # Phase 3
├── chatbot-saas/          # Phase 4
└── infra-dashboard/       # Phase 5
```

---

## スキル習得マップ

```
スキル            Phase1  Phase2  Phase3  Phase4  Phase5
─────────────────────────────────────────────────────
Terraform         ████    ████    ████    ████    ████
AI/LLM            ████    ████    ████    ████    ████
Lambda            ████    ████    ████            ████
DynamoDB          ████            ████    ████
Bedrock                   ████    ████    ████    ████
ECS/Fargate                               ████
MCP               ████                    ████
RAG                       ████
マルチテナント                            ████
Step Functions                                    ████
Rekognition                       ████
EventBridge                       ████
```

---

## リソース

- Terraform Docs: https://developer.hashicorp.com/terraform/docs
- AWS Provider: https://registry.terraform.io/providers/hashicorp/aws/latest/docs
- AWS Bedrock: https://docs.aws.amazon.com/bedrock/
- Anthropic Docs: https://docs.anthropic.com
- MCP Docs: https://modelcontextprotocol.io
