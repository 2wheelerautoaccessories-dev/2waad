const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with new credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Extracts the public_id from a full Cloudinary URL.
 * e.g. https://res.cloudinary.com/dotyywlqu/image/upload/v1234567/alphastrix/abc123.webp
 * → alphastrix/abc123
 */
const getPublicId = (url) => {
    if (!url || !url.includes('res.cloudinary.com')) return null;
    try {
        // Remove everything up to and including /upload/
        const afterUpload = url.split('/upload/')[1];
        if (!afterUpload) return null;
        // Remove version segment (v1234567/) if present
        const withoutVersion = afterUpload.replace(/^v\d+\//, '');
        // Remove file extension
        const publicId = withoutVersion.replace(/\.[^.]+$/, '');
        return publicId;
    } catch {
        return null;
    }
};

/**
 * Deletes one or more Cloudinary images by their URLs.
 * Silently skips non-Cloudinary or invalid URLs.
 * @param {string | string[]} urls - Single URL or array of URLs
 */
const deleteImages = async (urls) => {
    if (!urls) return;
    const urlList = Array.isArray(urls) ? urls : [urls];

    for (const url of urlList) {
        const publicId = getPublicId(url);
        if (!publicId) continue;
        try {
            await cloudinary.uploader.destroy(publicId);
            console.log(`🗑️  Cloudinary: deleted ${publicId}`);
        } catch (err) {
            console.warn(`⚠️  Cloudinary: could not delete ${publicId}:`, err.message);
        }
    }
};

/**
 * Uploads a local file to Cloudinary.
 * @param {string} localPath - Path to the local file
 * @returns {Promise<string|null>} - Optimized Cloudinary URL or null on failure
 */
const uploadToCloudinary = async (localPath) => {
    if (!localPath) return null;
    try {
        const result = await cloudinary.uploader.upload(localPath, {
            folder: 'alphastrix',
            resource_type: 'auto'
        });

        // Return URL with optimization transforms
        return result.secure_url.replace('/upload/', '/upload/f_auto,q_auto/');
    } catch (err) {
        console.error('Cloudinary backend upload error:', err);
        return null;
    }
};

module.exports = { cloudinary, deleteImages, uploadToCloudinary };
