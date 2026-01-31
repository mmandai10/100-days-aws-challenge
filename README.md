# 100 Days AWS Challenge

100日間で AWS + AI を学ぶ実践型チャレンジプロジェクト

## 概要

| 項目 | 内容 |
|------|------|
| 開始日 | 2025年9月14日 |
| 現在 | Day 40 / 100 |
| Phase | Phase 1: パーソナル AI アシスタント |

## 進捗

```
Phase 0: ShopX EC Platform      [##########] 100% (Day 1-28)
Phase 1: AI アシスタント        [########--]  80% (Day 29-50)
Phase 2: AI ナレッジベース      [----------]   0% (Day 51-70)
Phase 3: 画像分析アプリ         [----------]   0% (Day 71-90)
Phase 4: チャットボット SaaS    [----------]   0% (Day 91-120)
Phase 5: インフラ自動化         [----------]   0% (Day 121-150)
```

## 完成した成果物

### Phase 0: ShopX EC Platform (Day 1-28)

フルスタック EC サイト

- **フロントエンド**: React + TypeScript + Vite
- **バックエンド**: Lambda + API Gateway + DynamoDB
- **認証**: Cognito
- **決済**: Stripe
- **CI/CD**: GitHub Actions + Amplify Hosting
- **本番 URL**: https://main.d20nytcowp331l.amplifyapp.com

### Phase 1: パーソナル AI アシスタント (Day 29-50) - 進行中

DevOps 自動化ツール群（Terraform で IaC 管理）

**Bot 層（自動化）**
| Bot | トリガー | 機能 |
|-----|----------|------|
| 日報 Bot | EventBridge (18:00 JST) | GitHub 活動 → Claude 分析 → メール通知 |
| Incident Analyzer | CloudWatch Alarm | エラーログ → Claude 原因分析 → 通知 |
| Cost Monitor | EventBridge (毎朝) | AWS コスト → 異常検知 → 通知 |

**MCP 層（対話操作）**
| カテゴリ | ツール |
|----------|--------|
| GitHub API | list_prs, list_issues, list_commits, create_issue, get_repo_info |
| Git コマンド | git_status, git_commit, git_push, git_log |
| ユーティリティ | search_files, get_today, project_stats |

## 技術スタック

### 言語・フレームワーク
- TypeScript / JavaScript
- React + Vite
- Node.js

### AWS サービス
- Lambda, API Gateway, DynamoDB
- Cognito, S3, CloudFront
- EventBridge, SNS, SES
- CloudWatch, Secrets Manager
- Cost Explorer

### IaC・DevOps
- Terraform
- GitHub Actions
- AWS SAM

### AI
- Claude API (Anthropic)
- MCP (Model Context Protocol)
- Tool Use

## プロジェクト構成

```
100-days-aws-challenge/
├── docs/
│   ├── daily-log.md          # 毎日の学習記録
│   └── learning-roadmap.md   # 学習計画
├── projects/
│   ├── ec-platform/          # Phase 0: ShopX
│   │   ├── frontend/         # React アプリ
│   │   └── backend-node/     # Lambda 関数群
│   └── personal-assistant/   # Phase 1: AI アシスタント
│       ├── bots/             # Lambda Bot 群
│       ├── mcp-server/       # MCP サーバー
│       └── terraform/        # IaC 定義
└── .github/
    └── workflows/            # CI/CD
```

## ローカル開発

### 必要なツール
- Node.js 20+
- AWS CLI
- Terraform
- Git

### MCP サーバー起動
```bash
cd projects/personal-assistant/mcp-server
npm install
npm run build
```

Claude Desktop の設定に追加:
```json
{
  "mcpServers": {
    "github-assistant": {
      "command": "node",
      "args": ["C:\\100-days-aws-challenge\\projects\\personal-assistant\\mcp-server\\dist\\index.js"],
      "env": {
        "GITHUB_TOKEN": "your-token",
        "GITHUB_OWNER": "mmandai10",
        "GITHUB_REPO": "100-days-aws-challenge"
      }
    }
  }
}
```

## 学んだこと

- サーバーレスアーキテクチャ設計
- DynamoDB Single Table Design
- Terraform によるインフラ管理
- Claude API + Tool Use による AI 統合
- MCP サーバー開発
- EventBridge による定期実行
- CloudWatch + SNS によるアラート連携

## 参考

- [Anthropic Docs](https://docs.anthropic.com)
- [MCP Docs](https://modelcontextprotocol.io)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [AWS SAM](https://docs.aws.amazon.com/serverless-application-model/)

---

最終更新: 2026-01-31
