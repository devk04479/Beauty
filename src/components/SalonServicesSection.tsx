import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ServiceCategory, SalonService } from '../types';
import { Clock, Sparkles, CheckCircle2, ArrowRight, Star } from 'lucide-react';
import { formatINR } from '../utils/currency';

const SERVICE_CATEGORIES: ('All' | ServiceCategory)[] = [
  'All',
  'Hair & Styling',
  'Skin & Facials',
  'Bridal & Makeup',
  'Spa & Wellness',
  'Nails & Hands',
  "Men's Grooming",
];

export const SalonServicesSection: React.FC = () => {
  const { services, stylists, startBookingFlow } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<'All' | ServiceCategory>('All');

  const filteredServices = selectedCategory === 'All'
    ? services
    : services.filter((s) => s.category === selectedCategory);

  const getStylistsForService = (service: SalonService) => {
    if (!service.assignedStylistIds || service.assignedStylistIds.length === 0) return [];
    return stylists.filter((sty) => service.assignedStylistIds?.includes(sty.id));
  };

  return (
    <section className="py-20 bg-[#1C1C21] text-white border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.25em] text-[#D4A373] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
            L'AURA Salon & Spa Suites
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal">
            Bespoke Salon Experiences
          </h2>
          <p className="text-sm text-white/70 mt-3 font-light">
            Tailored hair couture, 24K gold facial infusions, and Japanese head spa therapies performed in private luxury suites.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-10 justify-start sm:justify-center">
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#D4A373] text-[#141414] shadow-md'
                  : 'bg-white/5 border border-white/10 text-white/80 hover:border-[#D4A373] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const assignedStylists = getStylistsForService(service);

            return (
              <div
                key={service.id}
                className="bg-[#26262D] rounded-2xl border border-white/10 overflow-hidden shadow-md hover:shadow-2xl hover:border-[#D4A373]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Image */}
                <div className="relative h-60 w-full overflow-hidden bg-black/40">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/90 via-transparent to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/15">
                      {service.category}
                    </span>
                    {service.popular && (
                      <span className="px-3 py-1 rounded-full bg-[#D4A373] text-[#141414] text-[9px] font-bold uppercase tracking-wider">
                        ★ Most Booked
                      </span>
                    )}
                  </div>

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                    <span className="flex items-center gap-1 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 font-medium text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-[#D4A373]" />
                      {service.durationMinutes} Minutes
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl text-white font-normal group-hover:text-[#D4A373] transition-colors leading-snug">
                      {service.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed mt-2 font-light line-clamp-2">
                      {service.shortDescription || service.description}
                    </p>

                    {/* Key Benefits */}
                    <div className="mt-4 space-y-1.5">
                      {service.benefits.slice(0, 2).map((benefit, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-white/80">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
                          <span className="line-clamp-1">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Specialists & Pricing + Book Button */}
                  <div className="pt-4 border-t border-white/10 space-y-4">
                    {assignedStylists.length > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-[#D4A373] font-bold uppercase tracking-wider">
                          Specialists:
                        </span>
                        <div className="flex -space-x-2">
                          {assignedStylists.map((sty) => (
                            <img
                              key={sty.id}
                              src={sty.avatar}
                              alt={sty.name}
                              title={`${sty.name} - ${sty.role}`}
                              className="w-7 h-7 rounded-full border-2 border-[#26262D] object-cover"
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <span className="text-[10px] text-white/50 block uppercase tracking-wider font-semibold">Service Fee</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-white">
                            {formatINR(service.price)}
                          </span>
                          {service.originalPrice && (
                            <span className="text-xs text-white/40 line-through">
                              {formatINR(service.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => startBookingFlow(service)}
                        className="px-5 py-2.5 bg-[#D4A373] hover:bg-[#b88c5e] text-white text-xs font-bold rounded-full tracking-widest uppercase transition-all shadow hover:shadow-md flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Reserve</span>
                        <ArrowRight className="w-3.5 h-3.5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
