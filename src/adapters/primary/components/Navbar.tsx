import { Sliders } from 'lucide-react';
import { Row } from '@/src/components/atoms/Row';
import { Heading } from '@/src/components/atoms/Heading';
import { SKINS, SkinId, PlankStyle, useSkin } from '@/src/context/SkinContext';
import { ANIMATION_PATHS, AnimationPathId, useAnimationPath } from '@/src/context/AnimationPathContext';
import { useIslandPosition } from '@/src/context/IslandPositionContext';
import { BOARD_COLOR } from '@/src/components/bento/skins/heritage/palette';
import {
  OUTLINE_COLOR, OUTLINE_WIDTH, BOARD_HIGHLIGHT_COLOR, BOARD_ELEVATION_COLOR,
  HIGHLIGHT_HEIGHT_PX, ELEVATION_HEIGHT_PX,
} from '@/src/components/bento/skins/heritage/DeskBoardConstants';
import { PlankGrain } from '@/src/components/bento/skins/heritage/DeskBoardSVGAssets';

interface NavbarProps {
  onToggleBacklog: () => void;
  isBacklog: boolean;
}

export function Navbar({ onToggleBacklog, isBacklog }: NavbarProps) {
  const { skin, setSkin, plankStyle, setPlankStyle } = useSkin();
  const { animationPath, setAnimationPath } = useAnimationPath();
  const { toggleEditor, isEditorOpen } = useIslandPosition();

  return (
    <nav
      className="h-[var(--chrome-navbar-height)] flex-shrink-0 relative w-full z-50 flex flex-col"
      style={{ backgroundColor: OUTLINE_COLOR, padding: OUTLINE_WIDTH }}
    >
      <div style={{ height: `${HIGHLIGHT_HEIGHT_PX}px`, backgroundColor: BOARD_HIGHLIGHT_COLOR }} aria-hidden />
      <div className="flex-1 relative overflow-hidden" style={{ backgroundColor: BOARD_COLOR }}>
        <PlankGrain vertical={false} />
        <div className="absolute inset-0 flex items-center justify-between px-6 md:px-8">
          <Heading level={2} variant="subtitle" className="mt-1">Vlad Petre</Heading>

          <Row align="center" gap="md">
          <button
            onClick={toggleEditor}
            className={`font-mono text-[length:var(--text-label-sm)] uppercase tracking-[0.15em] px-3 py-1.5 border-[length:var(--border-width-sm)] border-ink-base rounded-md flex items-center gap-1.5 transition-all duration-100 cursor-pointer ${
              isEditorOpen
                ? 'bg-amber-400 text-slate-950 font-bold shadow-none'
                : 'bg-amber-300/80 hover:bg-amber-400 text-slate-900 font-semibold shadow-[0_var(--ui-depth)_0_0_var(--shadow-color)] hover:translate-y-[1px] hover:shadow-[0_2px_0_0_var(--shadow-color)] active:translate-y-[var(--press-depth)] active:shadow-none'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>EDIT ISLAND 🏝️</span>
          </button>

          <select
            value={plankStyle}
            onChange={(e) => setPlankStyle(e.target.value as PlankStyle)}
            aria-label="Plank Style"
            className="font-mono text-[length:var(--text-label-sm)] uppercase tracking-[0.15em] px-3 py-1.5 border-[length:var(--border-width-sm)] border-ink-base rounded-md bg-transparent text-ink-base shadow-[0_var(--ui-depth)_0_0_var(--shadow-color)] cursor-pointer"
          >
            <option value="clean">CLEAN PLANKS</option>
            <option value="jagged">JAGGED PLANKS</option>
            <option value="laboratory">LABORATORY</option>
          </select>
          <select
            value={skin}
            onChange={(e) => setSkin(e.target.value as SkinId)}
            aria-label="Skin"
            className="font-mono text-[length:var(--text-label-sm)] uppercase tracking-[0.15em] px-3 py-1.5 border-[length:var(--border-width-sm)] border-ink-base rounded-md bg-transparent text-ink-base shadow-[0_var(--ui-depth)_0_0_var(--shadow-color)] cursor-pointer"
          >
            {SKINS.map((s) => (
              <option key={s.id} value={s.id}>{s.label.toUpperCase()}</option>
            ))}
          </select>
          <select
            value={animationPath}
            onChange={(e) => setAnimationPath(e.target.value as AnimationPathId)}
            aria-label="Achievement Animation Path"
            className="font-mono text-[length:var(--text-label-sm)] uppercase tracking-[0.15em] px-3 py-1.5 border-[length:var(--border-width-sm)] border-ink-base rounded-md bg-transparent text-ink-base shadow-[0_var(--ui-depth)_0_0_var(--shadow-color)] cursor-pointer"
          >
            {ANIMATION_PATHS.map((p) => (
              <option key={p.id} value={p.id}>{p.label.toUpperCase()}</option>
            ))}
          </select>
          <button
            onClick={onToggleBacklog}
            className={`font-mono text-[length:var(--text-label-sm)] uppercase tracking-[0.15em] px-3 py-1.5 border-[length:var(--border-width-sm)] border-ink-base rounded-md transition-all duration-100 ${
              isBacklog
                ? 'bg-ink-base text-surface-base shadow-none'
                : 'bg-transparent text-ink-base shadow-[0_var(--ui-depth)_0_0_var(--shadow-color)] hover:translate-y-[1px] hover:shadow-[0_2px_0_0_var(--shadow-color)] active:translate-y-[var(--press-depth)] active:shadow-none'
            }`}
          >
            {isBacklog ? '← PORTFOLIO' : '[DEBUG] BACKLOG'}
          </button>
          </Row>
        </div>
      </div>
      <div style={{ height: `${ELEVATION_HEIGHT_PX}px`, backgroundColor: BOARD_ELEVATION_COLOR }} aria-hidden />
    </nav>
  );
}

