import React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className = '', ...props }: ContainerProps) => {
  return (
    <div 
      className={`w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};
