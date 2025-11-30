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

---

## Day 20 - IAM/認証システム深掘り（概念編）(2025-11-08)
- ✅ **Status**: Completed
- 📁 **Focus**: IAM理解、STS/AssumeRole、Trust Policy、実践確認
- ⏱️ **Time**: 約5時間
- 🎯 **Learning Approach**: 「深掘り学習期間」- 実装ではなく概念と仕組みの理解に集中

### 📚 学習内容

#### 1. これまでのIAM経験の整理
- Day 6: IAMユーザー・カスタムポリシー作成の基礎
- Day 13: IAM権限エラー対応（S3 PutObject AccessDenied）
- Day 18: Cognito認証とAPI Gateway Authorizer統合
- **気づき**: 断片的な知識を体系的に整理する必要性

#### 2. IAMの全体像理解

**IAMの4要素：**
- **ユーザー**: 人間または長期的な認証情報
- **グループ**: 複数ユーザーの管理
- **ロール**: AWSサービスや一時的なアクセス（今日のメイン）
- **ポリシー**: アクセス許可の定義

**認証 vs 認可：**
- **認証（Authentication）**: 「あなたは誰ですか？」
  - Cognito User Pool
  - IAM User（アクセスキー）
  - STS（一時的な認証情報）
- **認可（Authorization）**: 「何をすることができますか？」
  - IAMポリシー
  - リソースベースポリシー
  - Lambda関数内のロジック

#### 3. STSが必要な理由（重要な理解）

**理由1: セキュリティ - 長期的な認証情報を避ける**
- 永続的なアクセスキーのリスク（漏洩時に永続的に悪用される）
- 一時的な認証情報（15分〜12時間で自動失効）
- コードに認証情報を書かなくて良い

**理由2: 最小権限の原則**
- 必要な時だけ権限を付与
- 実行終了後は権限を剥奪
- Lambda実行時のみDynamoDBアクセス可能

**理由3: 柔軟性 - 動的に権限を付与**
- ユーザーごとに異なる権限を一時的に発行
- マルチテナントアプリケーションに最適

**理由4: 監査とコンプライアンス**
- CloudTrailで完全に追跡可能
- 短時間で自動的に無効化

#### 4. AssumeRoleの概念

**AssumeRole = 「役割を一時的に引き受ける」**

比喩で理解：
- 俳優が役を演じる（撮影中だけ刑事の権限を持つ）
- 図書館の一時パス（1時間だけ書庫にアクセス）
- 来客バッジ（訪問時間中だけ社内にアクセス）

**プロセス：**
```
1. リクエスト: 「このロールを引き受けたい」
2. チェック: Trust Policy確認
3. 許可: STSが一時認証情報を発行
4. 使用: その認証情報でAWSリソースにアクセス
5. 失効: 有効期限が切れると自動的に無効化
```

#### 5. セキュリティの多層防御

**疑問**: 「一時的にでもS3アクセス権限を取得できるなら、そこが脆弱になるのでは？」

**答え**: 二重の防御構造
- **防御層1**: Trust Policy（誰がAssumeRoleできるか）
- **防御層2**: AssumeRole自体にも権限が必要
- **防御層3**: 条件付きAssumeRole（MFA、IP制限、特定リソース）
- **防御層4**: Lambda内部ロジック（userIdでフィルタリング）

#### 6. template.yamlの深掘り

**全体構造：**
- ヘッダー（CloudFormationバージョン、SAM宣言）
- Globals（全Lambda関数の共通設定）
- Resources（メインセクション - 8個のAWSリソース）
- Outputs（デプロイ後の表示情報）

**Policiesセクションの魔法：**
```yaml
Policies:
  - DynamoDBCrudPolicy:
      TableName: !Ref TasksTable
```

たった3行で、SAMが自動的に：
1. IAMロール作成
2. Trust Policy設定
3. DynamoDB権限のポリシー作成
4. CloudWatch Logs権限追加
5. Lambda関数への割り当て

#### 7. 実際のAWS環境で確認（Day 18プロジェクト）

**確認したリソース：**
- Lambda関数: `day18-cognito-integration-GetTasksFunction-0emm3Ya20D2s`
- IAMロール: `day18-cognito-integration-GetTasksFunctionRole-l7z5tkmzszeV`

**Trust Policy（信頼関係）：**
```json
{
  "Principal": { "Service": "lambda.amazonaws.com" },
  "Action": "sts:AssumeRole"
}
```
→ AWSのLambdaサービスだけがAssumeRole可能

