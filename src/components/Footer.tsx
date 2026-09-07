import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Send, Mail, MapPin, Phone, ShieldCheck, Heart, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, addToast, applyCouponCode } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    applyCouponCode('FIRSTGLOW');
    addToast('Welcome to Privé', 'You unlocked code FIRSTGLOW for 15% off your boutique order.');
    setNewsletterEmail('');
  };
  return (
    <footer className="bg-[#1A1A1A] text-[#FCF9F7]/80 pt-16 sm:pt-20 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Newsletter Card */}
        <div className="bg-[#242424] rounded-2xl p-8 sm:p-12 border border-[#D4A373]/30 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.25em] text-[#D4A373] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
              L'AURA Privé Club
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              Receive 15% Off Your First Boutique Order
            </h3>
            <p className="text-xs sm:text-sm text-white/70 font-light">
              Subscribe for private atelier salon releases, formulation previews, and masterclass invitations.
            </p>
          </div>

          <div className="w-full lg:w-auto min-w-[320px]">
            {newsletterSubscribed ? (
              <div className="p-4 bg-[#D4A373]/20 border border-[#D4A373] rounded-xl text-center space-y-1">
                <span className="text-xs font-bold text-[#D4A373]">✓ Welcome to L'AURA Privé!</span>
                <p className="text-[11px] text-white">
                  Use VIP code <strong>FIRSTGLOW</strong> at checkout.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-4 py-3 bg-[#1A1A1A] border border-white/15 rounded-full text-xs text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#D4A373] hover:bg-[#b88c5e] text-white text-xs font-bold rounded-full tracking-widest uppercase transition-colors shrink-0"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-xs">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => setActiveView('home')}
              className="cursor-pointer inline-block"
            >
              <span className="font-serif text-3xl tracking-[0.2em] text-white font-normal block">
                L'AURA
              </span>
              <span className="text-[9px] tracking-[0.35em] text-[#D4A373] uppercase font-bold">
                HAUTE SALON & BEAUTÉ
              </span>
            </div>

            <p className="text-white/70 leading-relaxed max-w-sm font-light">
              Pioneering bespoke French salon therapies, acoustically buffered private suites, and biocompatible cosmetic elixirs formulated with pure botanical extracts.
            </p>

            <div className="flex gap-3 pt-2">
              <a href="#instagram" className="w-9 h-9 rounded-full bg-[#242424] border border-white/10 flex items-center justify-center text-[#D4A373] hover:bg-[#D4A373] hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#facebook" className="w-9 h-9 rounded-full bg-[#242424] border border-white/10 flex items-center justify-center text-[#D4A373] hover:bg-[#D4A373] hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#twitter" className="w-9 h-9 rounded-full bg-[#242424] border border-white/10 flex items-center justify-center text-[#D4A373] hover:bg-[#D4A373] hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#youtube" className="w-9 h-9 rounded-full bg-[#242424] border border-white/10 flex items-center justify-center text-[#D4A373] hover:bg-[#D4A373] hover:text-white transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Salon Suites */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-white">
              Salon Rituals
            </h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <button onClick={() => setActiveView('services')} className="hover:text-[#D4A373] transition-colors">
                  Hair Couture & Balayage
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('services')} className="hover:text-[#D4A373] transition-colors">
                  24K Gold Skin Infusions
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('services')} className="hover:text-[#D4A373] transition-colors">
                  Japanese Head Spa
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('services')} className="hover:text-[#D4A373] transition-colors">
                  Bridal Glam Suites
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('booking')} className="hover:text-white transition-colors font-semibold text-[#D4A373]">
                  Reserve Appointment →
                </button>
              </li>
            </ul>
          </div>

          {/* Boutique Shop */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-white">
              Boutique
            </h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <button onClick={() => setActiveView('shop')} className="hover:text-[#D4A373] transition-colors">
                  Cellular Skincare
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('shop')} className="hover:text-[#D4A373] transition-colors">
                  Silk Hair Treatments
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('shop')} className="hover:text-[#D4A373] transition-colors">
                  Artisan Fragrances
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('shop')} className="hover:text-[#D4A373] transition-colors">
                  Professional Tools
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('dashboard')} className="hover:text-[#D4A373] transition-colors">
                  Order Tracking
                </button>
              </li>
            </ul>
          </div>

          {/* Maison & Portals */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-white">
              Maison & Portals
            </h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <button onClick={() => setActiveView('about')} className="hover:text-[#D4A373] transition-colors">
                  Our Paris Heritage
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('blog')} className="hover:text-[#D4A373] transition-colors">
                  Beauty Journal
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('contact')} className="hover:text-[#D4A373] transition-colors">
                  Concierge Desk
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-[#D4A373] font-semibold"
                >
                  VIP Sign In & Register →
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('dashboard')} className="hover:text-[#D4A373] transition-colors">
                  My VIP Account
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('admin')} className="hover:text-[#D4A373] transition-colors font-mono text-[#D4A373]">
                  ⚙ Atelier Director Portal
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/50 gap-4">
          <p>© {new Date().getFullYear()} L'AURA Haute Salon & Beauté. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Ethical Sourcing</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
