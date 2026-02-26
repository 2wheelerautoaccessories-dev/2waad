import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Shield, Zap, Star } from 'lucide-react';
import API from '../utils/api';
import ProductCard from '../components/ProductCard';



const SkeletonCard = () => (
    <div className="animate-pulse bg-steel rounded-xl overflow-hidden border border-gold/10">
        <div className="aspect-[4/5] bg-navy/40"></div>
        <div className="p-4 space-y-2">
            <div className="h-3 bg-navy/40 rounded w-1/3"></div>
            <div className="h-4 bg-navy/40 rounded w-3/4"></div>
            <div className="h-3 bg-navy/30 rounded w-full"></div>
        </div>
    </div>
);

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const fetchHomeData = async () => {
            try {
                setError(false);
                const res = await API.get('/public/home', { signal: controller.signal });
                setCategories(res.data.categories || []);
                setFeaturedProducts(res.data.featuredProducts || []);
                setTrendingProducts(res.data.trendingProducts || []);
            } catch (err) {
                if (err.name !== 'CanceledError' && err.message !== 'canceled') {
                    setError(err.message || 'Unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchHomeData();
        return () => controller.abort();
    }, []);

    return (
        <div className="bg-navy">
            {/* Hero Section */}
            <section className="relative h-[90vh] min-h-[550px] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=1800&auto=format&fit=crop"
                        alt="Alpha Strix Excellence"
                        className="w-full h-full object-cover object-center"
                        loading="eager"
                        fetchPriority="high"
                    />
                    {/* Subtle Overlay to keep text readable but keep the image visible */}
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 100%)' }}></div>
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)' }}></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-2xl animate-slide-up">
                        <span className="block text-gold font-heading font-semibold tracking-[0.4em] uppercase mb-4 text-sm">
                            New Collection 2024
                        </span>
                        <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold font-heading mb-6 leading-none text-offwhite">
                            DRESS <br />
                            <span className="text-gold">BOLD.</span> <br />
                            BE ALPHA.
                        </h1>
                        <p className="text-base sm:text-lg text-slate mb-8 max-w-xl leading-relaxed">
                            Discover our curated collection of premium men's fashion — from streetwear to formal, accessories to footwear. Elevate your style game.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/shop" className="btn-primary">
                                Shop Collection <ShoppingBag size={18} />
                            </Link>
                            <Link to="/category/accessories" className="btn-secondary">
                                Accessories
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="py-16 sm:py-20 bg-charcoal">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-offwhite">Shop by Category</h2>
                        <div className="w-16 h-1 bg-gold mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {categories.slice(0, 4).map((cat, i) => (
                            <Link key={cat._id} to={`/category/${cat.slug}`} className="group relative h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden block border border-gold/10 hover:border-gold/40 transition-colors">
                                <div className="absolute inset-0 bg-steel/30"></div>
                                {(() => {
                                    const catImages = {
                                        'T-Shirts': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500',
                                        'Shirts': 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=500',
                                        'Accessories': 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=500',
                                        'Footwear': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500'
                                    };
                                    return (
                                        <img
                                            src={cat.image || catImages[cat.name] || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500'}
                                            alt={cat.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                    );
                                })()}
                                <div className="absolute inset-0 bg-navy/50 group-hover:bg-navy/70 transition-colors duration-300"></div>
                                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
                                    <div className="flex justify-between items-end">
                                        <h3 className="text-lg sm:text-2xl font-heading font-bold text-offwhite uppercase tracking-wider">{cat.name}</h3>
                                        <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gold/20 backdrop-blur flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-navy transition-colors shrink-0">
                                            <ArrowRight size={16} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16 sm:py-20 bg-navy">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-offwhite">Featured Collection</h2>
                            <div className="w-16 h-1 bg-gold rounded-full"></div>
                        </div>
                        <Link to="/shop" className="text-gold hover:text-gold-lt font-semibold hidden md:flex items-center gap-2 transition-colors font-heading uppercase tracking-wider text-sm">
                            View All <ArrowRight size={18} />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                            {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
                        </div>
                    ) : error ? (
                        <div className="text-center py-12 text-slate">
                            <p className="text-lg">Unable to load products right now.</p>
                            <button onClick={() => { setLoading(true); setError(null); }} className="mt-4 btn-secondary">
                                Try Again
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                            {featuredProducts.slice(0, 4).map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}

                    <div className="mt-10 text-center md:hidden">
                        <Link to="/shop" className="btn-secondary inline-flex">View All</Link>
                    </div>
                </div>
            </section>

            {/* Trending Section */}
            <section className="py-16 sm:py-20 bg-charcoal">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-offwhite">Trending Now</h2>
                        <div className="w-16 h-1 bg-gold mx-auto rounded-full"></div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                            {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                            {trendingProducts.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 sm:py-20 bg-navy">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="bg-steel/50 p-8 rounded-xl border border-gold/10 hover:border-gold/30 transition-colors">
                            <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-6 text-gold border border-gold/30">
                                <Star size={32} />
                            </div>
                            <h3 className="text-xl font-heading font-bold mb-3 text-gold uppercase tracking-wider">Premium Quality</h3>
                            <p className="text-slate text-sm">Handpicked collections crafted with the finest materials and immense attention to detail.</p>
                        </div>
                        <div className="bg-steel/50 p-8 rounded-xl border border-gold/10 hover:border-gold/30 transition-colors">
                            <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-6 text-gold border border-gold/30">
                                <Shield size={32} />
                            </div>
                            <h3 className="text-xl font-heading font-bold mb-3 text-gold uppercase tracking-wider">Secure Buying</h3>
                            <p className="text-slate text-sm">Shop securely through our certified Meesho affiliate links with complete buyer protection.</p>
                        </div>
                        <div className="bg-steel/50 p-8 rounded-xl border border-gold/10 hover:border-gold/30 transition-colors">
                            <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-6 text-gold border border-gold/30">
                                <Zap size={32} />
                            </div>
                            <h3 className="text-xl font-heading font-bold mb-3 text-gold uppercase tracking-wider">100% Authentic</h3>
                            <p className="text-slate text-sm">Only the highest-rated authentic products curated to ensure your complete satisfaction.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
