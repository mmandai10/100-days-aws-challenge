"""ベクトル類似検索モジュール"""

import math
from typing import TypedDict


class Document(TypedDict):
    """ドキュメントの型定義"""
    id: int
    title: str
    content: str


class SearchResult(TypedDict):
    """検索結果の型定義"""
    score: float
    document: Document


def cosine_similarity(vec1: list[float], vec2: list[float]) -> float:
    """
    2つのベクトルのコサイン類似度を計算

    Args:
        vec1: ベクトル1
        vec2: ベクトル2

    Returns:
        コサイン類似度（-1.0 〜 1.0）

    Raises:
        ValueError: ベクトルの長さが異なる場合
    """
    if len(vec1) != len(vec2):
        raise ValueError(
            f"ベクトルの長さが異なります: {len(vec1)} vs {len(vec2)}"
        )

    if not vec1 or not vec2:
        raise ValueError("空のベクトルは計算できません")

    dot_product = sum(a * b for a, b in zip(vec1, vec2))
    norm1 = math.sqrt(sum(a * a for a in vec1))
    norm2 = math.sqrt(sum(b * b for b in vec2))

    # ゼロ除算対策
    if norm1 == 0 or norm2 == 0:
        return 0.0

    return dot_product / (norm1 * norm2)


def search_similar(
    query_embedding: list[float],
    doc_embeddings: list[list[float]],
    documents: list[Document],
    top_k: int = 3,
    min_score: float = 0.0
) -> list[tuple[float, Document]]:
    """
    クエリに類似したドキュメントを検索

    Args:
        query_embedding: クエリの埋め込みベクトル
        doc_embeddings: ドキュメントの埋め込みベクトルリスト
        documents: ドキュメントリスト
        top_k: 返す結果の最大数
        min_score: 最低類似度スコア（これ以下は除外）

    Returns:
        (類似度スコア, ドキュメント) のタプルリスト（スコア降順）

    Raises:
        ValueError: 入力データが不正な場合
    """
    if len(doc_embeddings) != len(documents):
        raise ValueError(
            f"埋め込みとドキュメントの数が一致しません: "
            f"{len(doc_embeddings)} vs {len(documents)}"
        )

    if top_k <= 0:
        raise ValueError("top_k は正の整数である必要があります")

    scores: list[tuple[float, Document]] = []

    for i, doc_emb in enumerate(doc_embeddings):
        try:
            score = cosine_similarity(query_embedding, doc_emb)
            if score >= min_score:
                scores.append((score, documents[i]))
        except ValueError:
            # ベクトルに問題がある場合はスキップ
            continue

    # スコア降順でソート
    scores.sort(key=lambda x: x[0], reverse=True)

    return scores[:top_k]
