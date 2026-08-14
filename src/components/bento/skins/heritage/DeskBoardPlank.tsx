import React from 'react';
import { BOARD_COLOR } from './palette';
import {
  OUTLINE_COLOR,
  OUTLINE_WIDTH,
  OUTLINE_WIDTH_PX,
  HIGHLIGHT_HEIGHT_PX,
  ELEVATION_HEIGHT_PX,
  BOARD_HIGHLIGHT_COLOR,
  BOARD_ELEVATION_COLOR,
  RAIL_THICKNESS,
  RAIL_THICKNESS_PX,
  RAIL_BOX_HEIGHT,
  RAIL_BOX_HEIGHT_PX,
  RAIL_TOP_ANCHOR_PX,
  RAIL_BOTTOM_ANCHOR_PX,
  POST_WIDTH,
  POST_BOX_WIDTH_PX,
  POST_ANCHOR_PX,
  RIVET_OFFSET_TOP,
  RIVET_OFFSET_BOTTOM,
} from './DeskBoardConstants';
import {
  Rivet,
  PlankGrain,
  PlankGrainPaths,
  JAGGED_RAIL_TOP_1,
  JAGGED_RAIL_BOTTOM_1,
  JAGGED_RAIL_TOP_2,
  JAGGED_RAIL_BOTTOM_2,
  JAGGED_POST_LEFT_1,
  JAGGED_POST_RIGHT_1,
  JAGGED_POST_LEFT_2,
  JAGGED_POST_RIGHT_2,
} from './DeskBoardSVGAssets';

export function Rail({ side }: { side: 'top' | 'bottom' }) {
  const anchorPx = side === 'top' ? RAIL_TOP_ANCHOR_PX : RAIL_BOTTOM_ANCHOR_PX;
  return (
    <div
      className={`absolute left-0 right-0 ${RAIL_BOX_HEIGHT}`}
      style={{ [side]: `${anchorPx}px`, backgroundColor: OUTLINE_COLOR, padding: OUTLINE_WIDTH }}
      aria-hidden
    >
      <div style={{ height: `${HIGHLIGHT_HEIGHT_PX}px`, backgroundColor: BOARD_HIGHLIGHT_COLOR }} />
      <div className={`${RAIL_THICKNESS} relative overflow-hidden`} style={{ backgroundColor: BOARD_COLOR }}>
        <PlankGrain vertical={false} />
      </div>
      <div style={{ height: `${ELEVATION_HEIGHT_PX}px`, backgroundColor: BOARD_ELEVATION_COLOR }} />
    </div>
  );
}

export function Post({ side }: { side: 'left' | 'right' }) {
  return (
    <div
      className={`absolute top-0 bottom-0 flex flex-col ${POST_WIDTH}`}
      style={{ [side]: `${POST_ANCHOR_PX}px`, backgroundColor: OUTLINE_COLOR, padding: OUTLINE_WIDTH }}
    >
      <div style={{ height: `${HIGHLIGHT_HEIGHT_PX}px`, backgroundColor: BOARD_HIGHLIGHT_COLOR }} />
      <div className="flex-1 relative overflow-hidden" style={{ backgroundColor: BOARD_COLOR }}>
        <PlankGrain vertical={true} />
      </div>
      <div style={{ height: `${ELEVATION_HEIGHT_PX}px`, backgroundColor: BOARD_ELEVATION_COLOR }} />
      <Rivet className={`${RIVET_OFFSET_TOP} left-1/2 -translate-x-1/2`} />
      <Rivet className={`${RIVET_OFFSET_BOTTOM} left-1/2 -translate-x-1/2`} />
    </div>
  );
}

