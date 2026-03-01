# 🏍️ 2waad: Backend API (Node.js & Express)

The backend server for **2waad** is a high-performance REST API designed for efficiency, security, and smart media handling. It powers the two-wheeler accessories e-commerce platform at 2waad.com.

## 🚀 Key Technologies
- **Node.js & Express:** Lightweight, fast, and scalable API architecture.
- **MongoDB & Mongoose:** Flexible data management with strict schema validation (database: `2waad`).
- **Cloudinary:** Automatic media optimization and CDN integration (folder: `2waad`).
- **JWT & Bcrypt:** Secure, encrypted admin authentication and session management.

## 📁 Key Directories
- `/middleware`: Security guards for sensitive admin routes.
- `/models`: Database schemas for Products, Categories, and Settings.
- `/routes`: Clearly defined API endpoints.
- `/utils`: Critical tools for Cloudinary sync and initial data seeding.

## 🛠️ Local Development
1. Create a `.env` file (see root documentation).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   *For development with auto-restart:* `npm run dev`

## 💎 Advanced Features
- **Smart Image Sync:** Automatically intercepts local uploads and redirects them to Cloudinary (`2waad/` folder).
- **Seeding Lock:** Permanently prevents sample data from overriding your production data.
- **Lean Queries:** Optimized MongoDB calls for minimal server latency.

## 🌍 Production
- **Service Name on Render:** `2waad-backend`
- **API Base URL:** `https://2waad-backend.onrender.com/api`
- **Admin Email:** `admin@2waad.com`

---
*For the full project documentation, check the root `README.md`.*
