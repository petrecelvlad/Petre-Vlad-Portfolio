import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  color?: 'mint' | 'coral' | 'butter' | 'sky' | 'periwinkle' | 'base';
  size?: 'sm' | 'md' | 'lg';
  mono?: boolean;
  className?: string;
  key?: React.Key;
}

const colorMap = {
  mint: 'bg-mint text-ink-base',
  coral: 'bg-coral text-ink-base',
  butter: 'bg-butter text-ink-base',
  sky: 'bg-sky text-ink-base',
  periwinkle: 'bg-periwinkle text-ink-base',
  base: 'bg-surface-base text-ink-base',
};

const sizeMap = {
  sm: 'text-xs px-2 py-1',
  md: 'text-sm md:text-base px-4 py-1.5',
  lg: 'text-base md:text-lg px-6 py-2.5',
};

export const Badge = ({
  children,
  color = 'mint',
  size = 'md',
  mono = false,
  className = '',
  ...props
}: BadgeProps) => {
  return (
    <div 
      className={`
        inline-flex items-center justify-center 
        border-2 border-ink-base rounded-[12px] shadow-raised
        ${colorMap[color]} 
        ${sizeMap[size]}
        ${mono ? "font-mono font-bold" : "font-body font-bold tracking-tight"}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};
