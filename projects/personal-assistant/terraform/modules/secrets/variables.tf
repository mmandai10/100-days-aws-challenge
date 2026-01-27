# ===========================================
# Secrets Manager モジュール - 入力変数
# ===========================================

variable "project_name" {
  description = "プロジェクト名（リソース命名に使用）"
  type        = string
}

variable "environment" {
  description = "環境名（dev/staging/prod）"
  type        = string
  default     = "dev"
}

variable "github_token" {
  description = "GitHub Personal Access Token"
  type        = string
  sensitive   = true  # terraform plan/apply 時にマスクされる
}

variable "claude_api_key" {
  description = "Anthropic Claude API Key"
  type        = string
  sensitive   = true
  default     = ""  # オプション（設定されていない場合は空）
}
