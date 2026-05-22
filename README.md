# Assignment 3 — Full-Stack MERN Mini App

A complete MERN application — **Notes App** — where a React frontend communicates with an Express backend to **display, add, and delete** notes.

- **Topic chosen:** Notes app (simple text notes with title + content)
- **Frontend:** React 18 + Vite + axios — runs on **port 3000**
- **Backend:** Express + MongoDB + Mongoose — runs on **port 5000**
- **Database:** MongoDB (Atlas or local)

---

## Folder Structure

```
Assignment-3-Full-Stack-MERN-Mini-App/
├── README.md                      ← this file
├── .gitignore
├── backend/                       ← Express + MongoDB (port 5000)
│   ├── .env                       ← secrets (gitignored)
│   ├── .env.example               ← template
│   ├── .gitignore
│   ├── package.json
│   └── src/
│       ├── server.js              ← entry point
│       ├── config/db.js           ← Mongoose connection
│       ├── models/note.model.js   ← Note schema
│       └── routes/note.routes.js  ← 3 API routes
└── frontend/                      ← React + Vite (port 3000)
    ├── .gitignore
    ├── index.html
    ├── package.json
    ├── vite.config.js             ← port 3000 enforced
    └── src/
        ├── main.jsx               ← React entry
        ├── App.jsx                ← main component (state + effects)
        ├── App.css                ← styling
        ├── api.js                 ← axios wrapper
        └── components/
            ├── NoteForm.jsx       ← add-note form
            └── NoteList.jsx       ← list with delete buttons
```

---

## Prerequisites

- **Node.js v18+** — verify with `node --version`
- **MongoDB** — either Atlas (free cloud tier) OR local MongoDB
- A terminal that can open 2 windows side-by-side (or use VS Code split terminal)

---

## Setup (one-time)

### Step 1 — Backend
```powershell
cd backend
npm install
copy .env.example .env
# Edit .env if you want to change MONGO_URI (defaults to local MongoDB)
```

### Step 2 — Frontend
```powershell
cd ../frontend
npm install
```

---

## Run the App (every time)

You need **2 terminals** running in parallel.

### Terminal 1 — Backend
```powershell
cd backend
npm run dev
```
Wait for: `✓ Notes backend running on http://localhost:5000`

### Terminal 2 — Frontend
```powershell
cd frontend
npm run dev
```
Wait for: `Local: http://localhost:3000/`

Open `http://localhost:3000` in your browser.

> If you see "Failed to load notes. Is the backend running?" — make sure **Terminal 1** finished starting before opening the frontend.

---

## API Endpoints

Base URL: `http://localhost:5000`

| Method | Endpoint       | Description       | Body                       | Status |
|--------|----------------|-------------------|----------------------------|--------|
| GET    | /notes         | List all notes    | —                          | 200    |
| POST   | /notes         | Create a new note | `{ title, content }`       | 201    |
| DELETE | /notes/:id     | Delete a note     | —                          | 200    |

### Example POST body
```json
{
  "title": "Buy groceries",
  "content": "Milk, eggs, bread, atta"
}
```

### Example response (POST /notes)
```json
{
  "success": true,
  "data": {
    "_id": "67500a2b9f1c2d3e4f5a6b7c",
    "title": "Buy groceries",
    "content": "Milk, eggs, bread, atta",
    "createdAt": "2026-05-22T10:00:00.000Z",
    "updatedAt": "2026-05-22T10:00:00.000Z"
  },
  "message": "Note created"
}
```

---

## Features Implemented

### Frontend (React)
- ✅ **List view** — fetches all notes on mount via `useEffect` → `GET /notes`
- ✅ **Add form** — title + content fields, submits via `POST /notes`, prepends to list
- ✅ **Delete button** — `✕` icon on each card, confirms then calls `DELETE /notes/:id`
- ✅ **Loading state** — shows "Loading notes…" while initial fetch is in flight
- ✅ **Empty state** — friendly message when list is empty
- ✅ **Error state** — red banner displays API errors (network, validation, etc.)
- ✅ **Optimistic UI** — new notes appear at top instantly without re-fetching the whole list
- ✅ **axios** — used in `src/api.js` as a centralized HTTP client

