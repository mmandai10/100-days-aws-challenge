const AWS = require('aws-sdk');

// AWS SDKの設定
AWS.config.update({
  region: 'ap-northeast-1'
});

// DynamoDBクライアントを作成
const dynamodb = new AWS.DynamoDB.DocumentClient();

// テーブル名
const TABLE_NAME = 'day09-tasks';

module.exports = {
  dynamodb,
  TABLE_NAME
};