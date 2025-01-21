@echo off
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo Restart with root rights
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit
)

npm start