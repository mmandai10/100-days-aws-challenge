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


## Day 11 - AWS Amplify Authentication (2025-10-11)
- ✅ AWS Amplify CLIのセットアップ完了
- ✅ Reactプロジェクトの作成（Vite使用）
- ✅ Amplify初期化（CloudFormationスタック作成）
- ✅ Cognito User Pool/Identity Pool作成
- ✅ Authenticatorコンポーネントで認証UI実装
- ✅ ユーザー登録・ログイン・ログアウト機能完成
- ✅ メール確認による2段階認証実装
- 📍 ローカル開発: http://localhost:3000
- 💡 学習ポイント:
  - Amplify CLIで自動化されたAWSリソース作成
  - Cognitoによるユーザー管理の仕組み
  - Authenticatorコンポーネントの便利さ
  - 手動実装なら数時間→Amplifyで30分
- 🛠️ 使用技術:
  - AWS Amplify
  - Amazon Cognito
  - React + Vite
  - Amplify UI Components
- ⏱️ Time: 約1時間
- 🎯 成果: プロダクションレベルの認証機能を短時間で実装


## Day 12 - Amplify + API (2025/10/25)
- ✅ Amplifyプロジェクト作成（React + Auth + API + Storage）
- ✅ Lambda関数でCRUD操作実装（DynamoDB統合）
- ✅ API Gateway + Lambda + DynamoDB のサーバーレス構成
- ✅ Node.js 18ランタイムへの変更
- ✅ AWSへのデプロイ成功
- ⏳ 技術的課題: Lambda実行時のaws-sdkモジュール認識問題（継続調査中）
- 📍 URL: https://ynikbcr9r1.execute-api.ap-northeast-1.amazonaws.com/dev
- 💡 学習: Amplifyワークフロー、サーバーレスアーキテクチャ、トラブルシューティング
- ⏱️ Time: 約4時間

## Day 13 - Amplify Storage (Photo Storage App) - 完成 (2025-10-25)
- ✅ **Status**: Completed
- 📱 **Project**: Photo Storage App
- 🛠️ **Tech Stack**: AWS Amplify + React (Vite) + Cognito + S3
- ⏱️ **Time**: 約4時間
- 📚 **Learned**: 
  - Amplify CLI完全習得（init, add auth, add storage, push）
  - Cognito User Pool認証実装
  - S3 Storage統合（uploadData, getUrl, list, remove）
  - IAMロールと権限管理の深い理解
  - React Hooks活用（useState, useEffect）
  - Amplify UI Components（Authenticator）
  - AWS SDK v6の新しいAPI
  - main.jsxとApp.jsxの役割理解
  - Viteの理解
- 🐛 **Challenges & Solutions**: 
  - IAM権限エラー（AccessDenied: s3:PutObject）
    → authRoleにAmazonS3FullAccessを追加して解決
  - Storage設定の再作成（amplify remove storage → add storage → push）
  - 認証トークンのリフレッシュ（ログアウト/ログイン）
  - aws-exports.jsの自動生成確認
- 💡 **Key Features Implemented**: 
  - ユーザー認証（サインアップ/ログイン/ログアウト）
  - 画像ファイルアップロード
  - アップロードプログレスバー
  - アップロード済み画像一覧表示
  - 画像削除機能
- 📍 **URL**: http://localhost:5173
- 🎯 **Achievement**: 完全に動作するフォトストレージアプリを構築！
- 📝 **Notes**: 
  - Day 13で学んだIAM権限管理の知識は、Day 12の課題解決にも応用可能
  - 最小権限の原則と開発環境での権限のバランスを理解
  - トラブルシューティングの粘り強さが成功につながった

## Day 12 - 継続課題 (2025-10-25)
- ⏳ **Status**: In Progress - 要修正
- 📝 **Issue**: Lambda関数が502エラー（Bad Gateway）
- 🔍 **Investigation**: 
  - Lambda実行ロールにDynamoDB権限追加済み
  - authRoleにも権限追加済み
  - まだ502エラーが継続
- 💡 **Next Steps**: 
  - Lambda関数のCloudWatchログ確認
  - DynamoDBテーブルの存在確認
  - Lambda関数のコード確認
  - API Gateway設定確認
- 📅 **To Resume**: 別の日に集中して取り組む


