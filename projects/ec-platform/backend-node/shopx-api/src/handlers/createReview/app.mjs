import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { randomUUID } from 'crypto';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.PRODUCTS_TABLE;

export const handler = async (event) => {
  console.log('CreateReview:', event);
  
  try {
    // Cognito から userId と email を取得
    const userId = event.requestContext?.authorizer?.claims?.sub;
    const userEmail = event.requestContext?.authorizer?.claims?.email;
    
    if (!userId) {
      return {
        statusCode: 401,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Unauthorized' })
      };
    }
    
    const productId = event.pathParameters?.id;
    const body = JSON.parse(event.body || '{}');
    const { rating, comment } = body;
    
    // バリデーション
    if (!productId) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'productId is required' })
      };
    }
    
    if (!rating || rating < 1 || rating > 5) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'rating must be between 1 and 5' })
      };
    }
    
    const reviewId = randomUUID();
    const timestamp = new Date().toISOString();
    
    // レビューを保存
    const review = {
      PK: `PRODUCT#${productId}`,
      SK: `REVIEW#${timestamp}#${reviewId}`,
      reviewId: reviewId,
      productId: productId,
      userId: userId,
      userName: userEmail?.split('@')[0] || 'ユーザー',  // メールの@前を名前に
      rating: rating,
      comment: comment || '',
      createdAt: timestamp
    };
    
    await docClient.send(new PutCommand({
      TableName: tableName,
      Item: review
    }));
    
    return {
      statusCode: 201,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ message: 'Review created', review })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Failed to create review' })
    };
  }
};
