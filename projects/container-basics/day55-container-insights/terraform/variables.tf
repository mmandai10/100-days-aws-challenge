variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-northeast-1"
}

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "day55-insights"
}

variable "container_image" {
  description = "ECR image URI"
  type        = string
  # Example: 123456789012.dkr.ecr.ap-northeast-1.amazonaws.com/day51-sample-app:day55-v1
}
