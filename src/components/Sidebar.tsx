import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  Sword,
  Users,
  Trophy,
  Zap,
  Compass,
  Menu,
  X,
  Video,
  Award,
  HelpCircle,
  User as UserIcon
} from 'lucide-react';
import { useApp } from '../hooks/useApp';
// @ts-ignore
import logo from '../images/logo.png';
// @ts-ignore
import layer1 from '../images/Layer 1.png';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Compass, label: 'Quests', path: '/quests' },
  { icon: Sword, label: 'Skill Tree', path: '/skill-tree' },
  { icon: Users, label: 'Tavern', path: '/tavern' },
  { icon: Trophy, label: 'Trophies', path: '/trophies' },
  { icon: Zap, label: 'Trials', path: '/trials' },
  { icon: Video, label: 'Learn', path: '/learn' },
  { icon: HelpCircle, label: 'I\'m Stuck', path: '/stuck' },
  { icon: Award, label: 'Certificates', path: '/certificates' },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen, isMobileMenuOpen, setIsMobileMenuOpen }: SidebarProps) {
  const { user } = useApp();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 256 : 88 }}
      className={`h-screen bg-quest-bg border-r-2 border-quest-border flex flex-col transition-colors duration-300 z-50 md:sticky md:top-0 ${isMobileMenuOpen ? 'fixed left-0 top-0 translate-x-0' : 'max-md:fixed max-md:-translate-x-full'}`}
    >
      <div className={`p-6 flex items-center ${isOpen ? 'justify-between' : 'justify-center'}`}>
        {isOpen && <img src={logo} alt="Logo" className="h-6 object-contain" />}
        <button
          onClick={() => {
            if (window.innerWidth < 768 && setIsMobileMenuOpen) {
              setIsMobileMenuOpen(false);
            } else {
              setIsOpen(!isOpen);
            }
          }}
          className="p-2 hover:bg-quest-border rounded-xl transition-colors text-quest-muted"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            onClick={() => {
              if (window.innerWidth < 768 && setIsMobileMenuOpen) {
                setIsMobileMenuOpen(false);
              }
            }}
            className={({ isActive }) => `w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group relative ${isActive
              ? 'bg-duo-blue/10 text-duo-blue border-2 border-duo-blue shadow-[0_4px_0_#1899d6]'
              : 'text-quest-muted hover:bg-quest-border border-2 border-transparent'
              }`}
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-6 h-6 min-w-[24px] ${isActive ? 'text-duo-blue' : 'group-hover:text-duo-blue'}`} />
                {isOpen && (
                  <span className="font-bold text-sm uppercase tracking-wide whitespace-nowrap">{item.label}</span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto space-y-4">
        {isOpen && (
          <div className="p-4 duo-card bg-duo-blue/5 border-duo-blue/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-black text-duo-blue">Battle Pass</span>
              <span className="text-[10px] font-black text-duo-blue">LVL 12</span>
            </div>
            <div className="xp-bar-container mb-3 h-3">
              <div className="xp-bar-fill bg-duo-blue shadow-[0_0_10px_rgba(28,176,246,0.3)]" style={{ width: '60%' }} />
            </div>
            <button className="w-full py-3 duo-button duo-button-blue text-sm">
              Upgrade
            </button>
          </div>
        )}
        {!isOpen && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-duo-blue/20 flex items-center justify-center border-2 border-duo-blue/50 overflow-hidden">
              <img src={layer1} alt="Crystal" className="w-6 h-6 object-contain quest-gem-blue " />
            </div>
          </div>
        )}
      </div>
    </motion.aside>
  );
}
