import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.PRODUCTS_TABLE;

// 有効なステータス一覧
const VALID_STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

export const handler = async (event) => {
  console.log('UpdateOrder:', JSON.stringify(event, null, 2));

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

    const orderId = event.pathParameters?.orderId;
    const body = JSON.parse(event.body || '{}');
    const { status } = body;

    if (!orderId) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Order ID is required' })
      };
    }

    if (!status || !VALID_STATUSES.includes(status)) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ 
          error: 'Invalid status',
          validStatuses: VALID_STATUSES
        })
      };
    }

    // GSI1 を使って注文を検索（orderId から PK を特定）
    const queryResult = await docClient.send(new QueryCommand({
      TableName: tableName,
      IndexName: 'GSI1',
      KeyConditionExpression: 'SK = :sk',
      ExpressionAttributeValues: {
        ':sk': `ORDER#${orderId}`
      }
    }));

    if (!queryResult.Items || queryResult.Items.length === 0) {
      return {
        statusCode: 404,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Order not found' })
      };
    }

    const order = queryResult.Items[0];

    // ステータスを更新
    const result = await docClient.send(new UpdateCommand({
      TableName: tableName,
      Key: {
        PK: order.PK,
        SK: order.SK
      },
      UpdateExpression: 'SET #status = :status, updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#status': 'status'
      },
      ExpressionAttributeValues: {
        ':status': status,
        ':updatedAt': new Date().toISOString()
      },
      ReturnValues: 'ALL_NEW'
    }));

    const updated = result.Attributes;

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        message: 'Order updated successfully',
        order: {
          orderId: updated.orderId,
          status: updated.status,
          updatedAt: updated.updatedAt
        }
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Failed to update order' })
    };
  }
};
