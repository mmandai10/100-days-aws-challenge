#!/usr/bin/env python3
"""
FactSet Earnings Insight 自動サマリースクリプト
毎週金曜日にレポートが更新されるため、月曜日朝に取得してサマリーを作成
"""

import os
import re
import requests
from datetime import datetime, timedelta
from pathlib import Path
import anthropic
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# ====== 設定 ======
FACTSET_BASE_URL = "https://advantage.factset.com/hubfs/Website/Resources%20Section/Research%20Desk/Earnings%20Insight"
OUTPUT_DIR = Path("reports")

def get_latest_report_url():
    """最新のレポートURLを生成（金曜日発行想定）"""
    today = datetime.now()
    days_since_friday = (today.weekday() - 4) % 7
    if days_since_friday == 0 and today.hour < 12:
        days_since_friday = 7
    last_friday = today - timedelta(days=days_since_friday)
    
    date_formats = [
        last_friday.strftime("%m%d%y"),
        (last_friday - timedelta(days=1)).strftime("%m%d%y"),
        (last_friday + timedelta(days=1)).strftime("%m%d%y"),
    ]
    
    for date_str in date_formats:
        url = f"{FACTSET_BASE_URL}/EarningsInsight_{date_str}.pdf"
        try:
            response = requests.head(url, timeout=10)
            if response.status_code == 200:
                return url, date_str
        except:
            continue
    
    return None, None


def download_report(url: str, output_path: Path) -> bool:
    """PDFレポートをダウンロード"""
    try:
        response = requests.get(url, timeout=60)
        response.raise_for_status()
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_bytes(response.content)
        print(f"[OK] ダウンロード完了: {output_path}")
        return True
    except Exception as e:
        print(f"[ERROR] ダウンロード失敗: {e}")
        return False


def extract_text_from_pdf(pdf_path: Path) -> str:
    """PDFからテキストを抽出"""
    try:
        import pdfplumber
        text = ""
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages[:15]:
                text += page.extract_text() or ""
        return text
    except ImportError:
        try:
            from pypdf import PdfReader
            reader = PdfReader(pdf_path)
            text = ""
            for page in reader.pages[:15]:
                text += page.extract_text() or ""
            return text
        except Exception as e:
            print(f"[ERROR] PDF読み込み失敗: {e}")
            return ""


def generate_summary_with_claude(text: str) -> str:
    """Claude APIを使ってサマリーを生成"""
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        return "[ERROR] ANTHROPIC_API_KEY が設定されていません"
    
    client = anthropic.Anthropic(api_key=api_key)
    
    prompt = f"""以下はFactSetのS&P 500 Earnings Insightレポートの内容です。
投資判断に役立つ詳細な分析レポートを日本語で作成してください。

【必須項目】

1. 決算シーズン進捗
   - 発表済み企業数と割合
   - EPSビート率（5年平均との比較）
   - 売上ビート率
   - サプライズ幅（予想との乖離率）

2. 利益成長の詳細分析
   - Q4 2024 vs Q4 2025の成長率
   - 過去4四半期のトレンド
   - コンセンサス予想の推移（期初→現在）

3. Magnificent 7の影響度
   - M7の利益成長率
   - M7除外時のS&P 500成長率
   - 個別企業の貢献度ランキング（上位5社）

4. セクター別分析
   - 成長率上位3セクター（具体的な数値）
   - 成長率下位3セクター（具体的な数値）
   - 各セクターの主要ドライバー

5. バリュエーション
   - Forward 12ヶ月 P/E（現在値）
   - 5年平均・10年平均との比較
   - PEGレシオの示唆

6. 2026年見通し
   - 四半期別EPS成長予想（Q1-Q4）
   - 通年成長率予想
   - アナリスト予想の修正動向（上方/下方修正比率）

7. 今週の注目決算
   - 発表予定の主要企業リスト
   - 市場インパクトが大きい銘柄とその理由

8. 投資示唆
   - 現在の決算シーズンから読み取れるマクロトレンド
   - 注目すべきリスク要因
   - セクターローテーションの兆候

フォーマット：見出しと段落で構成。箇条書きは最小限に。数値は具体的に記載。

レポート内容：
{text[:50000]}
"""
    
    try:
        message = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=4000,
            messages=[{"role": "user", "content": prompt}]
        )
        return message.content[0].text
    except Exception as e:
        return f"[ERROR] Claude API エラー: {e}"


