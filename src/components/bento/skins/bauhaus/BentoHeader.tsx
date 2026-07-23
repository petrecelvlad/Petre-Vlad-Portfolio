
import { Play } from 'lucide-react';
import { Row } from '@/src/components/atoms/Row';
import { Stack } from '@/src/components/atoms/Stack';
import { Badge } from '@/src/components/atoms/Badge';
import { AppIcon } from '@/src/components/atoms/AppIcon';
import { formatDateToQuarter } from '@/src/core/domain/formatDate';
import { HeaderSlotProps } from '../../ports';

export function BentoHeader({ title, icon, startDate, endDate }: HeaderSlotProps) {
  return (
    <Row align="center" gap="lg" className="w-full flex-shrink-0">
      <AppIcon src={icon ?? ''} alt={title} />

      <Stack gap="md" justify="center" className="flex-grow w-full min-w-0">
        <Badge size="lg" accentToken="--role-header-accent" mono={false} className="w-full text-xl md:text-2xl pt-3 pb-3 truncate">
          {title}
        </Badge>

        <Row gap="sm" className="w-full">
          <div className="relative rounded-lg overflow-hidden bg-slot-casing flex-1">
            {/* The main slot floor */}
            <div className="absolute inset-x-0 top-[14%] h-full bg-slot-surface rounded-lg" />

            {/* Content */}
            <div className="relative z-10 w-full py-2 px-3 flex items-center justify-center text-sm font-bold text-slot-text truncate font-mono">
              {formatDateToQuarter(startDate)}
            </div>
          </div>

          <Play size={18} fill="currentColor" className="flex-shrink-0 text-ink-base" />

          <div className="relative rounded-lg overflow-hidden bg-slot-casing flex-1">
            {/* The main slot floor */}
            <div className="absolute inset-x-0 top-[14%] h-full bg-slot-surface rounded-lg" />

            {/* Content */}
            <div className="relative z-10 w-full py-2 px-3 flex items-center justify-center text-sm font-bold text-slot-text truncate font-mono">
              {formatDateToQuarter(endDate)}
            </div>
          </div>
        </Row>
      </Stack>
    </Row>
  );
}
