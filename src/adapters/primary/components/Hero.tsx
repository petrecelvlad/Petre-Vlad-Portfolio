import { useMemo } from 'react';
import { Button } from '@/src/components/atoms/Button';
import { WindowCard } from '@/src/components/atoms/WindowCard';
import { Badge } from '@/src/components/atoms/Badge';
import { Avatar } from '@/src/components/atoms/Avatar';
import { Text } from '@/src/components/atoms/Text';
import { Scene } from '@/src/components/layout/Scene';

const STATS = [
  { value: '19', label: 'Yrs Experience' },
  { value: '31', label: 'Games Produced' },
  { value: '22', label: 'Indie Projects' },
  { value: '8',  label: 'Teams Led' },
];

function scrollMain(toSection: 'projects' | 'contact') {
  const main = document.querySelector('main') as HTMLElement | null;
  if (!main) return;
  const h = main.clientHeight;
  const targets: Record<string, number> = {
    projects: h * 2,   // hero(0) + skilltree(1) → projects(2)
    contact:  main.scrollHeight,
  };
  main.scrollTo({ top: targets[toSection], behavior: 'smooth' });
}

export function Hero() {
  const years = useMemo(() => {
    const start = new Date(2007, 0, 1);
    const now = new Date();
    let y = now.getFullYear() - start.getFullYear();
    if (now < new Date(now.getFullYear(), start.getMonth(), start.getDate())) y--;
    return String(y);
  }, []);

  const stats = [{ ...STATS[0], value: years }, ...STATS.slice(1)];

  return (
    <Scene variant="fullscreen" className="py-4 md:py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4 lg:gap-5 items-stretch px-4 md:px-6">

        {/* ── Identity Card ── */}
        <WindowCard
          title="identity.app"
          color="sky"
          titlebarState="normal"
          lights={true}
          primary={true}
          noPad={false}
          className="flex flex-col"
        >
          <div className="flex flex-col gap-5 flex-1">

            {/* Avatar + Name */}
            <div className="flex items-center gap-4">
              <Avatar name="Vlad Petre" size="lg" />
              <div>
                <div className="font-display font-black text-4xl md:text-5xl xl:text-6xl uppercase tracking-tighter leading-none text-ink-base">
                  VLAD
                </div>
                <div className="font-display font-black text-4xl md:text-5xl xl:text-6xl uppercase tracking-tighter leading-none text-ink-base">
                  PETRE
                </div>
              </div>
            </div>

            {/* Role */}
            <Badge color="coral" size="md" mono={false} className="self-start text-sm font-bold tracking-wide">
              Senior Game Designer &amp; Producer
            </Badge>

            {/* Tagline */}
            <Text variant="body" size="lg" color="subtle" className="leading-snug">
              "Making{' '}
              <span className="text-periwinkle font-bold">APPS</span>
              {' '}that make you H
              <span className="text-periwinkle font-bold">APP</span>
              Y!" — Crafting engaging experiences at the intersection of games, product design, and mobile.
            </Text>

            {/* Spacer */}
            <div className="flex-1" />

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Button variant="accent" size="md" onClick={() => scrollMain('projects')}>
                View My Work
              </Button>
              <Button variant="secondary" size="md" onClick={() => scrollMain('contact')}>
                Get in Touch
              </Button>
            </div>

          </div>
        </WindowCard>

        {/* ── Right Column ── */}
        <div className="flex flex-col gap-4 lg:gap-5">

          {/* Stats Card */}
          <WindowCard title="stats.app" color="butter" lights={true} className="flex-1">
            <div className="grid grid-cols-2 gap-4 h-full">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <div className="font-display font-black text-4xl xl:text-5xl tracking-tighter text-ink-base leading-none">
                    {s.value}
                  </div>
                  <Text variant="mono" size="sm" color="subtle" className="uppercase tracking-widest text-[10px]">
                    {s.label}
                  </Text>
                </div>
              ))}
            </div>
          </WindowCard>

          {/* Status Card */}
          <WindowCard title="status.app" color="mint" lights={true}>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-mint border border-ink-base" />
                </span>
                <Text variant="mono" size="sm" className="uppercase tracking-widest font-black text-ink-base">
                  Available
                </Text>
              </div>
              <Text variant="body" size="sm" color="subtle">
                Open to Game Design, Product Design, and Producer roles.
              </Text>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Remote', 'Hybrid', 'Contract', 'Full-time'].map(tag => (
                  <Badge key={tag} color="base" size="sm" mono={true}>
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </WindowCard>

        </div>
      </div>
    </Scene>
  );
}
