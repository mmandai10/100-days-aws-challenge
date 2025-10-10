# 📅 Daily Progress Log

## Week 0: Setup Phase
### Day 0 - 2025-09-14 (今日)
- ✅ **Status**: Completed
- 📁 **Task**: 環境構築
- ⏱️ **Time**: 2時間
- 📚 **Learned**: 
  - PowerShellでのファイル作成
  - npmの仕組み
  - Gitの基本操作
  - .gitignoreの重要性
- 💡 **Notes**: README.mdとREQUIREMENTS.mdの違いを理解

---

## Week 1: Basic Web Apps (予定)
### Day 001 - [日付]
- ⏳ **Status**: Not Started
- 📱 **Project**: [プロジェクト名]
- 🛠️ **Tech Stack**: HTML/CSS/JS
- ⏱️ **Time**: [時間]
- 📚 **Learned**: [学んだこと]
- 🐛 **Issues**: [問題点]
- 💡 **Notes**: [メモ]

## Day 1 (2025-09-14)
- Project: hello-world
- Status: Started


## Day 2 - Weather App (2025/09/14)
- ✅ OpenWeatherMap APIと連携した天気予報アプリを作成
- ✅ JavaScript非同期処理（async/await）を実装  
- ✅ 動的なDOM操作でリアルタイムデータ表示
- ✅ S3静的ウェブサイトホスティングでデプロイ
- ✅ S3パブリックアクセスブロック設定を解除して公開
- 公開URL: http://100days-challenge-day002-weather-app-2025.s3-website-ap-northeast-1.amazonaws.com
- 学習ポイント: 
  - API連携とAPIキー管理
  - クライアントサイドJavaScriptの理解
  - 同期/非同期処理の違い
  - S3の役割（ファイル配信）とブラウザでの実行

## Day 3: ToDo App (2025-09-15)
- ✅ LocalStorageを使用したToDo App作成
- ✅ CRUD機能（作成・読取・更新・削除）実装
- ✅ フィルタリング機能（全て/未完了/完了）
- ✅ S3静的ホスティングでデプロイ
- 📍 URL: http://100days-challenge-day003-todo-app-2025.s3-website-ap-northeast-1.amazonaws.com
- 💡 学習: LocalStorage API、DOM操作、S3パブリックアクセス設定

## Day 4 (2025-09-14)
## Day 4 - Weather Dashboard (2025/09/16)
- ✅ 複数都市の天気を同時表示するダッシュボード作成
- ✅ Chart.jsで気温比較グラフを実装
- ✅ LocalStorageでお気に入り都市を保存
- ✅ CSS Gridでレスポンシブレイアウト実装
- ✅ S3静的ウェブサイトホスティングで公開
- 公開URL: http://100days-challenge-day004-weather-dashboard-2025.s3-website-ap-northeast-1.amazonaws.com
- 学習ポイント:
  - 複数API呼び出しの管理
  - データ可視化（グラフ）
  - ブラウザストレージの活用
  - レスポンシブデザイン


## Day 5: Task Manager (2025-09-19)
- ✅ タスク管理アプリ作成（カテゴリー・優先度・期限管理）
- ✅ LocalStorageでデータ永続化
- ✅ フィルター機能実装（ステータス・カテゴリー）
- ✅ S3静的ホスティングでデプロイ
- 📍 URL: http://100days-challenge-day005-task-manager-2025.s3-website-ap-northeast-1.amazonaws.com
- 💡 学習: DOM操作、イベント処理、LocalStorage API、データフィルタリング
- 🔮 次回: DynamoDBと連携してクラウドストレージ化予定


## Day 6 - IAM User & Custom Policy (2025/09/20)
- ✅ IAMユーザー作成（day6-test-user）
- ✅ ユーザーグループへの追加
- ✅ アクセスキー生成とCLI設定  
- ✅ カスタムIAMポリシー作成（Day6-SelfUserAccess-Policy）
- ✅ 最小権限の原則を実装
- 学習ポイント:
  - IAMの4要素（ユーザー、グループ、ロール、ポリシー）
  - アクセスキーとシークレットキーの管理
  - カスタムポリシーのJSON構造
  - 固定リソース vs 動的変数の違い
  - セキュリティのベストプラクティス