**アタッチされたポリシー：**
- `AWSLambdaBasicExecutionRole`: CloudWatch Logs権限

**インラインポリシー：**
- `GetTasksFunctionRolePolicy0`: DynamoDB CRUD権限
  - Action: GetItem, PutItem, Query, Scan, UpdateItem, DeleteItem, BatchWriteItem, BatchGetItem, DescribeTable, ConditionCheckItem
  - Resource: `arn:aws:dynamodb:ap-northeast-1:294659522793:table/tasks-day18`のみ
  - 最小権限の原則を実装

### 💡 重要な学び

#### template.yaml vs 実際のAWS
**書いたコード（3行）：**
```yaml
Policies:
  - DynamoDBCrudPolicy:
      TableName: !Ref TasksTable
```

**SAMが自動生成したもの：**
- IAMロール × 1
- Trust Policy × 1
- Inline Policy × 1（10個のDynamoDB Action）
- Attached Policy × 1（CloudWatch Logs）

#### Lambda実行時の完全な流れ
```
API Gateway呼び出し
  ↓
Trust Policyチェック（lambda.amazonaws.com?）
  ↓
STS.AssumeRole実行
  ↓
一時認証情報発行（15分間有効）
  ↓
Lambda関数実行（DynamoDB + CloudWatch Logs）
  ↓
関数終了 → 認証情報破棄
```

#### Infrastructure as Code（IaC）の威力
- 手動設定: 2-3時間
- template.yaml: 30分で書く + 3分でデプロイ = 33分
- さらに: 再現可能、Gitで管理、削除も一発

### 🎯 Day 20の成果

**概念の完全理解：**
- ✅ IAMの4要素と役割
- ✅ 認証 vs 認可の違い
- ✅ STSとAssumeRoleの仕組み
- ✅ Trust Policyの意味
- ✅ 最小権限の原則の実装方法

**実践的スキル：**
- ✅ AWS CLIでIAMロールの確認方法
- ✅ Trust Policy、Attached Policy、Inline Policyの違い
- ✅ SAMがどのようにIAMロールを自動生成するか
- ✅ template.yamlと実際のAWSリソースの対応関係

**セキュリティ理解：**
- ✅ 多層防御の仕組み
- ✅ 一時的な認証情報の利点
- ✅ Resource制限による最小権限の実装

### 📝 復習タスク

**Day 21（明日）**: 実践で復習しながら理解を深める
**Day 28（1週間後）**: Week 4終了後の振り返りでIAM概念を確認
**Day 35（2週間後）**: Week 5終了後の全体復習
**Day 50（1ヶ月後）**: 中間振り返りで重要概念の総復習

### 🔗 関連Day
- Day 6: IAM基礎（ユーザー・ポリシー作成）
- Day 13: IAM権限トラブルシューティング
- Day 18: Cognito統合・認証実装
- Day 21: IAM深掘り実践編（予定）

### 🌟 Day 20のハイライト

**「作る」だけでなく「理解する」時間の重要性**

これまでは「動けばOK」だったが、今日は「なぜ動くのか」を深掘り。
- エラーの根本原因を理解できるようになった
- セキュリティ設計の思想が分かった
- template.yamlの裏側で何が起きているか理解できた

**Day 18で苦労したIAM権限エラーの原因が完全に理解できた！**

次は Day 21 でクロスアカウントアクセスと CloudTrail を実践します 🚀


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
  - sam build: ローカルでパッケージング、依存関係解決
  - sam deploy: S3 にアップロード → CloudFormation でリソース作成

#### 2. API Gateway の本質理解
- **役割**: 外部ネットワークと Lambda をつなぐ HTTPS エンドポイント
- **提供機能**: ルーティング、認証、リクエスト/レスポンス変換、CORS
- **リクエストフロー**: 
`
  インターネット → API Gateway → Lambda → DynamoDB
`

#### 3. Lambda 関数の構造
- **event パラメータ**: API Gateway から渡される情報すべて
  - httpMethod, path, headers, body, pathParameters など
- **レスポンス形式**: statusCode, headers, body を返す
- **環境変数**: SAM が自動設定（process.env.SAMPLE_TABLE）

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

## Day 21 - IAM/認証システム深掘り（実践編）(2025-11-09)
- ✅ **Status**: Completed
- 📁 **Focus**: CloudTrail設定、IAM実践確認、Day 20概念の復習
- ⏱️ **Time**: 約5時間
- 🎯 **Learning Approach**: 「深掘り学習期間」第2日 - 実践で理解を深める

