# modules/eventbridge/variables.tf

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

# Lambda からの依存
variable "lambda_function_arn" {
  description = "ARN of the Lambda function to trigger"
  type        = string
}

variable "lambda_function_name" {
  description = "Name of the Lambda function to trigger"
  type        = string
}

variable "schedule_enabled" {
  description = "Whether the schedule is enabled"
  type        = bool
  default     = false  # 開発中はデフォルト無効
}
