#!/usr/bin/env python3
"""
古典日課自動生成スクリプト
- HANDOVERを読んで進捗を把握
- Claude APIで次の日を生成
- 中断しても再開可能
"""

import anthropic
import os
import re
import time
from pathlib import Path

# 設定
OUTPUT_DIR = Path(r"C:/100-days-aws-challenge/classics-daily")
TARGET_DAY = 100  # 目標日数
HANDOVER_FILE = OUTPUT_DIR / "HANDOVER.md"

# APIクライアント
client = anthropic.Anthropic()  # ANTHROPIC_API_KEY環境変数から読み取り

def get_current_day():
    """現在の最新day番号を取得"""
    files = list(OUTPUT_DIR.glob("day*.md"))
    if not files:
        return 0
    days = []
    for f in files:
        match = re.match(r"day(\d+)\.md", f.name)
        if match:
            days.append(int(match.group(1)))
    return max(days) if days else 0

def read_handover():
    """HANDOVERファイルを読み込む"""
    if HANDOVER_FILE.exists():
        return HANDOVER_FILE.read_text(encoding="utf-8")
    return ""

def read_recent_days(current_day, count=2):
    """直近のday内容を読み込む（文脈として使用）"""
    content = ""
    for i in range(max(1, current_day - count + 1), current_day + 1):
        day_file = OUTPUT_DIR / f"day{i:02d}.md"
        if day_file.exists():
            content += f"\n\n=== day{i:02d}.md ===\n"
            content += day_file.read_text(encoding="utf-8")
    return content

def generate_day(day_num, handover, recent_content):
    """指定した日のコンテンツを生成"""
    
    prompt = f"""あなたは「古典日課」プロジェクトのコンテンツ作成者です。

## プロジェクト概要
毎日、史記と菜根譚を組み合わせた学習コンテンツを作成します。

## 現在の進捗（HANDOVER.md）
{handover}

## 直近の内容（参考）
{recent_content}

## タスク
day{day_num:02d}.mdを作成してください。

## 必須要素
1. 史記の原文・書き下し文・現代語訳・解説
2. 菜根譚5条（原文・書き下し文・現代語訳・解説）
3. 史記と菜根譚の関連付け
4. 今日の一言
5. 明日の予告

## スタイル
- 絵文字・アイコン不要
- 装飾的なカラー不要
- シンプルで内容重視
- 原文は史記から正確に引用
- 菜根譚は洪応明『菜根譚』から

## 重要
- HANDOVERの「次回予定」に従って作成
- 前日からの連続性を保つ
- 新しい列伝に入る場合は導入を丁寧に

day{day_num:02d}.mdの内容のみを出力してください（マークダウン形式）。"""

    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=8000,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    
    return message.content[0].text

def update_handover(day_num):
    """HANDOVERを更新（簡易版 - 完了日を更新）"""
    content = read_handover()
    # 完了日数を更新
    content = re.sub(
        r"\*\*完了\*\*: day\d+〜day\d+",
        f"**完了**: day01〜day{day_num:02d}",
        content
    )
    # 次回開始を更新
    content = re.sub(
        r"\*\*次回開始\*\*: day\d+",
        f"**次回開始**: day{day_num + 1:02d}",
        content
    )
    HANDOVER_FILE.write_text(content, encoding="utf-8")

def main():
    print("=== 古典日課 自動生成スクリプト ===")
    print(f"出力先: {OUTPUT_DIR}")
    print(f"目標: day{TARGET_DAY:02d}")
    
    current_day = get_current_day()
    print(f"現在の進捗: day{current_day:02d}")
    
    if current_day >= TARGET_DAY:
        print("目標達成済みです！")
        return
    
    for day_num in range(current_day + 1, TARGET_DAY + 1):
        print(f"\n--- day{day_num:02d} 生成中 ---")
        
        try:
            handover = read_handover()
            recent = read_recent_days(day_num - 1)
            
            content = generate_day(day_num, handover, recent)
            
            # ファイル保存
            output_file = OUTPUT_DIR / f"day{day_num:02d}.md"
            output_file.write_text(content, encoding="utf-8")
            print(f"保存: {output_file}")
            
            # HANDOVER更新
            update_handover(day_num)
            
            # レート制限対策
            time.sleep(2)
            
        except Exception as e:
            print(f"エラー発生: {e}")
            print(f"day{day_num:02d}で中断。再実行すれば続きから再開します。")
            break
    
    print("\n=== 完了 ===")

if __name__ == "__main__":
    main()
