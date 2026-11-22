@echo off
title Publish Portfolio to GitHub Pages
cd /d "%~dp0"

echo ==========================================================
echo   Publish Your Portfolio to GitHub Pages (like Verkan's)
echo ==========================================================
echo.
echo If you haven't created a GitHub repository yet:
echo 1. Go to https://github.com/new
echo 2. Name your repository (e.g. "portfolio" or "lance")
echo 3. Set it to Public and DO NOT initialize with README
echo 4. Copy the repository HTTPS link
echo.
set /p REPO="Paste your GitHub repository URL (e.g., https://github.com/yourname/portfolio.git): "

if "%REPO%"=="" (
    echo No repository URL provided. Aborting.
    pause
    exit /b
)

echo.
echo Saving local changes...
git add .
git commit -m "Update portfolio files"

echo Updating git remote...
git remote set-url origin %REPO%
git branch -M main

echo Pushing code to GitHub...
git push -u origin main

echo.
echo ==========================================================
echo  Successfully pushed to GitHub!
echo.
echo  To activate your live link (like verkan's):
echo  1. Open your repository on GitHub
echo  2. Go to "Settings" -^> "Pages" (in the left sidebar)
echo  3. Under "Build and deployment", set Source to "Deploy from a branch"
echo  4. Under "Branch", select "main" and "/ (root)", then click Save
echo.
echo  Your live link will be ready in ~1 minute at:
echo  https://^<your-username^>.github.io/^<repo-name^>/
echo ==========================================================
pause
