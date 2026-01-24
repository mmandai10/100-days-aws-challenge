# main.tf - DevOps AI コックピット
# Phase 1: パーソナル AI アシスタント

terraform {
  required_version = ">= 1.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# =============================================================================
# Modules（Day 33以降で実装）
# =============================================================================

# module "secrets" {
#   source = "./modules/secrets"
# }

# module "dynamodb" {
#   source = "./modules/dynamodb"
# }

# module "lambda" {
#   source = "./modules/lambda"
# }

# module "api_gateway" {
#   source = "./modules/api-gateway"
# }

# module "eventbridge" {
#   source = "./modules/eventbridge"
# }
