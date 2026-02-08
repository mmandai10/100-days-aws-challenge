# 200 Days AWS & AI Challenge - ロードマップ v6.0

## コンセプト：「AI時代のフルスタックエンジニア」を200日で完成させる

- **コンテナ & Kubernetes** でクラウドネイティブ
- **CI/CD** で完全自動化
- **Agentic AI** で次世代 AI システム
- **監視 & 運用** で本番運用スキル
- **AWS 認定 4つ** で客観的証明

---

## 【進め方】
1. docs/learning-roadmap.md を確認して全体像を把握
2. docs/daily-log.md を確認して前回の続きを把握
3. 一つずつ確認しながら進める（各ステップで「OK」を待つ）
4. 理解しながら進める（コピペ職人にしない）
5. daily-log.md を更新する
6. **全インフラは Terraform で管理**
7. MCP の git_commit / git_push でコミット可能

---

## 全体スケジュール

| Phase | Day | テーマ | 状態 |
|-------|-----|--------|------|
| 0 | 1-28 | ShopX EC Platform | ✅ 完了 |
| 1 | 29-44 | AI アシスタント + MCP + RAG | ✅ 完了 |
| 2 | 45-65 | コンテナ基礎（Docker, ECS） | 🔄 次はここ |
| 3 | 66-90 | Kubernetes & EKS | |
| 4 | 91-110 | CI/CD マスター | |
| 🎯 | 111 | **認定試験 #1: Developer Associate** | |
| 5 | 111-140 | Agentic AI 実践 | |
| 🎯 | 141 | **認定試験 #2: AI Practitioner** | |
| 6 | 141-160 | 監視 & 運用 | |
| 7 | 161-185 | 総合プロジェクト | |
| 🎯 | 185 | **認定試験 #3: Solutions Architect Associate** | |
| 8 | 186-200 | 認定資格 & 仕上げ | |
| 🎯 | 195 | **認定試験 #4: GenAI Developer Professional** | |

---

## 認定資格目標

| # | 資格 | 取得目標 Day | 難易度 |
|---|------|-------------|--------|
| 1 | AWS Certified Developer - Associate (DVA-C02) | Day 111 | ★★★☆☆ |
| 2 | AWS Certified AI Practitioner (AIF-C01) | Day 141 | ★★☆☆☆ |
| 3 | AWS Certified Solutions Architect - Associate (SAA-C03) | Day 185 | ★★★☆☆ |
| 4 | AWS Certified GenAI Developer - Professional | Day 195 | ★★★★☆ |

---

## Phase 0: ShopX EC Platform（Day 1-28）✅ 完了

**成果物:**
- フロントエンド: React + TypeScript + Vite
- バックエンド: Lambda + API Gateway + DynamoDB
- 認証: Cognito
- 決済: Stripe
- CI: GitHub Actions
- CD: Amplify Hosting
- 本番URL: https://main.d20nytcowp331l.amplifyapp.com

---

## Phase 1: AI アシスタント + MCP + RAG（Day 29-44）✅ 完了

**成果物:**
- 日報 Bot（EventBridge + Lambda + Claude + SES）
- Incident Analyzer Bot（CloudWatch Alarm + SNS + Claude）
- MCP サーバー v1.3.0（13ツール）
- Knowledge Bases RAG システム（基本設計書完成）
- React フロントエンド（デモモード）

**学んだこと:**
- Terraform による IaC
- Claude API / Bedrock 統合
- MCP（Model Context Protocol）
- RAG アーキテクチャ（Embeddings, Vector DB）

---

## Phase 2: コンテナ基礎（Day 45-65）🔄 次はここ

### 目標
Docker をマスターして ECS Fargate でデプロイ

### スケジュール

| Day | テーマ | 内容 |
|-----|--------|------|
| 45-46 | Docker 入門 | コンテナとは、イメージ vs コンテナ、基本コマンド |
| 47-48 | Dockerfile | マルチステージビルド、ベストプラクティス |
| 49-50 | Docker Compose | マルチコンテナ、ネットワーク、ボリューム |
| 51-52 | コンテナ設計 | 12-Factor App、ログ、環境変数 |
| 53-55 | ECR | プライベートレジストリ、ライフサイクルポリシー |
| 56-58 | ECS 基礎 | タスク定義、サービス、クラスター |
| 59-61 | ECS Fargate | サーバーレスコンテナ、ALB 連携 |
| 62-63 | ShopX コンテナ化 | Lambda → ECS 移行実践 |
| 64-65 | Terraform for ECS | IaC でコンテナ環境構築 |

