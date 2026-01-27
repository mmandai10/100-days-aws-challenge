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

# Secrets Manager（GitHub Token 管理）
module "secrets" {
  source = "./modules/secrets"

  project_name = var.project_name
  environment  = var.environment
  github_token = var.github_token
}

# Lambda（日報生成 - シンプル版）
module "lambda" {
  source = "./modules/lambda"

  project_name = var.project_name
  environment  = var.environment

  # Secrets Manager からの情報
  github_token_secret_name = module.secrets.secret_name
  github_token_secret_arn  = module.secrets.secret_arn

  # GitHub 設定
  github_username = var.github_username
  github_repo     = var.github_repo
}

# -----------------------------------------------------------------------------
# 以下は後で実装
# -----------------------------------------------------------------------------

# # DynamoDB（データストア）
# module "dynamodb" { ... }

# # EventBridge（定期実行）
# module "eventbridge" { ... }
