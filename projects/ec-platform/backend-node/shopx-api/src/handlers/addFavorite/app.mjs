import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.PRODUCTS_TABLE;

export const handler = async (event) => {
  console.log('AddFavorite:', event);
  
  try {
    // Cognito から userId を取得
    const userId = event.requestContext?.authorizer?.claims?.sub;
    if (!userId) {
      return {
        statusCode: 401,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Unauthorized' })
      };
    }
    
    const body = JSON.parse(event.body || '{}');
    const { productId, category } = body;
    
    if (!productId || !category) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'productId and category are required' })
      };
    }
    
    // お気に入りに追加
    await docClient.send(new PutCommand({
      TableName: tableName,
      Item: {
        PK: `USER#${userId}`,
        SK: `FAVORITE#${productId}`,
        productId: productId,
        category: category,
        createdAt: new Date().toISOString()
      }
    }));
    
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ message: 'Added to favorites', productId })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Failed to add favorite' })
    };
  }
};
