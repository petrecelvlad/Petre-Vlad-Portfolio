import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'base' | 'elevated' | 'soft' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  key?: React.Key;
}

const variantMap = {
  base: 'bg-surface-base border-2 border-ink-base',
  elevated: 'bg-surface-elevated border-2 border-ink-base shadow-raised',
  soft: 'bg-surface-soft border-2 border-ink-base',
  interactive: 'bg-surface-base border-2 border-ink-base hover:bg-surface-soft cursor-pointer transition-all duration-200 hover:-translate-y-1',
};

const paddingMap = {
  none: '',
  sm: 'p-3',
  md: 'p-6',
  lg: 'p-8',
};

export const Card = ({
  children,
  variant = 'base',
  padding = 'md',
  className = '',
  ...props
}: CardProps) => {
  return (
    <div 
      className={`rounded-md ${variantMap[variant]} ${paddingMap[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
