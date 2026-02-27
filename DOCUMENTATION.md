# Alpha Strix - Premium E-Commerce Website Documentation

Welcome to the official documentation for **Alpha Strix**, a premium men's fashion and accessories platform. This document outlines the technology stack, project structure, deployment steps, and instructions on how to manage the platform via hosting providers like MongoDB Atlas, Render, and GitHub.

---

## 🚀 1. Technology Stack

### Frontend
- **Framework:** React.js powered by Vite
- **Routing:** React Router DOM
- **Styling:** Custom CSS (with Tailwind CSS utilities)
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **API Communication:** Axios (Custom configured instance pointing to the backend)

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (using Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT) for secure Admin access
- **Image Storage:** Cloudinary (Dynamic fallback to local storage if needed)

---

## 📂 2. Project Structure

The project is divided into two primary directories, `frontend` and `backend`:

```text
alphastrix/
├── backend/
│   ├── middleware/       # JWT Auth logic (auth.js)
│   ├── models/           # MongoDB Schemas (Product, Category, Settings, etc.)
│   ├── routes/           # Express API endpoints (/api/products, /api/settings, etc.)
│   ├── .env              # Backend environment variables
│   └── server.js         # Main server entry file
└── frontend/
    ├── src/
    │   ├── components/   # Reusable UI components (Navbar, Footer, FloatingWhatsApp)
    │   ├── pages/        # Main pages (Home, About, Contact, admin/Dashboard)
    │   ├── utils/        # Utility helpers like Axios configuration (api.js)
    │   ├── App.jsx       # Root React component managing routes
    │   └── index.css     # Global styles and animations
    ├── index.html        # Main HTML file for Vite
    └── vite.config.js    # Vite bundling and build configuration
```

---

## 🛠️ 3. Features & Capabilities

1. **Admin Dashboard:** Fully protected area for the admin to:
   - Add, edit, or delete products and categories.
   - Upload product images dynamically straight to Cloudinary.
   - Flag products as "Trending" or "Featured" for the Homepage.
   - **Dynamic Site Settings:** The admin can change the website's WhatsApp number, physical address, and email directly from the "Settings" tab. These changes instantly reflect on the Footer, Contact Page, About Page, and the Floating WhatsApp Button without editing code.
2. **Dynamic Floating WhatsApp Widget:** A responsive chat widget that auto-updates with the assigned admin phone number.
3. **Public Product Display:** High-performance, clean UI to display clothing, accessories, footwear, etc., with Meesho Affiliate links tied to products.

---

## ☁️ 4. Hosting & Deployment Workflow

### A. Version Control (GitHub)
The entire source code is maintained on GitHub.

**How to save and push your changes:**
Whenever you modify your local code, run the following commands in the terminal from the root folder (`alphastrix/`):

1. **Stage all changes:** `git add .`
2. **Commit your changes:** `git commit -m "Describe what you updated here"`
3. **Push to live repository:** `git push origin main`

*Note: Pushing code to the `main` branch is what triggers updates to your live hosted website (if auto-deploy is configured).*

---

### B. Database Hosting (MongoDB Atlas)
The database containing all your products, categories, and settings is hosted remotely on **MongoDB Atlas**.

**How the Connection Works:**
In your backend's `.env` file, there is a connection string: `MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/alphastrix`
When the backend starts up, it uses Mongoose to ping MongoDB Atlas, allowing the site to securely read and write data to the cloud.

**How to manage your Database via Atlas:**
1. Log in to [MongoDB Atlas](https://account.mongodb.com/).
2. Select your Project/Cluster.
3. Click on the **Browse Collections** button to manually view your data. Here you can see collections like `products`, `settings`, etc.
4. **Network Access Check:** To ensure Render (or your local PC) can connect to the Database, go to the "Network Access" tab in the left sidebar and ensure the IP Address is set to `0.0.0.0/0` (Allow access from anywhere).

---

### C. Web Hosting (Render)
The application is hosted using **Render** (Render.com). Since this is a MERN stack app, you typically have two main hosting avenues:

**1. Hosting Frontend & Backend Separately on Render:**
- **Backend (Web Service):** Handles the API and connects to MongoDB. On Render, it is configured to use the Node environment using the `npm install` and `node server.js` standard commands. Remember to add your `MONGO_URI`, `JWT_SECRET`, and `CLOUDINARY` keys to Render's **Environment Variables** panel.
- **Frontend (Static Site):** Connected directly to your GitHub repository. When you run `git push origin main`, Render looks at the `frontend` folder, automatically runs `npm install` and `npm run build`, and then serves the `dist/` folder to the public.

**2. Updating Frontend Manually (Using the `dist.zip` package):**
If your hosting provider or structure requires you to manually upload the frontend files, the process you use is:
1. Navigate to the frontend directory: `cd frontend`
2. Build the production React files: `npm run build`
3. Package the build folder into a zip: `Compress-Archive -Path dist\* -DestinationPath dist.zip -Force`
4. Use this `dist.zip` to upload to your web host (e.g. Hostinger CPanel, Netlify, or Render Static Pages drop tool).

---

## 📸 5. Image Management (Cloudinary)

Your images are NOT stored in MongoDB natively (which prevents the database from crashing). They are sent to **Cloudinary**, a cloud media hosting platform.

- **How it works:** When the Admin uploads an image in the Dashboard, the Frontend compresses it on the spot and shoots it off to Cloudinary. Cloudinary then hands back a secure link (e.g., `https://res.cloudinary.com/..../image.jpg`).
- **Database Saving:** The backend simply saves this text link string into the product's database record.
- **Environment config:** Ensure your `.env` contains:
  ```env
  VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
  VITE_CLOUDINARY_UPLOAD_PRESET=your_preset_name
  ```

---

## 🔐 6. Local Development Guide

If you ever need to run the application on your computer:

**1. Run Backend Server:**
Open Terminal 1
```bash
cd backend
npm install
npm start (or node server.js)
```
*Note: Make sure your `backend/.env` file exists and has the correct `MONGO_URI`.*

**2. Run Frontend Server:**
Open Terminal 2
```bash
cd frontend
npm install
npm run dev
```

Your React website will now be running live locally on `http://localhost:5173` while talking to the backend running locally on `http://localhost:5000`.

---
*End of Documentation — Generated for Alpha Strix by Antigravity AI*
