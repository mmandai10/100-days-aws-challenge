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

# -----------------------------------------------------------------------------
# Incident Analyzer Bot (Day 37-38)
# -----------------------------------------------------------------------------
output "incident_analyzer_function_name" {
  description = "Incident Analyzer Lambda 関数名"
  value       = aws_lambda_function.incident_analyzer.function_name
}

output "sns_topic_arn" {
  description = "SNS Topic ARN for alarms"
  value       = module.sns.topic_arn
}

output "cloudwatch_alarm_name" {
  description = "CloudWatch Alarm 名"
  value       = module.cloudwatch_alarm.error_alarm_name
}
