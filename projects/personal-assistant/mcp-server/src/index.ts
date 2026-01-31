import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

// GitHub API ベースURL
const GITHUB_API = "https://api.github.com";

// 環境変数から設定を取得
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || "mmandai10";
const GITHUB_REPO = process.env.GITHUB_REPO || "100-days-aws-challenge";
const REPO_PATH = process.env.REPO_PATH || "C:\\100-days-aws-challenge";

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

// Git コマンド実行ヘルパー
async function runGitCommand(command: string): Promise<{ stdout: string; stderr: string }> {
  try {
    const { stdout, stderr } = await execAsync(command, { cwd: REPO_PATH });
    return { stdout, stderr };
  } catch (error: any) {
    throw new Error(`Git command failed: ${error.message}`);
  }
}

// MCP サーバー作成
const server = new McpServer({
  name: "github-assistant",
  version: "1.1.0",
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

// =====================================================
// Tool 6: Git Status（ローカル変更確認）
// =====================================================
server.tool(
  "git_status",
  "ローカルリポジトリの変更状態を確認します",
  {},
  async () => {
    try {
      const { stdout } = await runGitCommand("git status --short");
      
      if (!stdout.trim()) {
        return {
          content: [
            {
              type: "text" as const,
              text: "変更はありません（working tree clean）",
            },
          ],
        };
      }

      // ステータスを解析
      const lines = stdout.trim().split("\n");
      const changes = lines.map(line => {
        const status = line.substring(0, 2);
        const file = line.substring(3);
        let statusText = "";
        
        if (status.includes("M")) statusText = "modified";
        else if (status.includes("A")) statusText = "added";
        else if (status.includes("D")) statusText = "deleted";
        else if (status.includes("?")) statusText = "untracked";
        else statusText = status.trim();
        
        return { status: statusText, file };
      });

      return {
        content: [
          {
            type: "text" as const,
            text: `変更ファイル (${changes.length}件):\n${JSON.stringify(changes, null, 2)}`,
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: "text" as const,
            text: `エラー: ${error.message}`,
          },
        ],
      };
    }
  }
);

// =====================================================
// Tool 7: Git Commit（ステージング + コミット）
// =====================================================
server.tool(
  "git_commit",
  "変更をステージングしてコミットします",
  {
    message: z.string().describe("コミットメッセージ"),
    addAll: z.boolean().default(true).describe("全ファイルをステージングするか"),
  },
  async ({ message, addAll }) => {
    try {
      // ステージング
      if (addAll) {
        await runGitCommand("git add -A");
      }

      // コミット
      const { stdout } = await runGitCommand(`git commit -m "${message.replace(/"/g, '\\"')}"`);
      
      return {
        content: [
          {
            type: "text" as const,
            text: `コミット完了:\n${stdout}`,
          },
        ],
      };
    } catch (error: any) {
      // 変更がない場合
      if (error.message.includes("nothing to commit")) {
        return {
          content: [
            {
              type: "text" as const,
              text: "コミットする変更がありません",
            },
          ],
        };
      }
      return {
        content: [
          {
            type: "text" as const,
            text: `エラー: ${error.message}`,
          },
        ],
      };
    }
  }
);

// =====================================================
// Tool 8: Git Push（リモートにプッシュ）
// =====================================================
server.tool(
  "git_push",
  "コミットをリモートリポジトリにプッシュします",
  {
    branch: z.string().default("main").describe("プッシュ先ブランチ"),
  },
  async ({ branch }) => {
    try {
      const { stdout, stderr } = await runGitCommand(`git push origin ${branch}`);
      
      return {
        content: [
          {
            type: "text" as const,
            text: `プッシュ完了 (${branch}):\n${stdout || stderr || "成功"}`,
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: "text" as const,
            text: `エラー: ${error.message}`,
          },
        ],
      };
    }
  }
);

// =====================================================
// Tool 9: Git Log（最近のローカルコミット）
// =====================================================
server.tool(
  "git_log",
  "ローカルの最近のコミット履歴を表示します",
  {
    limit: z.number().min(1).max(20).default(5).describe("表示件数"),
  },
  async ({ limit }) => {
    try {
      const { stdout } = await runGitCommand(
        `git log --oneline -n ${limit}`
      );
      
      const commits = stdout.trim().split("\n").map(line => {
        const [sha, ...messageParts] = line.split(" ");
        return { sha, message: messageParts.join(" ") };
      });

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(commits, null, 2),
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: "text" as const,
            text: `エラー: ${error.message}`,
          },
        ],
      };
    }
  }
);

