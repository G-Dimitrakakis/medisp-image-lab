# Day 2 – End-to-End Demo

## 🎯 Goal of the day

Today we will run a complete demo from browser to backend and back.  
You will upload an image, process it, and see the result in the same page.

## 🧱 What is already prepared

- All Day 2 code is already in this branch.
- You do not need to write code during this session.
- We will only run the app and test the full flow.

## ⚙️ Step-by-step setup

### Backend (Django)

1. Open a terminal and go to the backend folder:
   `cd backend`
2. Activate virtual environment:
   `source ~/.venvs/medisp-image-lab/bin/activate`
3. Install dependencies:
   `pip install -r requirements.txt`
4. Run backend server:
   `python manage.py runserver`

### Frontend (React)

1. Open a second terminal and go to the frontend folder:
   `cd frontend`
2. Install dependencies:
   `npm install`
3. Start frontend:
   `npm start`

## 🌐 Open the application

- Open: `http://localhost:3000`
- You should see a page with:
  - file upload input
  - **Process Image** button
  - two image panels (left and right)

## 🧪 Try the flow

1. Upload an image file.
2. Confirm the original image appears in the **left** panel.
3. Click **Process Image**.
4. Wait briefly while processing runs.
5. Confirm the processed image appears in the **right** panel.

## 🔌 What just happened

- The browser sent your image to the backend API.
- The backend converted the image to grayscale.
- The backend sent back the processed image.
- The frontend received the response.
- The UI updated the right preview panel.

## ✅ Expected result

After each upload and process action:
- Left panel shows the original image.
- Right panel shows the processed grayscale version.
- Both images are visible side by side in the same page.
