@"
# 📝 Daily Progress Log - Phase 2

> EC系アプリ開発 + AI活用の学習記録

---

## Week 1: サーバーレス基礎 + 商品カタログ

### Day 1 (2025-12-13)

**完了したこと:**
- ShopX Product Catalog API デプロイ完了
- Lambda関数 x3 (getProducts, getProductById, getCategories)
- API Gateway (REST API)
- DynamoDB (Single Table Design + GSI)
- サンプルデータ投入 (カテゴリ3件、商品4件)

**動作確認済みAPI:**
- GET /products - 商品一覧
- GET /products/{id} - 商品詳細
- GET /products?category=xxx - カテゴリ別商品
- GET /categories - カテゴリ一覧

**API URL:** https://zzhyj5syl6.execute-api.ap-northeast-1.amazonaws.com/Prod/

**学んだこと:**
- SAM CLI でのサーバーレスアプリ構築
- DynamoDB Single Table Design (PK/SK パターン)
- GSI を使った柔軟なクエリ

**課題:**
- PowerShell のバッククォートが消える → VSCodeで直接編集が安全

**次回:** React フロントエンド作成

---

## 📅 2025-12-12: Phase 2 開始・ロードマップ v3.0 作成

（以前の内容は省略）
"@ | Set-Content -Path docs/daily-log.md -Encoding UTF8
### Day 2 (2025-12-13)

**完了したこと:**
- React フロントエンド作成 (shopx-ui)
- API連携 (fetch + useEffect + useState)
- 商品一覧表示（カード形式）
- カテゴリフィルター機能

**技術スタック:**
- React (create-react-app)
- CSS Grid (レスポンシブ対応)
- Fetch API

**学んだこと:**
- useState: データを保存する箱
- useEffect: 画面表示時にAPIを呼ぶ
- map: 配列の各要素を表示
- Promise.all: 複数APIを同時に呼ぶ

**深掘りトピック（今後）:**
- [ ] DynamoDB Single Table Design パターン
- [ ] PK/SK設計のベストプラクティス
- [ ] RDBとNoSQLの設計思想の違い

**次回:** 商品詳細ページ or UI改善

cd C:\100-days-aws-challenge
git add .
git commit -m "Day 3: Add product detail page with React Router"
git push

### Day 4 (2025-12-13)

**完了したこと:**
- S3 バケット作成 (shopx-product-images-20251213)
- 商品画像アップロード（4商品分）
- DynamoDB に imageUrl 属性追加
- React で S3 画像表示
- CSS グリッドレイアウト改善

**学んだこと:**
- S3 パブリックアクセス設定（バケットポリシー）
- DynamoDB UpdateCommand で既存アイテム更新
- Single Table Design のキー構造の重要性（PK/SK）
- CSS Grid でレスポンシブ対応

**課題:**
- PowerShell の JSON パース問題 → Node.js スクリプトで回避
- DynamoDB のキー構造を間違えた → 正しいPK/SKで再更新

## 🤖 12月: AI/LLM 基礎集中

### Day 1 (2025-12-14)

**テーマ:** API セットアップ

**完了したこと:**
- Python 3.14.2 インストール
- 仮想環境 (venv) 作成・有効化
- Anthropic SDK インストール
- API キー取得・.env ファイル設定
- hello_claude.py 作成・実行成功

**学んだこと:**
- 仮想環境: プロジェクトごとにパッケージを分離する仕組み
- SDK: API を簡単に使うためのライブラリ
- .env ファイル: API キーをコードから分離してセキュリティ確保
- API の用途: 自動化、アプリ組み込み、他システム連携

**成果物:** projects/ai-learning/day01/hello_claude.py

**次回:** Day 2 - Messages API（チャットスクリプト）

### Day 2 (2025-12-14)

**テーマ:** Messages API

**完了したこと:**
- マルチターン会話の仕組みを理解
- chat.py 作成（会話履歴を管理するチャットスクリプト）
- system プロンプトで Claude の役割設定を実装

**学んだこと:**
- messages リスト: user と assistant の発言を交互に蓄積
- API は何も覚えない: 毎回履歴全体を送る必要がある
- トークン制限: 履歴が長くなりすぎたら古いものを削除
- 履歴の保存先: メモリ上（プログラム終了で消える）
- system プロンプト: Claude の人格・役割を設定できる

**成果物:** projects/ai-learning/day02/chat.py

**次回:** Day 3 - プロンプト設計①（XMLタグ、役割設定）

### Day 3 (2025-12-15)

**テーマ:** プロンプト設計①

**完了したこと:**
- プロンプトテンプレートの概念理解
- 3種類のテンプレート作成（要約・翻訳・コードレビュー）
- format() と **kwargs の使い方を学習

**学んだこと:**
- プレースホルダー {変数} で動的にプロンプトを生成
- **k


### Day 4 (2025-12-15)

**テーマ:** プロンプト設計②

**完了したこと:**
- XMLタグで入力を明確化
- JSON出力形式の指定
- Few-shot（例示）テクニック

**学んだこと:**
- XMLタグ: Claudeが構造を認識しやすくなる
- JSON出力: プログラムで扱いやすい（result["score"]で取得）
- Few-shot: 例を見せると出力が安定する
- {{}} でformat()の波括弧をエスケープ
- これらは基礎、Tool Useで「Claudeに判断を任せる」に発展

**成果物:** projects/ai-learning/day04/improved_templates.py

**次回:** Day 5 - Tool Use基礎（Claudeが自分でツールを選ぶ）

## Day 5 (YYYY-MM-DD)
### 学習内容
- Tool Use 基礎

### やったこと
- Tool Use の概念理解
  - Claude API 単体 = 言語モデルのみ、外部接続不可
  - claude.ai = Anthropic が Tool Use で拡張済み
  - Tool Use = Claude に手足を付ける仕組み
- 天気取得ツール実装 (weather_tool.py)
  - ツール定義（name, description, input_schema）
  - Claude の役割: 判断 + パラメータ抽出 + 文章生成
  - 開発者の役割: 実際のツール実行
- 動作確認
  - 「東京の天気は？」→ stop_reason: tool_use → ツール実行
  - 「日本の首都は？」→ stop_reason: end_turn → 直接回答

### 成果物
- day05/weather_tool.py

### 気づき
- Claude は「このツールをこのパラメータで呼んで」と返すだけ
- 実行は開発者のコード側
- Claude が文脈から使うべきか判断する


## Day 6 (2024-12-14)
### Tool Use 実践 - 複数ツール連携

**学習内容：**
- 複数ツールを Claude に渡す方法
- Claude が質問内容から「どのツールを使うか」自動判断
- 1回のリクエストで複数ツール同時呼び出し
- ディスパッチャーパターンでツール振り分け
- while ループで連続ツール処理

**成果物：**
- travel_assistant.py（旅行アシスタント）
  - get_weather: 天気取得
  - get_attractions: 観光スポット取得
  - calculate_budget: 予算計算

**ポイント：**
- 「札幌 天気 観光 2万円 2日」のような雑な入力でも、Claude が3ツール同時に正しくパラメータ抽出
- ダミー関数を本物のAPIに置き換えれば実用化できる
- Tool Use の仕組み自体は Day 5 と同じ、複数対応がポイント

## Day 7 - 2024/12/XX（XX は今日の日付）

### 学習内容
- RAG（Retrieval-Augmented Generation）概念理解

### 学んだこと
- LLMの基礎：学習データ（公開Webデータ）、仕組み（トークン化→次トークン予測）、Transformerアーキテクチャ
- LLM関連用語：プロンプト、コンテキスト、トークン、ハルシネーション、Temperature、Fine-tuning、RLHF、マルチモーダル
- LLMの課題：知識のカットオフ、非公開データ不明、ハルシネーション
- RAGの3ステップ：Retrieve（検索）→ Augment（拡張）→ Generate（生成）
- Embedding：テキストをベクトル（数値リスト）に変換、意味が近いと似たベクトルになる
- Vector Database：ベクトルの類似検索に特化したDB（Chroma、Pineconeなど）

