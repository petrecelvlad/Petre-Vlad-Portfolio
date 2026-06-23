
import React, { ReactNode } from 'react';
import { 
  Gamepad2, 
  Palette, 
  Coins, 
  Layout, 
  Users, 
  BarChart3, 
  Search, 
  Layers,
  Code2,
  Box
} from 'lucide-react';
import { WindowCard } from '../atoms/WindowCard';
import { Text } from '../atoms/Text';

interface SkillSlotProps {
  label?: string;
  icon?: ReactNode;
  active?: boolean;
  key?: React.Key;
}

function SkillSlot({ label, icon, active }: SkillSlotProps) {
  return (
    <div className="flex flex-col items-center gap-2 flex-1 min-w-0 group">
      <div className={`
        w-full aspect-square max-w-[var(--chrome-icon-slot-size)] rounded-slot relative overflow-hidden bg-slot-casing shadow-sunken flex-shrink-0
      `}>
        {/* The main slot floor - extended downwards to prevent bottom-corner artifacts */}
        <div className="absolute inset-x-0 top-[14%] h-full bg-slot-surface rounded-slot transition-colors" />
        
        {/* Centered content container - padded top to visually center within the floor */}
        <div className="absolute inset-0 pt-[2%] flex items-center justify-center">
          {active && icon && (
            <div className="text-slot-text transition-transform duration-200 group-hover:-translate-y-0.5">
              {React.cloneElement(icon as React.ReactElement, { size: 36, strokeWidth: 2 })}
            </div>
          )}
        </div>
      </div>
      <div className="min-h-[1rem] flex items-center justify-center">
        {active && label && (
          <Text variant="mono" className="text-[10px] md:text-[11px] font-bold text-center leading-[1.2] text-slot-text tracking-tight px-0.5">
            {label}
          </Text>
        )}
      </div>
    </div>
  );
}

interface BentoSkillsProps {
  skills: string[];
}

export function BentoSkills({ skills }: BentoSkillsProps) {
  // Mapper for icons
  const getIcon = (skill: string) => {
    const s = skill.toLowerCase();
    if (s.includes('game design')) return <Gamepad2 />;
    if (s.includes('economy')) return <Palette />;
    if (s.includes('monetization')) return <Coins />;
    if (s.includes('product')) return <Box />;
    if (s.includes('ux') || s.includes('layout')) return <Layout />;
    if (s.includes('team') || s.includes('management')) return <Users />;
    if (s.includes('marketing') || s.includes('analysis')) return <BarChart3 />;
    if (s.includes('research')) return <Search />;
    if (s.includes('level design')) return <Layers />;
    if (s.includes('blockchain') || s.includes('code')) return <Code2 />;
    return <Box />;
  };

  const displaySkills = skills.slice(0, 6);
  const emptySlots = Math.max(0, 6 - displaySkills.length);

  return (
    <WindowCard 
      title={<Text variant="mono" className="text-sm font-black uppercase tracking-widest text-ink-base">Skills</Text>}
      color="sky"
      titleCenter={false}
      lights={true}
      noPad={true}
    >
      <div className="bg-surface-soft p-4 flex justify-between items-stretch gap-3 md:gap-4">
        {displaySkills.map((skill, i) => (
          <SkillSlot 
            key={i} 
            label={skill} 
            icon={getIcon(skill)} 
            active={true} 
          />
        ))}
        {Array.from({ length: emptySlots }).map((_, i) => (
          <SkillSlot key={`empty-${i}`} active={false} />
        ))}
      </div>
    </WindowCard>
  );
}
