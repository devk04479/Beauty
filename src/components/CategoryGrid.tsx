import React from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_CATEGORIES } from '../data/initialData';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { ProductCategory } from '../types';

export const CategoryGrid: React.FC = () => {
  const { setActiveView } = useApp();

  const handleCategorySelect = (categoryName: string) => {
    // Navigate to shop
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-[#5A132C] text-white relative overflow-hidden">
      {/* Subtle Luxury Gradient Glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#831843]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#9D174D]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.25em] text-[#F9A8D4] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#F9A8D4]" />
              Artisan Collections
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal">
              Curated by Beauty Category
            </h2>
            <p className="text-sm text-pink-100/80 mt-2 max-w-lg font-light">
              Explore specialized regimens, clinical hair elixirs, and bespoke salon tools crafted to elevate your daily routine.
            </p>
          </div>

          <button
            onClick={() => setActiveView('shop')}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#F9A8D4] hover:text-white transition-colors pb-1 border-b border-[#F9A8D4]"
          >
            View All Collections
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {INITIAL_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => handleCategorySelect(cat.name as ProductCategory)}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer bg-[#3F0D1E] border border-pink-500/30 shadow-lg hover:shadow-2xl hover:border-[#F472B6]/60 transition-all duration-300 ${
                idx === 0 ? 'sm:col-span-2 sm:row-span-1' : ''
              }`}
            >
              <div className={`relative w-full overflow-hidden ${idx === 0 ? 'h-56 sm:h-72' : 'h-52 sm:h-64'}`}>
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A0613]/90 via-[#2A0613]/40 to-transparent group-hover:from-[#2A0613]/95 transition-colors" />

                {/* Badges & Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-pink-300/30 text-pink-100">
                      {cat.itemCount} Items
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#EC4899] flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all shadow-md">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-white group-hover:text-[#F9A8D4] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-pink-100/85 line-clamp-1 mt-1 font-light">
                      {cat.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
