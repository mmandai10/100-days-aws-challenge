# =============================================================================
# Day 51: ECR (Elastic Container Registry)
# =============================================================================

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
  region = "ap-northeast-1"
}

# -----------------------------------------------------------------------------
# ECR Repository
# -----------------------------------------------------------------------------
resource "aws_ecr_repository" "app" {
  name                 = "day51-sample-app"
  image_tag_mutability = "MUTABLE"  # タグの上書きを許可

  # イメージスキャン設定
  image_scanning_configuration {
    scan_on_push = true  # プッシュ時に自動スキャン
  }

  # 暗号化設定（デフォルトは AES-256）
  encryption_configuration {
    encryption_type = "AES256"
  }

  tags = {
    Project = "200days-challenge"
    Day     = "51"
  }
}

# -----------------------------------------------------------------------------
# Lifecycle Policy（古いイメージを自動削除）
# -----------------------------------------------------------------------------
resource "aws_ecr_lifecycle_policy" "app" {
  repository = aws_ecr_repository.app.name

  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Keep last 5 images"
        selection = {
          tagStatus     = "any"
          countType     = "imageCountMoreThan"
          countNumber   = 5
        }
        action = {
          type = "expire"
        }
      }
    ]
  })
}

# -----------------------------------------------------------------------------
# Outputs
# -----------------------------------------------------------------------------
output "repository_url" {
  description = "ECR repository URL"
  value       = aws_ecr_repository.app.repository_url
}

output "registry_id" {
  description = "AWS Account ID (Registry ID)"
  value       = aws_ecr_repository.app.registry_id
}
