import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight } from 'lucide-react';

export const BeforeAfterGallery: React.FC = () => {
  const { beforeAfterItems, setActiveView } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Balayage & Color', 'Skin Transformation', 'Bridal Artistry'];

  const filtered = activeCategory === 'All'
    ? beforeAfterItems
    : beforeAfterItems.filter((item) => item.category === activeCategory);

  return (
    <section className="py-20 bg-[#FFF0F3] border-y border-[#FBCFE8]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.25em] text-[#C26D7C] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C26D7C]" />
            Salon Results & Transformations
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] font-normal">
            Real Transformations, Proven Radiance
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6066] mt-3">
            Gaze through our before & after transformations executed by master colorists and aesthetic directors.
          </p>

          {/* Category Tabs */}
          <div className="flex gap-2 justify-center mt-6 overflow-x-auto pb-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                  activeCategory === c
                    ? 'bg-[#1A1A1A] text-white shadow-sm'
                    : 'bg-white/80 border border-[#FBCFE8] text-[#1A1A1A] hover:border-[#C26D7C]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#F8D5DC] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Dual image container */}
              <div className="grid grid-cols-2 gap-1 p-2 bg-[#FFF5F7] rounded-xl m-3 border border-[#F8D5DC]">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                  <img src={item.beforeImage} alt="Before" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold uppercase rounded-md">
                    Before
                  </span>
                </div>

                <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                  <img src={item.afterImage} alt="After" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#D4A373] text-white text-[10px] font-bold uppercase rounded-md shadow">
                    After
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 pt-2 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-[#C26D7C] font-bold uppercase">
                  <span>{item.category}</span>
                  <span className="text-[#8C827A]">By {item.stylistName}</span>
                </div>

                <h3 className="font-serif text-xl text-[#1A1A1A] font-normal leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#5C554E] font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Footer */}
        <div className="text-center pt-4">
          <button
            onClick={() => setActiveView('booking')}
            className="px-8 py-4 bg-[#1A1A1A] hover:bg-[#D4A373] text-white text-xs font-bold rounded-full uppercase tracking-wider transition-colors shadow-md inline-flex items-center gap-2"
          >
            <span>Reserve Your Transformation</span>
            <ArrowRight className="w-4 h-4 text-[#D4A373]" />
          </button>
        </div>
      </div>
    </section>
  );
};
