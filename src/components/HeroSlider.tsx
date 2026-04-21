import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sword, Shield, Zap, Target } from 'lucide-react';

const CLASSES = [
  {
    id: 'warrior',
    name: 'Visual Warrior',
    description: 'Master the arts of vector combat and digital painting. Your blade is your stylus.',
    color: 'from-orange-500 to-red-600',
    icon: Sword,
    image: 'https://picsum.photos/seed/warrior/1200/600'
  },
  {
    id: 'mage',
    name: 'Code Alchemist',
    description: 'Weave complex logic into beautiful realities. Turn coffee into high-performance spells.',
    color: 'from-quest-accent to-blue-600',
    icon: Zap,
    image: 'https://picsum.photos/seed/mage/1200/600'
  },
  {
    id: 'rogue',
    name: 'UX Shadow',
    description: 'Navigate the hidden paths of user behavior. Strike with precision and invisible design.',
    color: 'from-quest-purple to-indigo-700',
    icon: Shield,
    image: 'https://picsum.photos/seed/rogue/1200/600'
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % CLASSES.length);
  const prev = () => setCurrent((prev) => (prev - 1 + CLASSES.length) % CLASSES.length);

  return (
    <section className="relative h-[500px] w-full rounded-3xl overflow-hidden group">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <img 
            src={CLASSES[current].image} 
            alt={CLASSES[current].name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-quest-bg via-quest-bg/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col justify-center px-16 max-w-2xl">
        <motion.div
          key={`content-${current}`}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${CLASSES[current].color} text-white text-[10px] font-black uppercase mb-6`}>
            {React.createElement(CLASSES[current].icon, { className: "w-3 h-3" })}
            Class Selection Available
          </div>
          <h2 className="text-6xl font-display font-black italic uppercase tracking-tighter mb-4 leading-none">
            {CLASSES[current].name}
          </h2>
          <p className="text-lg text-quest-muted mb-8 leading-relaxed">
            {CLASSES[current].description}
          </p>
          <div className="flex items-center gap-4">
            <button className="btn-quest">
              Select Class
            </button>
            <button className="px-6 py-3 border border-white/10 rounded-lg font-display font-bold uppercase tracking-wider hover:bg-white/5 transition-all">
              View Skill Tree
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 right-16 flex items-center gap-4">
        <button 
          onClick={prev}
          className="p-3 glass-panel hover:bg-white/10 transition-all border-white/20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex gap-2">
          {CLASSES.map((_, i) => (
            <div 
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-quest-accent' : 'w-2 bg-white/20'}`}
            />
          ))}
        </div>
        <button 
          onClick={next}
          className="p-3 glass-panel hover:bg-white/10 transition-all border-white/20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
