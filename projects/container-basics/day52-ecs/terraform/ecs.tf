# ECS クラスター
resource "aws_ecs_cluster" "main" {
  name = "${var.app_name}-cluster"

  # Container Insights を有効化（メトリクス収集）
  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

# セキュリティグループ（Fargate タスク用）
resource "aws_security_group" "ecs_task" {
  name        = "${var.app_name}-ecs-task-sg"
  description = "Security group for ECS Fargate task"
  vpc_id      = data.aws_vpc.default.id

  # コンテナポートへのインバウンド許可
  ingress {
    description = "Allow inbound to container port"
    from_port   = var.container_port
    to_port     = var.container_port
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # 本番では ALB からのみに制限
  }

  # アウトバウンド（全許可）
  egress {
    description = "Allow all outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# タスク定義
resource "aws_ecs_task_definition" "main" {
  family                   = var.app_name
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"  # Fargate は awsvpc 必須
  cpu                      = var.task_cpu
  memory                   = var.task_memory
  execution_role_arn       = aws_iam_role.ecs_task_execution.arn

  container_definitions = jsonencode([
    {
      name      = var.app_name
      image     = "${data.aws_caller_identity.current.account_id}.dkr.ecr.${data.aws_region.current.name}.amazonaws.com/${var.ecr_repository_name}:latest"
      essential = true

      portMappings = [
        {
          containerPort = var.container_port
          hostPort      = var.container_port
          protocol      = "tcp"
        }
      ]

      # 環境変数
      environment = [
        {
          name  = "NODE_ENV"
          value = "production"
        },
        {
          name  = "PORT"
          value = tostring(var.container_port)
        }
      ]

      # ログ設定（CloudWatch Logs へ出力）
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.ecs.name
          "awslogs-region"        = data.aws_region.current.name
          "awslogs-stream-prefix" = "ecs"
        }
      }

      # ヘルスチェック（alpine には curl がないので wget を使用）
      healthCheck = {
        command     = ["CMD-SHELL", "wget -q -O /dev/null http://localhost:${var.container_port}/health || exit 1"]
        interval    = 30
        timeout     = 5
        retries     = 3
        startPeriod = 60
      }
    }
  ])
}

# ECS サービス
resource "aws_ecs_service" "main" {
  name            = "${var.app_name}-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.main.arn
  desired_count   = 1  # 起動するタスク数
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = data.aws_subnets.default.ids
    security_groups  = [aws_security_group.ecs_task.id]
    assign_public_ip = true  # パブリック IP を割り当て（ALB なしでアクセスするため）
  }

  # デプロイ設定
  deployment_minimum_healthy_percent = 100
  deployment_maximum_percent         = 200

  # タスク定義の変更を検知して再デプロイ
  force_new_deployment = true
}