### 成果物
- day07/rag-understanding.md（RAG理解ノート）

### 次回
- Day 8: RAG実装（Chromaを使ったドキュメントQ&A）


### Day 8 (2025-12-14)

**テーマ:** RAG 実装

**完了したこと:**
- Voyage AI で Embedding 実装
- コサイン類似度による類似検索実装
- RAG Q&A システム完成（社内FAQ検索）

**学んだこと:**
- RAG 実装の全体構成: documents → embedding → search → rag_qa
- Voyage AI: Anthropic 推奨の Embedding API
- コサイン類似度: ベクトル間の角度で類似性を測定（-1〜1）
- 無料枠のレート制限対策: time.sleep() で回避
- 現実的な RAG 導入:
  - Embedding コストは安い（数万件で数百円）
  - 一度 Embedding すれば永続化可能
  - 主なコストは回答生成（Claude API）
- 企業向け RAG サービス:
  - Microsoft Copilot: SharePoint 統合、$30/ユーザー/月
  - Amazon Q Business: 40以上のデータソース対応、$3-20/ユーザー/月
- RAG 普及の課題: データ散在、権限管理、セキュリティ審査

**成果物:**
- day08/documents.py（サンプルドキュメント）
- day08/embedding.py（Embedding 処理）
- day08/search.py（類似検索）
- day08/rag_qa.py（Q&A システム）

**次回:** Day 9 - MCP 入門

## Day 9 - 2024/12/14
### テーマ: MCP 入門

### 学習内容
- MCP（Model Context Protocol）の概念理解
- Claude Desktop へのMCPサーバー設定
- filesystem / GitHub / Memory MCP の動作検証

### 成果物
- claude_desktop_config.json（MCP設定ファイル）

### 学んだこと
- MCP = Tool Use の共有版・プラグイン版
- 設定ファイルで外部ツールを追加できる
- filesystem MCP は安定動作
- GitHub MCP は不安定（読み取りのみ成功）
- Project 内では MCP が制限される（Anthropicコネクタ優先）
- MCP はまだ発展途上の技術

### 次回
- Day 10: まとめ

### Day 10 (2025-12-14)

**テーマ:** 12月 AI 学習サマリー + 延長ロードマップ

**完了したこと:**
- AI/LLM 基礎学習の振り返り
- AI エージェントの概念理解
- 12月延長ロードマップ作成（Day 11-15）

**学んだこと:**
- AI エージェント = 目標に向かって自律的に計画・実行・評価を繰り返す
- Claude Code = ソフトウェア開発エージェント
- 「AI エージェント」はバズワード化している現状

**成果物:**
- day10/ai-learning-summary.md

---

### Day 11 (2025-12-14)

**テーマ:** Claude Code 導入

**完了したこと:**
- Claude Code インストール
- Max プランで認証
- CLAUDE.md 作成（プロジェクト設定）
- 日本語での動作確認

**学んだこと:**
- Claude Code はターミナルベースの AI エージェント
- プロジェクト全体を自動分析して理解する
- CLAUDE.md でプロジェクト固有の指示を設定

**次回:** Day 12 - 既存コードの修正を Claude Code に実行させる

daily-log.md に Day 12 を追記して git push して。

### Day 12 (2025-12-19)

**テーマ:** Claude Code 機能ツアー

**完了したこと:**
- Git 問題解決（シークレット履歴削除）
- Issue 作成（GitHub CLI 経由）
- コード分析・リファクタリング体験

**学んだこと:**
- Claude Code は複雑な作業向き
- 単純作業は Cursor MCP の方が楽

---

### Day 14 (2025-12-20)

**テーマ:** ShopX フロントエンド環境構築

**完了したこと:**
- Vite + React + TypeScript プロジェクト作成
- CRA から Vite への移行
- HMR（ホットリロード）動作確認
- Vitest テスト環境構築
- 最初のテスト作成・実行

**学んだこと:**
- Vite vs CRA: Vite は起動・更新が圧倒的に速い
- TypeScript: 型で実行前にエラー検出
- Vitest: Vite 用テストランナー（Jest 互換）

**成果物:**
- projects/ec-platform/frontend/shopx-ui/（Vite + React + TS）

**次回:** CI/CD（GitHub Actions → Amplify）

### Day 14 (2025-12-20)

**テーマ:** ShopX フロントエンド環境構築 + CI/CD

**完了したこと:**
- Vite + React + TypeScript プロジェクト作成
- CRA から Vite への移行
- HMR（ホットリロード）動作確認
- Vitest テスト環境構築
- 最初のテスト作成・実行
- GitHub Actions CI ワークフロー設定

**学んだこと:**
- Vite vs CRA: Vite は起動・更新が圧倒的に速い
- TypeScript: 型で実行前にエラー検出
- Vitest: Vite 用テストランナー（Jest 互換）
- GitHub Actions: push 時に自動でテスト・ビルド実行
- package-lock.json: 環境を再現するために必須
- CI の実行環境: GitHub のクラウド上（Ubuntu）で毎回ゼロから構築

**成果物:**
- projects/ec-platform/frontend/shopx-ui/（Vite + React + TS）
- .github/workflows/ci.yml（CI 設定）

**次回:** Amplify でホスティング（自動デプロイ）

---

### Day 15 (2025-12-20)

**テーマ:** AWS Amplify ホスティング

**完了したこと:**
- GitHub と Amplify 連携
- モノレポ設定（shopx-ui のみビルド）
- 自動デプロイ確認（push → 自動で本番反映）
- SSL証明書の自動設定を確認

**学んだこと:**
- Amplify Hosting = マネージドなフロントエンドホスティング
- GitHub push で自動ビルド＆デプロイ
- SSL証明書は自動発行・自動更新（ACM）
- モノレポでも特定フォルダだけビルド可能

**成果物:**
- https://main.d20nytcowp331l.amplifyapp.com

**次回:** 12月振り返り、1月計画確認

### Day 16 (2025-12-20)

**テーマ:** ShopX UI 開発（ルーティング + ページ作成）

**完了したこと:**
- React Router 導入
- ページ構成（HomePage, ProductListPage, ProductDetailPage）
- ProductCard コンポーネント作成
- ナビゲーション実装
- 商品一覧 → 詳細への遷移

**学んだこと:**
- React Router: URL とコンポーネントの対応付け
- useParams: URL パラメータの取得（/products/:id → id）
- map: 配列を JSX に変換して一覧表示
- Props の型定義と分割代入
- Record<string, T>: キーが文字列のオブジェクト型

**成果物:**
- src/pages/HomePage.tsx
- src/pages/ProductListPage.tsx
- src/pages/ProductDetailPage.tsx
- src/components/ProductCard.tsx

**次回:** API 連携（ダミーデータ → 実際の API から取得）

### Day 17 (2025-12-20)

**テーマ:** API 連携

**完了したこと:**
- 型定義ファイル作成（Product interface）
- API クライアント作成（URL一元管理、データ変換）
- ProductListPage を API 連携に修正
- ProductDetailPage を API 連携に修正
- ローディング・エラー状態の実装

**学んだこと:**
- useState + useEffect で API データ取得パターン
- try-catch-finally でエラーハンドリング
- import type: 型のみをインポートする TypeScript 構文
- API レスポンス変換: バックエンド形式（productId）→ フロントエンド形式（id）
- MCP (filesystem) で Claude がファイル操作できる仕組み

**成果物:**
- src/types/product.ts（型定義）
- src/api/products.ts（API クライアント）
- src/pages/ProductListPage.tsx（修正）
- src/pages/ProductDetailPage.tsx（修正）

**次回:** カート機能 or カテゴリフィルター

---

### Day 18 (2025-12-20)

**テーマ:** カート機能（Context API）

**完了したこと:**
- CartContext 作成（グローバル状態管理）
- CartProvider でアプリ全体を囲む
- 商品詳細ページに「カートに追加」ボタン
- カートページ作成（商品一覧・合計金額表示）
- ナビゲーションにカートアイコン + 個数バッジ

