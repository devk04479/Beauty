import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../utils/currency';
import {
  X,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Tag,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartDiscount,
    cartDeliveryFee,
    cartTax,
    cartTotal,
    cartItemCount,
    appliedCoupon,
    applyCouponCode,
    removeCouponCode,
    setActiveView,
    navigateToProduct,
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCouponCode(couponInput);
    setCouponFeedback(res.message);
    if (res.success) setCouponInput('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const freeShippingThreshold = 1499;
  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-white border-l border-[#E5DDD5] shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#E5DDD5] flex items-center justify-between bg-[#FCF9F7]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#D4A373]" />
                <h2 className="font-serif text-2xl text-[#1A1A1A] font-normal">Your Vanity Bag</h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#E5DDD5] font-bold text-[#1A1A1A]">
                  {cartItemCount}
                </span>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-full text-[#8C827A] hover:text-[#1A1A1A] hover:bg-white transition-colors"
                aria-label="Close bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Ribbon */}
            <div className="px-6 py-3 bg-[#FCF9F7] border-b border-[#E5DDD5]">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-[#1A1A1A] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
                  {remainingForFreeShipping === 0 ? (
                    <strong className="text-emerald-700">You unlocked FREE Luxury Shipping!</strong>
                  ) : (
                    <>
                      Add <strong className="text-[#D4A373]">{formatINR(remainingForFreeShipping)}</strong> for Free Courier Delivery
                    </>
                  )}
                </span>
                <span className="font-bold text-[#D4A373]">{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#E5DDD5] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#D4A373] rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <div className="w-16 h-16 rounded-full bg-[#FCF9F7] text-[#D4A373] flex items-center justify-center border border-[#E5DDD5]">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#1A1A1A]">Your Bag is Empty</h3>
                  <p className="text-xs text-[#8C827A] max-w-xs">
                    Discover our collection of clean botanicals, peptides, and artisan salon formulations.
                  </p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setActiveView('shop');
                    }}
                    className="px-6 py-3 bg-[#1A1A1A] text-white text-xs font-bold rounded-full tracking-wider uppercase hover:bg-[#D4A373] transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-4 rounded-2xl bg-[#FCF9F7] border border-[#E5DDD5] flex gap-3.5 items-start relative group"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      onClick={() => {
                        setIsCartOpen(false);
                        navigateToProduct(item.product.id);
                      }}
                      className="w-16 h-16 rounded-xl object-cover bg-white border border-[#E5DDD5] cursor-pointer shrink-0"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-[#D4A373] uppercase font-bold tracking-wider block">
                          {item.product.brand}
                        </span>
                        <h4
                          onClick={() => {
                            setIsCartOpen(false);
                            navigateToProduct(item.product.id);
                          }}
                          className="font-serif text-sm font-semibold text-[#1A1A1A] truncate cursor-pointer hover:text-[#D4A373]"
                        >
                          {item.product.name}
                        </h4>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#E5DDD5] rounded-full bg-white overflow-hidden">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="px-2.5 py-1 text-xs font-bold text-[#1A1A1A] hover:bg-[#FCF9F7]"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-bold text-[#1A1A1A]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="px-2.5 py-1 text-xs font-bold text-[#1A1A1A] hover:bg-[#FCF9F7]"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-sm font-bold text-[#1A1A1A]">
                          {formatINR(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-[#8C827A] hover:text-rose-600 p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-[#E5DDD5] bg-[#FCF9F7] space-y-4">
                {/* Promo Code Form */}
                {appliedCoupon ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code <strong>{appliedCoupon.code}</strong> active (-{formatINR(cartDiscount)})</span>
                    </div>
                    <button
                      onClick={removeCouponCode}
                      className="text-xs text-rose-600 hover:underline font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Promo Code (e.g. LAURA20)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="flex-1 px-3.5 py-2 text-xs bg-white border border-[#E5DDD5] rounded-full focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50 uppercase"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#D4A373] text-white text-xs font-bold rounded-full transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponFeedback && (
                      <p className="text-[11px] text-[#D4A373]">{couponFeedback}</p>
                    )}
                  </form>
                )}

                {/* Subtotals breakdown */}
                <div className="space-y-1.5 text-xs text-[#5C554E] pt-2 border-t border-[#E5DDD5]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#1A1A1A]">{formatINR(cartSubtotal)}</span>
                  </div>

                  {cartDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Promotional Discount</span>
                      <span>-{formatINR(cartDiscount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span>{cartDeliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : formatINR(cartDeliveryFee)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Estimated Tax (5% GST)</span>
                    <span>{formatINR(cartTax)}</span>
                  </div>

                  <div className="flex justify-between items-baseline pt-2 border-t border-[#E5DDD5] text-sm">
                    <span className="font-bold text-[#1A1A1A]">Total Due:</span>
                    <span className="font-serif text-2xl font-bold text-[#1A1A1A]">
                      {formatINR(cartTotal)}
                    </span>
                  </div>
                </div>

                {/* Proceed Button */}
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-4 bg-[#1A1A1A] hover:bg-[#D4A373] text-white text-xs font-bold rounded-full tracking-widest uppercase transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#D4A373]" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-[#8C827A]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>256-Bit SSL Encrypted Luxury Checkout</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
