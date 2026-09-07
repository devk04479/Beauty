import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Star, ShoppingBag, Heart, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { formatINR } from '../utils/currency';

export const ProductQuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateToProduct,
  } = useApp();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const isFavorite = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
    setQuickViewProduct(null);
  };

  const handleViewFullDetails = () => {
    const id = quickViewProduct.id;
    setQuickViewProduct(null);
    navigateToProduct(id);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#EFE8E1]"
        >
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#6B635E] hover:text-[#1C1816] shadow-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery Left */}
            <div className="p-6 bg-[#FCF9F7] flex flex-col justify-between">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-[#E5DDD5] mb-4">
                <img
                  src={quickViewProduct.images[selectedImageIndex] || quickViewProduct.images[0]}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Thumbnails */}
              {quickViewProduct.images.length > 1 && (
                <div className="flex gap-2 justify-center">
                  {quickViewProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImageIndex === idx
                          ? 'border-[#D4A373] shadow-md scale-105'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info Right */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#D4A373]">
                  <span>{quickViewProduct.brand}</span>
                  <span className="text-[#8C827A] lowercase">in {quickViewProduct.category}</span>
                </div>

                <h2 className="font-serif text-2xl text-[#1A1A1A] font-normal mt-1 leading-snug">
                  {quickViewProduct.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(quickViewProduct.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-amber-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#1A1A1A]">{quickViewProduct.rating}</span>
                  <span className="text-xs text-[#8C827A]">
                    ({quickViewProduct.reviewCount} customer reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 my-4">
                  <span className="text-2xl font-bold text-[#1A1A1A]">
                    {formatINR(quickViewProduct.price)}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-sm text-[#8C827A] line-through">
                      {formatINR(quickViewProduct.originalPrice)}
                    </span>
                  )}
                  {quickViewProduct.discountPercentage && (
                    <span className="px-2.5 py-0.5 bg-[#D4A373] text-white text-xs font-bold rounded-full">
                      -{quickViewProduct.discountPercentage}% OFF
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#5C554E] leading-relaxed mb-4">
                  {quickViewProduct.shortDescription || quickViewProduct.description}
                </p>

                {/* Key Benefits */}
                <div className="space-y-1.5 mb-6">
                  {quickViewProduct.benefits.slice(0, 3).map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#1A1A1A]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity & CTA */}
              <div className="space-y-4 pt-4 border-t border-[#E5DDD5]">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#E5DDD5] rounded-full overflow-hidden bg-[#FCF9F7]">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 text-sm font-bold text-[#1A1A1A] hover:bg-[#E5DDD5] transition-colors"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 text-sm font-semibold text-[#1A1A1A] min-w-[2rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 py-2 text-sm font-bold text-[#1A1A1A] hover:bg-[#E5DDD5] transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 bg-[#1A1A1A] hover:bg-[#D4A373] text-white text-xs font-bold rounded-full tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#D4A373]" />
                    Add to Vanity Bag • {formatINR(quickViewProduct.price * quantity)}
                  </button>

                  <button
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className={`p-3 rounded-full border transition-colors ${
                      isFavorite
                        ? 'border-rose-300 bg-rose-50 text-rose-600'
                        : 'border-[#E5DDD5] text-[#8C827A] hover:bg-[#FCF9F7]'
                    }`}
                    title="Save to wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-600' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs pt-2">
                  <div className="flex items-center gap-1.5 text-[#8C827A]">
                    <ShieldCheck className="w-4 h-4 text-[#D4A373]" />
                    <span>100% Authentic & Cruelty-Free</span>
                  </div>

                  <button
                    onClick={handleViewFullDetails}
                    className="font-semibold text-[#D4A373] hover:text-[#b88c5e] flex items-center gap-1"
                  >
                    Full Details & Reviews
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
