"""RAG（Retrieval-Augmented Generation）を使用した Q&A システム"""

import os
from dotenv import load_dotenv
from anthropic import Anthropic, APIError

from documents import DOCUMENTS
from embedding import get_embedding, get_embeddings, EmbeddingError
from search import search_similar, Document

load_dotenv()

# 設定
DEFAULT_MODEL = "claude-sonnet-4-20250514"
DEFAULT_MAX_TOKENS = 500
DEFAULT_TOP_K = 2


class RAGSystem:
    """RAG ベースの Q&A システム"""

    def __init__(
        self,
        documents: list[Document],
        model: str = DEFAULT_MODEL,
        max_tokens: int = DEFAULT_MAX_TOKENS,
        top_k: int = DEFAULT_TOP_K
    ):
        """
        RAG システムを初期化

        Args:
            documents: 検索対象のドキュメントリスト
            model: 使用する Claude モデル
            max_tokens: 回答の最大トークン数
            top_k: 検索で取得するドキュメント数
        """
        self.documents = documents
        self.model = model
        self.max_tokens = max_tokens
        self.top_k = top_k

        self._client: Anthropic | None = None
        self._doc_embeddings: list[list[float]] | None = None

    @property
    def client(self) -> Anthropic:
        """Anthropic クライアント（遅延初期化）"""
        if self._client is None:
            api_key = os.getenv("ANTHROPIC_API_KEY")
            if not api_key:
                raise ValueError(
                    "ANTHROPIC_API_KEY が設定されていません。.env ファイルを確認してください。"
                )
            self._client = Anthropic()
        return self._client

    def initialize(self) -> None:
        """ドキュメントの埋め込みを事前計算"""
        if self._doc_embeddings is not None:
            return  # 既に初期化済み

        print("ドキュメントを読み込み中...")
        try:
            doc_texts = [doc["content"] for doc in self.documents]
            self._doc_embeddings = get_embeddings(doc_texts)
            print(f"{len(self.documents)}件のドキュメントを読み込みました\n")
        except EmbeddingError as e:
            raise RuntimeError(f"ドキュメントの埋め込みに失敗しました: {e}")

    def ask(self, question: str, verbose: bool = True) -> str:
        """
        RAG で質問に回答

        Args:
            question: ユーザーの質問
            verbose: 検索結果を表示するかどうか

        Returns:
            Claude による回答

        Raises:
            RuntimeError: システムが初期化されていない場合
            EmbeddingError: 質問の埋め込みに失敗した場合
        """
        if not question or not question.strip():
            return "質問を入力してください。"

        if self._doc_embeddings is None:
            raise RuntimeError("システムが初期化されていません。initialize() を呼び出してください。")

        # ① Retrieve: 質問に関連するドキュメントを検索
        try:
            query_embedding = get_embedding(question)
        except EmbeddingError as e:
            return f"質問の処理に失敗しました: {e}"

        results = search_similar(
            query_embedding,
            self._doc_embeddings,
            self.documents,
            top_k=self.top_k
        )

        if verbose:
            print("【検索結果】")
            for score, doc in results:
                print(f"  - {doc['title']} (類似度: {score:.3f})")
            print()

        # ② Augment: 検索結果をプロンプトに追加
        if not results:
            return "関連するドキュメントが見つかりませんでした。"

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

        # ③ Generate: Claude API で回答生成
        try:
            response = self.client.messages.create(
                model=self.model,
                max_tokens=self.max_tokens,
                messages=[{"role": "user", "content": prompt}]
            )
            return response.content[0].text
        except APIError as e:
            return f"回答の生成に失敗しました: {e}"


def main():
    """メイン関数"""
    print("=== 社内FAQ Q&Aシステム ===\n")

    # システム初期化
    try:
        rag = RAGSystem(DOCUMENTS)
        rag.initialize()
    except Exception as e:
        print(f"エラー: システムの初期化に失敗しました: {e}")
        return

    # 対話ループ
    while True:
        try:
            question = input("質問を入力（終了は quit）: ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\n終了します。")
            break

        if question.lower() == "quit":
            print("終了します。")
            break

        if not question:
            continue

        answer = rag.ask(question)
        print(f"\n【回答】\n{answer}\n")
        print("-" * 50 + "\n")


if __name__ == "__main__":
    main()
