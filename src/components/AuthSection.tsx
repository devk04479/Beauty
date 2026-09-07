import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Lock,
  Mail,
  User,
  Phone,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Crown,
  Gift,
  KeyRound,
  LogOut,
  Calendar,
  Package,
  Heart,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthSectionProps {
  id?: string;
  defaultTab?: 'login' | 'signup';
  isModal?: boolean;
  onSuccess?: () => void;
}

export const AuthSection: React.FC<AuthSectionProps> = ({
  id = 'auth-section',
  defaultTab = 'login',
  isModal = false,
  onSuccess,
}) => {
  const {
    currentUser,
    login,
    signup,
    logout,
    setActiveView,
    addToast,
    bookings,
    orders,
    wishlist,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(defaultTab);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [signupRole, setSignupRole] = useState<'customer' | 'admin'>('customer');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isSigningUp, setIsSigningUp] = useState(false);

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', color: 'bg-zinc-700' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 25, label: 'Basic', color: 'bg-amber-500' };
    if (score === 2) return { score: 50, label: 'Moderate', color: 'bg-yellow-500' };
    if (score === 3) return { score: 75, label: 'Strong', color: 'bg-emerald-500' };
    return { score: 100, label: 'Elite Security', color: 'bg-[#D4A373]' };
  };

  const strength = getPasswordStrength(signupPassword);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      addToast('Email Required', 'Please enter your email address to sign in.', 'error');
      return;
    }
    if (!loginPassword.trim()) {
      addToast('Password Required', 'Please enter your account password.', 'error');
      return;
    }

    setIsLoggingIn(true);
    setTimeout(() => {
      // If email has admin keyword or user selected admin
      const role = loginEmail.toLowerCase().includes('admin') ? 'admin' : 'customer';
      const name = loginEmail.split('@')[0].replace(/[^a-zA-Z]/g, ' ') || 'Valued Member';
      const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
      login(loginEmail, formattedName, role);
      setIsLoggingIn(false);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {
        // Confetti fallback
      }
      if (onSuccess) onSuccess();
    }, 600);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName.trim()) {
      addToast('Full Name Required', 'Please provide your name for the VIP membership card.', 'error');
      return;
    }
    if (!signupEmail.trim()) {
      addToast('Email Required', 'Please enter a valid email address.', 'error');
      return;
    }
    if (signupPassword.length < 6) {
      addToast('Password Too Short', 'Password must be at least 6 characters long.', 'warning');
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      addToast('Passwords Mismatch', 'Password confirmation does not match.', 'error');
      return;
    }

    setIsSigningUp(true);
    setTimeout(() => {
      signup(signupName, signupEmail, signupPhone, signupRole, signupPassword);
      setIsSigningUp(false);
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {
        // fallback
      }
      if (onSuccess) onSuccess();
    }, 700);
  };

  // Quick 1-click demo logins
  const handleQuickDemo = (type: 'vip' | 'admin') => {
    if (type === 'vip') {
      login('genevieve@laura-beaute.com', 'Lady Genevieve', 'customer');
    } else {
      login('admin@laura-beaute.com', 'Director Valerie Blanc', 'admin');
    }
    try {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
    } catch {
      // fallback
    }
    if (onSuccess) onSuccess();
  };

  const handleForgotPassword = () => {
    if (!loginEmail.trim()) {
      addToast('Enter Email First', 'Please type your account email in the box above.', 'info');
      return;
    }
    addToast(
      'Reset Link Dispatched',
      `A secure password recovery instructions email was sent to ${loginEmail}.`,
      'success'
    );
  };

  return (
    <section
      id={id}
      className={`${
        isModal
          ? 'py-0'
          : 'py-16 sm:py-24 bg-[#111111] text-[#FCF9F7] border-t border-[#D4A373]/30 relative overflow-hidden'
      }`}
    >
      {!isModal && (
        <>
          {/* Subtle luxury ambient glows */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#D4A373]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#D4A373]/10 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      <div className={`${isModal ? 'w-full' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'}`}>
        {!isModal && (
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4A373]/15 border border-[#D4A373]/40 text-[#D4A373] text-[11px] font-bold tracking-[0.25em] uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Privé Membership & Client Portal</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal tracking-tight">
              Sign In or Create Your Atelier Account
            </h2>

            <p className="text-xs sm:text-sm text-[#E5DDD5]/80 font-light max-w-2xl mx-auto leading-relaxed">
              Unlock personalized salon reservations, private formulation orders, real-time treatment tracking, and complimentary welcome loyalty rewards.
            </p>
          </div>
        )}

        {/* If user is already logged in, display their luxury status & quick switch */}
        {currentUser ? (
          <div className="max-w-4xl mx-auto bg-[#1A1A1A] border border-[#D4A373]/40 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10 text-center md:text-left">
              <div className="flex items-center gap-4 flex-col sm:flex-row">
                <div className="relative">
                  <div className="w-18 h-18 rounded-full bg-gradient-to-tr from-[#D4A373] to-[#F5D0A9] p-0.5 shadow-lg">
                    <div className="w-full h-full rounded-full bg-[#111111] flex items-center justify-center text-xl font-serif text-[#D4A373] font-bold">
                      {currentUser.name.charAt(0)}
                    </div>
                  </div>
                  <span className="absolute -bottom-1 -right-1 bg-[#D4A373] text-black p-1 rounded-full text-xs shadow-md">
                    <Crown className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                    <h3 className="font-serif text-2xl text-white font-normal">
                      {currentUser.name}
                    </h3>
                    <span className="px-3 py-0.5 rounded-full bg-[#D4A373]/20 border border-[#D4A373]/50 text-[#D4A373] text-[10px] font-bold uppercase tracking-wider">
                      {currentUser.role === 'admin' ? 'Atelier Director' : `${currentUser.membershipTier} Member`}
                    </span>
                  </div>
                  <p className="text-xs text-white/60 mt-1">{currentUser.email}</p>
                  <p className="text-[11px] text-[#D4A373] font-mono mt-0.5">
                    {currentUser.phone || '+1 (555) 234-8900'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setActiveView('dashboard');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 bg-[#D4A373] hover:bg-[#b88555] text-black font-bold text-xs rounded-full uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-lg"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>My Dashboard</span>
                </button>
                <button
                  onClick={logout}
                  className="px-4 py-2.5 border border-rose-500/40 text-rose-300 hover:bg-rose-500/10 font-bold text-xs rounded-full uppercase tracking-wider transition-colors flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics & Next Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div
                onClick={() => setActiveView('dashboard')}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4A373]/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs text-white/70 mb-1">
                  <span>Loyalty Balance</span>
                  <Sparkles className="w-4 h-4 text-[#D4A373]" />
                </div>
                <div className="font-serif text-2xl text-[#D4A373] font-medium">
                  {currentUser.loyaltyPoints.toLocaleString()} <span className="text-xs font-sans text-white/60">pts</span>
                </div>
                <p className="text-[10px] text-white/50 mt-1 group-hover:text-white transition-colors flex items-center gap-1">
                  <span>Redeem at checkout</span>
                  <ChevronRight className="w-3 h-3" />
                </p>
              </div>

              <div
                onClick={() => setActiveView('dashboard')}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4A373]/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs text-white/70 mb-1">
                  <span>My Appointments</span>
                  <Calendar className="w-4 h-4 text-[#D4A373]" />
                </div>
                <div className="font-serif text-2xl text-white font-medium">
                  {bookings.length} <span className="text-xs font-sans text-white/60">active</span>
                </div>
                <p className="text-[10px] text-white/50 mt-1 group-hover:text-white transition-colors flex items-center gap-1">
                  <span>View booking passes</span>
                  <ChevronRight className="w-3 h-3" />
                </p>
              </div>

              <div
                onClick={() => setActiveView('dashboard')}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4A373]/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs text-white/70 mb-1">
                  <span>Boutique Orders</span>
                  <Package className="w-4 h-4 text-[#D4A373]" />
                </div>
                <div className="font-serif text-2xl text-white font-medium">
                  {orders.length} <span className="text-xs font-sans text-white/60">orders</span>
                </div>
                <p className="text-[10px] text-white/50 mt-1 group-hover:text-white transition-colors flex items-center gap-1">
                  <span>Live tracking history</span>
                  <ChevronRight className="w-3 h-3" />
                </p>
              </div>
            </div>

            {/* Switch Account Quick Option */}
            <div className="pt-2 flex items-center justify-between flex-wrap gap-3 text-xs text-white/60">
              <span>Want to test with a different account?</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleQuickDemo('vip')}
                  className="text-[11px] font-bold text-[#D4A373] hover:underline"
                >
                  Switch to Lady Genevieve (VIP)
                </button>
                <span>•</span>
                <button
                  onClick={() => handleQuickDemo('admin')}
                  className="text-[11px] font-bold text-[#D4A373] hover:underline"
                >
                  Switch to Salon Director (Admin)
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start max-w-6xl mx-auto">
            {/* Left Col / Auth Card */}
            <div className="lg:col-span-7 bg-[#171717] rounded-3xl border border-[#D4A373]/30 p-6 sm:p-10 shadow-2xl relative">
              {/* Tab Selector Buttons */}
              <div className="grid grid-cols-2 p-1.5 bg-black/50 rounded-2xl border border-white/10 mb-8">
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className={`py-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'login'
                      ? 'bg-[#D4A373] text-black shadow-md'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('signup')}
                  className={`py-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'signup'
                      ? 'bg-[#D4A373] text-black shadow-md'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Create Account</span>
                </button>
              </div>

              {/* TAB 1: LOGIN FORM */}
              {activeTab === 'login' && (
                <motion.form
                  key="login-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleLogin}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-xs font-semibold text-white/90 uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="e.g. genevieve@laura-beaute.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-black/40 border border-white/20 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#D4A373] focus:ring-1 focus:ring-[#D4A373] transition-all"
                      />
                      <Mail className="w-4 h-4 text-[#D4A373] absolute left-4 top-3.5" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-white/90 uppercase tracking-wider">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-[11px] text-[#D4A373] hover:underline transition-colors"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showLoginPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full pl-11 pr-11 py-3 bg-black/40 border border-white/20 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#D4A373] focus:ring-1 focus:ring-[#D4A373] transition-all"
                      />
                      <Lock className="w-4 h-4 text-[#D4A373] absolute left-4 top-3.5" />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-3.5 top-3.5 text-white/60 hover:text-white"
                        aria-label="Toggle password view"
                      >
                        {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-white/70">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded bg-black/50 border-white/20 text-[#D4A373] focus:ring-[#D4A373]"
                      />
                      <span>Remember this device</span>
                    </label>
                    <span className="text-[11px] text-white/50">Encrypted 256-bit</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full py-3.5 bg-gradient-to-r from-[#D4A373] via-[#E2B788] to-[#D4A373] hover:from-[#c29161] hover:to-[#c29161] text-black font-bold text-xs sm:text-sm rounded-xl uppercase tracking-widest transition-all shadow-lg shadow-[#D4A373]/25 flex items-center justify-center gap-2"
                  >
                    {isLoggingIn ? (
                      <span className="inline-block animate-pulse">Authenticating Atelier...</span>
                    ) : (
                      <>
                        <span>Sign In to Atelier</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* 1-Click Demo Accounts Quick Sign In */}
                  <div className="pt-4 border-t border-white/10 space-y-2.5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-white/60 text-center">
                      — Fast 1-Click Demo Logins —
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleQuickDemo('vip')}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4A373]/60 transition-all text-left flex items-center gap-2.5 group"
                      >
                        <div className="w-7 h-7 rounded-full bg-[#D4A373]/20 flex items-center justify-center text-[#D4A373] shrink-0">
                          <Crown className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-white truncate group-hover:text-[#D4A373]">
                            Lady Genevieve
                          </p>
                          <p className="text-[10px] text-white/50 truncate">VIP Client (500 pts)</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleQuickDemo('admin')}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4A373]/60 transition-all text-left flex items-center gap-2.5 group"
                      >
                        <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-white truncate group-hover:text-[#D4A373]">
                            Valerie Blanc
                          </p>
                          <p className="text-[10px] text-white/50 truncate">Salon Admin Portal</p>
                        </div>
                      </button>
                    </div>
                  </div>
                </motion.form>
              )}

              {/* TAB 2: SIGNUP FORM */}
              {activeTab === 'signup' && (
                <motion.form
                  key="signup-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSignup}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/90 uppercase tracking-wider mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder="e.g. Princess Aaliyah"
                          value={signupName}
                          onChange={(e) => setSignupName(e.target.value)}
                          className="w-full pl-11 pr-4 py-2.5 bg-black/40 border border-white/20 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#D4A373] focus:ring-1 focus:ring-[#D4A373] transition-all"
                        />
                        <User className="w-4 h-4 text-[#D4A373] absolute left-4 top-3" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white/90 uppercase tracking-wider mb-2">
                        Phone / WhatsApp
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={signupPhone}
                          onChange={(e) => setSignupPhone(e.target.value)}
                          className="w-full pl-11 pr-4 py-2.5 bg-black/40 border border-white/20 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#D4A373] focus:ring-1 focus:ring-[#D4A373] transition-all"
                        />
                        <Phone className="w-4 h-4 text-[#D4A373] absolute left-4 top-3" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/90 uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="aaliyah@example.com"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-black/40 border border-white/20 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#D4A373] focus:ring-1 focus:ring-[#D4A373] transition-all"
                      />
                      <Mail className="w-4 h-4 text-[#D4A373] absolute left-4 top-3" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/90 uppercase tracking-wider mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showSignupPassword ? 'text' : 'password'}
                          required
                          placeholder="At least 6 chars"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          className="w-full pl-11 pr-10 py-2.5 bg-black/40 border border-white/20 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#D4A373] focus:ring-1 focus:ring-[#D4A373] transition-all"
                        />
                        <Lock className="w-4 h-4 text-[#D4A373] absolute left-4 top-3" />
                        <button
                          type="button"
                          onClick={() => setShowSignupPassword(!showSignupPassword)}
                          className="absolute right-3 top-3 text-white/60 hover:text-white"
                        >
                          {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white/90 uppercase tracking-wider mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={showSignupPassword ? 'text' : 'password'}
                          required
                          placeholder="Re-enter password"
                          value={signupConfirmPassword}
                          onChange={(e) => setSignupConfirmPassword(e.target.value)}
                          className="w-full pl-11 pr-4 py-2.5 bg-black/40 border border-white/20 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#D4A373] focus:ring-1 focus:ring-[#D4A373] transition-all"
                        />
                        <Lock className="w-4 h-4 text-[#D4A373] absolute left-4 top-3" />
                      </div>
                    </div>
                  </div>

                  {/* Password strength visual indicator */}
                  {signupPassword && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-white/60">
                        <span>Security strength: {strength.label}</span>
                        <span>{strength.score}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${strength.color} transition-all duration-300`}
                          style={{ width: `${strength.score}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Membership Role Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-white/90 uppercase tracking-wider mb-2">
                      Select Account Privilege Level
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setSignupRole('customer')}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          signupRole === 'customer'
                            ? 'bg-[#D4A373]/20 border-[#D4A373] text-white'
                            : 'bg-black/30 border-white/15 text-white/70 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-bold text-xs">
                          <Crown className="w-3.5 h-3.5 text-[#D4A373]" />
                          <span>VIP Client</span>
                        </div>
                        <p className="text-[10px] text-white/60 mt-0.5">
                          250 bonus points + 15% off code
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSignupRole('admin')}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          signupRole === 'admin'
                            ? 'bg-emerald-500/20 border-emerald-400 text-white'
                            : 'bg-black/30 border-white/15 text-white/70 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-bold text-xs">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Staff / Admin</span>
                        </div>
                        <p className="text-[10px] text-white/60 mt-0.5">
                          Catalog & booking controls
                        </p>
                      </button>
                    </div>
                  </div>

                  {/* Terms & Privé benefits checkbox */}
                  <label className="flex items-start gap-2.5 text-xs text-white/80 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded bg-black/50 border-white/20 text-[#D4A373] focus:ring-[#D4A373]"
                    />
                    <span className="leading-snug">
                      Join the <strong>L'AURA Privé Club</strong> to instantly receive 250 bonus loyalty points, priority appointment notifications, and exclusive seasonal gift invites.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={isSigningUp}
                    className="w-full py-3.5 bg-gradient-to-r from-[#D4A373] via-[#E2B788] to-[#D4A373] hover:from-[#c29161] hover:to-[#c29161] text-black font-bold text-xs sm:text-sm rounded-xl uppercase tracking-widest transition-all shadow-lg shadow-[#D4A373]/25 flex items-center justify-center gap-2"
                  >
                    {isSigningUp ? (
                      <span className="inline-block animate-pulse">Creating Your Privilege Pass...</span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Create Privé Account (Get 250 Pts)</span>
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </div>

            {/* Right Col / Privé Club Perks & Features */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-gradient-to-br from-[#211E1B] to-[#141414] border border-[#D4A373]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4A373] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Member Privileges
                  </span>
                  <h3 className="font-serif text-2xl text-white font-normal leading-snug">
                    Why Create an Account with Atelier L’AURA?
                  </h3>
                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    Designed for discerning clients who value privacy, couture beauty formulations, and personalized spa rituals.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {[
                    {
                      icon: Gift,
                      title: '250 Welcome Points Instantly',
                      desc: 'Redeemable directly for beauty product discounts and luxury salon upgrades.',
                    },
                    {
                      icon: Crown,
                      title: 'Priority Suite Reservations',
                      desc: 'Access prime weekend slots with our French Master Stylists and Japanese Head Spa specialists.',
                    },
                    {
                      icon: Sparkles,
                      title: '15% Off Your First Order',
                      desc: 'Exclusive promo code FIRSTGLOW automatically applied to your vanity bag.',
                    },
                    {
                      icon: ShieldCheck,
                      title: 'Real-Time Order & Treatment Tracking',
                      desc: 'View comprehensive booking cards, courier tracking, and formulation routines in your dashboard.',
                    },
                  ].map((perk, i) => {
                    const IconComponent = perk.icon;
                    return (
                      <div key={i} className="flex items-start gap-3.5 group">
                        <div className="w-8 h-8 rounded-xl bg-[#D4A373]/15 border border-[#D4A373]/40 flex items-center justify-center text-[#D4A373] shrink-0 mt-0.5 group-hover:bg-[#D4A373] group-hover:text-black transition-colors">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white tracking-wide">
                            {perk.title}
                          </h4>
                          <p className="text-[11px] text-white/60 leading-relaxed mt-0.5">
                            {perk.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
                  <span>✓ 100% Biocompatible Certified</span>
                  <span>✓ SSL Safe 256-Bit</span>
                </div>
              </div>

              {/* Assistance contact banner */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#D4A373]/20 flex items-center justify-center text-[#D4A373] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Concierge Assistance</p>
                    <p className="text-[10px] text-white/60">Need help with your reservation?</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveView('contact')}
                  className="text-xs font-bold text-[#D4A373] hover:underline shrink-0"
                >
                  Contact Desk →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
