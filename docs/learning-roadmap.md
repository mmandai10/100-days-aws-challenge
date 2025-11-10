# 100 Days AWS Challenge - 完全版学習ロードマップ（改訂版）

## 🎯 このファイルの使い方
1. 各Dayを始める時に「Day Xを始めたい」と伝える
2. このファイルで何を作るか確認
3. 完了したら ✅ をつける
4. 新しい学習項目が見つかったら「追加学習」に記録

## 📊 現在の進捗状況（2025年11月時点）
- ✅ Day 2: Weather App - 完了・デプロイ済み
- ✅ Day 3: ToDo App - 完了・デプロイ済み  
- ✅ Day 4: Weather Dashboard - 完了・デプロイ済み
- ✅ Day 15: AWS SAM - 完了
- ✅ Day 16: API Gateway + Lambda - 完了
- ✅ Day 17: DynamoDB CRUD - 完了
- ✅ Day 18: Cognito Integration - 完了
- ✅ Day 19: S3 Event Processing - 完了
- ✅ Day 20: IAM/認証システム深掘り（概念編）- 完了
- 🔄 Day 1,5,6,7: 開始済み（要完成）
- ⏳ Day 21以降: 未着手

---

## 📅 Week 1: Static Web Apps Foundation (Day 1-7)

### Day 1: Hello World ✅ S3デプロイ基礎
**作成物**: シンプルな静的サイト
- HTML/CSS/JavaScript基礎
- S3バケット作成
- 静的ウェブホスティング設定
- パブリックアクセス設定

### Day 2: Weather App ✅ 完了
**作成物**: 天気予報アプリ
- OpenWeatherMap API連携
- 非同期処理（async/await）
- 動的DOM操作
- エラーハンドリング

### Day 3: ToDo App ✅ 完了  
**作成物**: タスク管理アプリ
- LocalStorage活用
- CRUD操作
- フィルタリング機能
- データ永続化

### Day 4: Weather Dashboard ✅ 完了
**作成物**: 複数都市天気ダッシュボード
- Chart.jsでデータ可視化
- 複数API呼び出し
- レスポンシブデザイン
- お気に入り機能

### Day 5: Task Manager 🔄
**作成物**: 高度なタスク管理アプリ
- ドラッグ&ドロップ
- カテゴリ分け
- 優先度設定
- 期限管理

### Day 6: User Auth UI 🔄
**作成物**: 認証画面（フロントエンドのみ）
- ログイン/サインアップフォーム
- バリデーション
- パスワード強度チェック
- Remember Me機能

### Day 7: Blog System 🔄
**作成物**: 静的ブログサイト
- 記事一覧
- 記事詳細
- カテゴリ/タグ
- 検索機能

---

## 📅 Week 2: Interactive & Modern Web (Day 8-14)

### Day 8: E-commerce Site
**作成物**: ショッピングカート機能付きECサイト
- 商品カタログ
- カート機能（追加/削除/数量変更）
- 合計金額計算
- チェックアウト画面

### Day 9: Portfolio Site  
**作成物**: モダンなポートフォリオ
- スムーススクロール
- パララックス効果
- アニメーション（AOS/GSAP）
- お問い合わせフォーム

### Day 10: Canvas Game
**作成物**: ブラウザゲーム
- Canvas API
- ゲームループ
- 衝突判定
- スコアシステム

### Day 11: AWS Amplify Auth
**作成物**: Amplify認証アプリ
**必須実装**:
- Amplify CLI初期化
- Cognito User Pool作成
- サインアップ/サインイン
- MFA設定
- パスワードリセット

### Day 12: Amplify + API
**作成物**: サーバーレスCRUD API
- API Gateway設定
- Lambda関数作成
- DynamoDB統合
- 認証付きAPI

### Day 13: Amplify Storage
**作成物**: ファイルストレージアプリ
- S3バケット連携
- ファイルアップロード
- プログレスバー
- ファイル一覧/削除

