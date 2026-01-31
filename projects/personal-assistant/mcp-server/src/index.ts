import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// GitHub API ベースURL
const GITHUB_API = "https://api.github.com";

// 環境変数から設定を取得
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || "mmandai10";
const GITHUB_REPO = process.env.GITHUB_REPO || "100-days-aws-challenge";

// GitHub API リクエスト用ヘルパー
async function githubFetch(endpoint: string) {
  const response = await fetch(`${GITHUB_API}${endpoint}`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: GITHUB_TOKEN ? `token ${GITHUB_TOKEN}` : "",
      "User-Agent": "MCP-GitHub-Server",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// MCP サーバー作成
const server = new McpServer({
  name: "github-assistant",
  version: "1.0.0",
});

// =====================================================
// Tool 1: PR一覧を取得
// =====================================================
server.tool(
  "list_prs",
  "GitHub リポジトリの Pull Request 一覧を取得します",
  {
    state: z.enum(["open", "closed", "all"]).default("open").describe("PRの状態"),
    limit: z.number().min(1).max(30).default(10).describe("取得件数"),
  },
  async ({ state, limit }) => {
    const prs = await githubFetch(
      `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/pulls?state=${state}&per_page=${limit}`
    );

    const formatted = prs.map((pr: any) => ({
      number: pr.number,
      title: pr.title,
      state: pr.state,
      author: pr.user.login,
      created_at: pr.created_at,
      url: pr.html_url,
    }));

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(formatted, null, 2),
        },
      ],
    };
  }
);

// =====================================================
// Tool 2: Issue一覧を取得
// =====================================================
server.tool(
  "list_issues",
  "GitHub リポジトリの Issue 一覧を取得します",
  {
    state: z.enum(["open", "closed", "all"]).default("open").describe("Issueの状態"),
    limit: z.number().min(1).max(30).default(10).describe("取得件数"),
  },
  async ({ state, limit }) => {
    const issues = await githubFetch(
      `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues?state=${state}&per_page=${limit}`
    );

    // PRを除外（IssuesAPIはPRも返すため）
    const onlyIssues = issues.filter((issue: any) => !issue.pull_request);

    const formatted = onlyIssues.map((issue: any) => ({
      number: issue.number,
      title: issue.title,
      state: issue.state,
      author: issue.user.login,
      labels: issue.labels.map((l: any) => l.name),
      created_at: issue.created_at,
      url: issue.html_url,
    }));

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(formatted, null, 2),
        },
      ],
    };
  }
);

// =====================================================
// Tool 3: 最近のコミットを取得
// =====================================================
server.tool(
  "list_commits",
  "GitHub リポジトリの最近のコミット一覧を取得します",
  {
    limit: z.number().min(1).max(30).default(10).describe("取得件数"),
  },
  async ({ limit }) => {
    const commits = await githubFetch(
      `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits?per_page=${limit}`
    );

    const formatted = commits.map((commit: any) => ({
      sha: commit.sha.substring(0, 7),
      message: commit.commit.message.split("\n")[0], // 1行目のみ
      author: commit.commit.author.name,
      date: commit.commit.author.date,
      url: commit.html_url,
    }));

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(formatted, null, 2),
        },
      ],
    };
  }
);

// =====================================================
// Tool 4: Issueを作成
// =====================================================
server.tool(
  "create_issue",
  "GitHub リポジトリに新しい Issue を作成します",
  {
    title: z.string().describe("Issueのタイトル"),
    body: z.string().optional().describe("Issueの本文"),
    labels: z.array(z.string()).optional().describe("ラベル"),
  },
  async ({ title, body, labels }) => {
    if (!GITHUB_TOKEN) {
      return {
        content: [
          {
            type: "text" as const,
            text: "エラー: GITHUB_TOKEN が設定されていません。Issue作成には認証が必要です。",
          },
        ],
      };
    }

    const response = await fetch(
      `${GITHUB_API}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues`,
      {
        method: "POST",
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `token ${GITHUB_TOKEN}`,
          "User-Agent": "MCP-GitHub-Server",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body, labels }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      return {
        content: [
          {
            type: "text" as const,
            text: `Issue作成失敗: ${response.status} - ${error}`,
          },
        ],
      };
    }

    const issue = await response.json();

    return {
      content: [
        {
          type: "text" as const,
          text: `Issue #${issue.number} を作成しました: ${issue.html_url}`,
        },
      ],
    };
  }
);

// =====================================================
// Tool 5: リポジトリ情報を取得
// =====================================================
server.tool(
  "get_repo_info",
  "GitHub リポジトリの基本情報を取得します",
  {},
  async () => {
    const repo = await githubFetch(`/repos/${GITHUB_OWNER}/${GITHUB_REPO}`);

    const info = {
      name: repo.full_name,
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      open_issues: repo.open_issues_count,
      default_branch: repo.default_branch,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      url: repo.html_url,
    };

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(info, null, 2),
        },
      ],
    };
  }
);

// サーバー起動
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("GitHub MCP Server started"); // stderr に出力（stdoutはMCP通信用）
}

main().catch(console.error);
