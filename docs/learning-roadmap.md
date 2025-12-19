# 100 Days AWS Challenge - ロードマップ v5.0

## 現在のフェーズ
**12月：AI/LLM 基礎集中 + AI エージェント実践**

---

## 【進め方】
1. 公式ドキュメントを参照
2. 一つずつ確認しながら進める（各ステップで「OK」を待つ）
3. 理解しながら進める（コピペ職人にしない）
4. daily-log.md を更新する
5. **10分以上かけたエラーは記事化を検討**

---

## 【12月 AI カリキュラム】

### Phase 1: API 基礎（Day 1-10）✅ 完了

| Day | テーマ | 成果物 |
|-----|--------|--------|
| 1 | API セットアップ | hello_claude.py |
| 2 | Messages API | チャットスクリプト |
| 3 | プロンプト設計① | プロンプトテンプレート |
| 4 | プロンプト設計② | 改善版プロンプト |
| 5 | Tool Use 基礎 | 天気取得ツール |
| 6 | Tool Use 実践 | 複数ツール連携 |
| 7 | RAG 概念 | 理解ノート |
| 8 | RAG 実装 | ドキュメント Q&A |
| 9 | MCP 入門 | MCP 接続テスト |
| 10 | まとめ | 学習サマリー |

### Phase 2: AI エージェント実践（Day 11-15）🔄 進行中

| Day | テーマ | 内容 |
|-----|--------|------|
| 11 | Claude Code 導入 | インストール、CLAUDE.md 生成 ✅ |
| 12 | Claude Code 実践① | 既存コードの修正、Git問題解決 |
| 13 | Claude Code 実践② | 新機能をゼロから作成 |
| 14 | IaC 生成 | CloudFormation を AI に書かせる |
| 15 | まとめ | 振り返り、1月計画策定 |

---

## 【1月〜 AWS + ShopX】

### 開発環境・ツール（最初に決定）

| カテゴリ | 選定 |
|----------|------|
| フロントエンド | React + TypeScript + Vite |
| UI ライブラリ | Chakra UI / Tailwind + shadcn（Day 15 で決定）|
| フォーム | react-hook-form |
| テスト | Jest + React Testing Library |
| バックエンド | Node.js + Lambda（SAM） |
| DB | DynamoDB（Single Table Design） |
| 認証 | Cognito |
| CI/CD | GitHub Actions |
| デプロイ | Amplify（Frontend）+ SAM deploy（Backend）|

### 開発原則
- **テストファースト**: 機能実装前にテストを書く
- **CI/CD 最初から**: 初日にパイプライン構築
- **段階的リリース**: 小さく作って早くデプロイ

---

### Phase 1: 基盤構築（Week 1-2）

| タスク | 内容 |
|--------|------|
| プロジェクト作成 | Vite + React + TypeScript |
| テスト環境 | Jest + React Testing Library 導入 |
| CI/CD | GitHub Actions → Amplify 自動デプロイ |
| UI 基盤 | レイアウト、共通コンポーネント |
| API 基盤 | SAM init、Hello World Lambda |

### Phase 2: 商品機能（Week 3-4）

| タスク | 内容 |
|--------|------|
| 商品一覧 | DynamoDB 読み取り、一覧表示 |
| 商品詳細 | 詳細ページ、ルーティング |
| テスト | コンポーネントテスト実装 |

### Phase 3: カート・認証（Week 5-6）

| タスク | 内容 |
|--------|------|
| カート | 状態管理（Context / Zustand）|
| Cognito | ユーザー登録・ログイン |
| 保護ルート | 認証済みユーザーのみアクセス |

### Phase 4: 注文処理（Week 7-8）

| タスク | 内容 |
|--------|------|
| 注文フォーム | react-hook-form + バリデーション |
| 注文 API | Lambda + DynamoDB トランザクション |
| 注文履歴 | マイページ実装 |

### Phase 5: 管理機能（Week 9-10）

| タスク | 内容 |
|--------|------|
| 管理画面 | 商品 CRUD |
| 在庫管理 | 在庫更新機能 |
| 注文管理 | ステータス更新 |

### Phase 6: 高度な機能（Week 11-12）

| タスク | 内容 |
|--------|------|
| 検索 | OpenSearch / Algolia |
| AI チャット | Claude API 統合 |
| 監視 | CloudWatch ダッシュボード |

---

## 【ファイル構成】
```
C:\100-days-aws-challenge\
├── projects/
│   ├── ai-learning/          # 12月 AI学習用
│   │   ├── .env              # API キー（Git除外）
│   │   └── day01/〜day15/    # 日別の成果物
│   └── ec-platform/          # 1月〜 ShopX
│       ├── frontend/         # React アプリ
│       │   ├── src/
│       │   └── __tests__/    # テストファイル
│       ├── backend/          # SAM アプリ
│       └── .github/workflows/ # CI/CD
├── docs/
│   └── learning-roadmap.md
└── progress/
    └── daily-log.md
```

---

## 【リソース】

### AI 関連
- Anthropic Docs: https://docs.anthropic.com
- Anthropic Cookbook: https://github.com/anthropics/anthropic-cookbook
- MCP Docs: https://modelcontextprotocol.io

### React/TypeScript
- React 公式: https://react.dev
- TypeScript 公式: https://www.typescriptlang.org/docs/
- Vite: https://vitejs.dev

### AWS
- SAM: https://docs.aws.amazon.com/serverless-application-model/
- DynamoDB: https://docs.aws.amazon.com/dynamodb/
- Cognito: https://docs.aws.amazon.com/cognito/

### テスト
- Jest: https://jestjs.io
- Testing Library: https://testing-library.com/docs/react-testing-library/intro/

---

## AI エージェントとは

- 目標を与えると自律的に計画・実行・評価を繰り返す
- 単発のタスク処理ではなく、プロセス全体を自動化
- Claude Code = ソフトウェア開発エージェント