# 100 Days AWS Challenge - Learning Roadmap v2.1
## 🎯 EC系アプリ開発中心

---

## コンセプト

> **「AWSはツール。ECアプリケーション開発が主役」**

### 技術スタック
- **フロントエンド**: React
- **バックエンド**: Node.js（サーバーレス）+ Java/Spring Boot（コンテナ）
- **作成物**: ECサイト（段階的に機能追加）

### 学習アプローチ
1. **公式ワークショップ**で技術を学ぶ（フィージビリティ確保）
2. **学んだ技術**でECアプリの機能を実装
3. **両方のバックエンド**（Node.js / Java）を経験

---

## 📅 ロードマップ（12週間）

### 🟢 Phase 1: 基礎とサーバーレスEC（Week 1-4）

#### Week 1: サーバーレス基礎 + 商品カタログ

**学習（2日）**: Wild Rydes Workshop
- https://webapp.serverlessworkshops.io/
- Lambda, API Gateway, DynamoDB, Cognito の基本

**実装（3日）**: ECアプリ - 商品カタログAPI
```
作るもの:
├── GET /products - 商品一覧
├── GET /products/{id} - 商品詳細
└── POST /products - 商品登録（管理者用）

技術:
├── Lambda (Node.js)
├── API Gateway
├── DynamoDB
└── S3 (商品画像)
```

**成果物**: 商品カタログAPI（Node.js）

---

#### Week 2: 認証 + ユーザー管理

**学習（2日）**: AWS Serverless Auth Workshop
- https://github.com/aws-samples/aws-serverless-workshops/tree/master/Auth
- Cognito, JWT, IAM の深掘り

**実装（3日）**: ECアプリ - ユーザー認証
```
作るもの:
├── ユーザー登録
├── ログイン/ログアウト
├── パスワードリセット
└── ユーザープロファイル

技術:
├── Cognito User Pool
├── JWT認証
└── API Gateway Authorizer
```

**成果物**: 認証付きAPI

---

#### Week 3: ショッピングカート + 注文

**学習（1日）**: AWS Serverless Ecommerce Platform を読む
- https://github.com/aws-samples/aws-serverless-ecommerce-platform
- イベント駆動アーキテクチャの理解

**実装（4日）**: ECアプリ - カート＆注文
```
作るもの:
├── POST /cart - カートに追加
├── GET /cart - カート内容取得
├── DELETE /cart/{itemId} - カートから削除
├── POST /orders - 注文確定
└── GET /orders - 注文履歴

技術:
├── DynamoDB (カート/注文テーブル)
├── Step Functions (注文ワークフロー)
└── SNS/SQS (注文通知)
```

**成果物**: カート＆注文機能

---

#### Week 4: Reactフロントエンド

**学習（1日）**: AWS Amplify Hosting
- https://docs.amplify.aws/

**実装（4日）**: ECアプリ - Reactフロントエンド
```
作るもの:
├── 商品一覧ページ
├── 商品詳細ページ
├── カートページ
├── チェックアウトページ
├── 注文履歴ページ
└── ログイン/登録ページ

技術:
├── React (Vite)
├── AWS Amplify (Hosting)
├── Amplify Auth (Cognito連携)
└── CloudFront (CDN)
```

**成果物**: 🎉 **サーバーレスECサイト v1 完成！**

---

### 🟡 Phase 2: Java/Spring Boot版（Week 5-8）

#### Week 5: Spring Boot基礎 + 商品API

**学習（2日）**: 
- Spring Boot公式ガイド
- Day 22-24の復習（改良版）

**実装（3日）**: 商品カタログAPI（Java版）
```
作るもの:
├── Spring Boot REST API
├── Spring Data JPA
├── RDS MySQL接続
└── Docker化

技術:
├── Spring Boot 3.x
├── Spring Data JPA
├── RDS MySQL
└── Docker
```

**成果物**: 商品API（Java版）

---

#### Week 6: Spring Security + 認証

**学習（1日）**: Spring Security公式ドキュメント

**実装（4日）**: 認証システム（Java版）
```
作るもの:
├── JWT認証（Spring Security）
├── ユーザーCRUD
├── ロールベース認可
└── Cognito連携（オプション）

技術:
├── Spring Security
├── JWT (jjwt)
└── BCrypt
```

**成果物**: 認証付きAPI（Java版）

---

#### Week 7: ECSデプロイ + ALB

**学習（2日）**: Amazon ECS Workshop
- https://ecsworkshop.com/
- 必須モジュールのみ

**実装（3日）**: ECSデプロイ
```
作るもの:
├── ECRリポジトリ
├── ECSクラスター
├── Fargateサービス
├── ALB設定
└── ヘルスチェック

技術:
├── ECR
├── ECS/Fargate
├── ALB
└── CloudWatch Logs
```

**成果物**: Java APIをECSにデプロイ

---

#### Week 8: マイクロサービス化

**実装（5日）**: サービス分割
```
作るもの:
├── Product Service (Java)
├── Order Service (Java)
├── User Service (Java)
├── API Gateway統合
└── サービス間通信

技術:
├── 複数ECSサービス
├── API Gateway (HTTP API)
├── ALB パスベースルーティング
└── サービス間REST呼び出し
```

**成果物**: 🎉 **マイクロサービスEC v2 完成！**

---

### 🔵 Phase 3: 高度な機能（Week 9-11）

#### Week 9: 検索機能

**学習（1日）**: OpenSearch Service 基礎