export function SvgRail({ side, invertedRotation = false }: { side: 'top' | 'bottom'; invertedRotation?: boolean }) {
  const anchorPx = side === 'top' ? RAIL_TOP_ANCHOR_PX : RAIL_BOTTOM_ANCHOR_PX;
  
  const outerHeight = RAIL_BOX_HEIGHT_PX;
  const faceHeight = RAIL_THICKNESS_PX;
  const elevationHeight = ELEVATION_HEIGHT_PX;
  const highlightHeight = HIGHLIGHT_HEIGHT_PX;
  const outline = OUTLINE_WIDTH_PX;
  
  const topPath = side === 'top' ? JAGGED_RAIL_TOP_1 : JAGGED_RAIL_TOP_2;
  const bottomPath = side === 'top' ? JAGGED_RAIL_BOTTOM_1 : JAGGED_RAIL_BOTTOM_2;
  const basePath = `${topPath} ${bottomPath}`;
  
  const highlightY = outline;
  const faceY = outline + highlightHeight;
  const elevationY = outline + highlightHeight + faceHeight;
  
  const baseRotation = side === 'top' ? 0.15 : -0.1;
  const rotation = invertedRotation ? -baseRotation : baseRotation;
  
  return (
    <div
      className={`absolute ${RAIL_BOX_HEIGHT}`}
      style={{ 
        [side]: `${anchorPx}px`,
        left: '-16px',
        right: '-16px',
        transform: `rotate(${rotation}deg)`
      }}
      aria-hidden
    >
      <svg width="100%" height="100%" preserveAspectRatio="none" viewBox={`0 0 1000 ${outerHeight}`} className="absolute inset-0 overflow-visible">
         <defs>
            <clipPath id={`rail-clip-${side}`}>
              <path d={basePath} transform={`translate(0, ${faceY}) scale(1, ${faceHeight / 100})`} />
            </clipPath>
            <clipPath id={`rail-clip-${side}-outline`}>
              <path d={basePath} transform={`scale(1, ${outerHeight / 100})`} />
            </clipPath>
         </defs>
         
         <g transform={`translate(0, ${highlightY}) scale(1, ${highlightHeight / 100})`}>
           <path d={basePath} fill={BOARD_HIGHLIGHT_COLOR} />
         </g>
         
         <g transform={`translate(0, ${faceY}) scale(1, ${faceHeight / 100})`}>
           <path d={basePath} fill={BOARD_COLOR} />
         </g>
         
         <g clipPath={`url(#rail-clip-${side})`}>
            <g transform={`translate(0, ${faceY}) scale(1.25, ${faceHeight / 100})`}>
               <PlankGrainPaths vertical={false} flip={side === 'bottom'} />
            </g>
         </g>
         
         <g transform={`translate(0, ${elevationY}) scale(1, ${elevationHeight / 100})`}>
           <path d={basePath} fill={BOARD_ELEVATION_COLOR} />
         </g>

         <g clipPath={`url(#rail-clip-${side}-outline)`}>
           <g transform={`scale(1, ${outerHeight / 100})`}>
             <path d={basePath} fill="none" stroke={OUTLINE_COLOR} strokeWidth={outline * 2} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
           </g>
         </g>
      </svg>
    </div>
  );
}

export function SvgPost({ side, invertedRotation = false }: { side: 'left' | 'right'; invertedRotation?: boolean }) {
  const outerWidth = POST_BOX_WIDTH_PX;
  const outline = OUTLINE_WIDTH_PX;
  const contentWidth = outerWidth - 2 * outline;

  const leftPath = side === 'left' ? JAGGED_POST_LEFT_1 : JAGGED_POST_LEFT_2;
  const rightPath = side === 'left' ? JAGGED_POST_RIGHT_1 : JAGGED_POST_RIGHT_2;
  const basePath = `${leftPath} ${rightPath}`;
  
  const faceX = outline;

  const baseRotation = side === 'left' ? -0.15 : 0.12;
  const rotation = invertedRotation ? -baseRotation : baseRotation;

  return (
     <div
      className={`absolute flex flex-col ${POST_WIDTH}`}
      style={{ 
        [side]: `${POST_ANCHOR_PX}px`, 
        top: '-16px',
        bottom: '-16px',
        padding: OUTLINE_WIDTH,
        transform: `rotate(${rotation}deg)`
      }}
    >
      <svg width="100%" height="100%" preserveAspectRatio="none" viewBox={`0 0 ${outerWidth} 1000`} className="absolute inset-0 overflow-visible">
         <defs>
            <clipPath id={`post-clip-${side}`}>
              <path d={basePath} transform={`translate(${faceX}, 0) scale(${contentWidth / 100}, 1)`} />
            </clipPath>
            <clipPath id={`post-clip-${side}-outline`}>
              <path d={basePath} transform={`scale(${outerWidth / 100}, 1)`} />
            </clipPath>
         </defs>
         
         <g transform={`translate(${faceX}, 0) scale(${contentWidth / 100}, 1)`}>
           <path d={basePath} fill={BOARD_COLOR} />
         </g>
         
         <g clipPath={`url(#post-clip-${side})`}>
            <g transform={`translate(${faceX}, 0) scale(${contentWidth / 100}, 1.25)`}>
               <PlankGrainPaths vertical={true} flip={side === 'right'} />
            </g>
         </g>

         <g clipPath={`url(#post-clip-${side}-outline)`}>
           <g transform={`scale(${outerWidth / 100}, 1)`}>
             <path d={basePath} fill="none" stroke={OUTLINE_COLOR} strokeWidth={outline * 2} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
           </g>
         </g>
      </svg>
      
      <div style={{ height: `${HIGHLIGHT_HEIGHT_PX}px`, backgroundColor: BOARD_HIGHLIGHT_COLOR, zIndex: 1, position: 'relative' }} />
      <div className="flex-1" />
      <div style={{ height: `${ELEVATION_HEIGHT_PX}px`, backgroundColor: BOARD_ELEVATION_COLOR, zIndex: 1, position: 'relative' }} />
      
      <Rivet className={`${RIVET_OFFSET_TOP} left-1/2 -translate-x-1/2 mt-[16px]`} />
      <Rivet className={`${RIVET_OFFSET_BOTTOM} left-1/2 -translate-x-1/2 mb-[16px]`} />
    </div>
  );
}
