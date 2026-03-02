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

// 4 fixed category boxes — locally-served generated images (100% correct)
const CATEGORY_BOXES = [
    {
        name: 'Helmets',
        slug: 'helmets',
        img: '/categories/helmets.jpg',
    },
    {
        name: 'Riding Jackets',
        slug: 'riding-jackets',
        img: '/categories/jackets.jpg',
    },
    {
        name: 'Lights & LEDs',
        slug: 'lights-leds',
        img: '/categories/lights.jpg',
    },
    {
        name: 'Locks & Security',
        slug: 'locks-security',
        img: '/categories/locks.jpg',
    },
];

const Home = () => {
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

            {/* ── Hero Section ── */}
            <section className="relative h-[90vh] min-h-[550px] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/hero.png"
                        alt="2waad Two Wheeler Accessories — Premium Bike Garage"
                        className="w-full h-full object-cover object-center"
                        loading="eager"
                    />
                    <div className="absolute inset-0 bg-navy/50"></div>
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)' }}></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-2xl animate-slide-up">
                        <span className="block text-gold font-heading font-semibold tracking-[0.4em] uppercase mb-4 text-sm">
                            New Arrivals
                        </span>
                        <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold font-heading mb-6 leading-none text-offwhite">
                            RIDE <br />
                            <span className="text-gold">BOLD.</span> <br />
                            RIDE SAFE.
                        </h1>
                        <p className="text-base sm:text-lg text-slate mb-8 max-w-xl leading-relaxed">
                            Discover premium two-wheeler accessories — from helmets and riding gear to lights, mirrors, and more. Gear up for every ride.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/shop" className="btn-primary">
                                Shop Accessories <ShoppingBag size={18} />
                            </Link>
                            <Link to="/category/helmets" className="btn-secondary">
                                Helmets
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Shop by Category — 4 fixed boxes, direct Unsplash ── */}
            <section className="py-16 sm:py-20 bg-charcoal">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-offwhite uppercase tracking-tight">Shop by Category</h2>
                        <div className="w-16 h-1 bg-gold mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
                        {CATEGORY_BOXES.map((cat) => (
                            <Link
                                key={cat.slug}
                                to={`/category/${cat.slug}`}
                                className="group relative h-52 sm:h-72 rounded-2xl overflow-hidden block border border-gold/10 hover:border-gold/40 transition-all duration-500 shadow-2xl"
                            >
                                <img
                                    src={cat.img}
                                    alt={cat.name}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
                                <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-5">
                                    <div className="flex justify-between items-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="min-w-0 flex-1 mr-2">
                                            <p className="text-gold text-[9px] font-bold tracking-widest uppercase mb-1">Explore</p>
                                            <h3 className="text-sm sm:text-xl font-heading font-extrabold text-offwhite uppercase tracking-tight leading-tight">{cat.name}</h3>
                                        </div>
                                        <span className="flex-shrink-0 w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-gold flex items-center justify-center text-navy transform -rotate-45 group-hover:rotate-0 transition-all duration-500 shadow-xl">
                                            <ArrowRight size={13} className="sm:w-4 sm:h-4" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Featured Products ── */}
            <section className="py-16 sm:py-20 bg-navy">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-offwhite">Featured Products</h2>
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

            {/* ── Trending Now ── */}
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

            {/* ── Why Choose Us ── */}
            <section className="py-16 sm:py-20 bg-navy">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="bg-steel/50 p-8 rounded-xl border border-gold/10 hover:border-gold/30 transition-colors">
                            <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-6 text-gold border border-gold/30">
                                <Star size={32} />
                            </div>
                            <h3 className="text-xl font-heading font-bold mb-3 text-gold uppercase tracking-wider">Premium Quality</h3>
                            <p className="text-slate text-sm">Handpicked accessories built to last — only the best gear for serious riders.</p>
                        </div>
                        <div className="bg-steel/50 p-8 rounded-xl border border-gold/10 hover:border-gold/30 transition-colors">
                            <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-6 text-gold border border-gold/30">
                                <Shield size={32} />
                            </div>
                            <h3 className="text-xl font-heading font-bold mb-3 text-gold uppercase tracking-wider">Secure Buying</h3>
                            <p className="text-slate text-sm">Shop securely through our certified affiliate links with complete buyer protection.</p>
                        </div>
                        <div className="bg-steel/50 p-8 rounded-xl border border-gold/10 hover:border-gold/30 transition-colors">
                            <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-6 text-gold border border-gold/30">
                                <Zap size={32} />
                            </div>
                            <h3 className="text-xl font-heading font-bold mb-3 text-gold uppercase tracking-wider">100% Authentic</h3>
                            <p className="text-slate text-sm">Only genuine, highest-rated products curated to ensure your complete riding satisfaction.</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
