# create-readme.ps1
# README.md作成スクリプト

Write-Host "Creating README.md..." -ForegroundColor Cyan

$content = @"
# 100 Days AWS Challenge 🚀

## 概要
100日間、毎日1つのアプリケーションを作成し、AWSにデプロイするチャレンジ

## 開始日
2025年9月14日

## 進捗
![Progress](https://img.shields.io/badge/Progress-0%2F100-blue)

### Week 0: 環境構築
- ✅ Day 0: プロジェクトセットアップ完了 (2025-09-14)

### Week 1: 基礎編
- ⏳ Day 1-7: 準備中

## 技術スタック
- Frontend: HTML/CSS/JavaScript, React
- Backend: Node.js, Express
- Cloud: AWS (S3, Lambda, DynamoDB)
- Version Control: Git/GitHub
- IDE: VSCode

## 参考書籍
「#100日チャレンジ」大塚あみ著

---
最終更新: 2025-09-14
"@

$content | Out-File -FilePath "README.md" -Encoding UTF8

if (Test-Path "README.md") {
    Write-Host "✅ README.md created!" -ForegroundColor Green
} else {
    Write-Host "❌ Failed!" -ForegroundColor Red
}
