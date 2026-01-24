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
