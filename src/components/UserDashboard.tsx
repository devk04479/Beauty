import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../utils/currency';
import {
  Calendar,
  Package,
  Heart,
  User,
  Award,
  MapPin,
  Clock,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Trash2,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  Gift,
} from 'lucide-react';
import { ProductCard } from './ProductCard';

export const UserDashboard: React.FC = () => {
  const {
    currentUser,
    bookings,
    orders,
    wishlist,
    products,
    cancelBooking,
    cancelOrder,
    addToCart,
    toggleWishlist,
    setActiveView,
    startBookingFlow,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'bookings' | 'orders' | 'wishlist' | 'addresses' | 'rewards'>('bookings');

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-[#FCF9F7] min-h-screen py-10 sm:py-16 text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* VIP Profile Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#E5DDD5] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-center md:text-left flex-col md:flex-row">
            <div className="relative">
              <img
                src={
                  currentUser?.avatar ||
                  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400'
                }
                alt={currentUser?.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-[#D4A373] shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 bg-[#1A1A1A] text-[#D4A373] p-1 rounded-full text-xs shadow">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
            </div>

            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-normal">
                  {currentUser?.name || 'Lady Genevieve'}
                </h1>
                <span className="px-3 py-0.5 rounded-full bg-[#FCF9F7] border border-[#E5DDD5] text-[#D4A373] text-[10px] font-bold uppercase tracking-wider">
                  {currentUser?.role === 'admin' ? 'Atelier Director / Admin' : 'VIP Member'}
                </span>
              </div>
              <p className="text-xs text-[#8C827A] mt-1">{currentUser?.email}</p>
              <p className="text-xs text-[#5C554E] font-medium mt-1">
                Preferred Boutique: Beverly Hills Flagship Atelier
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 sm:gap-6 bg-[#FCF9F7] p-4 rounded-xl border border-[#E5DDD5] text-center">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#8C827A] block">Loyalty Points</span>
              <strong className="font-serif text-2xl text-[#D4A373]">1,450</strong>
            </div>
            <div className="w-px h-8 bg-[#E5DDD5]" />
            <div>
              <span className="text-[10px] uppercase font-bold text-[#8C827A] block">Appointments</span>
              <strong className="font-serif text-2xl text-[#1A1A1A]">{bookings.length}</strong>
            </div>
            <div className="w-px h-8 bg-[#E5DDD5]" />
            <div>
              <span className="text-[10px] uppercase font-bold text-[#8C827A] block">Orders</span>
              <strong className="font-serif text-2xl text-[#1A1A1A]">{orders.length}</strong>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex border-b border-[#E5DDD5] gap-2 sm:gap-6 overflow-x-auto pb-2">
          {[
            { id: 'bookings', label: `My Salon Bookings (${bookings.length})`, icon: Calendar },
            { id: 'orders', label: `Orders & Tracking (${orders.length})`, icon: Package },
            { id: 'wishlist', label: `Wishlist & Vanity (${wishlist.length})`, icon: Heart },
            { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
            { id: 'rewards', label: 'VIP Perks & Rewards', icon: Gift },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all shrink-0 ${
                  isSelected
                    ? 'bg-[#1A1A1A] text-white shadow-sm'
                    : 'text-[#5C554E] hover:text-[#1A1A1A] hover:bg-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-[#D4A373]' : 'text-[#D4A373]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* 1. BOOKINGS TAB */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl text-[#1A1A1A]">Salon Appointments</h2>
                  <p className="text-xs text-[#8C827A]">Manage your reservations, stylists, and suite rituals.</p>
                </div>
                <button
                  onClick={() => setActiveView('booking')}
                  className="px-5 py-2.5 bg-[#D4A373] hover:bg-[#b88555] text-white text-xs font-bold rounded-full tracking-wider uppercase transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  Book New Appointment
                </button>
              </div>

              {bookings.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-[#E5DDD5] space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#FCF9F7] text-[#D4A373] flex items-center justify-center mx-auto border border-[#E5DDD5]">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#1A1A1A]">No Active Reservations</h3>
                  <p className="text-xs text-[#8C827A] max-w-sm mx-auto">
                    Indulge in our tailored Japanese head spas, balayage couture, or caviar facials.
                  </p>
                  <button
                    onClick={() => setActiveView('booking')}
                    className="px-6 py-3 bg-[#1A1A1A] hover:bg-[#2D2825] text-white text-xs font-bold rounded-full uppercase tracking-wider"
                  >
                    Reserve a Suite
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {bookings.map((b) => (
                    <div
                      key={b.id}
                      className="bg-white rounded-2xl p-6 border border-[#E5DDD5] shadow-sm space-y-4 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-[#E5DDD5]">
                          <span className="font-mono text-xs font-bold text-[#D4A373]">
                            {b.id}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              b.status === 'confirmed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : b.status === 'in_progress'
                                ? 'bg-blue-100 text-blue-800'
                                : b.status === 'completed'
                                ? 'bg-[#FCF9F7] text-[#D4A373] border border-[#E5DDD5]'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {b.status.replace('_', ' ')}
                          </span>
                        </div>

                        <div className="flex gap-4 mt-4">
                          <img
                            src={b.service.image}
                            alt={b.service.name}
                            className="w-20 h-20 rounded-xl object-cover"
                          />
                          <div className="flex-1">
                            <span className="text-[10px] text-[#D4A373] uppercase font-bold">
                              {b.service.category}
                            </span>
                            <h3 className="font-serif text-lg font-semibold text-[#1A1A1A] leading-snug">
                              {b.service.name}
                            </h3>
                            <p className="text-xs text-[#5C554E] mt-1">
                              Stylist: <strong>{b.stylist?.name || 'Earliest Available'}</strong>
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-4 p-3 bg-[#FCF9F7] rounded-xl text-xs text-[#5C554E] border border-[#E5DDD5]">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#D4A373]" />
                            <span>{b.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#D4A373]" />
                            <span>{b.timeSlot}</span>
                          </div>
                        </div>

                        {b.addons && b.addons.length > 0 && (
                          <div className="mt-2 text-[11px] text-[#8C827A]">
                            Addons: {b.addons.map((a) => a.name).join(', ')}
                          </div>
                        )}
                      </div>

                      <div className="pt-4 border-t border-[#E5DDD5] flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-[#8C827A] block">Total Amount</span>
                          <strong className="text-base font-bold text-[#1A1A1A]">
                            {formatINR(b.totalPrice)}
                          </strong>
                        </div>

                        {b.status === 'confirmed' && (
                          <button
                            onClick={() => cancelBooking(b.id)}
                            className="px-4 py-2 border border-rose-200 hover:bg-rose-50 text-rose-700 text-xs font-semibold rounded-xl transition-colors"
                          >
                            Cancel Appointment
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 2. ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl text-[#1A1A1A]">Boutique Orders & Courier Tracking</h2>
                <p className="text-xs text-[#8C827A]">Real-time tracking of luxury formulations dispatched from our lab.</p>
              </div>

              {orders.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-[#E5DDD5] space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#FCF9F7] text-[#D4A373] flex items-center justify-center mx-auto border border-[#E5DDD5]">
                    <Package className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#1A1A1A]">No Boutique Orders Yet</h3>
                  <button
                    onClick={() => setActiveView('shop')}
                    className="px-6 py-3 bg-[#1A1A1A] hover:bg-[#2D2825] text-white text-xs font-bold rounded-full uppercase tracking-wider"
                  >
                    Explore Shop
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5DDD5] shadow-sm space-y-6"
                    >
                      {/* Top Order bar */}
                      <div className="flex flex-wrap items-center justify-between pb-4 border-b border-[#E5DDD5] gap-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-sm font-bold text-[#1A1A1A]">{ord.id}</span>
                            <span className="px-3 py-1 bg-[#1A1A1A] text-[#D4A373] text-[10px] font-bold uppercase rounded-full">
                              {ord.status}
                            </span>
                          </div>
                          <span className="text-xs text-[#8C827A] mt-0.5 block">
                            Placed on {ord.createdAt} • Estimated Delivery: {ord.estimatedDelivery}
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-xs text-[#8C827A] block">Total Order</span>
                          <span className="font-serif text-2xl font-bold text-[#1A1A1A]">
                            {formatINR(ord.total)}
                          </span>
                        </div>
                      </div>

                      {/* Timeline status bar */}
                      <div className="p-4 bg-[#FCF9F7] rounded-xl border border-[#E5DDD5]">
                        <div className="grid grid-cols-4 gap-2 text-center text-[10px] sm:text-xs">
                          {['Order Placed', 'Atelier Prep', 'In Transit', 'Delivered'].map((stepName, i) => (
                            <div key={i} className="flex flex-col items-center gap-1.5">
                              <div
                                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                                  i === 0 || (i === 1 && ord.status !== 'Cancelled')
                                    ? 'bg-[#1A1A1A] text-[#D4A373]'
                                    : 'bg-[#E5DDD5] text-[#8C827A]'
                                }`}
                              >
                                {i + 1}
                              </div>
                              <span className="font-semibold text-[#1A1A1A]">{stepName}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Items */}
                      <div className="divide-y divide-[#E5DDD5]">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="py-3 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={it.product.images[0]}
                                alt={it.product.name}
                                className="w-14 h-14 rounded-lg object-cover bg-[#FCF9F7]"
                              />
                              <div>
                                <span className="text-[10px] font-bold text-[#D4A373] uppercase">
                                  {it.product.brand}
                                </span>
                                <h4 className="font-serif text-sm font-semibold text-[#1A1A1A]">
                                  {it.product.name}
                                </h4>
                                <span className="text-xs text-[#8C827A]">Qty: {it.quantity}</span>
                              </div>
                            </div>
                            <span className="text-sm font-bold text-[#1A1A1A]">
                              {formatINR(it.priceAtPurchase * it.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Bottom Order address & actions */}
                      <div className="pt-4 border-t border-[#E5DDD5] flex flex-wrap items-center justify-between gap-4 text-xs text-[#5C554E]">
                        <div>
                          <span>Shipping to: </span>
                          <strong className="text-[#1A1A1A]">
                            {ord.shippingAddress.street}, {ord.shippingAddress.city}
                          </strong>
                        </div>

                        {ord.status !== 'Cancelled' && ord.status !== 'Delivered' && (
                          <button
                            onClick={() => cancelOrder(ord.id)}
                            className="px-4 py-2 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl hover:bg-rose-50 transition-colors"
                          >
                            Request Cancellation
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 3. WISHLIST TAB */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl text-[#1A1A1A]">Your Wishlist & Vanity Favorites</h2>
                <p className="text-xs text-[#8C827A]">Saved formulations and curated beauty staples.</p>
              </div>

              {wishlistProducts.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-[#E5DDD5] space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#FCF9F7] text-rose-500 flex items-center justify-center mx-auto border border-[#E5DDD5]">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#1A1A1A]">Your Wishlist is Empty</h3>
                  <button
                    onClick={() => setActiveView('shop')}
                    className="px-6 py-3 bg-[#1A1A1A] hover:bg-[#2D2825] text-white text-xs font-bold rounded-full uppercase tracking-wider"
                  >
                    Discover Formulations
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {wishlistProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 4. ADDRESSES TAB */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl text-[#1A1A1A]">Saved Shipping Residences</h2>
                <p className="text-xs text-[#8C827A]">Manage default delivery locations for expedited 1-click checkout.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {(currentUser?.addresses || []).map((addr) => (
                  <div
                    key={addr.id}
                    className="bg-white rounded-2xl p-6 border border-[#E5DDD5] shadow-sm space-y-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-[#E5DDD5]">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#D4A373]">
                          {addr.label || 'Primary'} Residence
                        </span>
                        {addr.isDefault && (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#FCF9F7] text-[#D4A373] text-[10px] font-bold border border-[#E5DDD5]">
                            Default
                          </span>
                        )}
                      </div>

                      <div className="pt-2 text-xs text-[#5C554E] space-y-1">
                        <strong className="text-sm text-[#1A1A1A] block">{currentUser?.name || 'Lady Genevieve'}</strong>
                        <p>{addr.street}</p>
                        <p>{addr.city}, {addr.state} {addr.postalCode}</p>
                        <p>{addr.country}</p>
                        <p className="text-[11px] text-[#8C827A] pt-1">Tel: {currentUser?.phone || '+1 (555) 234-8900'}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#E5DDD5] flex justify-end">
                      <button className="text-xs text-[#D4A373] font-semibold hover:underline">
                        Edit Address
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. REWARDS TAB */}
          {activeTab === 'rewards' && (
            <div className="bg-white rounded-2xl p-8 border border-[#E5DDD5] shadow-sm space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#FCF9F7] text-[#D4A373] flex items-center justify-center border border-[#E5DDD5]">
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#D4A373] uppercase tracking-wider">
                    L'AURA Privé Tier: Platinum
                  </span>
                  <h2 className="font-serif text-3xl text-[#1A1A1A]">1,450 Beauty Points</h2>
                  <p className="text-xs text-[#8C827A]">You earn 10 points for every ₹100 spent in our salon or boutique.</p>
                </div>
              </div>

              {/* Progress bar to Diamond */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-[#1A1A1A]">Platinum Status</span>
                  <span className="text-[#D4A373]">550 points until Diamond VIP</span>
                </div>
                <div className="w-full h-3 bg-[#FCF9F7] border border-[#E5DDD5] rounded-full overflow-hidden">
                  <div className="h-full bg-[#D4A373] rounded-full w-[72%]" />
                </div>
              </div>

              {/* Perks Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-[#FCF9F7] border border-[#E5DDD5] space-y-1">
                  <Sparkles className="w-5 h-5 text-[#D4A373]" />
                  <h4 className="text-xs font-bold text-[#1A1A1A]">Complimentary Scalp Ritual</h4>
                  <p className="text-[11px] text-[#8C827A]">Free 15-min Japanese scalp massage with any hair service.</p>
                </div>

                <div className="p-4 rounded-xl bg-[#FCF9F7] border border-[#E5DDD5] space-y-1">
                  <Gift className="w-5 h-5 text-[#D4A373]" />
                  <h4 className="text-xs font-bold text-[#1A1A1A]">Annual Birthday Gift</h4>
                  <p className="text-[11px] text-[#8C827A]">Deluxe 30ml Night Recovery Elixir gifted on your birth month.</p>
                </div>

                <div className="p-4 rounded-xl bg-[#FCF9F7] border border-[#E5DDD5] space-y-1">
                  <Clock className="w-5 h-5 text-[#D4A373]" />
                  <h4 className="text-xs font-bold text-[#1A1A1A]">Priority Suite Booking</h4>
                  <p className="text-[11px] text-[#8C827A]">Guaranteed appointment slots reserved 48 hours in advance.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
