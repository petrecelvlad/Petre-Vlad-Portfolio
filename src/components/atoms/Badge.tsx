import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  color?: 'mint' | 'coral' | 'butter' | 'sky' | 'periwinkle' | 'base';
  /** CSS var name (e.g. '--role-header-accent') to drive the background instead of `color`. Lets a skin retarget this instance's accent independently of the shared palette. */
  accentToken?: string;
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
  accentToken,
  size = 'md',
  mono = false,
  className = '',
  ...props
}: BadgeProps) => {
  return (
    <div
      className={`
        inline-flex items-center justify-center
        border-[length:var(--border-width-sm)] border-ink-base rounded-[12px] shadow-raised
        ${accentToken ? 'text-ink-base' : colorMap[color]}
        ${sizeMap[size]}
        ${mono ? "font-mono font-bold" : "font-body font-bold tracking-tight"}
        ${className}
      `}
      style={accentToken ? { backgroundColor: `var(${accentToken})` } : undefined}
      {...props}
    >
      {children}
    </div>
  );
};
