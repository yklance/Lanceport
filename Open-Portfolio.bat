@echo off
title Lance Portfolio - Local Server
cd /d "%~dp0"
echo Starting local portfolio server...
start "" http://localhost:8080/
powershell -ExecutionPolicy Bypass -File ".\server.ps1" -Port 8080