## Day 14: CloudFront導入とパフォーマンス最適化 (2025-10-26)

### 🎯 目標
- CloudFrontを使ったCDN配信の実装
- HTTPS化
- パフォーマンス測定と比較

### 📚 学習内容

#### CloudFront構築
- ディストリビューションの作成
- S3 Website EndpointをOriginとして設定
- HTTPS証明書（CloudFront提供）の利用
- Default root object設定（index.html）

#### キャッシュ戦略
- **CachingOptimized**ポリシー使用
- TTL: 24時間（デフォルト）
- エッジロケーション単位でキャッシュ
- キャッシュの有無は「そのエッジに最近アクセスがあったか」で決まる

#### 圧縮設定
- Gzip/Brotli圧縮有効
- テキストファイル（HTML, CSS, JS）を自動圧縮

### 📊 パフォーマンス測定結果

#### S3直接アクセス（HTTP）
- Finish: 528 ms
- Transferred: 1.0 MB
- JavaScript: 701 kB
- CSS: 316 kB

#### CloudFront経由（HTTPS）
- Finish: 279 ms（47%高速化）
- Transferred: 218 kB（78%削減）
- JavaScript: 188 kB（73%削減）
- CSS: 28.5 kB（91%削減）

### 🔧 トラブルシューティング
- 504 Gateway Timeout → Default root object未設定
- Origin再作成で解決（HTTP port 80を明示的に設定）
- キャッシュ無効化の実施

### 💡 重要な学習ポイント

#### CloudFrontを使うべきケース
- グローバルユーザー向けサービス
- 静的コンテンツが多い
- HTTPS必須
- トラフィックが多い

#### 静的 vs 動的コンテンツ
- **静的**: 誰が見ても同じ（HTML, CSS, JS, 画像）→ キャッシュ可能
- **動的**: 人によって違う（API、ユーザー固有データ）→ キャッシュ不可

### 🚀 成果物
- CloudFrontディストリビューション: d2urga0xhl8pdu.cloudfront.net
- HTTPS対応完了
- 圧縮とキャッシュによる高速化達成

### 📝 次のステップ
- Day 15以降の学習継続

# Day 15の記録をdaily-log.mdに追加
$day15Log = @"

## Day 15 - AWS SAM入門 (2025-10-26)
- ✅ **Status**: Completed
- 📁 **Project**: day15-hello-world (SAM Serverless API)
- 🛠️ **Tech Stack**: AWS SAM, Lambda (Node.js 22), API Gateway, DynamoDB
- ⏱️ **Time**: 約4時間
- 🎯 **Goal**: Infrastructure as Code による自動構築を学ぶ

### 📚 学んだこと

#### 1. AWS SAM (Serverless Application Model)
- **Infrastructure as Code の威力**
  - template.yaml だけで Lambda + API Gateway + DynamoDB + IAM が自動構築
  - 手動 Console 操作（10-15ステップ）が YAML 数行で完結
- **sam build と sam deploy の違い**
  - `sam build`: ローカルでパッケージング、依存関係解決
  - `sam deploy`: S3 にアップロード → CloudFormation でリソース作成

#### 2. API Gateway の本質理解
- **役割**: 外部ネットワークと Lambda をつなぐ HTTPS エンドポイント
- **提供機能**: ルーティング、認証、リクエスト/レスポンス変換、CORS
- **リクエストフロー**: 
```
  インターネット → API Gateway → Lambda → DynamoDB
```

#### 3. Lambda 関数の構造
- **event パラメータ**: API Gateway から渡される情報すべて
  - httpMethod, path, headers, body, pathParameters など
- **レスポンス形式**: statusCode, headers, body を返す
- **環境変数**: SAM が自動設定（`process.env.SAMPLE_TABLE`）

#### 4. DynamoDB 操作
- **scan**: テーブル全体を取得（遅い、コスト高）
- **get**: 主キー指定で1件取得（速い、コスト安）
- **put**: アイテム追加/更新
- **AWS SDK**: Lambda 関数内でデータ操作

#### 5. IAM ロールとポリシー
- **Role**: 誰が（どのサービスが）使えるか
- **Policy**: 何ができるか（具体的な操作）
- **SAM の自動作成**: DynamoDBCrudPolicy で必要な権限を自動付与

