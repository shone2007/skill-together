import React from 'react';

interface SkillBadgeProps {
  skill: string;
  variant?: 'teach' | 'learn';
}

export default function SkillBadge({ skill, variant = 'learn' }: SkillBadgeProps) {
  const isTeach = variant === 'teach';
  
  return (
    <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider border-2 transition-all ${
      isTeach 
        ? 'bg-duo-blue text-white border-duo-blue-dark shadow-[0_3px_0_#1899d6]' 
        : 'bg-duo-blue/10 text-duo-blue border-duo-blue shadow-[0_3px_0_#1899d6]'
    }`}>
      {skill}
    </div>
  );
}
