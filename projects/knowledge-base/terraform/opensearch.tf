# OpenSearch Serverless - ベクトル検索用

# 暗号化ポリシー（必須）
resource "aws_opensearchserverless_security_policy" "encryption" {
  name = "${var.project_name}-${var.environment}-enc"
  type = "encryption"

  policy = jsonencode({
    Rules = [
      {
        Resource = [
          "collection/${var.project_name}-${var.environment}"
        ]
        ResourceType = "collection"
      }
    ]
    AWSOwnedKey = true
  })
}

# ネットワークポリシー（パブリックアクセス許可）
resource "aws_opensearchserverless_security_policy" "network" {
  name = "${var.project_name}-${var.environment}-net"
  type = "network"

  policy = jsonencode([
    {
      Rules = [
        {
          Resource = [
            "collection/${var.project_name}-${var.environment}"
          ]
          ResourceType = "collection"
        }
      ]
      AllowFromPublic = true
    }
  ])
}

# データアクセスポリシー（Knowledge Bases + 自分がアクセス可能に）
resource "aws_opensearchserverless_access_policy" "data" {
  name = "${var.project_name}-${var.environment}-data"
  type = "data"

  policy = jsonencode([
    {
      Rules = [
        {
          Resource = [
            "collection/${var.project_name}-${var.environment}"
          ]
          Permission = [
            "aoss:CreateCollectionItems",
            "aoss:DeleteCollectionItems",
            "aoss:UpdateCollectionItems",
            "aoss:DescribeCollectionItems"
          ]
          ResourceType = "collection"
        },
        {
          Resource = [
            "index/${var.project_name}-${var.environment}/*"
          ]
          Permission = [
            "aoss:CreateIndex",
            "aoss:DeleteIndex",
            "aoss:UpdateIndex",
            "aoss:DescribeIndex",
            "aoss:ReadDocument",
            "aoss:WriteDocument"
          ]
          ResourceType = "index"
        }
      ]
      Principal = [
        aws_iam_role.knowledge_base.arn,
        data.aws_caller_identity.current.arn
      ]
    }
  ])
}

# OpenSearch Serverless コレクション
resource "aws_opensearchserverless_collection" "main" {
  name = "${var.project_name}-${var.environment}"
  type = "VECTORSEARCH"

  depends_on = [
    aws_opensearchserverless_security_policy.encryption,
    aws_opensearchserverless_security_policy.network,
    aws_opensearchserverless_access_policy.data
  ]

  tags = {
    Name        = "${var.project_name}-vector-store"
    Environment = var.environment
  }
}
