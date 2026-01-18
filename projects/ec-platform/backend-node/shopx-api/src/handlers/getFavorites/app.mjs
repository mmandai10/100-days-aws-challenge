import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand, BatchGetCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.PRODUCTS_TABLE;

export const handler = async (event) => {
  console.log('GetFavorites:', event);
  
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
    
    // お気に入り一覧を取得
    const favoritesResult = await docClient.send(new QueryCommand({
      TableName: tableName,
      KeyConditionExpression: 'PK = :pk AND begins_with(SK, :skPrefix)',
      ExpressionAttributeValues: {
        ':pk': `USER#${userId}`,
        ':skPrefix': 'FAVORITE#'
      }
    }));
    
    const favorites = favoritesResult.Items || [];
    
    if (favorites.length === 0) {
      return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ favorites: [], products: [] })
      };
    }
    
    // 商品詳細を取得（BatchGet）
    const productKeys = favorites.map(fav => ({
      PK: `CATEGORY#${fav.category}`,
      SK: `PRODUCT#${fav.productId}`
    }));
    
    const productsResult = await docClient.send(new BatchGetCommand({
      RequestItems: {
        [tableName]: {
          Keys: productKeys
        }
      }
    }));
    
    const products = productsResult.Responses?.[tableName] || [];
    
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ 
        favorites: favorites,
        products: products
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Failed to get favorites' })
    };
  }
};
