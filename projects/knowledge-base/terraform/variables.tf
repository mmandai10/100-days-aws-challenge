# 変数定義

variable "aws_region" {
  description = "AWS リージョン"
  type        = string
  default     = "us-east-1"  # Knowledge Bases 対応リージョン
}

variable "project_name" {
  description = "プロジェクト名"
  type        = string
  default     = "ai-knowledge-base"
}

variable "environment" {
  description = "環境（dev/prod）"
  type        = string
  default     = "dev"
}
