# modules/secrets/outputs.tf

output "github_token_arn" {
  description = "ARN of GitHub token secret"
  value       = aws_secretsmanager_secret.github_token.arn
}

output "github_token_name" {
  description = "Name of GitHub token secret"
  value       = aws_secretsmanager_secret.github_token.name
}

output "slack_webhook_arn" {
  description = "ARN of Slack webhook secret"
  value       = aws_secretsmanager_secret.slack_webhook.arn
}

output "slack_webhook_name" {
  description = "Name of Slack webhook secret"
  value       = aws_secretsmanager_secret.slack_webhook.name
}

output "anthropic_api_key_arn" {
  description = "ARN of Anthropic API key secret"
  value       = aws_secretsmanager_secret.anthropic_api_key.arn
}

output "anthropic_api_key_name" {
  description = "Name of Anthropic API key secret"
  value       = aws_secretsmanager_secret.anthropic_api_key.name
}

# Lambda の IAM ポリシー用にまとめた ARN リスト
output "all_secret_arns" {
  description = "List of all secret ARNs for IAM policy"
  value = [
    aws_secretsmanager_secret.github_token.arn,
    aws_secretsmanager_secret.slack_webhook.arn,
    aws_secretsmanager_secret.anthropic_api_key.arn
  ]
}
