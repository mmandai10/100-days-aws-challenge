# outputs.tf - ルート出力

# -----------------------------------------------------------------------------
# Secrets Manager
# -----------------------------------------------------------------------------
output "github_token_secret_arn" {
  description = "GitHub Token シークレットの ARN"
  value       = module.secrets.secret_arn
}

output "github_token_secret_name" {
  description = "GitHub Token シークレットの名前"
  value       = module.secrets.secret_name
}

# -----------------------------------------------------------------------------
# Lambda
# -----------------------------------------------------------------------------
output "lambda_function_name" {
  description = "Lambda 関数名"
  value       = module.lambda.function_name
}

output "lambda_function_arn" {
  description = "Lambda 関数の ARN"
  value       = module.lambda.function_arn
}
