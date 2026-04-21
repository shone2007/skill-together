import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Trophy, Zap, Compass, Star, Coins } from 'lucide-react';
import { QUESTS, Quest } from '../types';
import { useApp } from '../hooks/useApp';
import QuestCard from '../components/QuestCard';
import StatsCard from '../components/common/StatsCard';

export default function DashboardPage() {
  const { user, spendCoins, enrollQuest, enrolledQuests } = useApp();
  const [showEnrollModal, setShowEnrollModal] = useState<Quest | null>(null);

  const handleEnroll = (quest: Quest) => {
    if (quest.cost > 0) {
      setShowEnrollModal(quest);
    } else {
      confirmEnroll(quest);
    }
  };

  const confirmEnroll = (quest: Quest) => {
    if (user.coins >= quest.cost) {
      spendCoins(quest.cost);
      enrollQuest(parseInt(quest.id));
      setShowEnrollModal(null);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="mb-12">
        <div className="duo-card border-0 bg-duo-blue text-white p-8 relative shadow-[0_8px_0_#0d74a5]">
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest font-body">
                New Season
              </div>
            </div>
            <h1 className="text-5xl font-black mb-4 leading-tight">
              Master Your Next <br/>
              <span className="text-7xl text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">Legendary Skill</span>
            </h1>
            <p className="text-lg opacity-90 mb-8 font-medium font-body">
              Join 2.5M+ students on the ultimate learning RPG. Complete quests, earn coins, and level up your career.
            </p>
            <div className="flex gap-4">
              <button className="duo-button duo-button-glass px-8 py-4 font-display">
                Start Learning
              </button>
              <button className="duo-button duo-button-glass px-8 py-4 font-display">
                View Skill Tree
              </button>
            </div>
          </div>
          
          <div className="absolute right-0 bottom-[0px] -top-20 w-[555px] flex items-end justify-end pointer-events-none">
            <img 
              src="src/images/webpage.png" 
              alt="Hero Graphic" 
              className="w-full h-full object-contain object-bottom"
            />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatsCard icon={Flame} value={`${user.streak} Day`} label="Study Streak" />
        <StatsCard icon={Trophy} value={user.rank} label="League Rank" />
        <StatsCard icon={Zap} value={user.xp.toLocaleString()} label="Total XP" />
      </div>

      {/* Quests Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black mb-1">Active Quests</h2>
            <p className="text-quest-muted font-bold">Continue your journey where you left off</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {QUESTS.filter(q => enrolledQuests.includes(parseInt(q.id)) && q.progress !== undefined).map(quest => (
            <QuestCard key={quest.id} quest={quest} />
          ))}
          {QUESTS.filter(q => enrolledQuests.includes(parseInt(q.id)) && q.progress === undefined).map(quest => (
             <QuestCard key={quest.id} quest={{...quest, progress: 0}} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black mb-1">Available Quests</h2>
            <p className="text-quest-muted font-bold">New skills waiting to be unlocked</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {QUESTS.filter(q => !enrolledQuests.includes(parseInt(q.id))).map(quest => (
            <QuestCard 
              key={quest.id} 
              quest={quest} 
              onEnroll={handleEnroll}
            />
          ))}
        </div>
      </section>

      {/* Enrollment Modal */}
      <AnimatePresence>
        {showEnrollModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEnrollModal(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="duo-card w-full max-w-md relative z-10 p-8 text-center shadow-[0_8px_0_var(--border-color)]"
            >
              <div className="w-20 h-20 bg-duo-blue/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <img src="src/images/Layer 1.png" alt="Coin" className="w-12 h-12 object-contain drop-shadow-[0_0_8px_rgba(28,176,246,0.5)] quest-gem-blue" />
              </div>
              <h2 className="text-2xl font-black mb-2">Unlock Quest?</h2>
              <p className="text-quest-muted font-bold mb-8">
                This legendary quest costs <span className="text-duo-blue">{showEnrollModal.cost} coins</span>. 
                You currently have {user.coins} coins.
              </p>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => confirmEnroll(showEnrollModal)}
                  disabled={user.coins < showEnrollModal.cost}
                  className={`duo-button-blue w-full py-4 text-sm font-display ${user.coins < showEnrollModal.cost ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                >
                  {user.coins < showEnrollModal.cost ? 'Not Enough Coins' : 'Confirm Unlock'}
                </button>
                <button 
                  onClick={() => setShowEnrollModal(null)}
                  className="w-full py-4 text-quest-muted font-black uppercase text-sm hover:text-quest-text transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
