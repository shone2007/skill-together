import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
// @ts-ignore
import logo from '../images/logo.png';
// @ts-ignore
import layer1 from '../images/Layer 1.png';

export default function Header({ onMenuClick, coins }: { onMenuClick?: () => void; coins?: number }) {
  const { user, notifications } = useApp();
  const unreadCount = notifications.filter(n => !n.read).length;
  const navigate = useNavigate();

  return (
    <header className="h-16 border-b-2 border-quest-border flex items-center justify-between px-4 md:px-8 sticky top-0 bg-quest-bg/80 backdrop-blur-xl z-40 transition-colors duration-300">
      <div className="flex items-center">
        {onMenuClick && (
          <button onClick={onMenuClick} className="md:hidden p-2 -ml-2 mr-2 text-quest-muted hover:bg-quest-border rounded-xl transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        )}
        <img src={logo} alt="Skill Together Logo" className="h-8 object-contain" />
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-md group px-4 hidden sm:block">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-quest-muted group-focus-within:text-duo-blue transition-colors" />
          <input
            type="text"
            placeholder="Search Quests..."
            className="w-full bg-quest-border/30 border-2 border-quest-border rounded-3xl py-1.5 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-duo-blue transition-all placeholder:text-quest-muted"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-1.5 bg-duo-blue/10 border-2 border-duo-blue rounded-full shadow-[0_4px_0_#1899d6] transition-all">
          <img src={layer1} alt="Coin" className="w-5 h-5 object-contain quest-gem-blue" />
          <span className="font-black text-duo-blue text-sm">{user.coins}</span>
        </div>

        <button
          onClick={() => navigate('/notifications')}
          className="p-3 duo-card hover:bg-quest-border relative"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-quest-bg" />
          )}
        </button>

        <Link to="/profile" className="flex items-center gap-3 cursor-pointer group ml-2">
          <div className="w-10 h-10 rounded-2xl border-2 border-duo-blue p-0.5 shadow-[0_4px_0_#1899d6] group-hover:scale-105 transition-transform">
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-full h-full rounded-xl bg-quest-card"
            />
          </div>
        </Link>
      </div>
    </header>
  );
}
