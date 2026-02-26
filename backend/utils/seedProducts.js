const Category = require('../models/Category');
const Product = require('../models/Product');

module.exports = async function seedProducts() {
    try {
        const count = await Product.countDocuments();
        if (count > 0) return;

        // Create categories for men's fashion
        const cats = [
            { name: 'T-Shirts', slug: 't-shirts', description: 'Stylish men\'s t-shirts and casual tops', order: 1 },
            { name: 'Shirts', slug: 'shirts', description: 'Formal and casual shirts for men', order: 2 },
            { name: 'Accessories', slug: 'accessories', description: 'Men\'s fashion accessories and essentials', order: 3 },
            { name: 'Footwear', slug: 'footwear', description: 'Stylish men\'s footwear and sneakers', order: 4 },
        ];

        const createdCats = {};
        for (const cat of cats) {
            const existing = await Category.findOne({ slug: cat.slug });
            createdCats[cat.slug] = existing || await Category.create(cat);
        }

        // Sample products for men's wear
        const products = [
            // T-Shirts
            {
                name: 'Oversized Graphic Tee', description: 'Premium oversized graphic t-shirt with bold street-art print, perfect for a casual look',
                price: 399, originalPrice: 799, category: createdCats['t-shirts']._id, categoryName: 'T-Shirts',
                meeshoLink: 'https://www.meesho.com/oversized-graphic-tee/p/1',
                isFeatured: true, isTrending: true, badge: 'Hot', rating: 4.8, order: 1,
                images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'],
                tags: ['oversized', 'graphic', 'streetwear', 'tshirt']
            },
            {
                name: 'Premium Plain Polo T-Shirt', description: 'Classic polo t-shirt in premium cotton blend, great for semi-casual occasions',
                price: 499, originalPrice: 999, category: createdCats['t-shirts']._id, categoryName: 'T-Shirts',
                meeshoLink: 'https://www.meesho.com/polo-tshirt/p/2',
                isFeatured: true, isTrending: false, badge: 'New', rating: 4.6, order: 2,
                images: ['https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500'],
                tags: ['polo', 'classic', 'cotton', 'tshirt']
            },
            {
                name: 'Acid Wash Round Neck Tee', description: 'Trendy acid-wash round neck t-shirt with vintage fade effect – a must-have for streetwear lovers',
                price: 349, originalPrice: 699, category: createdCats['t-shirts']._id, categoryName: 'T-Shirts',
                meeshoLink: 'https://www.meesho.com/acid-wash-tee/p/3',
                isFeatured: false, isTrending: true, badge: 'Sale', rating: 4.4, order: 3,
                images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500'],
                tags: ['acid wash', 'vintage', 'round neck', 'tshirt']
            },
            {
                name: 'Striped Henley Tee', description: 'Classic striped Henley t-shirt in breathable cotton, perfect for summer outings',
                price: 449, originalPrice: 899, category: createdCats['t-shirts']._id, categoryName: 'T-Shirts',
                meeshoLink: 'https://www.meesho.com/striped-henley-tee/p/4',
                isFeatured: true, isTrending: true, badge: 'Trending', rating: 4.5, order: 4,
                images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500'],
                tags: ['striped', 'henley', 'summer', 'tshirt']
            },

            // Shirts
            {
                name: 'Slim Fit Formal Shirt', description: 'Crisp slim-fit formal shirt in premium wrinkle-free fabric, ideal for office and events',
                price: 699, originalPrice: 1399, category: createdCats['shirts']._id, categoryName: 'Shirts',
                meeshoLink: 'https://www.meesho.com/slim-fit-formal-shirt/p/5',
                isFeatured: true, isTrending: false, badge: 'New', rating: 4.7, order: 1,
                images: ['https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500'],
                tags: ['formal', 'slim fit', 'office', 'shirt']
            },
            {
                name: 'Hawaiian Printed Shirt', description: 'Vibrant Hawaiian-print casual shirt for beach parties and weekend getaways',
                price: 599, originalPrice: 1199, category: createdCats['shirts']._id, categoryName: 'Shirts',
                meeshoLink: 'https://www.meesho.com/hawaiian-shirt/p/6',
                isFeatured: true, isTrending: true, badge: 'Hot', rating: 4.8, order: 2,
                images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500'],
                tags: ['hawaiian', 'printed', 'casual', 'beach', 'shirt']
            },
            {
                name: 'Denim Overshirt', description: 'Rugged denim overshirt that doubles as a jacket – layer it over any tee for instant style',
                price: 899, originalPrice: 1799, category: createdCats['shirts']._id, categoryName: 'Shirts',
                meeshoLink: 'https://www.meesho.com/denim-overshirt/p/7',
                isFeatured: false, isTrending: true, badge: 'Trending', rating: 4.6, order: 3,
                images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500'],
                tags: ['denim', 'overshirt', 'layering', 'jacket']
            },
            {
                name: 'Linen Casual Shirt', description: 'Lightweight linen casual shirt – breathable and comfortable for summer and travel',
                price: 749, originalPrice: 1499, category: createdCats['shirts']._id, categoryName: 'Shirts',
                meeshoLink: 'https://www.meesho.com/linen-casual-shirt/p/8',
                isFeatured: true, isTrending: false, badge: '', rating: 4.5, order: 4,
                images: ['https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=500'],
                tags: ['linen', 'casual', 'summer', 'travel']
            },

            // Accessories
            {
                name: 'Leather Bifold Wallet', description: 'Premium genuine leather bifold wallet with multiple card slots and RFID protection',
                price: 499, originalPrice: 999, category: createdCats['accessories']._id, categoryName: 'Accessories',
                meeshoLink: 'https://www.meesho.com/leather-wallet/p/9',
                isFeatured: true, isTrending: true, badge: 'Hot', rating: 4.9, order: 1,
                images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=500'],
                tags: ['wallet', 'leather', 'rfid', 'accessory']
            },
            {
                name: 'Stainless Steel Watch', description: 'Elegant stainless steel chronograph watch with mineral crystal glass – a timeless accessory',
                price: 1299, originalPrice: 2599, category: createdCats['accessories']._id, categoryName: 'Accessories',
                meeshoLink: 'https://www.meesho.com/steel-watch/p/10',
                isFeatured: true, isTrending: true, badge: 'Premium', rating: 4.8, order: 2,
                images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500'],
                tags: ['watch', 'steel', 'chronograph', 'accessory']
            },
            {
                name: 'Canvas Messenger Bag', description: 'Rugged canvas messenger bag with laptop compartment and multiple pockets, great for daily use',
                price: 799, originalPrice: 1599, category: createdCats['accessories']._id, categoryName: 'Accessories',
                meeshoLink: 'https://www.meesho.com/messenger-bag/p/11',
                isFeatured: false, isTrending: true, badge: 'New', rating: 4.6, order: 3,
                images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500'],
                tags: ['bag', 'messenger', 'canvas', 'laptop']
            },
            {
                name: 'Aviator Sunglasses', description: 'Classic gold-frame aviator sunglasses with polarized UV400 lenses – iconic and effortlessly cool',
                price: 399, originalPrice: 799, category: createdCats['accessories']._id, categoryName: 'Accessories',
                meeshoLink: 'https://www.meesho.com/aviator-sunglasses/p/12',
                isFeatured: true, isTrending: false, badge: 'Sale', rating: 4.5, order: 4,
                images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500'],
                tags: ['sunglasses', 'aviator', 'polarized', 'uv400']
            },

            // Footwear
            {
                name: 'Chunky Sole Sneakers', description: 'Bold chunky-sole sneakers in clean white with triple layered soles – make a statement wherever you go',
                price: 1099, originalPrice: 2199, category: createdCats['footwear']._id, categoryName: 'Footwear',
                meeshoLink: 'https://www.meesho.com/chunky-sneakers/p/13',
                isFeatured: true, isTrending: true, badge: 'Hot', rating: 4.8, order: 1,
                images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'],
                tags: ['sneakers', 'chunky', 'streetwear', 'footwear']
            },
            {
                name: 'Leather Derby Shoes', description: 'Classic genuine leather derby shoes with rubber sole – perfect for formal and semi-formal occasions',
                price: 1299, originalPrice: 2599, category: createdCats['footwear']._id, categoryName: 'Footwear',
                meeshoLink: 'https://www.meesho.com/derby-shoes/p/14',
                isFeatured: true, isTrending: false, badge: 'Premium', rating: 4.7, order: 2,
                images: ['https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500'],
                tags: ['derby', 'leather', 'formal', 'shoes']
            },
            {
                name: 'Slip-On Canvas Shoes', description: 'Lightweight slip-on canvas shoes with memory foam insoles – all-day comfort in style',
                price: 699, originalPrice: 1399, category: createdCats['footwear']._id, categoryName: 'Footwear',
                meeshoLink: 'https://www.meesho.com/slipon-canvas/p/15',
                isFeatured: false, isTrending: true, badge: 'New', rating: 4.5, order: 3,
                images: ['https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500'],
                tags: ['canvas', 'slip-on', 'casual', 'comfort']
            },
        ];

        await Product.insertMany(products);
        console.log(`✅ ${products.length} Alpha Strix sample products seeded`);
    } catch (err) {
        console.error('Products seed error:', err);
    }
};
