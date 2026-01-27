# ===========================================
# Secrets Manager モジュール - メインリソース
# ===========================================

# GitHub Token を保存するシークレット
resource "aws_secretsmanager_secret" "github_token" {
  name        = "${var.project_name}-${var.environment}-github-token"
  description = "GitHub Personal Access Token for ${var.project_name}"

  # 削除時の待機期間（本番では30日推奨、開発では0で即削除可能）
  recovery_window_in_days = var.environment == "prod" ? 30 : 0

  tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

# シークレットの値を設定
resource "aws_secretsmanager_secret_version" "github_token" {
  secret_id = aws_secretsmanager_secret.github_token.id

  # JSON形式で保存（将来的に複数の値を追加可能）
  secret_string = jsonencode({
    token = var.github_token
  })
}

# ===========================================
# Claude API Key
# ===========================================

resource "aws_secretsmanager_secret" "claude_api_key" {
  count       = var.claude_api_key != "" ? 1 : 0
  name        = "${var.project_name}-${var.environment}-claude-api-key"
  description = "Anthropic Claude API Key for ${var.project_name}"

  recovery_window_in_days = var.environment == "prod" ? 30 : 0

  tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

resource "aws_secretsmanager_secret_version" "claude_api_key" {
  count     = var.claude_api_key != "" ? 1 : 0
  secret_id = aws_secretsmanager_secret.claude_api_key[0].id

  secret_string = jsonencode({
    api_key = var.claude_api_key
  })
}
