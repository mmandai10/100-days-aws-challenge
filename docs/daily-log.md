# 📝 Daily Progress Log - Phase 2

> EC系アプリ開発 + AI活用の学習記録

---

## 📅 2025-12-12: ロードマップ v3.0 作成

### 🔄 ロードマップ大幅改訂

**v2.1 → v3.0 の主な変更点：**

1. **Wild Rydes Workshop廃止対応**
   - serverlessworkshops.io ドメイン失効を発見
   - 代替ワークショップを調査・選定
   - Getting Started with Serverless Workshop に変更

2. **16週間構成に拡張**
   - Week 13-14: TypeScript + テスト追加
   - Week 15-16: AI活用 + サブプロジェクト追加

3. **不足スキルの補完**
   - TypeScript（フロントエンド必須）
   - テスト（Jest + JUnit + Cypress）
   - AI活用（Claude API, Copilot, MCP）

4. **最終成果物の明確化**
   - メイン: ECプラットフォーム「ShopX」
   - サブ: AIチャットアプリ、MCPサーバー、CLIツール、ポートフォリオ

### 📚 調査したリソース

**GitHub ロードマップ：**
- roadmap.sh (GitHub 6位、最も有名)
- KushalVijay/Full-Stack-Developer-Roadmap-2025
- goldbergyoni/javascript-testing-best-practices

**AWS公式ワークショップ（動作確認済み）：**
- catalog.us-east-1.prod.workshops.aws/workshops/841ce16b... (Serverless)
- catalog.workshops.aws/apigateway
- catalog.workshops.aws/complete-aws-sam
- catalog.workshops.aws/ecs-immersion-day
- catalog.workshops.aws/observability

### 💡 学び・気づき

- AWS公式ワークショップは廃止されることがある（Wild Rydes）
- フルスタックにはテストとTypeScriptが必須
- 2025年のエンジニアにはAI活用スキルが必須
- 技術の羅列より「何を作るか」が重要

### 🎯 次のステップ

1. learning-roadmap.md を v3.0 に更新
2. プロジェクト手順書を更新
3. GitHubにpush
4. Week 1 開始（Getting Started with Serverless Workshop）

---

## 📅 2025-12-12: Phase 2 開始

### 🔄 環境リセット完了

**削除したAWSリソース：**
- ECS Cluster: day30-cluster
- ALB: day30-alb + Target Groups
- ElastiCache: day31-session-redis
- RDS: day22-taskdb
- ECR: task-service, user-service
- Cognito User Pools: 4個
- Lambda Functions: 30個
- S3 Buckets: 21個
- DynamoDB Tables: 9個

**ローカル環境：**
- 古いプロジェクト → `archive/` に移動
- 新ディレクトリ構造を作成

### 💡 Phase 1 の振り返り

**持ち越す知識：**
- Lambda + API Gateway + DynamoDB パターン
- Cognito認証の概念
- Spring Boot + RDS 基礎
- Docker + ECS/Fargate デプロイ

**課題だったこと：**
- フィージビリティ確認なしで進めた
- 結果として中途半端な完了が多かった

**Phase 2 の方針：**
- AWS公式ワークショップで技術を確認
- 学んだ技術でECアプリ機能を実装
- 「完了」を重視
- テストを書く
- AIツールを活用

---
