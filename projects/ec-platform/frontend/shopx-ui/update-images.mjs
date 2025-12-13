import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { readFileSync } from 'fs';

const client = new DynamoDBClient({ region: 'ap-northeast-1' });
const docClient = DynamoDBDocumentClient.from(client);

const items = JSON.parse(readFileSync('update-images.json', 'utf8'));

for (const item of items) {
  await docClient.send(new UpdateCommand({
    TableName: 'shopx-api-products',
    Key: { PK: item.PK, SK: item.SK },
    UpdateExpression: 'SET imageUrl = :url',
    ExpressionAttributeValues: { ':url': item.imageUrl }
  }));
  console.log('Updated:', item.PK);
}

console.log('Done!');