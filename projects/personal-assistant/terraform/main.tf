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

# -----------------------------------------------------------------------------
# ローカル変数（共通タグ）
# -----------------------------------------------------------------------------
locals {
  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}

# =============================================================================
# Modules
# =============================================================================

# Secrets Manager（トークン管理）
module "secrets" {
  source = "./modules/secrets"

  project_name = var.project_name
  environment  = var.environment
  tags         = local.common_tags
}

# DynamoDB（データストア）
module "dynamodb" {
  source = "./modules/dynamodb"

  project_name = var.project_name
  environment  = var.environment
  tags         = local.common_tags
}

# Lambda（日報生成）
module "lambda" {
  source = "./modules/lambda"

  project_name = var.project_name
  environment  = var.environment
  tags         = local.common_tags

  # 他モジュールからの依存を渡す
  secret_arns         = module.secrets.all_secret_arns
  dynamodb_table_arn  = module.dynamodb.daily_reports_table_arn
  dynamodb_table_name = module.dynamodb.daily_reports_table_name
}

# EventBridge（定期実行）
module "eventbridge" {
  source = "./modules/eventbridge"

  project_name = var.project_name
  environment  = var.environment
  tags         = local.common_tags

  # Lambda への依存
  lambda_function_arn  = module.lambda.daily_report_function_arn
  lambda_function_name = module.lambda.daily_report_function_name
  schedule_enabled     = false  # 開発中は無効
}
