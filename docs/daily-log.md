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