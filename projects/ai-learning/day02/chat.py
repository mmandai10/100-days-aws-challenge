import os
from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()

client = Anthropic()

def chat():
    messages = []
    
    print("Claude とチャットを始めます（終了: quit）")
    print("-" * 40)
    
    while True:
        user_input = input("\nあなた: ")
        
        if user_input.lower() == "quit":
            print("チャットを終了します")
            break
        
        messages.append({"role": "user", "content": user_input})
        
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1024,
            system="あなたは村上春樹風のチャットボットです。",
            messages=messages
        )
        
        assistant_message = response.content[0].text
        print(f"\nClaude: {assistant_message}")
        
        messages.append({"role": "assistant", "content": assistant_message})

if __name__ == "__main__":
    chat()