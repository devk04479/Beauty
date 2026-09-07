import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Check,
  Heart,
  Award,
  Star,
  Crown,
  Droplets,
  Flower2,
  Gem,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import heroBrunetteImg from '../assets/images/hero_brunette_curls_1788377043713.jpg';
import heroRoseImg from '../assets/images/hero_rose_beauty_1788375954543.jpg';

interface BeautyPillar {
  icon: typeof Sparkles;
  title: string;
  description: string;
}

interface BeautySlideInfo {
  tagline: string;
  rotatingKeywords: string[];
  badge: string;
  title: string;
  highlightPhrase: string;
  subtitle: string;
  beautyStatement: string;
  quote: string;
  quoteAuthor: string;
  pillars: BeautyPillar[];
  tags: string[];
  highlights: { label: string; val: string }[];
  primaryCtaText: string;
  primaryCtaAction: string;
  secondaryCtaText: string;
  secondaryCtaAction: string;
  image: string;
  label: string;
}

const BEAUTY_SLIDES: BeautySlideInfo[] = [
  {
    tagline: 'HAUTE COIFFURE & TIMELESS GLAMOUR',
    rotatingKeywords: [
      'Beauty Face Shine',
      'Voluminous Natural Curls',
      'Silk Diamond Hair Gloss',
      'Bespoke French Balayage',
      'Scalp Botanical Hydrotherapy',
    ],
    badge: 'SIGNATURE HAIR COUTURE',
    title: 'Voluminous Curls & Precision Couture Artistry',
    highlightPhrase: 'Sculpted to Perfection, Nourished from Within',
    subtitle:
      'Where effortless elegance meets haute craft. Experience nourishing raw botanical gloss, deep peptide hydration, and tailored salon couture styling that celebrates the majestic crown of your hair.',
    beautyStatement:
      'Indulge in transformative hair rituals that elevate every curl, impart radiant mirror-like shine, and awaken your natural allure.',
    quote:
      '“Hair is the living crown of your aura. When every curl is infused with pure botanical elixirs, true confidence radiates effortlessly.”',
    quoteAuthor: 'L’AURA Master Coiffeur & Hair Alchemist',
    pillars: [
      {
        icon: Gem,
        title: 'Diamond Silk Gloss',
        description: 'Reflective crystal shine & anti-humidity seal',
      },
      {
        icon: Droplets,
        title: 'Botanical Hydro-Moisture',
        description: 'Cold-pressed argan & organic camelina seed oil',
      },
      {
        icon: Crown,
        title: 'Couture Curl Definition',
        description: 'Precision bounciness with featherlight volume',
      },
    ],
    tags: [
      'Beauty Face Shine',
      'Organic Keratin Gloss',
      'French Balayage',
      'Diamond Shine Blowout',
      'Scalp Micro-Exfoliation',
      'Silk Hair Mask',
    ],
    highlights: [
      { label: 'Elixir Purity', val: '100% Organic Cold-Pressed' },
      { label: 'Stylist Pedigree', val: 'Paris & Milan Certified' },
      { label: 'Hair Longevity', val: '6-Week Lasting Gloss' },
    ],
    primaryCtaText: 'BOOK HAIR APPOINTMENT',
    primaryCtaAction: 'book',
    secondaryCtaText: 'VIEW HAIR TREATMENTS',
    secondaryCtaAction: 'services',
    image: heroBrunetteImg,
    label: '01 • Hair Couture',
  },
  {
    tagline: 'BOTANICAL LAB & LUXURY SPA',
    rotatingKeywords: [
      'Beauty Face Shine',
      'Damascus Rose Dewy Glow',
      '24K Pure Gold Hydro-Facial',
      'Cryogenic Collagen Sculpting',
      'Japanese Acoustic Head Spa',
    ],
    badge: 'EXCLUSIVE SPA SUITE',
    title: 'Discover Pure Radiance & Rose Elixir Rituals',
    highlightPhrase: 'Eternal Luminosity Through French Botanical Science',
    subtitle:
      'Awaken an ethereal glass-skin complexion with steam-distilled Damascus Rose petals, tri-hyaluronic bioactive peptides, and rejuvenating cryogenic sculpting in our private soundproof atelier suites.',
    beautyStatement:
      'True radiant skin is not painted on; it is awakened through mindful holistic touch, clean botanical nutrition, and bespoke facial hydro-rituals.',
    quote:
      '“Beauty is an inner sanctuary unveiled through the sacred art of French botanical skincare and restorative holistic spa treatments.”',
    quoteAuthor: 'Elena Vance, Lead Esthetician & Skin Scientist',
    pillars: [
      {
        icon: Flower2,
        title: 'Damascus Rose Infusion',
        description: 'Organic floral antioxidants for dewy radiance',
      },
      {
        icon: Star,
        title: '24K Gold Cellular Lift',
        description: 'Firms skin matrix and stimulates natural collagen',
      },
      {
        icon: Heart,
        title: 'Acoustic Sound Spa',
        description: 'Deep cellular calm & stress-relieving cranial therapy',
      },
    ],
    tags: [
      'Beauty Face Shine',
      'Damascus Rose Elixir',
      '24K Gold Hydro-Glow',
      'Cellular Peptide Infusion',
      'Japanese Head Spa',
      'Glass Skin Facial',
    ],
    highlights: [
      { label: 'Botanical Purity', val: '99.8% Bioactive Extracts' },
      { label: 'Suite Sanctuary', val: 'Private Soundproof Suites' },
      { label: 'Visible Results', val: 'Instant Glass-Skin Glow' },
    ],
    primaryCtaText: 'RESERVE SPA SUITE',
    primaryCtaAction: 'book',
    secondaryCtaText: 'SHOP SKINCARE LAB',
    secondaryCtaAction: 'shop',
    image: heroRoseImg,
    label: '02 • Rose Radiance',
  },
];

