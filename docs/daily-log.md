# 📝 Daily Progress Log - Phase 2

> EC系アプリ開発中心の学習記録

---

## 📅 2025-12-12: Phase 2 開始

### 🔄 環境リセット完了
# 100 Days AWS Challenge - Learning Roadmap v3.0
## 🎯 中規模ECプラットフォーム + AI活用 完全版

---

## コンセプト

> **「ECプラットフォーム "ShopX" を作りながら、AI時代のフルスタックエンジニアになる」**

### 最終成果物

```
🛒 メインプロジェクト: ECプラットフォーム「ShopX」
├── 顧客向けサイト（React + TypeScript）
├── 管理者ダッシュボード（React + TypeScript）
├── 顧客API（Node.js / Lambda + DynamoDB）
├── 管理API（Java / ECS + RDS）
├── AI機能（レコメンド、チャットボット、レビュー要約）
├── 検索エンジン（OpenSearch）
├── テストスイート（Jest + JUnit + Cypress）
└── CI/CD + 監視（GitHub Actions + CloudWatch + X-Ray）

🤖 サブプロジェクト
├── AIチャットアプリ（Claude API）
├── MCPサーバー（独自ツール連携）
├── 開発支援CLIツール
└── ポートフォリオサイト（Next.js）
```

### 技術スタック

| カテゴリ | 技術 |
|---------|------|
| **フロントエンド** | React, TypeScript, Tailwind CSS, Vite |
| **バックエンド（サーバーレス）** | Node.js, Lambda, API Gateway, DynamoDB |
| **バックエンド（コンテナ）** | Java, Spring Boot, ECS/Fargate, RDS MySQL |
| **検索** | OpenSearch Service |
| **認証** | Cognito, JWT, Spring Security |
| **AI** | Claude API (Bedrock), GitHub Copilot, Claude Code |
| **テスト** | Jest, JUnit, Cypress |
| **インフラ** | Docker, SAM/CDK, CloudFormation |
| **CI/CD** | GitHub Actions, CodePipeline |
| **監視** | CloudWatch, X-Ray |

---

## 📅 ロードマップ（16週間）

```
Phase 1 (Week 1-4):   顧客向け基本機能 ────── Node.js + React
Phase 2 (Week 5-8):   管理者機能 + マイクロサービス ── Java + ECS
Phase 3 (Week 9-11):  高度な機能（検索・通知・監視）
Phase 4 (Week 12):    本番化（CI/CD・環境分離）
Phase 5 (Week 13-14): TypeScript化 + テスト強化
Phase 6 (Week 15-16): AI活用 + サブプロジェクト
```

---

## 🟢 Phase 1: 顧客向け基本機能（Week 1-4）

### Week 1: サーバーレス基礎 + 商品カタログ

**学習（2日）**: Getting Started with Serverless Workshop
- https://catalog.us-east-1.prod.workshops.aws/workshops/841ce16b-9d86-48ac-a3f6-6a1b29f95d2b
- GitHub: https://github.com/aws-samples/serverless-tasks-webapp

**実装（3日）**: 商品カタログAPI + 基本UI
```
機能:
├── GET /products - 商品一覧（ページネーション）
├── GET /products/{id} - 商品詳細
├── GET /categories - カテゴリ一覧
└── GET /products?category={id} - カテゴリ別商品

技術:
├── Lambda (Node.js)
├── API Gateway (REST API)
├── DynamoDB (商品テーブル、カテゴリテーブル)
├── S3 (商品画像)
└── React (商品一覧・詳細ページ)

AI活用:
└── GitHub Copilot でコード補完
```

**成果物**: 商品カタログ（API + UI）

---

### Week 2: 認証 + ユーザー機能

**学習（2日）**: The Amazon API Gateway Workshop
- https://catalog.workshops.aws/apigateway
- Cognito User Pool, JWT Authorizer

**実装（3日）**: ユーザー認証システム
```
機能:
├── ユーザー登録（メール確認）
├── ログイン / ログアウト
├── パスワードリセット
├── ユーザープロファイル編集
└── お気に入り商品登録

技術:
├── Cognito User Pool
├── API Gateway JWT Authorizer
├── DynamoDB (ユーザープロファイル、お気に入り)
└── React (認証フロー、プロファイル画面)

AI活用:
└── Claude Projects で設計相談
```

