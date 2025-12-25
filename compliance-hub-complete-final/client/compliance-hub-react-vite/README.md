
# ComplianceHub (React + Vite + Tailwind)

A simple **Compliance Management System** with multi-user partitions, CRUD, delete confirmation, Excel/CSV bulk import (append), evidence file selection, and **auto-calculated Next Review** dates.

## Features
- Multi-user data partitioning (demo users: `admin`, `compliance_lead`)
- Add/Edit/Delete records with confirmation
- Excel/CSV Bulk Import via **SheetJS** (appends to current user's dataset)
- Evidence file selection & metadata tracking
- Auto-calculation of Next Review based on Due Date + Frequency
- Fast UI built with React + TailwindCSS

## Quick Start

```bash
# 1) Install dependencies
npm install

# 2) Run dev server
npm run dev

# 3) Open the app
# Vite will print a local URL (usually http://localhost:5173)
```

> Note: The app includes a CDN script for SheetJS (XLSX) in `index.html` so `window.XLSX` is available for the import.

## Project Structure
```
compliance-hub-react-vite/
├─ src/
│  ├─ components/
│  │  ├─ Header.jsx
│  │  ├─ LoginForm.jsx
│  │  ├─ StatsBar.jsx
│  │  ├─ Toolbar.jsx
│  │  ├─ RecordsTable.jsx
│  │  ├─ StatusBadge.jsx
│  │  ├─ EditModal.jsx
│  │  └─ DeleteModal.jsx
│  ├─ styles/
│  │  └─ index.css
│  ├─ App.jsx
│  └─ main.jsx
├─ index.html
├─ package.json
├─ tailwind.config.js
├─ postcss.config.js
├─ vite.config.js
└─ README.md
```