#### 6. CloudFormation 組み込み関数
- **!Ref**: リソースを参照して実際の値に置き換える
- **!Sub**: 変数を展開して文字列を作成

### 🐛 トラブルシューティング

#### 問題1: DNS 解決エラー
- **現象**: API Gateway エンドポイントに到達できない
- **原因**: CloudFormation Outputs の URL が実際と異なる（z1low vs z11ow）
- **解決**: Console から正しい URL を確認

#### 問題2: API Gateway にメソッドが表示されない
- **原因**: デプロイメントが正しく作成されていなかった
- **解決**: リソースメニューから「API をデプロイ」を手動実行

#### 問題3: AWS Academy 権限制限
- **現象**: day6-test-user では CloudFormation 権限不足
- **解決**: challenge-user プロファイルに切り替え

### ✅ 成果物

#### デプロイされたリソース
- **CloudFormation スタック**: day15-hello-world (UPDATE_COMPLETE)
- **API Gateway**: z11ow7z6e6 (REGIONAL)
- **Lambda 関数**: 3つ
  - getAllItemsFunction (GET /)
  - getByIdFunction (GET /{id})
  - putItemFunction (POST /)
- **DynamoDB テーブル**: SampleTable (id: String)
- **IAM Roles**: 各 Lambda 用に自動作成

#### API エンドポイント
- **URL**: https://z11ow7z6e6.execute-api.ap-northeast-1.amazonaws.com/Prod/
- **テスト結果**: 
  - ✅ GET / → 全アイテム取得成功
  - ✅ POST / → アイテム追加成功
  - ✅ GET /{id} → 特定アイテム取得成功

### 💡 重要な学び

1. **SAM vs AWS SDK の違い**
   - SAM = インフラ構築（建物を建てる）
   - AWS SDK = データ操作（建物の中で作業）

2. **Console テストの重要性**
   - API Gateway Console から直接テスト可能
   - DNS 問題時の代替手段として有効

3. **URL 確認の重要性**
   - CloudFormation Outputs を鵜呑みにしない
   - Console で実際の URL を必ず確認

4. **Infrastructure as Code のメリット**
   - 再現性: 同じ構成を何度でも作れる
   - 効率性: 手動作業の大幅削減
   - 一貫性: 設定ミスの防止

### 📝 次回への課題
- ❌ **Day 12**: Lambda/DynamoDB エラーが未解決（502 エラー継続）
- ✅ **Day 15**: 完全成功

### 🔗 関連リソース
- CloudFormation スタック: day15-hello-world
- プロファイル: challenge-user
- リージョン: ap-northeast-1
"@

# ローカルのdaily-log.mdに追記
Add-Content -Path "C:\100-days-aws-challenge\progress\daily-log.md" -Value $day15Log -Encoding UTF8

Write-Host "✅ daily-log.md を更新しました！" -ForegroundColor Green


## Day 16 - API Gateway + Lambda REST API (2025-10-27)
- ✅ **Status**: Completed
- 📁 **Project**: day-016-api-gateway-lambda
- 🛠️ **Tech Stack**: AWS SAM, API Gateway, Lambda (Node.js), UUID
- ⏱️ **Time**: 3時間
- 📚 **Learned**: 
  - API Gatewayの構造理解（ステージ、リソース、メソッド）
  - REST APIエンドポイント設計（GET, POST, PUT, DELETE）
  - CORS設定の重要性
  - HTTPステータスコードの適切な使用（200, 201, 400, 404, 500）
  - Lambda関数とAPI Gatewayの連携
  - イベント構造の理解（pathParameters, queryStringParameters, body）
  - データ永続化の必要性（Lambda関数のメモリは保存されない）
  - DynamoDB vs RDS vs S3の違いと選択基準
- 🐛 **Issues**: 
  - uuidパッケージが見つからないエラー発生
  - 原因: package.jsonがプロジェクトルートにあり、Lambda関数（src/handlers/）から参照できない
  - 解決: package.jsonとnode_modulesをsrc/handlers/に移動して再デプロイ
- 💡 **Notes**: 
  - Lambda関数間でメモリは共有されない（各関数は独立したコンテナ）
  - メモリ内データは実行終了後にクリアされる
  - データを永続化するにはデータベースが必要
  - Day 17でDynamoDB統合してデータを本当に保存する
