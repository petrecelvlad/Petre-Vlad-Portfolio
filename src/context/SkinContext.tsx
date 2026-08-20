import { createContext, useContext, useState, ReactNode } from 'react';

export const SKINS = [
  { id: 'heritage', label: 'Heritage' },
  { id: 'gamified', label: 'Gamified' },
] as const;

export type SkinId = typeof SKINS[number]['id'];

export type PlankStyle = 'clean' | 'jagged' | 'laboratory';

export const BACKGROUNDS = [
  { id: 'segmented3-loop', label: '3-Segmented (Looped Test)' },
  { id: 'segmented3-lite', label: '3-Segmented (Lite Test)' },
  { id: 'segmented3', label: '3-Segmented Stage' },
  { id: 'wood', label: 'Wooden Planks' },
  { id: 'corridor', label: 'Dungeon Corridor' },
  { id: 'gameboy', label: 'Game Boy Dungeon' },
] as const;

export type BackgroundId = typeof BACKGROUNDS[number]['id'];

interface SkinPrefs {
  skin: SkinId;
  setSkin: (v: SkinId) => void;
  plankStyle: PlankStyle;
  setPlankStyle: (v: PlankStyle) => void;
  background: BackgroundId;
  setBackground: (v: BackgroundId) => void;
}

const SkinContext = createContext<SkinPrefs>({
  skin: 'gamified',
  setSkin: () => {},
  plankStyle: 'jagged',
  setPlankStyle: () => {},
  background: 'segmented3-lite',
  setBackground: () => {},
});

export function SkinProvider({ children }: { children: ReactNode }) {
  const [skin, setSkin] = useState<SkinId>('gamified');
  const [plankStyle, setPlankStyle] = useState<PlankStyle>('jagged');
  const [background, setBackground] = useState<BackgroundId>('segmented3-lite');

  return (
    <SkinContext.Provider value={{ skin, setSkin, plankStyle, setPlankStyle, background, setBackground }}>
      {children}
    </SkinContext.Provider>
  );
}

export function useSkin() {
  return useContext(SkinContext);
}

