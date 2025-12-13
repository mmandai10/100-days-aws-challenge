import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.PRODUCTS_TABLE;

export const handler = async (event) => {
  console.log('GetProductById:', event);
  try {
    const productId = event.pathParameters.id;
    const params = {
      TableName: tableName,
      Key: { PK: `PRODUCT#${productId}`, SK: 'PRODUCT' }
    };
    const result = await docClient.send(new GetCommand(params));
    if (!result.Item) {
      return {
        statusCode: 404,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Product not found' })
      };
    }
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(result.Item)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Failed to get product' })
    };
  }
};