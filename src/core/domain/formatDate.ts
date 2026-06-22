const QUARTER_MAP = [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4] as const;

export function formatDateToQuarter(isoDate: string): string {
  if (isoDate === 'Present') return 'Present';
  const [, month] = isoDate.split('-').map(Number);
  const year = isoDate.split('-')[0];
  return `Q${QUARTER_MAP[month - 1]} ${year}`;
}
