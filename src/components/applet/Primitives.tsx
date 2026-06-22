
import React from 'react';
import { Button as AtomButton } from '../atoms/Button';
import { WindowCard } from '../atoms/WindowCard';

export function TrafficLights({ interactive = false, onClose, noBorder = false }: { interactive?: boolean; onClose?: () => void; noBorder?: boolean }) {
  // Using TrafficLights inside atoms/WindowCard normally, but keeping this export for standalone usages if any exist.
  const borderStyle = noBorder ? { border: 'none' } : {};
  return (
    <div className="flex gap-[6px] items-center shrink-0" aria-hidden={interactive ? undefined : true}>
      <button
        className="w-3 h-3 rounded-full border-[1.5px] border-[var(--ink-base)] bg-[var(--color-error)]"
        style={{ padding: 0, cursor: interactive ? 'pointer' : 'default', ...borderStyle }}
        aria-label={interactive ? 'close window' : undefined}
        onClick={interactive ? onClose : undefined}
      />
      <span className="w-3 h-3 rounded-full border-[1.5px] border-[var(--ink-base)] bg-[var(--color-warning)]" style={borderStyle} />
      <span className="w-3 h-3 rounded-full border-[1.5px] border-[var(--ink-base)] bg-[var(--color-mint)]" style={borderStyle} />
    </div>
  );
}

export const AppletWindow = (props: any) => {
  return <WindowCard {...props} />;
};

export const Button = (props: any) => {
  return <AtomButton {...props} />;
};

export function CursorArrow({ style, rotate = -18, size = 22 }: any) {
  return (
    <svg
      className="absolute pointer-events-none animate-[cursor-blink_1.3s_ease-in-out_infinite]"
      width={size}
      height={size * 1.2}
      viewBox="0 0 20 24"
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
      aria-hidden="true"
    >
      <path
        d="M2 2 L2 18 L6.5 14 L9 20 L12 18.5 L9.5 13 L15 13 Z"
        fill="var(--ink-base)"
        stroke="var(--surface-base)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Icon({ name, size = 20, color = 'currentColor', strokeWidth = 2 }: any) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };
  switch (name) {
    case 'sparkle':
      return <svg {...common}><path d="M12 3 L13.5 10.5 L21 12 L13.5 13.5 L12 21 L10.5 13.5 L3 12 L10.5 10.5 Z"/></svg>;
    default:
      return null;
  }
}