### 📚 学習内容

#### Phase 1: CloudTrail設定（監査ログ）
- **S3バケット作成**: day21-cloudtrail-logs-294659522793
- **バケットポリシー設定**: CloudTrailがログを書き込めるように権限付与
- **CloudTrail証跡作成**: day21-iam-audit-trail
  - AWS Console経由で作成（CLI権限制限のため）
  - SSE-KMS暗号化を無効化（AWS Academy制限対応）
- **ログ記録開始**: 全AWS操作が記録されるように設定完了

#### Phase 2: Day 18プロジェクトのIAM実践確認

**確認したリソース**:
- Lambda関数: GetTasksFunction
- IAMロール: day18-cognito-integration-GetTasksFunctionRole-l7z5tkmzszeV

**1. Trust Policy（信頼ポリシー）確認** ✅
```json
{
  "Principal": { "Service": "lambda.amazonaws.com" },
  "Action": "sts:AssumeRole"
}
```
→ **理解**: lambda.amazonaws.comだけがAssumeRole可能（EC2やユーザーは不可）

**2. Attached Policy確認** ✅
- **AWSLambdaBasicExecutionRole**: CloudWatch Logsへの書き込み権限

**3. Inline Policy確認** ✅
- **GetTasksFunctionRolePolicy0**: DynamoDB CRUD権限
  - Action: GetItem, DeleteItem, PutItem, Scan, Query, UpdateItem等（10個）
  - Resource: rn:aws:dynamodb:ap-northeast-1:294659522793:table/tasks-day18 のみ
  - **最小権限の原則を実装**

#### Day 20概念の実践復習

**ARN（Amazon Resource Name）**:
- AWSリソースの一意な識別子（住所のようなもの）
- 構造: rn:aws:サービス::アカウントID:リソースタイプ/リソース名

**スタック（Stack）**:
- CloudFormationで管理されるAWSリソースのまとまり
- Day 18スタックには20個以上のリソースが含まれる

**最小権限の原則の実装確認**:
- ✅ DynamoDB操作のみ許可（S3は不可）
- ✅ tasks-day18テーブルのみアクセス可能（他のテーブルは不可）
- ✅ 必要な操作だけを許可

### 💡 重要な学び

#### 1. Trust PolicyとInline Policyの違い
- **Trust Policy**: 「誰が」このロールを使えるか
- **Inline Policy**: 「何を」できるか

#### 2. セキュリティの多層防御
```
防御層1: Trust Policy（lambda.amazonaws.comのみ）
防御層2: Inline Policy（tasks-day18のみ）
防御層3: Lambda内部ロジック（userIdフィルタリング）
```

#### 3. Infrastructure as Codeの威力
**template.yaml（3行）**:
```yaml
Policies:
  - DynamoDBCrudPolicy:
      TableName: !Ref TasksTable
```

**SAMが自動生成**:
- IAMロール
- Trust Policy
- Inline Policy（10個のAction）
- CloudWatch Logs権限

#### 4. 理解度チェック（全問正解）
- Q1: Lambda関数はS3にアクセスできる？ → **NO** ✅
- Q2: 別のDynamoDBテーブルにアクセスできる？ → **NO** ✅
- Q3: なぜ制限が必要？ → **セキュリティ向上** ✅

### 🎯 Day 21の成果

**実践的スキル習得**:
- ✅ AWS CLIでIAMロール/ポリシーの確認方法
- ✅ Trust Policy、Attached Policy、Inline Policyの違いを実物で確認
- ✅ 最小権限の原則の実装方法を理解
- ✅ CloudFormation/SAMの自動生成の仕組みを理解

**Day 20との違い**:
- Day 20: 概念理解（読んで学ぶ）
- Day 21: 実践確認（手を動かして学ぶ）

### 🔗 関連Day
- Day 6: IAM基礎（ユーザー・ポリシー作成）
- Day 13: IAM権限トラブルシューティング
- Day 18: Cognito統合・認証実装
- Day 20: IAM/認証システム深掘り（概念編）

### 📝 復習タスク
- **Day 28（1週間後）**: Week 4終了後の振り返りでIAM概念を確認
- **Day 35（2週間後）**: Week 5終了後の全体復習
- **Day 50（1ヶ月後）**: 中間振り返りで重要概念の総復習

