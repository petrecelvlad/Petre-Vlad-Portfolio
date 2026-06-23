import React from 'react';

export interface AppIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

export const AppIcon = ({ src, alt, className = '', ...props }: AppIconProps) => {
  const isEmpty = !src || src.trim() === '';
  return (
    <div className={`flex-shrink-0 w-[90px] h-[90px] md:w-[102px] md:h-[102px] rounded-[28px] md:rounded-[32px] shadow-[0_var(--ui-depth)_0_0_var(--shadow-color)] overflow-hidden flex items-center justify-center ${isEmpty ? 'bg-surface-base border-2 border-dashed border-ink-base/20' : 'bg-surface-base'} ${className}`}>
      {isEmpty
        ? <span className="font-mono text-[9px] text-ink-base/25 uppercase tracking-widest text-center leading-loose select-none">NO<br/>ICON</span>
        : <img src={src} alt={alt} className="w-full h-full object-cover" {...props} />
      }
    </div>
  );
};
