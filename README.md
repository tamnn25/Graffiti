**FastAPI + ReactJS full-stack project** (AI Graffiti & Plants Store).

It includes setup instructions for both backend and frontend, project structure, and tips for deployment.

---

## 🧠 AI Graffiti & Plants Store

A full-stack web app built with **FastAPI** (backend) and **ReactJS** (frontend).
Users can:

* Generate graffiti art using AI 🖌️
* Browse & buy plants 🪴
* Chat publicly 💬
* View product details in 360°

---

### 🗂️ Project Structure

```
ai-graffiti-plants/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── routers/
│   │   ├── users.py
│   │   ├── products.py
│   │   └── sketch.py
│   └── static/ or uploads/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── enums.js
│   │   │   └── productApi.js
│   │   ├── components/
│   │   │   ├── ChatConsole.js
│   │   │   ├── ECommerce/
│   │   │   │   ├── ProductCard.js
│   │   │   │   ├── ProductList.js
│   │   │   │   └── ProductDetail.js
│   │   ├── pages/
│   │   │   ├── HomePage.js
│   │   │   ├── LoginPage.js
│   │   │   └── AiSketchPage.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── public/
│
└── README.md
```

---

## ⚙️ Backend (FastAPI)

### 1️⃣ Install dependencies

```bash
cd backend
python -m venv venv
source venv/bin/activate   # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

### 2️⃣ Run the server

```bash
uvicorn main:app --reload
```

### 3️⃣ Example API routes

| Route                    | Method | Description                           |
| ------------------------ | ------ | ------------------------------------- |
| `/api/users`             | GET    | Get all users                         |
| `/api/add_user`          | POST   | Add new user                          |
| `/api/products`          | GET    | Get all products                      |
| `/api/products/{id}`     | GET    | Get product by ID                     |
| `/api/remove_background` | POST   | Remove background from uploaded image |
| `/api/sketch`            | POST   | Generate graffiti image               |

---

## 🖥️ Frontend (ReactJS)

### 1️⃣ Install dependencies

```bash
cd frontend
npm install
```

### 2️⃣ Run the development server

```bash
npm start
```

The React app will start on [http://localhost:3000](http://localhost:3000).

---

## 🔗 Connecting Frontend & Backend

In your frontend’s `src/api/enums.js`, make sure to set your backend base URL:

```javascript
export const BASE_URL = "http://localhost:8000/api";

export const ENDPOINTS = {
  GET_PRODUCTS: `${BASE_URL}/products`,
  ADD_PRODUCT: `${BASE_URL}/add_product`,
  REMOVE_BACKGROUND: `${BASE_URL}/remove_background`,
};
```

---

## 🧩 Features

✅ **AI Graffiti Generator** – Upload an image and transform it into graffiti-style art.
✅ **E-Commerce for Plants** – Browse, view details, and add to cart.
✅ **Public Chat** – Real-time simple chat console for users.
✅ **Product 360° Viewer** – Simulated product rotation using multiple frames.
✅ **User Login System** – Basic authentication (future-ready for JWT).

---

## 🪄 Generate 360° Product Images (Optional)

If you want to simulate a 360° view for products with only one image,
run this Python script (in backend or separate folder):

```bash
python generate_360_images.py
```

Example:

```python
from PIL import Image
import os

img = Image.open("product.png").convert("RGBA")
os.makedirs("360_images", exist_ok=True)
for i in range(36):
    rotated = img.rotate(i * 10, expand=True)
    rotated.save(f"360_images/product_{i+1}.png")
```

Then place them in:

```
frontend/public/products/{id}/360/
```

---

## 🚀 Deployment Guide

### 🖥️ Frontend Build

```bash
cd frontend
npm run build
```

Then deploy the `build/` folder to **Vercel**, **Netlify**, or any static host.

### 🧠 Backend Deployment

You can deploy the FastAPI app to:

* **Render**
* **Railway**
* **AWS EC2 / Lightsail**
* **Docker + Nginx**

Example (with Uvicorn + Gunicorn):

```bash
gunicorn -k uvicorn.workers.UvicornWorker main:app
```

---

## 💾 Example `.env` (optional)

```
BACKEND_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
DATABASE_URL=sqlite:///./db.sqlite3
```

---

## 🧑‍💻 Authors

* **You** – Full Stack Developer
* **AI Graffiti Helper (GPT-5)** – Assistant for code generation

---

## 📜 License

MIT License © 2025

---

Would you like me to make this README **auto-generate install commands and API docs from FastAPI’s `/docs`** when deployed (so it stays up to date)?
I can add that section automatically.
