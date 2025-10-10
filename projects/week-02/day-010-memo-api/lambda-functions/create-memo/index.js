// DynamoDBを使うためのAWS SDK
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

// DynamoDBクライアントの初期化
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    console.log('Event received:', JSON.stringify(event, null, 2));
    
    try {
        // リクエストボディをパース
        const body = JSON.parse(event.body);
        
        // 必須項目のチェック
        if (!body.title || !body.content) {
            return {
                statusCode: 400,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    success: false,
                    error: "タイトルと内容は必須です"
                })
            };
        }
        
        // メモオブジェクトの作成
        const memo = {
            id: Date.now().toString(), // タイムスタンプをIDとして使用
            title: body.title,
            content: body.content,
            createdAt: new Date().toISOString()
        };
        
        // DynamoDBに保存
        const putCommand = new PutCommand({
            TableName: "day10-memos",
            Item: memo
        });
        
        await docClient.send(putCommand);
        console.log('Memo saved:', memo);
        
        // 成功レスポンス
        return {
            statusCode: 201,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                success: true,
                data: memo
            })
        };
        
    } catch (error) {
        console.error('Error:', error);
        
        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                success: false,
                error: "メモの作成に失敗しました"
            })
        };
    }
};