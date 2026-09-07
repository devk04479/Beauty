import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import { formatINR } from '../utils/currency';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Sparkles,
  Smartphone,
  Wallet,
  DollarSign,
  Copy,
} from 'lucide-react';
import { motion } from 'motion/react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartDeliveryFee,
    cartTax,
    cartTotal,
    appliedCoupon,
    currentUser,
    createOrder,
    setActiveView,
    addToast,
  } = useApp();

  // Step in checkout: 1 = Details & Shipping, 2 = Payment, 3 = Confirmed
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(1);

  // Customer & Shipping state
  const [fullName, setFullName] = useState(currentUser?.name || 'Lady Genevieve');
  const [email, setEmail] = useState(currentUser?.email || 'genevieve@laura-beaute.com');
  const [phone, setPhone] = useState(currentUser?.phone || '+1 (555) 234-8900');
  const [street, setStreet] = useState(currentUser?.addresses[0]?.street || '742 Evergreen Terrace, Suite 4B');
  const [city, setCity] = useState(currentUser?.addresses[0]?.city || 'Beverly Hills');
  const [state, setState] = useState(currentUser?.addresses[0]?.state || 'CA');
  const [postalCode, setPostalCode] = useState(currentUser?.addresses[0]?.postalCode || '90210');
  const [country, setCountry] = useState(currentUser?.addresses[0]?.country || 'United States');

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'wallet' | 'cod' | 'netbanking'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [upiId, setUpiId] = useState('');

  // Confirmed Order result
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState<string>('');

  if (cart.length === 0 && checkoutStep !== 3) {
    return (
      <div className="min-h-[70vh] bg-[#FCF9F7] py-20 flex flex-col items-center justify-center text-center px-4 text-[#1A1A1A]">
        <div className="w-16 h-16 rounded-full bg-[#E5DDD5] text-[#1A1A1A] flex items-center justify-center mb-4">
          <ShoppingBag className="w-8 h-8 text-[#D4A373]" />
        </div>
        <h2 className="font-serif text-3xl text-[#1A1A1A]">Your Vanity Bag is Empty</h2>
        <p className="text-xs sm:text-sm text-[#8C827A] mt-2 mb-6 max-w-sm">
          Please add some bespoke skincare or salon formulations before checking out.
        </p>
        <button
          onClick={() => setActiveView('shop')}
          className="px-8 py-3.5 bg-[#1A1A1A] hover:bg-[#D4A373] text-white text-xs font-bold rounded-full uppercase tracking-wider transition-colors"
        >
          Explore Shop Catalogue
        </button>
      </div>
    );
  }

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !street || !city || !postalCode) {
      addToast('Incomplete Address', 'Please fill in all required shipping fields.', 'warning');
      return;
    }
    setCheckoutStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const orderId = createOrder({
      items: cart.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        priceAtPurchase: item.product.price,
      })),
      subtotal: cartSubtotal,
      discount: cartDiscount,
      deliveryFee: cartDeliveryFee,
      tax: cartTax,
      total: cartTotal,
      couponCode: appliedCoupon?.code,
      shippingAddress: {
        fullName,
        email,
        phone,
        street,
        city,
        state,
        postalCode,
        country,
      },
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      status: 'Confirmed',
      estimatedDelivery: 'September 02, 2026',
    });

    setConfirmedOrderId(orderId);
    setConfirmedOrderNumber(`LRA-ORD-${Math.floor(10000 + Math.random() * 90000)}`);
    setCheckoutStep(3);

    // Confetti burst
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4A373', '#1A1A1A', '#FCF9F7', '#C69060'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="bg-[#FCF9F7] min-h-screen py-10 sm:py-16 text-[#1A1A1A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.25em] text-[#D4A373] uppercase mb-2">
            <Lock className="w-3.5 h-3.5" />
            Concierge Checkout
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-normal">
            Secure Luxury Purchase
          </h1>
        </div>

        {checkoutStep !== 3 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Form: Step 1 or Step 2 (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Step indicator */}
              <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-[#E5DDD5]">
                <div
                  className={`flex items-center gap-2 text-xs font-bold ${
                    checkoutStep === 1 ? 'text-[#D4A373]' : 'text-[#1A1A1A]'
                  }`}
                >
                  <span className="w-6 h-6 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-xs">
                    1
                  </span>
                  <span>Shipping Address</span>
                </div>
                <div className="w-8 h-px bg-[#E5DDD5]" />
                <div
                  className={`flex items-center gap-2 text-xs font-bold ${
                    checkoutStep === 2 ? 'text-[#D4A373]' : 'text-[#8C827A]'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      checkoutStep === 2
                        ? 'bg-[#1A1A1A] text-white'
                        : 'bg-[#FCF9F7] text-[#8C827A] border border-[#E5DDD5]'
                    }`}
                  >
                    2
                  </span>
                  <span>Payment Method</span>
                </div>
              </div>

              {/* STEP 1: Shipping Address Form */}
              {checkoutStep === 1 && (
                <form
                  onSubmit={handleProceedToPayment}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5DDD5] shadow-sm space-y-6"
                >
                  <div>
                    <h2 className="font-serif text-2xl text-[#1A1A1A]">Delivery & Contact Details</h2>
                    <p className="text-xs text-[#8C827A]">
                      Insured temperature-controlled shipping directly to your residence.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                          Full Recipient Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs border border-[#E5DDD5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs border border-[#E5DDD5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs border border-[#E5DDD5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="House / Apt / Suite / Street"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs border border-[#E5DDD5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50"
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs border border-[#E5DDD5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                          State / Region *
                        </label>
                        <input
                          type="text"
                          required
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs border border-[#E5DDD5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50"
                        />
                      </div>

                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                          Postal Code *
                        </label>
                        <input
                          type="text"
                          required
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs border border-[#E5DDD5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                        Country *
                      </label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs border border-[#E5DDD5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50 bg-white"
                      >
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="France">France</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="Singapore">Singapore</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E5DDD5] flex justify-end">
                    <button
                      type="submit"
                      className="px-8 py-4 bg-[#1A1A1A] hover:bg-[#D4A373] text-white text-xs font-bold rounded-xl tracking-wider uppercase transition-all shadow-md flex items-center gap-2"
                    >
                      <span>Continue to Payment</span>
                      <ArrowRight className="w-4 h-4 text-[#D4A373]" />
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 2: Payment Method Form */}
              {checkoutStep === 2 && (
                <form
                  onSubmit={handleCompleteOrder}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5DDD5] shadow-sm space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-serif text-2xl text-[#1A1A1A]">Choose Payment Method</h2>
                      <p className="text-xs text-[#8C827A]">Select your preferred luxury payment provider.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCheckoutStep(1)}
                      className="text-xs text-[#D4A373] hover:underline font-semibold flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Edit Shipping
                    </button>
                  </div>

                  {/* Payment Options Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'card', label: 'Credit Card', icon: CreditCard },
                      { id: 'upi', label: 'UPI / Instant', icon: Smartphone },
                      { id: 'wallet', label: 'Apple/GPay', icon: Wallet },
                      { id: 'cod', label: 'Cash on Del.', icon: DollarSign },
                    ].map((m) => {
                      const Icon = m.icon;
                      const isSelected = paymentMethod === m.id;
                      return (
                        <div
                          key={m.id}
                          onClick={() => setPaymentMethod(m.id as any)}
                          className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center text-center gap-2 ${
                            isSelected
                              ? 'border-[#D4A373] bg-[#FCF9F7] shadow-sm font-bold text-[#D4A373]'
                              : 'border-[#E5DDD5] text-[#5C554E] hover:border-[#D4A373]'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-xs font-semibold">{m.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Card Details Inputs */}
                  {paymentMethod === 'card' && (
                    <div className="p-5 bg-[#FCF9F7] rounded-xl border border-[#E5DDD5] space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                          Card Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-white border border-[#E5DDD5] rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50"
                          />
                          <CreditCard className="w-4 h-4 text-[#D4A373] absolute left-3.5 top-3" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                            Expiry (MM/YY)
                          </label>
                          <input
                            type="text"
                            required
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E5DDD5] rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                            Security CVC
                          </label>
                          <input
                            type="text"
                            required
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E5DDD5] rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* UPI Input */}
                  {paymentMethod === 'upi' && (
                    <div className="p-5 bg-[#FCF9F7] rounded-xl border border-[#E5DDD5] space-y-3">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                        Enter Virtual Payment Address (VPA / UPI ID)
                      </label>
                      <input
                        type="text"
                        placeholder="yourname@okhdfcbank"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E5DDD5] rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50"
                      />
                      <p className="text-[11px] text-[#8C827A]">
                        You will receive an instant approval request on your UPI app.
                      </p>
                    </div>
                  )}

                  {/* Wallet */}
                  {paymentMethod === 'wallet' && (
                    <div className="p-5 bg-[#FCF9F7] rounded-xl border border-[#E5DDD5] text-center space-y-2">
                      <p className="text-xs text-[#1A1A1A] font-semibold">
                        Instant 1-Touch Checkout with Apple Pay or Google Pay
                      </p>
                      <span className="inline-block px-4 py-2 bg-[#1A1A1A] text-white text-xs font-bold rounded-xl">
                         Pay with Apple Pay / GPay
                      </span>
                    </div>
                  )}

                  {/* COD */}
                  {paymentMethod === 'cod' && (
                    <div className="p-5 bg-[#FCF9F7] rounded-xl border border-[#E5DDD5] space-y-2">
                      <p className="text-xs text-[#1A1A1A] font-bold">
                        Cash on Concierge Delivery
                      </p>
                      <p className="text-xs text-[#8C827A]">
                        Pay with cash or portable card terminal directly upon receipt.
                      </p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-[#E5DDD5] flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep(1)}
                      className="px-6 py-3 border border-[#E5DDD5] text-[#1A1A1A] text-xs font-bold rounded-xl uppercase tracking-wider hover:bg-[#FCF9F7] transition-colors flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>

                    <button
                      type="submit"
                      className="px-8 py-4 bg-[#D4A373] hover:bg-[#b88555] text-white text-xs font-bold rounded-xl tracking-wider uppercase transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                    >
                      <Lock className="w-4 h-4 text-white" />
                      <span>Authorize & Place Order • {formatINR(cartTotal)}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Summary (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5DDD5] shadow-sm space-y-6 sticky top-28">
                <h3 className="font-serif text-2xl text-[#1A1A1A] font-normal pb-4 border-b border-[#E5DDD5]">
                  Order Summary ({cart.length} items)
                </h3>

                {/* Items preview */}
                <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex gap-3 text-xs">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-lg object-cover bg-[#FCF9F7] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[#1A1A1A] truncate">{item.product.name}</p>
                        <span className="text-[#8C827A]">Qty: {item.quantity}</span>
                      </div>
                      <span className="font-bold text-[#1A1A1A]">
                        {formatINR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Calculations */}
                <div className="space-y-2 pt-4 border-t border-[#E5DDD5] text-xs text-[#5C554E]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#1A1A1A]">{formatINR(cartSubtotal)}</span>
                  </div>

                  {cartDiscount > 0 && (
                    <div className="flex justify-between text-emerald-800 font-semibold">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span>-{formatINR(cartDiscount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Insured Shipping</span>
                    <span>{cartDeliveryFee === 0 ? <strong className="text-emerald-800">FREE</strong> : formatINR(cartDeliveryFee)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Estimated Tax (5% GST)</span>
                    <span>{formatINR(cartTax)}</span>
                  </div>

                  <div className="flex justify-between items-baseline pt-4 border-t border-[#E5DDD5]">
                    <span className="text-base font-bold text-[#1A1A1A]">Total:</span>
                    <span className="font-serif text-3xl font-bold text-[#1A1A1A]">
                      {formatINR(cartTotal)}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-[#FCF9F7] rounded-xl border border-[#E5DDD5] flex items-center gap-2.5 text-[11px] text-[#5C554E]">
                  <ShieldCheck className="w-4 h-4 text-[#D4A373] shrink-0" />
                  <span>Includes gift box, complimentary samples & velvet pouch.</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* STEP 3: Confirmed Order Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 sm:p-12 border border-[#E5DDD5] shadow-sm max-w-2xl mx-auto text-center space-y-6"
          >
            <div className="w-20 h-20 rounded-full bg-[#FCF9F7] text-[#D4A373] border border-[#E5DDD5] flex items-center justify-center mx-auto ring-8 ring-[#FCF9F7]">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div>
              <span className="text-xs font-bold tracking-[0.25em] text-[#D4A373] uppercase">
                ORDER PLACED SUCCESSFULLY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-normal mt-1">
                Thank You for Choosing L'AURA
              </h2>
              <p className="text-xs sm:text-sm text-[#8C827A] mt-2 max-w-md mx-auto">
                Your order is currently being hand-inspected and prepared at our Paris Atelier. Confirmation email sent to{' '}
                <strong className="text-[#1A1A1A]">{email}</strong>.
              </p>
            </div>

            {/* Order Card */}
            <div className="p-6 bg-[#FCF9F7] rounded-2xl border border-[#E5DDD5] text-left space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-[#E5DDD5]">
                <div>
                  <span className="text-[10px] text-[#8C827A] uppercase font-bold tracking-wider">
                    Tracking Number
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-bold text-[#1A1A1A]">
                      {confirmedOrderNumber || 'LRA-ORD-9024'}
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(confirmedOrderNumber);
                        addToast('Copied', 'Tracking number copied.');
                      }}
                      className="text-[#D4A373]"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <span className="px-3 py-1 bg-[#1A1A1A] text-[#D4A373] text-[11px] font-bold rounded-full">
                  Status: Processing
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#8C827A] block">Recipient</span>
                  <strong className="text-[#1A1A1A]">{fullName}</strong>
                </div>

                <div>
                  <span className="text-[#8C827A] block">Estimated Delivery</span>
                  <strong className="text-[#1A1A1A]">September 02, 2026</strong>
                </div>

                <div className="col-span-2">
                  <span className="text-[#8C827A] block">Shipping Destination</span>
                  <strong className="text-[#1A1A1A]">
                    {street}, {city}, {state} {postalCode}, {country}
                  </strong>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={() => {
                  setActiveView('dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-[#1A1A1A] hover:bg-[#D4A373] text-white text-xs font-bold rounded-full tracking-wider uppercase transition-colors"
              >
                Track Live Order in Dashboard
              </button>

              <button
                onClick={() => {
                  setActiveView('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 border border-[#E5DDD5] text-[#1A1A1A] text-xs font-bold rounded-full tracking-wider uppercase hover:bg-[#FCF9F7] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
