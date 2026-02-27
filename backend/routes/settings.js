const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const auth = require('../middleware/auth');

// Get settings (public)
router.get('/', async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create({ whatsappNumber: '+919876543210' });
        }
        res.json(settings);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Update settings (admin only)
router.put('/', auth, async (req, res) => {
    try {
        const { whatsappNumber, email, address } = req.body;
        let settings = await Settings.findOne();

        if (settings) {
            settings.whatsappNumber = whatsappNumber || settings.whatsappNumber;
            settings.email = email || settings.email;
            settings.address = address || settings.address;
            settings.updatedAt = Date.now();
            await settings.save();
        } else {
            settings = await Settings.create({ whatsappNumber, email, address });
        }

        res.json(settings);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
