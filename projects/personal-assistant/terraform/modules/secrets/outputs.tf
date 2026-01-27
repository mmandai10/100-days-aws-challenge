# ===========================================
# Secrets Manager モジュール - 出力
# ===========================================

# GitHub Token
output "secret_arn" {
  description = "GitHub Token シークレットの ARN"
  value       = aws_secretsmanager_secret.github_token.arn
}

output "secret_name" {
  description = "GitHub Token シークレットの名前"
  value       = aws_secretsmanager_secret.github_token.name
}

# Claude API Key
output "claude_api_key_arn" {
  description = "Claude API Key シークレットの ARN"
  value       = length(aws_secretsmanager_secret.claude_api_key) > 0 ? aws_secretsmanager_secret.claude_api_key[0].arn : ""
}

output "claude_api_key_name" {
  description = "Claude API Key シークレットの名前"
  value       = length(aws_secretsmanager_secret.claude_api_key) > 0 ? aws_secretsmanager_secret.claude_api_key[0].name : ""
}