**成果物**: 認証システム + お気に入り機能

---

### Week 3: ショッピングカート + 注文

**学習（1日）**: The Complete AWS SAM Workshop
- https://catalog.workshops.aws/complete-aws-sam

**実装（4日）**: カート＆注文システム
```
機能:
├── カート追加 / 削除 / 数量変更
├── カート内容取得
├── 注文確定（決済モック）
├── 注文履歴閲覧
└── 注文確認メール送信

技術:
├── DynamoDB (カート、注文テーブル)
├── Step Functions (注文ワークフロー)
├── SES (注文確認メール)
├── SNS (注文通知)
└── SAM (IaC)

AI活用:
└── Claude Code でLambda関数デバッグ
```

**成果物**: カート＆注文システム

---

### Week 4: フロントエンド統合

**学習（1日）**: AWS Amplify + React
- https://docs.amplify.aws/

**実装（4日）**: 顧客向けフロントエンド完成
```
ページ:
├── ホーム（おすすめ商品）
├── 商品一覧（カテゴリ、ソート）
├── 商品詳細（画像、説明、レビュー表示）
├── カート
├── チェックアウト
├── 注文履歴
├── ユーザープロファイル
└── ログイン / 登録

技術:
├── React (Vite)
├── React Router
├── Axios / Fetch
├── Amplify Hosting
└── CloudFront (CDN)
```

**成果物**: 🎉 **顧客向けECサイト v1 完成！**

---

## 🟡 Phase 2: 管理者機能 + マイクロサービス（Week 5-8）

### Week 5: Spring Boot + 商品管理API

**学習（2日）**: 
- Spring Boot公式: https://spring.io/guides
- Spring Data JPA

**実装（3日）**: 商品管理API（Java版）
```
機能:
├── POST /admin/products - 商品登録
├── PUT /admin/products/{id} - 商品更新
├── DELETE /admin/products/{id} - 商品削除
├── POST /admin/products/{id}/images - 画像アップロード
└── GET /admin/products - 商品一覧（管理者用）

技術:
├── Spring Boot 3.x
├── Spring Data JPA
├── RDS MySQL
├── S3 (画像アップロード)
└── Docker

AI活用:
└── Copilot でSpring Bootコード生成
```

**成果物**: 商品管理API（Java版）

---

### Week 6: Spring Security + 在庫・注文管理

**学習（1日）**: Spring Security
- https://docs.spring.io/spring-security/reference/

**実装（4日）**: 認証 + 在庫・注文管理
```
機能:
├── 管理者認証（JWT）
├── ロールベース認可（ADMIN, STAFF）
├── 在庫数更新
├── 在庫アラート設定
├── 注文ステータス更新
└── 注文キャンセル

技術:
├── Spring Security
├── JWT (jjwt)
├── RDS (在庫、注文テーブル)
└── DynamoDB連携（注文同期）
```

**成果物**: 管理者認証 + 在庫・注文管理API

---

### Week 7: ECSデプロイ + マイクロサービス化

**学習（2日）**: ECS Immersion Day
- https://catalog.workshops.aws/ecs-immersion-day
- https://catalog.workshops.aws/ecs-web-application-handson/ja-JP （日本語）

**実装（3日）**: マイクロサービスデプロイ
```
サービス構成:
├── Product Service (Java/ECS) - 商品・在庫管理
├── Order Service (Java/ECS) - 注文管理
├── User Service (Node.js/Lambda) - ユーザー管理
└── API Gateway - ルーティング

技術:
├── ECR (コンテナレジストリ)
├── ECS/Fargate
├── ALB (ロードバランサー)
├── API Gateway (HTTP API)
└── CloudWatch Logs
```

**成果物**: マイクロサービスアーキテクチャ

---

### Week 8: 管理者ダッシュボード

**実装（5日）**: 管理者向けフロントエンド
```
ページ:
├── ダッシュボード（売上、注文数、人気商品）
├── 商品管理（一覧、登録、編集）
├── 在庫管理（一覧、アラート）
├── 注文管理（一覧、詳細、ステータス更新）
├── ユーザー管理（一覧、詳細）
└── 設定

技術:
├── React
├── Chart.js / Recharts（グラフ）
├── React Table（データテーブル）
├── React Hook Form（フォーム）
└── Amplify Hosting（別ドメイン）
```

