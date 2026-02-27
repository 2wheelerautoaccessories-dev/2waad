const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const { deleteImages, uploadToCloudinary } = require('../utils/cloudinary');

// Local storage setup as fallback (used only if Cloudinary is not configured)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`);
    }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// GET /api/products - Public
router.get('/', async (req, res) => {
    try {
        const { category, featured, trending, search, minPrice, maxPrice, sort, page = 1, limit = 20 } = req.query;
        const query = {};

        if (category) query.categoryName = { $regex: category, $options: 'i' };
        if (featured === 'true') query.isFeatured = true;
        if (trending === 'true') query.isTrending = true;
        if (search) query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { tags: { $in: [new RegExp(search, 'i')] } }
        ];
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        let sortOption = { order: 1, createdAt: -1 };
        if (sort === 'price_asc') sortOption = { price: 1 };
        if (sort === 'price_desc') sortOption = { price: -1 };
        if (sort === 'newest') sortOption = { createdAt: -1 };

        const skip = (Number(page) - 1) * Number(limit);
        const total = await Product.countDocuments(query);
        const products = await Product.find(query)
            .populate('category', 'name slug')
            .sort(sortOption)
            .skip(skip)
            .limit(Number(limit));

        res.json({ products, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /api/products/:id - Public
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category', 'name slug');
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/products - Admin only
router.post('/', auth, upload.array('images', 5), async (req, res) => {
    try {
        const { name, description, price, originalPrice, categoryId, categoryName, meeshoLink, tags, isFeatured, isTrending, badge, rating, order } = req.body;

        // Handle images
        let images = [];

        // 1. Process files uploaded directly to backend
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const cloudinaryUrl = await uploadToCloudinary(file.path);
                if (cloudinaryUrl) {
                    images.push(cloudinaryUrl);
                    // Cleanup local file
                    fs.unlink(file.path, (err) => { if (err) console.error('Local file cleanup error:', err); });
                }
            }
        }

        // 2. Process URLs sent from frontend (already on Cloudinary)
        if (req.body.images) {
            const bodyImages = typeof req.body.images === 'string' ? JSON.parse(req.body.images) : req.body.images;
            const remoteImages = bodyImages.filter(img => typeof img === 'string' && img.startsWith('http'));
            images = [...images, ...remoteImages];
        }

        const product = new Product({
            name, description,
            price: Number(price),
            originalPrice: Number(originalPrice) || 0,
            category: categoryId,
            categoryName,
            images,
            meeshoLink,
            tags: tags ? (typeof tags === 'string' ? JSON.parse(tags) : tags) : [],
            isFeatured: isFeatured === 'true' || isFeatured === true,
            isTrending: isTrending === 'true' || isTrending === true,
            badge: badge || '',
            rating: Number(rating) || 4.5,
            order: Number(order) || 0
        });

        await product.save();
        res.status(201).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT /api/products/:id - Admin only
// ✅ SMART CLEANUP: Deletes old Cloudinary image when a new one is uploaded
router.put('/:id', auth, upload.array('images', 5), async (req, res) => {
    try {
        const { name, description, price, originalPrice, categoryId, categoryName, meeshoLink, tags, isFeatured, isTrending, inStock, badge, rating, order } = req.body;
        const updateData = { name, description, meeshoLink, badge };

        if (price !== undefined) updateData.price = Number(price);
        if (originalPrice !== undefined) updateData.originalPrice = Number(originalPrice);
        if (categoryId) updateData.category = categoryId;
        if (categoryName) updateData.categoryName = categoryName;
        if (tags) updateData.tags = typeof tags === 'string' ? JSON.parse(tags) : tags;
        if (isFeatured !== undefined) updateData.isFeatured = isFeatured === 'true' || isFeatured === true;
        if (isTrending !== undefined) updateData.isTrending = isTrending === 'true' || isTrending === true;
        if (inStock !== undefined) updateData.inStock = inStock === 'true' || inStock === true;
        if (rating !== undefined) updateData.rating = Number(rating);
        if (order !== undefined) updateData.order = Number(order);

        // Process images
        let finalImages = null;

        // 1. Process files uploaded to backend
        if (req.files && req.files.length > 0) {
            finalImages = [];
            for (const file of req.files) {
                const cloudinaryUrl = await uploadToCloudinary(file.path);
                if (cloudinaryUrl) {
                    finalImages.push(cloudinaryUrl);
                    fs.unlink(file.path, (err) => { if (err) console.error('Cleanup error:', err); });
                }
            }
        }

        // 2. Process existing or frontend-uploaded URLs
        if (req.body.images) {
            const bodyImages = typeof req.body.images === 'string' ? JSON.parse(req.body.images) : req.body.images;
            const remoteImages = bodyImages.filter(img => typeof img === 'string' && img.startsWith('http'));
            finalImages = finalImages ? [...finalImages, ...remoteImages] : remoteImages;
        }

        if (finalImages) {
            // ✅ SMART CLEANUP: fetch old product and delete old Cloudinary images
            const oldProduct = await Product.findById(req.params.id);
            if (oldProduct && oldProduct.images && oldProduct.images.length > 0) {
                const oldUrls = oldProduct.images.filter(img => img && img.includes('res.cloudinary.com'));
                const newUrls = finalImages.filter(img => img && img.includes('res.cloudinary.com'));
                // Only delete images that are not being kept
                const toDelete = oldUrls.filter(url => !newUrls.includes(url));
                if (toDelete.length > 0) {
                    deleteImages(toDelete).catch(err => console.warn('Cloudinary cleanup error:', err));
                }
            }
            updateData.images = finalImages;
        }

        const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT /api/products/admin/reorder - Admin only
router.put('/admin/reorder', auth, async (req, res) => {
    try {
        const { items } = req.body;
        await Promise.all(items.map(item => Product.findByIdAndUpdate(item.id, { order: item.order })));
        res.json({ message: 'Reordered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE /api/products/:id - Admin only
// ✅ SMART CLEANUP: Deletes all associated Cloudinary images when a product is deleted
router.delete('/:id', auth, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        // ✅ Delete all Cloudinary images for this product (fire and forget)
        if (product.images && product.images.length > 0) {
            const cloudinaryImages = product.images.filter(img => img && img.includes('res.cloudinary.com'));
            if (cloudinaryImages.length > 0) {
                deleteImages(cloudinaryImages).catch(err => console.warn('Cloudinary cleanup on delete error:', err));
            }
        }

        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
