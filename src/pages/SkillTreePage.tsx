import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sword, Lock, Check, ChevronRight, Code, Palette, Music, Briefcase, Gamepad2 } from 'lucide-react';

interface SkillNode {
  id: string;
  name: string;
  xp: number;
  unlocked: boolean;
  completed: boolean;
  icon: React.ElementType;
}

interface SkillPath {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  nodes: SkillNode[];
}

const SKILL_PATHS: SkillPath[] = [
  {
    id: 'webdev',
    name: 'Web Development',
    description: 'Master the art of building for the web',
    icon: Code,
    color: '#1cb0f6',
    nodes: [
      { id: 'html', name: 'HTML Foundations', xp: 200, unlocked: true, completed: true, icon: Code },
      { id: 'css', name: 'CSS Sorcery', xp: 350, unlocked: true, completed: true, icon: Code },
      { id: 'js', name: 'JavaScript Basics', xp: 500, unlocked: true, completed: false, icon: Code },
      { id: 'react', name: 'React Mastery', xp: 800, unlocked: false, completed: false, icon: Code },
      { id: 'node', name: 'Node.js Backend', xp: 1000, unlocked: false, completed: false, icon: Code },
      { id: 'fullstack', name: 'Fullstack Legend', xp: 1500, unlocked: false, completed: false, icon: Code },
    ]
  },
  {
    id: 'gamedev',
    name: 'Game Development',
    description: 'Create worlds and interactive experiences',
    icon: Gamepad2,
    color: '#1cb0f6',
    nodes: [
      { id: 'gamedesign', name: 'Game Design 101', xp: 250, unlocked: true, completed: true, icon: Gamepad2 },
      { id: 'unity', name: 'Unity Basics', xp: 400, unlocked: true, completed: false, icon: Gamepad2 },
      { id: 'csharp', name: 'C# for Games', xp: 600, unlocked: false, completed: false, icon: Code },
      { id: '3d', name: '3D Modeling', xp: 750, unlocked: false, completed: false, icon: Palette },
      { id: 'multiplayer', name: 'Multiplayer Systems', xp: 1200, unlocked: false, completed: false, icon: Gamepad2 },
    ]
  },
  {
    id: 'creative',
    name: 'Creative Arts',
    description: 'Express yourself through digital art and design',
    icon: Palette,
    color: '#1cb0f6',
    nodes: [
      { id: 'colortheory', name: 'Color Theory', xp: 150, unlocked: true, completed: true, icon: Palette },
      { id: 'illustration', name: 'Digital Illustration', xp: 350, unlocked: true, completed: false, icon: Palette },
      { id: 'photoshop', name: 'Photoshop Mastery', xp: 500, unlocked: false, completed: false, icon: Palette },
      { id: 'uiux', name: 'UI/UX Design', xp: 700, unlocked: false, completed: false, icon: Palette },
    ]
  },
  {
    id: 'music',
    name: 'Music Production',
    description: 'Compose, produce, and master audio',
    icon: Music,
    color: '#1cb0f6',
    nodes: [
      { id: 'musictheory', name: 'Music Theory', xp: 200, unlocked: true, completed: false, icon: Music },
      { id: 'guitar', name: 'Guitar Basics', xp: 300, unlocked: false, completed: false, icon: Music },
      { id: 'production', name: 'DAW Production', xp: 600, unlocked: false, completed: false, icon: Music },
      { id: 'mixing', name: 'Mixing & Mastering', xp: 900, unlocked: false, completed: false, icon: Music },
    ]
  },
];