**成果物**: 🎉 **管理者ダッシュボード完成！マイクロサービスEC v2！**

---

## 🔵 Phase 3: 高度な機能（Week 9-11）

### Week 9: 商品検索 + レビュー

**学習（1日）**: OpenSearch Service
- https://docs.aws.amazon.com/opensearch-service/

**実装（4日）**: 検索エンジン + レビューシステム
```
機能:
├── 全文検索（商品名、説明）
├── ファセット検索（カテゴリ、価格帯）
├── オートコンプリート
├── レビュー投稿
├── レビュー一覧表示
└── 評価平均計算

技術:
├── OpenSearch Service
├── DynamoDB Streams（商品データ同期）
├── Lambda（インデクサー）
├── DynamoDB（レビューテーブル）
└── React（検索UI、レビューUI）
```

**成果物**: 高度な検索 + レビューシステム

---

### Week 10: 決済 + 通知システム

**実装（5日）**: 決済フロー（モック）+ 通知
```
機能:
├── 決済API（Stripeモック）
├── 決済ステータス管理
├── 注文確認メール（SES）
├── 発送通知メール
├── SMS通知（SNS）
└── プッシュ通知（基盤のみ）

技術:
├── Step Functions（決済ワークフロー）
├── SES（メール）
├── SNS（SMS、通知）
├── Lambda
└── DynamoDB（通知履歴）
```

**成果物**: 決済 + 通知システム

---

### Week 11: 可観測性 + セキュリティ

**学習（2日）**: One Observability Workshop
- https://catalog.workshops.aws/observability

**実装（3日）**: モニタリング + セキュリティ強化
```
機能:
├── CloudWatchダッシュボード
├── アラーム設定（エラー率、レイテンシ）
├── X-Rayトレーシング
├── ログ集約・分析
├── WAF設定
└── セキュリティベストプラクティス適用

技術:
├── CloudWatch（メトリクス、ログ、アラーム）
├── X-Ray（分散トレーシング）
├── CloudWatch Logs Insights
├── WAF（Web Application Firewall）
└── Secrets Manager

参考:
└── OWASP Top 10
```

**成果物**: 運用可能なモニタリング基盤

---

## 🟣 Phase 4: 本番化（Week 12）

### Week 12: CI/CD + 環境分離

**実装（5日）**: 本番デプロイ準備
```
作るもの:
├── GitHub Actions ワークフロー
│   ├── テスト実行
│   ├── ビルド
│   └── デプロイ（dev/staging/prod）
├── 環境分離（dev/staging/prod）
├── IaC完成（SAM or CDK）
├── ドメイン設定（Route 53）
└── SSL証明書（ACM）

技術:
├── GitHub Actions
├── SAM / CDK
├── Route 53
├── ACM
└── Parameter Store / Secrets Manager
```

**成果物**: 🎉 **本番レベルECプラットフォーム完成！**

---

## 🟠 Phase 5: TypeScript + テスト強化（Week 13-14）

### Week 13: TypeScript移行

**学習（1日）**: TypeScript公式 + roadmap.sh
- https://www.typescriptlang.org/docs/
- https://roadmap.sh/typescript

**実装（4日）**: フロントエンドTypeScript化
```
作業:
├── React → React + TypeScript移行
├── 型定義作成（API レスポンス、Props）
├── ESLint + Prettier設定
├── 厳格モード有効化
└── Lambda関数もTypeScript化

参考:
└── 既存JSコードを段階的に移行
```

**成果物**: TypeScript化されたコードベース

---

### Week 14: テスト強化

**学習（1日）**: Testing Best Practices
- https://github.com/goldbergyoni/javascript-testing-best-practices

**実装（4日）**: テストスイート構築
```
テスト種類:
├── 単体テスト（Jest）
│   ├── Lambda関数
│   ├── React コンポーネント
│   └── ユーティリティ関数
├── 統合テスト（Jest + Supertest）
│   └── API エンドポイント
├── E2Eテスト（Cypress）
│   ├── ユーザー登録・ログイン
│   ├── 商品閲覧・検索
│   ├── カート操作
│   └── 注文フロー
└── Java テスト（JUnit + Mockito）
    ├── サービス層
    └── コントローラー層

カバレッジ目標: 80%+
```

