# AWS Lambda トラブルシューティング

## よくあるエラーと解決策

### 1. Task timed out after X seconds

原因: Lambda のタイムアウト設定が短い

解決策:
- Terraform で timeout を増やす（デフォルト 3秒 → 30秒など）
- コードの処理時間を確認（外部API呼び出しが遅い等）

```hcl
resource "aws_lambda_function" "example" {
  timeout = 30  # 秒
}
```

### 2. AccessDeniedException

原因: IAM ロールに必要な権限がない

解決策:
- CloudWatch Logs でエラーメッセージを確認
- 必要なアクション（dynamodb:GetItem 等）を IAM ポリシーに追加

```hcl
resource "aws_iam_role_policy" "lambda_dynamodb" {
  policy = jsonencode({
    Statement = [{
      Effect   = "Allow"
      Action   = ["dynamodb:GetItem", "dynamodb:Query"]
      Resource = "arn:aws:dynamodb:*:*:table/MyTable"
    }]
  })
}
```

### 3. Cannot find module 'xxx'

原因: 依存パッケージが Lambda にアップロードされていない

解決策:
- node_modules を含めて ZIP 化
- または Lambda Layer を使用

```bash
cd lambda-function
npm install
zip -r function.zip .
```

### 4. ECONNREFUSED / Network error

原因: Lambda が VPC 内にあり、インターネットアクセスできない

解決策:
- NAT Gateway を設定
- または VPC 外で Lambda を実行（VPC 設定を外す）
- VPC エンドポイントを使用

### 5. Environment variable not found

原因: Lambda の環境変数が設定されていない

解決策:
- Terraform で environment ブロックを確認

```hcl
resource "aws_lambda_function" "example" {
  environment {
    variables = {
      TABLE_NAME = "my-table"
      API_KEY    = "xxx"
    }
  }
}
```

## デバッグ方法

### CloudWatch Logs の確認

```bash
aws logs tail /aws/lambda/function-name --follow
```

### ローカルテスト

```bash
# SAM CLI を使用
sam local invoke FunctionName -e event.json
```

### Lambda コンソールでテスト

1. AWS コンソール → Lambda → 関数選択
2. 「テスト」タブ
3. テストイベントを作成して実行
