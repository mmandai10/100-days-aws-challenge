# modules/sns/variables.tf

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
}

variable "environment" {
  description = "Environment (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "lambda_function_arn" {
  description = "Lambda function ARN to subscribe to SNS"
  type        = string
}

variable "lambda_function_name" {
  description = "Lambda function name for permission"
  type        = string
}
