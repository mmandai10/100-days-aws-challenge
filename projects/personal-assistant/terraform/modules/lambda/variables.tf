# modules/lambda/variables.tf

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
}

variable "environment" {
  description = "Environment (dev/stg/prod)"
  type        = string
}

variable "tags" {
  description = "Common tags for all resources"
  type        = map(string)
  default     = {}
}

# 他モジュールからの依存
variable "secret_arns" {
  description = "List of Secrets Manager ARNs to access"
  type        = list(string)
}

variable "dynamodb_table_arn" {
  description = "ARN of DynamoDB table"
  type        = string
}

variable "dynamodb_table_name" {
  description = "Name of DynamoDB table"
  type        = string
}
