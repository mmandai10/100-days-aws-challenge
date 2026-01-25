# modules/lambda/outputs.tf

output "daily_report_function_name" {
  description = "Name of the daily report Lambda function"
  value       = aws_lambda_function.daily_report.function_name
}

output "daily_report_function_arn" {
  description = "ARN of the daily report Lambda function"
  value       = aws_lambda_function.daily_report.arn
}

output "lambda_role_arn" {
  description = "ARN of the Lambda execution role"
  value       = aws_iam_role.lambda_role.arn
}
