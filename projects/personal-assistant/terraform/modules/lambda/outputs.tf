# ===========================================
# Lambda モジュール - 出力
# ===========================================

output "function_name" {
  description = "Lambda 関数名"
  value       = aws_lambda_function.daily_report.function_name
}

output "function_arn" {
  description = "Lambda 関数の ARN"
  value       = aws_lambda_function.daily_report.arn
}

output "role_arn" {
  description = "Lambda の IAM Role ARN"
  value       = aws_iam_role.lambda_role.arn
}
