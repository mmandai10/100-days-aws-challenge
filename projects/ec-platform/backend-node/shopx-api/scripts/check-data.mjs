import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: 'ap-northeast-1' });
const docClient = DynamoDBDocumentClient.from(client);

const result = await docClient.send(new ScanCommand({
  TableName: 'shopx-api-products',
  Limit: 5
}));

console.log('Items:');
result.Items.forEach(item => {
  console.log(JSON.stringify(item, null, 2));
  console.log('---');
});
