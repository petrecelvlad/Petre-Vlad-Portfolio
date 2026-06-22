import React from 'react';

export interface WindowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  primary?: boolean;
  title?: React.ReactNode;
  titlebarState?: 'normal' | 'compact' | 'tall' | 'striped';
  color?: 'periwinkle' | 'butter' | 'coral' | 'mint' | 'sky' | 'base' | 'ink';
  noPad?: boolean;
  titleRight?: React.ReactNode;
  titleCenter?: boolean;
  lights?: boolean;
  className?: string;
  key?: React.Key;
}

const colorMap = {
  periwinkle: 'bg-periwinkle text-ink-base border-ink-base',
  butter: 'bg-butter text-ink-base border-ink-base',
  coral: 'bg-coral text-ink-base border-ink-base',
  mint: 'bg-mint text-ink-base border-ink-base',
  sky: 'bg-sky text-ink-base border-ink-base',
  base: 'bg-surface-base text-ink-base border-ink-base',
  ink: 'bg-ink-base text-surface-base border-ink-base',
};

const TrafficLights = () => (
  <div className="flex gap-[6px] items-center shrink-0">
    <div className="w-3 h-3 rounded-full border-[var(--chrome-traffic-light-border)] border-ink-base bg-error" />
    <div className="w-3 h-3 rounded-full border-[var(--chrome-traffic-light-border)] border-ink-base bg-warning" />
    <div className="w-3 h-3 rounded-full border-[var(--chrome-traffic-light-border)] border-ink-base bg-mint" />
  </div>
);

export const WindowCard = ({
  children,
  primary = false,
  title,
  titlebarState = 'normal',
  color = 'periwinkle',
  noPad = false,
  titleRight,
  titleCenter,
  lights = true,
  className = '',
  ...props
}: WindowCardProps) => {
  const borderWidth = primary ? 'border-[3px]' : 'border-2';
  const shadow = primary ? 'shadow-applet-xl' : 'shadow-applet-lg';

  return (
    <div 
      className={`bg-surface-base border-ink-base ${borderWidth} rounded-lg ${shadow} overflow-hidden relative ${className}`}
      {...props}
    >
      {title && (
        <div className={`
          border-b-2 px-3 flex items-center gap-3 relative
          font-display font-medium
          h-[var(--chrome-titlebar-height)] text-sm
          ${colorMap[color]}
        `}>
          {titlebarState === 'striped' && (
            <div className="absolute inset-0 opacity-40 mix-blend-multiply" 
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, currentColor 0 var(--texture-stripe-width), transparent var(--texture-stripe-width) var(--texture-stripe-period))'
              }}
            />
          )}
          <div className={`truncate relative z-10 flex-grow w-full ${titleCenter ? 'text-center' : ''}`}>
            {title}
          </div>
          <div className="ml-auto flex items-center gap-3 relative z-10 flex-shrink-0">
            {titleRight}
            {lights && <TrafficLights />}
          </div>
        </div>
      )}
      <div className={`text-ink-base ${noPad ? '' : 'p-7'}`}>
        {children}
      </div>
    </div>
  );
};
