const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    whatsappNumber: {
        type: String,
        default: '+919876543210'
    },
    email: {
        type: String,
        default: 'contact@2waad.com'
    },
    address: {
        type: String,
        default: 'Tarnaka, Hyderabad,\nTelangana, 500007'
    },
    hasSeeded: {
        type: Boolean,
        default: false
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Settings', settingsSchema);
