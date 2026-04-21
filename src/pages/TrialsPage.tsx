import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Zap, Clock, Star, Flame, Shield, Users, ChevronRight, Lock, Trophy } from 'lucide-react';

interface Trial {
  id: string;
  name: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Legendary';
  timeLimit: string;
  xpReward: number;
  coinReward: number;
  participants: number;
  category: string;
  status: 'available' | 'locked' | 'completed';
  icon: React.ElementType;
}

const TRIALS: Trial[] = [
  {
    id: 't1',
    name: 'Speed Coding Challenge',
    description: 'Solve 5 coding problems as fast as possible. Test your algorithm skills under pressure!',
    difficulty: 'Medium',
    timeLimit: '15 min',
    xpReward: 500,
    coinReward: 100,
    participants: 234,
    category: 'Coding',
    status: 'available',
    icon: Zap,
  },
  {
    id: 't2',
    name: 'CSS Battle Arena',
    description: 'Recreate complex UI designs using only CSS. Pixel perfection wins the crown.',
    difficulty: 'Hard',
    timeLimit: '20 min',
    xpReward: 800,
    coinReward: 200,
    participants: 156,
    category: 'Design',
    status: 'available',
    icon: Shield,
  },
  {
    id: 't3',
    name: 'Bug Bounty Hunt',
    description: 'Find and fix all 10 bugs hidden in the code. Can you spot them all?',
    difficulty: 'Easy',
    timeLimit: '10 min',
    xpReward: 300,
    coinReward: 50,
    participants: 412,
    category: 'Debugging',
    status: 'available',
    icon: Flame,
  },
  {
    id: 't4',
    name: 'Algorithm Gauntlet',
    description: 'Face progressively harder algorithm challenges. Only the strongest survive.',
    difficulty: 'Legendary',
    timeLimit: '30 min',
    xpReward: 1500,
    coinReward: 500,
    participants: 67,
    category: 'Coding',
    status: 'locked',
    icon: Trophy,
  },
  {
    id: 't5',
    name: 'Multiplayer Quiz Clash',
    description: 'Go head-to-head with other students in a real-time programming quiz.',
    difficulty: 'Medium',
    timeLimit: '5 min',
    xpReward: 400,
    coinReward: 80,
    participants: 189,
    category: 'General',
    status: 'available',
    icon: Users,
  },
  {
    id: 't6',
    name: 'Memory Matrix',
    description: 'Test your memory by memorizing code patterns. How many can you recall?',
    difficulty: 'Easy',
    timeLimit: '8 min',
    xpReward: 250,
    coinReward: 40,
    participants: 320,
    category: 'Memory',
    status: 'completed',
    icon: Star,
  },
];

const DIFFICULTY_STYLES = {
  Easy: 'bg-green-500/10 text-green-500 border-green-500/30',
  Medium: 'bg-duo-blue/10 text-duo-blue border-duo-blue/30',
  Hard: 'bg-orange-500/10 text-orange-500 border-orange-500/30',
  Legendary: 'bg-duo-blue/20 text-duo-blue border-duo-blue/50',
};

