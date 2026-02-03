# =============================================================================
# Day 51: ECR Sample App Dockerfile
# =============================================================================

FROM node:20-alpine

WORKDIR /app

# 依存関係を先にコピー（レイヤーキャッシュ活用）
COPY package*.json ./
RUN npm install --production

# アプリケーションコードをコピー
COPY server.js ./

# ポート宣言（ドキュメント用）
EXPOSE 3000

# exec form で CMD（Day 50: SIGTERM を正しく受け取るため）
CMD ["node", "server.js"]
