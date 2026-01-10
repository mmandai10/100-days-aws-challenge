import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.PRODUCTS_TABLE;

export const handler = async (event) => {
  console.log('UpdateCart:', JSON.stringify(event, null, 2));

  try {
    // Cognito Authorizer からユーザーID取得
    const userId = event.requestContext.authorizer.claims.sub;

    if (!userId) {
      return {
        statusCode: 401,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Unauthorized' })
      };
    }

    // リクエストボディからカートアイテム取得
    const body = JSON.parse(event.body || '{}');
    const items = body.items || [];

    // DynamoDB にカート保存
    await docClient.send(new PutCommand({
      TableName: tableName,
      Item: {
        PK: `USER#${userId}`,
        SK: 'CART',
        items: items,
        updatedAt: new Date().toISOString()
      }
    }));

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ message: 'Cart updated', items: items })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Failed to update cart' })
    };
  }
};
