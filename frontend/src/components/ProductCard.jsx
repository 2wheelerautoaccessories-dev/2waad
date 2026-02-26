import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { getImageUrl } from '../utils/api';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500&auto=format&fit=crop';

const ProductCard = ({ product }) => {
    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgError, setImgError] = useState(false);

    const imageSrc = imgError
        ? FALLBACK_IMG
        : (getImageUrl(product.images?.[0]) || FALLBACK_IMG);

    return (
        <div className="card group relative h-full flex flex-col">
            {/* Badges */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                {product.isTrending && (
                    <span className="bg-gold text-navy text-xs font-bold px-2.5 py-1 rounded-md shadow-sm font-heading tracking-wider">
                        Trending
                    </span>
                )}
                {product.badge && (
                    <span className="bg-navy text-gold-lt text-xs font-bold px-2.5 py-1 rounded-md shadow-sm border border-gold/30">
                        {product.badge}
                    </span>
                )}
            </div>

            <Link to={`/product/${product._id}`} className="block overflow-hidden relative aspect-[4/5] bg-steel/40 shrink-0">
                {!imgLoaded && (
                    <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-steel/30 via-steel/60 to-steel/30" />
                )}
                <img
                    src={imageSrc}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setImgLoaded(true)}
                    onError={() => { setImgError(true); setImgLoaded(true); }}
                />
                {/* Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center">
                    <Link
                        to={`/product/${product._id}`}
                        className="bg-gold text-navy px-6 py-2 rounded-lg font-semibold text-sm hover:bg-gold-lt transition-colors w-full text-center shadow-lg font-heading tracking-wider uppercase"
                    >
                        Quick View
                    </Link>
                </div>
            </Link>

            <div className="p-3 sm:p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-1 shrink-0">
                    <Link
                        to={`/category/${product.category?.slug || (product.categoryName || '').toLowerCase()}`}
                        className="text-xs text-slate hover:text-gold transition-colors truncate uppercase tracking-wider"
                    >
                        {product.categoryName}
                    </Link>
                    <div className="flex items-center text-xs text-gold-lt shrink-0 ml-1">
                        ★ {product.rating?.toFixed(1) || '4.5'}
                    </div>
                </div>

                <Link to={`/product/${product._id}`} className="shrink-0">
                    <h3 className="font-heading font-semibold text-[13px] sm:text-base text-offwhite mb-1 truncate hover:text-gold transition-colors">
                        {product.name}
                    </h3>
                </Link>

                <p className="text-[11px] sm:text-sm text-slate line-clamp-2 mb-3 h-auto sm:h-10 shrink-0">
                    {product.description}
                </p>

                <div className="mt-auto flex flex-col gap-3">
                    <div className="flex items-baseline gap-2">
                        <span className="font-semibold text-sm sm:text-lg text-gold">₹{product.price}</span>
                        {product.originalPrice > product.price && (
                            <span className="text-[10px] sm:text-xs text-slate line-through">₹{product.originalPrice}</span>
                        )}
                    </div>

                    <a
                        href={product.meeshoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-gold/10 border border-gold/30 text-gold hover:bg-gold hover:text-navy py-2 sm:py-2.5 rounded-lg flex items-center justify-center gap-1.5 sm:gap-2 transition-colors duration-300 font-semibold text-xs sm:text-sm font-heading tracking-wider uppercase"
                        title="Buy Now on Meesho"
                    >
                        <ShoppingBag size={14} className="sm:w-4 sm:h-4" />
                        Buy Now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
