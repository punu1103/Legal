
#!/usr/bin/env bash
set -euo pipefail

# Start API
(cd server && npm i && npm run dev) &
API_PID=$!

# Start UI if present
if [ -d "client/compliance-hub-react-vite" ]; then
  (cd client/compliance-hub-react-vite && npm i && npm run dev) &
  UI_PID=$!
  wait $API_PID $UI_PID
else
  echo "[warn] UI folder client/compliance-hub-react-vite not found. Only API started."
  wait $API_PID
fi
