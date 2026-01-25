# modules/lambda/main.tf
# Lambda 関数と IAM ロール

# -----------------------------------------------------------------------------
# IAM ロール（Lambda 実行用）
# -----------------------------------------------------------------------------
resource "aws_iam_role" "lambda_role" {
  name = "${var.project_name}-${var.environment}-lambda-role"

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

  # tags = var.tags  # IAM TagRole 権限がないため一時的に無効化
}

# -----------------------------------------------------------------------------
# IAM ポリシー（Lambda が使う権限）
# -----------------------------------------------------------------------------
resource "aws_iam_role_policy" "lambda_policy" {
  name = "${var.project_name}-${var.environment}-lambda-policy"
  role = aws_iam_role.lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      # CloudWatch Logs
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:*:*:*"
      },
      # Secrets Manager
      {
        Effect = "Allow"
        Action = [
          "secretsmanager:GetSecretValue"
        ]
        Resource = var.secret_arns
      },
      # DynamoDB
      {
        Effect = "Allow"
        Action = [
          "dynamodb:PutItem",
          "dynamodb:GetItem",
          "dynamodb:Query"
        ]
        Resource = var.dynamodb_table_arn
      }
    ]
  })
}

# -----------------------------------------------------------------------------
# Lambda 関数（日報生成）
# -----------------------------------------------------------------------------
resource "aws_lambda_function" "daily_report" {
  function_name = "${var.project_name}-${var.environment}-daily-report"
  role          = aws_iam_role.lambda_role.arn
  
  # 仮のコード（後で実際のコードに差し替え）
  filename         = data.archive_file.lambda_placeholder.output_path
  source_code_hash = data.archive_file.lambda_placeholder.output_base64sha256
  
  handler = "index.handler"
  runtime = "nodejs20.x"
  timeout = 60  # 最大60秒（API呼び出しがあるため）

  environment {
    variables = {
      DYNAMODB_TABLE                 = var.dynamodb_table_name
      ENVIRONMENT                    = var.environment
      GITHUB_TOKEN_SECRET_NAME       = var.github_token_secret_name
      ANTHROPIC_API_KEY_SECRET_NAME  = var.anthropic_api_key_secret_name
      SLACK_WEBHOOK_SECRET_NAME      = var.slack_webhook_secret_name
      GITHUB_USERNAME                = "mmandai10"
    }
  }

  # tags = var.tags  # 一時的に無効化
}

# -----------------------------------------------------------------------------
# プレースホルダー用 Lambda コード
# -----------------------------------------------------------------------------
data "archive_file" "lambda_placeholder" {
  type        = "zip"
  output_path = "${path.module}/placeholder.zip"

  source {
    content  = <<EOF
exports.handler = async (event) => {
  console.log('Daily Report Generator - Placeholder');
  console.log('Event:', JSON.stringify(event));
  return { statusCode: 200, body: 'OK' };
};
EOF
    filename = "index.js"
  }
}

# -----------------------------------------------------------------------------
# CloudWatch Logs グループ
# -----------------------------------------------------------------------------
resource "aws_cloudwatch_log_group" "lambda_logs" {
  name              = "/aws/lambda/${aws_lambda_function.daily_report.function_name}"
  retention_in_days = 14  # 14日間保持

  # tags = var.tags  # 一時的に無効化
}
