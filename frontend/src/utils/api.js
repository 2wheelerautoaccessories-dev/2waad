import axios from 'axios';

const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5001/api').replace(/\/api$/, '');

// ✅ PERMANENT URLS + AUTO-OPTIMIZATION
// Ensures every image served uses Cloudinary's f_auto,q_auto transforms
// so browsers always receive the best format (WebP) at auto quality.
export const getImageUrl = (imgPath) => {
    if (!imgPath) return '';

    // Blob and Data URLs (local previews) — return as-is
    if (imgPath.startsWith('blob:') || imgPath.startsWith('data:')) {
        return imgPath;
    }

    // ✅ Cloudinary URLs — inject f_auto,q_auto if not already present
    if (imgPath.includes('res.cloudinary.com')) {
        if (!imgPath.includes('f_auto') && !imgPath.includes('q_auto')) {
            return imgPath.replace('/upload/', '/upload/f_auto,q_auto/');
        }
        return imgPath;
    }

    // Unsplash images
    if (imgPath.includes('images.unsplash.com')) {
        const separator = imgPath.includes('?') ? '&' : '?';
        return `${imgPath}${separator}auto=format&fit=crop&q=70&w=800`;
    }

    // Other remote URLs
    if (imgPath.startsWith('http')) {
        return imgPath;
    }

    // Local uploads (fallback)
    return `${BASE_URL}${imgPath.startsWith('/') ? '' : '/'}${imgPath}`;
};

const API_CACHE = new Map();
const CACHE_TTL = 30000; // 30 seconds

const API = axios.create({
    baseURL: `${BASE_URL}/api`,
    headers: { 'Content-Type': 'application/json' },
});

// Cache interceptor
API.interceptors.request.use((config) => {
    // Add token
    let token = null;
    try { token = localStorage.getItem('adminToken'); } catch (e) { }
    if (token) config.headers.Authorization = `Bearer ${token}`;

    // Invalidate cache on mutations (POST, PUT, DELETE)
    if (config.method !== 'get') {
        API_CACHE.clear();
    }

    // Cache logic for GET requests only
    if (config.method === 'get' && !config.params?.noCache) {
        const cacheKey = config.url + JSON.stringify(config.params || {});
        const cachedResponse = API_CACHE.get(cacheKey);

        if (cachedResponse && (Date.now() - cachedResponse.timestamp < CACHE_TTL)) {
            // Return cached data
            config.adapter = () => {
                return Promise.resolve({
                    data: cachedResponse.data,
                    status: 200,
                    statusText: 'OK',
                    headers: config.headers,
                    config,
                });
            };
        }
    }

    return config;
});

API.interceptors.response.use(
    (res) => {
        // Store in cache if it's a GET request
        if (res.config.method === 'get' && !res.config.params?.noCache) {
            const cacheKey = res.config.url + JSON.stringify(res.config.params || {});
            API_CACHE.set(cacheKey, {
                data: res.data,
                timestamp: Date.now()
            });
        }
        return res;
    },
    (err) => {
        if (err.response?.status === 401) {
            try { localStorage.removeItem('adminToken'); } catch (e) { }
            window.location.href = '/admin/login';
        }
        return Promise.reject(err);
    }
);

export default API;
