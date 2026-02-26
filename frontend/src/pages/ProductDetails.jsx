import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Star, ArrowLeft, Share2 } from 'lucide-react';
import API, { getImageUrl } from '../utils/api';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImg, setSelectedImg] = useState(0);

    useEffect(() => {
        API.get(`/products/${id}`)
            .then(res => { setProduct(res.data); setLoading(false); })
            .catch(() => setLoading(false));
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-navy flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
        </div>
    );

    if (!product) return (
        <div className="min-h-screen bg-navy flex flex-col items-center justify-center text-slate">
            <p className="text-xl font-heading text-offwhite">Product not found.</p>
            <Link to="/shop" className="btn-primary mt-6">Back to Shop</Link>
        </div>
    );

    const discount = product.originalPrice > product.price
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <div className="min-h-screen bg-navy">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-slate mb-8">
                    <Link to="/" className="hover:text-gold transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/shop" className="hover:text-gold transition-colors">Shop</Link>
                    <span>/</span>
                    <span className="text-gold">{product.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Images */}
                    <div className="space-y-4">
                        <div className="aspect-[4/5] bg-steel rounded-xl overflow-hidden border border-gold/10">
                            <img
                                src={getImageUrl(product.images?.[selectedImg]) || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700'}
                                alt={product.name}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700'; }}
                            />
                        </div>
                        {product.images?.length > 1 && (
                            <div className="flex gap-3">
                                {product.images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedImg(i)}
                                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImg === i ? 'border-gold' : 'border-gold/20 hover:border-gold/40'}`}
                                    >
                                        <img src={getImageUrl(img)} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="space-y-6">
                        {/* Category & badges */}
                        <div className="flex items-center gap-3">
                            <Link to={`/category/${product.category?.slug}`} className="text-xs text-slate hover:text-gold uppercase tracking-widest transition-colors">
                                {product.categoryName}
                            </Link>
                            {product.badge && (
                                <span className="bg-gold text-navy text-xs font-bold px-2.5 py-1 rounded-md font-heading tracking-wider">{product.badge}</span>
                            )}
                            {product.isTrending && (
                                <span className="bg-steel border border-gold/30 text-gold text-xs font-bold px-2.5 py-1 rounded-md">Trending</span>
                            )}
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold font-heading text-offwhite">{product.name}</h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            <div className="flex text-gold">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
                                ))}
                            </div>
                            <span className="text-slate text-sm">{product.rating?.toFixed(1)} rating</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-4">
                            <span className="text-4xl font-bold text-gold font-heading">₹{product.price}</span>
                            {product.originalPrice > product.price && (
                                <>
                                    <span className="text-xl text-slate line-through">₹{product.originalPrice}</span>
                                    <span className="bg-gold/10 border border-gold/30 text-gold text-sm font-bold px-3 py-1 rounded-lg">{discount}% OFF</span>
                                </>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-slate leading-relaxed text-base">{product.description}</p>

                        {/* Tags */}
                        {product.tags?.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {product.tags.map(tag => (
                                    <span key={tag} className="bg-steel border border-gold/20 text-slate text-xs px-3 py-1 rounded-lg capitalize">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <a
                                href={product.meeshoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary flex-1 py-4 text-base"
                            >
                                <ShoppingBag size={20} /> Buy Now on Meesho
                            </a>
                            <Link to="/shop" className="btn-secondary py-4 px-6">
                                <ArrowLeft size={18} /> Back to Shop
                            </Link>
                        </div>

                        <p className="text-xs text-slate/60">
                            * You will be redirected to Meesho's platform to complete the purchase securely.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
