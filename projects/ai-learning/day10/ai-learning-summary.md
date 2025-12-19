# 12月 AI/LLM 基礎学習サマリー

## 学習期間
2024年12月（10日間）

## 学習目標
AI時代のフルスタックエンジニアとして、LLM/AI の基礎を習得する

---

## 各日の学習内容

| Day | テーマ | 成果物 | 習得スキル |
|-----|--------|--------|------------|
| 1 | API セットアップ | hello_claude.py | Anthropic SDK、環境構築 |
| 2 | Messages API | chat.py | 会話履歴管理、ロール設計 |
| 3 | プロンプト設計① | prompt_templates.py | 基本テンプレート、変数埋め込み |
| 4 | プロンプト設計② | improved_templates.py | Chain of Thought、Few-shot |
| 5 | Tool Use 基礎 | weather_tool.py | 関数定義、ツール呼び出し |
| 6 | Tool Use 実践 | travel_assistant.py | 複数ツール連携 |
| 7 | RAG 概念 | rag-understanding.md | Embedding、Vector DB 理解 |
| 8 | RAG 実装 | rag_qa.py 他 | Voyage AI、Chroma、類似検索 |
| 9 | MCP 入門 | MCP 検証 | MCP の概念、制限の理解 |
| 10 | まとめ | ai-learning-summary.md | 振り返り、次への計画 |

---

## 習得したスキル

### API 基礎
- Anthropic SDK のセットアップ
- Messages API の使い方
- 会話履歴の管理

### プロンプトエンジニアリング
- System プロンプトの設計
- Chain of Thought（段階的思考）
- Few-shot（例示による誘導）
- 出力フォーマットの指定

### Tool Use
- ツール定義（JSON Schema）
- Claude にツールを使わせる流れ
- 複数ツールの連携

### RAG（検索拡張生成）
- Embedding の概念と実装
- ベクトル類似検索
- Voyage AI + Chroma の組み合わせ
- コサイン類似度

### MCP（Model Context Protocol）
- MCP の概念理解
- Claude Desktop / Cursor での設定
- 現状の制限（発展途上）

---

## 学んだ教訓

### 技術的な学び
1. **設計を先に固める** - PK/SK 構造など、実装前に設計
2. **概念を理解してから実装** - コピペ職人にならない
3. **CloudWatch Logs でデバッグ** - エラーの根本原因を追う

### AI 学習の進め方
1. **公式ドキュメント重視** - Anthropic Docs が最も信頼できる
2. **段階的に進める** - 各ステップで確認してから次へ
3. **実装して理解** - 手を動かすことで定着

### ツール選択
1. **MCP は発展途上** - 本格利用は時期