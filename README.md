# medisp-image-lab

Day 2 demo: a minimal end-to-end image processing app with a React frontend and Django REST backend.

## What this demo does

- Upload an image from the browser
- Show the original image in the left panel
- Send the file to `POST /api/process-image/`
- Convert image to grayscale in the backend (Pillow)
- Return JSON with base64 image
- Show processed image in the right panel

Response format from backend:

```json
{
  "image": "<base64_string>"
}
```

## Project structure

- `backend/`: Django + DRF API
- `frontend/`: React app (single `App.js` for Day 2 clarity)

## One-time setup

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
```

### Frontend

Open a second terminal:

```bash
cd frontend
npm install
```

## Run commands (seminar flow)

### 1) Start backend

```bash
cd backend
source .venv/bin/activate
python manage.py runserver
```

### 2) Start frontend

In a second terminal:

```bash
cd frontend
npm start
```

## Open in browser

- Frontend: `http://localhost:3000`
- Backend API via frontend proxy: `/api/process-image/`

## Expected behavior

1. Select an image file.
2. The original image appears in the left panel.
3. Click **Process Image**.
4. Button shows loading state (`Processing...`).
5. Grayscale result appears in the right panel.

Notes:
- The **Process Image** button is disabled until a file is selected.
- CRA proxy is configured, so no CORS setup is required for this demo.
