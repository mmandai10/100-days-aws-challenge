# modules/secrets/main.tf
# Secrets Manager リソース定義

# -----------------------------------------------------------------------------
# GitHub Token
# -----------------------------------------------------------------------------
resource "aws_secretsmanager_secret" "github_token" {
  name        = "${var.project_name}-${var.environment}-github-token"
  description = "GitHub Personal Access Token for API access"

  tags = merge(var.tags, {
    Name = "${var.project_name}-github-token"
  })
}

# -----------------------------------------------------------------------------
# Slack Webhook URL
# -----------------------------------------------------------------------------
resource "aws_secretsmanager_secret" "slack_webhook" {
  name        = "${var.project_name}-${var.environment}-slack-webhook"
  description = "Slack Incoming Webhook URL for notifications"

  tags = merge(var.tags, {
    Name = "${var.project_name}-slack-webhook"
  })
}

# -----------------------------------------------------------------------------
# Anthropic API Key
# -----------------------------------------------------------------------------
resource "aws_secretsmanager_secret" "anthropic_api_key" {
  name        = "${var.project_name}-${var.environment}-anthropic-api-key"
  description = "Anthropic API Key for Claude API access"

  tags = merge(var.tags, {
    Name = "${var.project_name}-anthropic-api-key"
  })
}
