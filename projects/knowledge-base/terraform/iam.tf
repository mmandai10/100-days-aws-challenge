# IAM ロール - Knowledge Bases 用

# Knowledge Bases 用 IAM ロール
resource "aws_iam_role" "knowledge_base" {
  name = "${var.project_name}-${var.environment}-kb-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "bedrock.amazonaws.com"
      }
      Condition = {
        StringEquals = {
          "aws:SourceAccount" = data.aws_caller_identity.current.account_id
        }
        ArnLike = {
          "aws:SourceArn" = "arn:aws:bedrock:${var.aws_region}:${data.aws_caller_identity.current.account_id}:knowledge-base/*"
        }
      }
    }]
  })

  tags = {
    Name        = "${var.project_name}-kb-role"
    Environment = var.environment
  }
}

# 現在の AWS アカウント情報を取得
data "aws_caller_identity" "current" {}

# S3 アクセス権限
resource "aws_iam_role_policy" "knowledge_base_s3" {
  name = "s3-access"
  role = aws_iam_role.knowledge_base.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:ListBucket"
        ]
        Resource = [
          aws_s3_bucket.documents.arn,
          "${aws_s3_bucket.documents.arn}/*"
        ]
      }
    ]
  })
}

# Bedrock モデル呼び出し権限（Embedding 用）
resource "aws_iam_role_policy" "knowledge_base_bedrock" {
  name = "bedrock-access"
  role = aws_iam_role.knowledge_base.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "bedrock:InvokeModel"
        ]
        Resource = [
          "arn:aws:bedrock:${var.aws_region}::foundation-model/amazon.titan-embed-text-v2:0"
        ]
      }
    ]
  })
}

# OpenSearch Serverless アクセス権限
resource "aws_iam_role_policy" "knowledge_base_aoss" {
  name = "opensearch-serverless-access"
  role = aws_iam_role.knowledge_base.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "aoss:APIAccessAll"
        ]
        Resource = [
          "arn:aws:aoss:${var.aws_region}:${data.aws_caller_identity.current.account_id}:collection/*"
        ]
      }
    ]
  })
}
