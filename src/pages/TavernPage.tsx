import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Heart, MessageCircle, Send, ThumbsUp, Crown } from 'lucide-react';
import { COMMUNITY_PROJECTS } from '../types';

interface Discussion {
  id: string;
  author: string;
  avatar: string;
  message: string;
  time: string;
  likes: number;
  replies: number;
  badge?: string;
}

const DISCUSSIONS: Discussion[] = [
  {
    id: 'd1',
    author: 'DragonSlayer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dragon',
    message: 'Just finished the React mastery quest! The hooks section was really challenging but worth it. Anyone else stuck on the useReducer part?',
    time: '2h ago',
    likes: 24,
    replies: 8,
    badge: 'Legend'
  },
  {
    id: 'd2',
    author: 'CodeWitch',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Witch',
    message: 'Looking for a study group for the Python OOP quest. Drop a reply if interested! 🐍',
    time: '4h ago',
    likes: 31,
    replies: 15,
    badge: 'Elite'
  },
  {
    id: 'd3',
    author: 'PixelKnight',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Knight',
    message: 'Just hit a 30-day study streak! The key is consistency over intensity. Start small and keep going.',
    time: '6h ago',
    likes: 56,
    replies: 12,
  },
  {
    id: 'd4',
    author: 'UI_Ninja',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ninja',
    message: 'My Photoshop project got featured! Thanks to everyone who gave feedback on my cyberpunk character design. 🎨',
    time: '12h ago',
    likes: 42,
    replies: 20,
  },
];

const ACTIVE_MEMBERS = [
  { name: 'DragonSlayer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dragon', status: 'online' },
  { name: 'CodeWitch', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Witch', status: 'online' },
  { name: 'PixelKnight', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Knight', status: 'idle' },
  { name: 'VectorViking', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Viking', status: 'online' },
  { name: 'UI_Ninja', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ninja', status: 'offline' },
];

export default function TavernPage() {
  const [activeTab, setActiveTab] = useState<'discussions' | 'projects'>('discussions');

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="duo-card border-0 bg-duo-blue text-white p-8 shadow-[0_8px_0_#0d74a5]">
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-8 h-8" />
          <h1 className="text-4xl font-black">Community Tavern</h1>
        </div>
        <p className="text-lg opacity-90 font-medium">Meet fellow adventurers, share your work, and learn together</p>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex -space-x-2">
            {ACTIVE_MEMBERS.slice(0, 4).map(m => (
              <img key={m.name} src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full border-2 border-duo-blue bg-white" />
            ))}
          </div>
          <span className="text-sm font-bold opacity-90">{ACTIVE_MEMBERS.filter(m => m.status === 'online').length} members online</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('discussions')}
          className={`px-8 py-4 rounded-full text-sm font-black uppercase tracking-wider transition-all ${
            activeTab === 'discussions'
              ? 'bg-duo-blue text-white shadow-[0_4px_0_#1899d6]'
              : 'duo-card text-quest-muted hover:text-duo-blue'
          }`}
        >
          Discussions
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-8 py-4 rounded-full text-sm font-black uppercase tracking-wider transition-all ${
            activeTab === 'projects'
              ? 'bg-duo-blue text-white shadow-[0_4px_0_#1899d6]'
              : 'duo-card text-quest-muted hover:text-duo-blue'
          }`}
        >
          Projects
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'discussions' ? (
            <>
              {/* New Post */}
              <div className="duo-card p-4 shadow-[0_4px_0_var(--border-color)]">
                <div className="flex items-start gap-3">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Shadow"
                    alt="You"
                    className="w-10 h-10 rounded-2xl border-2 border-duo-blue"
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Share something with the tavern..."
                      className="w-full bg-transparent border-none outline-none text-sm font-medium placeholder:text-quest-muted py-2"
                    />
                    <div className="flex justify-end">
                      <button className="duo-button duo-button-blue px-6 py-2 text-sm flex items-center gap-2">
                        <Send className="w-4 h-4" /> Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Discussions */}
              {DISCUSSIONS.map((disc, index) => (
                <motion.div
                  key={disc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="duo-card p-5 shadow-[0_4px_0_var(--border-color)]"
                >
                  <div className="flex items-start gap-3">
                    <img src={disc.avatar} alt={disc.author} className="w-10 h-10 rounded-2xl border-2 border-quest-border bg-quest-card" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-black text-sm">{disc.author}</span>
                        {disc.badge && (
                          <span className="px-2 py-0.5 bg-duo-blue/10 text-duo-blue text-[9px] font-black uppercase rounded-lg">
                            {disc.badge}
                          </span>
                        )}
                        <span className="text-[10px] text-quest-muted font-bold">{disc.time}</span>
                      </div>
                      <p className="text-sm font-medium text-quest-text mb-3 leading-relaxed">{disc.message}</p>
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-quest-muted hover:text-duo-blue transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-xs font-black">{disc.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 text-quest-muted hover:text-duo-blue transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-xs font-black">{disc.replies}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </>
          ) : (
            /* Projects Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {COMMUNITY_PROJECTS.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="duo-card overflow-hidden group shadow-[0_4px_0_var(--border-color)]"
                >
                  <div className="relative aspect-[4/3]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={project.studentAvatar} alt={project.studentName} className="w-7 h-7 rounded-full border-2 border-white" />
                        <span className="text-xs font-bold text-white">{project.studentName}</span>
                      </div>
                      <div className="flex items-center gap-1 text-white">
                        <Heart className="w-4 h-4" />
                        <span className="text-xs font-bold">{project.likes}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-black text-sm mb-1">{project.title}</h3>
                    <p className="text-[10px] text-quest-muted uppercase font-bold tracking-widest">Project Submission</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar - Active Members */}
        <div className="space-y-6">
          <div className="duo-card p-5 shadow-[0_4px_0_var(--border-color)]">
            <h3 className="font-black text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <Crown className="w-4 h-4 text-duo-blue" />
              Active Members
            </h3>
            <div className="space-y-3">
              {ACTIVE_MEMBERS.map(member => (
                <div key={member.name} className="flex items-center gap-3">
                  <div className="relative">
                    <img src={member.avatar} alt={member.name} className="w-9 h-9 rounded-xl border-2 border-quest-border bg-quest-card" />
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-quest-card ${
                      member.status === 'online' ? 'bg-green-400' :
                      member.status === 'idle' ? 'bg-yellow-400' : 'bg-quest-muted'
                    }`} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{member.name}</p>
                    <p className="text-[10px] text-quest-muted font-bold uppercase">{member.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tavern Stats */}
          <div className="duo-card p-5 shadow-[0_4px_0_var(--border-color)]">
            <h3 className="font-black text-sm uppercase tracking-wider mb-4">Tavern Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-black text-duo-blue">2.5K</div>
                <div className="text-[10px] font-black text-quest-muted uppercase">Members</div>
              </div>
              <div>
                <div className="text-2xl font-black text-duo-blue">148</div>
                <div className="text-[10px] font-black text-quest-muted uppercase">Online Now</div>
              </div>
              <div>
                <div className="text-2xl font-black text-duo-blue">1.2K</div>
                <div className="text-[10px] font-black text-quest-muted uppercase">Posts Today</div>
              </div>
              <div>
                <div className="text-2xl font-black text-duo-blue">340</div>
                <div className="text-[10px] font-black text-quest-muted uppercase">Projects</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
