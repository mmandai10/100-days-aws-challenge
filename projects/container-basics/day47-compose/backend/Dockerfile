FROM node:20-alpine

WORKDIR /app

# 依存関係を先にコピー（キャッシュ活用）
COPY package.json ./
RUN npm install

# ソースコードをコピー
COPY server.js ./

EXPOSE 3000

CMD ["npm", "start"]
