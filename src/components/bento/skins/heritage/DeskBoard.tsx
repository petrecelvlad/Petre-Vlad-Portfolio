import { useSkin } from "@/src/context/SkinContext";
import type { ReactNode } from 'react';
import { BOARD_INSET_COLOR } from './palette';
import { INTERIOR_INSET, assertPlankGeometryInSync } from './DeskBoardConstants';
import { Rail, Post, SvgRail, SvgPost } from './DeskBoardPlank';

if (import.meta.env.DEV) {
  assertPlankGeometryInSync();
}

interface DeskBoardProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  fillHeight?: boolean;
  invertedRotation?: boolean;
}

export function DeskBoard({
  children,
  className = '',
  contentClassName = '',
  fillHeight = false,
  invertedRotation = false,
}: DeskBoardProps) {
  const { plankStyle } = useSkin();

  return (
    <div className={`relative ${fillHeight ? 'flex flex-col' : ''} ${className}`}>
      <div className="absolute inset-0 overflow-visible">
        <div
          className={`absolute ${INTERIOR_INSET}`}
          style={{ backgroundColor: BOARD_INSET_COLOR, boxShadow: 'var(--shadow-sunken)' }}
          aria-hidden
        />
        {plankStyle === 'clean' ? (
          <>
            <Rail side="top" />
            <Rail side="bottom" />
            <Post side="left" />
            <Post side="right" />
          </>
        ) : (
          <>
            <SvgRail side="top" invertedRotation={invertedRotation} />
            <SvgRail side="bottom" invertedRotation={invertedRotation} />
            <SvgPost side="left" invertedRotation={invertedRotation} />
            <SvgPost side="right" invertedRotation={invertedRotation} />
          </>
        )}
      </div>

      <div className={`relative p-12 md:p-14 ${fillHeight ? 'flex-1 min-h-0 flex flex-col' : ''} ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
}
