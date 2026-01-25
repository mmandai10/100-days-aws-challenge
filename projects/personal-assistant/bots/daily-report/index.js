// index.js - Lambda エントリーポイント
import { getGitHubActivity } from './github.js';
import { generateReport } from './claude.js';
import { saveReport } from './dynamo.js';
import { getSecrets } from './secrets.js';

export const handler = async (event) => {
  console.log('Daily Report Bot started');
  console.log('Event:', JSON.stringify(event, null, 2));

  try {
    // 1. シークレット取得
    const secrets = await getSecrets();
    console.log('Secrets loaded');

    // 2. GitHub から今日の活動を取得
    const activity = await getGitHubActivity(secrets.githubToken);
    console.log('GitHub activity:', JSON.stringify(activity, null, 2));

    // 3. Claude で日報を生成
    const report = await generateReport(secrets.anthropicApiKey, activity);
    console.log('Report generated');

    // 4. DynamoDB に保存
    const savedReport = await saveReport(report, activity);
    console.log('Report saved:', savedReport.id);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Daily report generated successfully',
        reportId: savedReport.id,
        date: savedReport.date
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