### 🌟 Day 21のハイライト

**「理解する」ことの重要性を再確認**

Day 20で学んだ概念を、実際のAWSリソースで確認することで：
- エラーの根本原因を推測できるようになった
- なぜその設計になっているか説明できるようになった
- template.yamlの裏側で何が起きているか完全に理解できた

**最小権限の原則が、実際にどう実装されているか体験できた！**

次は Day 22 から Java + Spring Boot + RDS の学習を開始します 🚀


---

## Day 22: Spring Boot基礎 + Elastic Beanstalk初回デプロイ（2025年11月15日）

### 🎯 今日の目標
- Java 17インストール
- Spring Boot Starter Project作成
- REST APIコントローラー実装
- Elastic Beanstalk初回デプロイ成功

### ✅ 達成内容

#### 1. Java 17インストール（Chocolatey経由）
```powershell
# Chocolateyでインストール
choco install openjdk17 -y

# バージョン確認
java -version
# openjdk version "17.0.17" 2025-01-16
```

#### 2. Spring Boot Starter Project作成
- Spring Initializr使用
- 設定:
  - Project: Maven
  - Language: Java 17
  - Spring Boot: 3.5.7
  - Dependencies: Spring Web, Spring Boot DevTools

#### 3. REST APIコントローラー実装
3つのエンドポイントを実装：
```java
@RestController
public class HelloController {
    @GetMapping("/")
    public Map<String, String> root() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "running");
        response.put("message", "Welcome to Spring Boot!");
        response.put("framework", "Spring Boot 3.5.7");
        return response;
    }

    @GetMapping("/hello")
    public Map<String, String> hello() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Hello from Spring Boot!");
        response.put("day", "Day 22");
        response.put("technology", "Java 17 + Spring Boot");
        return response;
    }

    @GetMapping("/api/info")
    public Map<String, Object> apiInfo() {
        Map<String, Object> response = new HashMap<>();
        response.put("topic", "Spring Boot Basics");
        response.put("application", "100 Days AWS Challenge");
        
        Map<String, String> comparison = new HashMap<>();
        comparison.put("previous", "Node.js + Express");
        comparison.put("current", "Java + Spring Boot");
        response.put("comparison", comparison);
        response.put("day", 22);
        
        return response;
    }
}
```

#### 4. ローカルでの動作確認
```powershell
# アプリケーション起動
.\mvnw.cmd spring-boot:run

# 動作確認
curl http://localhost:8080/
curl http://localhost:8080/hello
curl http://localhost:8080/api/info
```

**結果**: 全てのエンドポイントが正常に動作 ✅

#### 5. AWS SDK for Java設定
pom.xmlに以下を追加：
```xml
<dependency>
    <groupId>software.amazon.awssdk</groupId>
    <artifactId>bom</artifactId>
    <version>2.20.0</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>
<dependency>
    <groupId>software.amazon.awssdk</groupId>
    <artifactId>s3</artifactId>
</dependency>
<dependency>
    <groupId>software.amazon.awssdk</groupId>
    <artifactId>dynamodb</artifactId>
</dependency>
```

#### 6. JARファイルのビルド
```powershell
# ビルド
.\mvnw.cmd clean package

# ファイルサイズ確認
ls target/*.jar
# day22-springboot-hello-0.0.1-SNAPSHOT.jar (36.7 MB)
```

#### 7. IAMロール作成（最大の学び）
Elastic Beanstalkデプロイに必要な2つのロールを作成：

**サービスロール** (`aws-elasticbeanstalk-service-role`):
- Elastic Beanstalk自身がAWSリソースを管理するための権限
- ポリシー:
  - `AWSElasticBeanstalkEnhancedHealth`
  - `AWSElasticBeanstalkManagedUpdatesCustomerRolePolicy`

**EC2インスタンスプロファイル** (`aws-elasticbeanstalk-ec2-role`):
- EC2インスタンス上のアプリがAWSリソースにアクセスするための権限
- ポリシー: Elastic Beanstalk - Compute

**学び**: AWS Academyでは自動作成されないため、手動で作成が必要

#### 8. Elastic Beanstalk環境作成
**設定内容**:
- アプリケーション名: `day22-springboot-app`
- 環境名: `Day22-springboot-app-env`
- プラットフォーム: Corretto 17 running on 64bit Amazon Linux 2023/4.7.1
- プリセット: 単一インスタンス（無料利用枠の対象）

