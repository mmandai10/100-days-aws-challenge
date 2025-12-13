import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.PRODUCTS_TABLE;

export const handler = async (event) => {
  console.log('GetProducts:', event);
  try {
    const params = { TableName: tableName };
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