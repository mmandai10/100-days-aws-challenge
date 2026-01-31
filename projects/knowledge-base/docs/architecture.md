# AI ナレッジベース - アーキテクチャ設計

## 概要

ドキュメントをアップロードすると、AI が内容を理解して質問に回答するシステム。

## ユースケース

- 技術ドキュメントを検索・質問
- 自分の学習ノートを AI に質問
- 社内ドキュメントの検索（将来）

## システム構成

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           ユーザー                                       │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ フロントエンド（React + Amplify Hosting）                                │
│                                                                         │
│  ・ドキュメントアップロード画面                                          │
│  ・チャット画面（質問 → 回答）                                          │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ API Gateway + Lambda                                                     │
│                                                                         │
│  POST /upload    → S3 にドキュメント保存 + 同期トリガー                 │
│  POST /ask       → Knowledge Bases に質問 → 回答返却                   │
│  GET  /documents → アップロード済みドキュメント一覧                      │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
┌───────────────────────────────┐   ┌───────────────────────────────────┐
│ S3 Bucket                      │   │ Bedrock Knowledge Bases           │
│                                │   │                                   │
│ ・ドキュメント保存             │◀─▶│ ・データソース: S3               │
│   (PDF, MD, TXT)               │   │ ・Embedding: Titan v2            │
│                                │   │ ・Vector Store: OpenSearch       │
└───────────────────────────────┘   │ ・LLM: Claude 3                   │
                                    └───────────────────────────────────┘
                                                    │
                                                    ▼
                                    ┌───────────────────────────────────┐
                                    │ OpenSearch Serverless              │
                                    │                                   │
                                    │ ・ベクトルインデックス             │
                                    │ ・類似検索                        │
                                    └───────────────────────────────────┘
```

## AWS サービス一覧

| サービス | 用途 | 備考 |
|----------|------|------|
| S3 | ドキュメント保存 | ソースバケット |
| Bedrock Knowledge Bases | RAG オーケストレーション | メイン機能 |
| Bedrock (Titan Embeddings) | テキスト → ベクトル変換 | |
| Bedrock (Claude 3) | 回答生成 | |
| OpenSearch Serverless | ベクトル検索 | Knowledge Bases が自動作成 |
| Lambda | API バックエンド | Node.js 20.x |
| API Gateway | REST API | |
| Amplify Hosting | フロントエンド | React |
| IAM | 権限管理 | |

## データフロー

### 1. ドキュメント登録フロー

```
ユーザー → React → API Gateway → Lambda (upload)
                                      │
                                      ▼
                                  S3 に保存
                                      │
                                      ▼
                          Knowledge Bases 同期 API 呼び出し
                                      │
                                      ▼
                          チャンク分割 → Embedding → OpenSearch 保存
```

### 2. 質問回答フロー

```
ユーザー → React → API Gateway → Lambda (ask)
                                      │
                                      ▼
                    Knowledge Bases RetrieveAndGenerate API
                                      │
                                      ▼
                    質問 Embedding → OpenSearch 検索 → 関連チャンク取得
                                      │
                                      ▼
                    Claude に「チャンクを参考に回答して」
                                      │
                                      ▼
                                   回答返却
```

## Terraform モジュール構成

```
terraform/
├── main.tf              # メイン設定
├── variables.tf         # 変数定義
├── outputs.tf           # 出力定義
└── modules/
    ├── s3/              # ドキュメント用 S3
    ├── knowledge-base/  # Bedrock Knowledge Bases
    ├── lambda/          # API Lambda
    └── api-gateway/     # REST API
```

## 対応ファイル形式

Knowledge Bases がサポートするフォーマット:
- PDF
- TXT
- MD (Markdown)
- HTML
- DOC/DOCX
- CSV

## セキュリティ

- S3: パブリックアクセス禁止
- API: 今回は認証なし（学習用）
- IAM: 最小権限の原則

## コスト見積もり（月額、軽量利用想定）

| サービス | 見積もり |
|----------|----------|
| S3 | $0.02 (1GB 未満) |
| Bedrock Titan Embeddings | $0.10 (少量) |
| Bedrock Claude | $0.50 (少量) |
| OpenSearch Serverless | $2-5 (最小構成) |
| Lambda | 無料枠内 |
| API Gateway | 無料枠内 |
| **合計** | **$3-6/月** |

※ OpenSearch Serverless は最低でも OCU（処理単位）料金がかかる
