import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand, DeleteCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.PRODUCTS_TABLE;

// 注文ID生成（yyyyMMddHHmmss-xxxx形式）
const generateOrderId = () => {
  const now = new Date();
  const dateStr = now.toISOString().replace(/[-:T]/g, '').slice(0, 14);
  const random = Math.random().toString(36).substring(2, 6);
  return `${dateStr}-${random}`;
};

// 商品情報を取得（GSI1を使用）
const getProduct = async (productId) => {
  const result = await docClient.send(new QueryCommand({
    TableName: tableName,
    IndexName: 'GSI1',
    KeyConditionExpression: 'SK = :sk',
    ExpressionAttributeValues: { ':sk': `PRODUCT#${productId}` }
  }));
  return result.Items?.[0] || null;
};

export const handler = async (event) => {
  console.log('CreateOrder:', JSON.stringify(event, null, 2));

  try {
    // Cognito Authorizer からユーザーID取得
    const userId = event.requestContext?.authorizer?.claims?.sub;

    console.log('userId:', userId);

    if (!userId) {
      return {
        statusCode: 401,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Unauthorized' })
      };
    }

    // リクエストボディから配送先情報を取得
    const body = JSON.parse(event.body || '{}');
    const { shippingAddress } = body;

    if (!shippingAddress || !shippingAddress.name || !shippingAddress.postalCode || !shippingAddress.address) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Shipping address is required' })
      };
    }

    // カートを取得
    const cartResult = await docClient.send(new GetCommand({
      TableName: tableName,
      Key: {
        PK: `USER#${userId}`,
        SK: 'CART'
      }
    }));

    const cartItems = cartResult.Item?.items || [];
    console.log('cartItems:', JSON.stringify(cartItems));

    if (cartItems.length === 0) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Cart is empty' })
      };
    }

    // 商品情報を取得（GSI1を使用して各商品を取得）
    const orderItems = [];
    for (const cartItem of cartItems) {
      const product = await getProduct(cartItem.productId);
      console.log(`Product ${cartItem.productId}:`, JSON.stringify(product));
      orderItems.push({
        productId: cartItem.productId,
        name: product?.name || 'Unknown',
        price: product?.price || 0,
        quantity: cartItem.quantity
      });
    }

    // 合計金額を計算
    const totalAmount = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // 注文データを作成
    const orderId = generateOrderId();
    const order = {
      PK: `USER#${userId}`,
      SK: `ORDER#${orderId}`,
      orderId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    console.log('order:', JSON.stringify(order));

    // 注文を保存
    await docClient.send(new PutCommand({
      TableName: tableName,
      Item: order
    }));

    // カートをクリア
    await docClient.send(new DeleteCommand({
      TableName: tableName,
      Key: {
        PK: `USER#${userId}`,
        SK: 'CART'
      }
    }));

    return {
      statusCode: 201,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        message: 'Order created successfully',
        order: {
          orderId: order.orderId,
          items: order.items,
          totalAmount: order.totalAmount,
          status: order.status,
          createdAt: order.createdAt
        }
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Failed to create order' })
    };
  }
};
