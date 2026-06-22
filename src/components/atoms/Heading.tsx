import React from 'react';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: 'display' | 'section' | 'title' | 'subtitle';
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const variantMap = {
  display: 'font-display font-medium text-5xl md:text-7xl leading-none tracking-tight',
  section: 'font-display font-medium text-4xl leading-tight tracking-tight',
  title: 'font-display font-medium text-2xl md:text-3xl leading-snug tracking-tight',
  subtitle: 'font-display font-medium text-xl leading-normal',
};

const alignMap = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export const Heading = ({ 
  children, 
  level = 2, 
  variant = 'title', 
  align = 'left',
  className = '', 
  ...props 
}: HeadingProps) => {
  const Component = `h${level}` as any;
  return (
    <Component 
      className={`m-0 text-ink-base ${variantMap[variant]} ${alignMap[align]} ${className}`} 
      {...props}
    >
      {children}
    </Component>
  );
};
