# 世界の株価 - AWS版 📈

yfinance + AWS Lambda + API Gateway で構築する株価ダッシュボード

## 📁 プロジェクト構造

```
stock-dashboard-aws/
├── lambda/
│   ├── lambda_function.py    # Lambda関数（yfinanceで株価取得）
│   └── requirements.txt      # Python依存関係
├── frontend/
│   └── index.html            # React フロントエンド
├── template.yaml             # SAM/CloudFormation テンプレート
└── README.md
```

## 🚀 デプロイ手順

### 前提条件
- AWS CLI インストール済み & 設定済み
- AWS SAM CLI インストール済み
- Python 3.11

### Step 1: Lambdaレイヤー用のパッケージ作成

```bash
cd lambda

# 依存関係をインストール（Lambda用にパッケージ化）
pip install -r requirements.txt -t package/
cd package
zip -r ../deployment-package.zip .
cd ..
zip deployment-package.zip lambda_function.py
```

### Step 2: SAMでデプロイ

```bash
cd ..  # プロジェクトルートに戻る

# ビルド
sam build

# デプロイ（初回は --guided で対話形式）
sam deploy --guided
```

**対話式の回答例:**
```
Stack Name: world-stock-dashboard
AWS Region: ap-northeast-1
Confirm changes before deploy: N
Allow SAM CLI IAM role creation: Y
Disable rollback: N
Save arguments to configuration file: Y
```

### Step 3: 出力されたURLを確認

デプロイ完了後、以下が出力されます：
- **ApiUrl**: `https://xxxxx.execute-api.ap-northeast-1.amazonaws.com/prod/stocks`
- **WebsiteUrl**: `http://world-stock-dashboard-xxxx.s3-website-ap-northeast-1.amazonaws.com`
- **BucketName**: `world-stock-dashboard-xxxx`

### Step 4: フロントエンドをS3にアップロード

```bash
# フロントエンドのindex.htmlを編集してAPI URLを設定
# または、デプロイ後にブラウザ上で入力

# S3にアップロード
aws s3 sync frontend/ s3://YOUR-BUCKET-NAME/ --delete
```

### Step 5: 動作確認

1. ブラウザで **WebsiteUrl** を開く
2. API URL欄に **ApiUrl** を貼り付け
3. 「更新」ボタンをクリック
4. 株価データが表示される！

---

## 📊 取得する銘柄

| カテゴリ | 銘柄 |
|---------|------|
| 🇯🇵 日本 | 日経平均, TOPIX, ファストリ, 東京エレク, ソニー, トヨタ, SBG |
| 🇺🇸 米国 | NYダウ, S&P500, NASDAQ, Russell2000, VIX, Apple, Microsoft, Google, Amazon, NVIDIA, Tesla, Meta |
| 🇪🇺 欧州 | FTSE100, DAX, CAC40, STOXX50 |
| 🌏 アジア | ハンセン, 上海総合, 台湾加権, KOSPI, シンガポール |
| 💱 為替 | USD/JPY, EUR/JPY, GBP/JPY, AUD/JPY, EUR/USD, GBP/USD, USD/CNH |
| 🛢️ 商品 | 金, 銀, プラチナ, WTI原油, Brent原油, 天然ガス, 銅 |
| ₿ 仮想通貨 | Bitcoin, Ethereum, Ripple, Solana, BNB, Cardano, Dogecoin |
| 📊 債券 | 米10年債, 米30年債, 米5年債, 米13週債 |

---

## 💰 コスト見積もり

| サービス | 無料枠 | 超過時 |
|---------|--------|--------|
| Lambda | 月100万リクエスト | $0.20/100万リクエスト |
| API Gateway | 月100万リクエスト | $3.50/100万リクエスト |
| S3 | 5GB + 20,000 GET | ほぼ無料 |

**個人利用なら実質無料！**

---

## 🔧 カスタマイズ

### 銘柄を追加/変更

`lambda/lambda_function.py` の `SYMBOLS` を編集：

```python
SYMBOLS = {
    "日本": {
        "^N225": "日経平均",
        "NEW_SYMBOL": "新しい銘柄",  # ← 追加
    },
    ...
}
```

### 更新後の再デプロイ

```bash
sam build && sam deploy
```

---

## 🐛 トラブルシューティング

### CORSエラーが出る
→ API Gatewayの設定を確認、または直接Lambda URLを使用

### タイムアウトする
→ Lambda のタイムアウトを60秒以上に設定

### yfinanceのエラー
→ 一部銘柄は取得不可の場合あり（ティッカーシンボル確認）

---

## 📝 次のステップ

1. **CloudFront追加** - HTTPS対応 & 高速化
2. **DynamoDBでキャッシュ** - API呼び出し削減
3. **EventBridgeで定期実行** - 自動更新
4. **SNS通知** - 価格アラート

---

## ライセンス

MIT License
