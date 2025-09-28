# 100 Days Challenge - 学習ロードマップ（アプリ開発重視）

## 🎯 このファイルの使い方
1. 各Dayを始める時に「Day Xを始めたい」と伝える
2. このファイルで何を作るか確認
3. 完了したら ✅ をつける
4. 新しい学習項目が見つかったら「追加学習」に記録

---

## 🎯 Week 1-2: Frontend Foundation (Day 1-14)

### Week 1: Static Web Apps
- **Day 1-7**: HTML/CSS/JavaScript基礎
  - Day 1: Hello World (S3)
  - Day 2: Weather App (API連携)
  - Day 3: ToDo App (LocalStorage)
  - Day 4: Weather Dashboard (Chart.js)
  - Day 5: Task Manager (複雑なDOM操作)
  - Day 6: User Auth (フロントエンド認証)
  - Day 7: Blog System (静的ホスティング)

### Week 2: Interactive Web Apps
- **Day 8-14**: より高度なフロントエンド
  - Day 8: E-commerce Site (ショッピングカート)
  - Day 9: Portfolio Site (レスポンシブ)
  - Day 10: Game (Canvas API)
  - Day 11: Chat App UI (WebSocket準備)
  - Day 12: Dashboard (データ可視化)
  - Day 13: PWA (Progressive Web App)
  - Day 14: CloudFront連携 (CDN)

## 🔧 Week 3: Serverless Backend (Day 15-21)

### Node.js + AWS Lambda
- **Day 15**: Lambda基礎 (Hello World API)
- **Day 16**: API Gateway + Lambda (REST API)
- **Day 17**: DynamoDB基礎 (NoSQL)
- **Day 18**: Authentication (Cognito)
- **Day 19**: File Upload (S3 + Lambda)
- **Day 20**: Full Stack App (React + Lambda)
- **Day 21**: Error Handling & Monitoring

## ☕ Week 4: Java Backend Deep Dive (Day 22-28)

### Java + Spring Boot + AWS

#### Day 22: Java Environment Setup
**必須項目:**
- Java 17+ インストール
- Maven/Gradle セットアップ  
- Spring Boot プロジェクト作成
- AWS SDK for Java設定

**作成物:** Hello World Spring Boot API  
**デプロイ:** AWS Elastic Beanstalk

#### Day 23: Spring Boot REST API
**必須項目:**
- RESTController作成
- JSONレスポンス
- エラーハンドリング
- Validationアノテーション

**作成物:** Task Management API  
**学習:** @RestController, @RequestMapping, @Valid

#### Day 24: Database Integration
**必須項目:**
- Spring Data JPA設定
- Entity作成とマッピング
- Repository pattern
- RDS (MySQL) 連携

**作成物:** JPA を使った CRUD API  
**AWS:** RDS インスタンス作成・接続

#### Day 25: Spring Security
**必須項目:**
- Spring Security設定
- JWT認証
- Password暗号化
- Role-based認可

**作成物:** 認証付きAPI  
**学習:** @PreAuthorize, SecurityFilterChain

#### Day 26: AWS Integration
**必須項目:**
- S3ファイルアップロード
- SQSメッセージング
- Parameter Store設定管理
- CloudWatch ログ

**作成物:** AWS完全統合API  
**実務知識:** AWS SDK使い方、設定外部化

#### Day 27: Microservices Architecture
**必須項目:**
- Service分割設計
- Inter-service通信
- Configuration Server
- Service Discovery

**作成物:** User Service + Product Service  
**学習:** Microservicesパターン

#### Day 28: Production Ready
**必須項目:**
- Docker化
- ECS/Fargate デプロイ
- Application Load Balancer
- CI/CD パイプライン

**作成物:** 本番運用可能なJavaアプリ  
**AWS:** ECS Cluster, CodePipeline

## 🚀 Week 5: Advanced Topics (Day 29-35)

### Performance & Scalability
- **Day 29**: Node.js vs Java パフォーマンス比較
- **Day 30**: キャッシュ戦略 (Redis/ElastiCache)
- **Day 31**: Message Queue (SQS/SNS)
- **Day 32**: Event-Driven Architecture
- **Day 33**: Auto Scaling
- **Day 34**: Multi-Region Deployment
- **Day 35**: Cost Optimization

## 📊 Week 6-14: Real-World Projects (Day 36-100)

### 大規模プロジェクト
- **Day 36-50**: E-commerce Platform (Java + React)
- **Day 51-65**: Social Media App (Node.js + React)
- **Day 66-80**: IoT Dashboard (Java + Time Series DB)
- **Day 81-95**: Enterprise SaaS (Multi-tenant)
- **Day 96-100**: Portfolio & Resume Projects

## 💡 Java学習の段階的アプローチ

### Level 1: Java基礎 (Day 22-24)
```java
// Spring Boot基本構造を理解
@RestController
public class HelloController {
    @GetMapping("/hello")
    public String hello() {
        return "Hello from Spring Boot!";
    }
}
```

### Level 2: Spring Ecosystem (Day 25-27)
```java
// Spring Data JPA + Security
@Entity
public class User {
    @Id 
    @GeneratedValue
    private Long id;
    
    @Column(nullable = false)
    private String username;
    
    // getters, setters...
}
```

### Level 3: AWS統合 (Day 28)
```java
// AWS SDK使用例
@Service
public class S3Service {
    @Autowired
    private AmazonS3 s3Client;
    
    public String uploadFile(MultipartFile file) {
        // S3アップロード実装
        return s3Client.putObject(bucketName, fileName, file.getInputStream(), metadata)
            .getETag();
    }
}
```

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

このロードマップにより、**Node.js → Java → 両方の長所を理解した**  
**フルスタック開発者**になることができます！🚀