### Backend (Express)
- ✅ **3 routes** as required (GET all, POST, DELETE)
- ✅ **Mongoose model** with validation (title + content required)
- ✅ **CORS** configured for `http://localhost:3000`
- ✅ **HTTP status codes** — 200, 201, 400, 404, 500
- ✅ **Error handling** — global error middleware + validation error mapping
- ✅ **dotenv** — MongoDB URI loaded from `.env`

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Backend runtime | Node.js (ES modules) |
| Backend framework | Express 4 |
| Database | MongoDB + Mongoose 7 |
| Frontend build tool | Vite 5 |
| Frontend framework | React 18 |
| HTTP client | axios |
| Styling | Plain CSS (no framework) |
| Env management | dotenv |

---

## 5-Minute Walkthrough (for the screen recording)

Read this aloud while sharing your screen + showing the running app:

> **(0:00 – 0:30) Intro**
> "Hi, this is Assignment 3 — a MERN Notes app. The React frontend runs on port 3000 and the Express backend on port 5000. Both connect to MongoDB."

> **(0:30 – 1:30) Project structure**
> "I split the project into two folders — `backend/` and `frontend/`. The backend has `src/server.js` as entry, `db.js` for the MongoDB connection, a `Note` model, and `note.routes.js` with three endpoints. The frontend is Vite + React with `App.jsx` as the main component, two child components — `NoteForm` and `NoteList` — and an `api.js` that wraps axios."

> **(1:30 – 2:30) Backend tour**
> "Express enables CORS for the frontend origin, parses JSON bodies, and mounts three routes: `GET /notes` returns all notes sorted newest first, `POST /notes` creates one and returns 201 with validation, and `DELETE /notes/:id` removes one. Mongoose validation rejects missing fields with a 400 status. MongoDB URI is loaded from .env using dotenv."

> **(2:30 – 3:30) Frontend tour**
> "In `App.jsx`, I keep three pieces of state — `notes`, `loading`, and `error`. On mount, useEffect calls `fetchNotes`. While loading, I show 'Loading notes…'. On error, I show a red banner. The form has its own local state and calls `handleAdd` in the parent, which prepends the new note to the list — no re-fetch needed. Delete uses a confirm dialog and then filters the deleted note out of state."

> **(3:30 – 4:30) Live demo**
> *(show app)* "Let me add a note — type title, content, hit Add. You can see it appears at the top instantly. I'll add two more. Now I'll delete one — it asks for confirmation, then removes the card. If I refresh the page, the notes persist because they're stored in MongoDB. If I try to submit empty fields, the form's required attribute blocks it."

> **(4:30 – 5:00) Wrap-up**
> "Key learnings: keeping frontend and backend in sync without re-fetching after every action, handling loading/empty/error states cleanly, and separating concerns between components, API layer, model, and routes. Total code is under 350 lines across both apps. Thanks."

---

## UI States Handled

| Scenario | What the user sees |
|----------|--------------------|
| Initial page load | "Loading notes…" |
| Empty list (no notes yet) | "No notes yet — add your first one above." |
| API error (backend down, network error) | Red error banner with message |
| Form submission in progress | "Add Note" button changes to "Adding…" and is disabled |
| Successful add | New note appears at top of list (no reload) |
| Delete confirmation | Native `confirm()` dialog |
| Successful delete | Card disappears immediately |

---

## Deliverables (mapped to assignment requirements)

| # | Required | Where / How |
|---|----------|-------------|
| 1 | **GitHub repo with separate frontend/ and backend/ folders** | This whole folder — push to GitHub |
| 2 | **Screen recording showing add + delete** | Record with Loom / OBS / Windows Game Bar (Win+G) — see walkthrough script above |
| 3 | **5-minute walkthrough explanation** | Use the script in section above while recording |

---

## Common Issues & Fixes

| Symptom | Fix |
|---------|-----|
| `CORS error` in browser console | Ensure backend `.env` has `CLIENT_URL=http://localhost:3000` and is restarted |
| `Failed to fetch` / "Failed to load notes" banner | Backend not running. Start it (`npm run dev` in backend folder) |
| `MongooseServerSelectionError` | MongoDB not running locally. Start it or switch to Atlas URI in `.env` |
| Port 3000 already in use | Stop the other process, OR change `port: 3000` in `frontend/vite.config.js` (then update backend `CLIENT_URL`) |
| Port 5000 already in use | Stop the other process (e.g. another Node app), OR change `PORT` in backend `.env` (then update `VITE_API_URL` in frontend env) |
| Add button stays "Adding…" forever | Check Network tab — likely a 400. Make sure both title and content are non-empty |
