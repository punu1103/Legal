
# Compliance Hub – COMPLETE FINAL (MongoDB, No Docker, No Git)

This ZIP contains **everything** you need:
- Full backend API (Express + TypeScript + Mongoose, JWT, policies/tasks/documents, uploads)
- Client env file ready (`client/compliance-hub-react-vite/.env`)
- One-command run scripts for Windows and macOS/Linux
- Postman collection

> You only need to **drop your UI** folder `compliance-hub-react-vite` into `client/` (or replace the placeholder folder).

## Quick Start

1) **Place your UI**
   - Copy your repo folder `compliance-hub-react-vite/` into `client/` (replace the placeholder if you want).
   - Ensure `client/compliance-hub-react-vite/.env` contains:
     ```
     VITE_API_BASE_URL=http://localhost:8080
     ```

2) **Start API**
```bash
cd server
cp .env.example .env   # already provided; edit MONGO_URI later for persistence
npm i
npm run dev            # API at http://localhost:8080
```

3) **(Optional) Seed demo data**
```bash
npm run seed
```
Default login:
```
email: admin@example.com
password: admin123
```

4) **Start your UI**
```bash
cd ../client/compliance-hub-react-vite
npm i
npm run dev            # usually http://localhost:5173
```

## One-command run (optional)
- Windows: run `./run-dev.ps1` from the ZIP root.
- macOS/Linux: run `chmod +x run-dev.sh && ./run-dev.sh` from the ZIP root.

## API endpoints
- Health: `GET /api/health`
- Auth: `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/refresh`
- Policies: CRUD + detail
- Tasks: list/create/update status
- Documents: list/upload (multipart `file`)

## Notes
- If `server/.env` keeps `MONGO_URI` empty, API uses **in-memory MongoDB** for dev.
- To persist data later: set `MONGO_URI=mongodb://localhost:27017/compliance` or Atlas.

MIT License
