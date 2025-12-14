import os
from dotenv import load_dotenv
from anthropic import Anthropic

from documents import DOCUMENTS
from embedding import get_embedding, get_embeddings
from search import search_similar

load_dotenv()

anthropic = Anthropic()

print("ドキュメントを読み込み中...")
doc_texts = [doc["content"] for doc in DOCUMENTS]
doc_embeddings = get_embeddings(doc_texts)
print(f"{len(DOCUMENTS)}件のドキュメントを読み込みました\n")

def ask(question):
    """RAGで質問に回答"""
    
    # ① Retrieve: 質問に関連するドキュメントを検索
    query_embedding = get_embedding(question)
    results = search_similar(query_embedding, doc_embeddings, DOCUMENTS, top_k=2)
    
    print("【検索結果】")
    for score, doc in results:
        print(f"  - {doc['title']} (類似度: {score:.3f})")
    print()
    
    # ② Augment: 検索結果をプロンプトに追加
    context = "\n\n".join([
        f"### {doc['title']}\n{doc['content']}" 
        for score, doc in results
    ])
    
    prompt = f"""以下の社内ドキュメントを参考に、質問に回答してください。
ドキュメントに情報がない場合は「その情報は見つかりませんでした」と答えてください。

## 参考ドキュメント
{context}

## 質問
{question}
"""
    
    # ③ Generate: Claude APIで回答生成
    response = anthropic.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=500,
        messages=[{"role": "user", "content": prompt}]
    )
    
    return response.content[0].text

if __name__ == "__main__":
    print("=== 社内FAQ Q&Aシステム ===\n")
    
    while True:
        question = input("質問を入力（終了はquit）: ")
        if question.lower() == "quit":
            break
        
        answer = ask(question)
        print(f"\n【回答】\n{answer}\n")
        print("-" * 50 + "\n")