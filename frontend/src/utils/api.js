import axios from 'axios';

const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5001/api').replace(/\/api$/, '');

export const getImageUrl = (imgPath) => {
    if (!imgPath) return '';
    if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) return imgPath;
    return `${BASE_URL}${imgPath.startsWith('/') ? '' : '/'}${imgPath}`;
};

const API = axios.create({
    baseURL: `${BASE_URL}/api`,
    headers: { 'Content-Type': 'application/json' },
});

API.interceptors.request.use((config) => {
    let token = null;
    try { token = localStorage.getItem('adminToken'); } catch (e) { }
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

API.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            try { localStorage.removeItem('adminToken'); } catch (e) { }
            window.location.href = '/admin/login';
        }
        return Promise.reject(err);
    }
);

export default API;
