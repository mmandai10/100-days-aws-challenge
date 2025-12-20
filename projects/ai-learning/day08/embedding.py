"""Voyage AI を使用したテキスト埋め込み（Embedding）モジュール"""

import os
from dotenv import load_dotenv
import voyageai

load_dotenv()

# 定数
MODEL_NAME = "voyage-3-lite"
_client = None


class EmbeddingError(Exception):
    """Embedding 処理で発生するエラー"""
    pass


def _get_client() -> voyageai.Client:
    """Voyage AI クライアントを取得（遅延初期化）"""
    global _client
    if _client is None:
        api_key = os.getenv("VOYAGE_API_KEY")
        if not api_key:
            raise EmbeddingError(
                "VOYAGE_API_KEY が設定されていません。.env ファイルを確認してください。"
            )
        _client = voyageai.Client(api_key=api_key)
    return _client


def get_embedding(text: str) -> list[float]:
    """
    テキストをベクトルに変換

    Args:
        text: 変換するテキスト

    Returns:
        埋め込みベクトル（float のリスト）

    Raises:
        EmbeddingError: API 呼び出しに失敗した場合
    """
    if not text or not text.strip():
        raise EmbeddingError("空のテキストは埋め込みできません")

    try:
        client = _get_client()
        result = client.embed(
            texts=[text],
            model=MODEL_NAME
        )
        return result.embeddings[0]
    except voyageai.error.RateLimitError as e:
        raise EmbeddingError(f"レート制限に達しました。しばらく待ってから再試行してください: {e}")
    except Exception as e:
        raise EmbeddingError(f"埋め込み処理に失敗しました: {e}")


def get_embeddings(texts: list[str]) -> list[list[float]]:
    """
    複数テキストを一括でベクトルに変換

    Args:
        texts: 変換するテキストのリスト

    Returns:
        埋め込みベクトルのリスト

    Raises:
        EmbeddingError: API 呼び出しに失敗した場合
    """
    if not texts:
        raise EmbeddingError("テキストリストが空です")

    # 空文字列をフィルタリング
    valid_texts = [t for t in texts if t and t.strip()]
    if len(valid_texts) != len(texts):
        raise EmbeddingError("空のテキストが含まれています")

    try:
        client = _get_client()
        result = client.embed(
            texts=texts,
            model=MODEL_NAME
        )
        return result.embeddings
    except voyageai.error.RateLimitError as e:
        raise EmbeddingError(f"レート制限に達しました: {e}")
    except Exception as e:
        raise EmbeddingError(f"埋め込み処理に失敗しました: {e}")
