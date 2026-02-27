const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');

// ✅ SPEED FIX: GET all data for the Home page in ONE request
// Uses .select() to return ONLY the fields the frontend needs — smaller payload = faster load
router.get('/home', async (req, res) => {
    try {
        const [categories, featuredProducts, trendingProducts] = await Promise.all([
            Category.find().sort({ order: 1 }).select('name slug image order').lean(),
            Product.find({ isFeatured: true })
                .limit(8)
                .sort({ order: 1, createdAt: -1 })
                .select('name price originalPrice images categoryName isFeatured isTrending badge rating meeshoLink')
                .lean(),
            Product.find({ isTrending: true })
                .limit(8)
                .sort({ order: 1, createdAt: -1 })
                .select('name price originalPrice images categoryName isFeatured isTrending badge rating meeshoLink')
                .lean()
        ]);

        res.json({ categories, featuredProducts, trendingProducts });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
