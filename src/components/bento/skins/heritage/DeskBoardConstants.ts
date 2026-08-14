import { BOARD_COLOR, darken, lighten } from './palette';

export const RIVET_COLOR = '#B5793A';
export const OUTLINE_COLOR = '#6B4423';
export const OUTLINE_WIDTH_PX = 3;
export const OUTLINE_WIDTH = `${OUTLINE_WIDTH_PX}px`;

export const ELEVATION_HEIGHT_PX = 6;
export const ELEVATION_DARKEN_PCT = 20;
export const HIGHLIGHT_HEIGHT_PX = 2;

export const BOARD_ELEVATION_COLOR = darken(BOARD_COLOR, ELEVATION_DARKEN_PCT);
export const RIVET_ELEVATION_COLOR = darken(RIVET_COLOR, ELEVATION_DARKEN_PCT);
export const BOARD_HIGHLIGHT_COLOR = lighten(BOARD_COLOR, ELEVATION_DARKEN_PCT);
export const RIVET_HIGHLIGHT_COLOR = lighten(RIVET_COLOR, ELEVATION_DARKEN_PCT);

export const ROOT_FONT_SIZE_PX = 17;

export const POST_WIDTH_PX = 31;
export const POST_WIDTH_PX_MD = 38;
export const RAIL_THICKNESS_PX = 31;
export const RAIL_THICKNESS_PX_MD = 38;
export const POST_INSET_PX = 16;
export const RAIL_INSET_PX = 16;

export const POST_BOX_WIDTH_PX = POST_WIDTH_PX + 2 * OUTLINE_WIDTH_PX;
export const POST_BOX_WIDTH_PX_MD = POST_WIDTH_PX_MD + 2 * OUTLINE_WIDTH_PX;
export const POST_ANCHOR_PX = POST_INSET_PX - OUTLINE_WIDTH_PX;

export const POST_WIDTH = 'w-[37px] md:w-[44px]';
export const RAIL_THICKNESS = 'h-[31px] md:h-[38px]';

export const RAIL_CONTENT_HEIGHT_PX = HIGHLIGHT_HEIGHT_PX + RAIL_THICKNESS_PX + ELEVATION_HEIGHT_PX;
export const RAIL_CONTENT_HEIGHT_PX_MD = HIGHLIGHT_HEIGHT_PX + RAIL_THICKNESS_PX_MD + ELEVATION_HEIGHT_PX;
export const RAIL_BOX_HEIGHT_PX = RAIL_CONTENT_HEIGHT_PX + 2 * OUTLINE_WIDTH_PX;
export const RAIL_BOX_HEIGHT_PX_MD = RAIL_CONTENT_HEIGHT_PX_MD + 2 * OUTLINE_WIDTH_PX;
export const RAIL_BOX_HEIGHT = 'h-[45px] md:h-[52px]';

export const RAIL_TOP_ANCHOR_PX = RAIL_INSET_PX - HIGHLIGHT_HEIGHT_PX - OUTLINE_WIDTH_PX;
export const RAIL_BOTTOM_ANCHOR_PX = RAIL_INSET_PX - ELEVATION_HEIGHT_PX - OUTLINE_WIDTH_PX;

export const PLANK_OVERLAP_PX = 16;

export const RIVET_FACE_SIZE_PX = 16;
export const RIVET_FACE_SIZE_PX_MD = 19;
export const RIVET_FACE_SIZE = 'h-[16px] md:h-[19px]';

export const RIVET_OUTER_WIDTH_PX = RIVET_FACE_SIZE_PX + 2 * OUTLINE_WIDTH_PX;
export const RIVET_OUTER_WIDTH_PX_MD = RIVET_FACE_SIZE_PX_MD + 2 * OUTLINE_WIDTH_PX;
export const RIVET_CONTENT_HEIGHT_PX = HIGHLIGHT_HEIGHT_PX + RIVET_FACE_SIZE_PX + ELEVATION_HEIGHT_PX;
export const RIVET_CONTENT_HEIGHT_PX_MD = HIGHLIGHT_HEIGHT_PX + RIVET_FACE_SIZE_PX_MD + ELEVATION_HEIGHT_PX;
export const RIVET_OUTER_HEIGHT_PX = RIVET_CONTENT_HEIGHT_PX + 2 * OUTLINE_WIDTH_PX;
export const RIVET_OUTER_HEIGHT_PX_MD = RIVET_CONTENT_HEIGHT_PX_MD + 2 * OUTLINE_WIDTH_PX;
export const RIVET_SIZE = 'w-[22px] h-[30px] md:w-[25px] md:h-[33px]';