### AWS サービス
- ECR（Elastic Container Registry）
- ECS（Elastic Container Service）
- Fargate
- ALB（Application Load Balancer）
- CloudWatch Container Insights

### 成果物
- ShopX ECS Fargate 版
- Docker + ECR + ECS パイプライン
- Terraform ECS モジュール

### 学習リソース
- Docker 公式チュートリアル: https://docs.docker.com/get-started/
- ECS Workshop: https://ecsworkshop.com/

---

## Phase 3: Kubernetes & EKS（Day 66-90）

### 目標
Kubernetes を理解して EKS で本番運用

### スケジュール

| Day | テーマ | 内容 |
|-----|--------|------|
| 66-68 | Kubernetes 概念 | Pod, Deployment, Service, ConfigMap, Secret |
| 69-71 | kubectl 操作 | ローカル（minikube/kind）で練習 |
| 72-74 | YAML マニフェスト | Deployment, Service, Ingress 作成 |
| 75-77 | EKS 構築 | eksctl でクラスター作成 |
| 78-80 | EKS ネットワーク | VPC CNI, ALB Ingress Controller |
| 81-83 | Helm | パッケージマネージャー、Chart 作成 |
| 84-86 | EKS 運用 | スケーリング、ローリングアップデート |
| 87-88 | Fargate on EKS | サーバーレス Kubernetes |
| 89-90 | ShopX on EKS | ECS 版を EKS に移行 |

### AWS サービス
- EKS（Elastic Kubernetes Service）
- Fargate for EKS
- ALB Ingress Controller
- eksctl

### 成果物
- ShopX EKS 版
- Helm Chart
- EKS 運用ノウハウ

### 学習リソース
- EKS Workshop: https://www.eksworkshop.com/
- Udemy「手を動かして学ぶ Kubernetes on Amazon EKS」

---

## Phase 4: CI/CD マスター（Day 91-110）

### 目標
GitHub Actions で完全自動化パイプライン構築

### スケジュール

| Day | テーマ | 内容 |
|-----|--------|------|
| 91-92 | GitHub Actions 基礎 | Workflow, Job, Step, Trigger |
| 93-94 | CI パイプライン | Lint, Test, Build, Security Scan |
| 95-96 | AWS 連携（OIDC） | IAM Role + OIDC Provider（シークレット不要！） |
| 97-99 | CD: Lambda デプロイ | SAM / Terraform 自動適用 |
| 100-102 | CD: ECS デプロイ | ECR プッシュ → ECS 更新 |
| 103-105 | CD: EKS デプロイ | kubectl / Helm による自動デプロイ |
| 106-107 | Blue/Green デプロイ | ダウンタイムゼロ更新 |
| 108-109 | GitOps 入門 | ArgoCD / Flux の概念 |
| 110 | 総合演習 | 全パイプライン統合 |

### ツール
- GitHub Actions
- aws-actions（ECR, ECS, configure-aws-credentials）
- Trivy（セキュリティスキャン）
- ArgoCD（GitOps）

### 成果物
- Lambda / ECS / EKS 対応 CI/CD パイプライン
- OIDC 認証による安全な AWS 連携
- Blue/Green デプロイ設定

### 学習リソース
- GitHub Actions 公式: https://docs.github.com/en/actions
- aws-actions: https://github.com/aws-actions

---

## 🎯 認定試験 #1: AWS Certified Developer - Associate

**目標 Day:** 111
**Phase 2-4 の知識で対応**

---

## Phase 5: Agentic AI 実践（Day 111-140）

### 目標
Bedrock Agents → AgentCore → 本番レベル AI システム

### スケジュール

