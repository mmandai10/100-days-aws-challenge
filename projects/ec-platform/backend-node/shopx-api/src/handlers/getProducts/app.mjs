import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.PRODUCTS_TABLE;

export const handler = async (event) => {
  console.log('GetProducts:', event);
  try {
    const queryParams = event.queryStringParameters || {};
    const category = queryParams.category;
    const keyword = queryParams.keyword?.toLowerCase();
    const minPrice = queryParams.minPrice ? Number(queryParams.minPrice) : null;
    const maxPrice = queryParams.maxPrice ? Number(queryParams.maxPrice) : null;
    
    // 基本のフィルター条件
    let filterExpressions = [];
    let expressionAttributeValues = {};
    let expressionAttributeNames = {};
    
    if (category) {
      // カテゴリ指定
      filterExpressions.push('PK = :pk');
      expressionAttributeValues[':pk'] = `CATEGORY#${category}`;
    }
    
    // SK が PRODUCT# で始まるもののみ
    filterExpressions.push('begins_with(SK, :skPrefix)');
    expressionAttributeValues[':skPrefix'] = 'PRODUCT#';
    
    // 価格フィルター
    if (minPrice !== null) {
      filterExpressions.push('price >= :minPrice');
      expressionAttributeValues[':minPrice'] = minPrice;
    }
    if (maxPrice !== null) {
      filterExpressions.push('price <= :maxPrice');
      expressionAttributeValues[':maxPrice'] = maxPrice;
    }
    
    const params = {
      TableName: tableName,
      FilterExpression: filterExpressions.join(' AND '),
      ExpressionAttributeValues: expressionAttributeValues
    };
    
    const result = await docClient.send(new ScanCommand(params));
    
    // キーワード検索（DynamoDB では部分一致が難しいのでアプリ側でフィルター）
    let products = result.Items || [];
    
    if (keyword) {
      products = products.filter(product => {
        const nameMatch = product.name?.toLowerCase().includes(keyword);
        const descMatch = product.description?.toLowerCase().includes(keyword);
        return nameMatch || descMatch;
      });
    }
    
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ products: products, count: products.length })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Failed to get products' })
    };
  }
};
