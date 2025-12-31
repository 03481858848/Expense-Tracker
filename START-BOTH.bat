@echo off
title Expense Tracker - Starting Both Servers
color 0E
echo.
echo ========================================
echo  Expense Tracker - Starting Both Servers
echo ========================================
echo.

echo [1/2] Starting Backend API...
start "Expense Tracker Backend" cmd /k "cd /d %~dp0Tracker-API && title Backend API && color 0A && echo Starting Backend... && dotnet run"

echo Waiting 8 seconds for backend to start...
timeout /t 8 /nobreak >nul

echo.
echo [2/2] Starting Frontend...
start "Expense Tracker Frontend" cmd /k "cd /d %~dp0Tracker-Client && title Frontend && color 0B && echo Starting Frontend... && if not exist node_modules (echo Installing dependencies... && call npm install && echo.) && npm run dev"

echo.
echo ========================================
echo  Both servers are starting!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Swagger:  http://localhost:5000/swagger
echo Frontend: http://localhost:5173
echo.
echo Two new windows will open - keep them both open!
echo.
echo Wait for:
echo   - Backend: "Now listening on: http://localhost:5000"
echo   - Frontend: "Local: http://localhost:5173"
echo.
echo Then open http://localhost:5173 in your browser
echo.
pause

