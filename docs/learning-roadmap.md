# 100 Days AWS Challenge - Day 28以降 修正版ロードマップ

## 📅 Week 4 後半〜Week 5: マイクロサービス深掘り + コンテナ化

---

### Day 28: Docker + ECS/Fargate ⭐ 優先実施
**作成物**: Day 27のマイクロサービスをコンテナ化 + ECS/Fargateデプロイ

**目的**: Dockerを早めに片付けて、本番デプロイの基礎を固める

**Dockerfile (Task Service)**:
```dockerfile
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY target/task-service-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**Dockerfile (User Service)**:
```dockerfile
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY target/user-service-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**実装ステップ**:
1. 各サービスのDockerイメージ作成
2. ECR (Elastic Container Registry) にプッシュ
3. ECS クラスター作成
4. Task Definition 定義
5. ECS Service 作成（Fargate起動タイプ）
6. ALB (Application Load Balancer) 設定

**デプロイ構成**:
```
Internet
    ↓
Application Load Balancer (ALB)
    ├── /tasks/* → Task Service (ECS Fargate)
    └── /users/* → User Service (ECS Fargate)
              ↓
    ┌─────────┴─────────┐
    ↓                   ↓
  RDS MySQL         DynamoDB
```

**学習ポイント**:
- Dockerの基本概念（イメージ、コンテナ、レイヤー）
- ECS vs EKS の違い
- Fargate vs EC2 起動タイプの違い
- コンテナオーケストレーションの基礎
- Day 15（SAM + Lambda）との比較

**完了条件**:
- [ ] Task Service Dockerイメージ作成
- [ ] User Service Dockerイメージ作成
- [ ] ECRにプッシュ成功
- [ ] ECS/Fargateでデプロイ成功
- [ ] ALB経由でアクセス確認
- [ ] RDS/DynamoDB接続動作確認

---

### Day 29: マイクロサービス深掘り①（サービス間通信）⭐ 重要
**作成物**: Task ServiceからUser Serviceを呼び出す実装

**なぜ重要？**:
Day 27では「別々のアプリ」を作っただけ。本当のマイクロサービスは**サービス同士が連携**する。

**実装内容**:

**シナリオ**: タスク詳細を取得する時、担当者の名前も一緒に返したい

```
クライアント: GET /tasks/1
    ↓
Task Service: 
    1. RDSからタスク情報取得（assignedUserId = "user-001"）
    2. User Serviceに問い合わせ（GET /users/user-001）
    3. ユーザー情報を取得（name = "田中太郎"）
    4. 統合して返す
    ↓
レスポンス:
{
  "id": 1,
  "title": "レポート作成",
  "assignedUserId": "user-001",
  "assignedUserName": "田中太郎"  ← User Serviceから取得
}
```

**Task Service に追加するコード**:
```java
@Service
public class TaskService {
    
    private final TaskRepository taskRepository;
    private final RestTemplate restTemplate;
    
    // User Serviceを呼び出してユーザー名を取得
    public TaskWithUserDTO getTaskWithUser(Long taskId) {
        Task task = taskRepository.findById(taskId)
            .orElseThrow(() -> new TaskNotFoundException(taskId));
        
        // User Serviceを呼び出し
        String userServiceUrl = "http://user-service:8082/users/" + task.getAssignedUserId();
        UserDTO user = restTemplate.getForObject(userServiceUrl, UserDTO.class);
        
        return new TaskWithUserDTO(task, user.getName());
    }
}
```

**学習ポイント**:
- RestTemplate / WebClient の使い方
- サービス間通信のパターン（同期 vs 非同期）
- サービスのURL管理（ハードコード vs Service Discovery）
- タイムアウト設定の重要性

**完了条件**:
- [ ] Task ServiceからUser Serviceを呼び出す実装
- [ ] 統合レスポンス（タスク + ユーザー名）が返る
- [ ] User Serviceが遅い場合のタイムアウト設定
- [ ] サービス間通信の概念を理解

---

### Day 30: マイクロサービス深掘り②（障害対応パターン）⭐ 重要
**作成物**: サーキットブレーカーとフォールバック実装

**なぜ重要？**:
User Serviceが落ちた時、Task Serviceまで落ちてしまうのは問題。

**問題のシナリオ**:
```
User Service がダウン
    ↓
Task Service が User Service を呼ぶ
    ↓
タイムアウト待ち（30秒）
    ↓
Task Service のスレッドが枯渇
    ↓
Task Service も応答不能に！（連鎖障害）
```

**解決策: サーキットブレーカー**:
```
User Service がダウン
    ↓
Task Service が User Service を呼ぶ
    ↓
サーキットブレーカーが「開く」（呼び出しを遮断）
    ↓
フォールバック値を返す（"Unknown User"）
    ↓
Task Service は正常に動き続ける！
```

