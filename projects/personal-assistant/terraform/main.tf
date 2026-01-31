# main.tf - DevOps AI コックピット
# Phase 1: パーソナル AI アシスタント

terraform {
  required_version = ">= 1.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# =============================================================================
# Modules
# =============================================================================

# Secrets Manager（GitHub Token + Claude API Key 管理）
module "secrets" {
  source = "./modules/secrets"

  project_name   = var.project_name
  environment    = var.environment
  github_token   = var.github_token
  claude_api_key = var.claude_api_key
}

# Lambda（日報生成）
module "lambda" {
  source = "./modules/lambda"

  project_name = var.project_name
  environment  = var.environment

  # GitHub Token
  github_token_secret_name = module.secrets.secret_name
  github_token_secret_arn  = module.secrets.secret_arn

  # Claude API Key
  claude_api_key_secret_name = module.secrets.claude_api_key_name
  claude_api_key_secret_arn  = module.secrets.claude_api_key_arn

  # DynamoDB
  dynamodb_table_name = module.dynamodb.daily_reports_table_name
  dynamodb_table_arn  = module.dynamodb.daily_reports_table_arn

  # GitHub 設定
  github_username = var.github_username
  github_repo     = var.github_repo

  # メール通知（SES）
  notification_email = var.notification_email

  depends_on = [module.dynamodb]
}

# EventBridge（定期実行）
module "eventbridge" {
  source = "./modules/eventbridge"

  project_name = var.project_name
  environment  = var.environment

  # Lambda からの情報
  lambda_function_arn  = module.lambda.function_arn
  lambda_function_name = module.lambda.function_name

  # 本番運用：毎日18時に自動実行
  schedule_enabled = true
}

# DynamoDB（日報履歴保存）
module "dynamodb" {
  source = "./modules/dynamodb"

  project_name = var.project_name
  environment  = var.environment
}

# =============================================================================
# Incident Analyzer Bot (Day 37-38)
# =============================================================================

# SNS Topic（アラーム通知用）
module "sns" {
  source = "./modules/sns"

  project_name         = var.project_name
  environment          = var.environment
  lambda_function_arn  = aws_lambda_function.incident_analyzer.arn
  lambda_function_name = aws_lambda_function.incident_analyzer.function_name
}

# CloudWatch Alarm（日報Botのエラー監視）
module "cloudwatch_alarm" {
  source = "./modules/cloudwatch-alarm"

  project_name         = var.project_name
  environment          = var.environment
  lambda_function_name = module.lambda.function_name
  sns_topic_arn        = module.sns.topic_arn
  error_threshold      = 0  # Errors > 0 で ALARM
}

# Incident Analyzer Lambda 用の ZIP
data "archive_file" "incident_analyzer" {
  type        = "zip"
  source_file = "${path.module}/../bots/incident-analyzer/index.mjs"
  output_path = "${path.module}/../bots/incident-analyzer.zip"
}

# Incident Analyzer Lambda IAM Role
resource "aws_iam_role" "incident_analyzer" {
  name = "${var.project_name}-${var.environment}-incident-analyzer-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

# CloudWatch Logs 権限
resource "aws_iam_role_policy" "incident_analyzer_logs" {
  name = "cloudwatch-logs"
  role = aws_iam_role.incident_analyzer.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:*:*:*"
      },
      {
        Effect = "Allow"
        Action = [
          "logs:FilterLogEvents",
          "logs:GetLogEvents",
          "logs:DescribeLogStreams"
        ]
        Resource = "arn:aws:logs:*:*:log-group:/aws/lambda/*"
      }
    ]
  })
}

# Secrets Manager 権限（Claude API Key）
resource "aws_iam_role_policy" "incident_analyzer_secrets" {
  name = "secrets-manager"
  role = aws_iam_role.incident_analyzer.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = "secretsmanager:GetSecretValue"
      Resource = module.secrets.claude_api_key_arn
    }]
  })
}

# SES 権限
resource "aws_iam_role_policy" "incident_analyzer_ses" {
  name = "ses-send"
  role = aws_iam_role.incident_analyzer.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = "ses:SendEmail"
      Resource = "*"
    }]
  })
}

