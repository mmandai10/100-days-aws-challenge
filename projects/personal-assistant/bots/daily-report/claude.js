// claude.js - Claude API 連携
import Anthropic from '@anthropic-ai/sdk';

export async function generateReport(apiKey, activity) {
  const client = new Anthropic({ apiKey });

  const prompt = buildPrompt(activity);

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ]
  });

  const reportContent = response.content[0].text;

  return {
    content: reportContent,
    generatedAt: new Date().toISOString(),
    model: response.model,
    usage: response.usage
  };
}

function buildPrompt(activity) {
  const { date, commits, pullRequests, issues, summary } = activity;

  let activityDetails = '';

  if (commits.length > 0) {
    activityDetails += '\n## コミット\n';
    commits.forEach(commit => {
      activityDetails += `- [${commit.repo}] ${commit.message} (${commit.sha})\n`;
    });
  }

  if (pullRequests.length > 0) {
    activityDetails += '\n## プルリクエスト\n';
    pullRequests.forEach(pr => {
      activityDetails += `- [${pr.repo}] #${pr.number}: ${pr.title} (${pr.state})\n`;
    });
  }

  if (issues.length > 0) {
    activityDetails += '\n## Issue\n';
    issues.forEach(issue => {
      activityDetails += `- [${issue.repo}] #${issue.number}: ${issue.title} (${issue.state})\n`;
    });
  }

  if (activityDetails === '') {
    activityDetails = '\n活動なし\n';
  }

  return `あなたはエンジニアの日報を作成するアシスタントです。
以下のGitHub活動データを元に、簡潔で読みやすい日報を作成してください。

## 日付
${date}

## 活動サマリー
- コミット数: ${summary.totalCommits}
- プルリクエスト数: ${summary.totalPRs}
- Issue数: ${summary.totalIssues}

## 詳細
${activityDetails}

## 日報フォーマット
以下の形式で日報を作成してください：

### ${date} 日報

**今日やったこと**
（活動内容を箇条書きで）

**学んだこと・気づき**
（コミットメッセージから推測して1-2点）

**明日やること**
（今日の活動から予測して1-2点）

---
簡潔に、3-5分で読める長さでお願いします。`;
}
