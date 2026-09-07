import React from 'react';
import { useApp } from '../context/AppContext';
import { Star, Sparkles, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useApp();

  return (
    <section className="py-20 bg-[#FCF9F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.25em] text-[#D4A373] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
            Patron Acclaims
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] font-normal">
            Voices of Refined Elegance
          </h2>
          <p className="text-xs sm:text-sm text-[#8C827A] mt-3">
            Read firsthand accounts from our salon suite guests and loyal skincare patrons.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-8 border border-[#E5DDD5] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <Quote className="w-10 h-10 text-[#FCF9F7] absolute top-6 right-6" />

              <div className="space-y-4">
                {/* Rating */}
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < t.rating ? 'fill-[#D4A373] text-[#D4A373]' : 'text-[#E5DDD5]'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#5C554E] leading-relaxed italic font-light">
                  "{t.comment}"
                </p>

                {t.serviceName && (
                  <span className="inline-block px-3 py-1 bg-[#FCF9F7] border border-[#E5DDD5] rounded-full text-[10px] font-bold text-[#D4A373] uppercase tracking-wider">
                    Ritual: {t.serviceName}
                  </span>
                )}
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3.5 pt-6 border-t border-[#E5DDD5] mt-6">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#E5DDD5]"
                />
                <div>
                  <h4 className="font-serif text-base font-semibold text-[#1A1A1A]">{t.name}</h4>
                  <p className="text-[11px] text-[#8C827A]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
