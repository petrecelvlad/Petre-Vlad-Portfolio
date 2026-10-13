import { Linkedin } from 'lucide-react';
import { Row } from '@/src/components/atoms/Row';
import { Button, BUTTON_COLORS } from '@/src/components/atoms/Button';
import type { PageSection } from '@/src/hooks/useTimelineOrchestrator';
import { BOARD_COLOR } from '@/src/components/bento/shared/palette';
import {
  OUTLINE_COLOR, OUTLINE_WIDTH, BOARD_HIGHLIGHT_COLOR, BOARD_ELEVATION_COLOR,
  HIGHLIGHT_HEIGHT_PX, ELEVATION_HEIGHT_PX,
} from '@/src/components/bento/shared/WoodPlankConstants';
import { PlankGrain } from '@/src/components/bento/shared/PlankGrain';

const NAV_ITEMS: { label: string; section: PageSection }[] = [
  { label: 'Skilltree', section: 'skills' },
  { label: 'Projects', section: 'projects' },
  { label: 'Contact', section: 'contact' },
];

interface NavbarProps {
  activeSection: PageSection;
  onNavigate: (section: PageSection) => void;
}

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  return (
    <nav
      className="h-[var(--chrome-navbar-height)] flex-shrink-0 relative w-full z-50 flex flex-col"
      style={{ backgroundColor: OUTLINE_COLOR, padding: OUTLINE_WIDTH }}
    >
      <div style={{ height: `${HIGHLIGHT_HEIGHT_PX}px`, backgroundColor: BOARD_HIGHLIGHT_COLOR }} aria-hidden />
      <div className="flex-1 relative overflow-hidden" style={{ backgroundColor: BOARD_COLOR }}>
        <PlankGrain vertical={false} />
        <div className="absolute inset-0 flex items-center justify-between px-6 md:px-8">
          <button
            type="button"
            onClick={() => onNavigate('hero')}
            // 30px text over the Hero title's 96px (xl), so the outline keeps the Hero's proportions.
            className="font-jersey font-bold text-3xl uppercase tracking-wider leading-none pixel-text-outline [--pixel-outline-unit:0.3125px] cursor-pointer"
          >
            Vlad Petre
          </button>

          <Row align="center" gap="xl" className="absolute left-1/2 -translate-x-1/2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.section}
                type="button"
                onClick={() => onNavigate(item.section)}
                aria-current={activeSection === item.section ? 'location' : undefined}
                className={`carved-text text-[22px] leading-none cursor-pointer ${activeSection === item.section ? 'carved-text-selected' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </Row>

          <Row align="center" gap="sm">
            <Button
              href="https://www.astrocade.com/profile/Octo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Astrocade"
              color={BUTTON_COLORS.white}
            >
              <img src={`${import.meta.env.BASE_URL}assets/icons/astrocade.webp`} alt="" className="w-4 h-4" />
            </Button>
            <Button
              href="https://www.linkedin.com/in/vladpetrebiz/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              color={BUTTON_COLORS.linkedin}
              className="text-white"
            >
              <Linkedin className="w-4 h-4" />
            </Button>
          </Row>
        </div>
      </div>
      <div style={{ height: `${ELEVATION_HEIGHT_PX}px`, backgroundColor: BOARD_ELEVATION_COLOR }} aria-hidden />
    </nav>
  );
}

