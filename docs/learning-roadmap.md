# 100 Days AWS Challenge - 完全版学習ロードマップ

## 🎯 このファイルの使い方
1. 各Dayを始める時に「Day Xを始めたい」と伝える
2. このファイルで何を作るか確認
3. 完了したら ✅ をつける
4. 新しい学習項目が見つかったら「追加学習」に記録

## 📊 現在の進捗状況（2025年10月時点）
- ✅ Day 2: Weather App - 完了・デプロイ済み
- ✅ Day 3: ToDo App - 完了・デプロイ済み  
- ✅ Day 4: Weather Dashboard - 完了・デプロイ済み
- 🔄 Day 1,5,6,7: 開始済み（要完成）
- ⏳ Day 8以降: 未着手

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

### Day 11: AWS Amplify Auth 👈 **次はここ！**
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

### Day 15: Lambda Hello World
**作成物**: 初めてのLambda関数
- Lambda関数作成
- イベント/コンテキスト理解
- CloudWatchログ
- 環境変数

### Day 16: API Gateway + Lambda
**作成物**: REST API構築
- APIエンドポイント設計
- リクエスト/レスポンス変換
- CORS設定
- APIキー管理

### Day 17: DynamoDB CRUD
**作成物**: NoSQLデータベース操作
- テーブル設計
- パーティションキー/ソートキー
- クエリ/スキャン
- バッチ操作

### Day 18: Cognito Integration
**作成物**: セキュアAPI
- JWTトークン検証
- 認可設定
- ユーザープール連携
- カスタム属性

### Day 19: S3 Event Processing
**作成物**: ファイル処理パイプライン
- S3イベントトリガー
- 画像リサイズ
- メタデータ抽出
- 非同期処理

### Day 20-21: IAM/認証システム深掘り
**作成物**: エンタープライズ認証
- IAMロール詳細
- ポリシー設計
- クロスアカウントアクセス
- STS/AssumeRole
- 監査ログ

---

## 📅 Week 4: Java + Spring Boot (Day 22-28)

### Day 22: Java環境構築
**必須セットアップ**:
- Java 17+インストール
- Maven/Gradle設定
- Spring Initializr
- IDE設定（IntelliJ/Eclipse）
**作成物**: Hello World REST API

### Day 23: Spring Boot REST API
**作成物**: タスク管理API
```java
@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    // CRUD endpoints
}
```

### Day 24: JPA + MySQL/PostgreSQL
**作成物**: データベース連携API
- Entity設計
- Repository作成
- トランザクション管理
- マイグレーション（Flyway）

### Day 25: Spring Security + JWT
**作成物**: セキュアAPI
- JWT認証実装
- Role-based認可
- パスワード暗号化
- セッション管理

### Day 26: AWS SDK for Java
**作成物**: AWS統合アプリ
- S3操作
- DynamoDB操作
- SQS/SNS連携
- Parameter Store

### Day 27: Microservices
**作成物**: マイクロサービス構築
- Service間通信
- API Gateway pattern
- Circuit Breaker
- Service Discovery

### Day 28: Docker + ECS/Fargate
**作成物**: コンテナ化&デプロイ
- Dockerfile作成
- ECRプッシュ
- ECSタスク定義
- ALB設定

---

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

## 🎯 JavaScript開発者がJavaを学ぶメリット
1. **型安全性** - コンパイル時エラー検出
2. **エンタープライズ開発** - 大規模システム構築
3. **パフォーマンス** - 高速処理とメモリ効率
4. **Java生態系** - Spring、Maven、JUnit等

## 🔄 Java vs Node.js 比較ポイント
- **Node.js**: 高速開発、リアルタイム処理、イベント駆動
- **Java**: 堅牢性、スケーラビリティ、保守性、型安全性
- **比較項目**: 開発速度、パフォーマンス、コード可読性、AWS統合の違い

## 📚 推奨学習リソース

### Java/Spring Boot
- Oracle Java Documentation
- Spring Boot Reference Guide  
- Baeldung (Java/Spring tutorials)
- AWS SDK for Java Developer Guide
- AWS Elastic Beanstalk Java Guide
- Spring Cloud AWS

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

## 📅 Week 5: Advanced Topics (Day 29-35)

### Day 29: Performance比較
**実施内容**: Node.js vs Java
- ベンチマークテスト
- メモリ使用量
- レスポンスタイム
- スケーラビリティ

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
- データベース設計
- API開発

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
- [ ] その他：＿＿＿＿＿

---

**このロードマップで100日後には「フルスタック + クラウドエンジニア」になれる！** 🚀
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