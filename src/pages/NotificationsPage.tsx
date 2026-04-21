import React, { useState } from 'react';
import { Bell, Filter, CheckCircle, Trash2, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { useApp } from '../hooks/useApp';
import PageHeader from '../components/common/PageHeader';
import NotificationItem from '../components/notifications/NotificationItem';
import { motion, AnimatePresence } from 'motion/react';

export default function NotificationsPage() {
  const { notifications, markRead, dismissNotification } = useApp();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = notifications.filter(n => 
    filter === 'all' ? true : !n.read
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <PageHeader 
        icon={Bell} 
        title="Activity Center" 
        subtitle="Stay updated with quest progress, session reminders, and your latest achievements"
      />

      <div className="flex flex-col sm:flex-row gap-6 items-center justify-between mb-8">
        <div className="flex gap-2 w-full sm:w-auto">
          {(['all', 'unread'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 sm:flex-none px-8 py-4 rounded-full text-sm font-black uppercase tracking-wider transition-all ${
                filter === f
                  ? 'bg-duo-blue text-white shadow-[0_4px_0_#1899d6]'
                  : 'duo-card text-quest-muted hover:text-duo-blue'
              }`}
            >
              {f === 'all' ? `All` : `Unread (${unreadCount})`}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
           <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 text-xs font-black uppercase text-duo-blue hover:underline">
             <CheckCircle className="w-4 h-4" /> Mark All As Read
           </button>
           <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 text-xs font-black uppercase text-red-500 hover:underline">
             <Trash2 className="w-4 h-4" /> Clear All
           </button>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
              >
                <NotificationItem 
                  notification={notification} 
                  onRead={markRead}
                  onDismiss={dismissNotification}
                />
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="duo-card p-16 text-center shadow-[0_4px_0_var(--border-color)] opacity-60"
            >
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bell className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-black mb-2">Inbox Empty</h3>
              <p className="text-sm font-bold text-quest-muted">You're all caught up! New notifications will appear here.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-12 duo-card p-8 bg-duo-blue/5 border-duo-blue/20 flex items-center justify-between shadow-[0_4px_0_var(--border-color)]">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-duo-blue text-white rounded-xl flex items-center justify-center">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-black text-sm">Notification Settings</h4>
            <p className="text-[10px] text-quest-muted font-bold uppercase">Customize what alerts you receive</p>
          </div>
        </div>
        <button className="p-3 duo-card hover:bg-white transition-colors">
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
