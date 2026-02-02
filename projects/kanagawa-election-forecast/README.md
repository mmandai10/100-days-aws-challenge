# 神奈川県 衆議院選挙 AI予測

2026年衆院選（2月8日投開票）の神奈川県版AI選挙予測サイト。

## 概要

- **小選挙区**: 神奈川1区〜20区（20選挙区）
- **比例代表**: 南関東ブロック（23議席）

## インスピレーション

[ホリエモンAI学校 選挙予測](https://vote.horiemon.ai/) を参考に、神奈川県に特化したバージョンを作成。

## 技術スタック

- React (単一ファイルアーティファクト)
- Tailwind CSS
- Recharts（グラフ）
- Claude API + Web Search（AI更新機能）

## データソース

- 神奈川新聞 候補者一覧
- NHK 衆院選2026
- 各種報道機関の情勢分析

## ファイル構成

```
kanagawa-election-forecast/
├── README.md
├── KanagawaElectionForecast.jsx      # メインコンポーネント（静的版）
├── KanagawaElectionForecastAI.jsx    # AI更新機能付き版
└── data/
    ├── districts.json                 # 選挙区データ
    └── proportional.json              # 比例代表データ
```

## AI更新機能

`KanagawaElectionForecastAI.jsx` には手動トリガーのAI分析機能が含まれています。

### 使い方

1. 「AI分析を更新」ボタンをクリック
2. Web検索で最新の選挙情勢を取得
3. Claude APIが分析し、予測を更新
4. 更新された情報がUIに反映

### 技術詳細

- Claude.aiアーティファクト内でAnthropicのAPIを直接呼び出し
- `web_search_20250305` ツールで最新ニュースを取得
- JSON形式で構造化された分析結果を生成
- 選挙区ごとの予測・情勢・分析コメントを動的に更新

### 注意事項

- API呼び出しは手動トリガーのみ（ボタン押下時）
- 自動更新はなし（課金対策）

## 注意事項

これはAIによる予測であり、実際の選挙結果を保証するものではありません。
