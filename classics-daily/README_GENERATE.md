# 古典日課 自動生成ツール

## 概要
Claude APIを使って、day40〜day100を自動生成するスクリプト。
中断しても、再実行すれば続きから再開します。

## 必要なもの
1. Python 3.8以上
2. Anthropic API Key（https://console.anthropic.com/）
3. anthropicパッケージ

## セットアップ

### 1. API Keyを取得
Anthropic Consoleでキーを作成

### 2. 環境変数を設定
```cmd
set ANTHROPIC_API_KEY=sk-ant-api03-xxxxx
```

または `run_generate.bat` 内で直接設定

### 3. パッケージインストール
```cmd
pip install anthropic
```

## 実行方法

### 方法1: バッチファイル
```cmd
run_generate.bat
```

### 方法2: 直接実行
```cmd
python generate_days.py
```

## カスタマイズ

### 目標日数を変更
`generate_days.py` の `TARGET_DAY = 100` を変更

### モデルを変更
`generate_day()` 関数内の `model="claude-sonnet-4-20250514"` を変更
- より高品質: `claude-opus-4-20250514`（コスト高）
- より高速: `claude-haiku-4-20250514`（コスト低）

## トラブルシューティング

### エラー: API key not found
→ ANTHROPIC_API_KEY環境変数を設定

### エラー: Rate limit
→ スクリプト内の `time.sleep(2)` を増やす

### 途中で止まった
→ 再実行すれば続きから再開

## ファイル構成
```
classics-daily/
├── day01.md 〜 dayXX.md  # 生成済みコンテンツ
├── HANDOVER.md           # 進捗管理
├── generate_days.py      # 生成スクリプト
├── run_generate.bat      # 実行用バッチ
└── README_GENERATE.md    # このファイル
```
