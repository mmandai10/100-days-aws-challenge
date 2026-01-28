# modules/sns/outputs.tf

output "topic_arn" {
  description = "SNS Topic ARN"
  value       = aws_sns_topic.alarm_topic.arn
}

output "topic_name" {
  description = "SNS Topic Name"
  value       = aws_sns_topic.alarm_topic.name
}