**成果物**: 🎉 **テスト完備のプロダクションコード！**

---

## 🔴 Phase 6: AI活用 + サブプロジェクト（Week 15-16）

### Week 15: ECアプリへのAI機能追加

**学習（1日）**: Claude API / Amazon Bedrock
- https://docs.anthropic.com/
- https://docs.aws.amazon.com/bedrock/

**実装（4日）**: AI機能実装
```
機能:
├── 商品レコメンド
│   ├── 閲覧履歴ベースのおすすめ
│   └── 「この商品を見た人は...」
├── AIチャットボット
│   ├── 商品に関する質問応答
│   ├── FAQ対応
│   └── 注文サポート
├── レビュー要約
│   └── 多数のレビューをAIで要約表示
└── 商品説明自動生成（管理者向け）
    └── 画像アップロード→説明文生成

技術:
├── Claude API (Anthropic) または Amazon Bedrock
├── Lambda（AI機能用）
├── DynamoDB（閲覧履歴、会話履歴）
└── React（チャットUI、レコメンドUI）
```

**成果物**: AI機能付きECサイト

---

### Week 16: サブプロジェクト + 総仕上げ

**実装（5日）**: サブプロジェクト作成
```
作るもの:

1. AIチャットアプリ（1日）
├── Claude APIを使ったシンプルなチャット
├── ストリーミングレスポンス
└── 会話履歴保存

2. MCPサーバー（1日）
├── 独自ツールをMCPで公開
├── 例: プロジェクト管理、AWS操作
└── Claude Desktopから利用

3. 開発支援CLIツール（1日）
├── プロジェクト初期化
├── コード生成
└── npm公開

4. ポートフォリオサイト（1日）
├── Next.js + MDX
├── プロジェクト紹介
└── Vercel デプロイ

5. ドキュメント・総仕上げ（1日）
├── README整備
├── 技術ドキュメント
├── デモ動画作成
└── GitHubリポジトリ公開
```

**成果物**: 🎉🎉🎉 **フルスタック + AI エンジニア完成！！！**

---

## 📊 最終成果物サマリー

### メインプロジェクト: ECプラットフォーム「ShopX」

| 機能カテゴリ | 機能 | 技術 |
|-------------|------|------|
| **顧客向け** | 商品閲覧、検索、カート、注文、レビュー、お気に入り | Node.js, Lambda, DynamoDB |
| **管理者向け** | 商品管理、在庫管理、注文管理、ダッシュボード | Java, Spring Boot, ECS, RDS |
| **AI機能** | レコメンド、チャットボット、レビュー要約 | Claude API / Bedrock |
| **フロントエンド** | 顧客サイト、管理者ダッシュボード | React, TypeScript |
| **テスト** | 単体、統合、E2E | Jest, JUnit, Cypress |
| **インフラ** | サーバーレス + コンテナ | Lambda, ECS, API Gateway |
| **DevOps** | CI/CD、監視、IaC | GitHub Actions, CloudWatch, SAM |

### サブプロジェクト

| プロジェクト | 内容 | 技術 |
|-------------|------|------|
| AIチャットアプリ | Claude対話アプリ | Claude API, React |
| MCPサーバー | 独自ツール連携 | MCP SDK, Node.js |
| CLIツール | 開発支援 | Node.js, Commander |
| ポートフォリオ | 成果物紹介サイト | Next.js, Vercel |

---

## 🛠 使用するリソース

### AWS公式ワークショップ

| Week | ワークショップ | URL |
|------|--------------|-----|
| 1 | Getting Started with Serverless | https://catalog.us-east-1.prod.workshops.aws/workshops/841ce16b-9d86-48ac-a3f6-6a1b29f95d2b |
| 2 | The Amazon API Gateway Workshop | https://catalog.workshops.aws/apigateway |
| 3 | The Complete AWS SAM Workshop | https://catalog.workshops.aws/complete-aws-sam |
| 7 | ECS Immersion Day | https://catalog.workshops.aws/ecs-immersion-day |
| 7 | ECS Web Application ハンズオン | https://catalog.workshops.aws/ecs-web-application-handson/ja-JP |
| 11 | One Observability Workshop | https://catalog.workshops.aws/observability |

