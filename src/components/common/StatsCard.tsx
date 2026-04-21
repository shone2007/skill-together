import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  color?: string;
}

export default function StatsCard({ icon: Icon, value, label, color = 'text-duo-blue' }: StatsCardProps) {
  return (
    <div className="duo-card flex items-center gap-4 p-6 shadow-[0_4px_0_#1899d6]">
      <div className={`w-12 h-12 bg-duo-blue/10 rounded-2xl flex items-center justify-center`}>
        <Icon className={`${color} w-6 h-6`} />
      </div>
      <div>
        <div className="text-2xl font-black">{value}</div>
        <div className="text-xs font-black text-quest-muted uppercase">{label}</div>
      </div>
    </div>
  );
}
