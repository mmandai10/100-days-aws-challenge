# GitHub Assistant MCP Server

Claude Desktop から GitHub と Git を操作できる MCP サーバー

## 機能一覧

### GitHub API（リモート操作）

| ツール | 説明 |
|--------|------|
| `list_prs` | PR 一覧取得 |
| `list_issues` | Issue 一覧取得 |
| `list_commits` | リモートコミット履歴取得 |
| `create_issue` | Issue 作成 |
| `get_repo_info` | リポジトリ情報取得 |

### Git コマンド（ローカル操作）

| ツール | 説明 |
|--------|------|
| `git_status` | 変更ファイル一覧 |
| `git_commit` | ステージング + コミット |
| `git_push` | リモートに push |
| `git_log` | ローカルコミット履歴 |

### ユーティリティ

| ツール | 説明 |
|--------|------|
| `search_files` | ファイル内テキスト検索 |
| `get_today` | 今日の日付・曜日・時刻 |
| `project_stats` | プロジェクト統計情報 |

## セットアップ

### 1. ビルド

```bash
cd projects/personal-assistant/mcp-server
npm install
npm run build
```

### 2. Claude Desktop 設定

`%APPDATA%\Claude\claude_desktop_config.json` に追加:

```json
{
  "mcpServers": {
    "github-assistant": {
      "command": "node",
      "args": [
        "C:\\100-days-aws-challenge\\projects\\personal-assistant\\mcp-server\\dist\\index.js"
      ],
      "env": {
        "GITHUB_TOKEN": "ghp_xxxxx",
        "GITHUB_OWNER": "mmandai10",
        "GITHUB_REPO": "100-days-aws-challenge",
        "REPO_PATH": "C:\\100-days-aws-challenge"
      }
    }
  }
}
```

### 3. Claude Desktop 再起動

設定後、Claude Desktop を再起動すると MCP サーバーが有効になります。

## 使い方の例

### コミット履歴を確認
```
「最近のコミットを5件見せて」
→ list_commits ツールが呼ばれる
```

### 変更をコミット
```
「今日の変更をコミットして」
→ git_status → git_commit → git_push
```

### ファイル検索
```
「EventBridge ってどこに書いてある？」
→ search_files ツールが呼ばれる
```

### Issue 作成
```
「バグ報告の Issue を作って」
→ create_issue ツールが呼ばれる
```

## 環境変数

| 変数 | 必須 | 説明 |
|------|------|------|
| `GITHUB_TOKEN` | ○ | GitHub Personal Access Token |
| `GITHUB_OWNER` | - | リポジトリオーナー（デフォルト: mmandai10） |
| `GITHUB_REPO` | - | リポジトリ名（デフォルト: 100-days-aws-challenge） |
| `REPO_PATH` | - | ローカルリポジトリパス（デフォルト: C:\100-days-aws-challenge） |

## 技術スタック

- TypeScript
- @modelcontextprotocol/sdk
- zod（スキーマバリデーション）
- child_process（Git コマンド実行）

## バージョン履歴

| バージョン | 内容 |
|------------|------|
| v1.0.0 | GitHub API ツール（5種） |
| v1.1.0 | Git コマンドツール追加（4種） |
| v1.2.0 | ユーティリティツール追加（3種） |
