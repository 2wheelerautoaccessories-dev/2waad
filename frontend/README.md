# 🖥️ 2waad: Frontend Architecture (React)

Welcome to the frontend of **2waad** — Two Wheeler Auto Accessories Den. This React application is built on **Vite** for maximum development speed and optimized production performance.

## 🚀 Key Technologies
- **React 19:** Utilizing the latest hooks and concurrent features.
- **Tailwind CSS 4.0:** A powerful, utility-first CSS framework.
- **Framer Motion:** Smooth, hardware-accelerated transitions and interactive elements.
- **Axios:** Centralized API communication with interceptors for auth and image optimization.

## 📁 Key Directories
- `/src/components`: Reusable UI components (Navbar, ProductCard, Footer, FloatingWhatsApp)
- `/src/pages`: Functional page components (Home, Shop, About, Contact, Admin Dashboard)
- `/src/utils`: Helper functions and API configuration.
- `/src/context`: SettingsContext for global site settings.

## 🎨 Design System (Steel Rider)
The **Steel Rider** dark theme uses:
- `#111111` Navy (background), `#000000` Steel (cards), `#C0C0C0` Platinum (accents)
- Fonts: **Outfit** (headings) + **Inter** (body)
- Glassmorphism navbar + Framer Motion animations

## 🛠️ Local Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

## 🌐 Production Ready
The production build is fully optimized, with assets minimized and images served via **Cloudinary's Global CDN** (folder: `2waad`) for sub-second load times.

- **Cloudinary Upload Preset:** `2waad_upload`
- **Production API:** `https://2waad-backend.onrender.com/api`

---
*For the full project documentation, check the root `README.md`.*
