// Day 8 - Lambda関数
// DynamoDBと連携してブログ記事を管理

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// テーブル名（後でAWSコンソールで作成）
const TABLE_NAME = 'BlogPosts';

// Lambda関数のメインハンドラー
exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event));
    
    // HTTPメソッドによって処理を分ける
    const httpMethod = event.httpMethod;
    
    try {
        switch(httpMethod) {
            case 'GET':
                return await getPosts();
            case 'POST':
                return await createPost(event.body);
            default:
                return {
                    statusCode: 400,
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({ message: 'Unsupported method' })
                };
        }
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ message: 'Internal server error' })
        };
    }
};

// 記事一覧を取得
async function getPosts() {
    const params = {
        TableName: TABLE_NAME
    };
    
    const result = await dynamoDB.scan(params).promise();
    
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(result.Items)
    };
}

// 新規記事を作成
async function createPost(body) {
    const post = JSON.parse(body);
    
    // IDとタイムスタンプを追加
    post.id = Date.now().toString();
    post.timestamp = new Date().toISOString();
    
    const params = {
        TableName: TABLE_NAME,
        Item: post
    };
    
    await dynamoDB.put(params).promise();
    
    return {
        statusCode: 201,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    };
}
