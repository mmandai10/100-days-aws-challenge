# Docker コマンドリファレンス

Phase 2 で学んだ Docker コマンドのメモ。

---

## 基本コマンド

### イメージ操作

```bash
# イメージ一覧
docker images

# イメージをダウンロード
docker pull <image>:<tag>

# イメージを削除
docker rmi <image>

# 未使用イメージを一括削除
docker image prune
```

### コンテナ操作

```bash
# コンテナ作成・起動
docker run [options] <image>

# よく使うオプション
#   -d            バックグラウンド実行
#   -p 8080:80    ポートマッピング（ホスト:コンテナ）
#   --name xxx    コンテナに名前をつける
#   -it           インタラクティブモード（シェル起動時）
#   --rm          終了時に自動削除
#   -v /host:/container  ボリュームマウント
#   -e KEY=VALUE  環境変数

# 例: nginx を起動
docker run -d -p 8080:80 --name my-nginx nginx

# 実行中のコンテナ一覧
docker ps

# 全コンテナ一覧（停止含む）
docker ps -a

# コンテナ停止
docker stop <container>

# コンテナ削除
docker rm <container>

# 停止と削除を同時に
docker rm -f <container>

# 停止済みコンテナを一括削除
docker container prune
```

### コンテナ操作（実行中）

```bash
# コンテナ内でコマンド実行
docker exec <container> <command>

# コンテナ内のシェルに入る
docker exec -it <container> bash
# または
docker exec -it <container> sh

# コンテナのログを見る
docker logs <container>

# ログをリアルタイムで追跡
docker logs -f <container>
```

---

## オプション詳細

### ポートマッピング (-p)

```
-p <ホストポート>:<コンテナポート>

例: -p 8080:80
    → localhost:8080 でアクセスすると
    → コンテナの 80 番ポートに転送
```

### ボリュームマウント (-v)

```
-v <ホストパス>:<コンテナパス>

例: -v $(pwd)/html:/usr/share/nginx/html
    → ホストの html フォルダを
    → コンテナ内の nginx ドキュメントルートにマウント
    → ホストでファイル編集 → コンテナに即反映
```

### 環境変数 (-e)

```
-e <KEY>=<VALUE>

例: -e NODE_ENV=production
    → コンテナ内で環境変数 NODE_ENV が使える
```

---

## よく使う組み合わせ

```bash
# 開発用: ポートマッピング + ボリュームマウント + 自動削除
docker run -d -p 3000:3000 -v $(pwd):/app --rm --name dev-app node:18

# デバッグ: シェルに入って調査
docker exec -it my-app bash

# ログ確認: エラー調査
docker logs my-app
docker logs -f my-app  # リアルタイム

# クリーンアップ
docker stop $(docker ps -q)        # 全コンテナ停止
docker container prune             # 停止済み削除
docker image prune                 # 未使用イメージ削除
docker system prune                # 全未使用リソース削除
```

---

## トラブルシューティング

### Docker Daemon が起動していない

```
error: Cannot connect to the Docker daemon
```

→ Docker Desktop を起動する

### ポートが既に使われている

```
Error: Bind for 0.0.0.0:8080 failed: port is already allocated
```

→ 別のポートを使う (`-p 8081:80`) または使用中のコンテナを停止

### コンテナ名が既に存在する

```
Error: Conflict. The container name "/my-nginx" is already in use
```

→ `docker rm my-nginx` で削除してから再作成

---

## 参考

- Docker 公式ドキュメント: https://docs.docker.com/
- Docker Hub: https://hub.docker.com/
