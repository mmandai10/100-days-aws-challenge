# modules/cloudwatch-alarm/variables.tf

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
}

variable "environment" {
  description = "Environment (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "lambda_function_name" {
  description = "Lambda function name to monitor"
  type        = string
}

variable "sns_topic_arn" {
  description = "SNS Topic ARN for alarm notifications"
  type        = string
  default     = ""
}

variable "error_threshold" {
  description = "Number of errors to trigger alarm"
  type        = number
  default     = 1
}

variable "evaluation_periods" {
  description = "Number of periods to evaluate"
  type        = number
  default     = 1
}

variable "period" {
  description = "Period in seconds"
  type        = number
  default     = 60
}

variable "enable_duration_alarm" {
  description = "Enable duration alarm"
  type        = bool
  default     = false
}

variable "duration_threshold_ms" {
  description = "Duration threshold in milliseconds"
  type        = number
  default     = 10000
}
