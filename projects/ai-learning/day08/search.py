import math

def cosine_similarity(vec1, vec2):
    """2つのベクトルのコサイン類似度を計算"""
    dot_product = sum(a * b for a, b in zip(vec1, vec2))
    norm1 = math.sqrt(sum(a * a for a in vec1))
    norm2 = math.sqrt(sum(b * b for b in vec2))
    return dot_product / (norm1 * norm2)

def search_similar(query_embedding, doc_embeddings, documents, top_k=3):
    """クエリに類似したドキュメントを検索"""
    scores = []
    
    for i, doc_emb in enumerate(doc_embeddings):
        score = cosine_similarity(query_embedding, doc_emb)
        scores.append((score, documents[i]))
    
    scores.sort(key=lambda x: x[0], reverse=True)
    
    return scores[:top_k]
