import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import API from '../utils/api';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const CategoryPage = () => {
    const { slug } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);

    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || '';
    const [searchInput, setSearchInput] = useState(search);

    useEffect(() => {
        const fetchCategoryData = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                params.append('category', slug);
                if (search) params.append('search', search);
                if (sort) params.append('sort', sort);
                params.append('limit', '40');

                const res = await API.get(`/products?${params}`);
                setProducts(res.data.products || []);
                setTotal(res.data.total || 0);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCategoryData();
    }, [slug, search, sort]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchParams(prev => {
            if (searchInput) prev.set('search', searchInput);
            else prev.delete('search');
            return prev;
        });
    };

    const categoryName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    const SkeletonCard = () => (
        <div className="animate-pulse bg-steel rounded-xl overflow-hidden border border-gold/10">
            <div className="aspect-[4/5] bg-navy/40"></div>
            <div className="p-4 space-y-2">
                <div className="h-3 bg-navy/40 rounded w-1/3"></div>
                <div className="h-4 bg-navy/40 rounded w-3/4"></div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-navy">
            {/* Elegant Header */}
            <div className="bg-charcoal pt-20 pb-12 border-b border-gold/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-gold rounded-full blur-[120px]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link to="/shop" className="inline-flex items-center gap-2 text-gold hover:text-gold-lt transition-colors mb-6 text-sm font-bold uppercase tracking-widest">
                        <ArrowLeft size={16} /> Back to Shop
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <span className="text-gold font-bold tracking-[0.3em] uppercase text-xs mb-2 block">Category</span>
                            <h1 className="text-5xl md:text-7xl font-bold font-heading text-offwhite uppercase tracking-tighter leading-none">{categoryName}</h1>
                            <p className="text-slate mt-4 font-medium">{total} premium items discovered</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Search & Filter Bar */}
                <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center">
                    <form onSubmit={handleSearch} className="w-full lg:flex-1 flex gap-3">
                        <div className="flex-1 relative group">
                            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate group-focus-within:text-gold transition-colors" />
                            <input
                                type="text"
                                value={searchInput}
                                onChange={e => setSearchInput(e.target.value)}
                                placeholder={`Search in ${categoryName}...`}
                                className="w-full bg-steel/50 border border-gold/20 rounded-xl pl-12 pr-4 py-4 text-offwhite placeholder-slate/50 outline-none focus:border-gold focus:bg-steel transition-all text-sm shadow-inner"
                            />
                        </div>
                        <button type="submit" className="btn-primary py-4 px-8 rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg shadow-gold/10 hover:shadow-gold/20">Search</button>
                    </form>

                    <div className="flex items-center gap-4 w-full lg:w-auto">
                        <div className="relative flex-1 lg:flex-initial">
                            <SlidersHorizontal size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold pointer-events-none" />
                            <select
                                value={sort}
                                onChange={e => setSearchParams(prev => { if (e.target.value) prev.set('sort', e.target.value); else prev.delete('sort'); return prev; })}
                                className="w-full bg-steel/50 border border-gold/20 rounded-xl pl-12 pr-10 py-4 text-offwhite outline-none focus:border-gold focus:bg-steel transition-all text-sm appearance-none cursor-pointer"
                            >
                                <option value="">Default Sorting</option>
                                <option value="newest">New Arrivals</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-t-4 border-l-4 border-r-4 border-transparent border-t-gold w-0 h-0"></div>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <SkeletonCard key={i} />)}
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-32 bg-charcoal/30 rounded-3xl border border-dashed border-gold/20">
                        <Filter size={64} className="mx-auto mb-6 text-gold/20" />
                        <h3 className="text-2xl font-heading text-offwhite font-bold mb-2">No items match your criteria</h3>
                        <p className="text-slate max-w-md mx-auto">We couldn't find any products in this category matching your search. Try adjusting your filters or browsing other categories.</p>
                        <button onClick={() => { setSearchInput(''); setSearchParams({}); }} className="mt-8 text-gold underline underline-offset-8 font-bold hover:text-gold-lt">Clear all filters</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                        {products.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;
