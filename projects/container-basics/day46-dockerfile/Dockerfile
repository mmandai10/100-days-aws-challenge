# ベースイメージを指定
FROM nginx:alpine

# 作成者情報（任意）
LABEL maintainer="mitsuharu"
LABEL description="Day 46 - First Dockerfile practice"

# ローカルのファイルをコンテナ内にコピー
COPY index.html /usr/share/nginx/html/index.html

# コンテナが使用するポートを明示（ドキュメント目的）
EXPOSE 80

# nginx はデフォルトでフォアグラウンド実行されるため CMD 不要
