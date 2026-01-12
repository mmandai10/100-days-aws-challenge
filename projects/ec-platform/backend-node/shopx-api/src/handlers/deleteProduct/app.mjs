import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, DeleteCommand, GetCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.PRODUCTS_TABLE;

// 管理者チェック
const isAdmin = (claims) => {
  const groups = claims['cognito:groups'] || '';
  return groups.split(',').includes('admin');
};

export const handler = async (event) => {
  const headers = { 'Access-Control-Allow-Origin': '*' };

  try {
    // 管理者権限チェック
    const claims = event.requestContext.authorizer.claims;
    if (!isAdmin(claims)) {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({ error: 'Admin access required' })
      };
    }

    // パスパラメータから商品IDを取得
    const productId = event.pathParameters.id;

    // 商品の存在確認
    const existing = await docClient.send(new GetCommand({
      TableName: tableName,
      Key: {
        PK: `PRODUCT#${productId}`,
        SK: `PRODUCT#${productId}`
      }
    }));

    if (!existing.Item) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Product not found' })
      };
    }

    // DynamoDBから削除
    await docClient.send(new DeleteCommand({
      TableName: tableName,
      Key: {
        PK: `PRODUCT#${productId}`,
        SK: `PRODUCT#${productId}`
      }
    }));

    console.log('Product deleted:', productId);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Product deleted successfully',
        productId
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to delete product' })
    };
  }
};
