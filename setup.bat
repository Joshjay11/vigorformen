@echo off
echo Installing dependencies...
npm install

echo.
echo Creating .env.local file...
copy .env.local.example .env.local

echo.
echo Setup complete!
echo.
echo To start the development server, run:
echo npm run dev
echo.
echo Then open http://localhost:3000 in your browser.
echo.
echo Press any key to start the development server...
pause > nul
npm run dev