function CountdownTimer({ label }: { label: string }) {
  const [time, setTime] = useState({ h: 2, m: 34, s: 12 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 0; m = 0; s = 0; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <div className="text-[10px] font-black text-quest-muted uppercase mb-2">{label}</div>
      <div className="flex items-center gap-1">
        {[
          { val: time.h, label: 'H' },
          { val: time.m, label: 'M' },
          { val: time.s, label: 'S' },
        ].map((unit, i) => (
          <React.Fragment key={unit.label}>
            {i > 0 && <span className="text-duo-blue font-black text-lg">:</span>}
            <div className="duo-card px-3 py-2 bg-duo-blue/5 border-duo-blue/20">
              <div className="text-xl font-black text-duo-blue tabular-nums">{String(unit.val).padStart(2, '0')}</div>
              <div className="text-[8px] font-black text-quest-muted uppercase">{unit.label}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default function TrialsPage() {
  const [filter, setFilter] = useState<'all' | 'available' | 'completed'>('all');

  const filteredTrials = TRIALS.filter(t => {
    if (filter === 'available') return t.status === 'available';
    if (filter === 'completed') return t.status === 'completed';
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="duo-card border-0 bg-duo-blue text-white p-8 shadow-[0_8px_0_#0d74a5]">
        <div className="flex items-center gap-3 mb-2">
          <Zap className="w-8 h-8" />
          <h1 className="text-4xl font-black">Trial Arena</h1>
        </div>
        <p className="text-lg opacity-90 font-medium">Test your skills in timed challenges and compete for rewards</p>
      </div>

      {/* Featured Trial + Countdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 duo-card p-6 border-duo-blue/30 bg-duo-blue/5 shadow-[0_4px_0_#1899d6]">
          <div className="flex items-center gap-2 mb-3">
            <Flame className="w-5 h-5 text-duo-blue" />
            <span className="text-[10px] font-black text-duo-blue uppercase tracking-widest">Featured Trial</span>
          </div>
          <h2 className="text-2xl font-black mb-2">Weekly Championship</h2>
          <p className="text-quest-muted font-bold text-sm mb-4">
            Compete against the best in a multi-round coding competition. Top 3 earn exclusive trophies and bonus XP!
          </p>
          <div className="flex items-center gap-6 mb-4">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-duo-blue" />
              <span className="text-sm font-black text-duo-blue">2,000 XP</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="src/images/Layer 1.png" alt="Coins" className="w-4 h-4 quest-gem-blue" />
              <span className="text-sm font-black text-duo-blue">500 Coins</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-quest-muted" />
              <span className="text-sm font-bold text-quest-muted">89 registered</span>
            </div>
          </div>
          <button className="duo-button duo-button-blue px-8 py-4 text-sm font-black">
            Register Now <ChevronRight className="w-5 h-5 inline" />
          </button>
        </div>
        <div className="duo-card p-6 flex flex-col items-center justify-center shadow-[0_4px_0_var(--border-color)]">
          <CountdownTimer label="Starts In" />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(['all', 'available', 'completed'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-8 py-4 rounded-full text-sm font-black uppercase tracking-wider transition-all ${
              filter === f
                ? 'bg-duo-blue text-white shadow-[0_4px_0_#1899d6]'
                : 'duo-card text-quest-muted hover:text-duo-blue'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Trials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTrials.map((trial, index) => (
          <motion.div
            key={trial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className={`duo-card p-5 shadow-[0_4px_0_var(--border-color)] ${
              trial.status === 'locked' ? 'opacity-50' :
              trial.status === 'completed' ? 'border-duo-blue/30' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                trial.status === 'completed' ? 'bg-duo-blue text-white' :
                trial.status === 'locked' ? 'bg-quest-border text-quest-muted' :
                'bg-duo-blue/10 text-duo-blue'
              }`}>
                {trial.status === 'locked' ? <Lock className="w-5 h-5" /> : <trial.icon className="w-6 h-6" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-black text-sm">{trial.name}</h3>
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-lg border ${DIFFICULTY_STYLES[trial.difficulty]}`}>
                    {trial.difficulty}
                  </span>
                  {trial.status === 'completed' && (
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-lg bg-duo-blue/10 text-duo-blue">
                      ✓ Done
                    </span>
                  )}
                </div>
                <p className="text-xs text-quest-muted font-bold mb-3 leading-relaxed">{trial.description}</p>

                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1 text-quest-muted">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black">{trial.timeLimit}</span>
                  </div>
                  <div className="flex items-center gap-1 text-duo-blue">
                    <Star className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black">+{trial.xpReward} XP</span>
                  </div>
                  <div className="flex items-center gap-1 text-duo-blue">
                    <span className="text-[10px] font-black">+{trial.coinReward} 💎</span>
                  </div>
                  <div className="flex items-center gap-1 text-quest-muted">
                    <Users className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black">{trial.participants}</span>
                  </div>
                </div>
              </div>
            </div>

            {trial.status === 'available' && (
              <div className="mt-4 flex justify-end">
                <button className="duo-button duo-button-blue px-6 py-2 text-sm font-black">
                  Enter Trial <ChevronRight className="w-4 h-4 inline" />
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
