# modules/dynamodb/outputs.tf

output "daily_reports_table_name" {
  description = "Name of the daily reports table"
  value       = aws_dynamodb_table.daily_reports.name
}

output "daily_reports_table_arn" {
  description = "ARN of the daily reports table"
  value       = aws_dynamodb_table.daily_reports.arn
}
