import React from 'react';
import { BookOpen, Trophy, Video, Info, X, Check } from 'lucide-react';
import { Notification } from '../../types';

interface NotificationItemProps {
  notification: Notification;
  onRead: (id: string) => void;
  onDismiss: (id: string) => void;
}

export default function NotificationItem({ notification, onRead, onDismiss }: NotificationItemProps) {
  const Icon = {
    quest: BookOpen,
    achievement: Trophy,
    session: Video,
    system: Info
  }[notification.type];

  return (
    <div className={`duo-card p-5 group transition-all hover:border-duo-blue/30 shadow-[0_4px_0_var(--border-color)] relative ${!notification.read ? 'bg-duo-blue/5 border-duo-blue/40' : ''}`}>
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 ${
          notification.type === 'quest' ? 'bg-duo-blue/10 text-duo-blue border-duo-blue' :
          notification.type === 'achievement' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500' :
          notification.type === 'session' ? 'bg-purple-500/10 text-purple-500 border-purple-500' :
          'bg-gray-500/10 text-gray-500 border-gray-500'
        }`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 pr-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase text-quest-muted opacity-60">{notification.type}</span>
            <span className="mx-1 text-quest-muted opacity-30">•</span>
            <span className="text-[10px] font-black uppercase text-quest-muted">{notification.time}</span>
          </div>
          <p className="text-sm font-bold leading-relaxed">{notification.message}</p>
        </div>
      </div>

      <div className="absolute top-4 right-4 flex gap-2">
        {!notification.read && (
          <button 
            onClick={() => onRead(notification.id)}
            className="p-1.5 hover:bg-duo-blue/10 text-duo-blue rounded-lg transition-colors"
            title="Mark as read"
          >
            <Check className="w-4 h-4" />
          </button>
        )}
        <button 
          onClick={() => onDismiss(notification.id)}
          className="p-1.5 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors"
          title="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
