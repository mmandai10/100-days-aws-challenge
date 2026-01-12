import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, DeleteCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: 'ap-northeast-1' });
const docClient = DynamoDBDocumentClient.from(client);
const tableName = 'shopx-api-products';

// 壊れたデータを削除（間違ったPKで作成されたもの）
const badItems = [
  { PK: 'PRODUCT#prod-001', SK: 'PRODUCT#prod-001' },
  { PK: 'PRODUCT#prod-002', SK: 'PRODUCT#prod-002' },
  { PK: 'PRODUCT#prod-003', SK: 'PRODUCT#prod-003' },
  { PK: 'PRODUCT#prod-004', SK: 'PRODUCT#prod-004' },
];

for (const item of badItems) {
  try {
    await docClient.send(new DeleteCommand({
      TableName: tableName,
      Key: item
    }));
    console.log(`Deleted: ${item.PK}`);
  } catch (err) {
    console.error(`Failed to delete: ${item.PK}`, err.message);
  }
}

console.log('Cleanup done!');
