import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Menu,
  X,
  Sparkles,
  Crown,
  Calendar,
  ShieldCheck,
  LogOut,
  ChevronDown,
  Gift,
} from 'lucide-react';
import { ActiveView } from '../types';

export const Header: React.FC = () => {
  const {
    activeView,
    setActiveView,
    cartItemCount,
    wishlist,
    setIsCartOpen,
    setIsAuthModalOpen,
    currentUser,
    logout,
    startBookingFlow,
    setIsQuizModalOpen,
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavClick = (view: ActiveView) => {
    setActiveView(view);
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveView('shop');
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="relative z-40 w-full bg-[#111111] text-white border-b border-[#D4A373]/30 shadow-lg transition-all duration-200">
      {/* Black Patti Top Strip with Logo & Atelier Tagline */}
      <div className="bg-black/60 text-[#FCF9F7] py-2 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-[#D4A373]/20 border border-[#D4A373]/50 flex items-center justify-center text-[#D4A373] shrink-0">
              <Sparkles className="w-3 h-3" />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-serif tracking-widest text-[#D4A373] font-bold text-xs">
                L'AURA PARIS
              </span>
              <span className="text-white/30 text-xs hidden sm:inline">•</span>
              <span className="text-white/80 text-[11px] tracking-wide">
                Luxury Cosmetics & Beauty Atelier
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-white/70 text-[10px] font-bold uppercase tracking-[0.2em]">
            <button
              onClick={() => setIsQuizModalOpen(true)}
              className="hover:text-[#D4A373] transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-[#D4A373]" />
              AI Beauty Quiz
            </button>
            <span className="text-white/30">•</span>
            <span className="text-[#D4A373]">Official Atelier & Store</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar in Black Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white/80 hover:text-[#D4A373] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-white/80 hover:text-[#D4A373]"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo with Luxury Emblem Symbol & Typography */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group flex items-center gap-3 py-1"
            >
              {/* Luxury Logo Emblem Symbol */}
              <div className="relative flex items-center justify-center shrink-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#F5D0A9] via-[#D4A373] to-[#8C6239] p-[1.5px] shadow-lg group-hover:shadow-[0_0_18px_rgba(212,163,115,0.45)] transition-all duration-300">
                  <div className="w-full h-full rounded-full bg-[#141414] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#D4A373]/25 via-transparent to-transparent pointer-events-none" />
                    <Crown className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#E2B788] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
                  </div>
                </div>
                {/* Micro Sparkle Accent Badge */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4A373] text-[#111111] rounded-full flex items-center justify-center shadow-sm">
                  <Sparkles className="w-2.5 h-2.5 text-[#111111]" />
                </div>
              </div>

              {/* Brand Typography */}
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl sm:text-3xl tracking-[0.12em] text-white font-bold group-hover:text-[#E2B788] transition-colors leading-none">
                  L'AURA
                </span>
                <span className="text-[9px] tracking-widest font-mono font-bold text-[#D4A373] uppercase px-1.5 py-0.5 bg-[#D4A373]/20 border border-[#D4A373]/40 rounded leading-none">
                  PARIS
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links in Black Box */}
          <nav className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-[11px] font-semibold uppercase tracking-widest transition-all py-1.5 ${
                activeView === 'home'
                  ? 'text-[#D4A373] border-b-2 border-[#D4A373]'
                  : 'text-white/80 hover:text-[#D4A373]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className={`text-[11px] font-semibold uppercase tracking-widest transition-all py-1.5 ${
                activeView === 'shop' || activeView === 'product-detail'
                  ? 'text-[#D4A373] border-b-2 border-[#D4A373]'
                  : 'text-white/80 hover:text-[#D4A373]'
              }`}
            >
              Shop
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className={`text-[11px] font-semibold uppercase tracking-widest transition-all py-1.5 ${
                activeView === 'services'
                  ? 'text-[#D4A373] border-b-2 border-[#D4A373]'
                  : 'text-white/80 hover:text-[#D4A373]'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => {
                if (activeView !== 'home') {
                  setActiveView('home');
                  setTimeout(() => {
                    document.getElementById('customer-appointment-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  document.getElementById('customer-appointment-section')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-[11px] font-semibold uppercase tracking-widest transition-all py-1.5 text-white/80 hover:text-[#D4A373] flex items-center gap-1 cursor-pointer"
            >
              <Calendar className="w-3 h-3 text-[#D4A373]" />
              Appointments
            </button>
            <button
              onClick={() => handleNavClick('offers')}
              className={`text-[11px] font-semibold uppercase tracking-widest transition-all py-1.5 flex items-center gap-1 ${
                activeView === 'offers'
                  ? 'text-[#D4A373] border-b-2 border-[#D4A373]'
                  : 'text-white/80 hover:text-[#D4A373]'
              }`}
            >
              <Gift className="w-3 h-3 text-[#D4A373]" />
              Offers
            </button>
            <button
              onClick={() => handleNavClick('transformations')}
              className={`text-[11px] font-semibold uppercase tracking-widest transition-all py-1.5 ${
                activeView === 'transformations'
                  ? 'text-[#D4A373] border-b-2 border-[#D4A373]'
                  : 'text-white/80 hover:text-[#D4A373]'
              }`}
            >
              Before & After
            </button>
            <button
              onClick={() => handleNavClick('team')}
              className={`text-[11px] font-semibold uppercase tracking-widest transition-all py-1.5 ${
                activeView === 'team'
                  ? 'text-[#D4A373] border-b-2 border-[#D4A373]'
                  : 'text-white/80 hover:text-[#D4A373]'
              }`}
            >
              Our Team
            </button>
            <button
              onClick={() => handleNavClick('blog')}
              className={`text-[11px] font-semibold uppercase tracking-widest transition-all py-1.5 ${
                activeView === 'blog' || activeView === 'blog-post'
                  ? 'text-[#D4A373] border-b-2 border-[#D4A373]'
                  : 'text-white/80 hover:text-[#D4A373]'
              }`}
            >
              Journal
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`text-[11px] font-semibold uppercase tracking-widest transition-all py-1.5 ${
                activeView === 'about'
                  ? 'text-[#D4A373] border-b-2 border-[#D4A373]'
                  : 'text-white/80 hover:text-[#D4A373]'
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`text-[11px] font-semibold uppercase tracking-widest transition-all py-1.5 ${
                activeView === 'contact'
                  ? 'text-[#D4A373] border-b-2 border-[#D4A373]'
                  : 'text-white/80 hover:text-[#D4A373]'
              }`}
            >
              Contact
            </button>
            <button
              onClick={() => {
                if (activeView !== 'home') {
                  setActiveView('home');
                  setTimeout(() => {
                    document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`text-[11px] font-semibold uppercase tracking-widest transition-all py-1.5 flex items-center gap-1 cursor-pointer ${
                activeView === 'auth'
                  ? 'text-[#D4A373] border-b-2 border-[#D4A373]'
                  : 'text-[#D4A373] hover:text-white'
              }`}
            >
              <Crown className="w-3 h-3 text-[#D4A373]" />
              Privé Portal
            </button>
          </nav>

          {/* Right Action Icons & User Dropdown */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Single Clean Search Bar */}
            <div className="relative hidden md:block">
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Search products & services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/10 border border-white/15 rounded-full py-1.5 pl-8 pr-4 text-xs w-48 lg:w-56 focus:w-64 focus:ring-1 focus:ring-[#D4A373] text-white placeholder-white/50 transition-all outline-none"
                />
                <Search className="w-3.5 h-3.5 text-[#D4A373] absolute left-3 top-2.5" />
              </form>
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => {
                if (!currentUser) {
                  setIsAuthModalOpen(true);
                } else {
                  handleNavClick('dashboard');
                }
              }}
              className="relative p-2 text-white/80 hover:text-[#D4A373] transition-colors"
              title="Saved Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#D4A373] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag / Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-white/80 hover:text-[#D4A373] transition-colors"
              title="View Shopping Bag"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#D4A373] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* User Account / Profile Dropdown */}
            <div className="relative">
              {currentUser ? (
                <div>
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-white/10 transition-colors text-left"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#D4A373]/20 border border-[#D4A373]/50 text-[#D4A373] font-bold text-xs flex items-center justify-center">
                      {currentUser.name.charAt(0)}
                    </div>
                    <span className="hidden md:inline text-xs font-semibold text-white">
                      {currentUser.name.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-white/60 hidden md:inline" />
                  </button>

                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-[#1A1A1A] text-white rounded-xl shadow-2xl border border-[#D4A373]/30 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-4 py-2 border-b border-white/10">
                        <p className="text-xs font-bold text-white">{currentUser.name}</p>
                        <p className="text-[11px] text-white/60 truncate">{currentUser.email}</p>
                        <div className="mt-1 flex items-center gap-1.5">
                          <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#D4A373]/20 text-[#D4A373]">
                            {currentUser.membershipTier}
                          </span>
                          <span className="text-[10px] text-[#D4A373] font-semibold">
                            {currentUser.loyaltyPoints} pts
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleNavClick('dashboard')}
                        className="w-full text-left px-4 py-2 text-xs text-white/90 hover:bg-white/10 flex items-center gap-2"
                      >
                        <User className="w-4 h-4 text-[#D4A373]" />
                        Client Dashboard
                      </button>

                      <button
                        onClick={() => handleNavClick('dashboard')}
                        className="w-full text-left px-4 py-2 text-xs text-white/90 hover:bg-white/10 flex items-center gap-2"
                      >
                        <Calendar className="w-4 h-4 text-[#D4A373]" />
                        My Appointments & Orders
                      </button>

                      {currentUser.role === 'admin' && (
                        <button
                          onClick={() => handleNavClick('admin')}
                          className="w-full text-left px-4 py-2 text-xs text-[#D4A373] font-semibold hover:bg-white/10 flex items-center gap-2 border-t border-white/10"
                        >
                          <ShieldCheck className="w-4 h-4 text-[#D4A373]" />
                          Salon Admin Portal
                        </button>
                      )}

                      <div className="border-t border-white/10 mt-1 pt-1">
                        <button
                          onClick={() => {
                            logout();
                            setIsUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-xs text-rose-400 hover:bg-rose-950/40 flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#D4A373] hover:text-white px-3 py-1.5 rounded-full bg-[#D4A373]/15 hover:bg-[#D4A373] hover:text-black border border-[#D4A373]/40 transition-all shadow-sm"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign In / Register</span>
                </button>
              )}
            </div>

            {/* Quick Admin Portal Switcher */}
            <button
              onClick={() => handleNavClick(activeView === 'admin' ? 'home' : 'admin')}
              className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-[#D4A373]/40 text-[10px] font-bold uppercase tracking-wider text-white/80 hover:bg-white/10 hover:text-[#D4A373] transition-all"
              title="Toggle Salon Administration"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4A373]" />
              {activeView === 'admin' ? 'Storefront' : 'Admin'}
            </button>
          </div>
        </div>

        {/* Mobile Expandable Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-white/10 animate-in fade-in duration-200">
            <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search products & services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-11 pr-24 py-2.5 bg-white/10 border border-white/20 rounded-full text-xs text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#D4A373]/60"
              />
              <Search className="w-4 h-4 text-[#D4A373] absolute left-4 top-3" />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 px-4 py-1.5 bg-[#D4A373] text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-[#b88c5e] transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#181818] border-b border-[#D4A373]/30 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-3 pb-4 border-b border-white/10">
            <button
              onClick={() => handleNavClick('shop')}
              className="p-3 bg-white/10 border border-white/20 rounded-xl text-left font-bold text-xs uppercase tracking-wider text-white hover:border-[#D4A373]"
            >
              🛍️ Shop Products
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                startBookingFlow();
              }}
              className="p-3 bg-[#D4A373] text-white rounded-xl text-left font-bold text-xs uppercase tracking-wider shadow-sm hover:bg-[#b88c5e]"
            >
              📅 Book Salon
            </button>
          </div>

          <div className="space-y-1">
            {[
              { label: 'Home', view: 'home' as ActiveView },
              { label: 'Shop Boutique & Cosmetics', view: 'shop' as ActiveView },
              { label: 'Salon & Spa Services', view: 'services' as ActiveView },
              { label: 'Customer Appointments & Status', view: 'home' as ActiveView, isAppointmentAnchor: true },
              { label: 'Privé Club (Sign In & Register)', view: 'home' as ActiveView, isAuthAnchor: true },
              { label: 'Special Offers & Bundles', view: 'offers' as ActiveView },
              { label: 'Before & After Transformations', view: 'transformations' as ActiveView },
              { label: 'Master Stylists & Estheticians', view: 'team' as ActiveView },
              { label: 'Beauty Journal & Editorial', view: 'blog' as ActiveView },
              { label: 'About Atelier L’AURA', view: 'about' as ActiveView },
              { label: 'Contact & Location', view: 'contact' as ActiveView },
              { label: 'Client Dashboard & Orders', view: 'dashboard' as ActiveView },
              { label: 'Admin Management Portal', view: 'admin' as ActiveView },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  if (item.isAppointmentAnchor) {
                    setIsMobileMenuOpen(false);
                    if (activeView !== 'home') {
                      setActiveView('home');
                      setTimeout(() => {
                        document.getElementById('customer-appointment-section')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    } else {
                      document.getElementById('customer-appointment-section')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  } else if (item.isAuthAnchor) {
                    setIsMobileMenuOpen(false);
                    if (activeView !== 'home') {
                      setActiveView('home');
                      setTimeout(() => {
                        document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    } else {
                      document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  } else {
                    handleNavClick(item.view);
                  }
                }}
                className={`w-full text-left py-2.5 px-3 rounded-lg text-xs uppercase font-bold tracking-wider transition-colors ${
                  (activeView === item.view && !item.isAppointmentAnchor && !item.isAuthAnchor)
                    ? 'bg-[#D4A373]/20 text-[#D4A373]'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsQuizModalOpen(true);
              }}
              className="flex items-center gap-1.5 text-xs text-[#D4A373] font-bold uppercase tracking-wider"
            >
              <Sparkles className="w-4 h-4 text-[#D4A373]" />
              AI Skincare Quiz
            </button>

            {currentUser ? (
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="text-xs text-rose-400 font-bold uppercase tracking-wider"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="text-xs text-[#D4A373] font-bold uppercase tracking-wider"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