- 📝 今後の課題: IAM全体設計（docs/learning-notes/iam-advanced-topics.md作成）
"@ -Encoding UTF8
Write-Host "✅ daily-log.md を更新しました" -ForegroundColor Green

## Day 7: Blog System (2025-09-27)
- ✅ S3静的ウェブサイトホスティングでブログシステム作成
- ✅ JSONデータ駆動型の記事管理システム実装
- ✅ バケットポリシーでパブリックアクセス設定
- ✅ レスポンシブデザインとナビゲーション機能
- ✅ 複数記事ページの動的生成
- 📍 URL: http://100days-challenge-day007-blog-system-2025.s3-website-ap-northeast-1.amazonaws.com
- 💡 学習: S3静的ホスティング、バケットポリシー、CORS問題解決、JSON連携

## Day 8 - Blog Platform (2025-09-28)
- ✅ **Status**: Completed
- 📱 **Project**: Serverless Blog Platform
- 🛠️ **Tech Stack**: Lambda + API Gateway + DynamoDB + S3
- ⏱️ **Time**: 約4時間
- 📚 **Learned**: 
  - AWS Lambda関数の作成（Node.js 18、AWS SDK v3）
  - API GatewayでREST API構築
  - DynamoDBでNoSQLデータベース操作
  - Lambdaプロキシ統合の重要性
  - CORSの設定と対応
- 🐛 **Issues & Solutions**: 
  - requireエラー → CommonJS形式に修正
  - プロキシ統合未設定 → 有効化で解決
  - API URLの更新漏れ → 正しいURLに修正
- 💡 **Notes**: サーバーレスアーキテクチャの実装完了。実際に動作するブログシステムを構築。
- 🔗 **API URL**: https://stns0klxn2.execute-api.ap-northeast-1.amazonaws.com/prod
"@ | Add-Content -Path "progress\daily-log.md"

Write-Host "✅ daily-log.md updated!" -ForegroundColor Green
## Day 8 - Serverless Blog Platform (2025-09-28) 
- ✅ **Status**: Completed
- 🌐 **Live URL**: http://day-008-blog-platform-20250928.s3-website-ap-northeast-1.amazonaws.com
- 📱 **Project**: Serverless Blog Platform
- 🛠️ **Tech Stack**: S3 + API Gateway + Lambda + DynamoDB
- ⏱️ **Time**: 約5時間
- 📚 **Learned**: 
  - サーバーレスアーキテクチャの完全実装
  - S3静的Webホスティング
  - API Gateway（REST API、CORS、プロキシ統合）
  - Lambda関数（Node.js 18、AWS SDK v3）
  - DynamoDB（NoSQLデータベース）
- 🐛 **Challenges Overcome**: 
  - requireエラー → CommonJS形式で解決
  - プロキシ統合の重要性を学習
  - CORS設定の理解と実装
- 💡 **Achievement**: 完全動作するサーバーレスブログを本番環境にデプロイ成功！


## Day 9: CRUD API with DynamoDB - 完成 (2025-10-08)
- ✅ Express APIをローカルで開発
- ✅ DynamoDBテーブル作成・連携
- ✅ Lambda関数へデプロイ成功
- ✅ API Gateway設定・公開
- ✅ サーバーレスAPIの完成

**API URL**: https://87vslu6ri1.execute-api.ap-northeast-1.amazonaws.com/default/day09-crud-api

学習内容：
- サーバーレスアーキテクチャの理解
- Lambda関数の作成とデプロイ
- API Gatewayの設定
- DynamoDBとの連携
- ローカル開発からAWSデプロイまでの流れ


## Day 10 - メモ管理API 完全版 (2025-10-09)
- ✅ Lambda + API Gateway + DynamoDB連携
- ✅ S3静的ホスティングでフロントエンド公開
- 📍 公開URL: http://day10-memo-app-yourname-2025.s3-website-ap-northeast-1.amazonaws.com
- 📍 API URL: https://zuzr1eyi5f.execute-api.ap-northeast-1.amazonaws.com/dev/memos
- 💡 完全なサーバーレスアーキテクチャを構築
- 🎯 Day 9の課題を完全に解決