import React, { useState } from 'react';
import { HelpCircle, Search, MessageCircle, ExternalLink, ChevronRight, Zap, Target, Flame, Users, SlidersHorizontal } from 'lucide-react';
import { MOCK_MENTORS } from '../types';
import PageHeader from '../components/common/PageHeader';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  { id: 'code', name: 'Code Bug', icon: Zap, color: 'text-orange-500' },
  { id: 'design', name: 'Design Help', icon: Target, color: 'text-blue-500' },
  { id: 'concept', name: 'Concept Unclear', icon: HelpCircle, color: 'text-purple-500' },
  { id: 'setup', name: 'Project Setup', icon: Flame, color: 'text-red-500' }
] as const;

export default function StuckHelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-8">
      <PageHeader 
        icon={HelpCircle} 
        title="I'm Stuck!" 
        subtitle="Struggling with a concept or a bug? Let the community and mentors help you move forward"
      >
        <div className="relative max-w-2xl mt-8">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
           <input 
             type="text" 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             placeholder="What are you stuck on? (e.g., 'React hooks error', 'Color palettes')..."
             className="w-full bg-white/20 border-2 border-white/20 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-white transition-all placeholder:text-white/60 text-white"
           />
        </div>
      </PageHeader>

      <h2 className="text-2xl font-black mb-8">What kind of help do you need?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {CATEGORIES.map(cat => (
          <button 
            key={cat.id} 
            className="duo-card p-6 text-left hover:border-duo-blue/30 hover:bg-duo-blue/5 transition-all group shadow-[0_4px_0_var(--border-color)]"
          >
            <div className={`w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-white transition-all`}>
              <cat.icon className={`w-6 h-6 ${cat.color}`} />
            </div>
            <div className="font-black text-sm uppercase leading-tight mb-1">{cat.name}</div>
            <div className="text-[10px] text-quest-muted font-bold uppercase">Browse FAQs</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="duo-card p-8 shadow-[0_8px_0_var(--border-color)]">
            <h3 className="text-xl font-black mb-6">Ask the Community</h3>
            <p className="text-quest-muted font-bold mb-8">
              Post your question to the Tavern. Fellow adventurers and masters are online now and ready to help.
            </p>
            <Link to="/tavern" className="duo-button duo-button-blue px-10 py-5 text-sm flex items-center justify-center gap-2 max-w-xs">
              <MessageCircle className="w-5 h-5" /> Visit Tavern <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>

          <div className="duo-card p-8 shadow-[0_8px_0_var(--border-color)]">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black">Top Mentors for Help</h3>
                <Link to="/marketplace" className="text-xs font-black uppercase text-duo-blue hover:underline">View All</Link>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MOCK_MENTORS.slice(0, 2).map(mentor => (
                  <Link key={mentor.id} to={`/marketplace?mentor=${mentor.id}`} className="flex items-center gap-4 p-4 border-2 border-quest-border rounded-2xl hover:border-duo-blue/30 transition-all">
                    <img src={mentor.avatar} alt={mentor.name} className="w-12 h-12 rounded-2xl border-2 border-duo-blue p-0.5 bg-white" />
                    <div className="flex-1">
                      <div className="font-black text-sm leading-none mb-1">{mentor.name}</div>
                      <div className="text-[10px] font-black text-quest-muted uppercase tracking-wider">{mentor.specialty}</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-quest-muted" />
                  </Link>
                ))}
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="duo-card p-6 shadow-[0_4px_0_var(--border-color)]">
            <h3 className="font-black text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
              <SlidersHorizontal className="text-duo-blue w-5 h-5" /> Help Resources
            </h3>
            <div className="space-y-3">
              {[
                'React Styling Patterns',
                'Advanced Git Tips',
                'Framer Motion Docs',
                'Tailwind CSS V4 migration'
              ].map(resource => (
                <button key={resource} className="w-full flex items-center justify-between p-4 duo-card hover:bg-duo-blue/5 hover:border-duo-blue/20 transition-all text-left group">
                  <span className="text-sm font-bold group-hover:text-duo-blue transition-colors">{resource}</span>
                  <ExternalLink className="w-4 h-4 text-quest-muted" />
                </button>
              ))}
            </div>
          </div>

          <div className="duo-card p-6 shadow-[0_4px_0_var(--border-color)] bg-green-500/5 border-green-500/20">
             <div className="flex items-center gap-2 mb-4">
               <Users className="w-5 h-5 text-green-500" />
               <span className="font-black text-sm uppercase text-green-500">Mentors Online</span>
             </div>
             <div className="flex -space-x-1.5 mb-4">
               {MOCK_MENTORS.map(m => (
                 <img key={m.id} src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full border-2 border-green-500/20 bg-white" />
               ))}
             </div>
             <p className="text-[10px] font-bold text-green-500/60 uppercase">Speak to a live mentor in under 3 minutes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
