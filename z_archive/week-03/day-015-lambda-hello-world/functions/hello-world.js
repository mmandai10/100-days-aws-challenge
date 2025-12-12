// Day 15 - Lambda Hello World
// 最もシンプルなLambda関数

exports.handler = async (event, context) => {
    console.log('Lambda関数が呼ばれました！');
    
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hello from Lambda!',
            timestamp: new Date().toISOString()
        })
    };
    
    return response;
};
