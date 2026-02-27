import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../utils/api';
import ProductCard from '../components/ProductCard';
import { Search, Filter } from 'lucide-react';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();

    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const sort = searchParams.get('sort') || '';
    const limit = searchParams.get('limit') || '20';
    const [searchInput, setSearchInput] = useState(search);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (search) params.append('search', search);
                if (category) params.append('category', category);
                if (sort) params.append('sort', sort);
                params.append('limit', limit);

                const [prodRes, catRes] = await Promise.all([
                    API.get(`/products?${params}`),
                    API.get('/categories')
                ]);
                setProducts(prodRes.data.products);
                setTotal(prodRes.data.total);
                setCategories(catRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [search, category, sort, limit]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchParams(prev => {
            if (searchInput) prev.set('search', searchInput);
            else prev.delete('search');
            return prev;
        });
    };

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
            {/* Page Header */}
            <div className="bg-charcoal py-12 border-b border-gold/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold font-heading text-offwhite mb-4 uppercase tracking-wider">All Products</h1>
                    <div className="w-16 h-1 bg-gold mx-auto rounded-full"></div>
                    <p className="text-slate mt-4">{total} items found</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    {/* Search */}
                    <form onSubmit={handleSearch} className="flex-1 flex gap-2">
                        <div className="flex-1 relative">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate" />
                            <input
                                type="text"
                                value={searchInput}
                                onChange={e => setSearchInput(e.target.value)}
                                placeholder="Search products..."
                                className="w-full bg-steel border border-gold/20 rounded-lg pl-10 pr-4 py-3 text-offwhite placeholder-slate outline-none focus:border-gold text-sm"
                            />
                        </div>
                        <button type="submit" className="btn-primary py-3 px-5">Search</button>
                    </form>

                    {/* Category Filter */}
                    <select
                        value={category}
                        onChange={e => setSearchParams(prev => { if (e.target.value) prev.set('category', e.target.value); else prev.delete('category'); return prev; })}
                        className="bg-steel border border-gold/20 rounded-lg px-4 py-3 text-offwhite outline-none focus:border-gold text-sm min-w-[160px]"
                    >
                        <option value="">All Categories</option>
                        {categories.map(c => (
                            <option key={c._id} value={c.name}>{c.name}</option>
                        ))}
                    </select>

                    {/* Sort */}
                    <select
                        value={sort}
                        onChange={e => setSearchParams(prev => { if (e.target.value) prev.set('sort', e.target.value); else prev.delete('sort'); return prev; })}
                        className="bg-steel border border-gold/20 rounded-lg px-4 py-3 text-offwhite outline-none focus:border-gold text-sm min-w-[160px]"
                    >
                        <option value="">Sort: Default</option>
                        <option value="newest">Newest</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                    </select>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <SkeletonCard key={i} />)}
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-24 text-slate">
                        <Filter size={48} className="mx-auto mb-4 text-gold/30" />
                        <p className="text-xl font-heading text-offwhite">No products found</p>
                        <p className="text-sm mt-2">Try adjusting your search or filter</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                            {products.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>

                        {/* Load More */}
                        {products.length < total && (
                            <div className="mt-12 text-center">
                                <button
                                    onClick={() => setSearchParams(prev => {
                                        const currentLimit = parseInt(prev.get('limit') || '20');
                                        prev.set('limit', currentLimit + 20);
                                        return prev;
                                    })}
                                    className="btn-secondary px-8 py-3"
                                >
                                    Load More Products
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Shop;
