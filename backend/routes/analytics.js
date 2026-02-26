const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');

// GET /api/analytics - Admin only (basic stats)
router.get('/', async (req, res) => {
    try {
        const [totalProducts, totalCategories, featuredCount, trendingCount] = await Promise.all([
            Product.countDocuments(),
            Category.countDocuments(),
            Product.countDocuments({ isFeatured: true }),
            Product.countDocuments({ isTrending: true })
        ]);

        res.json({ totalProducts, totalCategories, featuredCount, trendingCount });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
