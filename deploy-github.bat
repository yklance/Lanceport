@echo off
title Publish Portfolio to GitHub Pages
cd /d "%~dp0"

echo ==========================================================
echo   Pushing Lance Portfolio to GitHub (yklance/Lanceport)
echo ==========================================================
echo.
git add .
git commit -m "Update portfolio files" 2>nul
git branch -M main
git remote set-url origin https://github.com/yklance/Lanceport.git

echo Uploading files to GitHub...
echo (If a browser window opens, click "Sign in with your browser" / "Authorize")
echo.
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo [!] Push failed or was canceled.
    echo If GitHub asks for a password, you can use a GitHub Personal Access Token.
) else (
    echo.
    echo ==========================================================
    echo  SUCCESSFULLY UPLOADED!
    echo.
    echo  To activate your live link:
    echo  1. Open: https://github.com/yklance/Lanceport/settings/pages
    echo  2. Under "Branch", select "main" and "/ (root)"
    echo  3. Click "Save"
    echo.
    echo  Your site will be live at:
    echo  https://yklance.github.io/Lanceport/
    echo ==========================================================
)
pause
