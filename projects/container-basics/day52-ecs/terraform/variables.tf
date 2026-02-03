variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-northeast-1"
}

variable "app_name" {
  description = "Application name"
  type        = string
  default     = "day52-ecs-app"
}

variable "ecr_repository_name" {
  description = "ECR repository name (Day 51 で作成したもの)"
  type        = string
  default     = "day51-sample-app"
}

variable "container_port" {
  description = "Container port"
  type        = number
  default     = 3000
}

# Fargate の CPU/メモリ組み合わせ
# https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-cpu-memory-error.html
variable "task_cpu" {
  description = "Task CPU units (256 = 0.25 vCPU)"
  type        = number
  default     = 256
}

variable "task_memory" {
  description = "Task memory (MiB)"
  type        = number
  default     = 512
}