### Day 14: CloudFront CDN
**作成物**: 高速配信サイト
- CloudFront設定
- キャッシュ戦略
- 圧縮設定
- カスタムドメイン

---

## 📅 Week 3: Serverless Backend (Day 15-21)

### Day 15: AWS SAM ✅ 完了
**作成物**: SAMで作る初めてのサーバーレスアプリ
- AWS SAM CLI使用
- Lambda関数作成
- テンプレート理解
- デプロイ自動化

### Day 16: API Gateway + Lambda ✅ 完了
**作成物**: REST API構築
- APIエンドポイント設計
- リクエスト/レスポンス変換
- CORS設定
- HTTPメソッド理解

### Day 17: DynamoDB CRUD ✅ 完了
**作成物**: NoSQLデータベース操作
- テーブル設計
- パーティションキー/ソートキー
- CRUD操作実装
- Day 16のAPIにDynamoDB統合

### Day 18: Cognito Integration ✅ 完了
**作成物**: セキュアAPI
- JWTトークン検証
- 認可設定
- ユーザープール連携
- カスタム属性

### Day 19: S3 Event Processing ✅ 完了
**作成物**: ファイル処理パイプライン
- S3イベントトリガー
- 画像リサイズ
- メタデータ抽出
- 非同期処理

### Day 20: IAM/認証システム深掘り（概念編）✅ 完了
**実施内容**: IAM理解とSTS/AssumeRoleの仕組み
- ✅ これまでのIAM経験の整理（Day 6, 13, 18）
- ✅ IAMの4要素と認証 vs 認可の理解
- ✅ STSが必要な理由とセキュリティの多層防御
- ✅ AssumeRoleの概念理解（一時的な役割の引き受け）
- ✅ template.yamlの深掘り（SAMの自動生成の仕組み）
- ✅ 実際のAWS環境でIAMロール確認
  - Trust Policy（lambda.amazonaws.comのみAssumeRole可能）
  - Attached Policy（AWSLambdaBasicExecutionRole）
  - Inline Policy（DynamoDB CRUD権限）
- 💡 **重要**: 「作る」ではなく「理解する」深掘り学習期間

### Day 21: IAM/認証システム深掘り（実践編）
**実施内容**: クロスアカウントアクセスと監査
- クロスアカウントAssumeRole実装
- CloudTrail設定と監査ログ分析
- Day 18プロジェクトの権限最適化
- IAMベストプラクティスの実装
- Day 20で学んだ概念を実践で復習

---

### 📚 Week 3 振り返り（Day 21終了後に実施）
**目的**: サーバーレスアーキテクチャとIAMの理解を定着
- Day 15-21の重要概念の復習
  - AWS SAMの仕組み
  - API Gateway + Lambda + DynamoDB連携
  - Cognito認証とAuthorizer
  - IAM・STS・AssumeRoleの理解
- 学習ログの見直しと不明点の洗い出し
- 次週（Java + Spring Boot）への準備

---

## 📅 Week 4: Java + Spring Boot + RDS (Day 22-28) 🆕

### Day 22: Java環境構築 + AWS RDS準備
**作成物**: Hello World REST API + RDS環境構築

**必須セットアップ**:
```
✅ Java 17+ インストール
✅ Maven/Gradle設定
✅ Spring Initializr
✅ IDE設定（IntelliJ/Eclipse）
✅ AWS RDS Aurora Serverless v2 作成（または MySQL）
```

**RDS vs Aurora Serverless 選択ガイド**:
- **RDS MySQL（db.t3.micro）**: 初学者向け、無料枠あり、予測可能な料金
- **Aurora Serverless v2**: 使用量課金、自動スケーリング、より高性能

**作成内容**:
```java
@RestController
public class HelloController {
    @GetMapping("/hello")
    public String hello() {
        return "Hello from Spring Boot + RDS!";
    }
}
```

**重要な学習ポイント**:
- VPC設定（RDSはVPC内に配置）
- セキュリティグループ設定
- RDS エンドポイント取得

---

