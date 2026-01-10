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