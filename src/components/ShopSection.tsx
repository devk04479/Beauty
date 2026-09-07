import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { ProductCategory } from '../types';
import { formatINR } from '../utils/currency';
import {
  Search,
  SlidersHorizontal,
  X,
  Sparkles,
  ArrowUpDown,
  Check,
} from 'lucide-react';

const CATEGORIES: ('All' | ProductCategory)[] = [
  'All',
  'Skincare',
  'Hair Care',
  'Makeup',
  'Fragrances',
  'Body Care',
  'Nail Care',
  "Men's Grooming",
  'Beauty Tools',
  'Salon Essentials',
];

export const ShopSection: React.FC = () => {
  const { products } = useApp();

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProductCategory>('All');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(15000);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Extract unique brands
  const brands = useMemo(() => {
    const set = new Set(products.map((p) => p.brand));
    return ['All', ...Array.from(set)];
  }, [products]);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Keyword Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            product.name.toLowerCase().includes(q) ||
            product.brand.toLowerCase().includes(q) ||
            product.category.toLowerCase().includes(q) ||
            product.tags.some((t) => t.toLowerCase().includes(q));
          if (!matches) return false;
        }

        // Category
        if (selectedCategory !== 'All' && product.category !== selectedCategory) {
          return false;
        }

        // Brand
        if (selectedBrand !== 'All' && product.brand !== selectedBrand) {
          return false;
        }

        // Price
        if (product.price > maxPrice) {
          return false;
        }

        // Rating
        if (minRating > 0 && product.rating < minRating) {
          return false;
        }

        // In Stock
        if (inStockOnly && (!product.inStock || product.stockCount <= 0)) {
          return false;
        }

        // On Sale
        if (onSaleOnly && (!product.discountPercentage || product.discountPercentage <= 0)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return 0; // featured default
      });
  }, [
    products,
    searchQuery,
    selectedCategory,
    selectedBrand,
    maxPrice,
    minRating,
    inStockOnly,
    onSaleOnly,
    sortBy,
  ]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedBrand('All');
    setMaxPrice(15000);
    setMinRating(0);
    setInStockOnly(false);
    setOnSaleOnly(false);
    setSortBy('featured');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'All' ||
    selectedBrand !== 'All' ||
    maxPrice < 15000 ||
    minRating > 0 ||
    inStockOnly ||
    onSaleOnly;

  return (
    <div className="bg-[#FCF9F7] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.25em] text-[#D4A373] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
            L'AURA Boutique Catalog
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] font-normal">
            Bespoke Formulations & Salon Tools
          </h1>
          <p className="text-sm text-[#1A1A1A]/70 mt-3 font-light">
            Hand-formulated with botanical extracts, biocompatible peptides, and French cosmetic expertise.
          </p>
        </div>

        {/* Search & Category Pills Bar */}
        <div className="space-y-4 mb-8">
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search by product name, brand, key ingredient, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3.5 bg-white border border-[#D4A373]/30 rounded-full text-xs text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#D4A373]/30 focus:border-[#D4A373] shadow-sm placeholder-[#1A1A1A]/40"
            />
            <Search className="w-4 h-4 text-[#D4A373] absolute left-4 top-4" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 text-[#1A1A1A]/40 hover:text-[#1A1A1A]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Horizontal Scroll Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 justify-start sm:justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#1A1A1A] text-white shadow-sm'
                    : 'bg-[#F2E9E4]/60 border border-[#D4A373]/20 text-[#1A1A1A] hover:border-[#D4A373]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Top Control Bar: Total Found, Filters Toggle, Sort Dropdown */}
        <div className="bg-white p-4 rounded-2xl border border-[#D4A373]/20 flex flex-wrap items-center justify-between gap-4 mb-8 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FCF9F7] border border-[#D4A373]/30 text-xs font-bold text-[#1A1A1A]"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#D4A373]" />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-[#D4A373]" />
              )}
            </button>

            <span className="text-xs font-medium text-[#1A1A1A]/70">
              Showing <strong className="text-[#1A1A1A] font-bold">{filteredProducts.length}</strong> luxurious formulations
            </span>
          </div>

          {/* Active filter badges on desktop */}
          {hasActiveFilters && (
            <div className="hidden md:flex items-center gap-2 flex-wrap">
              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F2E9E4] border border-[#D4A373]/30 text-[11px] text-[#1A1A1A] font-medium">
                  Category: {selectedCategory}
                  <X
                    className="w-3 h-3 cursor-pointer text-[#D4A373]"
                    onClick={() => setSelectedCategory('All')}
                  />
                </span>
              )}
              {onSaleOnly && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#D4A373]/15 text-[#D4A373] border border-[#D4A373]/40 text-[11px] font-bold">
                  On Sale
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setOnSaleOnly(false)} />
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="text-xs text-[#D4A373] hover:text-[#b88c5e] font-bold underline underline-offset-2 ml-2 uppercase tracking-wider"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-[#D4A373] hidden sm:inline" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/70 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3.5 py-2 bg-[#FCF9F7] border border-[#D4A373]/30 rounded-xl text-xs font-semibold text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#D4A373]/30 cursor-pointer"
            >
              <option value="featured">Featured Curations</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Main Products Grid with Filter Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <div className={`lg:block ${isMobileFiltersOpen ? 'block' : 'hidden'} lg:col-span-1 space-y-6`}>
            <div className="bg-white p-6 rounded-2xl border border-[#D4A373]/20 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#F2E9E4]">
                <h3 className="font-serif text-xl text-[#1A1A1A] font-normal flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#D4A373]" />
                  Refine Search
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-[#D4A373] hover:underline font-bold uppercase tracking-wider"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Price Range Slider */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-2">
                  <span>Price Limit</span>
                  <span className="text-[#D4A373] font-bold">{formatINR(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="15000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#D4A373] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#1A1A1A]/50 mt-1 font-mono">
                  <span>{formatINR(200)}</span>
                  <span>{formatINR(15000)}</span>
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-2">
                  Artisan Brand
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FCF9F7] border border-[#D4A373]/30 rounded-xl text-xs text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#D4A373]/30"
                >
                  {brands.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Star Rating Filter */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-2">
                  Minimum Rating
                </label>
                <div className="space-y-1.5">
                  {[0, 4.5, 4.8].map((stars) => (
                    <button
                      key={stars}
                      onClick={() => setMinRating(stars)}
                      className={`w-full px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                        minRating === stars
                          ? 'bg-[#D4A373]/15 text-[#D4A373] font-bold'
                          : 'text-[#1A1A1A]/70 hover:bg-[#FCF9F7]'
                      }`}
                    >
                      <span>{stars === 0 ? 'All Ratings' : `★ ${stars}+ Stars`}</span>
                      {minRating === stars && <Check className="w-3.5 h-3.5 text-[#D4A373]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Flags Toggles */}
              <div className="space-y-3 pt-4 border-t border-[#F2E9E4]">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 accent-[#D4A373] rounded cursor-pointer"
                  />
                  <span className="text-xs font-medium text-[#1A1A1A]">In Stock Only</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onSaleOnly}
                    onChange={(e) => setOnSaleOnly(e.target.checked)}
                    className="w-4 h-4 accent-[#D4A373] rounded cursor-pointer"
                  />
                  <span className="text-xs font-medium text-[#1A1A1A]">Special Offers & Deals</span>
                </label>
              </div>
            </div>
          </div>

          {/* Products Grid (3 cols) */}
          <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-2xl p-12 text-center border border-[#D4A373]/20 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#F2E9E4] text-[#D4A373] flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#1A1A1A]">No Formulations Match Your Filter</h3>
                <p className="text-xs sm:text-sm text-[#1A1A1A]/70 max-w-md mx-auto font-light">
                  Try adjusting your price slider, keyword query, or resetting filters to see our full catalogue.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 bg-[#1A1A1A] text-white text-xs font-bold rounded-full tracking-widest uppercase hover:bg-[#D4A373] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