**学んだこと:**
- props: 親→子にデータを渡す仕組み
- Context API: アプリ全体でデータを共有（グローバル状態）
- Provider: Context の値を提供する「箱」
- useContext: Context の値を取得するフック
- カスタムフック: useCart のように機能をまとめて再利用
- 「API」の意味: 接続口（Web API と Context API は別物）

**成果物:**
- src/context/CartContext.tsx（カート状態管理）
- src/pages/CartPage.tsx（カートページ）
- src/main.tsx（CartProvider 追加）
- src/App.tsx（ナビ・ルート追加）
- src/pages/ProductDetailPage.tsx（カート追加ボタン）

**次回:** カテゴリフィルター

---

### Day 19 (2025-12-20)

**テーマ:** カテゴリフィルター + テスト + 検索機能

**完了したこと:**
- カテゴリフィルター機能（ドロップダウン）
- URL パラメータ連携（?category=xxx）
- テスト環境構築（MSW でAPIモック）
- ProductListPage テスト（4件）
- CartContext テスト（6件）
- CartPage テスト（2件）
- カバレッジ: 55% → 65% に向上
- 商品名検索ボックス追加

**学んだこと:**
- テストの種類: 単体、統合、E2E
- MSW: APIをモックして偽のレスポンスを返す
- expect().toBeInTheDocument(): 画面に要素があるか確認
- userEvent: ユーザー操作をシミュレート
- カバレッジ: テストで通ったコードの割合
- filter() + includes(): フロントエンドでの絞り込み検索

**アーキテクチャ理解:**
- Amplify Hosting: フロントエンド配信のみ
- SAM (Lambda + API Gateway + DynamoDB): バックエンドAPI
- テストのモックデータと本番データは別物

**成果物:**
- src/test/ProductListPage.test.tsx
- src/test/CartContext.test.tsx
- src/test/CartPage.test.tsx
- src/test/handlers.ts（MSWモック定義）
- src/pages/ProductListPage.tsx（フィルター+検索追加）

**次回:** Day 20

### Day 20 (2026-01-10)

**テーマ:** Cognito 認証機能の実装

**完了したこと:**
- フォルダ構造整理（backend-node/shopx-api）
- Cognito ユーザープールを SAM で作成
- フロントエンドに aws-amplify 導入
- 新規登録画面（SignUpPage）
- ログイン画面（SignInPage）
- AuthContext（認証状態管理）
- ログアウト機能
- ナビゲーションに認証状態反映

**学んだこと:**
- Cognito: AWS の認証サービス（ユーザープール、クライアント）
- SAM で Cognito リソースを IaC 管理
- Amplify v6 の設定方法（Auth.Cognito 構造）
- Context パターンで認証状態をアプリ全体で共有
- signUp / confirmSignUp / signIn / signOut の使い方
- getCurrentUser で認証状態をチェック

**アーキテクチャ理解:**
- UserPool: ユーザー情報を保存するデータベース
- UserPoolClient: フロントエンドがアクセスするための入口
- JWT トークン: ログイン後に発行、API 認可に使用
- 認証フロー: ユーザー → Cognito → JWT → API Gateway

**成果物:**
- backend-node/shopx-api/template.yaml（Cognito追加）
- frontend/shopx-ui/src/config/auth.ts
- frontend/shopx-ui/src/pages/SignUpPage.tsx
- frontend/shopx-ui/src/pages/SignInPage.tsx
- frontend/shopx-ui/src/context/AuthContext.tsx

**次回:** Day 21 - 保護ルート、カート永続化

---

### Day 21 (2026-01-10)

**テーマ:** 保護ルート + カート永続化

**完了したこと:**
- ProtectedRoute コンポーネント作成
- EC サイトの正しい UX 設計（購入手続き時にログイン要求）
- 購入手続きボタンにログインチェック追加
- CartPage テスト追加（未ログイン/ログイン時の動作）
- カート API 作成（GET /cart, PUT /cart）
- Cognito Authorizer 設定（API Gateway で JWT 認証）
- カート永続化（DynamoDB 保存・復元）
- AuthContext 改善（メールアドレス表示）

**学んだこと:**
- ProtectedRoute: 認証状態で表示/リダイレクトを制御
- Navigate + state: リダイレクト時に情報を渡す
- useLocation: 遷移元の情報を受け取る
- fetchUserAttributes: Cognito からメールアドレス取得
- Single Table Design: 1テーブルに複数データ種別（商品、カート）を保存
- Cognito Authorizer: API Gateway で JWT トークン検証
- EC サイト UX: カート追加は誰でも可、購入時にログイン要求

**アーキテクチャ理解:**
- ローカル: フロントエンド（React）のみ
- AWS: API Gateway, Lambda, DynamoDB, Cognito 全て
- 開発時も本番も、バックエンドは常に AWS 上で動作
- サーバーレス構成ではローカルに DB を持たない

**モダナイズ関連の学び:**
- コンテナ化はモダナイズの「一つの手段」であり目的ではない
- マルチテナント化: データ分離（DB/スキーマ/テーブル）、セキュリティ、パフォーマンス
- 月2-3日しか使わないシステムにコンテナ化は過剰

**成果物:**
- src/components/ProtectedRoute.tsx
- src/api/cart.ts
- src/context/CartContext.tsx（API連携版）
- src/context/AuthContext.tsx（メール表示対応）
- src/test/CartPage.test.tsx（テスト追加）
- backend-node/shopx-api/src/handlers/getCart/app.mjs
- backend-node/shopx-api/src/handlers/updateCart/app.mjs
- backend-node/shopx-api/template.yaml（カートAPI + Authorizer追加）

**次回:** Day 22 - 注文機能

---

### Day 22 (2026-01-12)

**テーマ:** 注文機能の実装

**完了したこと:**
- 注文 API（POST /orders, GET /orders）
- CheckoutPage（注文確認・配送先入力）
- OrderHistoryPage（注文履歴一覧）
- ナビゲーションに「注文履歴」追加
- DB データのクリーンアップと再投入

**学んだこと:**
- Single Table Design: GSI1 を使った商品情報取得
- データ構造の整合性: PK/SK パターンの一致が重要
- QueryCommand: GSI を使った検索方法
- デバッグ: CloudWatch Logs と DB スキャンで問題特定

**トラブルシューティング:**
- 商品が Unknown/¥0 → DB のデータ構造が古い形式だった
- 解決: DB クリア後、正しい seed データを再投入

**成果物:**
- backend-node/shopx-api/src/handlers/createOrder/app.mjs
- backend-node/shopx-api/src/handlers/getOrders/app.mjs
- frontend/shopx-ui/src/api/orders.ts
- frontend/shopx-ui/src/pages/CheckoutPage.tsx
- frontend/shopx-ui/src/pages/OrderHistoryPage.tsx

**次回:** Day 23 - 管理機能（商品 CRUD）

---

### Day 23 (2026-01-12)

**テーマ:** 管理機能（商品 CRUD）

**完了したこと:**
- Cognito Groups で管理者グループ（admin）作成
- 管理者用 API 実装（POST/PUT/DELETE /admin/products）
- Lambda で JWT から cognito:groups を取得して認可
- AuthContext に isAdmin 判定を追加
- AdminPage（商品管理画面）作成
- 商品の追加・編集・削除機能

**学んだこと:**
- Cognito Groups: UserPool 内でユーザーをグループ分け
- 認証 vs 認可: 認証（誰か）→ 認可（何ができるか）
- JWT payload に cognito:groups が含まれる
- fetchAuthSession() で idToken の payload にアクセス
- UpdateCommand の動的更新式（部分更新対応）
- admin-add-user-to-group コマンドでユーザーをグループに追加

**アーキテクチャ理解:**
- 認可フロー: JWT → API Gateway → Lambda → groups チェック → 処理
- /admin/ プレフィックスで管理者 API を明示
- フロントエンドでも isAdmin でナビゲーション制御

