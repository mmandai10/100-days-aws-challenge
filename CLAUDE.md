# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Current Status

### 学習フェーズ
- **現在**: 12月 AI/LLM 学習 Day 11-15（Claude Code 実践）
- **次**: 1月〜 AWS + ShopX 開発

### 解決済みの問題
- ~~`.cursor/mcp.json` に GitHub トークンが Git 履歴に残っている~~ → **解決済み**（履歴をリセットして再コミット）
- `.cursor/` は `.gitignore` で除外済み

### ロードマップ v5.0
| Day | テーマ | 状態 |
|-----|--------|------|
| 11 | Claude Code 導入 | ✅ 完了 |
| 12 | Claude Code 実践① | 🔄 進行中 |
| 13 | Claude Code 実践② | 予定 |
| 14 | IaC 生成 | 予定 |
| 15 | まとめ・1月計画 | 予定 |

---

## Project Overview

100-day AWS learning challenge combining EC platform development (ShopX) with AI/LLM learning. The project follows a structured curriculum: AI fundamentals in December (Claude API, Tool Use, RAG, MCP), then AWS + ShopX development from January onward.

## Repository Structure
```
100-days-aws-challenge/
├── projects/
│   ├── ai-learning/          # 12月 AI学習（Day 1-15）
│   │   ├── .env              # API keys (Git除外)
│   │   ├── venv/             # Python virtual environment
│   │   └── day01-15/         # 日別の成果物
│   └── ec-platform/          # 1月〜 ShopX
│       ├── frontend/shopx-ui/
│       └── backend-node/shopx-api/
├── docs/
│   └── learning-roadmap.md   # ロードマップ v5.0
├── progress/
│   └── daily-log.md          # 毎日の学習記録
└── CLAUDE.md                 # このファイル
```

## Development Commands

### AI Learning (Python)
```bash
cd projects/ai-learning
.\venv\Scripts\activate      # Windows venv activation
python day01/hello_claude.py
```

### ShopX Frontend (React)
```bash
cd projects/ec-platform/frontend/shopx-ui
npm start                    # Dev server on localhost:3000
npm test                     # Run Jest tests
```

### ShopX Backend (SAM/Lambda)
```bash
cd projects/ec-platform/backend-node/shopx-api/shopx-api
sam build
sam deploy
sam local start-api          # Local API testing
```

### Git Operations
```bash
git status
git add .
git commit -m "message"
git push origin main
```

## Architecture

### ShopX Backend (Serverless)
- **API Gateway** → **Lambda** (Node.js 20.x) → **DynamoDB**
- Single Table Design with PK/SK pattern
- Lambda functions: getProducts, getProductById, getCategories

### AI Learning Modules (December)
- Day 1-10: Claude API, Prompt Engineering, Tool Use, RAG, MCP ✅
- Day 11-15: Claude Code agent practices 🔄

### 1月以降の開発原則
- **テストファースト**: Jest + React Testing Library
- **CI/CD 最初から**: GitHub Actions
- **段階的リリース**: 小さく作って早くデプロイ

## Key Patterns

### DynamoDB Single Table Design
- Categories: `PK=CATEGORY#<id>`, `SK=CATEGORY#<id>`
- Products: `PK=PRODUCT#<id>`, `SK=PRODUCT#<id>`

### Claude API Tool Use
Tools defined with name, description, input_schema. Claude returns `stop_reason: tool_use`.

## Resources
- Anthropic Docs: https://docs.anthropic.com
- MCP Docs: https://modelcontextprotocol.io
- React: https://react.dev
- AWS SAM: https://docs.aws.amazon.com/serverless-application-model/