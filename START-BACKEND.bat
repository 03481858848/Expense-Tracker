@echo off
title Expense Tracker Backend API
color 0A
echo.
echo ========================================
echo   Expense Tracker Backend API
echo ========================================
echo.

cd /d "%~dp0Tracker-API"

echo [1/3] Checking .NET installation...
dotnet --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: .NET SDK not found!
    echo Please install .NET 9.0 SDK from https://dotnet.microsoft.com/download
    pause
    exit /b 1
)
echo OK - .NET is installed
echo.

echo [2/3] Building project...
dotnet build >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Build failed!
    echo Running build with output...
    dotnet build
    pause
    exit /b 1
)
echo OK - Build successful
echo.

echo [3/3] Starting server...
echo.
echo ========================================
echo   SERVER STARTING...
echo ========================================
echo.
echo Backend URL: http://localhost:5000
echo Swagger UI:  http://localhost:5000/swagger
echo.
echo IMPORTANT: Keep this window open!
echo Press Ctrl+C to stop the server
echo.
echo ========================================
echo.

dotnet run

pause

