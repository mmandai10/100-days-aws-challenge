import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: 'ap-northeast-1' });
const docClient = DynamoDBDocumentClient.from(client);
const tableName = 'shopx-api-products';

const sampleData = [
  // カテゴリ
  { PK: 'CATEGORY#electronics', SK: 'CATEGORY', name: '電子機器', description: 'スマホ、PC、ガジェット' },
  { PK: 'CATEGORY#clothing', SK: 'CATEGORY', name: '衣類', description: 'メンズ、レディース、キッズ' },
  { PK: 'CATEGORY#books', SK: 'CATEGORY', name: '本', description: '小説、ビジネス、技術書' },
  
  // 商品
  { PK: 'PRODUCT#001', SK: 'PRODUCT', name: 'ワイヤレスイヤホン', price: 12800, category: 'electronics', description: '高音質Bluetooth対応' },
  { PK: 'PRODUCT#002', SK: 'PRODUCT', name: 'ノートPC', price: 98000, category: 'electronics', description: '軽量14インチ' },
  { PK: 'PRODUCT#003', SK: 'PRODUCT', name: 'Tシャツ', price: 2980, category: 'clothing', description: 'コットン100%' },
  { PK: 'PRODUCT#004', SK: 'PRODUCT', name: 'ジーンズ', price: 7980, category: 'clothing', description: 'ストレッチデニム' },
  { PK: 'PRODUCT#005', SK: 'PRODUCT', name: 'AWS入門', price: 3200, category: 'books', description: 'クラウド初心者向け' },
];

async function seedData() {
  console.log('Seeding data...');
  
  for (const item of sampleData) {
    await docClient.send(new PutCommand({
      TableName: tableName,
      Item: item
    }));
    console.log(`Added: ${item.name}`);
  }
  
  console.log('Done!');
}

seedData();