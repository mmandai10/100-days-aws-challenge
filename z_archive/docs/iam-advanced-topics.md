# IAM Advanced Topics - Day 20-30で学習予定

## 🔔 リマインダー設定
**Day 20になったらこのドキュメントを参照すること！**

### Day 20でやること
1. `docs/learning-notes/`フォルダを確認
2. このドキュメントを開く
3. IAM Advanced の学習開始

---

## 📊 IAM全体設計（Day 6の続き）
Day 6で基礎を学んだが、実務では以下の観点での設計が必要：

### 1. ユーザー管理戦略
- [ ] **Identity Center vs IAM Users** - いつどちらを選ぶか
- [ ] **フェデレーション** - 既存の社内認証システム（AD等）との連携
- [ ] **MFA必須化** - 多要素認証の強制設定
- [ ] **パスワードポリシー** - 複雑性、定期変更の要否

### 2. グループ設計パターン
- [ ] **部門別グループ** (Development, QA, Production)
- [ ] **権限レベル別グループ** (ReadOnly, PowerUser, Admin)
- [ ] **プロジェクト別グループ** (ProjectA-Dev, ProjectB-Prod)
- [ ] **クロスアカウント戦略** - 複数AWSアカウント間の権限管理

### 3. ロール設計
- [ ] **AssumeRole** - 一時的な権限昇格の仕組み
- [ ] **サービスロール** - EC2, Lambda等のサービス用ロール
- [ ] **クロスアカウントロール** - アカウント間のアクセス

### 4. ポリシー設計のベストプラクティス
- [ ] **動的変数の活用** - `${aws:username}`, `${aws:userid}`等
- [ ] **条件要素（Condition）** - IP制限、時間制限、MFA必須化
- [ ] **権限境界（Permission Boundary）** - 最大権限の制限
- [ ] **SCP（Service Control Policy）** - Organizations での制御

### 5. 実装パターン例

#### MFA必須 + IP制限の例
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": "*",
    "Resource": "*",
    "Condition": {
      "IpAddress": {
        "aws:SourceIp": ["203.0.113.0/24"]
      },
      "Bool": {
        "aws:MultiFactorAuthPresent": "true"
      }
    }
  }]
}
```

#### 自分の情報のみアクセス（動的）
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": [
      "iam:GetUser",
      "iam:ListAccessKeys",
      "iam:ChangePassword"
    ],
    "Resource": "arn:aws:iam::*:user/${aws:username}"
  }]
}
```

### 6. 監査とコンプライアンス
- [ ] **CloudTrail** - 全API呼び出しの記録
- [ ] **Access Analyzer** - 過剰な権限の検出
- [ ] **定期的な権限レビュー** - 不要な権限の削除
- [ ] **最小権限の原則の徹底** - 必要最小限の権限のみ付与

### 7. 緊急時対応
- [ ] **Break Glass Account** - 緊急時用の特権アカウント
- [ ] **権限のローテーション** - アクセスキーの定期更新
- [ ] **インシデント対応手順** - 権限漏洩時の対処

## 📚 推奨学習リソース
- [AWS Well-Architected Framework - Security Pillar](https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html)
- [IAM Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
- AWS re:Invent のIAMセッション動画

## 🎯 Day 20-30での実装予定
1. **Day 20-22**: Identity Center のセットアップ
2. **Day 23-25**: クロスアカウントロールの実装
3. **Day 26-28**: CloudTrailとAccess Analyzerの設定
4. **Day 29-30**: Terraformでのコード化（IaC）

## 📝 Day 6の振り返り（参考）
- 作成したユーザー: `day6-test-user`
- 作成したポリシー: `Day6-SelfUserAccess-Policy`
- 学んだこと: 固定リソース指定（今回の実装）
- 改善点: 動的変数 `${aws:username}` を使うべき

---
*作成日: 2025-09-20*
*更新予定: Day 20 (2025-10-04頃)*
*保存場所: `docs/learning-notes/iam-advanced-topics.md`*