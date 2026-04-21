import React from 'react';
import { motion } from 'motion/react';
import { Heart, MessageCircle, Share2, ExternalLink } from 'lucide-react';
import { COMMUNITY_PROJECTS } from '../types';

export default function CommunityTavern() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-quest-accent/20 rounded-lg flex items-center justify-center">
            <ExternalLink className="text-quest-accent w-4 h-4" />
          </div>
          <h2 className="text-2xl font-display font-bold uppercase italic">Community Tavern</h2>
        </div>
        <button className="text-xs font-bold text-quest-accent uppercase tracking-widest hover:underline">
          Enter Tavern
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {COMMUNITY_PROJECTS.map((project) => (
          <motion.div 
            key={project.id}
            whileHover={{ scale: 1.01 }}
            className="glass-panel overflow-hidden group"
          >
            <div className="relative aspect-[4/3]">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-quest-bg via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img 
                    src={project.studentAvatar} 
                    alt={project.studentName}
                    className="w-8 h-8 rounded-full border border-quest-accent/50"
                  />
                  <span className="text-xs font-bold">{project.studentName}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1 text-xs font-bold hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4" />
                    {project.likes}
                  </button>
                  <button className="flex items-center gap-1 text-xs font-bold hover:text-quest-accent transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    12
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-display font-bold text-sm uppercase mb-1">{project.title}</h3>
              <p className="text-[10px] text-quest-muted uppercase font-bold tracking-widest">Project Submission</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
