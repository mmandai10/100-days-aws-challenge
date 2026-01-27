# ===========================================
# Lambda モジュール - メインリソース
# ===========================================

# -----------------------------------------------------------------------------
# IAM Role（Lambda が使う権限）
# -----------------------------------------------------------------------------
resource "aws_iam_role" "lambda_role" {
  name = "${var.project_name}-${var.environment}-daily-report-role"

  # Lambda がこの Role を使えるようにする
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

# CloudWatch Logs への書き込み権限
resource "aws_iam_role_policy" "lambda_logs" {
  name = "cloudwatch-logs"
  role = aws_iam_role.lambda_role.id

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
      }
    ]
  })
}

# Secrets Manager 読み取り権限
resource "aws_iam_role_policy" "lambda_secrets" {
  name = "secrets-manager-read"
  role = aws_iam_role.lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "secretsmanager:GetSecretValue"
        ]
        Resource = var.github_token_secret_arn
      }
    ]
  })
}

# -----------------------------------------------------------------------------
# Lambda 関数
# -----------------------------------------------------------------------------

# Lambda コードを ZIP 化
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../../../bots/daily-report-simple"
  output_path = "${path.module}/../../../bots/daily-report-simple.zip"
}

# Lambda 関数本体
resource "aws_lambda_function" "daily_report" {
  function_name = "${var.project_name}-${var.environment}-daily-report"
  role          = aws_iam_role.lambda_role.arn
  handler       = "index.handler"  # index.mjs の handler 関数
  runtime       = "nodejs20.x"
  timeout       = 30
  memory_size   = 256

  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256

  environment {
    variables = {
      GITHUB_TOKEN_SECRET_NAME = var.github_token_secret_name
      GITHUB_USERNAME          = var.github_username
      GITHUB_REPO              = var.github_repo
    }
  }

  tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

# CloudWatch Logs グループ
resource "aws_cloudwatch_log_group" "lambda_logs" {
  name              = "/aws/lambda/${aws_lambda_function.daily_report.function_name}"
  retention_in_days = 14

  tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}
