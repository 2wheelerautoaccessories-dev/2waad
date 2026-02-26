const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');

// GET all data for the Home page in ONE request to save time
router.get('/home', async (req, res) => {
    try {
        const [categories, featuredProducts, trendingProducts] = await Promise.all([
            Category.find().sort({ order: 1 }),
            Product.find({ isFeatured: true }).limit(8).sort({ createdAt: -1 }),
            Product.find({ isTrending: true }).limit(4).sort({ createdAt: -1 })
        ]);

        res.json({
            categories,
            featuredProducts,
            trendingProducts
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
