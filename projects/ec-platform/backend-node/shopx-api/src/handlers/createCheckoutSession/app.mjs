import Stripe from 'stripe';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.PRODUCTS_TABLE;

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
  console.log('CreateCheckoutSession:', JSON.stringify(event, null, 2));

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  };

  try {
    // Cognito Authorizer からユーザーID取得
    const userId = event.requestContext?.authorizer?.claims?.sub;

    if (!userId) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Unauthorized' })
      };
    }

    // リクエストボディから情報を取得
    const body = JSON.parse(event.body || '{}');
    const { successUrl, cancelUrl } = body;

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
        headers,
        body: JSON.stringify({ error: 'Cart is empty' })
      };
    }

    // Stripe の line_items を作成
    const lineItems = [];
    for (const cartItem of cartItems) {
      const product = await getProduct(cartItem.productId);
      if (product) {
        lineItems.push({
          price_data: {
            currency: 'jpy',
            product_data: {
              name: product.name,
              description: product.description || '',
              images: product.imageUrl ? [product.imageUrl] : [],
            },
            unit_amount: product.price,  // 日本円はそのまま（小数点なし）
          },
          quantity: cartItem.quantity,
        });
      }
    }

    // Stripe Checkout Session を作成
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl || 'https://main.d20nytcowp331l.amplifyapp.com/orders?success=true',
      cancel_url: cancelUrl || 'https://main.d20nytcowp331l.amplifyapp.com/cart?canceled=true',
      metadata: {
        userId: userId,
      },
    });

    console.log('Stripe session created:', session.id);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        sessionId: session.id,
        url: session.url
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to create checkout session' })
    };
  }
};