- 📍 **API URL**: https://kp9jpi3j5j.execute-api.ap-northeast-1.amazonaws.com/prod/tasks
- 🔗 **Stack**: day16-api-gateway-lambda

### Day 16で理解した重要な概念

#### API Gatewayの3層構造
1. **ステージ (Stage)**: デプロイ先の環境（dev, test, prod）
2. **リソース (Resources)**: URLパスの構造（/tasks, /tasks/{id}）
3. **メソッド (Methods)**: HTTP操作（GET, POST, PUT, DELETE）

#### データベース選択基準
- **DynamoDB**: NoSQL、高速、サーバーレス、シンプルなクエリ
- **RDS/Aurora**: SQL、複雑なクエリ、トランザクション、JOIN処理
- **S3**: ファイルストレージ、画像/動画、バックアップ

#### Lambda関数の制約
- 各関数は独立したメモリ空間
- 実行終了後にメモリクリア
- データ永続化には外部ストレージ（DB）が必須

### 次のステップ
- Day 17: DynamoDB CRUD - データを本当に保存する
- Day 22-28: Java + Spring Boot + RDS - 


## Day 17 - DynamoDB CRUD (2025-11-02)
- ✅ **Status**: Completed
- 📁 **Project**: day17-dynamodb-crud
- 🛠️ **Tech Stack**: Lambda + API Gateway + DynamoDB + AWS SAM
- ⏱️ **Time**: 約4時間
- 📚 **Learned**: 
  - DynamoDBテーブル設計（パーティションキー）
  - AWS SDK v3の使い方（@aws-sdk/client-dynamodb, @aws-sdk/lib-dynamodb）
  - DynamoDB CRUD操作実装
    - PutCommand（作成）
    - ScanCommand（全件取得）
    - GetCommand（1件取得）
    - PutCommand（更新）
    - DeleteCommand（削除）
  - SAMのPolicies設定（DynamoDBCrudPolicy）
  - NoSQLデータモデリングの基礎
  - Day 16のAPI構成にDynamoDBを統合
- 🎯 **Achievement**: 
  - 完全動作するCRUD APIをDynamoDBと統合
  - メモリ内データ → 永続化データベースへ移行成功
  - 全5つのエンドポイント動作確認完了
- 📍 **URL**: https://4uaqttj0pf.execute-api.ap-northeast-1.amazonaws.com/prod/tasks
- 💡 **Notes**: 
  - Day 15のSAM基礎から、実際のデータベース統合まで到達
  - Week 4（Day 24）でJava + RDSと比較予定
  - DynamoDB vs RDSの選択基準を学ぶ準備完了


  ## Day 18 - Cognito Integration (2025-11-02)
- ✅ **Status**: Completed
- 📁 **Project**: day-018-cognito-integration
- 🛠️ **Tech Stack**: Cognito + API Gateway Authorizer + Lambda + DynamoDB
- ⏱️ **Time**: 約6時間
- 📚 **Key Concepts**:
  - 認証（Authentication）vs 認可（Authorization）の違い
  - JWTトークンの仕組み
  - Cognito: 「誰か」を特定
  - Lambda: 「何ができるか」を判断
  - DynamoDB複合キー（userId + id）でデータ分離
- 🎯 **Achievement**:
  - Day 17のAPIにCognito認証を統合
  - 認証なしアクセスは401でブロック確認
  - Lambda→DynamoDB連携の動作確認完了
  - ユーザーごとのデータ完全分離を実装
- 💡 **Lessons**:
  - 概念理解より実装経験が重要
  - エラー対応が学習の大半を占めた
  - Week 4でJavaと比較して理解を深める予定
  - フロントエンドがないと実感しづらい


  # daily-log.mdに追記
@"

## Day 19 - S3 Event Processing (2025-11-03)
- ✅ **Status**: Completed
- 📁 **Project**: day-019-s3-event-processing
- 🛠️ **Tech Stack**: AWS SAM, Lambda (Node.js 22), S3, Jimp
- ⏱️ **Time**: 約6時間
- 📚 **Learned**: 
  - S3イベントトリガーの仕組み
  - Lambda関数の自動起動
  - ネイティブモジュール vs ピュアJavaScriptライブラリ
  - 画像処理パイプライン構築
  - エラーハンドリングとトラブルシューティング
  - 実務レベルの設計思考

