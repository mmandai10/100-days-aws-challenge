# modules/sns/main.tf
# SNS Topic for CloudWatch Alarms

# SNS Topic（アラーム通知用）
resource "aws_sns_topic" "alarm_topic" {
  name = "${var.project_name}-${var.environment}-alarms"
}

# Lambda を SNS のサブスクライバーとして登録
resource "aws_sns_topic_subscription" "lambda_subscription" {
  topic_arn = aws_sns_topic.alarm_topic.arn
  protocol  = "lambda"
  endpoint  = var.lambda_function_arn
}

# SNS から Lambda を呼び出す権限
resource "aws_lambda_permission" "sns_invoke" {
  statement_id  = "AllowSNSInvoke"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_function_name
  principal     = "sns.amazonaws.com"
  source_arn    = aws_sns_topic.alarm_topic.arn
}

# SNS Topic Policy（CloudWatch Alarms からの publish を許可）
resource "aws_sns_topic_policy" "alarm_policy" {
  arn = aws_sns_topic.alarm_topic.arn

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "AllowCloudWatchAlarms"
        Effect    = "Allow"
        Principal = {
          Service = "cloudwatch.amazonaws.com"
        }
        Action    = "sns:Publish"
        Resource  = aws_sns_topic.alarm_topic.arn
      }
    ]
  })
}
