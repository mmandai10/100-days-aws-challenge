output "alb_dns_name" {
  description = "ALB DNS name (production traffic)"
  value       = "http://${aws_lb.main.dns_name}"
}

output "alb_test_url" {
  description = "ALB test listener URL (for verifying Green before switch)"
  value       = "http://${aws_lb.main.dns_name}:8080"
}

output "ecs_cluster_name" {
  description = "ECS cluster name"
  value       = aws_ecs_cluster.main.name
}

output "ecs_service_name" {
  description = "ECS service name"
  value       = aws_ecs_service.app.name
}

output "codedeploy_app_name" {
  description = "CodeDeploy application name"
  value       = aws_codedeploy_app.ecs.name
}

output "codedeploy_dg_name" {
  description = "CodeDeploy deployment group name"
  value       = aws_codedeploy_deployment_group.ecs.deployment_group_name
}
