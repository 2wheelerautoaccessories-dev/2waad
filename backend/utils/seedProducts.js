const Category = require('../models/Category');
const Product = require('../models/Product');
const Settings = require('../models/Settings');

module.exports = async function seedProducts() {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create({});
        }

        // Create categories for two-wheeler accessories
        const cats = [
            { name: 'Helmets', slug: 'helmets', description: 'Certified protective headgear for riders', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=500', order: 1 },
            { name: 'Riding Gloves', slug: 'riding-gloves', description: 'Premium gloves for grip and protection', image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=500', order: 2 },
            { name: 'Riding Jackets', slug: 'riding-jackets', description: 'Abrasion-resistant jackets for safety', image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=500', order: 3 },
            { name: 'Bike Covers', slug: 'bike-covers', description: 'Weatherproof protection for your bike', image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=500', order: 4 },
            { name: 'Mirrors', slug: 'mirrors', description: 'Custom and replacement rear-view mirrors', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=500', order: 5 },
            { name: 'Lights & LEDs', slug: 'lights-leds', description: 'High-visibility LED lights and fog lamps', image: 'https://images.unsplash.com/photo-1544919982-b61976f0ba43?q=80&w=500', order: 6 },
            { name: 'Grips & Handlebars', slug: 'grips-handlebars', description: 'Ergonomic grips and custom handlebars', image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=500', order: 7 },
            { name: 'Locks & Security', slug: 'locks-security', description: 'Durable disc locks and chain security', image: 'https://images.unsplash.com/photo-1558618047-3d2e2d2a7d48?q=80&w=500', order: 8 },
            { name: 'Phone Mounts', slug: 'phone-mounts', description: 'Secure handlebar mounts for navigation', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=500', order: 9 },
            { name: 'Luggage & Bags', slug: 'luggage-bags', description: 'Tail bags, tank bags, and saddlebags', image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?q=80&w=500', order: 10 },
            { name: 'Cleaning & Care', slug: 'cleaning-care', description: 'Chain lubes, polishes, and microfiber cloths', image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=500', order: 11 },
            { name: 'Stickers & Decals', slug: 'stickers-decals', description: 'Reflective and decorative vinyl decals', image: 'https://images.unsplash.com/photo-1558980395-be9a5e7e2e9a?q=80&w=500', order: 12 },
        ];

        const createdCats = {};
        for (const cat of cats) {
            const existing = await Category.findOne({ slug: cat.slug });
            createdCats[cat.slug] = existing || await Category.create(cat);
        }

        if (settings.hasSeeded) {
            return;
        }

        // Sample products for 2waad
        const products = [
            {
                name: 'Steel-Series Full Face Helmet', description: 'DOT certified aerodynamic full-face helmet with dual visor and anti-fog coating',
                price: 2490, originalPrice: 4990, category: createdCats['helmets']._id, categoryName: 'Helmets',
                meeshoLink: 'https://www.meesho.com/helmet/p/1',
                isFeatured: true, isTrending: true, badge: 'Best Seller', rating: 4.9, order: 1,
                images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'],
                tags: ['helmet', 'safety', 'riding']
            },
            {
                name: 'Pro-Grip Carbon Riding Gloves', description: 'Touch-sensitive carbon fiber knuckles riding gloves for maximum protection and comfort',
                price: 850, originalPrice: 1500, category: createdCats['riding-gloves']._id, categoryName: 'Riding Gloves',
                meeshoLink: 'https://www.meesho.com/gloves/p/2',
                isFeatured: true, isTrending: false, badge: 'Premium', rating: 4.7, order: 2,
                images: ['https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=800'],
                tags: ['gloves', 'protection', 'leather']
            }
        ];

        await Product.insertMany(products);
        await Settings.findByIdAndUpdate(settings._id, { hasSeeded: true });

        console.log(`✅ ${products.length} 2waad sample products seeded`);
    } catch (err) {
        console.error('Products seed error:', err);
    }
};
