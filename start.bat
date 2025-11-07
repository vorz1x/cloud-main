@echo off
bun install >nul 2>&1
title cloud backend made by shxrkz.dev
if %errorlevel% neq 0 (
    echo Failed to install dependencies.
    exit /b %errorlevel%
)

bun run src/index.ts
