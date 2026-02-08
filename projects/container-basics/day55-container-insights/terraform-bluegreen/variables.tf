variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-northeast-1"
}

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "day55-bg"
}

variable "container_image" {
  description = "ECR image URI"
  type        = string
}
