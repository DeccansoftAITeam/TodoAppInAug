# Todo App

This project contains a single-user Todo application with a FastAPI backend and a React frontend.

## Backend

From the repo root:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Frontend

Open a second terminal and run:

```bash
cd frontend
npm install
npm run dev -- --host 0.0.0.0 --port 5173
```

The frontend will run at http://localhost:5173 and the backend will run at http://localhost:8000.
