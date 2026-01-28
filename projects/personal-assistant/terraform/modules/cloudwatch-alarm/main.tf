# modules/cloudwatch-alarm/main.tf
# CloudWatch Alarms for Lambda monitoring

# Lambda エラー数アラーム
resource "aws_cloudwatch_metric_alarm" "lambda_errors" {
  alarm_name          = "${var.project_name}-${var.environment}-${var.lambda_function_name}-errors"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = var.evaluation_periods
  metric_name         = "Errors"
  namespace           = "AWS/Lambda"
  period              = var.period
  statistic           = "Sum"
  threshold           = var.error_threshold
  alarm_description   = "Lambda function ${var.lambda_function_name} error count exceeded threshold"
  treat_missing_data  = "notBreaching"

  dimensions = {
    FunctionName = var.lambda_function_name
  }

  # アラーム発火時に SNS に通知
  alarm_actions = var.sns_topic_arn != "" ? [var.sns_topic_arn] : []
  ok_actions    = var.sns_topic_arn != "" ? [var.sns_topic_arn] : []
}

# Lambda 実行時間アラーム（タイムアウト警告）
resource "aws_cloudwatch_metric_alarm" "lambda_duration" {
  count               = var.enable_duration_alarm ? 1 : 0
  alarm_name          = "${var.project_name}-${var.environment}-${var.lambda_function_name}-duration"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = var.evaluation_periods
  metric_name         = "Duration"
  namespace           = "AWS/Lambda"
  period              = var.period
  statistic           = "Average"
  threshold           = var.duration_threshold_ms
  alarm_description   = "Lambda function ${var.lambda_function_name} duration exceeded threshold"
  treat_missing_data  = "notBreaching"

  dimensions = {
    FunctionName = var.lambda_function_name
  }

  alarm_actions = var.sns_topic_arn != "" ? [var.sns_topic_arn] : []
}
