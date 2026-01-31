# MCP（Model Context Protocol）開発ガイド

## MCP とは

Claude などの AI モデルが外部ツールと連携するためのプロトコル。

### Bot との違い

| 項目 | Bot | MCP |
|------|-----|-----|
| 方向 | 一方向（自動実行） | 双方向（対話的） |
| トリガー | EventBridge 等 | ユーザーの指示 |
| 実行場所 | クラウド（Lambda） | ローカル PC |
| ユースケース | 定期レポート | 対話的な操作 |

```
【Bot】一方向・自動実行
EventBridge → Lambda → 処理 → 通知
（ユーザー不在でも動く）

【MCP】双方向・対話的
Claude ←→ MCP Server ←→ 外部サービス
（ユーザーの指示で都度実行）
```

## MCP サーバーの作り方

### 1. プロジェクト作成

```bash
mkdir mcp-server
cd mcp-server
npm init -y
npm install @modelcontextprotocol/sdk zod
npm install -D typescript @types/node
```

### 2. TypeScript 設定

tsconfig.json:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "dist",
    "strict": true
  }
}
```

### 3. ツール定義

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "my-server",
  version: "1.0.0",
});

// ツール定義
server.tool(
  "tool_name",           // ツール名
  "ツールの説明",         // 説明
  {                      // パラメータスキーマ（zod）
    param1: z.string().describe("パラメータ1"),
    param2: z.number().optional().describe("パラメータ2"),
  },
  async ({ param1, param2 }) => {  // 実行関数
    // 処理
    return {
      content: [{ type: "text", text: "結果" }],
    };
  }
);

// サーバー起動
const transport = new StdioServerTransport();
await server.connect(transport);
```

### 4. ビルドと設定

```bash
npm run build  # tsc でコンパイル
```

Claude Desktop 設定（claude_desktop_config.json）:
```json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["C:/path/to/mcp-server/dist/index.js"],
      "env": {
        "API_KEY": "xxx"
      }
    }
  }
}
```

## 注意点

### stdout と stderr の使い分け

- stdout: MCP 通信専用（JSON-RPC）
- stderr: ログ出力用

```typescript
// ログは console.error で出力
console.error("Processing started");

// console.log は使わない（MCP 通信を壊す）
```

### エラーハンドリング

```typescript
server.tool("my_tool", "...", {}, async () => {
  try {
    const result = await doSomething();
    return { content: [{ type: "text", text: result }] };
  } catch (error: any) {
    return { 
      content: [{ type: "text", text: `エラー: ${error.message}` }],
      isError: true 
    };
  }
});
```

## 実装済みツール例

| ツール | 機能 |
|--------|------|
| list_prs | GitHub PR 一覧取得 |
| create_issue | GitHub Issue 作成 |
| git_status | ローカル Git 状態確認 |
| git_commit | ステージング + コミット |
| git_push | リモートにプッシュ |
| search_files | ファイル内テキスト検索 |
