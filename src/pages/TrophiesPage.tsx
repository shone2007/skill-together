import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Lock, Crown, Medal, Star, Flame, Zap, Target, BookOpen, Code, Palette, Users } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
  date?: string;
  progress?: number;
  maxProgress?: number;
}

const ACHIEVEMENTS: Achievement[] = [
  { id: 'a1', name: 'First Steps', description: 'Complete your first quest', icon: BookOpen, rarity: 'common', unlocked: true, date: 'Mar 15' },
  { id: 'a2', name: 'Week Warrior', description: 'Maintain a 7-day study streak', icon: Flame, rarity: 'common', unlocked: true, date: 'Mar 12' },
  { id: 'a3', name: 'Code Apprentice', description: 'Complete 3 coding quests', icon: Code, rarity: 'rare', unlocked: true, date: 'Mar 10' },
  { id: 'a4', name: 'Social Butterfly', description: 'Join 3 study groups', icon: Users, rarity: 'rare', unlocked: true, date: 'Mar 8' },
  { id: 'a5', name: 'XP Hunter', description: 'Earn 5,000 total XP', icon: Zap, rarity: 'rare', unlocked: false, progress: 4250, maxProgress: 5000 },
  { id: 'a6', name: 'Creative Vision', description: 'Complete a design quest with perfect score', icon: Palette, rarity: 'epic', unlocked: false },
  { id: 'a7', name: 'Sharpshooter', description: 'Score 100% on any trial', icon: Target, rarity: 'epic', unlocked: false },
  { id: 'a8', name: 'Marathon Runner', description: 'Maintain a 30-day study streak', icon: Flame, rarity: 'epic', unlocked: false, progress: 12, maxProgress: 30 },
  { id: 'a9', name: 'Grandmaster', description: 'Reach Level 50', icon: Crown, rarity: 'legendary', unlocked: false },
  { id: 'a10', name: 'Legend of the Academy', description: 'Complete all quests in a skill path', icon: Star, rarity: 'legendary', unlocked: false },
  { id: 'a11', name: 'Champion', description: 'Reach #1 on the global leaderboard', icon: Medal, rarity: 'legendary', unlocked: false },
  { id: 'a12', name: 'The Collector', description: 'Unlock 20 trophies', icon: Trophy, rarity: 'legendary', unlocked: false, progress: 4, maxProgress: 20 },
];

const RARITY_STYLES: Record<string, { border: string; bg: string; text: string; label: string }> = {
  common: { border: 'border-quest-border', bg: 'bg-quest-border/30', text: 'text-quest-muted', label: 'Common' },
  rare: { border: 'border-duo-blue/40', bg: 'bg-duo-blue/10', text: 'text-duo-blue', label: 'Rare' },
  epic: { border: 'border-duo-blue/60', bg: 'bg-duo-blue/15', text: 'text-duo-blue', label: 'Epic' },
  legendary: { border: 'border-duo-blue', bg: 'bg-duo-blue/20', text: 'text-duo-blue', label: 'Legendary' },
};



export default function TrophiesPage() {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const unlockedCount = ACHIEVEMENTS.filter(a => a.unlocked).length;
  const filteredAchievements = ACHIEVEMENTS.filter(a => {
    if (filter === 'unlocked') return a.unlocked;
    if (filter === 'locked') return !a.unlocked;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="duo-card border-0 bg-duo-blue text-white p-8 shadow-[0_8px_0_#0d74a5]">
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="w-8 h-8" />
          <h1 className="text-4xl font-black">Trophy Hall</h1>
        </div>
        <p className="text-lg opacity-90 font-medium">Showcase your achievements and compete for glory</p>
        <div className="flex gap-8 mt-6">
          <div>
            <div className="text-3xl font-black">{unlockedCount}</div>
            <div className="text-xs font-bold opacity-80 uppercase">Unlocked</div>
          </div>
          <div>
            <div className="text-3xl font-black">{ACHIEVEMENTS.length - unlockedCount}</div>
            <div className="text-xs font-bold opacity-80 uppercase">Remaining</div>
          </div>
          <div>
            <div className="text-3xl font-black">{Math.round((unlockedCount / ACHIEVEMENTS.length) * 100)}%</div>
            <div className="text-xs font-bold opacity-80 uppercase">Complete</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(['all', 'unlocked', 'locked'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-8 py-4 rounded-full text-sm font-black uppercase tracking-wider transition-all ${filter === f
                ? 'bg-duo-blue text-white shadow-[0_4px_0_#1899d6]'
                : 'duo-card text-quest-muted hover:text-duo-blue'
              }`}
          >
            {f === 'all' ? `All (${ACHIEVEMENTS.length})` : f === 'unlocked' ? `Unlocked (${unlockedCount})` : `Locked (${ACHIEVEMENTS.length - unlockedCount})`}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {/* Achievements Grid */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAchievements.map((achievement, index) => {
              const style = RARITY_STYLES[achievement.rarity];
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`duo-card p-5 ${style.border} ${achievement.unlocked ? '' : 'opacity-60'} shadow-[0_4px_0_var(--border-color)]`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${style.bg} ${achievement.unlocked ? '' : 'grayscale'}`}>
                      {achievement.unlocked ? (
                        <achievement.icon className={`w-6 h-6 ${style.text}`} />
                      ) : (
                        <Lock className="w-5 h-5 text-quest-muted" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-black text-sm">{achievement.name}</h4>
                        <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}>
                          {style.label}
                        </span>
                      </div>
                      <p className="text-xs text-quest-muted font-bold">{achievement.description}</p>
                      {achievement.date && (
                        <p className="text-[10px] text-duo-blue font-bold mt-1">Unlocked {achievement.date}</p>
                      )}
                      {achievement.progress !== undefined && achievement.maxProgress && (
                        <div className="mt-2">
                          <div className="flex justify-between text-[10px] font-black mb-1">
                            <span className="text-quest-muted">Progress</span>
                            <span className="text-duo-blue">{achievement.progress}/{achievement.maxProgress}</span>
                          </div>
                          <div className="xp-bar-container h-2">
                            <div className="xp-bar-fill" style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>


      </div>
    </div>
  );
}
