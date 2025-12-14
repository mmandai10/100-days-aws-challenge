# 100 Days AWS Challenge - ロードマップ v4.0
## 現在のフェーズ
**12月：AI/LLM 基礎集中（10日間）**
## 【進め方】
1. 公式ドキュメント（Anthropic Docs）を参照
2. 一つずつ確認しながら進める（各ステップで「OK」を待つ）
3. 理解しながら進める（コピペ職人にしない）
4. daily-log.md を更新する
## 【12月 AI カリキュラム】
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
## 【1月〜 AWS + ShopX】
- サーバーレス基盤 → 認証 → 管理機能 → 高度な機能
- AI は必要に応じて組み込む
- 詳細は1月開始時に計画
## 【ファイル構成】

C:\100-days-aws-challenge\projects\
├── ai-learning/          # 12月 AI学習用
│   ├── .env              # API キー（Git除外）
│   └── day01/〜day10/    # 日別の成果物
└── ec-platform/          # 1月〜 ShopX

## 【リソース】
- Anthropic Docs: https://docs.anthropic.com
- Anthropic Cookbook: https://github.com/anthropics/anthropic-cookbook
- MCP Docs: https://modelcontextprotocol.io