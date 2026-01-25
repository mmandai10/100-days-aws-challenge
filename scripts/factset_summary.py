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
    # 直近の金曜日を探す
    days_since_friday = (today.weekday() - 4) % 7
    if days_since_friday == 0 and today.hour < 12:
        days_since_friday = 7  # 金曜日の朝なら前週
    last_friday = today - timedelta(days=days_since_friday)
    
    # 複数の日付フォーマットを試す
    date_formats = [
        last_friday.strftime("%m%d%y"),  # 012426
        (last_friday - timedelta(days=1)).strftime("%m%d%y"),  # 前日も試す
        (last_friday + timedelta(days=1)).strftime("%m%d%y"),  # 翌日も試す
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
        print(f"✅ ダウンロード完了: {output_path}")
        return True
    except Exception as e:
        print(f"❌ ダウンロード失敗: {e}")
        return False


def extract_text_from_pdf(pdf_path: Path) -> str:
    """PDFからテキストを抽出"""
    try:
        import pdfplumber
        text = ""
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages[:15]:  # 最初の15ページ
                text += page.extract_text() or ""
        return text
    except ImportError:
        # pdfplumberがない場合はpypdfを試す
        try:
            from pypdf import PdfReader
            reader = PdfReader(pdf_path)
            text = ""
            for page in reader.pages[:15]:
                text += page.extract_text() or ""
            return text
        except Exception as e:
            print(f"❌ PDF読み込み失敗: {e}")
            return ""


def generate_summary_with_claude(text: str) -> str:
    """Claude APIを使ってサマリーを生成"""
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        return "❌ ANTHROPIC_API_KEY が設定されていません"
    
    client = anthropic.Anthropic(api_key=api_key)
    
    prompt = f"""以下はFactSetのS&P 500 Earnings Insightレポートの内容です。
日本語で簡潔なサマリーを作成してください。

含めるべき項目：
1. 📊 Q4 2025 決算シーズンの進捗（発表済み企業の割合、EPSビート率）
2. 📈 利益成長率（前年同期比）
3. 🏆 Magnificent 7の貢献度
4. 💹 セクター別のハイライト（好調/不調セクター）
5. 🔮 2026年の見通し（アナリスト予想）
6. 📉 バリュエーション（Forward P/E）
7. 📅 今週の注目決算発表企業

フォーマット：マークダウン形式、箇条書きと表を適宜使用

レポート内容：
{text[:50000]}
"""
    
    try:
        message = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=2000,
            messages=[{"role": "user", "content": prompt}]
        )
        return message.content[0].text
    except Exception as e:
        return f"❌ Claude API エラー: {e}"


def send_email(summary: str, report_date: str):
    """メールでサマリーを送信"""
    smtp_server = os.environ.get("SMTP_SERVER", "smtp.gmail.com")
    smtp_port = int(os.environ.get("SMTP_PORT", "587"))
    smtp_user = os.environ.get("SMTP_USER")
    smtp_password = os.environ.get("SMTP_PASSWORD")
    to_email = os.environ.get("TO_EMAIL")
    
    if not all([smtp_user, smtp_password, to_email]):
        print("⚠️ メール設定が不完全です。コンソール出力のみ行います。")
        return False
    
    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"📊 FactSet Earnings Insight サマリー ({report_date})"
    msg["From"] = smtp_user
    msg["To"] = to_email
    
    # HTMLバージョン
    html_content = f"""
    <html>
    <head>
        <style>
            body {{ font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; }}
            h1 {{ color: #1a73e8; }}
            h2 {{ color: #34a853; border-bottom: 1px solid #eee; }}
            table {{ border-collapse: collapse; width: 100%; }}
            th, td {{ border: 1px solid #ddd; padding: 8px; text-align: left; }}
            th {{ background-color: #f2f2f2; }}
        </style>
    </head>
    <body>
        <h1>📊 FactSet Earnings Insight Weekly Summary</h1>
        <p>レポート日付: {report_date}</p>
        <hr>
        {markdown_to_html(summary)}
        <hr>
        <p><small>このメールは自動生成されています。</small></p>
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
        print(f"✅ メール送信完了: {to_email}")
        return True
    except Exception as e:
        print(f"❌ メール送信失敗: {e}")
        return False


def markdown_to_html(md_text: str) -> str:
    """簡易的なMarkdown→HTML変換"""
    import re
    html = md_text
    # Headers
    html = re.sub(r'^### (.+)$', r'<h3>\1</h3>', html, flags=re.MULTILINE)
    html = re.sub(r'^## (.+)$', r'<h2>\1</h2>', html, flags=re.MULTILINE)
    html = re.sub(r'^# (.+)$', r'<h1>\1</h1>', html, flags=re.MULTILINE)
    # Bold
    html = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', html)
    # Lists
    html = re.sub(r'^- (.+)$', r'<li>\1</li>', html, flags=re.MULTILINE)
    # Line breaks
    html = html.replace('\n\n', '</p><p>')
    html = f'<p>{html}</p>'
    return html


def save_summary(summary: str, report_date: str):
    """サマリーをファイルに保存"""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    output_file = OUTPUT_DIR / f"summary_{report_date}.md"
    output_file.write_text(summary, encoding="utf-8")
    print(f"✅ サマリー保存: {output_file}")
    return output_file


def main():
    print("=" * 60)
    print("FactSet Earnings Insight 自動サマリー")
    print(f"実行時刻: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)
    
    # 1. 最新レポートのURLを取得
    url, date_str = get_latest_report_url()
    if not url:
        print("❌ 最新レポートが見つかりません")
        return 1
    
    print(f"📄 レポートURL: {url}")
    
    # 2. ダウンロード
    pdf_path = OUTPUT_DIR / f"EarningsInsight_{date_str}.pdf"
    if not download_report(url, pdf_path):
        return 1
    
    # 3. テキスト抽出
    print("📖 PDFからテキスト抽出中...")
    text = extract_text_from_pdf(pdf_path)
    if not text:
        print("❌ テキスト抽出失敗")
        return 1
    
    # 4. Claude APIでサマリー生成
    print("🤖 Claude APIでサマリー生成中...")
    summary = generate_summary_with_claude(text)
    
    # 5. 結果を保存・送信
    save_summary(summary, date_str)
    
    print("\n" + "=" * 60)
    print("📋 サマリー:")
    print("=" * 60)
    print(summary)
    
    # 6. メール送信
    send_email(summary, date_str)
    
    return 0


if __name__ == "__main__":
    exit(main())
