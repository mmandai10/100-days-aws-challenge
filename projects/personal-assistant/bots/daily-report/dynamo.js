// dynamo.js - DynamoDB 保存
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { randomUUID } from 'crypto';

const client = new DynamoDBClient({ region: 'ap-northeast-1' });
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'personal-assistant-dev-daily-reports';

export async function saveReport(report, activity) {
  const id = randomUUID();
  const date = activity.date;
  const now = new Date().toISOString();

  const item = {
    PK: `REPORT#${date}`,
    SK: `REPORT#${id}`,
    id,
    date,
    content: report.content,
    summary: activity.summary,
    commits: activity.commits,
    pullRequests: activity.pullRequests,
    issues: activity.issues,
    generatedAt: report.generatedAt,
    model: report.model,
    usage: report.usage,
    createdAt: now,
    updatedAt: now,
    entityType: 'DailyReport'
  };

  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: item
  });

  await docClient.send(command);

  return {
    id,
    date,
    content: report.content
  };
}