export default function SkillTreePage() {
  const [selectedPath, setSelectedPath] = useState<string>(SKILL_PATHS[0].id);
  const activePath = SKILL_PATHS.find(p => p.id === selectedPath)!;

  const totalXP = activePath.nodes.reduce((sum, n) => sum + (n.completed ? n.xp : 0), 0);
  const maxXP = activePath.nodes.reduce((sum, n) => sum + n.xp, 0);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="duo-card border-0 bg-duo-blue text-white p-8 shadow-[0_8px_0_#0d74a5]">
        <div className="flex items-center gap-3 mb-2">
          <Sword className="w-8 h-8" />
          <h1 className="text-4xl font-black">Skill Tree</h1>
        </div>
        <p className="text-lg opacity-90 font-medium">Choose your path and unlock powerful new abilities</p>
      </div>

      {/* Path Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {SKILL_PATHS.map(path => {
          const completed = path.nodes.filter(n => n.completed).length;
          return (
            <button
              key={path.id}
              onClick={() => setSelectedPath(path.id)}
              className={`duo-card p-4 text-left transition-all ${
                selectedPath === path.id
                  ? 'border-duo-blue shadow-[0_4px_0_#1899d6] bg-duo-blue/5'
                  : 'hover:border-duo-blue/30'
              }`}
            >
              <path.icon className={`w-6 h-6 mb-2 ${selectedPath === path.id ? 'text-duo-blue' : 'text-quest-muted'}`} />
              <h3 className="font-black text-sm mb-1">{path.name}</h3>
              <p className="text-[10px] font-bold text-quest-muted uppercase">{completed}/{path.nodes.length} Complete</p>
            </button>
          );
        })}
      </div>

      {/* Active Path Details */}
      <div className="duo-card p-6 shadow-[0_4px_0_var(--border-color)]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black">{activePath.name}</h2>
            <p className="text-quest-muted font-bold text-sm">{activePath.description}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-duo-blue">{totalXP}</div>
            <div className="text-[10px] font-black text-quest-muted uppercase">/ {maxXP} XP</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="xp-bar-container mb-8 h-3">
          <motion.div
            className="xp-bar-fill"
            initial={{ width: 0 }}
            animate={{ width: `${(totalXP / maxXP) * 100}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>

        {/* Skill Nodes */}
        <div className="space-y-3">
          {activePath.nodes.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              className="flex items-center gap-4"
            >
              {/* Connector Line */}
              <div className="flex flex-col items-center w-10">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border-2 ${
                  node.completed
                    ? 'bg-duo-blue border-duo-blue text-white shadow-[0_3px_0_#1899d6]'
                    : node.unlocked
                    ? 'bg-duo-blue/10 border-duo-blue text-duo-blue shadow-[0_3px_0_#1899d6]'
                    : 'bg-quest-border border-quest-border text-quest-muted'
                }`}>
                  {node.completed ? (
                    <Check className="w-5 h-5" />
                  ) : node.unlocked ? (
                    <span className="text-xs font-black">{index + 1}</span>
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                </div>
                {index < activePath.nodes.length - 1 && (
                  <div className={`w-0.5 h-6 ${
                    node.completed ? 'bg-duo-blue' : 'bg-quest-border'
                  }`} />
                )}
              </div>

              {/* Node Info */}
              <div className={`flex-1 duo-card p-4 flex items-center justify-between ${
                node.completed
                  ? 'border-duo-blue/30 bg-duo-blue/5'
                  : node.unlocked
                  ? 'border-duo-blue/20'
                  : 'opacity-50'
              }`}>
                <div>
                  <h4 className="font-black text-sm">{node.name}</h4>
                  <p className="text-[10px] font-black text-quest-muted uppercase">+{node.xp} XP</p>
                </div>
                {node.completed ? (
                  <span className="text-[10px] font-black text-duo-blue uppercase bg-duo-blue/10 px-3 py-1 rounded-full">Completed</span>
                ) : node.unlocked ? (
                  <button className="duo-button duo-button-blue px-6 py-2 text-sm">
                    Start <ChevronRight className="w-4 h-4 inline" />
                  </button>
                ) : (
                  <span className="text-[10px] font-black text-quest-muted uppercase">Locked</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
