import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare, ChevronDown } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { addToast } = useApp();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Message Dispatched', 'Our VIP concierge team will respond within 4 business hours.');
  };

  const faqs = [
    {
      q: 'Do I need to book my salon suite in advance?',
      a: 'We strongly recommend reserving at least 48 hours in advance for hair couture and Japanese head spas, though same-day VIP walk-in slots are subject to suite availability.',
    },
    {
      q: 'Are your cosmetic boutique products tested on animals?',
      a: 'Never. L’AURA is Leaping Bunny certified and 100% cruelty-free. All testing is conducted in vitreo using advanced dermatological cell cultures.',
    },
    {
      q: 'What is your salon cancellation policy?',
      a: 'Appointments may be rescheduled or cancelled up to 24 hours prior to your scheduled time without fee via your online dashboard.',
    },
    {
      q: 'Do you offer private bridal and VIP event bookings?',
      a: 'Yes, our entire penthouse atelier can be reserved exclusively for bridal parties, champagne styling soirées, and red-carpet preparations.',
    },
  ];

  return (
    <div className="bg-[#FCF9F7] min-h-screen py-12 sm:py-20 text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.25em] text-[#D4A373] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
            Concierge Desk
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] font-normal">
            Connect With L'AURA Maison
          </h1>
          <p className="text-xs sm:text-sm text-[#8C827A] mt-3">
            Inquire about bespoke consultations, bridal suites, or boutique orders.
          </p>
        </div>

        {/* Contact Info & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Info Side (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-8 border border-[#E5DDD5] shadow-sm space-y-6">
              <h3 className="font-serif text-2xl text-[#1A1A1A]">Beverly Hills Flagship</h3>

              <div className="space-y-4 text-xs text-[#5C554E]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#D4A373] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1A1A1A] block text-sm">L'AURA Atelier Suites</strong>
                    <p>9450 Wilshire Boulevard, Penthouse 8</p>
                    <p>Beverly Hills, CA 90212</p>
                    <span className="text-[11px] text-[#D4A373] font-medium block mt-1">
                      ★ Valet Parking available at private porte-cochère
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#D4A373] shrink-0" />
                  <div>
                    <strong className="text-[#1A1A1A] block">Concierge Direct</strong>
                    <span>+1 (310) 855-9000</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#D4A373] shrink-0" />
                  <div>
                    <strong className="text-[#1A1A1A] block">Email Inquiries</strong>
                    <span>concierge@laura-beaute.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#D4A373] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1A1A1A] block">Atelier Hours</strong>
                    <p>Tuesday – Saturday: 09:00 AM – 08:00 PM</p>
                    <p>Sunday: 10:00 AM – 06:00 PM</p>
                    <p className="text-[#8C827A]">Monday: Closed for suite deep sanitization</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Paris Lab Note */}
            <div className="p-6 rounded-2xl bg-white border border-[#E5DDD5] text-xs text-[#1A1A1A] space-y-1">
              <span className="font-bold text-[#D4A373] uppercase tracking-wider block text-[10px]">
                European Formulation Lab
              </span>
              <p className="font-serif text-sm font-semibold text-[#1A1A1A]">14 Rue du Faubourg Saint-Honoré, 75008 Paris</p>
              <p className="text-[#8C827A]">Cosmetic research, botanical extractions & private reserves.</p>
            </div>
          </div>

          {/* Form Side (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-8 sm:p-10 border border-[#E5DDD5] shadow-sm">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#FCF9F7] text-[#D4A373] border border-[#E5DDD5] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif text-3xl text-[#1A1A1A]">Message Received</h3>
                  <p className="text-xs sm:text-sm text-[#8C827A] max-w-sm mx-auto">
                    Thank you, {form.name}. A dedicated beauty concierge has received your request and will contact you promptly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
                    }}
                    className="px-6 py-2.5 bg-[#1A1A1A] text-white text-xs font-bold rounded-full uppercase tracking-wider hover:bg-[#D4A373] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-serif text-2xl text-[#1A1A1A]">Dispatch an Inquiry</h3>
                  <p className="text-xs text-[#8C827A]">
                    Please share your questions or specific treatment requirements.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Charlotte Dubois"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                        placeholder="e.g. charlotte@domain.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs border border-[#E5DDD5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +1 (310) 000-0000"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs border border-[#E5DDD5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                        Topic / Subject
                      </label>
                      <select
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs border border-[#E5DDD5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50 bg-white"
                      >
                        <option value="General Inquiry">General Atelier Inquiry</option>
                        <option value="Bridal Consultation">Bridal Suite Package</option>
                        <option value="VIP Membership">L'AURA Privé Membership</option>
                        <option value="Boutique Orders">Boutique & Order Tracking</option>
                        <option value="Press & Careers">Press & Media Relations</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                      Your Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please include preferred appointment dates or specific questions..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-[#E5DDD5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-[#1A1A1A] hover:bg-[#D4A373] text-white text-xs font-bold rounded-full tracking-wider uppercase transition-colors flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Transmit Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#E5DDD5] shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4A373]">Common Inquiries</span>
            <h2 className="font-serif text-3xl text-[#1A1A1A] mt-1">Frequently Asked Questions</h2>
          </div>

          <div className="divide-y divide-[#E5DDD5] max-w-3xl mx-auto">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left text-sm font-semibold text-[#1A1A1A] hover:text-[#D4A373] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#D4A373] transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <p className="mt-3 text-xs sm:text-sm text-[#5C554E] font-light leading-relaxed">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
