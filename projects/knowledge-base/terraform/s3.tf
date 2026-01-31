# S3 バケット - ドキュメント保存用

# ランダムサフィックス（バケット名の一意性確保）
resource "random_string" "bucket_suffix" {
  length  = 8
  special = false
  upper   = false
}

# ドキュメント保存用 S3 バケット
resource "aws_s3_bucket" "documents" {
  bucket = "${var.project_name}-${var.environment}-docs-${random_string.bucket_suffix.result}"

  tags = {
    Name        = "${var.project_name}-documents"
    Environment = var.environment
    Project     = var.project_name
  }
}

# パブリックアクセス禁止
resource "aws_s3_bucket_public_access_block" "documents" {
  bucket = aws_s3_bucket.documents.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# バージョニング有効化（誤削除対策）
resource "aws_s3_bucket_versioning" "documents" {
  bucket = aws_s3_bucket.documents.id
  versioning_configuration {
    status = "Enabled"
  }
}

# サーバーサイド暗号化
resource "aws_s3_bucket_server_side_encryption_configuration" "documents" {
  bucket = aws_s3_bucket.documents.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}
