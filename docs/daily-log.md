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