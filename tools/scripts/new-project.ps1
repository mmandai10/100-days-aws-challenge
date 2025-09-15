# new-project.ps1
# 毎日のプロジェクトを作成するスクリプト
# 使用方法: .\new-project.ps1 <day_number> <project_name>

param(
    [Parameter(Mandatory=$true)]
    [int]$DayNumber,
    
    [Parameter(Mandatory=$true)]
    [string]$ProjectName
)

Write-Host "`n🚀 Creating Day $DayNumber Project: $ProjectName" -ForegroundColor Cyan

# Week番号を計算
$weekNumber = [Math]::Ceiling($DayNumber / 7)
$dayFormatted = $DayNumber.ToString("000")
$weekFormatted = $weekNumber.ToString("00")

# プロジェクトパス
$projectPath = "projects/week-$weekFormatted/day-$dayFormatted-$ProjectName"

Write-Host "📁 Creating project structure..." -ForegroundColor Yellow

# ディレクトリ作成
$dirs = @(
    "$projectPath/src/frontend",
    "$projectPath/src/backend",
    "$projectPath/src/infrastructure",
    "$projectPath/tests",
    "$projectPath/docs"
)

foreach ($dir in $dirs) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
    Write-Host "  ✓ $dir" -ForegroundColor Gray
}

# README.md を作成
$readmeContent = @"
# Day $DayNumber : $ProjectName

## 概要
[プロジェクトの説明をここに記載]

## 技術スタック
- Frontend: HTML/CSS/JavaScript
- Backend: Node.js
- AWS Services: [使用するAWSサービスを記載]

## セットアップ
``````bash
npm install
npm run dev
``````

## デプロイ
``````bash
npm run deploy
``````

## 学習ポイント
- [ ] 学習項目1
- [ ] 学習項目2
- [ ] 学習項目3

## 参考リンク
- [参考リンクを追加]

---
Created: $(Get-Date -Format "yyyy-MM-dd HH:mm")
Week: $weekNumber
"@

$readmeContent | Out-File -FilePath "$projectPath/README.md" -Encoding UTF8

# package.json を作成
$packageJson = @"
{
  "name": "day-$dayFormatted-$ProjectName",
  "version": "1.0.0",
  "description": "Day $DayNumber : $ProjectName",
  "scripts": {
    "dev": "echo 'Start development server'",
    "build": "echo 'Build project'",
    "test": "echo 'Run tests'",
    "deploy": "echo 'Deploy to AWS'"
  },
  "author": "",
  "license": "MIT"
}
"@

$packageJson | Out-File -FilePath "$projectPath/package.json" -Encoding UTF8

# index.html を作成
$indexHtml = @"
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Day $DayNumber - $ProjectName</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Day $DayNumber : $ProjectName</h1>
    <p>プロジェクトを開始しましょう！</p>
    <script src="script.js"></script>
</body>
</html>
"@

$indexHtml | Out-File -FilePath "$projectPath/src/frontend/index.html" -Encoding UTF8

# style.css を作成
$cssContent = @"
/* Day $DayNumber - $ProjectName */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f5f5f5;
}

h1 {
    color: #333;
    border-bottom: 2px solid #007bff;
    padding-bottom: 10px;
}
"@

Set-Content -Path "$projectPath/src/frontend/style.css" -Value $cssContent -Encoding UTF8

# script.js を作成
$jsContent = @"
// Day $DayNumber - $ProjectName
console.log('Project started!');
console.log('Day: $DayNumber');
console.log('Project: $ProjectName');
"@

Set-Content -Path "$projectPath/src/frontend/script.js" -Value $jsContent -Encoding UTF8

Write-Host "`n✅ Project created successfully!" -ForegroundColor Green
Write-Host "`n📍 Project location: $projectPath" -ForegroundColor Cyan
Write-Host "`n📝 Next steps:" -ForegroundColor Yellow
Write-Host "  1. cd $projectPath" -ForegroundColor Gray
Write-Host "  2. Update README.md with project details" -ForegroundColor Gray
Write-Host "  3. Start coding!" -ForegroundColor Gray
Write-Host "  4. Commit your changes" -ForegroundColor Gray

# 進捗ログに追記
$logEntry = "`n## Day $DayNumber ($(Get-Date -Format 'yyyy-MM-dd'))`n- Project: $ProjectName`n- Status: Started`n"
try {
    Add-Content -Path "progress/daily-log.md" -Value $logEntry -Encoding UTF8
    Write-Host "`n📊 Progress logged to daily-log.md" -ForegroundColor Green
} catch {
    Write-Host "`n⚠️ Could not update progress log: $_" -ForegroundColor Yellow
}