import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { ToastContainer } from './components/ToastContainer';
import { CartDrawer } from './components/CartDrawer';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { HeroSlider } from './components/HeroSlider';
import { CategoryGrid } from './components/CategoryGrid';
import { ProductCard } from './components/ProductCard';
import { ShopSection } from './components/ShopSection';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { SalonServicesSection } from './components/SalonServicesSection';
import { BookingEngine } from './components/BookingEngine';
import { CheckoutPage } from './components/CheckoutPage';
import { UserDashboard } from './components/UserDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { AboutSection } from './components/AboutSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { BeforeAfterGallery } from './components/BeforeAfterGallery';
import { CustomerAppointmentSection } from './components/CustomerAppointmentSection';
import { AuthSection } from './components/AuthSection';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { Sparkles, ArrowRight, ShieldCheck, Award, Heart, Calendar } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeView, setActiveView, products } = useApp();

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F7] text-[#1A1A1A]">
      <Header />
      <ToastContainer />
      <CartDrawer />
      <ProductQuickViewModal />
      <AuthModal />

      <main className="flex-1">
        {activeView === 'home' && (
          <div>
            {/* Hero Slider */}
            <HeroSlider />

            {/* Category Grid */}
            <CategoryGrid />

            {/* Featured Luxury Formulations */}
            <section className="py-20 bg-[#0F0F0F] text-white border-y border-[#262626]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.25em] text-[#D4A373] uppercase mb-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      Atelier Exclusives
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal">
                      Featured Beauty Formulations
                    </h2>
                  </div>

                  <button
                    onClick={() => setActiveView('shop')}
                    className="text-xs font-bold uppercase tracking-widest text-[#D4A373] hover:text-[#e4be93] flex items-center gap-1.5 transition-colors group"
                  >
                    <span>View All Catalog</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {featuredProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            </section>

            {/* Salon Suite Services Preview */}
            <SalonServicesSection />

            {/* Spotlight Banner: Japanese Head Spa Ritual */}
            <section className="py-16 bg-[#1A1A1A] text-white overflow-hidden relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.25em] text-[#D4A373] uppercase">
                    <Sparkles className="w-3.5 h-3.5" />
                    Signature Treatment Spotlight
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight">
                    Imperial Japanese Head Spa & Waterfall Hydrotherapy
                  </h2>
                  <p className="text-xs sm:text-sm text-[#E5DDD5] font-light leading-relaxed max-w-xl">
                    Experience deep cranial relaxation with circular herbal waterfall hydro-rings, organic botanical scalp scrubs, and 60 minutes of rhythmic acupressure massage in our soundproof relaxation suites.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <button
                      onClick={() => setActiveView('booking')}
                      className="px-8 py-3.5 bg-[#D4A373] hover:bg-[#b88555] text-white text-xs font-bold rounded-full uppercase tracking-wider transition-colors shadow-lg"
                    >
                      Book Suite Experience • ₹3,999
                    </button>
                    <button
                      onClick={() => setActiveView('services')}
                      className="px-8 py-3.5 border border-[#3E3834] text-[#D4A373] hover:text-white hover:border-white text-xs font-bold rounded-full uppercase tracking-wider transition-colors"
                    >
                      Learn More
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 relative">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#2A2624]">
                    <img
                      src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800"
                      alt="Head Spa"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Customer Appointment & Suite Reservations */}
            <CustomerAppointmentSection />

            {/* Privé Membership - Sign Up & Sign In Section */}
            <AuthSection id="auth-section" />

            {/* Before & After Gallery */}
            <BeforeAfterGallery />
          </div>
        )}

        {activeView === 'shop' && <ShopSection />}
        {activeView === 'services' && <SalonServicesSection />}
        {activeView === 'product-details' && <ProductDetailsPage />}
        {activeView === 'booking' && <BookingEngine />}
        {activeView === 'checkout' && <CheckoutPage />}
        {activeView === 'dashboard' && <UserDashboard />}
        {activeView === 'admin' && <AdminDashboard />}
        {activeView === 'about' && <AboutSection />}
        {activeView === 'blog' && <BlogSection />}
        {activeView === 'contact' && <ContactSection />}
        {activeView === 'auth' && <AuthSection />}
      </main>

      {/* Floating Action Button for Quick Booking */}
      {activeView !== 'booking' && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => {
              setActiveView('booking');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-3.5 bg-[#1A1A1A] hover:bg-[#D4A373] text-white text-xs font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all flex items-center gap-2 border border-[#2A2624] group"
          >
            <Calendar className="w-4 h-4 text-[#D4A373] group-hover:scale-110 transition-transform" />
            <span className="tracking-wider uppercase">Book Salon Suite</span>
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
