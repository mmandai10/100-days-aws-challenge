import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { randomUUID } from 'crypto';

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

    // リクエストボディをパース
    const body = JSON.parse(event.body);
    const { name, price, description, category, imageUrl, stock } = body;

    // バリデーション
    if (!name || price === undefined || !category) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'name, price, and category are required' })
      };
    }

    // 商品IDを生成
    const productId = `prod-${randomUUID().slice(0, 8)}`;
    const now = new Date().toISOString();

    // 商品データ
    const product = {
      PK: `PRODUCT#${productId}`,
      SK: `PRODUCT#${productId}`,
      productId,
      name,
      price: Number(price),
      description: description || '',
      category,
      imageUrl: imageUrl || '',
      stock: stock !== undefined ? Number(stock) : 0,
      createdAt: now,
      updatedAt: now
    };

    // DynamoDBに保存
    await docClient.send(new PutCommand({
      TableName: tableName,
      Item: product
    }));

    console.log('Product created:', productId);

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        message: 'Product created successfully',
        product: {
          productId: product.productId,
          name: product.name,
          price: product.price,
          description: product.description,
          category: product.category,
          imageUrl: product.imageUrl,
          stock: product.stock,
          createdAt: product.createdAt
        }
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to create product' })
    };
  }
};
