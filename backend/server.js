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

// ONE-TIME: Seed categories + WhatsApp setting
app.get('/api/seed-2waad-data', async (req, res) => {
    try {
        const Category = require('./models/Category');
        const Settings = require('./models/Settings');

        const cats = [
            { name: 'Helmets', slug: 'helmets', order: 1 },
            { name: 'Riding Gloves', slug: 'riding-gloves', order: 2 },
            { name: 'Riding Jackets', slug: 'riding-jackets', order: 3 },
            { name: 'Bike Covers', slug: 'bike-covers', order: 4 },
            { name: 'Mirrors', slug: 'mirrors', order: 5 },
            { name: 'Lights & LEDs', slug: 'lights-leds', order: 6 },
            { name: 'Grips & Handlebars', slug: 'grips-handlebars', order: 7 },
            { name: 'Locks & Security', slug: 'locks-security', order: 8 },
            { name: 'Phone Mounts', slug: 'phone-mounts', order: 9 },
            { name: 'Luggage & Bags', slug: 'luggage-bags', order: 10 },
            { name: 'Cleaning & Care', slug: 'cleaning-care', order: 11 },
            { name: 'Stickers & Decals', slug: 'stickers-decals', order: 12 },
        ];

        let created = 0;
        for (const cat of cats) {
            const exists = await Category.findOne({ slug: cat.slug });
            if (!exists) { await Category.create(cat); created++; }
        }

        // Seed settings with WhatsApp number
        let settings = await Settings.findOne();
        if (!settings) {
            await Settings.create({
                whatsappNumber: '+919876543210',
                email: 'contact@2waad.com',
                address: 'Tarnaka, Hyderabad,\nTelangana, 500007'
            });
        }

        const total = await Category.countDocuments();
        res.json({ success: true, created, total, message: 'Remove this endpoint after use.' });
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
