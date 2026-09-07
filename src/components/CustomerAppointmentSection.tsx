import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TIME_SLOTS } from '../data/initialData';
import { formatINR } from '../utils/currency';
import confetti from 'canvas-confetti';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Coffee,
  Search,
  Award,
  ArrowRight,
  RotateCcw,
  Check,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CustomerAppointmentSection: React.FC = () => {
  const {
    services,
    stylists,
    createBooking,
    bookings,
    cancelBooking,
    currentUser,
    setActiveView,
    addToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'book' | 'status'>('book');

  // Quick dates (next 5 days)
  const today = new Date();
  const dateOptions = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i + 1);
    return {
      iso: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dateNumber: d.getDate(),
      monthName: d.toLocaleDateString('en-US', { month: 'short' }),
    };
  });

  // Booking Form State
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    services[0]?.id || ''
  );
  const [selectedStylistId, setSelectedStylistId] = useState<string>('any');
  const [selectedDate, setSelectedDate] = useState<string>(dateOptions[0].iso);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(TIME_SLOTS[1]);
  const [customerName, setCustomerName] = useState<string>(currentUser?.name || '');
  const [customerPhone, setCustomerPhone] = useState<string>(currentUser?.phone || '');
  const [customerEmail, setCustomerEmail] = useState<string>(currentUser?.email || '');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'salon' | 'online'>('salon');

  // Success Confirmation Card State
  const [recentBooking, setRecentBooking] = useState<{
    code: string;
    serviceName: string;
    stylistName: string;
    date: string;
    time: string;
    total: number;
    phone: string;
  } | null>(null);

  // Status Search State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const selectedService = services.find((s) => s.id === selectedServiceId) || services[0];
  const selectedStylist =
    selectedStylistId === 'any'
      ? undefined
      : stylists.find((st) => st.id === selectedStylistId);

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim()) {
      addToast('Name Required', 'Please provide your full name for the reservation.', 'warning');
      return;
    }
    if (!customerPhone.trim()) {
      addToast('Phone Required', 'Please enter your phone number for SMS confirmation.', 'warning');
      return;
    }
    if (!selectedService) {
      addToast('Service Missing', 'Please choose a salon or spa treatment.', 'warning');
      return;
    }

    const bookingId = createBooking({
      service: selectedService,
      stylist: selectedStylist,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim() || `${customerName.toLowerCase().replace(/\s+/g, '')}@client.com`,
      customerPhone: customerPhone.trim(),
      specialInstructions: specialRequests.trim(),
      addons: [],
      totalPrice: selectedService.price,
      paymentMethod,
      paymentStatus: paymentMethod === 'online' ? 'paid' : 'pending',
      status: 'confirmed',
    });

    // Fire Confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4A373', '#E5DDD5', '#FFFFFF', '#C26D7C'],
      });
    } catch {
      // ignore
    }

    // Find created booking code
    const createdBooking = bookings.find((b) => b.id === bookingId);
    const code = createdBooking ? createdBooking.bookingCode : `LRA-${Math.floor(1000 + Math.random() * 9000)}`;

    setRecentBooking({
      code,
      serviceName: selectedService.name,
      stylistName: selectedStylist ? selectedStylist.name : 'Master Atelier Specialist',
      date: selectedDate,
      time: selectedTimeSlot,
      total: selectedService.price,
      phone: customerPhone.trim(),
    });
  };

  // Filtered bookings for status check
  const matchedBookings = bookings.filter((b) => {
    if (!searchQuery.trim()) return false;
    const query = searchQuery.trim().toLowerCase();
    return (
      b.bookingCode.toLowerCase().includes(query) ||
      b.customerPhone.toLowerCase().includes(query) ||
      b.customerEmail.toLowerCase().includes(query) ||
      b.customerName.toLowerCase().includes(query)
    );
  });

  return (
    <section id="customer-appointment-section" className="py-20 bg-[#161616] text-white relative overflow-hidden">
      {/* Subtle luxury ambient lights */}
      <div className="absolute left-0 top-0 w-96 h-96 bg-[#D4A373]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-[#C26D7C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4A373]/10 border border-[#D4A373]/30 text-[#D4A373] text-[11px] font-bold tracking-[0.25em] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            HAUTE BEAUTÉ ATELIER RESERVATIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight mb-4">
            Customer Appointment & Suite Reservations
          </h2>
          <p className="text-sm sm:text-base text-[#D0C6BE] font-light leading-relaxed">
            Reserve your bespoke beauty ritual, Japanese head spa hydrotherapy, or master hair couture in our private suites. Instant confirmation guaranteed.
          </p>

          {/* Tab Navigation */}
          <div className="inline-flex p-1 rounded-full bg-[#242424] border border-[#333333] mt-8 shadow-inner">
            <button
              onClick={() => {
                setActiveTab('book');
                setRecentBooking(null);
              }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                activeTab === 'book'
                  ? 'bg-[#D4A373] text-black shadow-md'
                  : 'text-[#B5AAA2] hover:text-white'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
            <button
              onClick={() => setActiveTab('status')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                activeTab === 'status'
                  ? 'bg-[#D4A373] text-black shadow-md'
                  : 'text-[#B5AAA2] hover:text-white'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Track Appointment Status</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Book New Appointment */}
        {activeTab === 'book' && (
          <div>
            {recentBooking ? (
              /* Success Confirmation Card */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto bg-[#1F1F1F] border border-[#D4A373]/50 rounded-3xl p-8 sm:p-10 shadow-2xl text-center relative overflow-hidden"
              >
                <div className="w-16 h-16 rounded-full bg-[#D4A373]/20 border border-[#D4A373] flex items-center justify-center mx-auto mb-6 text-[#D4A373]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4A373] block mb-1">
                  RESERVATION CONFIRMED
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-3">
                  Your Atelier Suite is Reserved
                </h3>
                <p className="text-sm text-[#B5AAA2] mb-8 max-w-md mx-auto">
                  A confirmation SMS & calendar invite have been dispatched. Please present your booking code upon arrival.
                </p>

                {/* Ticket Details Box */}
                <div className="bg-[#171717] rounded-2xl border border-[#333333] p-6 text-left mb-8 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#2A2A2A]">
                    <span className="text-xs text-[#8E857E] uppercase tracking-wider">Booking Reference</span>
                    <span className="text-sm font-mono font-bold text-[#D4A373] bg-[#2A241F] px-3 py-1 rounded-md border border-[#D4A373]/30">
                      {recentBooking.code}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[#8E857E] block mb-1">Treatment Ritual</span>
                      <span className="text-white font-medium text-sm">{recentBooking.serviceName}</span>
                    </div>
                    <div>
                      <span className="text-[#8E857E] block mb-1">Master Specialist</span>
                      <span className="text-white font-medium text-sm">{recentBooking.stylistName}</span>
                    </div>
                    <div>
                      <span className="text-[#8E857E] block mb-1">Reserved Date</span>
                      <span className="text-white font-medium text-sm">{recentBooking.date}</span>
                    </div>
                    <div>
                      <span className="text-[#8E857E] block mb-1">Reserved Time Slot</span>
                      <span className="text-white font-medium text-sm">{recentBooking.time}</span>
                    </div>
                    <div>
                      <span className="text-[#8E857E] block mb-1">Guest Phone</span>
                      <span className="text-white font-medium text-sm">{recentBooking.phone}</span>
                    </div>
                    <div>
                      <span className="text-[#8E857E] block mb-1">Total Payable</span>
                      <span className="text-[#D4A373] font-bold text-sm">{formatINR(recentBooking.total)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => setRecentBooking(null)}
                    className="px-6 py-3 rounded-full bg-[#D4A373] hover:bg-[#c29160] text-black text-xs font-bold tracking-wider uppercase transition-colors"
                  >
                    Book Another Appointment
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('status');
                      setSearchQuery(recentBooking.code);
                    }}
                    className="px-6 py-3 rounded-full bg-[#2B2B2B] hover:bg-[#383838] text-white border border-[#444] text-xs font-semibold tracking-wider uppercase transition-colors"
                  >
                    View in Status Tracker
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Two-Column Booking Engine */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Form Column (7 cols) */}
                <form
                  onSubmit={handleBookAppointment}
                  className="lg:col-span-7 bg-[#1C1C1C] border border-[#2E2E2E] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl space-y-7"
                >
                  {/* Step 1: Select Service */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#D4A373] mb-2 flex items-center justify-between">
                      <span>1. Select Treatment / Service</span>
                      <span className="text-[11px] text-[#A69B93] font-normal lowercase">
                        {services.length} luxury treatments available
                      </span>
                    </label>
                    <div className="relative">
                      <select
                        value={selectedServiceId}
                        onChange={(e) => setSelectedServiceId(e.target.value)}
                        className="w-full bg-[#262626] border border-[#3D3D3D] rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#D4A373] transition-colors appearance-none cursor-pointer"
                      >
                        {services.map((srv) => (
                          <option key={srv.id} value={srv.id} className="bg-[#1C1C1C] text-white py-2">
                            {srv.name} — {formatINR(srv.price)} ({srv.durationMinutes} mins)
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8E857E]">
                        ▼
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Select Specialist */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#D4A373] mb-2">
                      2. Choose Master Specialist
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setSelectedStylistId('any')}
                        className={`p-3 rounded-xl border text-left transition-all text-xs ${
                          selectedStylistId === 'any'
                            ? 'bg-[#D4A373]/15 border-[#D4A373] text-white'
                            : 'bg-[#262626] border-[#363636] text-[#B5AAA2] hover:border-[#555]'
                        }`}
                      >
                        <span className="font-semibold block text-white">Any Specialist</span>
                        <span className="text-[10px] text-[#8E857E] block">First available master</span>
                      </button>
                      {stylists.slice(0, 5).map((st) => (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => setSelectedStylistId(st.id)}
                          className={`p-3 rounded-xl border text-left transition-all text-xs ${
                            selectedStylistId === st.id
                              ? 'bg-[#D4A373]/15 border-[#D4A373] text-white'
                              : 'bg-[#262626] border-[#363636] text-[#B5AAA2] hover:border-[#555]'
                          }`}
                        >
                          <span className="font-semibold block text-white truncate">{st.name}</span>
                          <span className="text-[10px] text-[#D4A373] block truncate">{st.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Date Selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#D4A373] mb-2 flex items-center justify-between">
                      <span>3. Choose Reservation Date</span>
                      <span className="text-[11px] text-[#A69B93] font-normal">{selectedDate}</span>
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {dateOptions.map((opt) => {
                        const isSelected = selectedDate === opt.iso;
                        return (
                          <button
                            key={opt.iso}
                            type="button"
                            onClick={() => setSelectedDate(opt.iso)}
                            className={`py-3 px-2 rounded-xl border text-center transition-all flex flex-col items-center justify-center ${
                              isSelected
                                ? 'bg-[#D4A373] text-black border-[#D4A373] font-bold shadow-md'
                                : 'bg-[#262626] border-[#383838] text-[#D0C6BE] hover:border-[#666]'
                            }`}
                          >
                            <span className="text-[10px] uppercase font-semibold block">{opt.dayName}</span>
                            <span className="text-base font-bold my-0.5 block">{opt.dateNumber}</span>
                            <span className="text-[9px] uppercase tracking-wider opacity-80 block">{opt.monthName}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 4: Time Slot Selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#D4A373] mb-2">
                      4. Choose Time Slot
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {TIME_SLOTS.map((slot) => {
                        const isSelected = selectedTimeSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`py-2.5 px-3 rounded-lg border text-xs font-medium transition-all text-center flex items-center justify-center gap-1.5 ${
                              isSelected
                                ? 'bg-[#D4A373] text-black border-[#D4A373] font-bold'
                                : 'bg-[#262626] border-[#383838] text-[#D0C6BE] hover:border-[#666]'
                            }`}
                          >
                            <Clock className="w-3.5 h-3.5" />
                            <span>{slot}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 5: Guest Information */}
                  <div className="space-y-4 pt-2 border-t border-[#2A2A2A]">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#D4A373]">
                      5. Customer Information
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="relative">
                          <User className="w-4 h-4 text-[#8E857E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            placeholder="Full Name *"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full bg-[#262626] border border-[#383838] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#78716C] focus:outline-none focus:border-[#D4A373]"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-[#8E857E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            required
                            placeholder="Phone Number (SMS alerts) *"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="w-full bg-[#262626] border border-[#383838] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#78716C] focus:outline-none focus:border-[#D4A373]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-[#8E857E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            placeholder="Email Address (Optional)"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            className="w-full bg-[#262626] border border-[#383838] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#78716C] focus:outline-none focus:border-[#D4A373]"
                          />
                        </div>
                      </div>

                      <div>
                        <input
                          type="text"
                          placeholder="Special Requests (Allergies, Bridal, etc.)"
                          value={specialRequests}
                          onChange={(e) => setSpecialRequests(e.target.value)}
                          className="w-full bg-[#262626] border border-[#383838] rounded-xl px-4 py-3 text-sm text-white placeholder-[#78716C] focus:outline-none focus:border-[#D4A373]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 6: Payment Preference */}
                  <div className="pt-2 border-t border-[#2A2A2A] flex flex-wrap items-center justify-between gap-4">
                    <div className="text-xs text-[#A69B93]">
                      <span>Payment Preference: </span>
                      <span className="text-white font-medium capitalize">{paymentMethod === 'salon' ? 'Pay at Salon Desk' : 'Pay Online'}</span>
                    </div>

                    <div className="inline-flex rounded-lg bg-[#262626] p-1 border border-[#383838]">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('salon')}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                          paymentMethod === 'salon' ? 'bg-[#D4A373] text-black font-bold' : 'text-[#B5AAA2]'
                        }`}
                      >
                        Pay at Salon
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('online')}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                          paymentMethod === 'online' ? 'bg-[#D4A373] text-black font-bold' : 'text-[#B5AAA2]'
                        }`}
                      >
                        Pay Online (UPI / Card)
                      </button>
                    </div>
                  </div>

                  {/* Total & Submit Button */}
                  <div className="pt-4 border-t border-[#2E2E2E] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] text-[#8E857E] uppercase tracking-wider block">Estimated Total</span>
                      <span className="text-2xl font-serif text-[#D4A373] font-bold">
                        {formatINR(selectedService?.price || 0)}
                      </span>
                      <span className="text-[10px] text-[#A69B93] block">
                        Includes suite sanitization & welcome elixir
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#D4A373] hover:bg-[#c29160] text-black font-bold text-xs tracking-widest uppercase transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                    >
                      Confirm Customer Appointment
                    </button>
                  </div>
                </form>

                {/* Information & Atelier Highlights Column (5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Selected Summary Card */}
                  <div className="bg-[#1F1F1F] border border-[#2E2E2E] rounded-3xl p-6 sm:p-7 shadow-lg">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4A373] block mb-3">
                      RESERVATION SUMMARY
                    </span>
                    
                    <div className="flex items-start gap-4 mb-5 pb-5 border-b border-[#2C2C2C]">
                      <img
                        src={selectedService.image}
                        alt={selectedService.name}
                        className="w-16 h-16 rounded-2xl object-cover border border-[#3E3E3E] shrink-0"
                      />
                      <div>
                        <h4 className="text-white font-medium text-sm leading-snug">{selectedService.name}</h4>
                        <span className="text-xs text-[#D4A373] font-semibold mt-1 block">
                          {formatINR(selectedService.price)} • {selectedService.durationMinutes} mins
                        </span>
                        <span className="text-[11px] text-[#A69B93] block mt-0.5 line-clamp-1">
                          {selectedService.category.replace('service-', '').toUpperCase()} ATELIER
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2.5 text-xs text-[#C8BFB7]">
                      <div className="flex items-center justify-between">
                        <span className="text-[#8E857E]">Specialist:</span>
                        <span className="text-white font-medium">{selectedStylist ? selectedStylist.name : 'Master Specialist (Auto)'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#8E857E]">Date:</span>
                        <span className="text-white font-medium">{selectedDate}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#8E857E]">Time Slot:</span>
                        <span className="text-white font-medium">{selectedTimeSlot}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#8E857E]">Location:</span>
                        <span className="text-white font-medium">L&apos;AURA Flagship Atelier, Floor 2</span>
                      </div>
                    </div>
                  </div>

                  {/* Why Atelier Laura Suite */}
                  <div className="bg-[#191919] border border-[#2A2A2A] rounded-3xl p-6 sm:p-7 space-y-4">
                    <h4 className="font-serif text-lg text-white font-normal">
                      The Atelier Suite Experience
                    </h4>

                    <div className="space-y-3.5 text-xs">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#D4A373]/10 border border-[#D4A373]/30 flex items-center justify-center shrink-0 text-[#D4A373]">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-white font-semibold block">Medical-Grade Hygiene</span>
                          <span className="text-[#A69B93] leading-relaxed">
                            Autoclaved surgical-steel tools and fresh botanical formulations opened before you.
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#D4A373]/10 border border-[#D4A373]/30 flex items-center justify-center shrink-0 text-[#D4A373]">
                          <Coffee className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-white font-semibold block">Artisanal Hospitality</span>
                          <span className="text-[#A69B93] leading-relaxed">
                            Enjoy chilled organic cold-pressed wellness shots or artisanal French herbal infusions.
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#D4A373]/10 border border-[#D4A373]/30 flex items-center justify-center shrink-0 text-[#D4A373]">
                          <Award className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-white font-semibold block">Micro-Diagnostic Analysis</span>
                          <span className="text-[#A69B93] leading-relaxed">
                            Complimentary high-definition scalp & dermis assessment included with every treatment.
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#2A2A2A] flex items-center justify-between text-xs">
                      <span className="text-[#8E857E]">Prefer full customizer?</span>
                      <button
                        onClick={() => {
                          setActiveView('booking');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-[#D4A373] hover:underline font-semibold flex items-center gap-1"
                      >
                        <span>Open 7-Step Engine</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            )}
          </div>
        )}

        {/* Tab 2: Track Appointment Status */}
        {activeTab === 'status' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#1C1C1C] border border-[#2E2E2E] rounded-3xl p-6 sm:p-8 shadow-xl mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4A373] block mb-2">
                LIVE APPOINTMENT LOOKUP
              </span>
              <h3 className="font-serif text-2xl text-white font-normal mb-4">
                Check Your Reservation Details
              </h3>
              <p className="text-xs sm:text-sm text-[#A69B93] mb-6">
                Enter your Booking Reference (e.g. LRA-5921), registered phone number, or email to verify time, assigned stylist, or suite status.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-[#8E857E] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Enter Booking Code (LRA-XXXX) or Phone Number..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setHasSearched(true);
                    }}
                    className="w-full bg-[#262626] border border-[#383838] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-[#78716C] focus:outline-none focus:border-[#D4A373]"
                  />
                </div>
                <button
                  onClick={() => setHasSearched(true)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#D4A373] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#c29160] transition-colors"
                >
                  Search Booking
                </button>
              </div>
            </div>

            {/* Search Results */}
            <div className="space-y-4">
              {hasSearched && searchQuery.trim() && matchedBookings.length === 0 && (
                <div className="bg-[#191919] border border-[#2A2A2A] rounded-2xl p-8 text-center text-[#A69B93]">
                  <AlertCircle className="w-10 h-10 text-[#D4A373] mx-auto mb-3" />
                  <h4 className="text-white text-base font-medium mb-1">No Active Booking Found</h4>
                  <p className="text-xs max-w-md mx-auto mb-6">
                    We couldn&apos;t find an appointment matching &ldquo;{searchQuery}&rdquo;. Please verify your booking reference code or registered phone number.
                  </p>
                  <button
                    onClick={() => {
                      setActiveTab('book');
                      setSearchQuery('');
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#D4A373] text-black text-xs font-bold uppercase tracking-wider"
                  >
                    Create New Reservation
                  </button>
                </div>
              )}

              {matchedBookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-[#1C1C1C] border border-[#333333] hover:border-[#D4A373]/50 rounded-2xl p-6 transition-all shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#2A2A2A]">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono font-bold text-sm text-[#D4A373] bg-[#2A241F] px-2.5 py-0.5 rounded border border-[#D4A373]/30">
                          {b.bookingCode}
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                            b.status === 'confirmed'
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                              : b.status === 'cancelled'
                              ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                              : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>
                      <h4 className="text-white font-medium text-base">{b.service.name}</h4>
                    </div>

                    <div className="text-right">
                      <span className="text-[#D4A373] font-bold text-base block">{formatINR(b.totalPrice)}</span>
                      <span className="text-[11px] text-[#8E857E] capitalize">{b.paymentStatus} • {b.paymentMethod}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 text-xs text-[#B5AAA2]">
                    <div>
                      <span className="text-[#8E857E] block text-[11px]">Date</span>
                      <span className="text-white font-medium">{b.date}</span>
                    </div>
                    <div>
                      <span className="text-[#8E857E] block text-[11px]">Time</span>
                      <span className="text-white font-medium">{b.timeSlot}</span>
                    </div>
                    <div>
                      <span className="text-[#8E857E] block text-[11px]">Specialist</span>
                      <span className="text-white font-medium">{b.stylist?.name || 'Master Specialist'}</span>
                    </div>
                    <div>
                      <span className="text-[#8E857E] block text-[11px]">Guest</span>
                      <span className="text-white font-medium truncate block">{b.customerName}</span>
                    </div>
                  </div>

                  {b.status === 'confirmed' && (
                    <div className="pt-3 border-t border-[#262626] flex items-center justify-between">
                      <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Atelier suite scheduled
                      </span>
                      <button
                        onClick={() => cancelBooking(b.id)}
                        className="text-xs text-rose-400 hover:text-rose-300 transition-colors underline"
                      >
                        Cancel Appointment
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {/* Show recent salon bookings list if user hasn't searched yet */}
              {!hasSearched && bookings.length > 0 && (
                <div className="space-y-3">
                  <span className="text-xs text-[#8E857E] uppercase tracking-wider block">
                    Recent Bookings in Atelier ({bookings.length})
                  </span>
                  {bookings.slice(0, 3).map((b) => (
                    <div
                      key={b.id}
                      className="bg-[#1F1F1F] border border-[#2E2E2E] rounded-xl p-4 flex items-center justify-between gap-4 text-xs"
                    >
                      <div>
                        <span className="font-mono text-[#D4A373] font-bold block">{b.bookingCode}</span>
                        <span className="text-white font-medium">{b.service.name}</span>
                        <span className="text-[#8E857E] block text-[11px] mt-0.5">
                          {b.date} at {b.timeSlot} • {b.customerName}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setSearchQuery(b.bookingCode);
                          setHasSearched(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#2A2A2A] hover:bg-[#383838] text-[#D4A373] border border-[#444] transition-colors"
                      >
                        Details
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