### Day 23: Spring Boot REST API（RDS接続なし）
**作成物**: タスク管理API（メモリ内データ）

**目的**: Day 16のNode.js版と同じことをJavaで実装して比較

**実装内容**:
```java
@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private List<Task> tasks = new ArrayList<>();
    
    @GetMapping
    public List<Task> getAllTasks() { }
    
    @PostMapping
    public Task createTask(@RequestBody Task task) { }
    
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable String id, 
                           @RequestBody Task task) { }
    
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable String id) { }
}
```

**Node.js（Day 16）との比較記録**:
- コード量の違い
- 型安全性の恩恵
- 開発速度
- エラーハンドリングの違い
- IDEサポート

---

### Day 24: JPA + RDS MySQL統合 ⭐ **最重要**
**作成物**: データベース連携タスク管理API

**技術スタック**:
- Spring Data JPA
- RDS MySQL / Aurora Serverless
- Flyway（マイグレーション）

**Entity設計**:
```java
@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;
    
    @Column(nullable = false)
    private String title;
    
    private String description;
    
    @Enumerated(EnumType.STRING)
    private TaskStatus status;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
}
```

**Repository作成**:
```java
public interface TaskRepository extends JpaRepository<Task, String> {
    List<Task> findByStatus(TaskStatus status);
    
    @Query("SELECT t FROM Task t WHERE t.title LIKE %:keyword%")
    List<Task> searchByKeyword(@Param("keyword") String keyword);
}
```

**Flyway マイグレーション**:
```sql
-- V1__create_tasks_table.sql
CREATE TABLE tasks (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
                ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_status ON tasks(status);
```

**重要な学習ポイント**:
- **JPA（Java）vs AWS SDK（Node.js）の違い**
- **RDS（リレーショナル）vs DynamoDB（NoSQL）の違い**
- トランザクション管理
- コネクションプール
- N+1問題の理解と対策

**Day 17（DynamoDB）との比較**:
- データモデリングの違い
- クエリの柔軟性
- パフォーマンス特性
- コスト構造

---

### Day 25: Spring Security + JWT
**作成物**: セキュアAPI

**実装内容**:
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) 
        throws Exception {
        http
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        return http.build();
    }
}
```

**Day 18（Cognito + Lambda）との比較**:
- 認証の実装方法の違い
- トークン管理
- 複雑さ vs 柔軟性
- AWS管理 vs 自前実装

---

### Day 26: AWS SDK for Java + RDS最適化
**作成物**: AWS統合アプリ + パフォーマンス最適化

**実装内容**:

**1. Secrets Manager統合** - RDS認証情報の安全管理
```java
@Configuration
public class RDSConfig {
    @Bean
    public DataSource dataSource(SecretsManagerService secrets) {
        String password = secrets.getRDSPassword();
        // DataSource設定
    }
}
```

**2. RDS Proxy利用** - Lambda接続最適化
```
Lambda → RDS Proxy → RDS/Aurora
（コネクションプール管理・コールドスタート対策）
```

**3. S3統合** - タスクに添付ファイル機能追加
```java
@Service
public class TaskAttachmentService {
    private final AmazonS3 s3Client;
    private final TaskRepository taskRepository;
    
    public String uploadAttachment(MultipartFile file, 
                                   String taskId) {
        // S3にアップロード
        String s3Url = s3Client.putObject(...);
        
        // RDSにURL保存
        Task task = taskRepository.findById(taskId);
        task.setAttachmentUrl(s3Url);
        taskRepository.save(task);
        
        return s3Url;
    }
}
```

**学習ポイント**:
- Lambda + RDS の接続管理（Day 17のDynamoDBとの違い）
- VPC Lambda設定
- コールドスタート問題と対策
- マルチAWSサービス統合

---

### Day 27: Microservices（RDS + DynamoDB混在）
**作成物**: マイクロサービスアーキテクチャ

**アーキテクチャ設計**:
```
┌─────────────────────┐      ┌──────────────────────┐
│ Task Service        │      │ User Service         │
│ (Spring Boot + RDS) │      │ (Spring Boot +       │
│                     │      │  DynamoDB)           │
│ - 複雑なクエリ      │      │ - 高速アクセス       │
│ - JOIN処理          │      │ - シンプルな構造     │
│ - トランザクション  │      │ - スケーラビリティ   │
└─────────────────────┘      └──────────────────────┘
         │                            │
         └──────────┬─────────────────┘
                    │
         ┌──────────▼──────────┐
         │   API Gateway       │
         │   (統合エンドポイント)│
         └─────────────────────┘
