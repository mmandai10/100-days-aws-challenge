import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.PRODUCTS_TABLE;

export const handler = async (event) => {
  console.log('GetOrders:', JSON.stringify(event, null, 2));

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

    // ユーザーの全注文を取得（SKが ORDER# で始まるもの）
    const result = await docClient.send(new QueryCommand({
      TableName: tableName,
      KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
      ExpressionAttributeValues: {
        ':pk': `USER#${userId}`,
        ':sk': 'ORDER#'
      },
      ScanIndexForward: false  // 新しい順
    }));

    // レスポンス用に整形
    const orders = (result.Items || []).map(item => ({
      orderId: item.orderId,
      items: item.items,
      totalAmount: item.totalAmount,
      shippingAddress: item.shippingAddress,
      status: item.status,
      createdAt: item.createdAt
    }));

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ orders })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Failed to get orders' })
    };
  }
};
