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
