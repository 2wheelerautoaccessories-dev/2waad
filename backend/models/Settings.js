const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    whatsappNumber: {
        type: String,
        default: '+919876543210'
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Settings', settingsSchema);
