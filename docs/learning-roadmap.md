# AWS Challenge - Learning Roadmap（最新版）

> 100日にこだわらず、理解を深めながら進める

---

## 📊 進捗サマリー

| フェーズ | 状態 | 内容 |
|---------|------|------|
| Phase 1: 基礎 | ✅ 完了 | Day 0-10（HTML/CSS/JS, S3, Lambda, DynamoDB） |
| Phase 2: Amplify & CDN | ✅ 完了 | Day 11-14（Amplify, CloudFront） |
| Phase 3: SAM & サーバーレス | ✅ 完了 | Day 15-19（SAM, API Gateway, Cognito, S3イベント） |
| Phase 4: IAM深掘り | ✅ 完了 | Day 20-21（概念編 + 実践編） |
| Phase 5: Java & Spring Boot | ✅ 完了 | Day 22-26（REST API, JPA, Security, AWS SDK） |
| Phase 6: マイクロサービス基礎 | ✅ 完了 | Day 27-30（ECS, サービス間通信, サーキットブレーカー, ElastiCache） |
| Phase 7: マイクロサービス応用 | 🔜 次 | 分散トレーシング, セッション管理, 非同期通信 |
| Phase 8: 統合 & 振り返り | 📅 予定 | パフォーマンス比較, 総まとめ |

---

## ✅ 完了済み

### Phase 1: Web基礎 + AWS入門（Day 0-10）
| Day | 内容 | 技術スタック |
|-----|------|-------------|
| 0 | 環境構築 | Git, npm, PowerShell |
| 1 | Hello World | HTML/CSS/JS |
| 2 | Weather App | API連携, S3静的ホスティング |
| 3 | ToDo App | LocalStorage, CRUD |
| 4 | Weather Dashboard | Chart.js, CSS Grid |
| 5 | Task Manager | フィルター機能 |
| 6 | IAM基礎 | ユーザー, グループ, ポリシー |
| 7 | Blog System | S3, JSON駆動 |
| 8 | Serverless Blog | Lambda, API Gateway, DynamoDB |
| 9 | CRUD API | Express → Lambda |
| 10 | メモ管理API | フルスタックサーバーレス |

### Phase 2: Amplify & CDN（Day 11-14）
| Day | 内容 | 技術スタック |
|-----|------|-------------|
| 11 | Amplify認証 | Cognito, React |
| 12 | Amplify + API | Lambda, DynamoDB |
| 13 | Photo Storage | S3, Amplify Storage |
| 14 | CloudFront | CDN, HTTPS, キャッシュ |

### Phase 3: SAM & サーバーレス応用（Day 15-19）
| Day | 内容 | 技術スタック |
|-----|------|-------------|
| 15 | AWS SAM入門 | IaC, CloudFormation |
| 16 | API Gateway深掘り | REST API設計 |
| 17 | DynamoDB CRUD | AWS SDK v3 |
| 18 | Cognito統合 | JWT, Authorizer |
| 19 | S3イベント処理 | 画像リサイズパイプライン |

### Phase 4: IAM深掘り（Day 20-21）
| Day | 内容 | 学習内容 |
|-----|------|---------|
| 20 | 概念編 | STS, AssumeRole, Trust Policy |
| 21 | 実践編 | CloudTrail, 最小権限の原則 |

### Phase 5: Java & Spring Boot（Day 22-26）
| Day | 内容 | 技術スタック |
|-----|------|-------------|
| 22 | Spring Boot基礎 | Java 17, Elastic Beanstalk |
| 23 | REST API（メモリ内） | Controller, Service, アノテーション |
| 24 | JPA + RDS | MySQL, Flyway, Repository |
| 25 | Spring Security + JWT | 認証, BCrypt |
| 26 | AWS SDK for Java | S3, Secrets Manager |

### Phase 6: マイクロサービス基礎（Day 27-30）
| Day | 内容 | 技術スタック |
|-----|------|-------------|
| 27 | マイクロサービス基盤 | Task Service (RDS) + User Service (DynamoDB) |
| 28 | Docker + ECS/Fargate | コンテナ化, ECR, ALB |
| 29 | サービス間通信 | RestTemplate, タイムアウト |
| 30 | 障害対応 + キャッシュ | サーキットブレーカー(Resilience4j), ElastiCache(Redis) |

---

## 🔜 次にやること（Phase 7: マイクロサービス応用）

### Day 31: セッション管理（Redis）⭐ 新規追加
**作成物**: Spring Session + ElastiCache

**なぜ重要？**:
Day 30ではRedisを「キャッシュ」として使った。
実務ではRedisの最も一般的な用途は「セッション管理」。

