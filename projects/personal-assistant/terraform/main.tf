# main.tf

terraform {
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

# S3 バケット作成
resource "aws_s3_bucket" "test_bucket" {
  bucket = "${var.project_name}-${var.environment}-bucket"

  tags = {
    Name        = "${var.project_name}-bucket"
    Environment = var.environment
    Project     = var.project_name
  }
}
