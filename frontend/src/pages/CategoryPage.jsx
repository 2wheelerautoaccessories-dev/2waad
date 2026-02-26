import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/api';
import ProductCard from '../components/ProductCard';

const CategoryPage = () => {
    const { slug } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        API.get(`/products?category=${slug}&limit=40`)
            .then(res => setProducts(res.data.products || []))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [slug]);

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
            <div className="bg-charcoal py-12 border-b border-gold/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold font-heading text-offwhite uppercase tracking-wider mb-4">{categoryName}</h1>
                    <div className="w-16 h-1 bg-gold mx-auto rounded-full"></div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <SkeletonCard key={i} />)}
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-24 text-slate">
                        <p className="text-xl font-heading text-offwhite">No products in this category yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
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
