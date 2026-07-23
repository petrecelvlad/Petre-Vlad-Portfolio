import { Circle, Square, Triangle } from 'lucide-react';
import { Row } from '@/src/components/atoms/Row';
import { Heading } from '@/src/components/atoms/Heading';
import { Text } from '@/src/components/atoms/Text';
import { SKINS, SkinId, useSkin } from '@/src/context/SkinContext';

interface NavbarProps {
  onToggleBacklog: () => void;
  isBacklog: boolean;
}

export function Navbar({ onToggleBacklog, isBacklog }: NavbarProps) {
  const { skin, setSkin } = useSkin();

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