# Incident Analyzer Lambda 関数
resource "aws_lambda_function" "incident_analyzer" {
  function_name    = "${var.project_name}-${var.environment}-incident-analyzer"
  filename         = data.archive_file.incident_analyzer.output_path
  source_code_hash = data.archive_file.incident_analyzer.output_base64sha256
  handler          = "index.handler"
  runtime          = "nodejs20.x"
  role             = aws_iam_role.incident_analyzer.arn
  timeout          = 60
  memory_size      = 256

  environment {
    variables = {
      CLAUDE_API_KEY_SECRET_NAME = module.secrets.claude_api_key_name
      NOTIFICATION_EMAIL         = var.notification_email
    }
  }
}

# CloudWatch Log Group
resource "aws_cloudwatch_log_group" "incident_analyzer" {
  name              = "/aws/lambda/${aws_lambda_function.incident_analyzer.function_name}"
  retention_in_days = 14
}

# =============================================================================
# Cost Monitor Bot (Day 38)
# =============================================================================

# Cost Monitor Lambda 用の ZIP
data "archive_file" "cost_monitor" {
  type        = "zip"
  source_file = "${path.module}/../bots/cost-monitor/index.mjs"
  output_path = "${path.module}/../bots/cost-monitor.zip"
}

# Cost Monitor Lambda IAM Role
resource "aws_iam_role" "cost_monitor" {
  name = "${var.project_name}-${var.environment}-cost-monitor-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

# CloudWatch Logs 権限
resource "aws_iam_role_policy" "cost_monitor_logs" {
  name = "cloudwatch-logs"
  role = aws_iam_role.cost_monitor.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ]
      Resource = "arn:aws:logs:*:*:*"
    }]
  })
}

# Cost Explorer 権限
resource "aws_iam_role_policy" "cost_monitor_ce" {
  name = "cost-explorer"
  role = aws_iam_role.cost_monitor.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "ce:GetCostAndUsage",
        "ce:GetCostForecast"
      ]
      Resource = "*"
    }]
  })
}

# Secrets Manager 権限（Claude API Key）
resource "aws_iam_role_policy" "cost_monitor_secrets" {
  name = "secrets-manager"
  role = aws_iam_role.cost_monitor.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = "secretsmanager:GetSecretValue"
      Resource = module.secrets.claude_api_key_arn
    }]
  })
}

# SES 権限
resource "aws_iam_role_policy" "cost_monitor_ses" {
  name = "ses-send"
  role = aws_iam_role.cost_monitor.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = "ses:SendEmail"
      Resource = "*"
    }]
  })
}

# Cost Monitor Lambda 関数
resource "aws_lambda_function" "cost_monitor" {
  function_name    = "${var.project_name}-${var.environment}-cost-monitor"
  filename         = data.archive_file.cost_monitor.output_path
  source_code_hash = data.archive_file.cost_monitor.output_base64sha256
  handler          = "index.handler"
  runtime          = "nodejs20.x"
  role             = aws_iam_role.cost_monitor.arn
  timeout          = 60
  memory_size      = 256

  environment {
    variables = {
      CLAUDE_API_KEY_SECRET_NAME = module.secrets.claude_api_key_name
      NOTIFICATION_EMAIL         = var.notification_email
    }
  }
}

# CloudWatch Log Group
resource "aws_cloudwatch_log_group" "cost_monitor" {
  name              = "/aws/lambda/${aws_lambda_function.cost_monitor.function_name}"
  retention_in_days = 14
}

# EventBridge スケジュール（毎朝 9:00 JST = 00:00 UTC）
resource "aws_cloudwatch_event_rule" "cost_monitor_schedule" {
  name                = "${var.project_name}-${var.environment}-cost-monitor-schedule"
  description         = "Daily cost report at 9:00 JST"
  schedule_expression = "cron(0 0 * * ? *)"
}

resource "aws_cloudwatch_event_target" "cost_monitor" {
  rule      = aws_cloudwatch_event_rule.cost_monitor_schedule.name
  target_id = "cost-monitor-lambda"
  arn       = aws_lambda_function.cost_monitor.arn
}

resource "aws_lambda_permission" "cost_monitor_eventbridge" {
  statement_id  = "AllowEventBridgeInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.cost_monitor.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.cost_monitor_schedule.arn
}
