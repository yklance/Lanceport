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
git push origin main

echo.
echo ==========================================================
echo  UPDATES PUSHED!
echo  Your live changes will appear in ~1 minute at:
echo  https://yklance.github.io/Lanceport/
echo ==========================================================
pause
