# modules/eventbridge/outputs.tf

output "schedule_rule_name" {
  description = "Name of the EventBridge schedule rule"
  value       = aws_cloudwatch_event_rule.daily_report_schedule.name
}

output "schedule_rule_arn" {
  description = "ARN of the EventBridge schedule rule"
  value       = aws_cloudwatch_event_rule.daily_report_schedule.arn
}

output "schedule_enabled" {
  description = "Whether the schedule is currently enabled"
  value       = var.schedule_enabled
}
