# PowerShell script to start the backend API
Write-Host "Starting Expense Tracker Backend API..." -ForegroundColor Green
Write-Host ""

Set-Location -Path "$PSScriptRoot\Tracker-API"

Write-Host "Building project..." -ForegroundColor Yellow
dotnet build

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Build successful! Starting server..." -ForegroundColor Green
    Write-Host "Backend will be available at: http://localhost:5000" -ForegroundColor Cyan
    Write-Host "Swagger UI will be available at: http://localhost:5000/swagger" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
    Write-Host ""
    
    dotnet run
} else {
    Write-Host "Build failed! Please check the errors above." -ForegroundColor Red
    exit 1
}

