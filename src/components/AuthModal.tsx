import React from 'react';
import { useApp } from '../context/AppContext';
import { AuthSection } from './AuthSection';
import { X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen } = useApp();

  if (!isAuthModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAuthModalOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
          className="relative w-full max-w-4xl bg-[#141414] border border-[#D4A373]/40 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
        >
          {/* Top Modal Bar with Brand & Close Button */}
          <div className="flex items-center justify-between px-6 py-4 bg-black/60 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#D4A373]/20 flex items-center justify-center text-[#D4A373]">
                <Sparkles className="w-3 h-3" />
              </div>
              <span className="font-serif text-sm tracking-wider text-[#D4A373] font-bold">
                L'AURA PARIS • PRIVÉ PORTAL
              </span>
            </div>

            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content Scrollable Area */}
          <div className="overflow-y-auto p-4 sm:p-8 flex-1">
            <AuthSection
              isModal={true}
              onSuccess={() => setIsAuthModalOpen(false)}
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
