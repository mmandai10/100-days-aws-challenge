# Terraform 基本コマンドとベストプラクティス

## 基本コマンド

### 初期化

```bash
terraform init
```
- プロバイダーのダウンロード
- モジュールの取得
- .terraform ディレクトリ作成

### 計画（ドライラン）

```bash
terraform plan
```
- 実際には変更しない
- 何が作成/変更/削除されるか確認

### 適用

```bash
terraform apply
```
- 実際にリソースを作成/変更
- 確認プロンプトで yes を入力

### 自動承認

```bash
terraform apply -auto-approve
```
- 確認なしで適用（CI/CD 用）

### 削除

```bash
terraform destroy
```
- 全リソースを削除
- 開発環境のクリーンアップに使用

### 状態確認

```bash
terraform state list    # リソース一覧
terraform state show aws_lambda_function.example  # 詳細
```

## ディレクトリ構成

```
project/
├── main.tf          # メインリソース定義
├── variables.tf     # 入力変数
├── outputs.tf       # 出力値
├── terraform.tfvars # 変数の値（Git 管理外）
└── modules/
    ├── lambda/
    ├── dynamodb/
    └── api-gateway/
```

## モジュール化のメリット

- 再利用可能
- 変更の影響範囲を限定
- チームでの分担が楽

### モジュールの呼び出し

```hcl
module "lambda" {
  source = "./modules/lambda"
  
  function_name = "my-function"
  runtime       = "nodejs20.x"
}
```

## 変数の優先順位

1. コマンドライン -var
2. terraform.tfvars
3. 環境変数 TF_VAR_xxx
4. default 値

## シークレット管理

### NG: terraform.tfvars に直接書く

```hcl
# これはダメ！Git にコミットされる
api_key = "sk-xxxxx"
```

### OK: 環境変数を使う

```bash
export TF_VAR_api_key="sk-xxxxx"
terraform apply
```

### OK: AWS Secrets Manager を使う

```hcl
data "aws_secretsmanager_secret_version" "api_key" {
  secret_id = "my-api-key"
}

resource "aws_lambda_function" "example" {
  environment {
    variables = {
      API_KEY = data.aws_secretsmanager_secret_version.api_key.secret_string
    }
  }
}
```

## よくあるエラー

### Error: Provider configuration not present

原因: terraform init を実行していない

### Error: Resource already exists

原因: 手動で作成したリソースと競合

解決: terraform import でインポート

```bash
terraform import aws_s3_bucket.example my-bucket-name
```

### Error: Cycle detected

原因: リソース間の循環参照

解決: depends_on を見直す
