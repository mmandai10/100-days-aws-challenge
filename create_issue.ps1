$headers = @{
    "Accept" = "application/vnd.github.v3+json"
}

$body = Get-Content -Path "c:\100-days-aws-challenge\issue_body.json" -Raw -Encoding UTF8

try {
    $response = Invoke-RestMethod -Uri "https://api.github.com/repos/mmandai10/100-days-aws-challenge/issues" -Method Post -Headers $headers -Body $body -ContentType "application/json; charset=utf-8"
    Write-Host "Issue が正常に作成されました！" -ForegroundColor Green
    Write-Host "Issue #$($response.number): $($response.title)" -ForegroundColor Yellow
    Write-Host "URL: $($response.html_url)" -ForegroundColor Blue
} catch {
    Write-Host "エラー: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "ステータスコード: $statusCode" -ForegroundColor Red
        if ($statusCode -eq 401) {
            Write-Host "認証が必要です。GitHub Personal Access Token を設定してください。" -ForegroundColor Yellow
            Write-Host "環境変数 GITHUB_TOKEN を設定するか、ヘッダーに Authorization を追加してください。" -ForegroundColor Yellow
        }
    }
}

