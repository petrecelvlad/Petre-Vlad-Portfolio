
import { WindowCard } from '../atoms/WindowCard';
import { Text } from '../atoms/Text';
import { Stack } from '../atoms/Stack';
import { Row } from '../atoms/Row';

interface BentoResponsibilitiesProps {
  responsibilities: string[];
  role: string;
}

export function BentoResponsibilities({ responsibilities, role }: BentoResponsibilitiesProps) {
  return (
    <WindowCard 
      title={<Text variant="mono" className="text-sm font-black uppercase tracking-widest text-ink-base">{role}</Text>}
      color="periwinkle"
      lights={true}
      noPad={true}
      className="h-full flex flex-col"
    >
      <div className="bg-surface-base flex-grow p-4 overflow-y-auto min-h-0">
        <Stack gap="md">
          {responsibilities.map((item, i) => (
            <div key={i} className="relative">
              <Row gap="sm" align="start">
                <div className="flex-shrink-0 w-3 h-3 bg-periwinkle mt-1.5" />
                <Text variant="body" size="md" color="subtle" className="leading-tight line-clamp-2">
                  {item}
                </Text>
              </Row>
              {i < responsibilities.length - 1 && (
                <div className="absolute -bottom-2 left-6 right-0 h-[1px] bg-ink-base/5" />
              )}
            </div>
          ))}
        </Stack>
      </div>
    </WindowCard>
  );
}
