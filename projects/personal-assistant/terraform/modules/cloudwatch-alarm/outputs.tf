# modules/cloudwatch-alarm/outputs.tf

output "error_alarm_arn" {
  description = "Error alarm ARN"
  value       = aws_cloudwatch_metric_alarm.lambda_errors.arn
}

output "error_alarm_name" {
  description = "Error alarm name"
  value       = aws_cloudwatch_metric_alarm.lambda_errors.alarm_name
}
