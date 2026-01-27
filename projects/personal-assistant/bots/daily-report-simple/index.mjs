// index.mjs - 日報Bot（GitHub活動 + Claude AI生成 + DynamoDB保存 + SES通知）
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const secretsClient = new SecretsManagerClient({ region: 'ap-northeast-1' });
const dynamoClient = new DynamoDBClient({ region: 'ap-northeast-1' });
const docClient = DynamoDBDocumentClient.from(dynamoClient);
const sesClient = new SESClient({ region: 'ap-northeast-1' });

// 環境変数
const GITHUB_TOKEN_SECRET_NAME = process.env.GITHUB_TOKEN_SECRET_NAME;
const CLAUDE_API_KEY_SECRET_NAME = process.env.CLAUDE_API_KEY_SECRET_NAME;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_REPO = process.env.GITHUB_REPO;
const DYNAMODB_TABLE_NAME = process.env.DYNAMODB_TABLE_NAME;
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL;

/**
 * Secrets Manager からシークレットを取得
 */
async function getSecret(secretName, key) {
  const command = new GetSecretValueCommand({ SecretId: secretName });
  const response = await secretsClient.send(command);
  const secret = JSON.parse(response.SecretString);
  return secret[key];
}

/**
 * GitHub API で今日のコミットを取得
 */
async function getTodayCommits(token) {
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

  return await response.json();
}

/**
 * Claude API で日報を生成
 */
async function generateDailyReport(apiKey, commits, date) {
  const commitSummary = commits.map(c => ({
    message: c.commit.message.split('\n')[0],
    author: c.commit.author.name,
    time: c.commit.author.date
  }));

  const prompt = `あなたは優秀なエンジニアのアシスタントです。
以下のGitHub活動データを元に、簡潔で読みやすい日報を生成してください。

## 日付
${date}

## 今日のコミット（${commits.length}件）
${JSON.stringify(commitSummary, null, 2)}

## 出力フォーマット
以下の形式でMarkdown日報を作成してください（絵文字・アイコンは使わないこと）：

### ${date} 日報

#### 本日の成果
- （コミット内容を要約して箇条書き）

#### 詳細
（何を学んだか、何を実装したかを2-3文で）

#### 次のステップ
- （推測される次の作業を1-2個）

---
短く簡潔に、日本語で出力してください。`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        { role: 'user', content: prompt }
      ]
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Claude API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

/**
 * DynamoDB に日報を保存
 */
async function saveToDynamoDB(date, commitCount, commits, report) {
  const ttl = Math.floor(Date.now() / 1000) + (90 * 24 * 60 * 60);

  const item = {
    PK: `REPO#${GITHUB_USERNAME}/${GITHUB_REPO}`,
    SK: `DATE#${date}`,
    date: date,
    commitCount: commitCount,
    commits: commits,
    report: report,
    createdAt: new Date().toISOString(),
    ttl: ttl
  };

  const command = new PutCommand({
    TableName: DYNAMODB_TABLE_NAME,
    Item: item
  });

  await docClient.send(command);
  console.log('Daily report saved to DynamoDB');
}

/**
 * SES でメール送信
 */
async function sendEmailNotification(date, commitCount, report) {
  if (!NOTIFICATION_EMAIL) {
    console.log('NOTIFICATION_EMAIL not set, skipping email');
    return false;
  }

  const subject = `[DevOps AI] ${date} 日報 - ${commitCount}件のコミット`;
  
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    h1 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
    h2, h3, h4 { color: #1e40af; }
    .report { background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px; }
  </style>
</head>
<body>
  <h1>DevOps AI Cockpit - Daily Report</h1>
  <p><strong>日付:</strong> ${date}</p>
  <p><strong>コミット数:</strong> ${commitCount}件</p>
  <div class="report">
    ${report.replace(/\n/g, '<br>').replace(/####/g, '<h4>').replace(/###/g, '<h3>').replace(/##/g, '<h2>')}
  </div>
  <div class="footer">
    <p>このメールは DevOps AI Cockpit から自動送信されました。</p>
    <p>Repository: ${GITHUB_USERNAME}/${GITHUB_REPO}</p>
  </div>
</body>
</html>`;

  const textBody = `DevOps AI Cockpit - Daily Report\n\n日付: ${date}\nコミット数: ${commitCount}件\n\n${report}\n\n---\nこのメールは DevOps AI Cockpit から自動送信されました。`;

  const command = new SendEmailCommand({
    Source: NOTIFICATION_EMAIL,
    Destination: {
      ToAddresses: [NOTIFICATION_EMAIL]
    },
    Message: {
      Subject: {
        Charset: 'UTF-8',
        Data: subject
      },
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: htmlBody
        },
        Text: {
          Charset: 'UTF-8',
          Data: textBody
        }
      }
    }
  });

  await sesClient.send(command);
  console.log('Email notification sent successfully');
  return true;
}

/**
 * Lambda ハンドラー
 */
export const handler = async (event) => {
  console.log('=== Daily Report Bot Started ===');
  console.log('Event:', JSON.stringify(event, null, 2));

  const date = new Date().toISOString().split('T')[0];

  try {
    // 1. GitHub Token 取得
    console.log('Fetching GitHub token...');
    const githubToken = await getSecret(GITHUB_TOKEN_SECRET_NAME, 'token');

    // 2. 今日のコミット取得
    console.log(`Fetching commits for ${GITHUB_USERNAME}/${GITHUB_REPO}...`);
    const commits = await getTodayCommits(githubToken);
    console.log(`Found ${commits.length} commits today`);

    // コミット情報を整形
    const commitSummary = commits.map(c => ({
      sha: c.sha.substring(0, 7),
      message: c.commit.message.split('\n')[0],
      author: c.commit.author.name,
      date: c.commit.author.date
    }));

    // コミットがない場合
    if (commits.length === 0) {
      const noActivityReport = `### ${date} 日報\n\n#### 本日の成果\n- 今日はコミットがありませんでした\n\n#### 次のステップ\n- 学習を継続しましょう！`;
      
      // DynamoDB に保存
      if (DYNAMODB_TABLE_NAME) {
        await saveToDynamoDB(date, 0, [], noActivityReport);
      }

      // メール送信
      const emailSent = await sendEmailNotification(date, 0, noActivityReport);
      
      return {
        statusCode: 200,
        body: JSON.stringify({
          date: date,
          commitCount: 0,
          report: noActivityReport,
          saved: !!DYNAMODB_TABLE_NAME,
          emailSent: emailSent
        })
      };
    }

    // 3. Claude API キー取得
    console.log('Fetching Claude API key...');
    const claudeApiKey = await getSecret(CLAUDE_API_KEY_SECRET_NAME, 'api_key');

    // 4. Claude で日報生成
    console.log('Generating daily report with Claude...');
    const report = await generateDailyReport(claudeApiKey, commits, date);
    console.log('Report generated successfully');

    // 5. DynamoDB に保存
    if (DYNAMODB_TABLE_NAME) {
      await saveToDynamoDB(date, commits.length, commitSummary, report);
    }

    // 6. メール送信
    console.log('Sending email notification...');
    const emailSent = await sendEmailNotification(date, commits.length, report);

    return {
      statusCode: 200,
      body: JSON.stringify({
        date: date,
        commitCount: commits.length,
        report: report,
        saved: !!DYNAMODB_TABLE_NAME,
        emailSent: emailSent
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to generate daily report',
        error: error.message
      })
    };
  }
};
