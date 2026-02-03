# Day 52: ECS 入門
# Terraform でECS Fargate 環境を構築

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

  default_tags {
    tags = {
      Project = "200days-challenge"
      Day     = "day52"
      Phase   = "container-basics"
    }
  }
}

# 現在のアカウントID取得
data "aws_caller_identity" "current" {}

# 現在のリージョン取得
data "aws_region" "current" {}

# デフォルトVPC取得（今回は簡易構成のため）
data "aws_vpc" "default" {
  default = true
}

# デフォルトVPCのサブネット取得
data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}
