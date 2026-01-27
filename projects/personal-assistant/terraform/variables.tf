# variables.tf

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-northeast-1"
}

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "personal-assistant"
}

variable "environment" {
  description = "Environment (dev/stg/prod)"
  type        = string
  default     = "dev"
}

variable "github_token" {
  description = "GitHub Personal Access Token"
  type        = string
  sensitive   = true  # plan/apply 時にマスクされる
}

variable "github_username" {
  description = "GitHub ユーザー名"
  type        = string
  default     = "mmandai10"
}

variable "github_repo" {
  description = "GitHub リポジトリ名"
  type        = string
  default     = "100-days-aws-challenge"
}
