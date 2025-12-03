# ベースイメージ: Java 21 (Alpine Linux = 軽量版)
FROM eclipse-temurin:21-jdk-alpine

# 作業ディレクトリを設定
WORKDIR /app

# jarファイルをコンテナ内にコピー
COPY target/task-service-0.0.1-SNAPSHOT.jar app.jar

# コンテナが使用するポートを宣言
EXPOSE 8081

# コンテナ起動時に実行するコマンド
ENTRYPOINT ["java", "-jar", "app.jar"]