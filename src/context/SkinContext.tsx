import { createContext, useContext, useState, ReactNode } from 'react';

export const SKINS = [
  { id: 'bauhaus', label: 'Bauhaus' },
  { id: 'heritage', label: 'Heritage' },
] as const;

export type SkinId = typeof SKINS[number]['id'];

interface SkinPrefs {
  skin: SkinId;
  setSkin: (v: SkinId) => void;
}

const SkinContext = createContext<SkinPrefs>({
  skin: 'heritage',
  setSkin: () => {},
});

export function SkinProvider({ children }: { children: ReactNode }) {
  // Default to heritage while it's the skin under active iteration —
  // Bauhaus is unaffected either way and stays reachable from the switcher.
  const [skin, setSkin] = useState<SkinId>('heritage');
  return (
    <SkinContext.Provider value={{ skin, setSkin }}>
      {children}
    </SkinContext.Provider>
  );
}

export function useSkin() {
  return useContext(SkinContext);
}
