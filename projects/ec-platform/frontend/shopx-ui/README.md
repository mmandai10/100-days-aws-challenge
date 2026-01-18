# 🛍️ ShopX - AI搭載ECプラットフォーム

100 Days AWS Challenge で作成したフルスタックECサイトです。

![ShopX Screenshot](https://via.placeholder.com/800x400?text=ShopX+EC+Platform)

## ✨ 主な機能

### 顧客向け機能
- 🔍 **商品検索** - キーワード、カテゴリ、価格帯でフィルタリング
- 🛒 **ショッピングカート** - 商品追加・削除、数量変更
- 💳 **注文・決済** - チェックアウトフロー（モック決済）
- 📦 **注文履歴** - 過去の注文確認、ステータス追跡
- ❤️ **お気に入り** - 気になる商品を保存
- ⭐ **レビュー機能** - 星評価とコメント投稿
- 🤖 **AIアシスタント** - Claude APIによる商品レコメンド

### 管理者機能
- 📊 **ダッシュボード** - CloudWatch連携監視
- 📝 **商品管理** - CRUD操作
- 📋 **注文管理** - ステータス更新

## 🛠️ 技術スタック

### フロントエンド
- **React 19** + TypeScript
- **Vite** - ビルドツール
- **React Router** - ルーティング
- **AWS Amplify** - 認証・ホスティング

### バックエンド
- **AWS Lambda** (Node.js) - サーバーレスAPI
- **API Gateway** - REST API
- **DynamoDB** - NoSQLデータベース
- **Cognito** - 認証・認可
- **S3** - 静的ファイルホスティング

### AI/ML
- **Claude API** (Anthropic) - AIチャットアシスタント
- **Tool Use** - 商品検索ツール連携

### インフラ
- **SAM (Serverless Application Model)** - IaC
- **CloudWatch** - 監視・ログ

## 📁 プロジェクト構成

```
ec-platform/
├── frontend/
│   └── shopx-ui/           # Reactフロントエンド
│       ├── src/
│       │   ├── api/        # API クライアント
│       │   ├── components/ # 共通コンポーネント
│       │   ├── context/    # React Context
│       │   ├── pages/      # ページコンポーネント
│       │   └── types/      # TypeScript型定義
│       └── package.json
│
└── backend-node/
    └── shopx-api/          # Lambda関数
        ├── src/handlers/   # APIハンドラー
        ├── scripts/        # ユーティリティスクリプト
        └── template.yaml   # SAMテンプレート
```

## 🚀 ローカル開発

### 必要条件
- Node.js 18+
- AWS CLI
- SAM CLI

### フロントエンド起動

```bash
cd frontend/shopx-ui
npm install
npm run dev
```

### バックエンドデプロイ

```bash
cd backend-node/shopx-api
sam build
sam deploy --guided
```

## 🌐 デプロイ済み環境

- **フロントエンド**: AWS Amplify Hosting
- **API**: API Gateway + Lambda
- **データベース**: DynamoDB

## 📱 画面一覧

| ページ | パス | 説明 |
|--------|------|------|
| ホーム | `/` | ランディングページ |
| 商品一覧 | `/products` | 検索・フィルター |
| 商品詳細 | `/products/:id` | 詳細・レビュー |
| カート | `/cart` | カート管理 |
| チェックアウト | `/checkout` | 注文確定 |
| 注文履歴 | `/orders` | 履歴確認 |
| お気に入り | `/favorites` | 保存商品 |
| AIチャット | `/chat` | レコメンド |
| 管理画面 | `/admin` | 商品・注文管理 |
| ログイン | `/login` | 認証 |
| 新規登録 | `/signup` | アカウント作成 |

## 🎯 学習ポイント

このプロジェクトで学んだこと：

1. **サーバーレスアーキテクチャ** - Lambda + API Gateway + DynamoDB
2. **認証・認可** - Cognito User Pool + JWT
3. **Single Table Design** - DynamoDBのベストプラクティス
4. **AI統合** - Claude API + Tool Use
5. **IaC** - SAMによるインフラ管理
6. **モニタリング** - CloudWatchダッシュボード

## 📄 ライセンス

MIT

---

**100 Days AWS Challenge** - Day 27 完了 🎉
