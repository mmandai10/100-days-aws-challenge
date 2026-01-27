// index.mjs - シンプル版日報Bot（GitHub 活動取得のみ）
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

const secretsClient = new SecretsManagerClient({ region: 'ap-northeast-1' });

// 環境変数
const GITHUB_TOKEN_SECRET_NAME = process.env.GITHUB_TOKEN_SECRET_NAME;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_REPO = process.env.GITHUB_REPO;

/**
 * Secrets Manager から GitHub Token を取得
 */
async function getGitHubToken() {
  const command = new GetSecretValueCommand({ SecretId: GITHUB_TOKEN_SECRET_NAME });
  const response = await secretsClient.send(command);
  const secret = JSON.parse(response.SecretString);
  return secret.token;
}

/**
 * GitHub API で今日のコミットを取得
 */
async function getTodayCommits(token) {
  // 今日の開始時刻（UTC）
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const since = today.toISOString();

  const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/commits?since=${since}`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'DevOps-AI-Cockpit'
    }
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  const commits = await response.json();
  return commits;
}

/**
 * Lambda ハンドラー
 */
export const handler = async (event) => {
  console.log('=== Daily Report Bot (Simple) Started ===');
  console.log('Event:', JSON.stringify(event, null, 2));

  try {
    // 1. GitHub Token 取得
    console.log('Fetching GitHub token from Secrets Manager...');
    const token = await getGitHubToken();
    console.log('GitHub token retrieved successfully');

    // 2. 今日のコミット取得
    console.log(`Fetching commits for ${GITHUB_USERNAME}/${GITHUB_REPO}...`);
    const commits = await getTodayCommits(token);
    console.log(`Found ${commits.length} commits today`);

    // 3. コミット情報をログ出力
    const commitSummary = commits.map(c => ({
      sha: c.sha.substring(0, 7),
      message: c.commit.message.split('\n')[0], // 1行目のみ
      author: c.commit.author.name,
      date: c.commit.author.date
    }));

    console.log('Commit Summary:', JSON.stringify(commitSummary, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'GitHub activity retrieved successfully',
        date: new Date().toISOString().split('T')[0],
        commitCount: commits.length,
        commits: commitSummary
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to get GitHub activity',
        error: error.message
      })
    };
  }
};
