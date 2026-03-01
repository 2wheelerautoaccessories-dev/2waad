const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static files for local image uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/public', require('./routes/public'));
app.use('/api/settings', require('./routes/settings'));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: '2waad API is running' });
});

// ONE-TIME ADMIN RESET — remove after use
app.get('/api/reset-admin-2waad-secret', async (req, res) => {
    try {
        const bcrypt = require('bcryptjs');
        const Admin = require('./models/Admin');
        const email = (process.env.ADMIN_EMAIL || 'admin@2waad.com').toLowerCase();
        const password = process.env.ADMIN_PASSWORD || 'admin123';
        await Admin.deleteMany({});
        const hashed = await bcrypt.hash(password, 12);
        await Admin.create({ email, password: hashed, name: '2waad Admin' });
        res.json({ success: true, message: 'Admin reset!', email, passwordUsed: password.slice(0, 3) + '***' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('✅ MongoDB connected');

        // Seed admin user if not exists
        await require('./utils/seedAdmin')();
        // Removed to permanently prevent old sample products from reappearing
        // await require('./utils/seedProducts')();
    })
    .catch(err => console.error('❌ MongoDB connection error:', err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`🚀 2waad server running on port ${PORT}`);
});
