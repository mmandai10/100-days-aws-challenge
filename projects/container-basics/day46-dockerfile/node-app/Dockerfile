# ベースイメージ: Node.js 20 の Alpine 版（軽量）
FROM node:20-alpine

# 作業ディレクトリを設定
WORKDIR /app

# package.json をコピー
COPY package.json .

# 依存関係をインストール（今回は依存なし）
RUN npm install

# アプリケーションコードをコピー
COPY server.js .

# 環境変数を設定
ENV PORT=3000

# ポートを宣言
EXPOSE 3000

# コンテナ起動時のコマンド
CMD ["node", "server.js"]
