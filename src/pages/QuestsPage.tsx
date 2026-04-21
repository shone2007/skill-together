import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Compass, Coins } from 'lucide-react';
import QuestCard from '../components/QuestCard';
import { QUESTS, Quest } from '../types';
import { useApp } from '../hooks/useApp';
import PageHeader from '../components/common/PageHeader';
// @ts-ignore
import layer1 from '../images/Layer 1.png';

const CATEGORIES = ['All', 'Code', 'Design', 'Art', 'Music', 'Business'] as const;

export default function QuestsPage() {
  const { user, enrolledQuests, spendCoins, enrollQuest } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEnrollModal, setShowEnrollModal] = useState<Quest | null>(null);

  const filteredQuests = QUESTS.filter(q => {
    const matchesCategory = activeCategory === 'All' || q.category === activeCategory;
    const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.guildMaster.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
    <div className="space-y-8">
      <PageHeader
        icon={Compass}
        title="Quest Board"
        subtitle="Browse all available quests and continue your learning journey"
      />

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-quest-muted" />
          <input
            type="text"
            placeholder="Search quests by name or guild master..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-quest-card border-2 border-quest-border rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-duo-blue transition-all placeholder:text-quest-muted"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-3 rounded-full text-sm font-black uppercase tracking-wider transition-all ${activeCategory === cat
                ? 'bg-duo-blue text-white shadow-[0_4px_0_#1899d6] active:shadow-none active:translate-y-1'
                : 'duo-card text-quest-muted hover:text-duo-blue hover:border-duo-blue/30'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-quest-muted font-bold text-sm">
          {filteredQuests.length} quest{filteredQuests.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Quest Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredQuests.map(quest => (
          <motion.div
            key={quest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <QuestCard
              quest={{
                ...quest,
                progress: enrolledQuests.includes(parseInt(quest.id)) ? (quest.progress ?? 0) : quest.progress
              }}
              onEnroll={handleEnroll}
            />
          </motion.div>
        ))}
      </div>

      {filteredQuests.length === 0 && (
        <div className="duo-card p-12 text-center">
          <p className="text-quest-muted font-bold text-lg">No quests found matching your search.</p>
          <button
            onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
            className="mt-4 text-duo-blue font-black text-sm uppercase hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}

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
                <img src={layer1} alt="Coin" className="w-12 h-12 object-contain drop-shadow-[0_0_8px_rgba(28,176,246,0.5)] quest-gem-blue" />
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
    </div>
  );
}
