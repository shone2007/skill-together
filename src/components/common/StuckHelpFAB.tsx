import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, X, MessageCircle, Search, Users, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StuckHelpFAB() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-80 duo-card p-6 shadow-[0_8px_32px_rgba(0,0,0,0.2)] bg-quest-bg border-2 border-duo-blue"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-duo-blue">Need help?</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-quest-border rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <Link
                to="/stuck"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 p-4 duo-card hover:bg-duo-blue/5 transition-all text-left w-full group"
              >
                <div className="w-10 h-10 bg-duo-blue/10 rounded-xl flex items-center justify-center text-duo-blue group-hover:bg-duo-blue group-hover:text-white transition-all">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-black text-sm uppercase">Quick Search</div>
                  <div className="text-[10px] text-quest-muted font-bold">Browse solutions</div>
                </div>
              </Link>

              <Link
                to="/tavern"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 p-4 duo-card hover:bg-duo-blue/5 transition-all text-left w-full group"
              >
                <div className="w-10 h-10 bg-duo-blue/10 rounded-xl flex items-center justify-center text-duo-blue group-hover:bg-duo-blue group-hover:text-white transition-all">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-black text-sm uppercase">Ask Community</div>
                  <div className="text-[10px] text-quest-muted font-bold">128 online now</div>
                </div>
              </Link>


            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-duo-blue hover:bg-duo-blue-dark text-white rounded-full flex items-center justify-center shadow-[0_6px_0_#1899d6] transition-all active:translate-y-1 active:shadow-none relative group overflow-hidden"
      >
        <HelpCircle className={`w-8 h-8 transition-transform duration-300 ${isOpen ? 'rotate-90 scale-0' : 'rotate-0'}`} />
        <X className={`w-8 h-8 transition-transform absolute duration-300 ${isOpen ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`} />
      </button>
    </div>
  );
}
