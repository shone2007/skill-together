import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Lock, BookOpen, Clock, Download, Share2, Star, Trophy, ArrowRight, Sword } from 'lucide-react';
import { MOCK_CERTIFICATES, Certificate } from '../types';
import PageHeader from '../components/common/PageHeader';
import { Link } from 'react-router-dom';

const SKILL_PATHS = [
  { id: 'web', name: 'Web Development', totalNodes: 6, completedNodes: 4, status: 'In Progress' },
  { id: 'game', name: 'Game Development', totalNodes: 5, completedNodes: 5, status: 'Completed' },
  { id: 'art', name: 'Digital Art', totalNodes: 4, completedNodes: 4, status: 'Completed' },
  { id: 'music', name: 'Music Production', totalNodes: 4, completedNodes: 1, status: 'In Progress' }
];

export default function CertificatesPage() {
  const [activeTab, setActiveTab] = useState<'earned' | 'in-progress'>('earned');

  return (
    <div className="space-y-8">
      <PageHeader 
        icon={Award} 
        title="Your Certificates" 
        subtitle="Manage your earned qualifications and track your progress toward mastering new disciplines"
      />

      <div className="flex gap-2 mb-8 items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('earned')}
            className={`px-8 py-4 rounded-full text-sm font-black uppercase tracking-wider transition-all ${
              activeTab === 'earned'
                ? 'bg-duo-blue text-white shadow-[0_4px_0_#1899d6]'
                : 'duo-card text-quest-muted hover:text-duo-blue'
            }`}
          >
            Earned ({MOCK_CERTIFICATES.length})
          </button>
          <button
            onClick={() => setActiveTab('in-progress')}
            className={`px-8 py-4 rounded-full text-sm font-black uppercase tracking-wider transition-all ${
              activeTab === 'in-progress'
                ? 'bg-duo-blue text-white shadow-[0_4px_0_#1899d6]'
                : 'duo-card text-quest-muted hover:text-duo-blue'
            }`}
          >
            In Progress ({SKILL_PATHS.filter(p => p.status === 'In Progress').length})
          </button>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs font-black uppercase text-duo-blue">
            <Trophy className="w-4 h-4" /> 2 New Certs Available
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'earned' ? (
          <motion.div 
            key="earned"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {MOCK_CERTIFICATES.map(cert => (
              <div key={cert.id} className="duo-card overflow-hidden group shadow-[0_8px_0_#e5e5e5] hover:border-duo-blue/30 transition-all">
                <div className="relative aspect-[4/3] bg-quest-border/20 border-b-2 border-quest-border">
                  <img src={cert.image} alt={cert.skillPath} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <div className="flex gap-3 w-full">
                      <button className="flex-1 duo-button duo-button-blue py-3 text-[10px] flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" /> Download PDF
                      </button>
                      <button className="p-3 bg-white/20 hover:bg-white/30 rounded-full border-2 border-white/40 text-white transition-all">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-black mb-1">{cert.skillPath} Mastery</h3>
                    <Award className="w-6 h-6 text-duo-blue" />
                  </div>
                  <div className="flex items-center gap-6">
                    <div>
                      <div className="text-[10px] font-black text-quest-muted uppercase">Completed</div>
                      <div className="text-sm font-black">{cert.completedDate}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-quest-muted uppercase">Grade</div>
                      <div className="text-sm font-black text-duo-blue">S Rank</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="in-progress"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-4"
          >
            {SKILL_PATHS.filter(p => p.status === 'In Progress').map(path => (
              <div key={path.id} className="duo-card p-6 flex flex-col sm:flex-row sm:items-center gap-6 shadow-[0_4px_0_var(--border-color)]">
                <div className="w-16 h-16 bg-duo-blue/10 border-2 border-duo-blue rounded-3xl flex items-center justify-center text-duo-blue relative overflow-hidden group">
                  <Sword className="w-8 h-8 group-hover:rotate-45 transition-transform" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-black mb-1">{path.name} Path</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 max-w-sm">
                      <div className="xp-bar-container h-2.5 mb-1.5">
                        <div className="xp-bar-fill" style={{ width: `${(path.completedNodes / path.totalNodes) * 100}%` }} />
                      </div>
                      <div className="text-[10px] font-black text-quest-muted uppercase">
                        {path.completedNodes} / {path.totalNodes} Nodes Mastered
                      </div>
                    </div>
                  </div>
                </div>
                <Link to="/skill-tree" className="duo-button duo-button-blue px-8 py-3 text-sm flex items-center justify-center gap-2">
                  Continue Journey <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-12 duo-card border-0 bg-gray-100 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_4px_0_#d1d5db]">
         <div className="flex items-center gap-4 max-w-md">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-[0_4px_0_#b45309]">
              <Star className="w-8 h-8 text-white fill-white" />
            </div>
            <div>
              <h4 className="font-black text-xl mb-1">Verify Certificates</h4>
              <p className="text-sm font-bold text-gray-500">Send your verified skills to employers and partners with our one-click verification tool.</p>
            </div>
         </div>
         <button className="px-8 py-4 duo-card bg-white border-2 border-gray-300 font-black uppercase text-sm hover:border-duo-blue hover:text-duo-blue transition-all">
           Setup Verification
         </button>
      </div>
    </div>
  );
}
