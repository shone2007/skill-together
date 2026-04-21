import React from 'react';

interface PageHeaderProps {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

export default function PageHeader({ icon: Icon, title, subtitle, children }: PageHeaderProps) {
  return (
    <div className="duo-card border-0 bg-duo-blue text-white p-8 shadow-[0_8px_0_#0d74a5] mb-8">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-8 h-8" />
        <h1 className="text-4xl font-black">{title}</h1>
      </div>
      <p className="text-lg opacity-90 font-medium">{subtitle}</p>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
