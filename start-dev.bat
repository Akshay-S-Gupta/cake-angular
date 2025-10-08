@echo off
echo Starting Cake Angular Development Environment...
echo.

echo Starting JSON Server on port 3000...
start "JSON Server" cmd /c "npm run json-server"

echo Waiting 3 seconds for JSON server to start...
timeout /t 3 /nobreak > nul

echo Starting Angular Development Server on port 4200...
start "Angular Dev Server" cmd /c "ng serve"

echo.
echo Both servers are starting...
echo JSON Server: http://localhost:3000
echo Angular App: http://localhost:4200
echo.
echo Press any key to exit...
pause > nul