**セッション管理とは？**:
```
1. ユーザーがログイン
2. サーバーがセッションID発行 → Redisに保存
   Redis: "session:abc123" → {userId: "user-001", name: "Tanaka"}

3. 次のリクエスト時
   ユーザー → Cookie: session:abc123
   サーバー → Redis確認 → ログイン済みと判断
```

**実装内容**:
- Spring Session依存関係追加
- ElastiCache（Redis）接続設定
- ログイン状態の永続化
- 複数サーバー間でのセッション共有

**Day 25との比較**:
| | JWT（Day 25） | セッション（Day 31） |
|---|---|---|
| 保存場所 | クライアント | サーバー（Redis） |
| ログアウト | 難しい（トークン破棄できない） | 簡単（Redis削除） |
| スケール | サーバー増やすだけ | Redis必要 |

---

### Day 32: 分散トレーシング（X-Ray）
**作成物**: AWS X-Ray によるリクエスト追跡

**なぜ重要？**:
Day 29-30でサービス間通信を実装した。
どこで遅延が発生しているか分からなくなる問題を解決。

**可視化イメージ**:
```
クライアント → ALB → Task Service → User Service
                  ↓          ↓            ↓
                10ms       150ms         50ms
                    
「Task Serviceで150msかかってる」← X-Rayで可視化
```

---

### Day 33: 共通認証（API Gateway + JWT）
**作成物**: API Gatewayで認証一元化

**なぜ重要？**:
各サービスで別々に認証すると管理が煩雑。

**現状（問題）**:
```
クライアント
    ├── Task Service に認証
    └── User Service に認証
→ 2回認証が必要
```

**解決後**:
```
クライアント → API Gateway（JWT検証）→ 各サービス
```

---

### Day 34: SQS/SNS（非同期通信）
**作成物**: メッセージキューによる疎結合化

**なぜ重要？**:
Day 29の同期通信では、User Serviceが遅いとTask Serviceも遅くなる。

**同期 vs 非同期**:
```
【同期】
Task Service → User Service → 完了まで待つ（遅い）

【非同期】
Task Service → SQS → 即座に完了
               ↓
         Worker が後で処理
```

---

### Day 35: EventBridge（イベント駆動）
**作成物**: イベントバスによるサービス連携

**SQS/SNS vs EventBridge**:
```
【SQS/SNS】送信側が受信側を知る必要がある
【EventBridge】「何が起きたか」だけ発信、受信側が購読
```

---

## 📅 Phase 8: 統合 & 振り返り

### Day 36: パフォーマンス比較
**実施内容**: これまでの学習の統合と比較分析

**比較対象**:
1. Node.js + Lambda + DynamoDB（Day 15-19）
2. Java + ECS + RDS + マイクロサービス（Day 22-35）

**測定項目**:
- レスポンスタイム
- コールドスタート
- コスト
- 開発速度

**選択基準の確立**:
```
【サーバーレス（Lambda）を選ぶ場合】
- 開発速度重視
- トラフィック予測不能
- シンプルなデータ構造

【コンテナ（ECS）を選ぶ場合】
- 複雑なビジネスロジック
- 複雑なクエリ（JOIN）
- 大規模チーム開発
```

---

### Day 37+: 追加トピック（オプション）

| トピック | 内容 |
|---------|------|
| CI/CD | GitHub Actions + CodePipeline |
| Terraform | IaCの別選択肢 |
| EKS | Kubernetes on AWS |
| Step Functions | ワークフロー自動化 |
| Aurora Serverless | RDSのサーバーレス版 |

---

## 🎯 技術選定チートシート

### データベース選択
| 要件 | 選択 |
|------|------|
| シンプルなKey-Value | DynamoDB |
| 複雑なクエリ・JOIN | RDS（MySQL/PostgreSQL） |
| セッション・キャッシュ | ElastiCache（Redis） |

### 認証選択
| 要件 | 選択 |
|------|------|
| 早く実装したい | Cognito |
| 完全カスタマイズ | Spring Security + JWT |
| セッション管理したい | Spring Session + Redis |

### デプロイ選択
| 要件 | 選択 |
|------|------|
| サーバーレス | Lambda + SAM |
| コンテナ | ECS/Fargate |
| 従来型 | Elastic Beanstalk |

### 通信選択
| 要件 | 選択 |
|------|------|
| 即座にレスポンス必要 | 同期（RestTemplate） |
| 処理に時間かかる | 非同期（SQS） |
| 複数サービスに通知 | SNS/EventBridge |

---

## 📝 学習原則

1. **概念理解優先**: 新しい用語が出たら実装前に理解する
2. **比較学習**: Node.js vs Java、同期 vs 非同期、などを比較
3. **エラーは学び**: トラブルシューティングが最も学びになる
4. **適材適所**: 「いつどれを使うか」の判断力を養う

---

*最終更新: 2025-12-06*