// =====================================================
// Tool 10: ファイル内テキスト検索
// =====================================================
server.tool(
  "search_files",
  "リポジトリ内のファイルからテキストを検索します（grep）",
  {
    query: z.string().describe("検索するテキスト"),
    filePattern: z.string().default("*").describe("ファイルパターン（例: *.ts, *.md）"),
  },
  async ({ query, filePattern }) => {
    try {
      // Windows の findstr を使用（大文字小文字区別なし）
      const { stdout } = await execAsync(
        `findstr /S /I /N /C:"${query}" ${filePattern}`,
        { cwd: REPO_PATH, maxBuffer: 1024 * 1024 }
      );

      const lines = stdout.trim().split("\n").slice(0, 20); // 最大20件
      const results = lines.map(line => {
        const colonIndex = line.indexOf(":");
        const secondColonIndex = line.indexOf(":", colonIndex + 1);
        return {
          file: line.substring(0, colonIndex),
          line: line.substring(colonIndex + 1, secondColonIndex),
          content: line.substring(secondColonIndex + 1).trim(),
        };
      });

      return {
        content: [
          {
            type: "text" as const,
            text: `検索結果 "${query}" (${results.length}件):\n${JSON.stringify(results, null, 2)}`,
          },
        ],
      };
    } catch (error: any) {
      if (error.code === 1) {
        return {
          content: [
            {
              type: "text" as const,
              text: `"${query}" は見つかりませんでした`,
            },
          ],
        };
      }
      return {
        content: [
          {
            type: "text" as const,
            text: `エラー: ${error.message}`,
          },
        ],
      };
    }
  }
);

// =====================================================
// Tool 11: 今日の日付・曜日を取得
// =====================================================
server.tool(
  "get_today",
  "今日の日付、曜日、時刻を取得します",
  {},
  async () => {
    const now = new Date();
    const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
    
    const info = {
      date: now.toISOString().split("T")[0],
      weekday: weekdays[now.getDay()],
      time: now.toTimeString().split(" ")[0],
      timestamp: now.toISOString(),
      dayOfYear: Math.floor(
        (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
      ),
    };

    return {
      content: [
        {
          type: "text" as const,
          text: `今日: ${info.date} (${info.weekday}) ${info.time}\n${JSON.stringify(info, null, 2)}`,
        },
      ],
    };
  }
);

// =====================================================
// Tool 12: プロジェクト統計
// =====================================================
server.tool(
  "project_stats",
  "プロジェクトの統計情報（ファイル数、コード行数など）を取得します",
  {},
  async () => {
    try {
      // ファイル数をカウント（.git 除外）
      const { stdout: fileCount } = await execAsync(
        `dir /S /B /A-D | find /C /V ""`,
        { cwd: REPO_PATH }
      );

      // TypeScript ファイル数
      const { stdout: tsCount } = await execAsync(
        `dir /S /B *.ts 2>nul | find /C /V ""`,
        { cwd: REPO_PATH }
      ).catch(() => ({ stdout: "0" }));

      // JavaScript ファイル数
      const { stdout: jsCount } = await execAsync(
        `dir /S /B *.js *.mjs 2>nul | find /C /V ""`,
        { cwd: REPO_PATH }
      ).catch(() => ({ stdout: "0" }));

      // Markdown ファイル数
      const { stdout: mdCount } = await execAsync(
        `dir /S /B *.md 2>nul | find /C /V ""`,
        { cwd: REPO_PATH }
      ).catch(() => ({ stdout: "0" }));

      // Git コミット数
      const { stdout: commitCount } = await runGitCommand(
        "git rev-list --count HEAD"
      );

      // 最終コミット日
      const { stdout: lastCommit } = await runGitCommand(
        "git log -1 --format=%ci"
      );

      const stats = {
        totalFiles: parseInt(fileCount.trim()) || 0,
        typeScriptFiles: parseInt(tsCount.trim()) || 0,
        javaScriptFiles: parseInt(jsCount.trim()) || 0,
        markdownFiles: parseInt(mdCount.trim()) || 0,
        totalCommits: parseInt(commitCount.trim()) || 0,
        lastCommitDate: lastCommit.trim(),
      };

      return {
        content: [
          {
            type: "text" as const,
            text: `プロジェクト統計:\n${JSON.stringify(stats, null, 2)}`,
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: "text" as const,
            text: `エラー: ${error.message}`,
          },
        ],
      };
    }
  }
);

// サーバー起動
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("GitHub MCP Server v1.2.0 started (with Git + Utility tools)");
}

main().catch(console.error);
