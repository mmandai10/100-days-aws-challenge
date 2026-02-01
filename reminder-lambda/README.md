# Claude プランリマインダー

2/9朝にメールでリマインダーを送信するLambda関数。

## セットアップ手順（5分）

### 1. SESでメールアドレス認証（初回のみ）

```
AWS Console → SES → 左メニュー「Identities」→ 「Create identity」
→ Email address → 自分のメールアドレス入力 → Create
→ 届いた認証メールのリンクをクリック
```

### 2. Lambda関数作成

```
AWS Console → Lambda → 「関数の作成」
- 関数名: claude-reminder
- ランタイム: Python 3.12
- 「関数の作成」クリック
```

### 3. コードをコピペ

`lambda_function.py`の内容をLambdaエディタにコピペ。
**YOUR_EMAIL@example.comを自分のメールに変更**。

「Deploy」クリック。

### 4. IAMロールにSES権限追加

```
Lambda関数ページ → 「設定」タブ → 「アクセス権限」
→ ロール名クリック → IAMコンソールが開く
→ 「許可を追加」→「ポリシーをアタッチ」
→ 「AmazonSESFullAccess」を検索してチェック
→ 「許可を追加」
```

### 5. EventBridgeでスケジュール設定

```
AWS Console → EventBridge → 「ルール」→「ルールを作成」
- 名前: claude-reminder-schedule
- 「スケジュール」を選択
- cron式: cron(0 0 9 2 ? 2026)
  → 2026年2月9日 09:00 JST（UTC 00:00）
- ターゲット: Lambda関数「claude-reminder」
- 「作成」
```

### 6. テスト

Lambda関数ページ →「テスト」→ 空のイベント `{}` で実行。
メールが届けばOK。

## 完了！

2月9日の朝9時にリマインダーメールが届く。
