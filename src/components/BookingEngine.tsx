import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SalonService, Stylist, BookingAddon } from '../types';
import { INITIAL_ADDONS, TIME_SLOTS } from '../data/initialData';
import { formatINR } from '../utils/currency';
import confetti from 'canvas-confetti';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  Building,
  Check,
  Star,
  Copy,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const BookingEngine: React.FC = () => {
  const {
    services,
    stylists,
    selectedServiceForBooking,
    selectedStylistForBooking,
    createBooking,
    currentUser,
    setActiveView,
    addToast,
  } = useApp();

  // Booking Flow Steps: 1..7
  const [step, setStep] = useState<number>(selectedServiceForBooking ? 2 : 1);

  // Selected Data
  const [selectedService, setSelectedService] = useState<SalonService>(
    selectedServiceForBooking || services[0]
  );
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(
    selectedStylistForBooking || null
  );

  // Generate next 14 days
  const today = new Date();
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i + 1); // starting from tomorrow
    return d.toISOString().split('T')[0];
  });

  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(TIME_SLOTS[1]);
  const [selectedAddons, setSelectedAddons] = useState<BookingAddon[]>([]);

  // Customer Contact Info
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '+1 (555) 000-0000');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'salon' | 'online'>('salon');

  // Confirmed booking ID
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);
  const [confirmedBookingCode, setConfirmedBookingCode] = useState<string>('');

  useEffect(() => {
    if (selectedServiceForBooking) {
      setSelectedService(selectedServiceForBooking);
    }
  }, [selectedServiceForBooking]);

  useEffect(() => {
    if (selectedStylistForBooking) {
      setSelectedStylist(selectedStylistForBooking);
    }
  }, [selectedStylistForBooking]);

  const toggleAddon = (addon: BookingAddon) => {
    setSelectedAddons((prev) =>
      prev.some((a) => a.id === addon.id)
        ? prev.filter((a) => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const calculateTotal = () => {
    const addonsTotal = selectedAddons.reduce((acc, a) => acc + a.price, 0);
    return selectedService.price + addonsTotal;
  };

  const handleFinalBooking = (e: React.FormEvent) => {
    e.preventDefault();

    const bookingId = createBooking({
      service: selectedService,
      stylist: selectedStylist || undefined,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      customerName: customerName || 'Valued Guest',
      customerEmail: customerEmail || 'guest@laura-beaute.com',
      customerPhone: customerPhone || '+1 (555) 000-0000',
      specialInstructions,
      addons: selectedAddons,
      totalPrice: calculateTotal(),
      paymentMethod,
      paymentStatus: paymentMethod === 'online' ? 'paid' : 'pending',
      status: 'confirmed',
    });

    setConfirmedBookingId(bookingId);
    setConfirmedBookingCode(`LRA-${Math.floor(1000 + Math.random() * 9000)}`);
    setStep(7);

    // Trigger celebration confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ECC8AF', '#88634B', '#26201D', '#D4AF37'],
      });
    } catch {
      // ignore
    }
  };

  const copyBookingCode = () => {
    navigator.clipboard.writeText(confirmedBookingCode);
    addToast('Copied', 'Booking Reference copied to clipboard.');
  };

  return (
    <div className="bg-[#FCF9F7] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.25em] text-[#D4A373] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
            Concierge Appointment Desk
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-normal">
            Reserve Your Salon Suite Experience
          </h1>
          <p className="text-xs sm:text-sm text-[#1A1A1A]/70 mt-2 font-light">
            7-step personalized reservation with master stylists & complimentary refreshments.
          </p>
        </div>

        {/* Step Indicator Tracker (Steps 1-6) */}
        {step < 7 && (
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#D4A373]/20 shadow-sm mb-8">
            <div className="flex items-center justify-between text-xs">
              {[
                { s: 1, label: 'Service' },
                { s: 2, label: 'Stylist' },
                { s: 3, label: 'Date' },
                { s: 4, label: 'Time' },
                { s: 5, label: 'Details' },
                { s: 6, label: 'Summary' },
              ].map((st) => (
                <div key={st.s} className="flex flex-col items-center gap-1.5 flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      step === st.s
                        ? 'bg-[#1A1A1A] text-[#D4A373] ring-4 ring-[#D4A373]/20'
                        : step > st.s
                        ? 'bg-[#D4A373] text-white'
                        : 'bg-[#F2E9E4] text-[#1A1A1A]/40'
                    }`}
                  >
                    {step > st.s ? <Check className="w-4 h-4" /> : st.s}
                  </div>
                  <span
                    className={`text-[10px] sm:text-xs font-semibold hidden md:inline uppercase tracking-wider ${
                      step === st.s ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/40'
                    }`}
                  >
                    {st.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Card Container */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#D4A373]/20 shadow-sm">
          <AnimatePresence mode="wait">
            {/* STEP 1: Select Service */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between border-b border-[#F2E9E4] pb-4">
                  <div>
                    <h2 className="font-serif text-2xl text-[#1A1A1A]">Step 1: Select Salon Treatment</h2>
                    <p className="text-xs text-[#1A1A1A]/70 font-light">Choose the primary ritual you would like to book.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((srv) => {
                    const isSelected = selectedService.id === srv.id;
                    return (
                      <div
                        key={srv.id}
                        onClick={() => setSelectedService(srv)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex gap-4 ${
                          isSelected
                            ? 'border-[#D4A373] bg-[#F2E9E4]/40 shadow-sm'
                            : 'border-[#D4A373]/15 hover:border-[#D4A373]/40 bg-white'
                        }`}
                      >
                        <img
                          src={srv.image}
                          alt={srv.name}
                          className="w-20 h-20 rounded-lg object-cover shrink-0"
                        />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-[#D4A373] uppercase tracking-wider">
                                {srv.category}
                              </span>
                              <span className="text-xs font-bold text-[#1A1A1A]">{formatINR(srv.price)}</span>
                            </div>
                            <h3 className="font-serif text-base font-semibold text-[#1A1A1A] leading-snug">
                              {srv.name}
                            </h3>
                          </div>
                          <span className="text-[11px] text-[#1A1A1A]/60 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#D4A373]" />
                            {srv.durationMinutes} mins
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-4 border-t border-[#F2E9E4]">
                  <button
                    onClick={() => setStep(2)}
                    className="px-8 py-3.5 bg-[#D4A373] hover:bg-[#b88c5e] text-white text-xs font-bold rounded-full tracking-widest uppercase transition-all shadow-md flex items-center gap-2"
                  >
                    <span>Proceed to Stylist</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Choose Stylist */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between border-b border-[#F2E9E4] pb-4">
                  <div>
                    <h2 className="font-serif text-2xl text-[#1A1A1A]">Step 2: Choose Your Stylist</h2>
                    <p className="text-xs text-[#1A1A1A]/70 font-light">
                      Select a dedicated master artisan or let us assign the earliest available artist.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#D4A373]">
                    Service: {selectedService.name}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Any Available Option */}
                  <div
                    onClick={() => setSelectedStylist(null)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between text-center items-center ${
                      selectedStylist === null
                        ? 'border-[#D4A373] bg-[#F2E9E4]/40 shadow-sm'
                        : 'border-[#D4A373]/15 hover:border-[#D4A373]/40 bg-white'
                    }`}
                  >
                    <div className="w-16 h-16 rounded-full bg-[#F2E9E4] text-[#D4A373] flex items-center justify-center font-serif text-xl font-bold mb-2">
                      ✨
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1A1A1A]">Any Available Specialist</h4>
                      <p className="text-[11px] text-[#1A1A1A]/70 mt-0.5 font-light">
                        Our salon director will assign the ideal stylist for your hair/skin profile.
                      </p>
                    </div>
                    <span className="mt-3 text-[10px] font-bold text-[#D4A373] uppercase tracking-wider">Fastest Booking</span>
                  </div>

                  {/* Stylists List */}
                  {stylists.map((sty) => {
                    const isSelected = selectedStylist?.id === sty.id;
                    return (
                      <div
                        key={sty.id}
                        onClick={() => setSelectedStylist(sty)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#D4A373] bg-[#F2E9E4]/40 shadow-sm'
                            : 'border-[#D4A373]/15 hover:border-[#D4A373]/40 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={sty.avatar}
                            alt={sty.name}
                            className="w-14 h-14 rounded-full object-cover border border-[#D4A373]/30"
                          />
                          <div>
                            <h4 className="text-sm font-bold text-[#1A1A1A]">{sty.name}</h4>
                            <p className="text-[11px] text-[#D4A373] font-medium">{sty.role}</p>
                            <div className="flex items-center gap-1 text-amber-500 text-[10px] mt-0.5">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span className="font-bold text-[#1A1A1A]">{sty.rating}</span>
                              <span className="text-[#1A1A1A]/40">({sty.reviewCount})</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-[11px] text-[#1A1A1A]/70 line-clamp-2 mt-3 font-light">
                          {sty.bio}
                        </p>

                        <div className="mt-3 pt-2 border-t border-[#F2E9E4] flex justify-between text-[10px] text-[#1A1A1A]/60">
                          <span>{sty.experienceYears} Years Exp</span>
                          <span className="text-[#D4A373] font-bold">
                            {isSelected ? '✓ Selected' : 'Select'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-4 border-t border-[#F2E9E4]">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border border-[#D4A373]/30 text-[#1A1A1A] text-xs font-bold rounded-full uppercase tracking-widest hover:bg-[#FCF9F7] transition-colors flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>

                  <button
                    onClick={() => setStep(3)}
                    className="px-8 py-3.5 bg-[#D4A373] hover:bg-[#b88c5e] text-white text-xs font-bold rounded-full tracking-widest uppercase transition-all shadow-md flex items-center gap-2"
                  >
                    <span>Proceed to Date</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Select Date */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between border-b border-[#F2E9E4] pb-4">
                  <div>
                    <h2 className="font-serif text-2xl text-[#1A1A1A]">Step 3: Select Appointment Date</h2>
                    <p className="text-xs text-[#1A1A1A]/70 font-light">Choose your desired visit date within the next 2 weeks.</p>
                  </div>
                  <span className="text-xs font-bold text-[#D4A373]">
                    Specialist: {selectedStylist ? selectedStylist.name : 'Earliest Available'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                  {availableDates.map((dateStr) => {
                    const dateObj = new Date(dateStr + 'T00:00:00');
                    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                    const dayNum = dateObj.getDate();
                    const monthName = dateObj.toLocaleDateString('en-US', { month: 'short' });
                    const isSelected = selectedDate === dateStr;

                    return (
                      <button
                        key={dateStr}
                        onClick={() => setSelectedDate(dateStr)}
                        className={`p-3.5 rounded-xl border-2 text-center transition-all flex flex-col items-center justify-center gap-1 ${
                          isSelected
                            ? 'border-[#D4A373] bg-[#1A1A1A] text-white shadow-md'
                            : 'border-[#D4A373]/20 bg-white hover:border-[#D4A373]/50 text-[#1A1A1A]'
                        }`}
                      >
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider ${
                            isSelected ? 'text-[#D4A373]' : 'text-[#D4A373]'
                          }`}
                        >
                          {dayName}
                        </span>
                        <span className="font-serif text-2xl font-bold">{dayNum}</span>
                        <span className={`text-[10px] ${isSelected ? 'text-white/70' : 'text-[#1A1A1A]/60'}`}>
                          {monthName}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="p-4 rounded-xl bg-[#FCF9F7] border border-[#D4A373]/20 flex items-center gap-3">
                  <CalendarIcon className="w-5 h-5 text-[#D4A373]" />
                  <p className="text-xs text-[#1A1A1A]/70">
                    Selected Date: <strong className="text-[#1A1A1A]">{selectedDate}</strong> (Private salon suite guaranteed with complimentary beverage service).
                  </p>
                </div>

                <div className="flex justify-between pt-4 border-t border-[#F2E9E4]">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 border border-[#D4A373]/30 text-[#1A1A1A] text-xs font-bold rounded-full uppercase tracking-widest hover:bg-[#FCF9F7] transition-colors flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>

                  <button
                    onClick={() => setStep(4)}
                    className="px-8 py-3.5 bg-[#D4A373] hover:bg-[#b88c5e] text-white text-xs font-bold rounded-full tracking-widest uppercase transition-all shadow-md flex items-center gap-2"
                  >
                    <span>Proceed to Time</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Choose Time Slot */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between border-b border-[#F2E9E4] pb-4">
                  <div>
                    <h2 className="font-serif text-2xl text-[#1A1A1A]">Step 4: Select Time Slot</h2>
                    <p className="text-xs text-[#1A1A1A]/70 font-light">
                      Appointments are spaced to allow 15 minutes of suite sanitization.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#D4A373]">
                    Date: {selectedDate}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-[#D4A373] uppercase tracking-wider block mb-2">
                      Available Day Slots
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {TIME_SLOTS.map((slot) => {
                        const isSelected = selectedTimeSlot === slot;
                        return (
                          <button
                            key={slot}
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`p-3.5 rounded-xl border-2 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                              isSelected
                                ? 'border-[#D4A373] bg-[#D4A373] text-white shadow-md'
                                : 'border-[#D4A373]/20 hover:border-[#D4A373]/50 text-[#1A1A1A] bg-[#FCF9F7]'
                            }`}
                          >
                            <Clock className="w-3.5 h-3.5" />
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-[#F2E9E4]">
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-3 border border-[#D4A373]/30 text-[#1A1A1A] text-xs font-bold rounded-full uppercase tracking-widest hover:bg-[#FCF9F7] transition-colors flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>

                  <button
                    onClick={() => setStep(5)}
                    className="px-8 py-3.5 bg-[#D4A373] hover:bg-[#b88c5e] text-white text-xs font-bold rounded-full tracking-widest uppercase transition-all shadow-md flex items-center gap-2"
                  >
                    <span>Guest Details</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: Guest Details & Addons */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between border-b border-[#F2E9E4] pb-4">
                  <div>
                    <h2 className="font-serif text-2xl text-[#1A1A1A]">Step 5: Guest Details & Add-Ons</h2>
                    <p className="text-xs text-[#1A1A1A]/70 font-light">
                      Enter your contact information and enhance your visit with luxury add-ons.
                    </p>
                  </div>
                </div>

                {/* Add-ons Selector */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4A373] mb-3">
                    Enhance Your Treatment (Optional Ritual Add-ons)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {INITIAL_ADDONS.map((addon) => {
                      const isChecked = selectedAddons.some((a) => a.id === addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddon(addon)}
                          className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                            isChecked
                              ? 'border-[#D4A373] bg-[#F2E9E4]/40'
                              : 'border-[#D4A373]/20 hover:border-[#D4A373]/40 bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                                isChecked
                                  ? 'bg-[#D4A373] border-[#D4A373] text-white'
                                  : 'border-[#D4A373]/30 bg-white'
                              }`}
                            >
                              {isChecked && <Check className="w-3.5 h-3.5" />}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-[#1A1A1A]">{addon.name}</p>
                              <span className="text-[10px] text-[#1A1A1A]/60 font-mono">+{addon.durationMinutes} mins</span>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-[#D4A373]">+{formatINR(addon.price)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Guest Contact Info Fields */}
                <div className="pt-4 border-t border-[#F2E9E4] space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4A373]">
                    Guest Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Lady Genevieve"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs border border-[#D4A373]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]/30 text-[#1A1A1A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. guest@laura-beaute.com"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs border border-[#D4A373]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]/30 text-[#1A1A1A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +1 (555) 234-8900"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs border border-[#D4A373]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]/30 text-[#1A1A1A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                      Special Notes, Allergies, or Preferences
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Sensitive scalp, preferring eucalyptus aromatherapy, champagne service upon arrival..."
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-[#D4A373]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]/30 text-[#1A1A1A]"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-[#F2E9E4]">
                  <button
                    onClick={() => setStep(4)}
                    className="px-6 py-3 border border-[#D4A373]/30 text-[#1A1A1A] text-xs font-bold rounded-full uppercase tracking-widest hover:bg-[#FCF9F7] transition-colors flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>

                  <button
                    onClick={() => {
                      if (!customerName || !customerEmail || !customerPhone) {
                        addToast('Missing Info', 'Please enter your name, email, and phone number.', 'warning');
                        return;
                      }
                      setStep(6);
                    }}
                    className="px-8 py-3.5 bg-[#D4A373] hover:bg-[#b88c5e] text-white text-xs font-bold rounded-full tracking-widest uppercase transition-all shadow-md flex items-center gap-2"
                  >
                    <span>Review Summary</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 6: Summary & Payment Option */}
            {step === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="border-b border-[#F2E9E4] pb-4">
                  <h2 className="font-serif text-2xl text-[#1A1A1A]">Step 6: Booking Summary & Payment Choice</h2>
                  <p className="text-xs text-[#1A1A1A]/70 font-light">Review appointment specifics and select your payment preference.</p>
                </div>

                {/* Summary Box */}
                <div className="p-6 rounded-xl bg-[#FCF9F7] border border-[#D4A373]/20 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 border-b border-[#D4A373]/15 gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-[#D4A373] uppercase tracking-wider">
                        {selectedService.category}
                      </span>
                      <h3 className="font-serif text-xl text-[#1A1A1A] font-semibold">{selectedService.name}</h3>
                    </div>
                    <span className="text-xl font-bold text-[#1A1A1A]">{formatINR(selectedService.price)}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#1A1A1A]/80">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#1A1A1A]/50 block">Stylist</span>
                      <strong className="text-[#1A1A1A]">
                        {selectedStylist ? selectedStylist.name : 'Earliest Available Master Stylist'}
                      </strong>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#1A1A1A]/50 block">Date & Time</span>
                      <strong className="text-[#1A1A1A]">{selectedDate} at {selectedTimeSlot}</strong>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#1A1A1A]/50 block">Duration</span>
                      <strong className="text-[#1A1A1A]">
                        {selectedService.durationMinutes +
                          selectedAddons.reduce((a, b) => a + b.durationMinutes, 0)}{' '}
                        Minutes
                      </strong>
                    </div>
                  </div>

                  {selectedAddons.length > 0 && (
                    <div className="pt-2 border-t border-[#D4A373]/15">
                      <span className="text-[10px] font-bold text-[#D4A373] uppercase tracking-wider block mb-1">Selected Add-ons:</span>
                      {selectedAddons.map((ad) => (
                        <div key={ad.id} className="flex justify-between text-xs text-[#1A1A1A]/80">
                          <span>+ {ad.name}</span>
                          <span className="font-semibold text-[#1A1A1A]">+{formatINR(ad.price)}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-3 border-t border-[#D4A373]/15 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-[#1A1A1A]">Total Investment:</span>
                    <span className="font-serif text-3xl font-bold text-[#D4A373]">
                      {formatINR(calculateTotal())}
                    </span>
                  </div>
                </div>

                {/* Payment Option Selector */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4A373]">
                    Select Payment Preference
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      onClick={() => setPaymentMethod('salon')}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3.5 ${
                        paymentMethod === 'salon'
                          ? 'border-[#D4A373] bg-[#F2E9E4]/40 shadow-sm'
                          : 'border-[#D4A373]/20 hover:border-[#D4A373]/40 bg-white'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-[#F2E9E4] text-[#D4A373] flex items-center justify-center shrink-0">
                        <Building className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#1A1A1A]">Pay at Salon Atelier</h4>
                        <p className="text-[11px] text-[#1A1A1A]/70 font-light">Pay with card/cash after your treatment.</p>
                      </div>
                    </div>

                    <div
                      onClick={() => setPaymentMethod('online')}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3.5 ${
                        paymentMethod === 'online'
                          ? 'border-[#D4A373] bg-[#F2E9E4]/40 shadow-sm'
                          : 'border-[#D4A373]/20 hover:border-[#D4A373]/40 bg-white'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-[#1A1A1A] text-[#D4A373] flex items-center justify-center shrink-0">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#1A1A1A]">Pre-pay Online (Instant VIP)</h4>
                        <p className="text-[11px] text-[#1A1A1A]/70 font-light">Earn double loyalty points upon booking.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-[#F2E9E4]">
                  <button
                    onClick={() => setStep(5)}
                    className="px-6 py-3 border border-[#D4A373]/30 text-[#1A1A1A] text-xs font-bold rounded-full uppercase tracking-widest hover:bg-[#FCF9F7] transition-colors flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>

                  <button
                    onClick={handleFinalBooking}
                    className="px-8 py-3.5 bg-[#D4A373] hover:bg-[#b88c5e] text-white text-xs font-bold rounded-full tracking-widest uppercase transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>Confirm & Book Appointment</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 7: Booking Confirmed Screen */}
            {step === 7 && (
              <motion.div
                key="step7"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-6 max-w-xl mx-auto"
              >
                <div className="w-16 h-16 rounded-full bg-[#F2E9E4] text-[#D4A373] flex items-center justify-center mx-auto ring-8 ring-[#FCF9F7] shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <span className="text-[11px] font-bold tracking-[0.25em] text-[#D4A373] uppercase">
                    RESERVATION CONFIRMED
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-normal mt-1">
                    We Look Forward to Welcoming You
                  </h2>
                  <p className="text-xs sm:text-sm text-[#1A1A1A]/70 mt-2 font-light">
                    A calendar confirmation & suite directions have been sent to{' '}
                    <strong className="text-[#1A1A1A]">{customerEmail}</strong>.
                  </p>
                </div>

                {/* Booking Pass Card */}
                <div className="bg-[#FCF9F7] rounded-2xl p-6 border border-[#D4A373]/20 text-left space-y-4 shadow-sm relative overflow-hidden">
                  <div className="flex justify-between items-center pb-3 border-b border-[#D4A373]/15">
                    <div>
                      <span className="text-[10px] text-[#1A1A1A]/50 uppercase font-bold tracking-wider">
                        Booking ID
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-base font-bold text-[#1A1A1A]">
                          {confirmedBookingCode || 'LRA-8492'}
                        </span>
                        <button
                          onClick={copyBookingCode}
                          className="text-[#D4A373] hover:text-[#1A1A1A]"
                          title="Copy Booking ID"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider rounded-full">
                      ✓ Confirmed
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[#1A1A1A]/50 block">Service</span>
                      <strong className="text-[#1A1A1A]">{selectedService.name}</strong>
                    </div>

                    <div>
                      <span className="text-[#1A1A1A]/50 block">Stylist</span>
                      <strong className="text-[#1A1A1A]">
                        {selectedStylist ? selectedStylist.name : 'Master Stylist Assigned'}
                      </strong>
                    </div>

                    <div>
                      <span className="text-[#1A1A1A]/50 block">Date & Time</span>
                      <strong className="text-[#1A1A1A]">
                        {selectedDate} • {selectedTimeSlot}
                      </strong>
                    </div>

                    <div>
                      <span className="text-[#1A1A1A]/50 block">Payment</span>
                      <strong className="text-[#1A1A1A]">
                        {paymentMethod === 'online' ? 'Pre-paid Online' : 'Pay at Salon Atelier'}
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
                    className="px-6 py-3 bg-[#1A1A1A] hover:bg-[#D4A373] text-white text-xs font-bold rounded-full tracking-widest uppercase transition-colors"
                  >
                    View in My Bookings
                  </button>

                  <button
                    onClick={() => {
                      setActiveView('shop');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-6 py-3 border border-[#D4A373]/30 text-[#1A1A1A] text-xs font-bold rounded-full tracking-widest uppercase hover:bg-[#FCF9F7] transition-colors"
                  >
                    Shop Salon Boutique
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
