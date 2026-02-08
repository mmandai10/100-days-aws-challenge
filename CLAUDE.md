# Wizardry Schema プロジェクト

## 概要
Wizardry風の放置型ダンジョンRPG。Finding Hermit Nilda（谷内義人氏の後継作）を参考にUI改善中。

## ファイル構成
```
C:\100-days-aws-challenge\
├── projects/game/wizardry-schema.html  # メインゲーム（React 18, Tailwind CSS, Tone.js）
├── docs/
│   ├── learning-roadmap.md             # 全体ロードマップ
│   ├── daily-log.md                    # 進捗サマリー
│   └── daily-log/2026-02.md            # 2月の作業ログ
└── CLAUDE.md                           # このファイル
```

## 現在のバージョン
**v14.0** - 施設ベースUI実装済み

### 実装済み施設
| 施設 | ID | 機能 |
|------|-----|------|
| 冒険者ギルド | guild | 冒険者登録・編成 |
| ギルガメッシュの酒場 | tavern | パーティ編成・転職 |
| ボルタック商店 | shop | 武器・防具購入 |
| カント寺院 | temple | HP/MP回復 |
| 倉庫 | storage | 所持品管理 |
| 図書館 | bestiary | モンスター図鑑 |
| 迷宮入口 | gate | ダンジョン出発 |

## 開発ルール

### 進め方
1. `docs/learning-roadmap.md` で全体像を確認
2. `docs/daily-log.md` で進捗サマリーを確認
3. `docs/daily-log/2026-02.md` で前回の続きを確認
4. **細かく分割して実装**（途中で止まらないように）
5. 理解しながら進める（コピペ職人にしない）

### コミット
- 変更後は必ず git commit & push
- コミットメッセージ例: `v14.0: 施設ベースUI実装`

### ログ更新
- 作業後は `docs/daily-log/2026-02.md` を更新

## 次の改善候補（Nilda風）
1. **ストーリー拡充** - 各ダンジョン固有イベント・文書
2. **探索ログ文章強化** - 雰囲気のあるテキスト追加
3. **NPC会話充実** - セラフィナ、ボルタックなど

## 参考資料
- Finding Hermit Nilda 4Gamer記事: https://www.4gamer.net/games/662/G066274/20221011099/
- Wizardry Schema Wiki: https://wiz.gamerch.com/

## メモリ（userMemories）
Claude の memory に保存済みの情報があるので、過去の経緯はそちらも参照。