export const RIVET_OFFSET_PX = RAIL_INSET_PX + RAIL_THICKNESS_PX / 2 - RIVET_OUTER_HEIGHT_PX / 2;
export const RIVET_OFFSET_PX_MD = RAIL_INSET_PX + RAIL_THICKNESS_PX_MD / 2 - RIVET_OUTER_HEIGHT_PX_MD / 2;
export const RIVET_OFFSET_TOP = 'top-[16.5px] md:top-[18.5px]';
export const RIVET_OFFSET_BOTTOM = 'bottom-[16.5px] md:bottom-[18.5px]';

export const INTERIOR_INSET_X_PX = POST_INSET_PX + POST_BOX_WIDTH_PX - PLANK_OVERLAP_PX;
export const INTERIOR_INSET_X_PX_MD = POST_INSET_PX + POST_BOX_WIDTH_PX_MD - PLANK_OVERLAP_PX;
export const INTERIOR_INSET_Y_PX = RAIL_INSET_PX + RAIL_BOX_HEIGHT_PX - PLANK_OVERLAP_PX;
export const INTERIOR_INSET_Y_PX_MD = RAIL_INSET_PX + RAIL_BOX_HEIGHT_PX_MD - PLANK_OVERLAP_PX;
export const INTERIOR_INSET = 'inset-x-[37px] md:inset-x-[44px] inset-y-[45px] md:inset-y-[52px]';

export function assertPlankGeometryInSync() {
  const expectedInterior = `inset-x-[${INTERIOR_INSET_X_PX}px] md:inset-x-[${INTERIOR_INSET_X_PX_MD}px] inset-y-[${INTERIOR_INSET_Y_PX}px] md:inset-y-[${INTERIOR_INSET_Y_PX_MD}px]`;
  if (INTERIOR_INSET !== expectedInterior) {
    console.error(
      `DeskBoard: INTERIOR_INSET's literal ("${INTERIOR_INSET}") no longer matches computed geometry ("${expectedInterior}").`
    );
  }

  const expectedTop = `top-[${RIVET_OFFSET_PX}px] md:top-[${RIVET_OFFSET_PX_MD}px]`;
  const expectedBottom = `bottom-[${RIVET_OFFSET_PX}px] md:bottom-[${RIVET_OFFSET_PX_MD}px]`;
  if (RIVET_OFFSET_TOP !== expectedTop || RIVET_OFFSET_BOTTOM !== expectedBottom) {
    console.error(
      `DeskBoard: RIVET_OFFSET_TOP/BOTTOM literals ("${RIVET_OFFSET_TOP}", "${RIVET_OFFSET_BOTTOM}") no longer match computed ("${expectedTop}", "${expectedBottom}").`
    );
  }

  const expectedRailBoxHeight = `h-[${RAIL_BOX_HEIGHT_PX}px] md:h-[${RAIL_BOX_HEIGHT_PX_MD}px]`;
  if (RAIL_BOX_HEIGHT !== expectedRailBoxHeight) {
    console.error(
      `DeskBoard: RAIL_BOX_HEIGHT literal ("${RAIL_BOX_HEIGHT}") no longer matches ("${expectedRailBoxHeight}").`
    );
  }

  const expectedPostWidth = `w-[${POST_BOX_WIDTH_PX}px] md:w-[${POST_BOX_WIDTH_PX_MD}px]`;
  const expectedRailThickness = `h-[${RAIL_THICKNESS_PX}px] md:h-[${RAIL_THICKNESS_PX_MD}px]`;
  if (POST_WIDTH !== expectedPostWidth || RAIL_THICKNESS !== expectedRailThickness) {
    console.error(
      `DeskBoard: POST_WIDTH/RAIL_THICKNESS literals ("${POST_WIDTH}", "${RAIL_THICKNESS}") no longer match ("${expectedPostWidth}", "${expectedRailThickness}").`
    );
  }

  const expectedRivetSize = `w-[${RIVET_OUTER_WIDTH_PX}px] h-[${RIVET_OUTER_HEIGHT_PX}px] md:w-[${RIVET_OUTER_WIDTH_PX_MD}px] md:h-[${RIVET_OUTER_HEIGHT_PX_MD}px]`;
  if (RIVET_SIZE !== expectedRivetSize) {
    console.error(
      `DeskBoard: RIVET_SIZE literal ("${RIVET_SIZE}") no longer matches ("${expectedRivetSize}").`
    );
  }
}