def send_email(summary: str, report_date: str):
    """メールでサマリーを送信"""
    smtp_server = os.environ.get("SMTP_SERVER", "smtp.gmail.com")
    smtp_port = int(os.environ.get("SMTP_PORT", "587"))
    smtp_user = os.environ.get("SMTP_USER")
    smtp_password = os.environ.get("SMTP_PASSWORD")
    to_email = os.environ.get("TO_EMAIL")
    
    if not all([smtp_user, smtp_password, to_email]):
        print("[WARN] メール設定が不完全です。コンソール出力のみ行います。")
        return False
    
    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"FactSet Earnings Insight ({report_date})"
    msg["From"] = smtp_user
    msg["To"] = to_email
    
    # シンプルなHTMLバージョン
    html_content = f"""
    <html>
    <head>
        <style>
            body {{ 
                font-family: 'Georgia', serif; 
                line-height: 1.8; 
                color: #333;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
            }}
            h1 {{ 
                font-size: 1.4em;
                border-bottom: 1px solid #333;
                padding-bottom: 10px;
            }}
            h2 {{ 
                font-size: 1.1em;
                margin-top: 2em;
            }}
            p {{ margin: 1em 0; }}
        </style>
    </head>
    <body>
        <h1>FactSet S&P 500 Earnings Insight</h1>
        <p style="color: #666; font-size: 0.9em;">Report Date: {report_date}</p>
        {markdown_to_html(summary)}
        <hr style="margin-top: 3em; border: none; border-top: 1px solid #ccc;">
        <p style="color: #999; font-size: 0.8em;">Auto-generated weekly report</p>
    </body>
    </html>
    """
    
    msg.attach(MIMEText(summary, "plain"))
    msg.attach(MIMEText(html_content, "html"))
    
    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
        print(f"[OK] メール送信完了: {to_email}")
        return True
    except Exception as e:
        print(f"[ERROR] メール送信失敗: {e}")
        return False


def markdown_to_html(md_text: str) -> str:
    """簡易的なMarkdown→HTML変換"""
    html = md_text
    html = re.sub(r'^### (.+)$', r'<h3>\1</h3>', html, flags=re.MULTILINE)
    html = re.sub(r'^## (.+)$', r'<h2>\1</h2>', html, flags=re.MULTILINE)
    html = re.sub(r'^# (.+)$', r'<h1>\1</h1>', html, flags=re.MULTILINE)
    html = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', html)
    html = re.sub(r'^- (.+)$', r'<li>\1</li>', html, flags=re.MULTILINE)
    html = html.replace('\n\n', '</p><p>')
    html = f'<p>{html}</p>'
    return html


def save_summary(summary: str, report_date: str):
    """サマリーをファイルに保存"""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    output_file = OUTPUT_DIR / f"summary_{report_date}.md"
    output_file.write_text(summary, encoding="utf-8")
    print(f"[OK] サマリー保存: {output_file}")
    return output_file


def main():
    print("=" * 60)
    print("FactSet Earnings Insight")
    print(f"実行時刻: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)
    
    url, date_str = get_latest_report_url()
    if not url:
        print("[ERROR] 最新レポートが見つかりません")
        return 1
    
    print(f"レポートURL: {url}")
    
    pdf_path = OUTPUT_DIR / f"EarningsInsight_{date_str}.pdf"
    if not download_report(url, pdf_path):
        return 1
    
    print("PDFからテキスト抽出中...")
    text = extract_text_from_pdf(pdf_path)
    if not text:
        print("[ERROR] テキスト抽出失敗")
        return 1
    
    print("Claude APIでサマリー生成中...")
    summary = generate_summary_with_claude(text)
    
    save_summary(summary, date_str)
    
    print("\n" + "=" * 60)
    print("サマリー:")
    print("=" * 60)
    print(summary)
    
    send_email(summary, date_str)
    
    return 0


if __name__ == "__main__":
    exit(main())
