# ===================
# CodeDeploy Application
# ===================
resource "aws_codedeploy_app" "ecs" {
  compute_platform = "ECS"
  name             = "${var.project_name}-app"
}

# ===================
# CodeDeploy Deployment Group
# ===================
resource "aws_codedeploy_deployment_group" "ecs" {
  app_name               = aws_codedeploy_app.ecs.name
  deployment_group_name  = "${var.project_name}-dg"
  deployment_config_name = "CodeDeployDefault.ECSAllAtOnce"
  service_role_arn       = aws_iam_role.codedeploy.arn

  # ★ Blue/Green 設定
  blue_green_deployment_config {
    deployment_ready_option {
      action_on_timeout = "CONTINUE_DEPLOYMENT"  # 自動で切り替え
    }

    terminate_blue_instances_on_deployment_success {
      action                           = "TERMINATE"
      termination_wait_time_in_minutes = 5  # ロールバック猶予: 5分
    }
  }

  # ★ デプロイスタイル
  deployment_style {
    deployment_option = "WITH_TRAFFIC_CONTROL"
    deployment_type   = "BLUE_GREEN"
  }

  # ★ ECS Service 指定
  ecs_service {
    cluster_name = aws_ecs_cluster.main.name
    service_name = aws_ecs_service.app.name
  }

  # ★ ALB 情報（2つの Target Group + 2つの Listener）
  load_balancer_info {
    target_group_pair_info {
      prod_traffic_route {
        listener_arns = [aws_lb_listener.http.arn]
      }

      test_traffic_route {
        listener_arns = [aws_lb_listener.test.arn]
      }

      target_group {
        name = aws_lb_target_group.blue.name
      }

      target_group {
        name = aws_lb_target_group.green.name
      }
    }
  }

  # ★ 自動ロールバック設定
  auto_rollback_configuration {
    enabled = true
    events  = ["DEPLOYMENT_FAILURE"]
  }
}
