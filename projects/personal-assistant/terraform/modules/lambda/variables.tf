# ===========================================
# Lambda モジュール - 入力変数
# ===========================================

variable "project_name" {
  description = "プロジェクト名"
  type        = string
}

variable "environment" {
  description = "環境名（dev/staging/prod）"
  type        = string
}

variable "github_token_secret_name" {
  description = "GitHub Token の Secrets Manager 名"
  type        = string
}

variable "github_token_secret_arn" {
  description = "GitHub Token の Secrets Manager ARN（IAM ポリシー用）"
  type        = string
}

variable "github_username" {
  description = "GitHub ユーザー名"
  type        = string
}

variable "github_repo" {
  description = "GitHub リポジトリ名"
  type        = string
}

variable "claude_api_key_secret_name" {
  description = "Claude API Key の Secrets Manager 名"
  type        = string
  default     = ""
}

variable "claude_api_key_secret_arn" {
  description = "Claude API Key の Secrets Manager ARN（IAM ポリシー用）"
  type        = string
  default     = ""
}

variable "dynamodb_table_name" {
  description = "DynamoDB テーブル名"
  type        = string
  default     = ""
}

variable "dynamodb_table_arn" {
  description = "DynamoDB テーブル ARN（IAM ポリシー用）"
  type        = string
  default     = ""
}

variable "notification_email" {
  description = "通知先メールアドレス（SES）"
  type        = string
  default     = ""
}
