import anthropic
from dotenv import load_dotenv

load_dotenv("../.env")

client = anthropic.Anthropic()

# テンプレート定義
TEMPLATES = {
    "summarize": """以下の文章を{num_lines}行で要約してください。

文章：
{text}""",

    "translate": """以下の文章を{target_lang}に翻訳してください。

文章：
{text}""",

    "code_review": """以下のコードをレビューしてください。
観点：
- バグの可能性
- 改善点
- 良い点

コード：
{code}"""
}

def generate(template_name, **kwargs):
    """テンプレートを使ってClaudeに問い合わせる"""
    template = TEMPLATES[template_name]
    prompt = template.format(**kwargs)
    
    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}]
    )
    return message.content[0].text

if __name__ == "__main__":
    # テスト1: 要約
    sample_text = """
    人工知能（AI）は、コンピュータシステムが人間の知能を模倣する技術です。
    機械学習、深層学習、自然言語処理などの分野があります。
    近年、ChatGPTやClaudeなどの大規模言語モデルが登場し、
    テキスト生成、翻訳、要約など様々なタスクが可能になりました。
    AIは医療、金融、教育など多くの分野で活用されています。
    """
    
    print("=== 要約テスト ===")
    result = generate("summarize", num_lines=2, text=sample_text)
    print(result)
    
    print("\n=== 翻訳テスト ===")
    result = generate("translate", target_lang="英語", text="今日は天気がいいですね。")
    print(result)

    print("\n=== コードレビューテスト ===")
    sample_code = """
    def add(a, b):
    return a + b

    result = add("1", 2)
    print(result)
    """
    result = generate("code_review", code=sample_code)
    print(result)