import React from 'react';

export interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  sm:  'w-12 h-12 text-base rounded-md',
  md:  'w-20 h-20 text-xl rounded-lg',
  lg:  'w-24 h-24 text-2xl rounded-xl',
  xl:  'w-32 h-32 text-3xl rounded-2xl',
};

function initials(name: string) {
  return name
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export const Avatar = ({ src, name, size = 'md', className = '' }: AvatarProps) => {
  const base = `flex-shrink-0 border-2 border-ink-base shadow-applet-sm overflow-hidden ${sizeMap[size]} ${className}`;

  if (src) {
    return (
      <div className={base}>
        <img src={src} alt={name} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div className={`${base} bg-periwinkle flex items-center justify-center`}>
      <span className="font-display font-black text-ink-base select-none">
        {initials(name)}
      </span>
    </div>
  );
};
