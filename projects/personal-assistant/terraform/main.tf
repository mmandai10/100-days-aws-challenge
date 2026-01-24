# main.tf

# AWS Provider 設定
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "ap-northeast-1"
}

# S3 バケット作成
resource "aws_s3_bucket" "test_bucket" {
  bucket = "my-terraform-test-bucket-20260124"

  tags = {
    Name        = "Terraform Test"
    Environment = "Dev"
  }
}