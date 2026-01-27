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

  # 開発中は無効（手動テスト用）
  schedule_enabled = false
}

# DynamoDB（日報履歴保存）
module "dynamodb" {
  source = "./modules/dynamodb"

  project_name = var.project_name
  environment  = var.environment
}
