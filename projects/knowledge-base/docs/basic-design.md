# AI ナレッジベースシステム 基本設計書

## 1. 文書情報

| 項目 | 内容 |
|------|------|
| 文書名 | AI ナレッジベースシステム 基本設計書 |
| バージョン | 1.0 |
| 作成日 | 2026-02-01 |
| 最終更新日 | 2026-02-01 |

---

## 2. システム概要

### 2.1 目的

社内ドキュメント（設計書、手順書、FAQ、ナレッジ等）を AI が検索・参照し、自然言語での質問に対して回答を生成するシステムを構築する。

### 2.2 背景・課題

| 現状の課題 | 影響 |
|------------|------|
| ドキュメントが分散している（SharePoint、Confluence、ファイルサーバー等） | 必要な情報を探すのに時間がかかる |
| 検索精度が低い（キーワード一致のみ） | 関連情報を見落とす |
| 有識者への問い合わせ集中 | 属人化、回答待ち時間の発生 |
| 新人・異動者の立ち上がりに時間がかかる | 生産性の低下 |

### 2.3 解決策

RAG（Retrieval-Augmented Generation）技術を用いて、社内ドキュメントを AI が参照し、質問に対して出典付きで回答を生成する。

### 2.4 期待効果

| 効果 | 想定削減時間 |
|------|-------------|
| ドキュメント検索時間の短縮 | 1人あたり 30分/日 |
| 問い合わせ対応工数の削減 | 有識者の対応時間 50%減 |
| 新人立ち上がり期間の短縮 | 2週間 → 1週間 |

---

## 3. システム構成

### 3.1 全体アーキテクチャ

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         システム全体構成                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ┌──────────────┐                                                     │
│   │  ユーザー    │                                                     │
│   │  (ブラウザ)  │                                                     │
│   └──────┬───────┘                                                     │
│          │                                                              │
│          ▼                                                              │
│   ┌──────────────┐      ┌──────────────┐      ┌──────────────┐        │
│   │  CloudFront  │ ──→  │  S3          │      │  Cognito     │        │
│   │  (CDN)       │      │  (静的サイト) │      │  (認証)      │        │
│   └──────────────┘      └──────────────┘      └──────────────┘        │
│          │                                                              │
│          ▼                                                              │
│   ┌──────────────┐      ┌──────────────────────────────────────────┐  │
│   │  API Gateway │ ──→  │  Lambda (API)                             │  │
│   │  (REST API)  │      │  - 質問受付                               │  │
│   └──────────────┘      │  - Knowledge Bases 呼び出し               │  │
│                         │  - 回答整形・返却                          │  │
│                         └──────────────┬───────────────────────────┘  │
│                                        │                               │
│                                        ▼                               │
│   ┌────────────────────────────────────────────────────────────────┐  │
│   │  Amazon Bedrock Knowledge Bases                                 │  │
│   │                                                                 │  │
│   │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐        │  │
│   │  │ Embedding   │    │ Vector      │    │ LLM         │        │  │
│   │  │ (Titan v2)  │    │ Search      │    │ (Claude)    │        │  │
│   │  │             │    │ (OpenSearch)│    │             │        │  │
│   │  └─────────────┘    └─────────────┘    └─────────────┘        │  │
│   │                                                                 │  │
│   └────────────────────────────────────┬───────────────────────────┘  │
│                                        │                               │
│                                        ▼                               │
│   ┌──────────────────────────────────────────────────────────────────┐│
│   │  S3 (ドキュメント保存)                                            ││
│   │  - PDF, Word, Markdown, Text                                     ││
│   │  - 社内ドキュメント、FAQ、手順書                                  ││
│   └──────────────────────────────────────────────────────────────────┘│
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.2 使用 AWS サービス一覧

| サービス | 用途 | 備考 |
|----------|------|------|
| Amazon Bedrock Knowledge Bases | RAG オーケストレーション | マネージドサービス |
| Amazon Bedrock (Claude) | 回答生成 LLM | Claude 3.5 Sonnet 推奨 |
| Amazon Titan Embeddings v2 | テキストベクトル化 | 1024 次元 |
| Amazon OpenSearch Serverless | ベクトル検索 | VECTORSEARCH タイプ |
| Amazon S3 | ドキュメント保存 | バージョニング有効 |
| AWS Lambda | API バックエンド | Node.js 20.x |
| Amazon API Gateway | REST API | IAM 認証 |
| Amazon Cognito | ユーザー認証 | SAML 連携可能 |
| Amazon CloudFront | CDN | HTTPS 必須 |
| AWS CloudWatch | 監視・ログ | メトリクス、アラーム |
| AWS Secrets Manager | API キー管理 | 自動ローテーション |
| Terraform | IaC | インフラ管理 |