**成果物:**
- backend-node/shopx-api/template.yaml（AdminGroup + 管理 API 追加）
- backend-node/shopx-api/src/handlers/createProduct/app.mjs
- backend-node/shopx-api/src/handlers/updateProduct/app.mjs
- backend-node/shopx-api/src/handlers/deleteProduct/app.mjs
- frontend/shopx-ui/src/pages/AdminPage.tsx
- frontend/shopx-ui/src/context/AuthContext.tsx（isAdmin 追加）

**次回:** Day 24

---

### Day 24 (2026-01-12)

**テーマ:** 注文管理 + パフォーマンス改善

**完了したこと:**
- 注文管理 API（GET /admin/orders, PUT /admin/orders/{orderId}）
- AdminPage に注文管理タブ追加（ステータス変更機能）
- Amplify 環境変数設定（VITE_API_URL, Cognito設定）
- TypeScript エラー修正（import type for ReactNode）
- DynamoDB データ修正（imageUrl 追加）
- Lambda メモリ増加（128MB → 512MB）

**学んだこと:**
- Amplify + GitHub 連携: Webhook で push → 自動ビルド＆デプロイ
- 環境変数: Amplify コンソールで VITE_* を設定、再デプロイで反映
- Lambda パフォーマンス: メモリ増加 = CPU も増加 = 処理速度UP
- コールドスタート: 初回/放置後は遅い、連続アクセスは速い（ウォーム）
- TypeScript verbatimModuleSyntax: 型は `import type` で読み込む必要がある
- Single Table Design の注意: PK/SK を間違えると別レコードができる

**パフォーマンス改善:**
- メモリ 512MB でローディング表示が視認できないほど高速化
- さらなる改善: 1024MB、Provisioned Concurrency（有料）

**成果物:**
- backend-node/shopx-api/src/handlers/getAllOrders/app.mjs
- backend-node/shopx-api/src/handlers/updateOrder/app.mjs
- frontend/shopx-ui/src/pages/AdminPage.tsx（注文管理タブ追加）
- template.yaml（MemorySize: 512 追加）

**次回:** Day 25 - Phase 6（検索機能 or AI チャット or 監視）

---

### Day 25 (2026-01-13)

**テーマ:** AI チャット機能（Claude API + Tool Use）

**完了したこと:**
- サンプル商品データ拡充（120件 + Unsplash画像）
- 8カテゴリ構成（electronics, fashion, books, food, home, sports, toys, beauty）
- カテゴリ取得 Lambda 修正（begins_with 検索）
- AI チャット Lambda 作成（POST /chat）
- Tool Use で商品検索ツール実装
- フロントエンドにチャット UI 追加
- クイックアクションボタン実装

**学んだこと:**
- Tool Use の実践的な使い方（12月の復習を ShopX に適用）
- Claude の役割: 判断 + パラメータ抽出 + 文章生成
- 開発者の役割: 実際のツール実行（DynamoDB 検索）
- Lambda で外部 SDK を使う場合は各ハンドラに package.json が必要
- SAM が CodeUri ごとに依存関係をバンドルする仕組み
- .env ファイルの typo に注意（l と 4 の見間違い）

**Tool Use 定義:**
- search_products: カテゴリ、価格帯、キーワードで商品検索
- get_product_detail: 商品ID で詳細取得
- get_categories: カテゴリ一覧取得

**アーキテクチャ:**
```
React UI → Lambda (/chat) → Claude API (Tool Use)
                ↓
           DynamoDB (商品検索)
```

**成果物:**
- backend-node/shopx-api/scripts/seed-products.mjs
- backend-node/shopx-api/src/handlers/chat/app.mjs
- backend-node/shopx-api/src/handlers/chat/package.json
- frontend/shopx-ui/src/api/chat.ts
- frontend/shopx-ui/src/pages/ChatPage.tsx
- template.yaml（ChatFunction + AnthropicApiKey パラメータ追加）

**次回:** Day 26 - 検索機能 or 監視 or AI チャット改善

---

### Day 26 (2026-01-18)

**テーマ:** 全部盛り（検索 + お気に入り + レビュー + モニタリング）

**完了したこと:**
- 商品検索機能（キーワード、カテゴリ、価格帯フィルター）
- お気に入り機能（追加・削除・一覧ページ）
- レビュー機能（星評価 + コメント）
- CloudWatch ダッシュボード作成
- テストユーザー10名作成

**検索機能:**
- getProducts Lambda にキーワード・価格帯フィルター追加
- ProductListPage に検索 UI 追加
- `type="button"` でフォーム送信を防止（リロード問題修正）

**お気に入り機能:**
- Lambda x3（getFavorites, addFavorite, removeFavorite）
- DynamoDB: USER#{userId} + FAVORITE#{productId}
- 商品詳細ページにハートボタン（❤️/🤍 切り替え）
- お気に入り一覧ページ（FavoritesPage）

**レビュー機能:**
- Lambda x2（getReviews, createReview）
- DynamoDB: PRODUCT#{productId} + REVIEW#{timestamp}#{reviewId}
- 星評価コンポーネント（StarRating）
- 商品詳細ページにレビューセクション追加
- 平均評価の自動計算・表示

**モニタリング:**
- CloudWatch ダッシュボード（ShopX-Monitoring）
- Lambda メトリクス（Invocations, Errors, Duration）
- API Gateway メトリクス（Requests）
- IAM インラインポリシー追加（cloudwatch:PutDashboard）

**学んだこと:**
- API Gateway のパスパラメータ名統一の重要性（{id} vs {productId}）
- button のデフォルト type は "submit"（明示的に type="button" が必要）
- IAM マネージドポリシー上限（10個）→ インラインポリシーで対応
- React 検索 UI のベストプラクティス（debounce, replace: true）
- Cognito AdminCreateUser でテストユーザー作成

**成果物:**
- backend-node/shopx-api/src/handlers/getFavorites/app.mjs
- backend-node/shopx-api/src/handlers/addFavorite/app.mjs
- backend-node/shopx-api/src/handlers/removeFavorite/app.mjs
- backend-node/shopx-api/src/handlers/getReviews/app.mjs
- backend-node/shopx-api/src/handlers/createReview/app.mjs
- frontend/shopx-ui/src/api/favorites.ts
- frontend/shopx-ui/src/api/reviews.ts
- frontend/shopx-ui/src/pages/FavoritesPage.tsx
- frontend/shopx-ui/src/pages/ProductDetailPage.tsx（お気に入り・レビュー追加）
- frontend/shopx-ui/src/pages/ProductListPage.tsx（検索 UI 追加）
- scripts/create-test-users.js
- scripts/dashboard.json

**次回:** Day 27

---

### Day 27 (2026-01-18)

**テーマ:** UI/UX リデザイン + TypeScript 厳格化 + テスト追加

**完了したこと:**
- 2025年ミニマルデザイントレンド適用
- TypeScript strict mode 設定
- Vitest + React Testing Library でテスト追加

**UI/UX リデザイン:**
- デザイントレンド調査（Web検索）
- カラー削減: Blue+Red+Yellow+Green → Black + Gray
- 絵文字削除: 🛍️🤖🚚🔒↩️💬❤️📦 → なし
- タイポグラフィ: Hero 4.5rem、大きな文字階層
- スペーシング: Whitespace 倍増（--spacing-4xl: 6rem）
- 言語: 日本語 → 英語に統一

**適用した 2025 トレンド:**
- Minimalism with purpose（目的のあるミニマリズム）
- Large typography（大きなタイポグラフィ）
- Monochrome palettes（モノクローム配色）
- Generous whitespace（余白を多く）
- Subtle animations（控えめなアニメーション）

**TypeScript strict mode:**
- tsconfig.app.json に追加オプション設定
- `strict: true`（既存）
- `noImplicitReturns: true`（全コードパスで return 必須）
- `noUncheckedIndexedAccess: true`（配列アクセスを T | undefined に）
- `exactOptionalPropertyTypes` と `noPropertyAccessFromIndexSignature` は厳しすぎて無効化

