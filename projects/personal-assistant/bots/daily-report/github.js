// github.js - GitHub API 連携
import { Octokit } from 'octokit';

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'mmandai10';

export async function getGitHubActivity(token) {
  const octokit = new Octokit({ auth: token });

  // 今日の日付範囲（UTC）
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

  const since = today.toISOString();
  const until = tomorrow.toISOString();

  console.log(`Fetching activity from ${since} to ${until}`);

  // 並列で取得
  const [commits, pullRequests, issues] = await Promise.all([
    getCommits(octokit, since),
    getPullRequests(octokit, since),
    getIssues(octokit, since)
  ]);

  return {
    date: today.toISOString().split('T')[0],
    commits,
    pullRequests,
    issues,
    summary: {
      totalCommits: commits.length,
      totalPRs: pullRequests.length,
      totalIssues: issues.length
    }
  };
}

async function getCommits(octokit, since) {
  try {
    // ユーザーのイベントからプッシュイベントを取得
    const { data: events } = await octokit.rest.activity.listPublicEventsForUser({
      username: GITHUB_USERNAME,
      per_page: 100
    });

    const pushEvents = events.filter(event => 
      event.type === 'PushEvent' && 
      new Date(event.created_at) >= new Date(since)
    );

    const commits = [];
    for (const event of pushEvents) {
      for (const commit of event.payload.commits || []) {
        commits.push({
          repo: event.repo.name,
          sha: commit.sha.substring(0, 7),
          message: commit.message.split('\n')[0], // 1行目のみ
          url: `https://github.com/${event.repo.name}/commit/${commit.sha}`
        });
      }
    }

    return commits;
  } catch (error) {
    console.error('Error fetching commits:', error.message);
    return [];
  }
}

async function getPullRequests(octokit, since) {
  try {
    // 検索APIでユーザーが作成したPRを取得
    const { data } = await octokit.rest.search.issuesAndPullRequests({
      q: `author:${GITHUB_USERNAME} type:pr created:>=${since.split('T')[0]}`,
      per_page: 100
    });

    return data.items.map(pr => ({
      repo: pr.repository_url.split('/').slice(-2).join('/'),
      number: pr.number,
      title: pr.title,
      state: pr.state,
      url: pr.html_url
    }));
  } catch (error) {
    console.error('Error fetching PRs:', error.message);
    return [];
  }
}

async function getIssues(octokit, since) {
  try {
    // 検索APIでユーザーが作成したIssueを取得
    const { data } = await octokit.rest.search.issuesAndPullRequests({
      q: `author:${GITHUB_USERNAME} type:issue created:>=${since.split('T')[0]}`,
      per_page: 100
    });

    return data.items.map(issue => ({
      repo: issue.repository_url.split('/').slice(-2).join('/'),
      number: issue.number,
      title: issue.title,
      state: issue.state,
      url: issue.html_url
    }));
  } catch (error) {
    console.error('Error fetching issues:', error.message);
    return [];
  }
}
