# 出力定義

output "s3_bucket_name" {
  description = "ドキュメント保存用 S3 バケット名"
  value       = aws_s3_bucket.documents.id
}

output "knowledge_base_id" {
  description = "Knowledge Base ID"
  value       = aws_bedrockagent_knowledge_base.main.id
}

output "knowledge_base_arn" {
  description = "Knowledge Base ARN"
  value       = aws_bedrockagent_knowledge_base.main.arn
}

output "data_source_id" {
  description = "Data Source ID"
  value       = aws_bedrockagent_data_source.s3.data_source_id
}