| Day | テーマ | 内容 |
|-----|--------|------|
| 111-113 | Bedrock Agents 入門 | コンソールで Agent 作成、テスト |
| 114-116 | Action Groups | Lambda 連携、OpenAPI スキーマ |
| 117-119 | Knowledge Bases 連携 | RAG + Agent の統合 |
| 120-122 | Hotel Booking Agent | 予約システム Agent 構築 |
| 123-125 | マルチエージェント | Supervisor Agent、協調動作 |
| 126-128 | Travel Agent | 複数 Agent オーケストレーション |
| 129-131 | AgentCore Runtime | スケーラブルな Agent 実行環境 |
| 132-133 | AgentCore Gateway | 外部 API 連携、ツール管理 |
| 134-135 | AgentCore Identity | 認証・認可、セキュリティ |
| 136-137 | AgentCore Memory | 短期・長期メモリ、コンテキスト管理 |
| 138-139 | MCP + Bedrock | 既存 MCP v1.3.0 と Agent 統合 |
| 140 | 本番化設計 | コスト最適化、監視、ガバナンス |

### AWS サービス
- Bedrock Agents
- Bedrock AgentCore（Runtime, Gateway, Identity, Memory）
- Bedrock Knowledge Bases
- Lambda（Action Groups）
- Step Functions（オーケストレーション）

### 成果物
- Hotel Booking Agent
- Travel Multi-Agent System
- AgentCore 本番構成

### 学習リソース
- Bedrock Agents Quickstart: https://github.com/build-on-aws/amazon-bedrock-agents-quickstart
- Bedrock Workshop: https://github.com/aws-samples/amazon-bedrock-workshop

---

## 🎯 認定試験 #2: AWS Certified AI Practitioner

**目標 Day:** 141
**Phase 1 + Phase 5 の知識でカバー**

---

## Phase 6: 監視 & 運用（Day 141-160）

### 目標
Observability 完全マスター

### スケジュール

| Day | テーマ | 内容 |
|-----|--------|------|
| 141-143 | CloudWatch 深掘り | カスタムメトリクス, Logs Insights |
| 144-146 | CloudWatch Alarms | 複合アラーム、異常検知 |
| 147-149 | X-Ray | 分散トレーシング、サービスマップ |
| 150-152 | CloudWatch Synthetics | 外形監視、Canary |
| 153-155 | Container Insights | ECS/EKS メトリクス |
| 156-157 | Amazon Managed Grafana | ダッシュボード、アラート |
| 158-159 | OpenTelemetry | 標準化された計装 |
| 160 | 統合ダッシュボード | 全サービス可視化 |

### AWS サービス
- CloudWatch（Logs, Metrics, Alarms, Insights, Synthetics）
- X-Ray
- Container Insights
- Amazon Managed Grafana
- AWS Distro for OpenTelemetry

### 成果物
- 統合監視ダッシュボード
- アラート設定一式
- 運用手順書

**備考:** CloudFront / WAF は Phase 7 Project 2 で実践（SAA 試験範囲）

### 学習リソース
- Observability Workshop: https://catalog.workshops.aws/observability/

---

## Phase 7: 総合プロジェクト（Day 161-185）

### 目標
全スキルを統合した本番レベルシステム

### Project 1: 社内ナレッジ Bot（Day 161-172）

| Day | 内容 |
|-----|------|
| 161-163 | 要件定義、アーキテクチャ設計 |
| 164-166 | Knowledge Bases + Bedrock Agent 構築 |
| 167-169 | Teams Bot 連携（Azure Bot Service） |
| 170-172 | 認証、監視、本番デプロイ |

### Project 2: CloudFront + WAF + CI/CD（Day 173-180）

| Day | 内容 |
|-----|------|
| 173-174 | CloudFront（CDN）: キャッシュ、オリジン設定、SSL |
| 175-176 | WAF: ルール設定、レートリミット、IP制限 |
| 177-178 | GitHub Actions CI/CD テンプレート作成 |
| 179-180 | Lambda / ECS / EKS 対応、監視連携 |

### Project 3: コスト最適化ダッシュボード（Day 181-185）

| Day | 内容 |
|-----|------|
| 181-182 | Cost Explorer API + Lambda |
| 183-184 | Grafana ダッシュボード |
| 185 | 異常検知アラート |

### 成果物
- 3つの本番レベルプロジェクト
- ポートフォリオ用ドキュメント

---

## 🎯 認定試験 #3: AWS Certified Solutions Architect - Associate

