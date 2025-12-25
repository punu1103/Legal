
#requires -Version 5
$ErrorActionPreference = 'Stop'
Write-Host "Starting API..."
Start-Process -NoNewWindow -PassThru powershell -ArgumentList "-NoProfile -Command cd server; npm i; npm run dev" | ForEach-Object { $api = $_ }

if (Test-Path 'client/compliance-hub-react-vite') {
  Write-Host "Starting UI..."
  Start-Process -NoNewWindow -PassThru powershell -ArgumentList "-NoProfile -Command cd client/compliance-hub-react-vite; npm i; npm run dev" | ForEach-Object { $ui = $_ }
  Write-Host "API PID: $($api.Id), UI PID: $($ui.Id)"
} else {
  Write-Host "[warn] UI folder client/compliance-hub-react-vite not found. Only API started."
  Write-Host "API PID: $($api.Id)"
}
