import anthropic
import json
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic()

tools = [
    {
        "name": "get_weather",
        "description": "指定した都市の現在の天気を取得する",
        "input_schema": {
            "type": "object",
            "properties": {
                "city": {
                    "type": "string",
                    "description": "天気を取得したい都市名（例: 東京、大阪）"
                }
            },
            "required": ["city"]
        }
    }
]

def get_weather(city):
    """ダミーの天気データを返す（本来はAPIを呼ぶ）"""
    weather_data = {
        "東京": {"condition": "晴れ", "temperature": 22},
        "大阪": {"condition": "曇り", "temperature": 20},
        "札幌": {"condition": "雪", "temperature": -2},
    }
    return weather_data.get(city, {"condition": "不明", "temperature": "不明"})

messages = [{"role": "user", "content": "日本の首都はどこ？"}]

response = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    tools=tools,
    messages=messages
)

print("=== 1回目の応答 ===")
print(f"stop_reason: {response.stop_reason}")

if response.stop_reason == "tool_use":
    for block in response.content:
        if block.type == "tool_use":
            tool_name = block.name
            tool_input = block.input
            tool_use_id = block.id
            
            print(f"ツール呼び出し: {tool_name}({tool_input})")
            
            result = get_weather(tool_input["city"])
            print(f"ツール実行結果: {result}")
            
            messages.append({"role": "assistant", "content": response.content})
            messages.append({
                "role": "user",
                "content": [{
                    "type": "tool_result",
                    "tool_use_id": tool_use_id,
                    "content": json.dumps(result, ensure_ascii=False)
                }]
            })
            
            final_response = client.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=1024,
                tools=tools,
                messages=messages
            )
            
            print("\n=== 最終応答 ===")
            print(final_response.content[0].text)