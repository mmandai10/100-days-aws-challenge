import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.PRODUCTS_TABLE;

export const handler = async (event) => {
  console.log('GetProducts:', event);
  try {
    const category = event.queryStringParameters?.category;
    let params;
    
    if (category) {
      // カテゴリ指定: そのカテゴリの商品のみ
      params = {
        TableName: tableName,
        FilterExpression: 'PK = :pk AND begins_with(SK, :skPrefix)',
        ExpressionAttributeValues: {
          ':pk': `CATEGORY#${category}`,
          ':skPrefix': 'PRODUCT#'
        }
      };
    } else {
      // 全商品: SKがPRODUCT#で始まるものだけ
      params = {
        TableName: tableName,
        FilterExpression: 'begins_with(SK, :skPrefix)',
        ExpressionAttributeValues: {
          ':skPrefix': 'PRODUCT#'
        }
      };
    }
    
    const result = await docClient.send(new ScanCommand(params));
    
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ products: result.Items, count: result.Count })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Failed to get products' })
    };
  }
};
