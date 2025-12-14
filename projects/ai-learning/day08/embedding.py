import os
import time
from dotenv import load_dotenv
import voyageai

load_dotenv()

client = voyageai.Client(api_key=os.getenv("VOYAGE_API_KEY"))

def get_embedding(text):
    """テキストをベクトルに変換"""
    time.sleep(20)  # レート制限対策
    result = client.embed(
        texts=[text],
        model="voyage-3-lite"
    )
    return result.embeddings[0]

def get_embeddings(texts):
    """複数テキストを一括でベクトルに変換"""
    result = client.embed(
        texts=texts,
        model="voyage-3-lite"
    )
    return result.embeddings