### 学習リソース

| カテゴリ | リソース | URL |
|---------|---------|-----|
| ロードマップ | roadmap.sh (Full Stack) | https://roadmap.sh/full-stack |
| ロードマップ | roadmap.sh (TypeScript) | https://roadmap.sh/typescript |
| テスト | JavaScript Testing Best Practices | https://github.com/goldbergyoni/javascript-testing-best-practices |
| フルスタック | Full-Stack-Developer-Roadmap-2025 | https://github.com/KushalVijay/Full-Stack-Developer-Roadmap-2025 |
| Spring Boot | Spring公式ガイド | https://spring.io/guides |
| React | React公式ドキュメント | https://react.dev |
| TypeScript | TypeScript公式 | https://www.typescriptlang.org/docs/ |
| Claude API | Anthropic Docs | https://docs.anthropic.com/ |
| MCP | MCP公式 | https://modelcontextprotocol.io/ |

### AI開発ツール

| ツール | 用途 | 備考 |
|--------|------|------|
| GitHub Copilot | コード補完、テスト生成 | 有料 |
| Claude Code | CLI開発、リファクタリング | Anthropic |
| Claude Projects | 設計相談、ドキュメント管理 | 今使ってる！ |
| Amazon Bedrock | 本番AI機能 | AWS統合 |

---

## 📝 週次チェックリスト

各週の終わりに確認：

- [ ] 学習ワークショップを完了した
- [ ] 実装物が動作する
- [ ] テストを書いた（可能な範囲で）
- [ ] GitHubにコミットした
- [ ] daily-log.mdを更新した
- [ ] AWSリソースをクリーンアップした（不要なもの）
- [ ] AI ツールを活用した

---

## 💡 重要な原則

### 1. 動くものを作る
- 中途半端に終わらせない
- 毎週デプロイ可能な状態を維持

### 2. テストを書く
- 機能実装と同時にテストも書く
- カバレッジ80%を目指す

### 3. AIツールを積極活用
- Copilotでコード補完
- Claude Codeでデバッグ
- 困ったらClaudeに相談

### 4. ドキュメントを残す
- README、コメント、daily-log
- 将来の自分のために

### 5. 公式リソースを信頼
- 動かない時は公式ドキュメント
- Stack Overflowより公式

---

## 🔄 更新履歴

| 日付 | バージョン | 変更内容 |
|------|-----------|----------|
| 2025-12-12 | v3.0 | 中規模EC、TypeScript、テスト、AI活用、サブプロジェクト追加 |
| 2025-12-12 | v2.2 | AWS公式ワークショップURL更新 |
| 2025-12-12 | v2.1 | EC系アプリ開発中心に改訂 |
| 2025-12-12 | v2.0 | AWS公式ワークショップベースに改訂 |
| 2025-09-27 | v1.0 | 初版作成 |

---

## 🎯 16週間後のあなた

```
✅ 中規模ECプラットフォームを設計・実装できる
✅ Node.js と Java の両方でバックエンド開発ができる
✅ React + TypeScript でモダンなフロントエンドが作れる
✅ マイクロサービスアーキテクチャを理解している
✅ AWS サーバーレス + コンテナの使い分けができる
✅ CI/CD パイプラインを構築できる
✅ テスト駆動開発ができる
✅ AI API を活用したアプリケーションが作れる
✅ Claude Code / Copilot で効率的に開発できる
✅ ポートフォリオに複数のプロジェクトがある

→ AI時代のフルスタックエンジニア！🚀
```

---

## 📌 Phase 1 開始時の持ち越し知識（Day 1-33）

Phase 1で学んだ内容は再利用可能：

- **HTML/CSS/JS基礎** - Week 1
- **Lambda + API Gateway + DynamoDB** - Week 3
- **Cognito認証** - Day 18
- **Spring Boot + RDS** - Day 22-26
- **Docker + ECS/Fargate** - Day 27-30
- **ElastiCache** - Day 31（概念のみ）

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
- `learning-roadmap.md` v2.1 に改訂

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

### 🎯 次のステップ
- Week 1: Wild Rydes Workshop → 商品カタログAPI

---

