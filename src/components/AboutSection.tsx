import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Award, ShieldCheck, Heart, Users, MapPin, ArrowRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { stylists, setActiveView } = useApp();

  return (
    <div className="bg-[#FCF9F7] min-h-screen py-12 sm:py-20 text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Heritage Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.25em] text-[#D4A373] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
              L'AURA Maison & Atelier
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A] font-normal leading-tight">
              Where Haute Couture Meets Bio-Compatible Beauty
            </h1>
            <p className="text-sm sm:text-base text-[#5C554E] leading-relaxed font-light">
              Founded in Paris and expanded to Beverly Hills, L'AURA was conceived with a singular ambition: to merge scientific dermatological efficacy with the serene luxury of European private spa sanctuaries.
            </p>
            <p className="text-sm text-[#5C554E] leading-relaxed font-light">
              Every salon experience is carried out in acoustically buffered private suites, and every product in our boutique is meticulously formulated in Grasse without phthalates, parabens, or synthetic dyes.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => setActiveView('booking')}
                className="px-8 py-3.5 bg-[#1A1A1A] hover:bg-[#D4A373] text-white text-xs font-bold rounded-full uppercase tracking-wider transition-colors shadow-md"
              >
                Reserve a Suite
              </button>
              <button
                onClick={() => setActiveView('shop')}
                className="px-8 py-3.5 border border-[#E5DDD5] text-[#1A1A1A] text-xs font-bold rounded-full uppercase tracking-wider hover:bg-white transition-colors"
              >
                Explore Boutique
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1000"
                alt="L'AURA Salon Suite"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl border border-[#E5DDD5] shadow-xl max-w-xs hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#FCF9F7] text-[#D4A373] border border-[#E5DDD5] flex items-center justify-center font-serif text-xl font-bold">
                  18
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1A1A1A]">Years of Excellence</h4>
                  <p className="text-[11px] text-[#8C827A]">Pioneering clean salon luxury since 2008.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Brand */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-8 bg-white rounded-2xl border border-[#E5DDD5] shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#FCF9F7] text-[#D4A373] border border-[#E5DDD5] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-[#1A1A1A]">Clean Formulations</h3>
            <p className="text-xs text-[#8C827A] leading-relaxed">
              100% cruelty-free, vegan certified, and blended with cold-pressed botanical actives.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-[#E5DDD5] shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#FCF9F7] text-[#D4A373] border border-[#E5DDD5] flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-[#1A1A1A]">Master Stylists</h3>
            <p className="text-xs text-[#8C827A] leading-relaxed">
              Trained in Paris and Tokyo with over a decade of celebrity hair and dermal experience.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-[#E5DDD5] shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#FCF9F7] text-[#D4A373] border border-[#E5DDD5] flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-[#1A1A1A]">Private Luxury Suites</h3>
            <p className="text-xs text-[#8C827A] leading-relaxed">
              Every service is conducted in an individual private suite with bespoke playlist and beverage menu.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-[#E5DDD5] shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#FCF9F7] text-[#D4A373] border border-[#E5DDD5] flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-[#1A1A1A]">Concierge Care</h3>
            <p className="text-xs text-[#8C827A] leading-relaxed">
              Personalized skin profiles, ongoing texture monitoring, and complimentary touch-ups.
            </p>
          </div>
        </div>

        {/* Master Stylists Team Showcase */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4A373]">The Artisans</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] mt-2">
              Meet Our Master Directors
            </h2>
            <p className="text-xs sm:text-sm text-[#8C827A] mt-2">
              Each artist brings specialized mastery across hair balayage, dermal hydration, and bridal artistry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stylists.map((sty) => (
              <div
                key={sty.id}
                className="bg-white rounded-2xl border border-[#E5DDD5] overflow-hidden shadow-sm hover:shadow-lg transition-all p-6 text-center space-y-4"
              >
                <img
                  src={sty.avatar}
                  alt={sty.name}
                  className="w-28 h-28 rounded-full mx-auto object-cover border-2 border-[#D4A373] shadow-md"
                />
                <div>
                  <h3 className="font-serif text-xl text-[#1A1A1A]">{sty.name}</h3>
                  <p className="text-xs font-bold text-[#D4A373] uppercase tracking-wider">{sty.role}</p>
                </div>
                <p className="text-xs text-[#5C554E] font-light leading-relaxed">{sty.bio}</p>
                <div className="pt-2 border-t border-[#E5DDD5] text-[11px] text-[#8C827A] flex justify-between">
                  <span>★ {sty.rating} Rating</span>
                  <span>{sty.experienceYears} Years Exp</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
