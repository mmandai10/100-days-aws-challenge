@echo off
REM 古典日課 自動生成バッチ
REM 使用前に ANTHROPIC_API_KEY を設定してください

REM API Key設定（ここに自分のキーを入れるか、環境変数で設定）
REM set ANTHROPIC_API_KEY=sk-ant-xxxxx

cd /d "%~dp0"

echo === 古典日課 自動生成 ===
echo.

REM anthropicパッケージ確認
pip show anthropic >nul 2>&1
if errorlevel 1 (
    echo anthropicパッケージをインストール中...
    pip install anthropic
)

REM 実行
python generate_days.py

echo.
pause
