# PowerShell script to start the frontend
Write-Host "Starting Expense Tracker Frontend..." -ForegroundColor Green
Write-Host ""

Set-Location -Path "$PSScriptRoot\Tracker-Client"

if ((-not (Test-Path "node_modules")) -or (-not (Test-Path "package-lock.json"))) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host ""
}

Write-Host "Starting development server..." -ForegroundColor Yellow
Write-Host "Frontend will be available at: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Make sure the backend is running on http://localhost:5000" -ForegroundColor Yellow
Write-Host ""

npm run dev

