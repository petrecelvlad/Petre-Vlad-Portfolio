import { createContext, useContext, useState, ReactNode } from 'react';

export const SKINS = [
  { id: 'heritage', label: 'Heritage' },
  { id: 'gamified', label: 'Gamified' },
] as const;

export type SkinId = typeof SKINS[number]['id'];

export type PlankStyle = 'clean' | 'jagged' | 'laboratory';

interface SkinPrefs {
  skin: SkinId;
  setSkin: (v: SkinId) => void;
  plankStyle: PlankStyle;
  setPlankStyle: (v: PlankStyle) => void;
}

const SkinContext = createContext<SkinPrefs>({
  skin: 'gamified',
  setSkin: () => {},
  plankStyle: 'jagged',
  setPlankStyle: () => {},
});

export function SkinProvider({ children }: { children: ReactNode }) {
  const [skin, setSkin] = useState<SkinId>('gamified');
  const [plankStyle, setPlankStyle] = useState<PlankStyle>('jagged');

  return (
    <SkinContext.Provider value={{ skin, setSkin, plankStyle, setPlankStyle }}>
      {children}
    </SkinContext.Provider>
  );
}

export function useSkin() {
  return useContext(SkinContext);
}