**テスト追加（20テスト全パス）:**
| ファイル | テスト数 | 内容 |
|---------|---------|------|
| App.test.tsx | 2 | ロゴ、ナビゲーション |
| ProductListPage.test.tsx | 5 | 商品表示、検索、カテゴリ |
| CartPage.test.tsx | 7 | カート表示、Checkout、削除 |
| CartContext.test.tsx | 6 | 追加、削除、クリア |

**学んだこと:**
- Vitest: Jest の高速版（Vite と相性抜群）
- React Testing Library: ユーザー視点でテスト
- MSW: API をモック（偽のサーバー）
- `getByText` vs `getAllByText`: 要素が複数ある場合の対処
- `getByRole('button', { name: 'X' })`: 同名テキストが複数ある場合
- `vi.mock()`: 依存モジュールのモック
- MSW の API URL 一致の重要性

**成果物:**
- frontend/shopx-ui/src/index.css（完全リライト）
- frontend/shopx-ui/src/App.css（完全リライト）
- frontend/shopx-ui/src/components/Header.tsx
- frontend/shopx-ui/src/components/Footer.tsx
- frontend/shopx-ui/src/pages/*.tsx（全ページ更新）
- frontend/shopx-ui/tsconfig.app.json
- frontend/shopx-ui/src/App.test.tsx
- frontend/shopx-ui/src/test/ProductListPage.test.tsx
- frontend/shopx-ui/src/test/CartPage.test.tsx
- frontend/shopx-ui/src/test/CartContext.test.tsx
- frontend/shopx-ui/src/test/handlers.ts（API URL 修正）

**次回:** Day 28 - CI/CD (GitHub Actions)

---

### Day 28 (2026-01-18)

**テーマ:** CI/CD 動作確認と理解

**完了したこと:**
- GitHub Actions CI の動作確認
- CI でテスト失敗 → 原因調査 → 修正 → 再テスト成功
- Amplify Hosting（CD）が Day 15 で設定済みであることを再確認

**CI/CD の理解:**
- CI（Continuous Integration）: push → 自動テスト → ビルド
- CD（Continuous Deployment）: テスト成功 → 自動デプロイ
- なぜ2回テスト？: ローカルと CI で環境差異を発見するため

**発見したバグ:**
- `getByRole` は同期的（待たない）
- `findByRole` は非同期（待つ）
- ローカルは速いので通過、CI は遅いので失敗
- 非同期データ取得後の要素は `findByRole` を使う

**学んだこと:**
- GitHub Actions: GitHub 標準の CI サービス
- ci.yml: ワークフロー定義ファイル
- Workflow → Job → Step の階層構造
- `npm ci`: クリーンインストール（CI 向け）
- 環境差異がバグを発見する価値

**CI/CD 構成（ShopX）:**
```
[CI] GitHub Actions
  - テスト実行（Vitest）
  - ビルド確認（Vite）

[CD] Amplify Hosting（Day 15 で設定済み）
  - main への push で自動デプロイ
  - https://main.d20nytcowp331l.amplifyapp.com
```

**成果物:**
- .github/workflows/ci.yml（既存確認）
- src/test/ProductListPage.test.tsx（findByRole 修正）
- src/handlers/createCheckoutSession/（Stripe Lambda）
- src/pages/CheckoutPage.tsx（決済方法選択追加）
- src/pages/OrderHistoryPage.tsx（決済成功後処理）
- src/api/orders.ts（createCheckoutSession 追加）

**Stripe 連携:**
- Stripe Checkout Session で決済ページ生成
- テストモードでカード決済動作確認
- 決済成功後に注文作成 → 注文履歴表示

**ShopX 完成形:**
- フロントエンド: React + TypeScript + Vite
- バックエンド: Lambda + API Gateway + DynamoDB
- 認証: Cognito
- 決済: Stripe
- CI: GitHub Actions
- CD: Amplify Hosting
- 本番URL: https://main.d20nytcowp331l.amplifyapp.com

**次回:** Day 29

---

### Day 29 (2026-01-18)

**テーマ:** ロードマップ再設計 + Phase 1 開始

**完了したこと:**
- AI 時代のエンジニアリングトレンド調査（Web検索）
- ロードマップ v5.0 作成（5プロジェクト、12ヶ月計画）
- Phase 1: パーソナル AI アシスタント開始

**AI 時代のスキルシフト:**
| 従来 | AI 時代（2025+）|
|------|-----------------|
| コードを書く | 何を作るか決める |
| 実装 | 問題解決 + ビジネス視点 |
| 言語習得 | AI プロンプティング |
| 下流工程 | 上流・意思決定 |

**新ロードマップ v5.0:**
| Phase | Day | アプリ |
|-------|-----|--------|
| 0 | 1-28 | ShopX ✅ |
| 1 | 29-50 | パーソナル AI アシスタント |
| 2 | 51-70 | AI ナレッジベース |
| 3 | 71-90 | AI 画像分析アプリ |
| 4 | 91-120 | AI チャットボット SaaS |
| 5 | 121-150 | インフラ自動化ダッシュボード |

**学んだこと:**
- IaC（Terraform）は 2025 年時点で「当たり前の基盤技術」
- GitOps（ArgoCD）がメインストリーム化
- Platform Engineering の急成長
- 「作る」から「仕組み化する」へのパラダイムシフト

**成果物:**
- docs/learning-roadmap.md（v5.0）

**次回:** Day 30 - Terraform インストール + 基本コンセプト

---

### Day 30 (2026-01-24)

**テーマ:** Terraform 基礎

**完了したこと:**
- Terraform v1.14.3 インストール（winget）
- AWS Provider 設定
- S3 バケット作成・削除
- tfstate の理解

**学んだコマンド:**
| コマンド | 役割 |
|----------|------|
| `terraform init` | 初期化（プラグイン DL） |
| `terraform plan` | プレビュー（何が作られるか確認） |
| `terraform apply` | リソース作成 |
| `terraform destroy` | リソース削除 |

**SAM vs Terraform:**
- SAM = インフラ + コード（サーバーレス向けオールインワン）
- Terraform = インフラのみ（汎用・マルチクラウド）

**tfstate とは:**
- Terraform が「今何を管理しているか」を記録するファイル
- Git にコミットしない（機密情報含む可能性）
- チーム開発では S3 に保存して共有

**成果物:**
- projects/personal-assistant/terraform/main.tf
- projects/personal-assistant/terraform/.gitignore

**次回:** Day 31 - 変数、出力、ファイル分割

---

### Day 31 (2026-01-24)

**テーマ:** Terraform 変数とファイル分割

**完了したこと:**
- variables.tf で変数定義
- outputs.tf で出力定義
- main.tf の変数化リファクタリング

**ファイル構成（ベストプラクティス）:**
```
terraform/
├── main.tf        # リソース定義
├── variables.tf   # 変数定義
├── outputs.tf     # 出力定義
└── terraform.tfvars  # 変数の値
```

**学んだこと:**
- `var.変数名` で変数を参照
- `"${var.xxx}-${var.yyy}"` で文字列補間
- 変数化は複数環境・チーム開発で威力を発揮
- 証跡観点: tfvars は機密なければ Git 管理OK

**成果物:**
- projects/personal-assistant/terraform/variables.tf
- projects/personal-assistant/terraform/outputs.tf
- projects/personal-assistant/terraform/main.tf（更新）

**次回:** Day 32 - Personal AI Assistant インフラ設計

---

### Day 32 (2026-01-24)

**テーマ:** DevOps AI コックピット - アーキテクチャ設計

**完了したこと:**
- プロジェクト方向性の再定義（汎用チャットボット → 実務課題解決ツール）
- DevOps AI コックピット のコンセプト設計
- アーキテクチャ設計ドキュメント作成
- Terraform モジュール構成設計
- ディレクトリ構造作成
- テスト用S3バケット削除（クリーンアップ）

**DevOps AI コックピット とは:**
```
【MCP層（対話操作）】
- GitHub MCP: PR/Issue/コミット操作
- AWS MCP: コスト確認、ログ分析（将来）
- Slack MCP: 通知、会話要約（将来）

【Bot層（自動化）】
- 日報自動生成: GitHub活動 → AI → Slack通知
- インシデント対応: アラート → 原因分析 → 通知（将来）
- コスト監視: 異常検知 → 通知（将来）
```

**Phase 1 スコープ（Day 29-50）:**
| 機能 | 実装方式 |
|------|----------|
| MCP Server | ローカル（Node.js） |
| GitHub連携 | MCP Tools |
| 日報Bot | Lambda + EventBridge |

**Terraform モジュール構成:**
```
terraform/modules/
├── lambda/        # Lambda関数
├── api-gateway/   # APIエンドポイント
├── dynamodb/      # データストア
├── eventbridge/   # 定期実行
└── secrets/       # トークン管理
```

**学んだこと:**
- Bot vs MCP の違い（一方向 vs 双方向）
- ローカルMCP vs クラウドMCP のトレードオフ
- Terraform モジュール化のメリット（再利用、見通し、チーム開発）
- 設計ドキュメントの重要性

**成果物:**
- docs/architecture.md（設計ドキュメント）
- terraform/modules/（5モジュール分のディレクトリ）
- mcp-server/（MCPサーバー用ディレクトリ）
- bots/daily-report/（日報Bot用ディレクトリ）

**次回:** Day 33 - Secrets Manager モジュール実装

---

### Day 33 (2026-01-27)

**テーマ:** Secrets Manager モジュール実装

**完了したこと:**
- Secrets Manager の概念理解
- Terraform モジュール作成（variables.tf, main.tf, outputs.tf）

**Secrets Manager とは:**
- API キーやパスワードを暗号化して保存するサービス
- Lambda から実行時に取得（キャッシュで高速化）
- 自動ローテーション機能あり（定期的にパスワード自動変更）
- Lambda 以外でも使える（EC2, ECS, オンプレ等）

**モジュール構成:**
```
terraform/modules/secrets/
├── variables.tf  # 入力（project_name, environment, github_token）
├── main.tf       # リソース（secret + secret_version）
└── outputs.tf    # 出力（secret_arn, secret_name）
```

**学んだこと:**
- `sensitive = true`: terraform plan/apply 時に値をマスク
- secret（箱）と secret_version（中身）を分離 → ローテーション対応
- `recovery_window_in_days`: 削除時の待機期間（prod=30日, dev=0日）
- 出力の用途: ARN は IAM ポリシー用、Name は Lambda コード用

**成果物:**
- terraform/modules/secrets/variables.tf
- terraform/modules/secrets/main.tf
- terraform/modules/secrets/outputs.tf

**次回:** Day 34 - Lambda モジュール実装

---

### Day 34 (2026-01-27)

**テーマ:** Lambda モジュール実装

**完了したこと:**
- Lambda モジュール作成（Terraform）
- シンプル版日報Bot Lambda 作成
- IAM Role + ポリシー設定
- 動作確認成功（GitHub API 呼び出し）

**Lambda の処理フロー:**
```
Lambda 起動
    ↓
Secrets Manager から GitHub Token 取得
    ↓
GitHub API で今日のコミット取得
    ↓
結果を返す
```

**モジュール構成:**
```
terraform/modules/lambda/
├── main.tf       # Lambda + IAM Role + CloudWatch Logs
├── variables.tf  # 入力変数
└── outputs.tf    # 出力（function_name, function_arn）

bots/daily-report-simple/
└── index.mjs     # シンプル版 Lambda コード
```

**学んだこと:**
- IAM Role: Lambda が「何をできるか」を定義
- assume_role_policy: 「誰がこの Role を使えるか」（Lambda サービス）
- インラインポリシー: マネージドポリシー上限（10個）回避策
- archive_file: Terraform で Lambda コードを ZIP 化
- 環境変数で設定を Lambda に渡す

**作成されたリソース:**
| リソース | 名前 |
|----------|------|
| Secrets Manager | personal-assistant-dev-github-token |
| Lambda | personal-assistant-dev-daily-report |
| IAM Role | personal-assistant-dev-daily-report-role |
| CloudWatch Logs | /aws/lambda/personal-assistant-dev-daily-report |

**動作確認結果:**
```json
{
  "statusCode": 200,
  "message": "GitHub activity retrieved successfully",
  "date": "2026-01-27",
  "commitCount": 0,
  "commits": []
}
```

**成果物:**
- terraform/modules/lambda/main.tf
- terraform/modules/lambda/variables.tf
- terraform/modules/lambda/outputs.tf
- bots/daily-report-simple/index.mjs

**次回:** Day 35 - EventBridge で定期実行 or DynamoDB で履歴保存

---

### Day 35 (2026-01-27)

**テーマ:** EventBridge + Claude API + DynamoDB 統合

**完了したこと:**
- EventBridge モジュール有効化（毎日 18:00 JST 定期実行）
- Claude API 統合（日報を AI 生成）
- DynamoDB モジュール有効化（日報履歴保存）
- Lambda コード更新（全機能統合）

**システム構成:**
```
EventBridge (18:00 JST) → Lambda → GitHub API → Claude API → DynamoDB
```

**DynamoDB テーブル設計:**
```
PK: REPO#mmandai10/100-days-aws-challenge
SK: DATE#2026-01-27
---
date, commitCount, commits, report, createdAt, ttl
```

**学んだこと:**
- EventBridge cron 式: UTC で指定（18:00 JST = 09:00 UTC）
- Terraform count は動的値に依存できない（apply 後に決まる値）
- DynamoDB TTL: 古いデータを自動削除（90日後）
- compact() 関数: 空文字列を除外したリストを作成

**作成されたリソース:**
| リソース | 名前 |
|----------|------|
| EventBridge | personal-assistant-dev-daily-report-schedule |
| Secrets Manager | personal-assistant-dev-claude-api-key |
| DynamoDB | personal-assistant-dev-daily-reports |
| IAM Policy | dynamodb-write |

**成果物:**
- terraform/main.tf（DynamoDB + EventBridge モジュール有効化）
- terraform/modules/secrets/（Claude API Key 追加）
- terraform/modules/lambda/（DynamoDB 権限 + 環境変数追加）
- bots/daily-report-simple/index.mjs（Claude + DynamoDB 統合）

**次回:** Day 36 - SES メール通知

---

### Day 36 (2026-01-27)

**テーマ:** SES メール通知機能追加

**完了したこと:**
- SES メールアドレス認証（mitsuharu.mmandai10@gmail.com）
- IAM ユーザーに SES 権限追加
- Lambda に SES 送信機能追加
- Terraform で SES 権限・環境変数を設定
- メール送信テスト成功

**システム構成（完成版）:**
```
EventBridge (18:00 JST)
    ↓
Lambda
    ↓
GitHub API → Claude API
    ↓
DynamoDB（保存）+ SES（メール送信）
    ↓
Gmail に日報が届く
```

**学んだこと:**
- SES サンドボックス: 認証済みメールアドレスにのみ送信可能
- SES からのメールは迷惑メールフォルダに入りやすい
- Lambda の IAM ロールに ses:SendEmail 権限が必要
- Terraform の count で条件付きリソース作成

**作成されたリソース:**
| リソース | 名前 |
|----------|------|
| IAM Policy | ses-send |
| 環境変数 | NOTIFICATION_EMAIL |

**成果物:**
- terraform/modules/lambda/main.tf（SES 権限追加）
- terraform/modules/lambda/variables.tf（notification_email 追加）
- bots/daily-report-simple/index.mjs（SES 送信機能追加）

**次回:** Day 37 - MCP サーバー or 別機能

---

### Day 37 (2026-01-28)

**テーマ:** Incident Analyzer Bot 構築

**完了したこと:**
- SNS モジュール作成（Topic、Lambda サブスクリプション、Lambda 実行権限）
- CloudWatch Alarm モジュール作成（Errors、Duration）
- incident-analyzer Lambda 作成（SNS → ログ取得 → Claude 分析）
- トラブルシューティング（IAM権限、アラーム閾値、テストエラー出力方法）
- Claude による自動分析成功確認
- 会社への引き継ぎドキュメント作成

**学んだこと:**
- SNS Topic = メーリングリストの概念（Publisher → Topic → 複数 Subscriber）
- CloudWatch Alarm の閾値設定（GreaterThanThreshold: 0 で 1件以上で発火）
- Lambda のエラーカウント: try-catch 内でハンドリングすると「成功」扱い
- Terraform の count 制約（apply 時に決まる値には依存できない）
- アラームから動的にログ取得先を判定（namespace + dimensions）

**トラブルシューティング:**
| 問題 | 原因 | 解決 |
|------|------|------|
| Lambda が SNS からトリガーされない | IAM 権限不足 | sns:*, cloudwatch:* 追加 |
| アラームが ALARM にならない | threshold=1.0 で 2件以上必要 | threshold=0 に変更 |
| Lambda エラーがカウントされない | try-catch 内は「成功」 | handler 冒頭で throw |

**作成したリソース:**
| リソース | 名前 |
|----------|------|
| SNS Topic | personal-assistant-dev-alarms |
| CloudWatch Alarm | personal-assistant-dev-daily-report-errors |
| Lambda | personal-assistant-dev-incident-analyzer |

**アーキテクチャ:**
```
Lambda エラー発生
    ↓
CloudWatch Metrics (Errors > 0)
    ↓
CloudWatch Alarm → ALARM
    ↓
SNS Topic
    ↓
incident-analyzer Lambda
    ↓
CloudWatch Logs API（過去15分のエラーログ取得）
    ↓
Claude API（原因分析）
    ↓
ログ出力（メール通知は未設定）
```

**Claude 分析結果サンプル:**
```
### 原因の推定
テスト目的で意図的にエラーを発生させたため。

### 影響範囲
開発環境での意図的なテストエラーのため、本番サービスへの影響はなし。

### 推奨対応
1. テスト完了確認
2. アラーム状態の正常化
3. テスト手順の整備
```

**成果物:**
- terraform/modules/sns/（main.tf, variables.tf, outputs.tf）
- terraform/modules/cloudwatch-alarm/（main.tf, variables.tf, outputs.tf）
- bots/incident-analyzer/index.mjs

**次回:** Day 38 - コスト監視Bot or MCP サーバー

---

### Day 38 (2026-01-30)

**テーマ:** コスト監視Bot

**完了したこと:**
- Cost Explorer API の概念理解
- cost-monitor Lambda 作成（コスト取得 + 異常検知 + Claude分析 + SES通知）
- Terraform 設定追加（IAM、EventBridge、Lambda）
- Cost Explorer 有効化（AWS コンソール）

**システム構成:**
```
EventBridge (毎朝 9:00 JST)
    ↓
Lambda (cost-monitor)
    ↓
Cost Explorer API（過去2日分のコスト取得）
    ↓
異常検知（前日比 50% 以上で警告）
    ↓
Claude API（コスト分析レポート生成）
    ↓
SES（メール通知）
```

**Cost Explorer API:**
- GetCostAndUsage: 指定期間のコストをサービス別に取得
- us-east-1 リージョン限定（グローバルサービス）
- 有効化後、データ利用可能まで最大24時間

**Lambda コードの機能:**
| 関数 | 役割 |
|------|------|
| `getCosts()` | Cost Explorer API でサービス別コスト取得 |
| `formatCostData()` | API レスポンスを整形 |
| `detectAnomaly()` | 前日比 50% 以上増加で警告フラグ |
| `analyzeWithClaude()` | Claude でコスト分析レポート生成 |
| `sendEmail()` | SES でメール通知 |

**学んだこと:**
- Cost Explorer API は us-east-1 のみ対応
- 有効化に24時間かかる場合がある
- Granularity: DAILY / MONTHLY / HOURLY
- GroupBy で SERVICE 別に分解可能

**作成されたリソース:**
| リソース | 名前 |
|----------|------|
| Lambda | personal-assistant-dev-cost-monitor |
| IAM Role | personal-assistant-dev-cost-monitor-role |
| EventBridge | personal-assistant-dev-cost-monitor-schedule |

**成果物:**
- bots/cost-monitor/index.mjs
- terraform/main.tf（Cost Monitor セクション追加）

**次回:** Day 39 - MCP サーバー構築（Cost Explorer 24時間待ちのため）

---

### Day 39 (2026-01-31)

**テーマ:** MCP サーバー構築

**完了したこと:**
- MCP の概念復習（Bot vs MCP の違い）
- GitHub MCP サーバー作成（TypeScript）
- 5つのツール実装（PR/Issue/Commit 操作）
- 依存関係インストール

**Bot vs MCP の違い:**
```
【Bot】一方向・自動化
EventBridge → Lambda → 処理 → 通知
（定期実行、トリガー駆動）

【MCP】双方向・対話的
Claude ←→ MCP Server ←→ 外部サービス
（ユーザーの指示で都度実行）
```

**実装したツール:**
| ツール | 機能 |
|--------|------|
| `list_prs` | PR 一覧取得（state, limit 指定可） |
| `list_issues` | Issue 一覧取得（PR除外） |
| `list_commits` | 最近のコミット取得 |
| `create_issue` | 新規 Issue 作成 |
| `get_repo_info` | リポジトリ情報取得 |

**MCP サーバー構成:**
```
mcp-server/
├── package.json      # 依存関係定義
├── tsconfig.json     # TypeScript 設定
└── src/
    └── index.ts      # MCP サーバー本体
```

**使用ライブラリ:**
- `@modelcontextprotocol/sdk`: MCP 公式 SDK
- `zod`: スキーマバリデーション

**学んだこと:**
- MCP Server は stdio 経由で Claude と通信
- `server.tool()` でツールを定義
- zod でパラメータスキーマを定義
- console.error() で stderr にログ出力（stdout は MCP 通信用）

**成果物:**
- mcp-server/package.json
- mcp-server/tsconfig.json
- mcp-server/src/index.ts

**次のステップ:**
- TypeScript ビルド（npm run build）
- Claude Desktop 設定に追加
- 動作確認

---

### Day 40 (2026-01-31)

**テーマ:** MCP に Git 操作ツール追加

**完了したこと:**
- git_status ツール実装（変更ファイル一覧）
- git_commit ツール実装（ステージング + コミット）
- git_push ツール実装（リモートに push）
- git_log ツール実装（ローカルコミット履歴）
- Claude から直接 Git 操作の動作確認成功

**追加したツール:**
| ツール | 機能 |
|--------|------|
| `git_status` | 変更ファイル一覧表示 |
| `git_commit` | git add -A + git commit |
| `git_push` | git push origin {branch} |
| `git_log` | 最近のコミット履歴表示 |

**技術ポイント:**
- `child_process.exec` で Git コマンド実行
- `promisify` で async/await 対応
- `cwd` オプションでリポジトリパス指定
- エラーハンドリング（nothing to commit 等）

**実現したワークフロー:**
```
ユーザー: 「コミットして」
    ↓
Claude → MCP Server → git add + git commit
    ↓
Claude → MCP Server → git push
    ↓
ユーザー: 完了確認
```

**学んだこと:**
- MCP は GitHub API（リモート操作）と git コマンド（ローカル操作）の両方を統合できる
- TypeScript で child_process を使う際は promisify が便利
- コミットメッセージのエスケープ処理が必要（ダブルクォート）

**成果物:**
- mcp-server/src/index.ts（v1.1.0: Git ツール追加）

**MCP サーバー機能一覧（v1.1.0）:**
| カテゴリ | ツール | 機能 |
|----------|--------|------|
| GitHub API | list_prs | PR 一覧取得 |
| GitHub API | list_issues | Issue 一覧取得 |
| GitHub API | list_commits | リモートコミット取得 |
| GitHub API | create_issue | Issue 作成 |
| GitHub API | get_repo_info | リポジトリ情報取得 |
| Git コマンド | git_status | 変更状態確認 |
| Git コマンド | git_commit | コミット実行 |
| Git コマンド | git_push | プッシュ実行 |
| Git コマンド | git_log | ローカル履歴表示 |

**次回:** Day 41 - AWS コスト確認ツールを MCP に追加

---

### Day 40 続き (2026-01-31)

**追加作業:**

**1. MCP ユーティリティツール追加（3種）:**
| ツール | 機能 |
|--------|------|
| `search_files` | ファイル内テキスト検索（Windows findstr） |
| `get_today` | 今日の日付・曜日・時刻取得 |
| `project_stats` | プロジェクト統計（ファイル数、コミット数） |

**2. README 整備:**
- プロジェクト全体の README.md 更新（進捗、成果物、技術スタック）
- MCP サーバー用 README.md 新規作成（セットアップ手順、使い方）

**3. Phase 1 振り返り:**
- docs/phase1-summary.md 作成
- 達成したこと、学んだ技術、苦労したポイントを整理

**MCP サーバー機能一覧（v1.2.0）:**
| カテゴリ | ツール | 機能 |
|----------|--------|------|
| GitHub API | list_prs | PR 一覧取得 |
| GitHub API | list_issues | Issue 一覧取得 |
| GitHub API | list_commits | リモートコミット取得 |
| GitHub API | create_issue | Issue 作成 |
| GitHub API | get_repo_info | リポジトリ情報取得 |
| Git コマンド | git_status | 変更状態確認 |
| Git コマンド | git_commit | コミット実行 |
| Git コマンド | git_push | プッシュ実行 |
| Git コマンド | git_log | ローカル履歴表示 |
| ユーティリティ | search_files | ファイル内検索 |
| ユーティリティ | get_today | 日付・時刻取得 |
| ユーティリティ | project_stats | プロジェクト統計 |

**成果物:**
- mcp-server/src/index.ts（v1.2.0: ユーティリティ追加）
- mcp-server/README.md（新規）
- README.md（更新）
- docs/phase1-summary.md（新規）

**Day 40 完了！**

---

### Day 42 (2026-02-01)

**テーマ:** Phase 2 開始 - Bedrock Knowledge Bases で RAG 構築

**完了したこと:**
1. Phase 2 プロジェクト作成（knowledge-base/）
2. アーキテクチャ設計書作成
3. Terraform で Knowledge Bases 環境構築
   - S3 バケット（ドキュメント保存）
   - OpenSearch Serverless（ベクトルDB）
   - IAM ロール・ポリシー
   - Bedrock Knowledge Base + Data Source
4. OpenSearch インデックス手動作成（awscurl使用）
5. サンプルドキュメント 4 件をアップロード・同期
6. RAG クエリ成功（日本語・英語）

**作成したリソース:**
```
Knowledge Base ID: SDTDA89LQD
S3 Bucket: ai-knowledge-base-dev-docs-qh1m62zn
OpenSearch Collection: ai-knowledge-base-dev
リージョン: us-east-1
```

**サンプルドキュメント:**
| ファイル | 内容 |
|----------|------|
| lambda-troubleshooting.md | Lambda のよくあるエラーと解決策 |
| dynamodb-patterns.md | Single Table Design、GSI の使い方 |
| terraform-basics.md | 基本コマンド、ベストプラクティス |
| mcp-guide.md | MCP サーバーの作り方 |

**学んだこと:**
- RAG は「検索（Retrieve）」と「生成（Generate）」の 2 段階
- Knowledge Bases は Embedding + 検索を自動化、回答生成には LLM（Claude/Nova）が必要
- OpenSearch Serverless はコレクション作成後、インデックスを別途作成する必要がある
- Embedding の仕組み: 同じ文脈に出現する単語は似たベクトルになる（学習による）
- CLI で API を叩くと出典（citations）が返る、コンソール UI では表示されない

**トラブルシューティング:**
- OpenSearch インデックス未作成エラー → awscurl で手動作成
- PowerShell の JSON エスケープ問題 → ファイルに保存して file:// で渡す
- Bedrock モデルアクセス → Anthropic フォーム提出後 15 分待機、または Nova を使用

**成果物:**
- projects/knowledge-base/terraform/*.tf（7 ファイル）
- projects/knowledge-base/docs/architecture.md
- projects/knowledge-base/sample-docs/*.md（4 ファイル）

**次回:** Day 43 - MCP に Knowledge Bases 検索ツールを追加

---

### Day 43-44 (2026-02-01)

**テーマ:** MCP ツール追加 + フロントエンド作成 + 基本設計書完成

**完了したこと:**

1. **MCP サーバー v1.3.0**
   - search_knowledge_base ツール追加（RAG 検索）
   - @aws-sdk/client-bedrock-agent-runtime 導入
   - Claude Desktop からナレッジ検索が可能に

2. **基本設計書作成**
   - システム概要、アーキテクチャ図
   - 機能設計、データ設計、非機能要件
   - API 設計、コスト試算（約 $370/月）
   - Teams 連携設計（Azure Bot Service 経由）
   - CI/CD パイプライン設計（GitHub Actions）

3. **フロントエンド作成（React + Vite）**
   - チャット UI（デモモード動作確認済み）
   - サンプル質問ボタン
   - 出典表示機能
   - レスポンシブ対応

4. **Lambda API 設計**
   - Knowledge Bases 呼び出し Lambda
   - API Gateway + CloudFront 構成
   - Terraform 設定ファイル作成

5. **インフラ削除（コスト対策）**
   - OpenSearch Serverless を terraform destroy
   - S3 バケット削除

**作成したファイル:**
```
projects/knowledge-base/
├── docs/basic-design.md        # 基本設計書
├── frontend/                   # React フロントエンド
│   ├── src/App.tsx
│   ├── src/index.css
│   └── package.json
├── lambda/                     # API バックエンド
│   ├── src/index.ts
│   └── package.json
├── terraform/api-frontend.tf   # API + フロントエンド用（削除済み）
└── DEPLOY.md                   # デプロイ手順

projects/personal-assistant/mcp-server/
└── src/index.ts               # v1.3.0（13ツール）
```

**学んだこと:**
- React: コンポーネントベースの UI ライブラリ（Facebook 製）
- Vite: 高速なフロントエンドビルドツール（フランス語で「速い」）
- OpenSearch Serverless: 名前は Serverless だが最低 2 OCU が常時稼働（$350/月）
- フロントエンドは「見た目」、バックエンドの Knowledge Bases は同じものを使用

**コスト教訓:**
- OpenSearch Serverless は使わないときは必ず destroy
- 代替案: Aurora + pgvector（$50/月〜）、Pinecone（無料枠あり）

**GitHub 公開:**
- 基本設計書: https://github.com/mmandai10/100-days-aws-challenge/blob/main/projects/knowledge-base/docs/basic-design.md

**次回:** Phase 2（コンテナ基礎）Day 45 から開始

---

### ロードマップ更新 (2026-02-01)

**変更内容:**
- 100 Days Challenge → **200 Days Challenge** に拡張
- ロードマップ v5.0 → **v6.0** に更新
- 認定資格 **4つ** を目標に追加

**新しい Phase 構成:**
| Phase | Day | テーマ |
|-------|-----|--------|
| 0 | 1-28 | ShopX EC Platform ✅ |
| 1 | 29-44 | AI アシスタント + MCP + RAG ✅ |
| 2 | 45-65 | コンテナ基礎（Docker, ECS）← 次 |
| 3 | 66-90 | Kubernetes & EKS |
| 4 | 91-110 | CI/CD マスター |
| 5 | 111-140 | Agentic AI 実践 |
| 6 | 141-160 | 監視 & 運用 |
| 7 | 161-185 | 総合プロジェクト |
| 8 | 186-200 | 認定資格 & 仕上げ |

**認定資格目標:**
1. AWS Certified Developer - Associate（Day 111）
2. AWS Certified AI Practitioner（Day 141）
3. AWS Certified Solutions Architect - Associate（Day 185）
4. AWS Certified GenAI Developer - Professional（Day 195）

**次回 Day 45:** Docker 入門から開始！