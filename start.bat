@echo off
echo Starting Emergency Ambulance System...
echo.

echo Installing Backend Dependencies...
cd backend
call npm install
echo.

echo Seeding Database...
call node seed.js
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "npm run dev"
echo.

echo Installing Frontend Dependencies...
cd ..\frontend
call npm install
echo.

echo Starting Frontend Application...
start "Frontend App" cmd /k "npm start"
echo.

echo Both services are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
pause