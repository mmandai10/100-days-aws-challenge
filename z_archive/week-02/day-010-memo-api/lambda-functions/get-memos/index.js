// Lambda関数のハンドラー
// AWSはこの exports.handler を呼び出す
exports.handler = async (event) => {
    console.log('Event received:', JSON.stringify(event, null, 2));
    
    // テスト用のダミーデータ
    const memos = [
        { id: "1", title: "買い物リスト", content: "牛乳、パン、卵" },
        { id: "2", title: "会議メモ", content: "10時から企画会議" }
    ];
    
    // API Gateway用のレスポンス形式（重要！）
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",  // CORS対応
        },
        body: JSON.stringify({
            success: true,
            data: memos
        })
    };
};