```

**なぜこの構成？適材適所のデータベース選択**:
- **タスクデータ → RDS**: 複雑な検索（期限切れタスク検索、集計レポート）
- **ユーザーデータ → DynamoDB**: 高速ログイン、プロフィール取得

**実装例**:
```java
// Task Service (RDS)
@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;
    
    // 複雑なクエリが可能
    public List<Task> findOverdueTasks() {
        return taskRepository.findByDueDateBeforeAndStatusNot(
            LocalDateTime.now(), 
            TaskStatus.COMPLETED
        );
    }
}

// User Service (DynamoDB)
@Service
public class UserService {
    private final DynamoDbClient dynamoDb;
    
    // シンプルで高速なアクセス
    public User getUser(String userId) {
        return dynamoDb.getItem(GetItemRequest.builder()
            .tableName("users")
            .key(Map.of("userId", AttributeValue.builder().s(userId).build()))
            .build());
    }
}
```

**学習ポイント**:
- データベース選択の実践的判断基準
- マイクロサービス間通信
- API Gatewayでの統合
- トレーシング・ログ管理

---

### Day 28: Docker + ECS/Fargate
**作成物**: コンテナ化 + ECS/Fargateデプロイ

**Dockerfile**:
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/task-api.jar /app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

**ECS Task Definition**:
```json
{
  "family": "task-api",
  "containerDefinitions": [{
    "name": "task-api",
    "image": "123456789.dkr.ecr.ap-northeast-1.amazonaws.com/task-api:latest",
    "memory": 512,
    "cpu": 256,
    "environment": [
      {"name": "SPRING_PROFILES_ACTIVE", "value": "prod"}
    ],
    "secrets": [
      {
        "name": "DB_PASSWORD",
        "valueFrom": "arn:aws:secretsmanager:..."
      }
    ],
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group": "/ecs/task-api",
        "awslogs-region": "ap-northeast-1"
      }
    }
  }]
}
```

**デプロイ構成**:
```
Internet
    ↓
Application Load Balancer
    ↓
ECS Service (Fargate)
    ├── Task 1 (Container)
    ├── Task 2 (Container)
    └── Task 3 (Container)
    ↓