**実装（Resilience4j使用）**:
```java
@Service
public class UserServiceClient {
    
    @CircuitBreaker(name = "userService", fallbackMethod = "getUserFallback")
    public UserDTO getUser(String userId) {
        return restTemplate.getForObject(
            "http://user-service:8082/users/" + userId, 
            UserDTO.class
        );
    }
    
    // User Serviceが落ちている時のフォールバック
    public UserDTO getUserFallback(String userId, Exception ex) {
        return new UserDTO(userId, "Unknown User", null);
    }
}
```

**学習ポイント**:
- サーキットブレーカーパターンの概念
- Resilience4j の使い方
- フォールバック戦略
- 障害の連鎖を防ぐ設計思想
- マイクロサービスの「部分的障害耐性」

**完了条件**:
- [ ] Resilience4j 導入
- [ ] サーキットブレーカー設定
- [ ] フォールバック実装
- [ ] User Service停止時もTask Serviceが動くことを確認
- [ ] 障害対応パターンの概念を理解

---

### Day 31: マイクロサービス深掘り③（分散トレーシング）
**作成物**: AWS X-Ray によるリクエスト追跡

**なぜ重要？**:
リクエストが複数サービスを跨ぐと、どこで遅延が発生しているか分からなくなる。

**トレーシングの可視化**:
```
クライアント → API Gateway → Task Service → User Service
                    ↓              ↓            ↓
                  10ms          150ms         50ms
                    
「Task Serviceで150msかかってるな」← X-Rayで可視化
```

**実装内容**:
- AWS X-Ray SDK 導入
- 各サービスにトレーシング設定
- サービス間呼び出しの追跡
- X-Rayコンソールでの可視化

**学習ポイント**:
- 分散トレーシングの概念
- トレースID、セグメント、サブセグメント
- パフォーマンスボトルネックの特定
- X-Ray サービスマップの読み方

**完了条件**:
- [ ] X-Ray SDK 導入
- [ ] 各サービスでトレーシング有効化
- [ ] サービス間呼び出しが可視化される
- [ ] X-Rayコンソールでサービスマップ確認

---

### Day 32: マイクロサービス深掘り④（共通認証）
**作成物**: API Gateway + JWT による統合認証

**なぜ重要？**:
各サービスで別々に認証すると、管理が煩雑になる。

**現状の問題**:
```
クライアント
    ├── Task Service に認証
    └── User Service に認証
    
→ 2回認証が必要（ユーザー体験が悪い）
→ サービスごとに認証ロジックが重複
```

**解決策: API Gatewayで一元認証**:
```
クライアント
    ↓ （JWTトークン付きリクエスト）
API Gateway
    ↓ （トークン検証 → OK）
    ├── Task Service（認証済みとして処理）
    └── User Service（認証済みとして処理）
```

**実装内容**:
- Spring Cloud Gateway に JWT 検証フィルター追加
- 各サービスはヘッダーからユーザー情報を取得
- Cognito または 自前JWT との統合

**学習ポイント**:
- API Gatewayでの認証一元化
- JWTトークンの伝播
- Day 18（Cognito）、Day 25（Spring Security）との統合
- マイクロサービスにおける認証パターン

**完了条件**:
- [ ] API Gatewayで JWT 検証
- [ ] 認証済みリクエストが各サービスに到達
- [ ] 未認証リクエストは401を返す
- [ ] 認証の一元化の概念を理解

---

### Day 33: SQS/SNS（非同期通信）
**作成物**: メッセージングによるサービス間非同期通信

**なぜ重要？**:
Day 29の同期通信では、User Serviceが遅いとTask Serviceも遅くなる。
非同期通信なら、待たずに処理を進められる。

**ユースケース**:
```
タスク作成時に、担当者にメール通知を送りたい

【同期】
Task Service → User Service → Email Service → 完了まで待つ
（遅い、Email Serviceが落ちると全体が落ちる）

【非同期】
Task Service → SQS → 即座に完了
               ↓
    Notification Worker が後で処理
（速い、Workerが落ちてもTask Serviceは影響なし）
```

**実装内容**:
- SQS キュー作成
- Task Serviceからメッセージ送信
- Notification Worker（Lambda）でメッセージ処理
- SNS によるファンアウト（複数サービスへ通知）

**学習ポイント**:
- 同期 vs 非同期通信の使い分け
- SQS の概念（キュー、メッセージ、可視性タイムアウト）
- SNS の概念（トピック、サブスクリプション）
- イベント駆動アーキテクチャの入口