**重要な学び - ポート設定**:
- Elastic Beanstalkのデフォルトポート: 5000
- Spring Bootのデフォルトポート: 8080
- **解決**: `application.properties`に`server.port=5000`を追加
```powershell
# application.propertiesを作成
Set-Content -Path "src\main\resources\application.properties" -Value "server.port=5000" -Encoding UTF8

# 再ビルド
.\mvnw.cmd clean package -DskipTests
```

#### 9. デプロイ成功！
**公開URL**: 
```
http://day22-springboot-app-env.eba-3pjjgxap.ap-northeast-1.elasticbeanstalk.com
```

**動作確認**:
- `/` → ✅ アプリケーション情報表示
- `/hello` → ✅ Hello World表示
- `/api/info` → ✅ 詳細情報（Node.js比較含む）表示

---

### 📊 Node.js（Day 16）との比較

| 項目 | Node.js + Express | Java + Spring Boot |
|------|-------------------|-------------------|
| **セットアップ時間** | 5分 | 30分 |
| **言語の学習曲線** | 緩やか | 急 |
| **型安全性** | なし（実行時エラー） | あり（コンパイル時） |
| **IDEサポート** | 普通 | 非常に強力 |
| **コード量** | 少ない | 多い（ボイラープレート） |
| **起動時間** | 数秒 | 10秒以上 |
| **JARファイルサイズ** | - | 36.7 MB |
| **ホットリロード** | nodemon（簡単） | DevTools（やや複雑） |
| **デプロイ** | Lambda（SAM） | Elastic Beanstalk |

### 🔍 Elastic Beanstalkの学び

#### メリット
- ✅ EC2の複雑な設定を隠蔽
- ✅ Auto Scaling自動設定
- ✅ Load Balancer統合可能
- ✅ 環境変数管理が簡単

#### デメリット
- ❌ セットアップが複雑（IAMロール手動作成）
- ❌ AWS Academyでは制限が多い
- ❌ デプロイに時間がかかる（5-10分）
- ❌ Lambda（SAM）より学習コストが高い

### 💰 コスト見積もり

**Elastic Beanstalk環境**:
- EC2 (t3.micro): 無料枠内（750時間/月）
- 無料枠超過後: 約$7.50/月

**比較（Lambda）**:
- Day 16のNode.js API: ほぼ無料（100万リクエストまで無料）

### 🤔 今日の感想

**良かった点**:
- Javaの型安全性を実感（コンパイル時にエラーが見つかる）
- Spring Bootの自動設定が便利
- IDEのサポートが強力（IntelliJ IDEA / VSCode）

**難しかった点**:
- IAMロールの手動作成（Node.js/SAMでは自動だった）
- ポート設定のトラブルシューティング（502 Bad Gateway）
- Elastic Beanstalkの複雑な設定画面

**Node.jsと比較して**:
- **開発速度**: Node.jsの方が圧倒的に速い
- **型安全性**: Javaの方が安心感がある
- **デプロイ**: Lambdaの方が簡単だった
- **用途**: 大規模・エンタープライズならJava、スタートアップならNode.js

### 🎯 次回（Day 23）の予定
- RDS MySQL / Aurora Serverless v2 作成
- Spring Boot REST API実装（メモリ内データ）
- JPA設定準備
- DynamoDBとの違いを理解

### 📝 学習時間
- Java環境構築: 30分
- Spring Boot学習: 1時間
- Elastic Beanstalk設定: 2時間（IAMロール作成含む）
- トラブルシューティング: 1時間
- ドキュメント作成: 30分
- **合計**: 約5時間