RDS/Aurora (VPC内)
```

**学習ポイント**:
- ECS/FargateからRDS接続
- VPC・セキュリティグループ設定
- ALB設定（ヘルスチェック、ターゲットグループ）
- **Day 15（SAM + Lambda）との比較**:
  - デプロイモデルの違い
  - スケーリング方式
  - コスト構造
  - 運用の複雑さ

---

### 📚 Week 4 振り返り（Day 28終了後に実施）
**目的**: Java + Spring Boot + RDSの理解とNode.jsとの比較を定着
- Day 22-28の重要概念の復習
  - Java開発環境とSpring Bootの理解
  - JPA/Hibernateとデータベース操作
  - Spring Securityと認証
  - RDS vs DynamoDBの違い
- IAM概念の復習（Day 20の内容を再確認）
- Node.js週との比較分析を見直し
- Day 29のパフォーマンス比較に向けた準備

---

## 📊 Node.js週 vs Java週 - 徹底比較

### Week 3 (Node.js + DynamoDB) vs Week 4 (Java + RDS)

| 観点 | Node.js週（Day 15-21） | Java週（Day 22-28） |
|------|------------------------|---------------------|
| **言語** | JavaScript/Node.js | Java 17 |
| **フレームワーク** | Express（軽量） | Spring Boot（重厚） |
| **データベース** | DynamoDB（NoSQL） | RDS/Aurora（SQL） |
| **データモデル** | 柔軟なJSON | 構造化テーブル |
| **ORマッパー** | AWS SDK（直接操作） | JPA/Hibernate |
| **クエリ** | 単純（GetItem, Query） | 複雑（JOIN, GROUP BY） |
| **型安全性** | 弱い（実行時エラー） | 強い（コンパイル時） |
| **開発速度** | 速い | 遅い（ボイラープレート多） |
| **デプロイ** | Lambda（SAM） | ECS/Fargate |
| **起動時間** | 超高速（数ms） | やや遅い（数秒） |
| **スケーリング** | 自動・即座 | 自動だが時間かかる |
| **コスト（小規模）** | ほぼ無料 | $10-50/月 |
| **学習曲線** | 緩やか | 急 |
| **適用領域** | スタートアップ、新規 | 大企業、既存システム |

### データベース選択基準

**DynamoDBを選ぶべき場合**:
- ✅ 高速アクセスが最優先（ミリ秒レベル）
- ✅ シンプルなデータ構造（キー・バリュー）
- ✅ 柔軟なスキーマが必要
- ✅ サーバーレス環境
- ✅ 予測不可能なトラフィック

**RDS/Auroraを選ぶべき場合**:
- ✅ 複雑なクエリが必要（JOIN、集計）
- ✅ トランザクションが重要
- ✅ 既存のSQLアプリ移行
- ✅ レポート・分析機能
- ✅ データ整合性が最重要

---

## 📝 Java週の学習記録テンプレート

各Day完了時に以下を daily-log.md に記録：
```markdown
## Day 24: JPA + RDS統合

### 実装内容
- Entity設計
- Repository作成
- RDS接続設定
- マイグレーション実装

### Node.js（Day 17 DynamoDB）との比較
| 項目 | Node.js + DynamoDB | Java + RDS |
|------|-------------------|-----------|
| 開発速度 | ◯ 速い | △ 遅い |
| 型安全性 | △ なし | ◯ あり |
| クエリ柔軟性 | △ 制限あり | ◯ JOIN可能 |
| パフォーマンス | ◯ 数ms | △ 数十ms |
| コスト | ◯ 無料枠内 | △ $20/月 |

### 選択基準の理解
- **タスク管理アプリの場合**:
  - シンプル版 → DynamoDB
  - 高度な検索・レポート → RDS
  
### 学習時間
- 実装: X時間
- 比較検証: Y時間
- ドキュメント: Z時間

