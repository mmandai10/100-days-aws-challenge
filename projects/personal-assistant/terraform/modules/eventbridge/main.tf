# modules/eventbridge/main.tf
# EventBridge スケジュール（定期実行）

# -----------------------------------------------------------------------------
# EventBridge ルール（毎日22:00 JST）
# -----------------------------------------------------------------------------
resource "aws_cloudwatch_event_rule" "daily_report_schedule" {
  name                = "${var.project_name}-${var.environment}-daily-report-schedule"
  description         = "Trigger daily report generation at 22:00 JST"
  schedule_expression = "cron(0 13 * * ? *)"  # UTC 13:00 = JST 22:00
  state               = var.schedule_enabled ? "ENABLED" : "DISABLED"

  # tags = var.tags  # 権限の問題で一時的に無効化
}

# -----------------------------------------------------------------------------
# EventBridge ターゲット（Lambda を呼び出す）
# -----------------------------------------------------------------------------
resource "aws_cloudwatch_event_target" "daily_report_target" {
  rule      = aws_cloudwatch_event_rule.daily_report_schedule.name
  target_id = "daily-report-lambda"
  arn       = var.lambda_function_arn

  # Lambda に渡す入力
  input = jsonencode({
    source = "eventbridge"
    action = "generate_daily_report"
  })
}

# -----------------------------------------------------------------------------
# Lambda 実行権限（EventBridge → Lambda）
# -----------------------------------------------------------------------------
resource "aws_lambda_permission" "eventbridge_invoke" {
  statement_id  = "AllowEventBridgeInvoke"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.daily_report_schedule.arn
}
