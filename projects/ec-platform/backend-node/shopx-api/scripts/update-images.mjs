import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: 'ap-northeast-1' });
const docClient = DynamoDBDocumentClient.from(client);
const tableName = 'shopx-api-products';

const updates = [
  { productId: 'prod-001', imageUrl: 'https://shopx-product-images-20251213.s3.ap-northeast-1.amazonaws.com/prod-001.png' },
  { productId: 'prod-002', imageUrl: 'https://shopx-product-images-20251213.s3.ap-northeast-1.amazonaws.com/prod-002.png' },
  { productId: 'prod-003', imageUrl: 'https://shopx-product-images-20251213.s3.ap-northeast-1.amazonaws.com/prod-003.png' },
  { productId: 'prod-004', imageUrl: 'https://shopx-product-images-20251213.s3.ap-northeast-1.amazonaws.com/prod-004.png' },
];

for (const item of updates) {
  try {
    await docClient.send(new UpdateCommand({
      TableName: tableName,
      Key: {
        PK: `PRODUCT#${item.productId}`,
        SK: `PRODUCT#${item.productId}`
      },
      UpdateExpression: 'SET imageUrl = :url',
      ExpressionAttributeValues: {
        ':url': item.imageUrl
      }
    }));
    console.log(`Updated: ${item.productId}`);
  } catch (err) {
    console.error(`Failed: ${item.productId}`, err.message);
  }
}

console.log('Done!');
