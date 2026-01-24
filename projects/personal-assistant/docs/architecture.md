# DevOps AI コックピット - アーキテクチャ設計

## 概要

開発・運用に必要な操作を、AIに話しかけて実行できるツール。
MCP（対話操作）とBot（自動化）の両方を備える。

---

## Phase 1 スコープ（Day 29-50）

### MCP機能
- GitHub連携（PR/Issue/コミット取得・操作）

### Bot機能
- 日報自動生成（毎日18時、GitHub活動→日報→Slack通知）

---

## アーキテクチャ図

```
┌─────────────────────────────────────────────────────────────┐
│                 DevOps AI コックピット                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  【MCP（対話操作）】                                         │
│                                                             │
│  Claude Desktop                                             │
│       │                                                     │
│       ▼                                                     │
│  ┌─────────────┐    ┌─────────────┐    ┌──────────────┐    │
│  │ API Gateway │───▶│ Lambda      │───▶│ GitHub API   │    │
│  │ (REST)      │    │ (MCP Server)│    └──────────────┘    │
│  └─────────────┘    └─────────────┘                        │
│                           │                                 │
│                           ▼                                 │
│                     ┌───────────┐                           │
│                     │ DynamoDB  │                           │
│                     │ (履歴)    │                           │
│                     └───────────┘                           │
│                                                             │
│  【Bot（自動化）】                                           │
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌──────────────┐    │
│  │ EventBridge │───▶│ Lambda      │───▶│ Claude API   │    │
│  │ (18:00 JST) │    │ (日報生成)  │    └──────────────┘    │
│  └─────────────┘    └─────────────┘           │            │
│                           │                   │            │
│                           ▼                   ▼            │
│                     ┌───────────┐    ┌──────────────┐      │
│                     │ GitHub API│    │ Slack API    │      │
│                     │ (活動取得)│    │ (通知)       │      │
│                     └───────────┘    └──────────────┘      │
│                                                             │
│  【共通基盤】                                                │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Secrets Manager                                      │   │
│  │ - GITHUB_TOKEN                                       │   │
│  │ - SLACK_WEBHOOK_URL                                  │   │
│  │ - ANTHROPIC_API_KEY                                  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ CloudWatch Logs（全Lambda）                          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## AWSサービス一覧

| サービス | 用途 | Terraformモジュール |
|----------|------|---------------------|
| Lambda | MCP Server, 日報生成 | modules/lambda |
| API Gateway | MCPエンドポイント | modules/api-gateway |
| DynamoDB | 会話履歴, 日報履歴 | modules/dynamodb |
| EventBridge | 定期実行 | modules/eventbridge |
| Secrets Manager | トークン管理 | modules/secrets |
| IAM | 権限管理 | 各モジュール内 |
| CloudWatch | ログ・監視 | 各モジュール内 |

---

## DynamoDB テーブル設計

### conversations テーブル（会話履歴）

| 属性 | 型 | 説明 |
|------|-----|------|
| PK | String | `USER#<user_id>` |
| SK | String | `CONV#<timestamp>` |
| messages | List | 会話メッセージ配列 |
| created_at | String | 作成日時 |
| updated_at | String | 更新日時 |

### daily_reports テーブル（日報履歴）

| 属性 | 型 | 説明 |
|------|-----|------|
| PK | String | `USER#<user_id>` |
| SK | String | `REPORT#<date>` |
| github_summary | Map | GitHub活動サマリー |
| report_content | String | 生成された日報 |
| created_at | String | 作成日時 |

---

## Lambda関数一覧

| 関数名 | トリガー | 役割 |
|--------|----------|------|
| mcp-server | API Gateway | MCP リクエスト処理 |
| daily-report-generator | EventBridge (18:00) | 日報生成・通知 |

---

## MCP ツール定義（Phase 1）

### GitHub Tools

| ツール名 | 説明 |
|----------|------|
| `github_list_commits` | 指定期間のコミット一覧取得 |
| `github_list_prs` | PR一覧取得（状態フィルタ可） |
| `github_list_issues` | Issue一覧取得 |
| `github_get_pr_detail` | PR詳細取得 |
| `github_create_issue` | Issue作成 |
| `github_add_label` | ラベル追加 |

---

## Terraform ファイル構成

```
terraform/
├── main.tf              # モジュール呼び出し
├── variables.tf         # グローバル変数
├── outputs.tf           # 出力
├── terraform.tfvars     # 変数値
│
└── modules/
    ├── lambda/
    │   ├── main.tf
    │   ├── variables.tf
    │   └── outputs.tf
    │
    ├── api-gateway/
    │   ├── main.tf
    │   ├── variables.tf
    │   └── outputs.tf
    │
    ├── dynamodb/
    │   ├── main.tf
    │   ├── variables.tf
    │   └── outputs.tf
    │
    ├── eventbridge/
    │   ├── main.tf
    │   ├── variables.tf
    │   └── outputs.tf
    │
    └── secrets/
        ├── main.tf
        ├── variables.tf
        └── outputs.tf
```

---

## 実装順序

1. **Secrets Manager** - トークン管理（他が依存）
2. **DynamoDB** - データストア
3. **Lambda (MCP Server)** - コア機能
4. **API Gateway** - エンドポイント
5. **Lambda (日報生成)** - Bot機能
6. **EventBridge** - 定期実行

---

## 将来拡張（Phase 2以降）

| Phase | 追加機能 |
|-------|----------|
| Phase 2 | AWS MCP（コスト、ログ分析） |
| Phase 3 | Slack MCP、Calendar MCP |
| Phase 4 | インシデント対応Bot、Web UI |
| Phase 5 | Terraform生成、自然言語→IaC |

---

## 参考リンク

- [MCP Specification](https://modelcontextprotocol.io)
- [Anthropic API Docs](https://docs.anthropic.com)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
