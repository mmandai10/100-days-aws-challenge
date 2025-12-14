import anthropic
from dotenv import load_dotenv

load_dotenv("../.env")

client = anthropic.Anthropic()

TEMPLATES = {
    "summarize": """以下のドキュメントを{num_lines}行で要約してください。

<document>
{text}
</document>

要約：""",

    "translate": """以下のテキストを{target_lang}に翻訳してください。

<source_text>
{text}
</source_text>

翻訳結果：""",

    "analyze_review": """以下の商品レビューを分析してください。

<review>
{review}
</review>

以下のJSON形式で回答してください：
{{"sentiment": "positive/negative/neutral", "score": 1-5, "keywords": ["キーワード1", "キーワード2"]}}

JSON：""",

    "analyze_review_fewshot": """商品レビューを分析してJSON形式で返してください。

例1:
<review>美味しくて大満足！また買います。</review>
{{"sentiment": "positive", "score": 5, "keywords": ["美味しい", "大満足"]}}

例2:
<review>普通でした。可もなく不可もなく。</review>
{{"sentiment": "neutral", "score": 3, "keywords": ["普通"]}}

例3:
<review>不良品でした。二度と買いません。</review>
{{"sentiment": "negative", "score": 1, "keywords": ["不良品"]}}

では、以下のレビューを分析してください：
<review>
{review}
</review>
"""
}

def generate(template_name, **kwargs):
    template = TEMPLATES[template_name]
    prompt = template.format(**kwargs)
    
    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}]
    )
    return message.content[0].text


if __name__ == "__main__":
    sample_review = """
    この商品は最高です！品質がとても良く、配送も早かった。
    ただ、説明書がわかりにくかったのが少し残念。
    でも全体的には大満足です。また買いたいと思います。
    """
    
    print("=== 通常版 ===")
    result1 = generate("analyze_review", review=sample_review)
    print(result1)
    
    print("\n=== Few-shot版 ===")
    result2 = generate("analyze_review_fewshot", review=sample_review)
    print(result2)