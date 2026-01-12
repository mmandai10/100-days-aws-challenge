import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand, GetCommand } from '@aws-sdk/lib-dynamodb';

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

    // リクエストボディをパース
    const body = JSON.parse(event.body);
    const allowedFields = ['name', 'price', 'description', 'category', 'imageUrl', 'stock'];
    
    // 更新式を動的に構築
    const updateExpressions = [];
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateExpressions.push(`#${field} = :${field}`);
        expressionAttributeNames[`#${field}`] = field;
        expressionAttributeValues[`:${field}`] = 
          field === 'price' || field === 'stock' ? Number(body[field]) : body[field];
      }
    }

    // 更新日時を追加
    updateExpressions.push('#updatedAt = :updatedAt');
    expressionAttributeNames['#updatedAt'] = 'updatedAt';
    expressionAttributeValues[':updatedAt'] = new Date().toISOString();

    if (updateExpressions.length === 1) {
      // updatedAt のみ = 更新するフィールドがない
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'No valid fields to update' })
      };
    }

    // DynamoDBを更新
    const result = await docClient.send(new UpdateCommand({
      TableName: tableName,
      Key: {
        PK: `PRODUCT#${productId}`,
        SK: `PRODUCT#${productId}`
      },
      UpdateExpression: `SET ${updateExpressions.join(', ')}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW'
    }));

    console.log('Product updated:', productId);

    const updated = result.Attributes;
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Product updated successfully',
        product: {
          productId: updated.productId,
          name: updated.name,
          price: updated.price,
          description: updated.description,
          category: updated.category,
          imageUrl: updated.imageUrl,
          stock: updated.stock,
          updatedAt: updated.updatedAt
        }
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to update product' })
    };
  }
};
