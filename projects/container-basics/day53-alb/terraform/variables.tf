variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-northeast-1"
}

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "day53-alb"
}

variable "container_image" {
  description = "ECR image URI (from Day 51)"
  type        = string
  # Example: 123456789012.dkr.ecr.ap-northeast-1.amazonaws.com/day51-sample-app:latest
}