---

## 4. 機能設計

### 4.1 機能一覧

| 機能ID | 機能名 | 概要 | 優先度 |
|--------|--------|------|--------|
| F-001 | ドキュメント検索・回答生成 | 自然言語での質問に対し、ドキュメントを参照して回答 | 必須 |
| F-002 | 出典表示 | 回答の根拠となったドキュメント名・箇所を表示 | 必須 |
| F-003 | ドキュメント登録 | S3 へのドキュメントアップロード | 必須 |
| F-004 | 同期実行 | Knowledge Bases のインデックス更新 | 必須 |
| F-005 | ユーザー認証 | Cognito による認証（社内 IdP 連携） | 必須 |
| F-006 | 履歴管理 | 質問・回答履歴の保存・参照 | 任意 |
| F-007 | フィードバック | 回答の評価（良い/悪い）収集 | 任意 |
| F-008 | 管理画面 | ドキュメント管理、利用状況確認 | 任意 |

### 4.2 処理フロー

```
┌─────────────────────────────────────────────────────────────────────────┐
│  質問〜回答の処理フロー                                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  1. ユーザーが質問を入力                                                │
│     │                                                                   │
│     ▼                                                                   │
│  2. API Gateway → Lambda で受信                                         │
│     │                                                                   │
│     ▼                                                                   │
│  3. Bedrock Knowledge Bases API 呼び出し                                │
│     │                                                                   │
│     ├──→ 3a. 質問文を Embedding（ベクトル化）                          │
│     │                                                                   │
│     ├──→ 3b. OpenSearch でベクトル類似検索                              │
│     │         └─ 関連度の高いチャンク（文章断片）を取得                 │
│     │                                                                   │
│     ├──→ 3c. 取得したチャンク + 質問文を LLM に送信                     │
│     │                                                                   │
│     └──→ 3d. LLM が回答を生成                                           │
│     │                                                                   │
│     ▼                                                                   │
│  4. Lambda で回答 + 出典情報を整形                                       │
│     │                                                                   │
│     ▼                                                                   │
│  5. ユーザーに回答を表示（出典リンク付き）                              │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 5. データ設計

### 5.1 ドキュメント保存（S3）

| 項目 | 設計内容 |
|------|----------|
| バケット名 | {プロジェクト名}-{環境}-documents |
| フォルダ構成 | /{カテゴリ}/{ドキュメント名} |
| 対応ファイル形式 | PDF, DOCX, MD, TXT, HTML |
| 最大ファイルサイズ | 50MB |
| 暗号化 | SSE-S3（サーバーサイド暗号化） |
| バージョニング | 有効 |
| アクセス制御 | パブリックアクセス禁止 |

### 5.2 ベクトルインデックス（OpenSearch）

| 項目 | 設計内容 |
|------|----------|
| インデックス名 | bedrock-knowledge-base-index |
| ベクトル次元数 | 1024（Titan Embeddings v2） |
| 検索アルゴリズム | HNSW（Hierarchical Navigable Small World） |
| 距離計算 | L2（ユークリッド距離） |

### 5.3 チャンク設定

| 項目 | 設計内容 | 理由 |
|------|----------|------|
| チャンク戦略 | 固定サイズ | 安定した検索精度 |
| チャンクサイズ | 512 トークン | 精度とコンテキストのバランス |
| オーバーラップ | 20% | 文脈の連続性を維持 |

---

## 6. 非機能要件

### 6.1 性能要件

| 項目 | 要件 | 備考 |
|------|------|------|
| 応答時間 | 10 秒以内 | 95 パーセンタイル |
| 同時接続数 | 100 ユーザー | ピーク時想定 |
| スループット | 10 リクエスト/秒 | API Gateway 制限 |
| ドキュメント数 | 1,000 件 | 初期想定 |

### 6.2 可用性要件

| 項目 | 要件 |
|------|------|
| 稼働率 | 99.5%（月間ダウンタイム 3.6 時間以内） |
| 計画停止 | 月 1 回、業務時間外に実施 |
| DR 対策 | S3 クロスリージョンレプリケーション（検討中） |

### 6.3 セキュリティ要件

| 項目 | 要件 |
|------|------|
| 認証 | Cognito + 社内 IdP（SAML 連携） |
| 通信暗号化 | HTTPS（TLS 1.2 以上） |
| データ暗号化 | S3 SSE、OpenSearch 暗号化 |
| アクセス制御 | IAM ロールベース |
| 監査ログ | CloudTrail 有効 |
| 機密情報 | Secrets Manager で管理 |

### 6.4 運用要件

| 項目 | 要件 |
|------|------|
| 監視 | CloudWatch メトリクス、ダッシュボード |
| アラート | エラー率 5% 超過時に通知 |
| ログ保持 | 90 日間 |
| バックアップ | S3 バージョニング（30 日保持） |

---

## 7. API 設計

### 7.1 エンドポイント一覧

| メソッド | パス | 機能 | 認証 |
|----------|------|------|------|
| POST | /query | 質問を送信し回答を取得 | 必須 |
| GET | /documents | ドキュメント一覧取得 | 必須 |
| POST | /documents | ドキュメントアップロード | 必須 |
| POST | /sync | インデックス同期実行 | 管理者のみ |
| GET | /health | ヘルスチェック | 不要 |

### 7.2 質問 API 詳細

**リクエスト**

```json
POST /query
Content-Type: application/json
Authorization: Bearer {token}

