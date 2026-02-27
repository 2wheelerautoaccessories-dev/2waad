# Alpha Strix - Premium E-Commerce Website Documentation

Welcome to the official documentation for **Alpha Strix**, a premium men's fashion and accessories platform. This document outlines the technology stack, project structure, deployment steps, and instructions on how to manage the platform via hosting providers like MongoDB Atlas, Render, and GitHub.

---

## 🚀 1. Technology Stack

### Frontend
- **Framework:** React.js powered by Vite
- **Routing:** React Router DOM
- **Animations:** Framer Motion (for smooth dropdowns and transitions)
- **Styling:** Custom CSS (with Tailwind CSS utilities)
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **API Communication:** Axios (Custom instance with built-in caching and authorization)

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (using Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT) for secure Admin access
- **Image Storage:** Cloudinary (Automatic synchronization via backend & frontend)

---

## 📂 2. Project Structure

The project is divided into two primary directories, `frontend` and `backend`:

```text
alphastrix/
├── backend/
│   ├── middleware/       # JWT Auth logic (auth.js)
│   ├── models/           # MongoDB Schemas (Product, Category, Settings, etc.)
│   ├── routes/           # Express API endpoints (/api/products, /api/settings, etc.)
│   ├── utils/            # Helper scripts (Cloudinary sync, Admin seeding, Seeding lock)
│   ├── .env              # Backend environment variables
│   └── server.js         # Main server entry file
└── frontend/
    ├── src/
    │   ├── components/   # UI components (Navbar with Dropdown, Footer, ProductCard)
    │   ├── pages/        # Main pages (Home, About, Shop, Admin Dashboard)
    │   ├── utils/        # Axios config (api.js) with Cloudinary optimization
    │   ├── App.jsx       # Root React component managing routes
    │   └── index.css     # Global styles and branding animations
    ├── index.html        # Main HTML file for Vite
    └── vite.config.js    # Vite bundling and build configuration
```

---

## 🛠️ 3. Key Features & Capabilities

1.  **Universal Image Sync (Cloudinary):**
    - Every image uploaded is automatically sent to Cloudinary.
    - **Backend Protection:** Even if an image bypasses the frontend, the backend automatically intercepts it, uploads it to Cloudinary, and deletes the local temporary file.
    - **Permanent URLs:** All images use permanent URLs with `f_auto,q_auto` transformations (WebP) for blazing-fast load times.
2.  **Seeding Lock (Safety Mechanism):**
    - The database has a built-in "hasSeeded" status.
    - This ensures that once you delete sample products or categories, they **never** reappear automatically when the server restarts.
3.  **Premium Navigation:**
    - Consolidated "Collections" dropdown in the Navbar.
    - Supports over 12+ categories including Suits, Blazers, Gym Wear, Hoodies, etc., without cluttering the UI.
4.  **Admin Dashboard:** Fully protected area to:
    - Add, edit, or delete items.
    - Flag products as "Trending" or "Featured".
    - Update site-wide settings (WhatsApp, Email, Address) instantly.
5.  **Performance Optimized:**
    - Uses `.lean()` and `.select()` on the backend to minimize payload sizes.
    - Frontend-side caching for faster page transitions.

---

## ☁️ 4. Hosting & Deployment Workflow

### A. Version Control (GitHub)
The source code is hosted on GitHub.

**How to save and push your changes:**
1. `git add .`
2. `git commit -m "Your description here"`
3. `git push origin main`

*Note: Pushing to `main` triggers auto-deployment on Render.*

---

### B. Database (MongoDB Atlas)
Hosted on MongoDB Atlas.
1. In `.env`, locate `MONGO_URI`.
2. Ensure **Network Access** in Atlas is set to `0.0.0.0/0` to allow Render to connect.

---

### C. Web Hosting (Render)
1.  **Backend:** Create a "Web Service". Add environment variables (`MONGO_URI`, `CLOUDINARY_API_KEY`, etc.) in the Render dashboard.
2.  **Frontend:** Create a "Static Site". Point it to the `frontend` folder and set the build command to `npm run build` and publish directory to `dist`.

**Manual Method (dist.zip):**
If manually hosting:
1. `cd frontend`
2. `npm run build`
3. Use the generated `dist.zip` inside the `frontend` folder to upload to your host.

---

## 📸 5. Image Management

Images are served via Cloudinary. 
- **Upload Folder:** `alphastrix/`
- **Transforms Used:** `f_auto,q_auto` (serves WebP/AVIF automatically based on browser support).

---

## 🔐 6. Local Development

**1. Backend:**
```bash
cd backend
npm install
npm start
```

**2. Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---
*Generated for Alpha Strix — Documentation updated Feb 2024*
