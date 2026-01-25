# outputs.tf - ルート出力

# -----------------------------------------------------------------------------
# Secrets Manager
# -----------------------------------------------------------------------------
output "github_token_arn" {
  description = "ARN of GitHub token secret"
  value       = module.secrets.github_token_arn
}

output "slack_webhook_arn" {
  description = "ARN of Slack webhook secret"
  value       = module.secrets.slack_webhook_arn
}

output "anthropic_api_key_arn" {
  description = "ARN of Anthropic API key secret"
  value       = module.secrets.anthropic_api_key_arn
}

# -----------------------------------------------------------------------------
# DynamoDB
# -----------------------------------------------------------------------------
output "daily_reports_table_name" {
  description = "Name of the daily reports DynamoDB table"
  value       = module.dynamodb.daily_reports_table_name
}

output "daily_reports_table_arn" {
  description = "ARN of the daily reports DynamoDB table"
  value       = module.dynamodb.daily_reports_table_arn
}

# -----------------------------------------------------------------------------
# Lambda
# -----------------------------------------------------------------------------
output "daily_report_function_name" {
  description = "Name of the daily report Lambda function"
  value       = module.lambda.daily_report_function_name
}

output "daily_report_function_arn" {
  description = "ARN of the daily report Lambda function"
  value       = module.lambda.daily_report_function_arn
}

# -----------------------------------------------------------------------------
# EventBridge
# -----------------------------------------------------------------------------
output "schedule_rule_name" {
  description = "Name of the EventBridge schedule rule"
  value       = module.eventbridge.schedule_rule_name
}

output "schedule_enabled" {
  description = "Whether the schedule is currently enabled"
  value       = module.eventbridge.schedule_enabled
}