{
  "question": "Lambda でタイムアウトエラーが出たらどうすればいい？",
  "maxResults": 5
}
```

**レスポンス**

```json
{
  "answer": "Lambda タイムアウトエラーの対処法は以下の通りです...",
  "sources": [
    {
      "documentName": "lambda-troubleshooting.md",
      "excerpt": "タイムアウト設定を増やすことで...",
      "relevanceScore": 0.95
    }
  ],
  "sessionId": "abc123",
  "timestamp": "2026-02-01T12:00:00Z"
}
```

---

## 8. コスト試算

### 8.1 月額コスト（概算）

| サービス | 単価 | 想定使用量 | 月額コスト |
|----------|------|-----------|-----------|
| OpenSearch Serverless | $0.24/OCU/時 | 2 OCU × 720 時間 | $346 |
| Bedrock (Claude 3.5 Sonnet) | $3/100万入力トークン | 500万トークン | $15 |
| Bedrock (Titan Embeddings) | $0.02/100万トークン | 100万トークン | $0.02 |
| Lambda | $0.0000166/GB秒 | 100万リクエスト | $5 |
| API Gateway | $3.50/100万リクエスト | 10万リクエスト | $0.35 |
| S3 | $0.023/GB | 10 GB | $0.23 |
| **合計** | | | **約 $370/月** |

### 8.2 コスト最適化オプション

| オプション | 削減効果 | トレードオフ |
|------------|----------|--------------|
| OpenSearch → Aurora PostgreSQL + pgvector | -$300/月 | 検索精度がやや低下する可能性 |
| Claude → Nova Pro | -$10/月 | 回答品質がやや低下 |
| 利用時間帯制限（夜間停止） | -30% | 夜間利用不可 |

---

## 9. 導入スケジュール

| フェーズ | 期間 | 内容 |
|----------|------|------|
| 1. PoC | 2 週間 | 技術検証、プロトタイプ作成 |
| 2. 開発 | 4 週間 | 本番環境構築、API 開発、UI 開発 |
| 3. テスト | 2 週間 | 機能テスト、性能テスト、セキュリティテスト |
| 4. パイロット | 2 週間 | 限定ユーザーでの試行運用 |
| 5. 本番稼働 | - | 全社展開 |

---

## 10. リスクと対策

| リスク | 影響度 | 対策 |
|--------|--------|------|
| 回答精度が低い | 高 | チャンクサイズ調整、プロンプトチューニング |
| コストが想定超過 | 中 | 利用量モニタリング、上限設定 |
| 機密情報の漏洩 | 高 | アクセス制御、監査ログ、ドキュメント分類 |
| サービス障害 | 中 | マルチ AZ、エラーハンドリング |
| LLM の幻覚（ハルシネーション） | 高 | 出典表示必須、検索結果がない場合は回答しない |

---

## 11. 今後の拡張

| 拡張機能 | 概要 | 優先度 |
|----------|------|--------|
| マルチモーダル対応 | 画像・図表を含むドキュメントの検索 | 中 |
| Teams 連携 | チャットツールから直接質問 | 高 |
| 自動ドキュメント更新 | SharePoint からの自動同期 | 高 |
| 多言語対応 | 英語ドキュメントの日本語検索 | 中 |
| Fine-tuning | 社内用語・文体の学習 | 低 |

---

## 12. Microsoft Teams 連携設計

### 12.1 概要

Microsoft Teams から直接 AI ナレッジベースに質問できる Bot を構築する。ユーザーは既存の Teams 環境から離れることなく、自然にナレッジ検索を利用できる。

### 12.2 アーキテクチャ

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Teams 連携アーキテクチャ                                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ┌──────────────┐                                                     │
│   │  Teams       │                                                     │
│   │  ユーザー     │  @KnowledgeBot Lambda のタイムアウト対策は？       │
│   └──────┬───────┘                                                     │
│          │                                                              │
│          ▼                                                              │
│   ┌────────────────────────────────────────────────────────────┐  │
│   │  Azure Bot Service                                              │  │
│   │  - Teams チャネルとの接続                                      │  │
│   │  - メッセージの受信・送信                                      │  │
│   └──────────────┬─────────────────────────────────────────────┘  │
│                  │                                                      │
│                  ▼                                                      │
│   ┌────────────────────────────────────────────────────────────┐  │
│   │  選択肢 A: Azure Functions                                        │  │
│   │  - Bot Framework SDK                                            │  │
│   │  - Azure 完結型（社内 Azure 環境がある場合）                    │  │
│   └──────────────┬─────────────────────────────────────────────┘  │
│                  │                                                      │
│                  ▼                                                      │
│   ┌────────────────────────────────────────────────────────────┐  │
│   │  選択肢 B: AWS Lambda + API Gateway                               │  │
│   │  - Bot Service から Webhook で呼び出し                          │  │
│   │  - AWS 完結型（本システムと同一基盤）                          │  │
│   └──────────────┬─────────────────────────────────────────────┘  │
│                  │                                                      │
│                  ▼                                                      │
│   ┌────────────────────────────────────────────────────────────┐  │
│   │  Amazon Bedrock Knowledge Bases                                │  │
│   │  (RAG 検索・回答生成)                                         │  │
│   └────────────────────────────────────────────────────────────┘  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 12.3 実装方式の比較

| 項目 | Azure 完結型 | AWS + Azure Bot Service |
|------|------------|-------------------------|
| Bot 基盤 | Azure Bot Service | Azure Bot Service |
| バックエンド | Azure Functions | AWS Lambda |
| RAG | Azure AI Search + OpenAI | Bedrock Knowledge Bases |
| メリット | Azure 完結で管理が簡単 | 既存 AWS インフラを活用 |
| デメリット | AWS リソースと分離 | Azure + AWS のハイブリッド |

### 12.4 Teams Bot 設定手順

1. **Azure Bot Service 作成**
   - Azure Portal → Bot Service 作成
   - メッセージングエンドポイント: Lambda の API Gateway URL

2. **Teams チャンネル接続**
   - Bot Service → チャネル → Microsoft Teams を有効化

3. **Teams 管理センターでアプリ登録**
   - カスタムアプリとして登録
   - 組織全体または特定チームに展開

4. **Lambda 側の実装**
   - Bot Framework のメッセージ形式をパース
   - Knowledge Bases API を呼び出し
   - 結果を Teams 形式で返却

### 12.5 Teams Bot の利用イメージ

```
┌───────────────────────────────────────────────────┐
│  Teams チャット画面                               │
├───────────────────────────────────────────────────┤
│                                                   │
│  ユーザー:                                          │
│  @KnowledgeBot Lambda でタイムアウトが出たら       │
│  どうすればいい？                                    │
│                                                   │
│  ─────────────────────────────────────────── │
│                                                   │
│  KnowledgeBot:                                    │
│  Lambda タイムアウトエラーの対処法は以下の通りです： │
│                                                   │
│  1. タイムアウト設定を増やす                        │
│     timeout = 30  # 秒                           │
│                                                   │
│  2. コードの最適化                                  │
│     外部API呼び出しが遅い場合は非同期化を検討   │
│                                                   │
│  📚 出典: lambda-troubleshooting.md               │
│                                                   │
└───────────────────────────────────────────────────┘
```

### 12.6 コスト追加（Teams 連携）

| サービス | 月額コスト |
|----------|------------|
| Azure Bot Service | 無料（Standard チャンネル） |
| API Gateway 追加リクエスト | 約 $5/月 |
| Lambda 追加実行 | 約 $2/月 |
| **合計** | **約 $7/月** |

---

## 13. CI/CD パイプライン設計

### 13.1 概要

コード変更から本番デプロイまでを自動化し、品質とスピードを両立する。

### 13.2 パイプラインアーキテクチャ

```
┌─────────────────────────────────────────────────────────────────────────┐
│  CI/CD パイプライン                                                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐  │
│   │  開発者   │──→│  GitHub  │──→│  GitHub  │──→│   AWS    │  │
│   │  (Push)  │     │          │     │  Actions │     │          │  │
│   └──────────┘     └──────────┘     └──────────┘     └──────────┘  │
│                                         │                               │
│                           ┌─────────────┴─────────────┐               │
│                           │                          │               │
│                           ▼                          ▼               │
│                    ┌─────────────┐        ┌─────────────┐        │
│                    │    CI       │        │    CD       │        │
│                    │             │        │             │        │
│                    │ - Lint      │        │ - Terraform │        │
│                    │ - Test      │        │ - Lambda    │        │
│                    │ - Build     │        │ - S3 Sync   │        │
│                    │ - Scan      │        │ - Invalidate│        │
│                    └─────────────┘        └─────────────┘        │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 13.3 ブランチ戦略

