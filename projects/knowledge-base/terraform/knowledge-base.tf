# Bedrock Knowledge Base

# Knowledge Base 本体
resource "aws_bedrockagent_knowledge_base" "main" {
  name     = "${var.project_name}-${var.environment}"
  role_arn = aws_iam_role.knowledge_base.arn

  knowledge_base_configuration {
    type = "VECTOR"

    vector_knowledge_base_configuration {
      embedding_model_arn = "arn:aws:bedrock:${var.aws_region}::foundation-model/amazon.titan-embed-text-v2:0"
    }
  }

  storage_configuration {
    type = "OPENSEARCH_SERVERLESS"

    opensearch_serverless_configuration {
      collection_arn    = aws_opensearchserverless_collection.main.arn
      vector_index_name = "bedrock-knowledge-base-index"

      field_mapping {
        metadata_field = "AMAZON_BEDROCK_METADATA"
        text_field     = "AMAZON_BEDROCK_TEXT_CHUNK"
        vector_field   = "bedrock-knowledge-base-default-vector"
      }
    }
  }

  depends_on = [
    aws_iam_role_policy.knowledge_base_s3,
    aws_iam_role_policy.knowledge_base_bedrock,
    aws_iam_role_policy.knowledge_base_aoss,
    aws_opensearchserverless_collection.main,
    aws_opensearchserverless_access_policy.data
  ]

  tags = {
    Name        = "${var.project_name}-knowledge-base"
    Environment = var.environment
  }
}

# データソース（S3）
resource "aws_bedrockagent_data_source" "s3" {
  name              = "documents"
  knowledge_base_id = aws_bedrockagent_knowledge_base.main.id

  data_source_configuration {
    type = "S3"

    s3_configuration {
      bucket_arn = aws_s3_bucket.documents.arn
    }
  }

  # チャンク設定
  vector_ingestion_configuration {
    chunking_configuration {
      chunking_strategy = "FIXED_SIZE"

      fixed_size_chunking_configuration {
        max_tokens         = 512
        overlap_percentage = 20
      }
    }
  }
}
