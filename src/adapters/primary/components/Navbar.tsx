import { Circle, Square, Triangle, Sliders } from 'lucide-react';
import { Row } from '@/src/components/atoms/Row';
import { Heading } from '@/src/components/atoms/Heading';
import { Text } from '@/src/components/atoms/Text';
import { SKINS, SkinId, BACKGROUNDS, BackgroundId, PlankStyle, SEGMENTED_VARIANTS, SegmentedVariantId, useSkin } from '@/src/context/SkinContext';
import { useIslandPosition } from '@/src/context/IslandPositionContext';

interface NavbarProps {
  onToggleBacklog: () => void;
  isBacklog: boolean;
}

export function Navbar({ onToggleBacklog, isBacklog }: NavbarProps) {
  const { skin, setSkin, plankStyle, setPlankStyle, background, setBackground, segmentedVariant, setSegmentedVariant } = useSkin();
  const { toggleEditor, isEditorOpen } = useIslandPosition();

  return (
    <nav className="h-[var(--chrome-navbar-height)] flex-shrink-0 relative w-full z-50 bg-surface-base border-b-[length:var(--border-width-sm)] border-ink-base">
      <div className="h-full flex items-center justify-between px-6 md:px-8">
        <Row gap="md">
          <Row gap="xs">
            <Circle className="w-5 h-5 fill-coral text-ink-base" />
            <Square className="w-5 h-5 fill-sky text-ink-base" />
            <Triangle className="w-5 h-5 fill-butter text-ink-base" />
          </Row>
          <Heading level={2} variant="subtitle" className="mt-1">Vlad Petre</Heading>
        </Row>

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
            value={background}
            onChange={(e) => setBackground(e.target.value as BackgroundId)}
            aria-label="Background"
            className="font-mono text-[length:var(--text-label-sm)] uppercase tracking-[0.15em] px-3 py-1.5 border-[length:var(--border-width-sm)] border-ink-base rounded-md bg-transparent text-ink-base shadow-[0_var(--ui-depth)_0_0_var(--shadow-color)] cursor-pointer"
          >
            {BACKGROUNDS.map((bg) => (
              <option key={bg.id} value={bg.id}>{bg.label.toUpperCase()}</option>
            ))}
          </select>

          {background === 'segmented3' && (
            <select
              value={segmentedVariant}
              onChange={(e) => setSegmentedVariant(e.target.value as SegmentedVariantId)}
              aria-label="3-Segmented Theme Variant"
              className="font-mono text-[length:var(--text-label-sm)] uppercase tracking-[0.15em] px-3 py-1.5 border-[length:var(--border-width-sm)] border-ink-base rounded-md bg-[#FDE047] text-ink-base font-bold shadow-[0_var(--ui-depth)_0_0_var(--shadow-color)] cursor-pointer animate-pulse"
            >
              {SEGMENTED_VARIANTS.map((v) => (
                <option key={v.id} value={v.id}>{v.label.toUpperCase()}</option>
              ))}
            </select>
          )}
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
          <Text variant="mono" size="sm" color="subtle" className="uppercase tracking-widest font-medium">Portfolio v2.0</Text>
        </Row>
      </div>
    </nav>
  );
}

