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
                    "description": "天気を取得したい都市名"
                }
            },
            "required": ["city"]
        }
    },
    {
        "name": "get_attractions",
        "description": "指定した都市の人気観光スポットを取得する",
        "input_schema": {
            "type": "object",
            "properties": {
                "city": {
                    "type": "string",
                    "description": "観光スポットを調べたい都市名"
                }
            },
            "required": ["city"]
        }
    },
    {
        "name": "calculate_budget",
        "description": "旅行の予算を計算する",
        "input_schema": {
            "type": "object",
            "properties": {
                "days": {
                    "type": "integer",
                    "description": "旅行日数"
                },
                "daily_budget": {
                    "type": "integer",
                    "description": "1日あたりの予算（円）"
                }
            },
            "required": ["days", "daily_budget"]
        }
    }
]

def get_weather(city):
    weather_data = {
        "東京": {"condition": "晴れ", "temperature": 15},
        "大阪": {"condition": "曇り", "temperature": 13},
        "京都": {"condition": "晴れ", "temperature": 12},
        "札幌": {"condition": "雪", "temperature": -3},
    }
    return weather_data.get(city, {"condition": "不明", "temperature": "不明"})

def get_attractions(city):
    attractions_data = {
        "東京": ["東京タワー", "浅草寺", "渋谷スクランブル交差点"],
        "大阪": ["大阪城", "道頓堀", "通天閣"],
        "京都": ["金閣寺", "伏見稲荷大社", "清水寺"],
        "札幌": ["時計台", "大通公園", "すすきの"],
    }
    return attractions_data.get(city, ["情報なし"])

def calculate_budget(days, daily_budget):
    total = days * daily_budget
    return {"days": days, "daily_budget": daily_budget, "total": total}

def execute_tool(tool_name, tool_input):
    if tool_name == "get_weather":
        return get_weather(tool_input["city"])
    elif tool_name == "get_attractions":
        return get_attractions(tool_input["city"])
    elif tool_name == "calculate_budget":
        return calculate_budget(tool_input["days"], tool_input["daily_budget"])
    else:
        return {"error": "Unknown tool"}

def ask_travel_assistant(user_message):
    messages = [{"role": "user", "content": user_message}]
    
    print(f"\n{'='*50}")
    print(f"質問: {user_message}")
    print('='*50)
    
    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1024,
        tools=tools,
        messages=messages
    )
    
    while response.stop_reason == "tool_use":
        tool_results = []
        
        for block in response.content:
            if block.type == "tool_use":
                tool_name = block.name
                tool_input = block.input
                tool_use_id = block.id
                
                print(f"\n🔧 ツール呼び出し: {tool_name}")
                print(f"   パラメータ: {tool_input}")
                
                result = execute_tool(tool_name, tool_input)
                print(f"   結果: {result}")
                
                tool_results.append({
                    "type": "tool_result",
                    "tool_use_id": tool_use_id,
                    "content": json.dumps(result, ensure_ascii=False)
                })
        
        messages.append({"role": "assistant", "content": response.content})
        messages.append({"role": "user", "content": tool_results})
        
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1024,
            tools=tools,
            messages=messages
        )
    
    final_text = ""
    for block in response.content:
        if hasattr(block, "text"):
            final_text += block.text
    
    print(f"\n💬 回答: {final_text}")
    return final_text

if __name__ == "__main__":
    print("旅行アシスタントです。終了は 'quit' と入力してください。")
    while True:
        user_input = input("\n質問: ")
        if user_input.lower() == "quit":
            break
        ask_travel_assistant(user_input)