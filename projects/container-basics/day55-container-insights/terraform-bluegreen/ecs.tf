# ===================
# CloudWatch Log Group
# ===================
resource "aws_cloudwatch_log_group" "app" {
  name              = "/ecs/${var.project_name}"
  retention_in_days = 1

  tags = {
    Name = "${var.project_name}-logs"
  }
}

# ===================
# ECS Cluster
# ===================
resource "aws_ecs_cluster" "main" {
  name = "${var.project_name}-cluster"

  tags = {
    Name = "${var.project_name}-cluster"
  }
}

# ===================
# Task Definition
# ===================
resource "aws_ecs_task_definition" "app" {
  family                   = "${var.project_name}-task"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.ecs_task_execution.arn

  container_definitions = jsonencode([
    {
      name      = "${var.project_name}-container"
      image     = var.container_image
      essential = true

      portMappings = [
        {
          containerPort = 3000
          protocol      = "tcp"
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.app.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }
  ])

  tags = {
    Name = "${var.project_name}-task"
  }
}

# ===================
# ECS Service (★ Blue/Green: deployment_controller = CODE_DEPLOY)
# ===================
resource "aws_ecs_service" "app" {
  name            = "${var.project_name}-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = 2
  launch_type     = "FARGATE"

  # ★ ローリングではなく CodeDeploy で管理
  deployment_controller {
    type = "CODE_DEPLOY"
  }

  network_configuration {
    subnets          = [aws_subnet.public_1.id, aws_subnet.public_2.id]
    security_groups  = [aws_security_group.ecs.id]
    assign_public_ip = true
  }

  # ★ 最初は Blue Target Group に接続
  load_balancer {
    target_group_arn = aws_lb_target_group.blue.arn
    container_name   = "${var.project_name}-container"
    container_port   = 3000
  }

  depends_on = [aws_lb_listener.http]

  # ★ CodeDeploy がタスク定義を管理するので、Terraform の変更を無視
  lifecycle {
    ignore_changes = [task_definition, load_balancer]
  }

  tags = {
    Name = "${var.project_name}-service"
  }
}
