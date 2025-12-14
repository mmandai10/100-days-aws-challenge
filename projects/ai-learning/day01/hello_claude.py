import os
from dotenv import load_dotenv
from anthropic import Anthropic

# .env ファイルから環境変数を読み込む
load_dotenv()

# クライアントを作成
client = Anthropic()

# Claude にメッセージを送信
message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "こんにちは！自己紹介してください。"}
    ]
)

# 応答を表示
print(message.content[0].text)