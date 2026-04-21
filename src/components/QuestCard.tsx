import React from 'react';
import { motion } from 'motion/react';
import { Star, Coins, Play } from 'lucide-react';
import { Quest } from '../types';

interface QuestCardProps {
  quest: Quest;
  onEnroll?: (quest: Quest) => void;
  key?: string | number;
}

export default function QuestCard({ quest, onEnroll }: QuestCardProps) {
  return (
    <motion.div 
      className="duo-card group flex flex-col h-full shadow-[0_4px_0_var(--border-color)] active:shadow-none active:translate-y-1"
    >
      <div className="relative aspect-video rounded-xl overflow-hidden mb-4 border-2 border-quest-border">
        <img 
          src={quest.thumbnail} 
          alt={quest.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
            <Play className="text-duo-blue fill-duo-blue w-6 h-6 ml-1" />
          </div>
        </div>
        {quest.isFree && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-duo-blue text-white text-[10px] font-black uppercase rounded-lg shadow-[0_2px_0_#1899d6]">
            Free
          </div>
        )}
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-black text-duo-blue uppercase tracking-widest">{quest.category}</span>
          <span className="text-quest-muted">•</span>
          <span className="text-[10px] font-black text-quest-muted uppercase">{quest.guildMaster}</span>
        </div>
        <h3 className="text-lg font-bold leading-tight mb-3 group-hover:text-duo-blue transition-colors">
          {quest.title}
        </h3>
      </div>

      <div className="mt-auto space-y-4">
        {quest.progress !== undefined ? (
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-black uppercase">
              <span className="text-quest-muted">Progress</span>
              <span className="text-duo-blue">{quest.progress}%</span>
            </div>
            <div className="xp-bar-container">
              <div className="xp-bar-fill" style={{ width: `${quest.progress}%` }} />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-duo-blue">
              <Star className="w-4 h-4 fill-duo-blue" />
              <span className="text-xs font-black">+{quest.xp} XP</span>
            </div>
            
            <button 
              onClick={() => onEnroll?.(quest)}
              className="duo-button duo-button-blue px-6 py-2 text-sm"
            >
              {quest.cost > 0 ? (
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4" />
                  {quest.cost}
                </div>
              ) : (
                'Enroll'
              )}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
