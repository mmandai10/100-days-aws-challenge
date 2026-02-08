# ===================
# Auto Scaling - AWS CLI で設定
# ===================
# AWS Academy環境では application-autoscaling:ListTagsForResource が
# 許可されていないため、Terraform管理ではなくAWS CLIで設定する。
#
# 1. Scalable Target 登録:
#   aws application-autoscaling register-scalable-target \
#     --service-namespace ecs \
#     --resource-id service/day53-alb-cluster/day53-alb-service \
#     --scalable-dimension ecs:service:DesiredCount \
#     --min-capacity 1 \
#     --max-capacity 4
#
# 2. Target Tracking Policy (CPU 50%):
#   aws application-autoscaling put-scaling-policy \
#     --service-namespace ecs \
#     --resource-id service/day53-alb-cluster/day53-alb-service \
#     --scalable-dimension ecs:service:DesiredCount \
#     --policy-name day53-alb-cpu-scaling \
#     --policy-type TargetTrackingScaling \
#     --target-tracking-scaling-policy-configuration \
#       "TargetValue=50.0,PredefinedMetricSpecification={PredefinedMetricType=ECSServiceAverageCPUUtilization},ScaleInCooldown=60,ScaleOutCooldown=60"
#
# 削除:
#   aws application-autoscaling deregister-scalable-target \
#     --service-namespace ecs \
#     --resource-id service/day53-alb-cluster/day53-alb-service \
#     --scalable-dimension ecs:service:DesiredCount
