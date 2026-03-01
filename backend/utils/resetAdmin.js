/**
 * One-time admin password reset script.
 * Run with: node utils/resetAdmin.js
 * This DELETES and RE-CREATES the admin record to ensure the password matches .env
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const Admin = require('../models/Admin');

async function resetAdmin() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected');

        const email = (process.env.ADMIN_EMAIL || 'admin@2waad.com').toLowerCase();
        const password = process.env.ADMIN_PASSWORD || 'admin123';

        // Delete any existing admin records
        const deleted = await Admin.deleteMany({});
        console.log(`🗑️  Deleted ${deleted.deletedCount} old admin record(s)`);

        // Hash the password
        const hashed = await bcrypt.hash(password, 12);

        // Create fresh admin
        await Admin.create({ email, password: hashed, name: '2waad Admin' });

        console.log('');
        console.log('✅ Admin account reset successfully!');
        console.log('─────────────────────────────────────');
        console.log(`   Email    : ${email}`);
        console.log(`   Password : ${password}`);
        console.log('─────────────────────────────────────');
        console.log('You can now log in at /admin/login');

    } catch (err) {
        console.error('❌ Reset failed:', err.message);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

resetAdmin();
