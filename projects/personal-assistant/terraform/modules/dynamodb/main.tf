# modules/dynamodb/main.tf
# DynamoDB テーブル定義

# -----------------------------------------------------------------------------
# Daily Reports テーブル（日報履歴）
# -----------------------------------------------------------------------------
resource "aws_dynamodb_table" "daily_reports" {
  name         = "${var.project_name}-${var.environment}-daily-reports"
  billing_mode = "PAY_PER_REQUEST"  # オンデマンド課金（開発向け）

  # プライマリキー
  hash_key  = "PK"   # パーティションキー
  range_key = "SK"   # ソートキー

  # キー属性の定義
  attribute {
    name = "PK"
    type = "S"  # String
  }

  attribute {
    name = "SK"
    type = "S"  # String
  }

  # TTL（自動削除）- 90日後に古い日報を削除
  ttl {
    attribute_name = "ttl"
    enabled        = true
  }

  tags = merge(var.tags, {
    Name = "${var.project_name}-daily-reports"
  })
}
