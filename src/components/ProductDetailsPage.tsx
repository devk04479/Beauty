import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { formatINR } from '../utils/currency';
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  Send,
} from 'lucide-react';

export const ProductDetailsPage: React.FC = () => {
  const {
    products,
    selectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setActiveView,
    addProductReview,
    setIsCartOpen,
  } = useApp();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients' | 'how-to-use' | 'benefits' | 'reviews'>('details');

  // Review Form state
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  if (!product) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-[#7A6F68]">Product not found.</p>
        <button
          onClick={() => setActiveView('shop')}
          className="mt-4 px-6 py-2.5 bg-[#26201D] text-white text-xs font-bold rounded-full"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const isFavorite = isInWishlist(product.id);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;
    addProductReview(product.id, reviewRating, reviewComment, reviewAuthor || 'Anonymous Patron');
    setReviewComment('');
    setReviewAuthor('');
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-[#FCF9F7] min-h-screen py-8 sm:py-12 text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-[#8C827A] mb-8 flex-wrap">
          <button
            onClick={() => setActiveView('home')}
            className="hover:text-[#1A1A1A] transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button
            onClick={() => setActiveView('shop')}
            className="hover:text-[#1A1A1A] transition-colors"
          >
            Shop
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="hover:text-[#1A1A1A] transition-colors">{product.category}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#1A1A1A] font-semibold truncate max-w-xs">{product.name}</span>
        </div>

        {/* Back Button */}
        <button
          onClick={() => setActiveView('shop')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4A373] hover:text-[#b88555] mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop Catalog
        </button>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white rounded-2xl p-6 sm:p-10 border border-[#E5DDD5] shadow-sm mb-16">
          {/* Gallery Left (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-[#FCF9F7] border border-[#E5DDD5]">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />

              {product.discountPercentage && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-[#1A1A1A] text-[#D4A373] text-xs font-bold rounded-full shadow-md">
                  SAVE {product.discountPercentage}%
                </span>
              )}
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-20 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-[#D4A373] shadow-md scale-105'
                        : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Right (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Brand & Category */}
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-[#D4A373]">
                <span>{product.brand}</span>
                <span className="text-[#8C827A] font-medium lowercase">Category: {product.category}</span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-normal mt-2 leading-tight">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-[#D4A373] text-[#D4A373]'
                          : 'text-[#E5DDD5]'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-[#1A1A1A]">{product.rating}</span>
                <span className="text-xs text-[#8C827A]">
                  • {product.reviewCount} Verified Patron Reviews
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                  In Stock ({product.stockCount} left)
                </span>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-4 my-6 pb-6 border-b border-[#E5DDD5]">
                <span className="text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
                  {formatINR(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-[#8C827A] line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
                {product.discountPercentage && product.originalPrice && (
                  <span className="px-3 py-1 bg-[#FCF9F7] text-[#D4A373] text-xs font-bold rounded-full border border-[#E5DDD5]">
                    You Save {formatINR(product.originalPrice - product.price)}
                  </span>
                )}
              </div>

              {/* Short Description */}
              <p className="text-sm sm:text-base text-[#5C554E] leading-relaxed mb-6 font-light">
                {product.description}
              </p>

              {/* Quick Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-[#FCF9F7] text-[#5C554E] border border-[#E5DDD5]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions: Quantity, Add to Cart, Buy Now */}
            <div className="space-y-4 pt-6 border-t border-[#E5DDD5]">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">Quantity:</span>
                <div className="flex items-center border border-[#E5DDD5] rounded-xl overflow-hidden bg-[#FCF9F7]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-2.5 text-base font-bold text-[#1A1A1A] hover:bg-[#E5DDD5] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-5 py-2.5 text-sm font-semibold text-[#1A1A1A] min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-4 py-2.5 text-base font-bold text-[#1A1A1A] hover:bg-[#E5DDD5] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="w-full py-4 bg-[#1A1A1A] hover:bg-[#2D2825] text-white text-xs font-bold rounded-xl tracking-widest uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D4A373]" />
                  Add To Vanity Bag
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-4 bg-[#D4A373] hover:bg-[#b88555] text-white text-xs font-bold rounded-xl tracking-widest uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 text-white" />
                  Buy Now With 1-Click
                </button>
              </div>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-full py-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                  isFavorite
                    ? 'border-rose-300 bg-rose-50 text-rose-600'
                    : 'border-[#E5DDD5] text-[#1A1A1A] hover:bg-[#FCF9F7]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-600' : ''}`} />
                {isFavorite ? 'Saved in Your Wishlist' : 'Add to Wishlist & Favorites'}
              </button>
            </div>

            {/* Service & Guarantee Badges */}
            <div className="grid grid-cols-3 gap-2 pt-6 border-t border-[#E5DDD5] text-center text-[11px] text-[#8C827A]">
              <div className="p-3 bg-[#FCF9F7] rounded-xl flex flex-col items-center gap-1 border border-[#E5DDD5]">
                <Truck className="w-4 h-4 text-[#D4A373]" />
                <span className="font-semibold text-[#1A1A1A]">Fast Shipping</span>
                <span>Free over ₹1,499</span>
              </div>

              <div className="p-3 bg-[#FCF9F7] rounded-xl flex flex-col items-center gap-1 border border-[#E5DDD5]">
                <ShieldCheck className="w-4 h-4 text-[#D4A373]" />
                <span className="font-semibold text-[#1A1A1A]">100% Authentic</span>
                <span>Direct from lab</span>
              </div>

              <div className="p-3 bg-[#FCF9F7] rounded-xl flex flex-col items-center gap-1 border border-[#E5DDD5]">
                <RotateCcw className="w-4 h-4 text-[#D4A373]" />
                <span className="font-semibold text-[#1A1A1A]">Easy Returns</span>
                <span>30-Day Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed In-Depth Information */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#E5DDD5] shadow-sm mb-16">
          {/* Tab Navigation */}
          <div className="flex border-b border-[#E5DDD5] gap-4 sm:gap-8 overflow-x-auto pb-2">
            {[
              { id: 'details', label: 'Description & Ritual' },
              { id: 'ingredients', label: 'Artisan Ingredients' },
              { id: 'how-to-use', label: 'How to Apply' },
              { id: 'benefits', label: 'Proven Benefits' },
              { id: 'reviews', label: `Client Reviews (${product.reviewCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`text-xs sm:text-sm font-bold tracking-wider uppercase pb-3 transition-colors shrink-0 ${
                  activeTab === tab.id
                    ? 'text-[#D4A373] border-b-2 border-[#D4A373]'
                    : 'text-[#8C827A] hover:text-[#1A1A1A]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Panels */}
          <div className="py-8">
            {activeTab === 'details' && (
              <div className="space-y-4 max-w-3xl text-sm sm:text-base text-[#5C554E] leading-relaxed">
                <h3 className="font-serif text-2xl text-[#1A1A1A]">The Formula & Origin</h3>
                <p>{product.description}</p>
                <p>
                  Crafted under strict dermatological oversight in Grasse, France. Every drop is formulated with bio-compatible actives that respect the natural lipid mantle of delicate skin.
                </p>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="font-serif text-2xl text-[#1A1A1A]">Key Botanical Actives</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {product.ingredients.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-[#FCF9F7] border border-[#E5DDD5] rounded-xl text-xs sm:text-sm font-medium text-[#1A1A1A] flex items-center gap-2.5"
                    >
                      <Sparkles className="w-4 h-4 text-[#D4A373] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'how-to-use' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="font-serif text-2xl text-[#1A1A1A]">Application Ritual</h3>
                <div className="space-y-3 pt-2">
                  {product.howToUse.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-[#FCF9F7] rounded-xl border border-[#E5DDD5]">
                      <span className="w-6 h-6 rounded-full bg-[#1A1A1A] text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-[#5C554E] leading-relaxed pt-0.5">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'benefits' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="font-serif text-2xl text-[#1A1A1A]">Clinical & Sensory Benefits</h3>
                <div className="space-y-2.5 pt-2">
                  {product.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-[#1A1A1A]">
                      <CheckCircle2 className="w-5 h-5 text-[#D4A373] shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-10">
                {/* Rating Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-[#FCF9F7] rounded-2xl border border-[#E5DDD5]">
                  <div className="flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-[#E5DDD5] pb-4 md:pb-0">
                    <span className="font-serif text-5xl text-[#1A1A1A] font-bold">
                      {product.rating}
                    </span>
                    <div className="flex text-amber-500 my-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating)
                              ? 'fill-[#D4A373] text-[#D4A373]'
                              : 'text-[#E5DDD5]'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-[#8C827A]">
                      Based on {product.reviewCount} customer reviews
                    </span>
                  </div>

                  <div className="md:col-span-2 flex flex-col justify-center space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center gap-3 text-xs text-[#8C827A]">
                        <span className="w-12 font-medium">{stars} Stars</span>
                        <div className="flex-1 h-2 bg-[#E5DDD5] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#D4A373] rounded-full"
                            style={{
                              width: stars === 5 ? '85%' : stars === 4 ? '12%' : '3%',
                            }}
                          />
                        </div>
                        <span className="w-8 text-right font-medium">
                          {stars === 5 ? '85%' : stars === 4 ? '12%' : '3%'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review Submission Form */}
                <form
                  onSubmit={handleReviewSubmit}
                  className="p-6 bg-white border border-[#E5DDD5] rounded-2xl space-y-4 max-w-2xl shadow-sm"
                >
                  <h4 className="font-serif text-xl text-[#1A1A1A]">Share Your Beauty Experience</h4>
                  <p className="text-xs text-[#8C827A]">
                    We value authentic feedback from our salon guests and product patrons.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Eleanor Vance"
                        value={reviewAuthor}
                        onChange={(e) => setReviewAuthor(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs border border-[#E5DDD5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                        Star Rating
                      </label>
                      <select
                        value={reviewRating}
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                        className="w-full px-3.5 py-2 text-xs border border-[#E5DDD5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50 bg-white"
                      >
                        <option value={5}>⭐⭐⭐⭐⭐ (5 - Exceptional)</option>
                        <option value={4}>⭐⭐⭐⭐ (4 - Very Good)</option>
                        <option value={3}>⭐⭐⭐ (3 - Average)</option>
                        <option value={2}>⭐⭐ (2 - Below Expectations)</option>
                        <option value={1}>⭐ (1 - Unsatisfactory)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                      Your Detailed Review
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Describe the texture, scent, hydration, and visible results on your skin/hair..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs border border-[#E5DDD5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#1A1A1A] hover:bg-[#D4A373] text-white text-xs font-bold rounded-full tracking-wider uppercase transition-colors flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit Review
                  </button>
                </form>

                {/* Reviews List */}
                <div className="space-y-4">
                  {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-5 bg-[#FCF9F7] rounded-2xl border border-[#E5DDD5] space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#E5DDD5] text-[#1A1A1A] text-xs font-bold flex items-center justify-center">
                              {rev.author.charAt(0)}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-[#1A1A1A]">{rev.author}</p>
                              {rev.verifiedPurchase && (
                                <span className="text-[10px] text-emerald-800 font-semibold">
                                  ✓ Verified Patron
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="text-[11px] text-[#8C827A]">{rev.date}</span>
                        </div>

                        <div className="flex text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < rev.rating ? 'fill-[#D4A373] text-[#D4A373]' : 'text-[#E5DDD5]'
                              }`}
                            />
                          ))}
                        </div>

                        <p className="text-xs sm:text-sm text-[#5C554E] leading-relaxed">
                          {rev.comment}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-[#8C827A]">Be the first to review this formulation!</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A]">
              Complete Your Beauty Routine
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
