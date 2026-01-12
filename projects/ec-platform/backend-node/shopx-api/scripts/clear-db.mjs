import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: 'ap-northeast-1' });
const docClient = DynamoDBDocumentClient.from(client);
const tableName = 'shopx-api-products';

// 全データ削除
const deleteAllItems = async () => {
  console.log('Scanning all items...');
  const result = await docClient.send(new ScanCommand({
    TableName: tableName
  }));

  console.log(`Found ${result.Items.length} items`);

  for (const item of result.Items) {
    console.log(`Deleting: PK=${item.PK}, SK=${item.SK}`);
    await docClient.send(new DeleteCommand({
      TableName: tableName,
      Key: {
        PK: item.PK,
        SK: item.SK
      }
    }));
  }

  console.log('All items deleted!');
};

deleteAllItems();
