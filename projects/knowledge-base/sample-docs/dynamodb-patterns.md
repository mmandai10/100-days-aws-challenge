# DynamoDB 設計パターン

## Single Table Design

1つのテーブルで複数のエンティティを管理する設計パターン。

### 基本構造

| PK | SK | 属性 |
|----|----|------|
| USER#123 | PROFILE | name, email |
| USER#123 | ORDER#001 | total, status |
| PRODUCT#456 | METADATA | name, price |

### メリット

- 1回のクエリで関連データをまとめて取得できる
- テーブル数が減り管理が楽
- 読み取りコストの最適化

### デメリット

- 設計が複雑
- 後からの変更が難しい

## GSI（Global Secondary Index）

PK/SK 以外の属性でクエリしたい場合に使用。

### 例: カテゴリ別に商品を取得

```
メインテーブル:
  PK: PRODUCT#123
  SK: METADATA
  category: electronics

GSI (CategoryIndex):
  PK: category (electronics)
  SK: PRODUCT#123
```

```javascript
// カテゴリ別クエリ
const params = {
  TableName: 'Products',
  IndexName: 'CategoryIndex',
  KeyConditionExpression: 'category = :cat',
  ExpressionAttributeValues: { ':cat': 'electronics' }
};
```

## よく使うクエリパターン

### 1. ユーザーの全注文を取得

```javascript
{
  KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
  ExpressionAttributeValues: {
    ':pk': 'USER#123',
    ':sk': 'ORDER#'
  }
}
```

### 2. 特定期間の注文を取得

SK に日付を含める: ORDER#2024-01-15#001

```javascript
{
  KeyConditionExpression: 'PK = :pk AND SK BETWEEN :start AND :end',
  ExpressionAttributeValues: {
    ':pk': 'USER#123',
    ':start': 'ORDER#2024-01-01',
    ':end': 'ORDER#2024-01-31'
  }
}
```

## コスト最適化

### オンデマンド vs プロビジョンド

- オンデマンド: トラフィック予測が難しい場合
- プロビジョンド: 安定したトラフィックの場合（安い）

### TTL（Time To Live）

古いデータを自動削除してコスト削減。

```hcl
resource "aws_dynamodb_table" "example" {
  ttl {
    attribute_name = "expireAt"
    enabled        = true
  }
}
```