| ブランチ | 用途 | トリガー |
|----------|------|----------|
| main | 本番環境 | main へのマージで本番デプロイ |
| develop | 検証環境 | develop への Push で検証デプロイ |
| feature/* | 機能開発 | PR 作成で CI 実行 |

### 13.4 CI フロー詳細

```yaml
# .github/workflows/ci.yml
name: CI

on:
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm test

  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
```

### 13.5 CD フロー詳細

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

env:
  AWS_REGION: us-east-1

jobs:
  deploy-infrastructure:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}
      
      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v3
      
      - name: Terraform Apply
        run: |
          cd terraform
          terraform init
          terraform apply -auto-approve

  deploy-lambda:
    needs: deploy-infrastructure
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Build Lambda
        run: |
          cd lambda
          npm ci
          npm run build
          zip -r function.zip .
      
      - name: Deploy Lambda
        run: |
          aws lambda update-function-code \
            --function-name knowledge-base-api \
            --zip-file fileb://lambda/function.zip

  deploy-frontend:
    needs: deploy-lambda
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Build Frontend
        run: |
          cd frontend
          npm ci
          npm run build
      
      - name: Deploy to S3
        run: |
          aws s3 sync frontend/dist s3://${{ secrets.S3_BUCKET }} --delete
      
      - name: Invalidate CloudFront
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_ID }} \
            --paths "/*"
```

### 13.6 必要な GitHub Secrets

| Secret 名 | 内容 |
|-----------|------|
| AWS_ACCESS_KEY_ID | AWS アクセスキー |
| AWS_SECRET_ACCESS_KEY | AWS シークレットキー |
| S3_BUCKET | フロントエンド用 S3 バケット名 |
| CLOUDFRONT_ID | CloudFront ディストリビューション ID |

### 13.7 デプロイフロー図

```
┌─────────────────────────────────────────────────────────────────────────┐
│  デプロイフロー                                                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  feature ブランチ                                                         │
│      │                                                                  │
│      ▼                                                                  │
│  PR 作成 ───→ CI 実行（Lint, Test, Scan）                               │
│      │              │                                                   │
│      │         失敗 ◀┘                                                   │
│      │              │                                                   │
│      ▼              ▼ 成功                                              │
│  レビュー ────→ マージ                                                  │
│                    │                                                    │
│                    ▼                                                    │
│              develop ブランチ                                             │
│                    │                                                    │
│                    ▼                                                    │
│              検証環境デプロイ（自動）                                       │
│                    │                                                    │
│                    ▼                                                    │
│              検証テスト（手動）                                            │
│                    │                                                    │
│                    ▼                                                    │
│              main へマージ                                               │
│                    │                                                    │
│                    ▼                                                    │
│              本番環境デプロイ（自動）                                       │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 13.8 ロールバック戦略

| 状況 | 対応 |
|------|------|
| Lambda デプロイ失敗 | 前バージョンに自動ロールバック |
| フロントエンド不具合 | S3 バージョニングで復元 |
| インフラ変更失敗 | Terraform state から復元 |

---

## 付録

### A. 用語集

| 用語 | 説明 |
|------|------|
| RAG | Retrieval-Augmented Generation。検索で取得した情報を基に回答を生成する手法 |
| Embedding | テキストを数値ベクトルに変換すること |
| チャンク | ドキュメントを検索しやすいサイズに分割した単位 |
| ハルシネーション | LLM が事実に基づかない情報を生成すること |
| Knowledge Bases | AWS Bedrock の RAG マネージドサービス |

### B. 参考資料

- AWS Bedrock Knowledge Bases 公式ドキュメント
- OpenSearch Serverless ベストプラクティス
- RAG システム設計パターン

---

以上