**目標 Day:** 185
**全 Phase の知識を活用**

---

## Phase 8: 認定資格 & 仕上げ（Day 186-200）

### 目標
最後の認定取得 + 200日チャレンジ完走

### スケジュール

| Day | テーマ | 内容 |
|-----|--------|------|
| 186-190 | GenAI Developer 対策 | 模擬試験、弱点補強 |
| 191-195 | Microcredential 対策 | Agentic AI Demonstrated 実技練習 |
| 196-198 | ドキュメント整備 | README、アーキテクチャ図、ブログ記事 |
| 199 | 振り返り | 200日間の成果まとめ |
| 200 | 🎉 完走！ | 次のステップ計画 |

---

## 🎯 認定試験 #4: AWS Certified GenAI Developer - Professional

**目標 Day:** 195
**または AWS Agentic AI Demonstrated（Microcredential）**

---

## スキル習得マップ

```
スキル              Phase1  Phase2  Phase3  Phase4  Phase5  Phase6  Phase7
───────────────────────────────────────────────────────────────────────────
Terraform           ████    ████    ████    ████    ████    ████    ████
AI/LLM              ████                            ████            ████
Docker                      ████    ████
Kubernetes                          ████    ████
ECS                         ████            ████
EKS                                 ████    ████
GitHub Actions                              ████                    ████
Bedrock Agents                              ████                    ████
AgentCore                                   ████
CloudWatch          ████                            ████    ████    ████
X-Ray                                                       ████
CloudFront/WAF                                                      ████
Grafana                                                     ████    ████
```

---

## プロジェクト構成

```
C:\100-days-aws-challenge\projects\
├── ai-learning/           # 12月 AI学習（完了）
├── ec-platform/           # Phase 0: ShopX（完了）
├── personal-assistant/    # Phase 1: AI アシスタント（完了）
├── knowledge-base/        # Phase 1: RAG システム（完了）
├── container-basics/      # Phase 2: Docker + ECS
├── kubernetes-eks/        # Phase 3: EKS
├── cicd-pipeline/         # Phase 4: GitHub Actions
├── agentic-ai/            # Phase 5: Bedrock Agents
├── observability/         # Phase 6: 監視
└── final-projects/        # Phase 7: 総合プロジェクト
```

---

## 学習リソース

### Claude Code 関連
- Claude-Mem（セッション間メモリプラグイン）: https://github.com/thedotmack/claude-mem
  - セッション間でコンテキストを自動保持
  - トークン使用量を最大95%削減
  - インストール: `/plugin marketplace add thedotmack/claude-mem`
  - Web UI: http://localhost:37777
  - Claude Code を使う前に導入を検討

### コンテナ & Kubernetes
- Docker 公式: https://docs.docker.com/get-started/
- ECS Workshop: https://ecsworkshop.com/
- EKS Workshop: https://www.eksworkshop.com/

### CI/CD
- GitHub Actions: https://docs.github.com/en/actions
- aws-actions: https://github.com/aws-actions

### AI/ML
- Bedrock Workshop: https://github.com/aws-samples/amazon-bedrock-workshop
- Bedrock Agents Quickstart: https://github.com/build-on-aws/amazon-bedrock-agents-quickstart

### 監視
- Observability Workshop: https://catalog.workshops.aws/observability/

### AWS 全般
- AWS Workshops: https://workshops.aws/
- 12 Weeks Workshops: https://12weeksworkshops.com/
- AWS Skill Builder: https://skillbuilder.aws/

---

## 学習ペース

| 週 | Day | 学習時間目安 |
|----|-----|-------------|
| 平日 | 5日 | 1-2時間/日 |
| 週末 | 2日 | 3-4時間/日 |
| **週合計** | - | **11-18時間** |

**200日 ≒ 約29週 ≒ 約7ヶ月**

---

## 更新履歴

| バージョン | 日付 | 内容 |
|------------|------|------|
| v1.0 | 2024-12 | 初版（100日版） |
| v5.0 | 2025-01 | Phase 1 詳細化 |
| v6.0 | 2025-02 | 200日版に拡張、認定資格4つ追加 |
| v6.1 | 2026-02 | Phase 7 に CloudFront + WAF 追加 |