export const HeroSlider: React.FC = () => {
  const { navigateTo } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [keywordIndex, setKeywordIndex] = useState(0);

  // Auto-slide timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % BEAUTY_SLIDES.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Rotating beauty keyword every 2.4s
  useEffect(() => {
    const keyInterval = setInterval(() => {
      setKeywordIndex((prev) => (prev + 1) % 4);
    }, 2400);
    return () => clearInterval(keyInterval);
  }, [currentIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? BEAUTY_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % BEAUTY_SLIDES.length);
  };

  const handleSelectSlide = (idx: number) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  const current = BEAUTY_SLIDES[currentIndex];
  const currentKeyword = current.rotatingKeywords[keywordIndex % current.rotatingKeywords.length];

  // Horizontal slide animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0.1,
      scale: 1.04,
    }),
    center: {
      x: '0%',
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 240, damping: 28 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.8, ease: 'easeOut' },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 240, damping: 28 },
        opacity: { duration: 0.35 },
      },
    }),
  };

  return (
    <div
      className="relative overflow-hidden bg-[#101010] text-white select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Hero Showcase Container - Text & Controls directly on top of images */}
      <div className="relative min-h-[620px] sm:min-h-[680px] lg:min-h-[740px] flex items-center">
        {/* Soft Ambient Gold Radial Glow */}
        <div className="absolute right-0 top-0 w-3/4 h-full opacity-25 bg-[radial-gradient(circle_at_center,_#D4A373_0%,_transparent_70%)] pointer-events-none z-1" />

        {/* Slide Carousel with Directional Motion */}
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              {/* Slide Background Image with Face in Upper Frame */}
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover object-[center_20%] sm:object-[center_25%]"
                referrerPolicy="no-referrer"
              />

              {/* Sophisticated Center Radial & Gradient Overlays for High Legibility */}
              <div className="absolute inset-0 bg-black/45" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,0,0,0.35)_0%,_rgba(0,0,0,0.65)_50%,_rgba(0,0,0,0.88)_100%)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-black/50" />

              {/* Slide Content Layer - Positioned directly UP over the image's face area */}
              <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-start text-center pt-8 sm:pt-12 lg:pt-16 pb-24">
                <div className="space-y-3.5 sm:space-y-4 flex flex-col items-center w-full max-w-4xl">
                  
                  {/* Badges & Prominent Beauty Face Shine Capsule directly on the face region */}
                  <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-1">
                    {/* Prominent Beauty Face Shine on upper face area */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/65 backdrop-blur-md border-2 border-[#D4A373] text-[#F7EFE6] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase shadow-2xl shadow-[#D4A373]/30 ring-2 ring-[#D4A373]/25"
                    >
                      <Sparkles className="w-4 h-4 text-[#D4A373] animate-pulse" />
                      <span>Beauty Face Shine</span>
                      <Sparkles className="w-4 h-4 text-[#D4A373] animate-pulse" />
                    </motion.div>

                    {current.badge && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.4 }}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#D4A373]/40 text-[#D4A373] text-[10px] sm:text-xs font-bold tracking-widest uppercase shadow-md"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
                        {current.badge}
                      </motion.div>
                    )}

                    {/* Animated Rotating Beauty Focus Text with Smooth Fade/Slide */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-white/60 text-[10px] tracking-wider uppercase font-semibold">
                        Specialty:
                      </span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={currentKeyword}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.35 }}
                          className="font-medium text-[#EADBCE] tracking-wide"
                        >
                          {currentKeyword}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Tagline Centered with Gold Accents */}
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22, duration: 0.4 }}
                    className="text-xs sm:text-sm font-bold tracking-[0.3em] text-[#D4A373] uppercase flex items-center justify-center gap-3"
                  >
                    <span className="w-8 h-[1.5px] bg-gradient-to-r from-transparent to-[#D4A373]" />
                    {current.tagline}
                    <span className="w-8 h-[1.5px] bg-gradient-to-l from-transparent to-[#D4A373]" />
                  </motion.p>

                  {/* Animated Main Title Words Directly Over Face */}
                  <div className="space-y-1.5 max-w-3xl mx-auto">
                    <motion.h1
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.12] tracking-tight drop-shadow-2xl"
                    >
                      {current.title}
                    </motion.h1>

                    {/* Highlight Beauty Phrase with Shimmer Accent */}
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.38, duration: 0.5 }}
                      className="text-xs sm:text-sm lg:text-base font-serif italic text-[#D4A373] tracking-wide"
                    >
                      — Beauty Face Shine & {current.highlightPhrase} —
                    </motion.p>
                  </div>

                  {/* Subtitle / Descriptive Beauty Text */}
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.5 }}
                    className="text-xs sm:text-sm lg:text-base text-white/90 leading-relaxed max-w-2xl font-light drop-shadow-md mx-auto"
                  >
                    {current.subtitle}
                  </motion.p>

                  {/* Interactive Beauty Service Tags */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.52, duration: 0.5 }}
                    className="flex flex-wrap items-center justify-center gap-2 pt-0.5 max-w-2xl mx-auto"
                  >
                    {current.tags.map((tag, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.05, y: -2 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        className="px-3 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/20 text-[#EADBCE] text-[11px] font-medium tracking-wide flex items-center gap-1.5 shadow-sm hover:border-[#D4A373]/60 hover:text-white transition-colors cursor-pointer"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]" />
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.58, duration: 0.5 }}
                    className="flex flex-wrap items-center justify-center gap-3.5 pt-2"
                  >
                    <button
                      onClick={() => navigateTo(current.primaryCtaAction)}
                      className="px-7 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#D4A373] hover:bg-[#c49262] text-black font-bold text-xs tracking-widest uppercase transition-all duration-200 hover:shadow-lg hover:shadow-[#D4A373]/25 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {current.primaryCtaText}
                    </button>
                    <button
                      onClick={() => navigateTo(current.secondaryCtaAction)}
                      className="px-7 sm:px-8 py-3 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold text-xs tracking-widest uppercase transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                    >
                      {current.secondaryCtaText}
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Indicators & Labels Centered at Bottom of Hero */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-5 sm:bottom-7 z-20 flex items-center gap-2.5 sm:gap-3">
          {BEAUTY_SLIDES.map((b, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectSlide(idx)}
              className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-300 backdrop-blur-md cursor-pointer ${
                idx === currentIndex
                  ? 'bg-[#D4A373] border-[#D4A373] text-black font-bold shadow-lg shadow-[#D4A373]/30 scale-105'
                  : 'bg-black/50 border-white/25 text-white/75 hover:text-white hover:border-white/50'
              }`}
              aria-label={`Slide ${idx + 1}`}
            >
              <span className="text-[10px] tracking-wider uppercase font-semibold">
                {b.label}
              </span>
            </button>
          ))}
        </div>

        {/* Left and Right Navigation Arrows at Sides of Hero */}
        <button
          onClick={handlePrev}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/25 text-white transition-all hover:scale-110 active:scale-95 shadow-lg cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/25 text-white transition-all hover:scale-110 active:scale-95 shadow-lg cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};


