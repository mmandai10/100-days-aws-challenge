# ===========================================
# Secrets Manager モジュール - 出力
# ===========================================

# シークレットの ARN（Lambda の IAM ポリシーで参照）
output "secret_arn" {
  description = "GitHub Token シークレットの ARN"
  value       = aws_secretsmanager_secret.github_token.arn
}

# シークレットの名前（Lambda のコードで参照）
output "secret_name" {
  description = "GitHub Token シークレットの名前"
  value       = aws_secretsmanager_secret.github_token.name
}