**実装（4日）**: 商品検索
```
作るもの:
├── OpenSearch クラスター
├── 商品データ同期
├── 全文検索API
├── フィルタリング
└── React検索UI

技術:
├── OpenSearch Service
├── DynamoDB Streams（同期用）
└── Lambda（インデクサー）
```

**成果物**: 高度な検索機能

---

#### Week 10: 決済・通知

**実装（5日）**: 決済フロー（モック）
```
作るもの:
├── 決済API（Stripeモック）
├── 注文確認メール（SES）
├── 注文ステータス通知（SNS）
└── Step Functions ワークフロー

技術:
├── Step Functions
├── SES (メール)
├── SNS (通知)
└── Lambda
```

**成果物**: 決済・通知システム

---

#### Week 11: 可観測性

**学習（2日）**: One Observability Workshop（必須部分のみ）
- https://catalog.workshops.aws/observability/en-US/

**実装（3日）**: モニタリング導入
```
作るもの:
├── CloudWatch ダッシュボード
├── アラーム設定
├── X-Ray トレーシング
└── ログ集約

技術:
├── CloudWatch
├── X-Ray
└── CloudWatch Logs Insights
```

**成果物**: 運用可能なモニタリング

---

### 🟣 Phase 4: 本番準備（Week 12）

#### Week 12: 本番化 + ドキュメント

**実装（5日）**: 
```
作るもの:
├── CI/CD パイプライン（CodePipeline）
├── 環境分離（dev/prod）
├── IaC（CloudFormation or CDK）
├── セキュリティ強化
├── README / 技術ドキュメント
└── ポートフォリオ公開

技術:
├── CodePipeline
├── CodeBuild
├── CloudFormation / CDK
└── Secrets Manager
```

**成果物**: 🎉 **本番レベルECプラットフォーム完成！**

---

## 📊 最終成果物

### ECプラットフォーム機能一覧

| 機能 | Node.js版 | Java版 |
|------|-----------|--------|
| 商品カタログ | ✅ Lambda | ✅ ECS |
| ユーザー認証 | ✅ Cognito | ✅ Spring Security |
| ショッピングカート | ✅ DynamoDB | ✅ RDS |
| 注文管理 | ✅ Step Functions | ✅ ECS |
| 検索 | ✅ OpenSearch | - |
| 決済（モック） | ✅ | - |
| 通知 | ✅ SES/SNS | - |
| フロントエンド | ✅ React + Amplify | - |

### アーキテクチャ図
```
                    ┌─────────────────┐
                    │   CloudFront    │
                    └────────┬────────┘
                             │
                    ┌────────┴────────┐
                    │  React (S3)     │
                    └────────┬────────┘
                             │
              ┌──────────────┴──────────────┐
              │         API Gateway         │
              └──────────────┬──────────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
    ┌────┴────┐        ┌────┴────┐        ┌────┴────┐
    │ Lambda  │        │   ALB   │        │ Lambda  │
    │(Node.js)│        │         │        │(Search) │
    └────┬────┘        └────┬────┘        └────┬────┘
         │                  │                  │
    ┌────┴────┐        ┌────┴────┐        ┌────┴────┐
    │DynamoDB │        │ECS/Java │        │OpenSearch│
    └─────────┘        └────┬────┘        └─────────┘
                            │
                       ┌────┴────┐
                       │   RDS   │
                       └─────────┘
```

---

## 🔧 使用するAWS公式リソース

### 必須ワークショップ（検証済み）
1. **Wild Rydes** - サーバーレス基礎
2. **Serverless Auth** - 認証
3. **ECS Workshop** - コンテナ（一部）
4. **One Observability** - 監視（一部）

### 参考リソース
- [aws-serverless-ecommerce-platform](https://github.com/aws-samples/aws-serverless-ecommerce-platform) - アーキテクチャ参考
- [fourTheorem/serverless-ecommerce-workshop](https://github.com/fourTheorem/serverless-ecommerce-workshop) - 実装参考

---

## 📝 週次チェックリスト

各週の終わりに確認：

- [ ] 学習ワークショップを完了した
- [ ] 実装物が動作する
- [ ] GitHubにコミットした
- [ ] daily-log.mdを更新した
- [ ] AWSリソースをクリーンアップした（不要なもの）

---

## 💡 重要な原則

### 1. 完了を重視
- 中途半端に終わらせない
- 動くものを毎週作る

### 2. 公式リソースを活用
- 検証済みのワークショップを使う
- 動かない場合は公式ドキュメントを確認

### 3. アプリ開発が主役
- インフラは手段
- 「何を作るか」が先、「どう作るか」が後

### 4. 両方の技術を習得
- Node.js: 素早くプロトタイプ
- Java: エンタープライズ品質

---

## 🔄 更新履歴

| 日付 | バージョン | 変更内容 |
|------|-----------|----------|
| 2025-12-12 | v2.1 | EC系アプリ開発中心に改訂、ローカル環境整理 |
| 2025-12-12 | v2.0 | AWS公式ワークショップベースに改訂 |
| 2025-09-27 | v1.0 | 初版作成 |

---

## 📌 Day 1-33 の学習内容（参考）

Phase 1で学んだ内容はarchiveフォルダに保管済み。以下は再利用可能：

- **HTML/CSS/JS基礎** - Week 1
- **Lambda + API Gateway + DynamoDB** - Week 3
- **Cognito認証** - Day 18
- **Spring Boot + RDS** - Day 22-26
- **Docker + ECS/Fargate** - Day 27-30
- **ElastiCache** - Day 31（概念のみ）