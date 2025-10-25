@echo off
title Astolfo Depot Manager - Updater
color 0A

echo ==========================================
echo  Astolfo Depot Manager - Quick Update
echo ==========================================
echo.

echo [1/4] Fetching latest changes from GitHub...
git fetch origin
if %errorlevel% neq 0 (
    echo ERROR: Failed to fetch updates!
    echo Make sure you have internet connection.
    pause
    exit /b 1
)

echo.
echo [2/4] Pulling latest code...
git pull origin main
if %errorlevel% neq 0 (
    echo ERROR: Failed to pull updates!
    echo You may have local changes. Run 'git stash' first.
    pause
    exit /b 1
)

echo.
echo [3/4] Installing/updating dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies!
    echo Make sure Node.js and npm are installed.
    pause
    exit /b 1
)

echo.
echo [4/4] Update complete!
echo.
echo ==========================================
echo  Successfully updated! 
echo ==========================================
echo.
echo Changes installed:
git log --oneline -5
echo.
echo Press any key to start Astolfo Depot Manager...
pause > nul

echo.
echo Starting application...
npm start