### 🎯 作成したシステム

**画像処理パイプライン**
- S3にアップロードされた画像を自動でリサイズ
- リサイズ画像（幅800px）とサムネイル（200x200）を生成
- 処理後の画像を別のS3バケットに保存

### 🏗️ アーキテクチャ

\`\`\`
ユーザー → S3 Source Bucket → (イベント通知) → Lambda関数
                                                    ↓
                                            画像処理(Jimp)
                                                    ↓
                                          S3 Processed Bucket
                                            ├── resized/
                                            └── thumbnails/
\`\`\`

### 📋 処理フロー

1. ユーザーが画像をS3にアップロード
2. S3イベント通知がLambda関数を自動起動
3. Lambda関数内で画像処理：
   - S3から元画像を取得
   - Jimpで画像読み込み
   - リサイズ処理（幅800px、アスペクト比維持）
   - サムネイル作成（200x200、カバー）
4. 処理後の画像を別のS3バケットに保存
5. CloudWatch Logsに処理結果を記録

### 🐛 トラブルシューティング経験

#### 問題1: 循環依存エラー
- **現象**: CloudFormationデプロイが失敗
- **原因**: S3 → Lambda → S3 の循環参照
- **解決**: Lambda Eventsセクションを削除、手動でS3イベント通知を設定

#### 問題2: sharpライブラリがLambdaで動作しない
- **エラー**: \`Could not load the "sharp" module using the linux-x64 runtime\`
- **原因**: Windows開発環境でビルドされたsharpがLinux Lambdaで動作しない
- **解決策の選択肢**:
  - ❌ Docker使用: \`sam build --use-container\` (Docker未起動)
  - ✅ jimpに変更: ピュアJavaScript、プラットフォーム非依存

#### 問題3: Lambda関数が起動しない
- **現象**: 画像アップロード後、何も処理されない
- **原因**: S3イベント通知のプレフィックス設定（\`images/\`）がデフォルト値
- **解決**: プレフィックス・サフィックスを空にして全ファイルを対象化

#### 問題4: CLIでのJSON設定エラー
- **エラー**: \`Unable to load paramfile (notification-configuration.json)\`
- **原因**: PowerShellのエンコーディング問題
- **解決**: AWS Consoleから手動でイベント通知を設定

### 💡 重要な学び

#### 1. ネイティブモジュールの理解
-
## Day 19 - S3 Event Processing (2025-11-03)
- ✅ **Status**: Completed
- 📁 **Project**: day-019-s3-event-processing
- 🛠️ **Tech Stack**: AWS SAM, Lambda (Node.js 22), S3, Jimp
- ⏱️ **Time**: 約6時間
- 📚 **Learned**: 
  - S3イベントトリガーの仕組み
  - Lambda関数の自動起動
  - ネイティブモジュール vs ピュアJavaScriptライブラリ
  - 画像処理パイプライン構築
  - エラーハンドリングとトラブルシューティング
  - 実務レベルの設計思考

### 🎯 作成したシステム

**画像処理パイプライン**
- S3にアップロードされた画像を自動でリサイズ
- リサイズ画像（幅800px）とサムネイル（200x200）を生成
- 処理後の画像を別のS3バケットに保存

### 🏗️ アーキテクチャ

\\\
ユーザー → S3 Source Bucket → (イベント通知) → Lambda関数
                                                    ↓
                                            画像処理(Jimp)
                                                    ↓
                                          S3 Processed Bucket
                                            ├── resized/
                                            └── thumbnails/
\\\

### 📋 処理フロー

1. ユーザーが画像をS3にアップロード
2. S3イベント通知がLambda関数を自動起動
3. Lambda関数内で画像処理：
   - S3から元画像を取得
   - Jimpで画像読み込み
   - リサイズ処理（幅800px、アスペクト比維持）
   - サムネイル作成（200x200、カバー）
4. 処理後の画像を別のS3バケットに保存
5. CloudWatch Logsに処理結果を記録

### 🐛 トラブルシューティング経験

#### 問題1: 循環依存エラー
- **現象**: CloudFormationデプロイが失敗
- **原因**: S3 → Lambda → S3 の循環参照
- **解決**: Lambda Eventsセクションを削除、手動でS3イベント通知を設定

#### 問題2: sharpライブラリがLambdaで動作しない
- **エラー**: \Could not load the "sharp" module using the linux-x64 runtime\
- **原因**: Windows開発環境でビルドされたsharpがLinux Lambdaで動作しない
- **解決策の選択肢**:
  - ❌ Docker使用: \sam build --use-container\ (Docker未起動)
  - ✅ jimpに変更: ピュアJavaScript、プラットフォーム非依存

#### 問題3: Lambda関数が起動しない
- **現象**: 画像アップロード後、何も処理されない
- **原因**: S3イベント通知のプレフィックス設定（\images/\）がデフォルト値
- **解決**: プレフィックス・サフィックスを空にして全ファイルを対象化

#### 問題4: CLIでのJSON設定エラー
- **エラー**: \Unable to load paramfile (notification-configuration.json)\
- **原因**: PowerShellのエンコーディング問題
- **解決**: AWS Consoleから手動でイベント通知を設定

### 💡 重要な学び

#### 1. ネイティブモジュールの理解
- **ネイティブモジュール**: C/C++で書かれたコードをNode.jsから呼び出す
- **問題**: 開発環境（Windows）と本番環境（Linux）でバイナリが異なる
- **sharp**: 高速だがプラットフォーム依存（Docker必須）
- **jimp**: 遅いがクロスプラットフォーム（Docker不要）

#### 2. S3イベント通知の動作
- バケット全体に対して設定（特定ファイルではない）
- プレフィックス・サフィックスでフィルタリング可能
- Lambda関数内でファイル種別チェックを推奨（柔軟性）

#### 3. Lambda関数の制約
- **メモリ**: 128MB〜10GB（今回512MB使用）
- **タイムアウト**: 最大15分（今回30秒）
- **一時ストレージ**: /tmp 最大10GB
- **実行環境**: Linux (Amazon Linux 2)

#### 4. エラー対応の流れ
1. エラーメッセージを正確に読む
2. CloudWatch Logsで詳細確認
3. 設定を確認（IAM権限、イベント通知）
4. 小さく分けてテスト
5. 別のアプローチを検討

### 📊 実務的な設計思考

#### システム設計のポイント
- **スケーラビリティ**: 同時に1000件処理可能
- **コスト効率**: 従量課金で無駄なし（約\/月 for 10K画像）
- **エラーハンドリング**: 失敗時の再試行、通知
- **監視**: CloudWatch Metricsでパフォーマンス監視

#### ディレクトリ構造設計
\\\
source-bucket/
  uploads/user123/profile.jpg
  uploads/user456/cover.jpg

processed-bucket/
  resized/uploads/user123/profile.jpg
  thumbnails/uploads/user123/profile.jpg
\\\

### 🎯 成果物

#### デプロイされたリソース
- **CloudFormation Stack**: day19-s3-event-processing
- **S3 Buckets**: 
  - day19-source-images-294659522793
  - day19-processed-images-294659522793
- **Lambda Function**: ImageProcessorFunction-Hq1IerE2l1Ld
- **S3 Event Notification**: all-files-upload

#### テスト結果
- ✅ 画像アップロード成功
- ✅ Lambda自動起動確認
- ✅ リサイズ画像生成（800px幅）
- ✅ サムネイル生成（200x200）
- ✅ 処理後バケットへの保存完了

### 🔗 関連Day
- Day 13: Amplify Storage（ファイルアップロード基礎）
- Day 15: AWS SAM入門
- Day 16-17: Lambda + API Gateway + DynamoDB

### 📝 次のステップ
- Day 20-21: IAM/認証システム深掘り
- 実務応用: SNS通知統合、DynamoDBメタデータ保存
- Week 4（Day 22-28）: Java + Spring Boot + RDS

### 🌟 Day 19のハイライト
エラー対応が大変だったが、その分深く学べた！
- ネイティブモジュールの仕組み理解
- 開発環境と本番環境の違い
- トラブルシューティングスキル向上
- 実務レベルの設計思考を習得

**完全に動作するサーバーレス画像処理パイプラインを構築！** 🎉