### トラブルシューティング
- 発生した問題
- 解決方法
- 学んだこと
```

---

## 🎯 Java週チェックリスト

### Day 22 完了条件
- [ ] Java 17+ インストール完了
- [ ] Spring Boot Starter Project作成
- [ ] RDS/Aurora作成・接続確認
- [ ] Hello World APIデプロイ成功

### Day 24 完了条件（最重要）
- [ ] JPA Entity定義
- [ ] Repository実装
- [ ] RDS接続成功
- [ ] CRUD操作すべて動作
- [ ] Flywayマイグレーション実行
- [ ] DynamoDBとの違いを文書化

### Day 27 完了条件
- [ ] Task Service（RDS）実装
- [ ] User Service（DynamoDB）実装
- [ ] 両サービスのAPI統合
- [ ] データベース選択基準を理解

### Day 28 完了条件
- [ ] Dockerイメージ作成
- [ ] ECRプッシュ成功
- [ ] ECS/Fargateデプロイ
- [ ] ALB経由でアクセス確認
- [ ] RDS接続動作確認

---

## 📅 Week 5: Advanced Topics (Day 29-35)

### Day 29: Performance比較 ⭐ 深掘り学習日
**実施内容**: Node.js vs Java 徹底比較と分析
- 📊 ベンチマークテスト実施
  - API Gateway + Lambda (Node.js + DynamoDB)
  - ECS/Fargate (Java + Spring Boot + RDS)
  - 同一ワークロードでの比較
- 📈 メトリクス測定
  - レスポンスタイム（p50, p95, p99）
  - メモリ使用量
  - コールドスタート時間
  - スループット
- 💰 コスト分析
  - 小規模トラフィック時
  - 中規模トラフィック時
  - 大規模トラフィック時
- 📝 選択基準のドキュメント化
  - どのような場合にNode.js + Lambdaを選ぶか
  - どのような場合にJava + ECSを選ぶか
  - それぞれの長所・短所の整理
- 💡 **重要**: Week 3-4の学習を振り返り、実践的な選択基準を確立

**Day 29の目的：**
- 単なるベンチマークではなく、「どちらを選ぶべきか」の判断基準を学ぶ
- Week 3（Node.js）とWeek 4（Java）の復習を兼ねる
- 実務で技術選定する際の考え方を習得

### Day 30: ElastiCache
**作成物**: キャッシュシステム
- Redis/Memcached
- セッション管理
- キャッシュ戦略
- TTL設定

### Day 31: SQS/SNS
**作成物**: メッセージングシステム
- キュー設計
- Pub/Subパターン
- DLQ設定
- ファンアウト

### Day 32: EventBridge
**作成物**: イベント駆動アーキテクチャ
- イベントバス
- ルール設定
- ターゲット連携
- スケジュール実行

### Day 33: Auto Scaling
**作成物**: 自動スケーリング設定
- メトリクス設定
- スケーリングポリシー
- ターゲット追跡
- 予測スケーリング

### Day 34: Multi-Region
**作成物**: マルチリージョン構成
- Route 53設定
- レプリケーション
- フェイルオーバー
- レイテンシールーティング

### Day 35: Cost Optimization
**実施内容**: コスト最適化
- Cost Explorer分析
- Reserved Instances
- Spot Instances
- Savings Plans

---

### 📚 Week 5 振り返り（Day 35終了後に実施）
**目的**: 高度なAWSサービスの理解を定着
- Day 29-35の重要概念の復習
  - パフォーマンス比較結果の分析
  - ElastiCache、SQS/SNS、EventBridgeの理解
  - Auto Scalingとマルチリージョン構成
- これまでの学習内容の総復習
  - IAM・認証の理解（Day 20-21）
  - サーバーレス vs コンテナ（Day 15-28）
- Week 6以降の大規模プロジェクトへの準備

---

## 📅 Week 6-8: E-commerce Platform (Day 36-50)

### フルスタックECサイト構築
**技術スタック**: React + Java/Node.js + AWS

#### Phase 1: 基盤構築 (Day 36-40)
- 商品管理システム
- ユーザー管理
- 注文処理
- 在庫管理

#### Phase 2: 決済/配送 (Day 41-45)
- Stripe決済統合
- 配送料計算
- 注文追跡
- メール通知

#### Phase 3: 高度な機能 (Day 46-50)
- レコメンデーション
- レビューシステム
- クーポン/割引
- 分析ダッシュボード

---

## 📅 Week 9-11: Social Media App (Day 51-65)

### SNSプラットフォーム構築
**技術スタック**: Next.js + GraphQL + AWS

#### Phase 1: コア機能 (Day 51-55)
- ユーザープロフィール
- 投稿機能
- いいね/コメント
- フォロー機能

#### Phase 2: リアルタイム (Day 56-60)
- WebSocket通信
- リアルタイムチャット
- 通知システム
- ライブストリーミング

#### Phase 3: 拡張機能 (Day 61-65)
- 画像/動画処理
- ストーリー機能
- ハッシュタグ
- 検索/探索

---

## 📅 Week 12-13: IoT Dashboard (Day 66-80)

### IoTダッシュボード構築
**技術スタック**: React + IoT Core + TimeStream

#### Phase 1: データ収集 (Day 66-70)
- IoT Core設定
- デバイス登録
- MQTT通信
- データ収集

#### Phase 2: 可視化 (Day 71-75)
- リアルタイムグラフ
- ヒートマップ
- アラート設定
- レポート生成

#### Phase 3: 機械学習 (Day 76-80)
- 異常検知
- 予測分析
- SageMaker統合
- 自動化

---

## 📅 Week 14-15: Enterprise SaaS (Day 81-95)

### マルチテナントSaaS構築
**技術スタック**: フルスタック + マイクロサービス

#### Phase 1: 基盤 (Day 81-85)
- テナント管理
- 認証/認可
- 課金システム
- Admin機能

#### Phase 2: 拡張性 (Day 86-90)
- API設計
- Webhook
- 統合機能
- カスタマイズ

#### Phase 3: 運用 (Day 91-95)
- モニタリング
- ログ管理
- バックアップ
- DR対策

---

## 📅 Week 16: Portfolio & Career (Day 96-100)

### Day 96: ポートフォリオサイト完成
- 全プロジェクト掲載
- 技術スタック説明
- 成果物デモ

### Day 97: 技術ブログ作成
- 学習内容まとめ
- ベストプラクティス
- トラブルシューティング

### Day 98: GitHub整理
- README充実
- ドキュメント整備
- CI/CD設定

### Day 99: Resume更新
- AWS認定準備
- スキルマトリックス
- 実績数値化

### Day 100: 振り返り&次の100日計画
- 学習成果分析
- 改善点抽出
- 次期目標設定

---

## 🎯 マイルストーン

### 30日目: フロントエンド完成
- HTML/CSS/JavaScript習得
- React基礎理解
- AWS S3/CloudFront活用

### 60日目: フルスタック開発者
- バックエンド構築可能
- データベース設計（NoSQL + SQL）
- API開発（Node.js + Java）

### 90日目: クラウドアーキテクト
- AWS主要サービス習得
- スケーラブル設計
- セキュリティ実装

### 100日目: プロダクション対応
- 本番運用可能
- パフォーマンス最適化
- コスト最適化

---

## 📚 継続的学習

### 認定資格目標
- AWS Certified Cloud Practitioner (Day 30)
- AWS Certified Developer (Day 60)
- AWS Certified Solutions Architect (Day 90)
- AWS Certified DevOps Engineer (Day 100+)

### 追加学習項目記録欄
- [ ] Terraform/IaC
- [ ] Kubernetes/EKS
- [ ] GraphQL
- [ ] gRPC
- [ ] WebAssembly
- [ ] Aurora Serverless深掘り
- [ ] RDS Proxy詳細
- [ ] その他：＿＿＿＿＿

---

## 🎯 学習目標設定

### JavaScript開発者がJavaを学ぶメリット
1. **型安全性** - コンパイル時エラー検出
2. **エンタープライズ開発** - 大規模システム構築
3. **パフォーマンス** - 高速処理とメモリ効率
4. **Java生態系** - Spring、Maven、JUnit等

### Java学習後の比較理解
- **Node.js**: 高速開発、リアルタイム処理
- **Java**: 堅牢性、スケーラビリティ、保守性

## 📚 推奨学習リソース

### Java基礎
- Oracle Java Documentation
- Spring Boot Reference Guide
- Baeldung (Java/Spring tutorials)

### AWS + Java
- AWS SDK for Java Developer Guide
- AWS Elastic Beanstalk Java Guide
- Spring Cloud AWS

## 🔄 継続的な比較学習

各Javaプロジェクト完了後、同等のNode.jsバージョンと比較：
- 開発速度
- パフォーマンス  
- コード可読性
- 保守性
- AWS統合の違い

## 📋 Java Week チェックリスト

### Day 22 チェック項目
- [ ] Java 17+ インストール完了
- [ ] Spring Boot Starter Project作成
- [ ] AWS SDK for Java設定
- [ ] Elastic Beanstalk初回デプロイ成功

### Day 23-28 継続項目
- [ ] 毎日Gitコミット
- [ ] Node.jsとの違いを記録
- [ ] AWS費用モニタリング
- [ ] 学習時間記録

---

## 📚 復習タスクスケジュール（エビングハウスの忘却曲線対策）

### 🎯 復習の重要性

一度学んだだけでは定着しません。以下のスケジュールで計画的に復習します。

### 📅 復習タイミング

| 学習日 | 復習1（翌日） | 復習2（1週間後） | 復習3（2週間後） | 復習4（1ヶ月後） |
|--------|--------------|-----------------|-----------------|-----------------|
| Day 20-21 | Day 21で実践 | Day 28振り返り | Day 35振り返り | Day 50中間振り返り |
| Day 22-28 | 毎日の実装 | Day 35振り返り | Day 50中間振り返り | Day 65 |
| Day 29-35 | 各Day実践 | Day 43 | Day 50中間振り返り | Day 65 |

### 📝 復習すべき重要概念

#### IAM/認証システム（Day 20-21）
**復習タイミング**: Day 28, Day 35, Day 50
- Trust Policyの仕組み
- AssumeRoleのプロセス
- STSが必要な理由
- 最小権限の原則
- セキュリティの多層防御

#### Node.js vs Java比較（Day 22-29）
**復習タイミング**: Day 35, Day 50, Day 65
- データベース選択基準（DynamoDB vs RDS）
- デプロイモデルの違い（Lambda vs ECS）
- コスト構造の違い
- 適用領域の判断基準

#### サーバーレスアーキテクチャ（Day 15-19）
**復習タイミング**: Day 28, Day 35, Day 50
- AWS SAMの仕組み
- Lambda + API Gateway + DynamoDB連携
- S3イベントトリガー
- Cognito認証統合

### 🔄 各Week終了後の振り返り日

- **Week 3終了後**（Day 21後）: サーバーレス + IAM復習
- **Week 4終了後**（Day 28後）: Java + RDS復習 + IAM再確認
- **Week 5終了後**（Day 35後）: 高度なサービス + 総復習
- **Week 8終了後**（Day 50）: 中間振り返り（全体総復習）
- **Week 11終了後**（Day 65）: SNSアプリ完成後の振り返り
- **Week 14終了後**（Day 80）: IoT完成後の振り返り
- **Week 16終了後**（Day 95）: SaaS完成後の振り返り

### 💡 復習の進め方

#### 1. 概念の再確認（15分）
- daily-log.mdの該当Dayを読み返す
- 重要な学びを3つ挙げる
- 不明点をリストアップ

#### 2. コードの見直し（15分）
- 該当プロジェクトのコードを開く
- template.yamlやコア機能を確認
- 改善点を考える

#### 3. 実践問題（30分）
- 類似のシステムを1から設計してみる
- 「もし〜だったら？」のシナリオを考える
- 別の技術スタックで実装するならどうするか考える

### 📊 復習効果の測定

各復習時に以下を確認：
- ✅ 概念を自分の言葉で説明できるか
- ✅ なぜその技術/設計を選んだか説明できるか
- ✅ エラーが起きた時に原因を推測できるか
- ✅ 別のプロジェクトで応用できそうか

---

## 🎯 深掘り学習日の特徴

### 定期的な「理解の日」を設定

実装に追われると、「なぜ動くのか」を理解せずに進んでしまいます。
以下の日は**深掘り学習日**として、実装ではなく理解に集中します：

- **Day 20-21**: IAM/認証システム深掘り ✅
- **Day 29**: Performance比較・技術選定基準
- **各Week終了後**: 振り返り・復習
- **Day 50**: 中間振り返り（全体総復習）
- **Day 100**: 最終振り返り・次の100日計画

### 深掘り学習日の効果

1. **理解の定着**: 表面的な知識から深い理解へ
2. **エラー対応力**: 根本原因を推測できる
3. **設計力**: なぜその選択をしたか説明できる
4. **応用力**: 別のシナリオで使える

---

**このロードマップで100日後には「フルスタック + クラウドエンジニア」になれる！** 🚀

**復習を習慣化することで、知識が確実に定着します！** 📚