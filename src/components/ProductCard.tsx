import React from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { formatINR } from '../utils/currency';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    navigateToProduct,
  } = useApp();

  const isFavorite = isInWishlist(product.id);

  return (
    <div className="group relative bg-white dark:bg-[#1A1A22] rounded-2xl border border-[#D4A373]/25 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#D4A373]/60 transition-all duration-300 flex flex-col justify-between">
      {/* Compact Image & Quick Action Overlay */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-[#F5EFEB] cursor-pointer">
        <img
          src={product.images[0]}
          alt={product.name}
          onClick={() => navigateToProduct(product.id)}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Second image hover preview if available */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={product.name}
            onClick={() => navigateToProduct(product.id)}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.discountPercentage && product.discountPercentage > 0 && (
            <span className="px-2 py-0.5 bg-[#D4A373] text-white text-[9px] font-bold rounded shadow-sm tracking-wider uppercase">
              Save {product.discountPercentage}%
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2 py-0.5 bg-[#1A1A1A] text-[#D4A373] text-[9px] font-bold rounded shadow-sm tracking-wider uppercase">
              Best Seller
            </span>
          )}
          {product.isNew && (
            <span className="px-2 py-0.5 bg-emerald-800 text-white text-[9px] font-bold rounded shadow-sm tracking-wider uppercase">
              New
            </span>
          )}
        </div>

        {/* Top Right Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-md transition-all z-10 shadow-sm ${
            isFavorite
              ? 'bg-rose-50 text-rose-600'
              : 'bg-white/85 text-[#1A1A1A]/70 hover:text-rose-600 hover:bg-white'
          }`}
          aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Quick View Button on Desktop Hover */}
        <div className="absolute inset-x-2.5 bottom-2.5 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-2 bg-white/95 hover:bg-white text-[#1A1A1A] text-[11px] font-bold rounded-lg shadow-md backdrop-blur-md flex items-center justify-center gap-1.5 transition-colors uppercase tracking-wider cursor-pointer"
          >
            <Eye className="w-3 h-3 text-[#D4A373]" />
            Quick View
          </button>
        </div>
      </div>

      {/* Product Content info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-[10px] text-[#D4A373] font-bold uppercase tracking-wider mb-1">
            <span className="truncate max-w-[65%]">{product.brand}</span>
            <span className="text-[#1A1A1A]/45 dark:text-white/40 lowercase font-normal truncate max-w-[35%]">in {product.category}</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => navigateToProduct(product.id)}
            className="font-serif text-sm sm:text-base text-[#1A1A1A] dark:text-white font-medium line-clamp-2 hover:text-[#D4A373] cursor-pointer transition-colors leading-snug min-h-[2.5rem]"
          >
            {product.name}
          </h3>

          {/* Rating & Stock */}
          <div className="flex items-center justify-between gap-1.5 mt-2">
            <div className="flex items-center gap-1">
              <div className="flex items-center text-amber-500">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              </div>
              <span className="text-xs font-bold text-[#1A1A1A] dark:text-white">{product.rating}</span>
              <span className="text-[11px] text-[#1A1A1A]/50 dark:text-white/40">({product.reviewCount || 0})</span>
            </div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">In Stock</span>
          </div>
        </div>

        {/* Price & Add to Cart button */}
        <div className="mt-3.5 pt-3 border-t border-[#D4A373]/15 dark:border-white/10 flex items-center justify-between gap-2">
          <div>
            <span className="text-[9px] text-[#1A1A1A]/50 dark:text-white/40 block uppercase tracking-wider font-medium leading-none mb-0.5">Price</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-[#1A1A1A] dark:text-white">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-[11px] text-[#1A1A1A]/40 dark:text-white/40 line-through">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="px-3.5 py-2 bg-[#1A1A1A] dark:bg-[#D4A373] hover:bg-[#D4A373] dark:hover:bg-[#b88c5e] text-white dark:text-[#141414] text-[11px] font-bold rounded-lg transition-all shadow hover:shadow-md flex items-center gap-1.5 uppercase tracking-wider cursor-pointer"
            title="Add to vanity bag"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#D4A373] dark:text-[#141414]" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
