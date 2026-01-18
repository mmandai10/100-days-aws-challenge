import Anthropic from '@anthropic-ai/sdk';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';

// クライアント初期化
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const dynamoClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dynamoClient);
const tableName = process.env.PRODUCTS_TABLE;

// ツール定義
const tools = [
  {
    name: 'search_products',
    description: '商品を検索します。カテゴリ、価格帯、キーワードで絞り込みできます。',
    input_schema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          description: 'カテゴリID (electronics, fashion, books, food, home, sports, toys, beauty)',
        },
        max_price: {
          type: 'number',
          description: '価格の上限（円）',
        },
        min_price: {
          type: 'number',
          description: '価格の下限（円）',
        },
        keyword: {
          type: 'string',
          description: '商品名に含まれるキーワード',
        },
        limit: {
          type: 'number',
          description: '取得する商品数（デフォルト5）',
        },
      },
      required: [],
    },
  },
  {
    name: 'get_product_detail',
    description: '商品の詳細情報を取得します。',
    input_schema: {
      type: 'object',
      properties: {
        product_id: {
          type: 'string',
          description: '商品ID (例: prod-001)',
        },
      },
      required: ['product_id'],
    },
  },
  {
    name: 'get_categories',
    description: '利用可能なカテゴリ一覧を取得します。',
    input_schema: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
];

// 商品検索の実行
async function searchProducts({ category, max_price, min_price, keyword, limit = 5 }) {
  console.log('searchProducts called:', { category, max_price, min_price, keyword, limit });

  let params;
  
  if (category) {
    // カテゴリ指定時は Query を使用
    params = {
      TableName: tableName,
      KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
      ExpressionAttributeValues: {
        ':pk': `CATEGORY#${category}`,
        ':sk': 'PRODUCT#',
      },
    };
    const result = await docClient.send(new QueryCommand(params));
    let products = result.Items || [];
    
    // フィルタリング
    if (max_price) products = products.filter(p => p.price <= max_price);
    if (min_price) products = products.filter(p => p.price >= min_price);
    if (keyword) products = products.filter(p => p.name.includes(keyword));
    
    return products.slice(0, limit);
  } else {
    // 全商品検索
    params = {
      TableName: tableName,
      FilterExpression: 'begins_with(SK, :sk)',
      ExpressionAttributeValues: { ':sk': 'PRODUCT#' },
    };
    const result = await docClient.send(new ScanCommand(params));
    let products = result.Items || [];
    
    // フィルタリング
    if (max_price) products = products.filter(p => p.price <= max_price);
    if (min_price) products = products.filter(p => p.price >= min_price);
    if (keyword) products = products.filter(p => p.name.includes(keyword));
    
    return products.slice(0, limit);
  }
}

// 商品詳細の取得
async function getProductDetail({ product_id }) {
  console.log('getProductDetail called:', { product_id });
  
  // 全カテゴリをスキャンして商品を探す
  const params = {
    TableName: tableName,
    FilterExpression: 'productId = :productId',
    ExpressionAttributeValues: { ':productId': product_id },
  };
  
  const result = await docClient.send(new ScanCommand(params));
  return result.Items?.[0] || null;
}

// カテゴリ一覧の取得
async function getCategories() {
  console.log('getCategories called');
  
  const params = {
    TableName: tableName,
    FilterExpression: 'begins_with(SK, :sk)',
    ExpressionAttributeValues: { ':sk': 'CATEGORY#' },
  };
  
  const result = await docClient.send(new ScanCommand(params));
  return result.Items || [];
}

// ツール実行
async function executeTool(toolName, toolInput) {
  switch (toolName) {
    case 'search_products':
      return await searchProducts(toolInput);
    case 'get_product_detail':
      return await getProductDetail(toolInput);
    case 'get_categories':
      return await getCategories();
    default:
      return { error: 'Unknown tool' };
  }
}

export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
  };

  // CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const body = JSON.parse(event.body);
    const { message, history = [] } = body;

    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'message is required' }),
      };
    }

    console.log('Chat request:', { message, historyLength: history.length });

    // メッセージ履歴を構築
    const messages = [
      ...history,
      { role: 'user', content: message },
    ];

    // Claude API 呼び出し
    let response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: `あなたはECサイト「ShopX」のAIアシスタントです。
お客様の質問に親切に答え、商品のおすすめや検索をサポートしてください。

利用可能なカテゴリ:
- electronics (電子機器)
- fashion (ファッション)
- books (書籍)
- food (食品・飲料)
- home (家庭用品)
- sports (スポーツ)
- toys (おもちゃ・ゲーム)
- beauty (美容・健康)

商品を紹介するときは、名前、価格、簡単な説明を含めてください。
回答は日本語で行ってください。`,
      tools,
      messages,
    });

    // Tool Use ループ
    while (response.stop_reason === 'tool_use') {
      const toolResults = [];

      for (const block of response.content) {
        if (block.type === 'tool_use') {
          console.log('Tool call:', block.name, block.input);
          
          const result = await executeTool(block.name, block.input);
          console.log('Tool result:', JSON.stringify(result).slice(0, 200));
          
          toolResults.push({
            type: 'tool_result',
            tool_use_id: block.id,
            content: JSON.stringify(result, null, 2),
          });
        }
      }

      // ツール結果を含めて再度 Claude に問い合わせ
      messages.push({ role: 'assistant', content: response.content });
      messages.push({ role: 'user', content: toolResults });

      response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: `あなたはECサイト「ShopX」のAIアシスタントです。
お客様の質問に親切に答え、商品のおすすめや検索をサポートしてください。
商品を紹介するときは、名前、価格、簡単な説明を含めてください。
回答は日本語で行ってください。`,
        tools,
        messages,
      });
    }

    // 最終回答を抽出
    let assistantMessage = '';
    for (const block of response.content) {
      if (block.type === 'text') {
        assistantMessage += block.text;
      }
    }

    console.log('Assistant response:', assistantMessage.slice(0, 100));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: assistantMessage,
        // 履歴に追加用
        history: [
          ...history,
          { role: 'user', content: message },
          { role: 'assistant', content: assistantMessage },
        ],
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to process chat', details: error.message }),
    };
  }
};
