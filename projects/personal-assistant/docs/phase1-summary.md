# Phase 1 振り返り - パーソナル AI アシスタント

## 期間
Day 29 - 40（進行中）

## 達成したこと

### Bot 層（自動化）

| Bot | 状態 | 技術 |
|-----|------|------|
| 日報 Bot | 完成 | EventBridge + Lambda + Claude API + SES |
| Incident Analyzer | 完成 | CloudWatch Alarm + SNS + Lambda + Claude API |
| Cost Monitor | 待機中 | Cost Explorer API（データ準備待ち） |

### MCP 層（対話操作）

12 ツールを実装:

| カテゴリ | ツール数 | 内容 |
|----------|---------|------|
| GitHub API | 5 | PR/Issue/Commit 操作 |
| Git コマンド | 4 | status/commit/push/log |
| ユーティリティ | 3 | 検索/日付/統計 |

### インフラ（Terraform）

| モジュール | 役割 |
|------------|------|
| secrets | Secrets Manager（API キー管理） |
| lambda | Lambda + IAM Role |
| dynamodb | DynamoDB テーブル |
| eventbridge | 定期実行スケジュール |
| sns | 通知トピック |
| cloudwatch-alarm | アラート設定 |

## 学んだ技術

### Terraform

- Provider 設定と認証
- 変数、出力、ファイル分割
- モジュール化（再利用可能な設計）
- count による条件付きリソース
- archive_file で Lambda ZIP 作成

### AWS サービス

| サービス | 学んだこと |
|----------|-----------|
| Lambda | Node.js 20 ランタイム、環境変数、IAM ロール |
| Secrets Manager | 機密情報の安全な管理、Lambda からの取得 |
| EventBridge | cron 式（UTC 指定）、Lambda トリガー |
| DynamoDB | Single Table Design、TTL 設定 |
| SNS | Topic + Subscription パターン |
| CloudWatch | Alarm 閾値設定、ログ取得 |
| SES | サンドボックス、メール送信 |
| Cost Explorer | us-east-1 限定、有効化に24時間 |

### Claude API / AI

| 項目 | 内容 |
|------|------|
| Messages API | 基本的な呼び出し |
| Tool Use | Lambda 内でツール判断させる |
| 分析プロンプト | インシデント原因分析、コストレポート |

### MCP (Model Context Protocol)

- stdio 通信の仕組み
- server.tool() によるツール定義
- zod によるスキーマバリデーション
- child_process で外部コマンド実行
- Claude Desktop への設定追加

## アーキテクチャ理解

### Bot vs MCP

```
【Bot】一方向・自動化
EventBridge → Lambda → 処理 → 通知
- 定期実行、トリガー駆動
- ユーザー不在でも動作

【MCP】双方向・対話的
Claude ←→ MCP Server ←→ 外部サービス
- ユーザーの指示で都度実行
- リアルタイムな操作
```

### 使い分け

| ユースケース | 適切な方式 |
|-------------|-----------|
| 毎日の定期レポート | Bot |
| アラート対応 | Bot |
| 対話的なコード確認 | MCP |
| Git 操作 | MCP |

## 苦労したこと / 学び

### 1. Terraform の count 制約
- apply 後に決まる値には依存できない
- 解決: 静的な値を使うか、分離して管理

### 2. CloudWatch Alarm の閾値
- threshold=1.0 だと「1より大きい」= 2件以上
- 解決: threshold=0（0より大きい = 1件以上）

### 3. Lambda エラーカウント
- try-catch 内でハンドリングすると「成功」扱い
- 解決: 意図的にエラーを出すなら handler 冒頭で throw

### 4. Cost Explorer API
- us-east-1 限定
- 有効化後 24 時間待ち

### 5. MCP の stdout/stderr
- stdout は MCP 通信専用
- ログは console.error() で stderr へ

## 成果物

```
projects/personal-assistant/
├── bots/
│   ├── daily-report-simple/   # 日報 Bot
│   ├── incident-analyzer/     # インシデント分析 Bot
│   └── cost-monitor/          # コスト監視 Bot
├── mcp-server/
│   ├── src/index.ts           # MCP サーバー（12ツール）
│   └── README.md              # ドキュメント
├── terraform/
│   ├── main.tf                # メイン設定
│   ├── variables.tf           # 変数定義
│   └── modules/               # 6モジュール
└── docs/
    └── architecture.md        # 設計ドキュメント
```

## 次のステップ

### Phase 1 残り（Day 41-50）

- [ ] Cost Monitor テスト完了
- [ ] AWS コストツールを MCP に追加
- [ ] 総合テスト
- [ ] Phase 1 完成

### Phase 2 以降

- RAG + Bedrock（AI ナレッジベース）
- 画像分析 + Rekognition
- マルチテナント SaaS
- インフラ自動化ダッシュボード

## 所感

- **IaC の価値**: Terraform でインフラをコード化すると、再現性と理解が深まる
- **Bot + MCP の組み合わせ**: 自動化と対話操作を使い分けることで、効率的な DevOps ワークフローが実現
- **Claude API の実用性**: ログ分析やレポート生成に AI を組み込むと、人間の負担が大幅に減る
- **MCP の可能性**: Claude から直接ツールを操作できるのは革命的。今後の拡張が楽しみ
