@echo off
title Expense Tracker Frontend
color 0B
echo.
echo ========================================
echo   Expense Tracker Frontend
echo ========================================
echo.

cd /d "%~dp0Tracker-Client"

echo [1/2] Checking Node.js installation...
node --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js not found!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo OK - Node.js is installed
echo.

echo [2/2] Installing dependencies (if needed)...
if not exist node_modules (
    echo Installing npm packages...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: npm install failed!
        pause
        exit /b 1
    )
    echo OK - Dependencies installed
) else (
    echo OK - Dependencies already installed
)
echo.

echo ========================================
echo   FRONTEND STARTING...
echo ========================================
echo.
echo Frontend URL: http://localhost:5173
echo.
echo IMPORTANT: Make sure backend is running on http://localhost:5000
echo Keep this window open!
echo.
echo ========================================
echo.

npm run dev

pause