**完了条件**:
- [ ] SQS キュー作成
- [ ] Task Serviceからメッセージ送信
- [ ] Lambda でメッセージ処理
- [ ] 同期 vs 非同期の使い分けを理解

---

### Day 34: EventBridge（イベント駆動アーキテクチャ）
**作成物**: イベントバスによるサービス連携

**なぜ重要？**:
SQS/SNSは「誰に送るか」を送信側が知っている必要がある。
EventBridgeは「何が起きたか」だけ発信し、受信側が自分で購読する。

**SQS/SNS vs EventBridge**:
```
【SQS/SNS】
Task Service が「User Serviceに送る」「Email Serviceに送る」を知っている
→ 送信側が受信側を知る必要がある

【EventBridge】
Task Service が「タスクが作成された」というイベントを発信
→ 誰が購読するかは知らなくていい
→ User Service、Email Service、Analytics Serviceが各自購読
```

**実装内容**:
- EventBridge イベントバス作成
- Task Serviceからイベント発行
- 複数サービスがルールで購読
- イベントスキーマ設計

**学習ポイント**:
- イベント駆動アーキテクチャの概念
- 疎結合の実現方法
- EventBridge ルールとターゲット
- マイクロサービスの進化形

**完了条件**:
- [ ] EventBridge イベントバス作成
- [ ] Task Serviceからイベント発行
- [ ] 複数ターゲットでイベント受信
- [ ] イベント駆動の概念を理解

---

### Day 35: Performance比較 + Week 5 振り返り ⭐ 深掘り学習日
**実施内容**: これまでの学習の統合と比較分析

**比較対象**:
1. **Day 15-19** (Node.js + Lambda + DynamoDB) - サーバーレス
2. **Day 22-34** (Java + ECS + RDS + マイクロサービス) - コンテナ

**測定項目**:
- レスポンスタイム（p50, p95, p99）
- コールドスタート時間
- スループット
- コスト（月額概算）

**選択基準の確立**:
```
【サーバーレス（Lambda + DynamoDB）を選ぶ場合】
- 開発速度重視
- トラフィックが予測不能
- シンプルなデータ構造
- コスト最小化（小規模時）

【コンテナ（ECS + RDS）を選ぶ場合】
- 複雑なビジネスロジック
- 複雑なクエリが必要
- 既存のJavaチームがいる
- 長時間実行処理がある
```

**完了条件**:
- [ ] ベンチマーク実施
- [ ] 比較レポート作成
- [ ] 技術選定基準を文書化
- [ ] Day 29-34の復習完了

---

## 📊 修正版 Week 4-5 まとめ

| Day | 内容 | カテゴリ |
|-----|------|---------|
| Day 27 | マイクロサービス基盤（RDS + DynamoDB）| 基盤構築 ✅ |
| Day 28 | Docker + ECS/Fargate | コンテナ化 |
| Day 29 | サービス間通信 | マイクロサービス深掘り |
| Day 30 | 障害対応パターン（サーキットブレーカー）| マイクロサービス深掘り |
| Day 31 | 分散トレーシング（X-Ray）| マイクロサービス深掘り |
| Day 32 | 共通認証（JWT統合）| マイクロサービス深掘り |
| Day 33 | SQS/SNS（非同期通信）| メッセージング |
| Day 34 | EventBridge（イベント駆動）| イベント駆動 |
| Day 35 | Performance比較 + 振り返り | 深掘り学習日 |

---

## 🎯 マイクロサービス習得のマイルストーン

### Day 27完了時点（今日）
- ✅ 複数サービスの独立起動
- ✅ API Gatewayでのルーティング
- ✅ 適材適所のDB選択（RDS vs DynamoDB）

### Day 30完了時点
- ✅ サービス間通信の実装
- ✅ 障害の連鎖を防ぐ設計
- ✅ 分散システムの課題を理解

### Day 35完了時点
- ✅ 本番レベルのマイクロサービス構築
- ✅ 認証・トレーシング・メッセージングの統合
- ✅ 技術選定の判断基準を習得

---

## 📝 daily-log.md 記録テンプレート（マイクロサービス深掘り用）

```markdown
## Day XX: [タイトル]

### 実装内容
- 

### 新しく学んだ概念
- **[概念名]**: [自分の言葉で説明]

### Day 27との比較
- Day 27時点: [状態]
- 今日の進化: [何が追加されたか]

### なぜこの設計が必要か
- [問題]: 
- [解決策]: 
- [メリット]: 

### 実務での適用場面
- 

### 疑問点・次回深掘りたいこと
- 
```

---

**このロードマップで、Day 35終了時には「本格的なマイクロサービス」が理解できます！** 🚀
