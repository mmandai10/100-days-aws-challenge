import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.PRODUCTS_TABLE;

export const handler = async (event) => {
  console.log('GetAllOrders:', JSON.stringify(event, null, 2));

  try {
    // 管理者権限チェック
    const groups = event.requestContext.authorizer.claims['cognito:groups'] || '';
    if (!groups.includes('admin')) {
      return {
        statusCode: 403,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Admin access required' })
      };
    }

    // 全注文を取得（SKが ORDER# で始まるもの）
    const result = await docClient.send(new ScanCommand({
      TableName: tableName,
      FilterExpression: 'begins_with(SK, :sk)',
      ExpressionAttributeValues: {
        ':sk': 'ORDER#'
      }
    }));

    // レスポンス用に整形
    const orders = (result.Items || []).map(item => ({
      orderId: item.orderId,
      userId: item.PK.replace('USER#', ''),
      userEmail: item.userEmail || 'N/A',
      items: item.items,
      totalAmount: item.totalAmount,
      shippingAddress: item.shippingAddress,
      status: item.status || 'pending',
      createdAt: item.createdAt
    }));

    // 新しい順にソート
    orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