### 🔗 関連リソース
- [Spring Boot公式ドキュメント](https://spring.io/projects/spring-boot)
- [AWS Elastic Beanstalk Java Guide](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_Java.html)
- プロジェクトディレクトリ: `projects/week-04/day22-springboot-hello`

--## Day 23 - Spring Boot REST API（メモリ内データ）(2025-11-24)
- ✅ **Status**: Completed
- 📱 **Project**: day23-task-api
- 🛠️ **Tech Stack**: Java 17 + Spring Boot 3.5.8 + Maven
- ⏱️ **Time**: 約4時間（環境構築含む）

### 📚 学習内容

#### 1. Spring Bootプロジェクト構造
```
day23-task-api/
├── pom.xml                           # 依存関係管理
└── src/main/java/com/aws100days/day23/
    ├── Day23TaskApiApplication.java  # エントリーポイント
    ├── Task.java                     # モデル（データ構造）
    ├── TaskService.java              # ビジネスロジック
    └── TaskController.java           # REST APIエンドポイント
```

#### 2. 実装したCRUD API
| メソッド | URL | 説明 |
|---------|-----|------|
| GET | /api/tasks | 全タスク取得 ✅ |
| POST | /api/tasks | タスク作成 ✅ |
| GET | /api/tasks/{id} | 特定タスク取得 |
| PUT | /api/tasks/{id} | タスク更新 |
| DELETE | /api/tasks/{id} | タスク削除 |

#### 3. 重要なアノテーション
- `@RestController` - REST APIクラス
- `@RequestMapping` - ベースURL設定
- `@GetMapping/@PostMapping/@PutMapping/@DeleteMapping` - HTTPメソッド
- `@PathVariable` - URLパラメータ
- `@RequestBody` - リクエストボディ → Javaオブジェクト
- `@Autowired` - 依存性注入
- `@Service` - サービス層

#### 4. Node.js（Day 16）vs Java（Day 23）比較
| 観点 | Node.js | Java |
|------|---------|------|
| コード量 | 少ない（約50行） | 多い（約180行） |
| 型安全性 | なし | あり |
| 開発速度 | 速い | 遅い |
| IDEサポート | 普通 | 強力 |
| 起動時間 | 数ms | 数秒 |

#### 5. Javaが活きる場面（Day 24以降で体験予定）
- 複雑なクエリ（JOIN）
- トランザクション管理
- データ整合性
- 大規模チーム開発

### 🐛 トラブルシューティング
- **JAVA_HOME問題**: 環境変数が反映されない
  - 解決: Java 21インストール → VSCodeのRun機能で実行
- **spring-boot-starter vs spring-boot-starter-web**: 
  - Webサーバー（Tomcat）が含まれず即終了
  - 解決: pom.xmlで`spring-boot-starter-web`に変更

### 💡 重要な学び
> 「道具は適材適所」
> - CRUDだけなら Node.js が速い
> - 複雑になったら Java が安心
> - JPAとRDSを使うとJavaの強みが見える

### 🔗 次のステップ
- Day 24: JPA + RDS MySQL統合（Javaの本当の強み）-
## Day 24 (2025-11-30) - JPA + RDS MySQL統合 ⭐

### 実施内容
- ✅ Spring Data JPA導入（pom.xml依存関係追加）
- ✅ RDS MySQL接続設定（application.properties）
- ✅ Task.javaをJPAエンティティに変換（@Entity, @Table, @Id, @Column）
- ✅ TaskRepository作成（JpaRepository継承）
- ✅ TaskService更新（ArrayList → Repository）
- ✅ Flywayマイグレーション設定
- ✅ セキュリティグループ設定（ローカルPCからRDS接続許可）
- ✅ CRUD API動作確認（POST/GET成功）

### 環境構築
- AWS CLI再インストール（SSD交換のため）
- JAVA_HOME設定修正（Eclipse Adoptium JDK 21）
- mvnw.cmd修正

### 技術スタック
- Java 21 + Spring Boot 3.5.8
- Spring Data JPA
- MySQL Connector
- Flyway（DBマイグレーション）
- RDS MySQL（day22-taskdb）

### Day 17（Node.js + DynamoDB）との比較

| 項目 | Node.js + DynamoDB | Java + JPA + RDS |
|-----|-------------------|-----------------|
| セットアップ時間 | 30分 | 2-3時間 |
| コード量 | 少ない | 多い |
| クエリ柔軟性 | 低い（PK必須） | 高い（SQL自由） |
| 適用領域 | シンプルAPI、MVP | 複雑なビジネスロジック |

### 学んだこと
- **JPA**: JavaオブジェクトとDBテーブルを自動マッピング
- **Repository**: interfaceだけでCRUD操作が自動生成される
- **Flyway**: アプリ起動時にテーブル自動作成
- **適材適所**: シンプルなAPIならNode.js、複雑なシステムならJava

### 感想
「JavaでAPI作るより、Node.js + Lambdaの方が速い」は正しい。
ただしエンタープライズ・複雑なビジネスロジック・大規模チーム開発ではJavaの価値が出る。
両方を体験して「いつどちらを選ぶか」判断できるようになったのが収穫。

### 次回（Day 25）の予定
- Spring Security + JWT認証
- Day 18（Cognito）との比較