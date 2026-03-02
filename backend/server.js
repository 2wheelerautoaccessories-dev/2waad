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

// ONE-TIME: Add 2 new categories
app.get('/api/seed-new-cats', async (req, res) => {
    try {
        const Category = require('./models/Category');
        const newCats = [
            { name: 'Lubricants', slug: 'lubricants', order: 13 },
            { name: 'General & OE Spares', slug: 'general-oe-spares', order: 14 },
        ];
        let created = 0;
        for (const cat of newCats) {
            const exists = await Category.findOne({ slug: cat.slug });
            if (!exists) { await Category.create(cat); created++; }
        }
        const total = await Category.countDocuments();
        res.json({ success: true, created, total });
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
    })
    .catch(err => console.error('❌ MongoDB connection error:', err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`🚀 2waad server running on port ${PORT}`);
});
