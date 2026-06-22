import { ReactNode } from 'react';
import { IExperience } from '@/src/core/domain/models';
import { formatDateToQuarter } from '@/src/core/domain/formatDate';
import ngScrapedRaw from '@/src/infrastructure/data/newgrounds_scraped.json';

// ── Types ────────────────────────────────────────────────────────────────────

type FieldStatus = 'ok' | 'placeholder' | 'missing';

interface NgScraped {
  ng_id:               string;
  ng_url:              string;
  title:               string;
  upload_date_iso:     string;
  upload_date_display: string;
  views:               number | null;
  votes:               number | null;
  faves:               number | null;
  score:               number | null;
  genre:               string;
  tags:                string[];
  description:         string;
  credits:             Record<string, string>;
  error?:              string;
}

interface NgEntry { title: string; year: string; url: string }

// ── Newgrounds pending games ──────────────────────────────────────────────────

const NG_PENDING: NgEntry[] = [
  { title: 'Passage of Time',           year: '2012', url: 'https://www.newgrounds.com/portal/view/593343' },
  { title: 'Space Hornet',              year: '2011', url: 'https://www.newgrounds.com/portal/view/578360' },
  { title: 'BlobWars',                  year: '2011', url: 'https://www.newgrounds.com/portal/view/575965' },
  { title: 'Aztek Blocks',              year: '2011', url: 'https://www.newgrounds.com/portal/view/563397' },
  { title: 'Digital Upgrade',           year: '2010', url: 'https://www.newgrounds.com/portal/view/553276' },
  { title: 'Rapid Rush',                year: '2010', url: 'https://www.newgrounds.com/portal/view/547308' },
  { title: 'Strawberryclock Adventure', year: '2010', url: 'https://www.newgrounds.com/portal/view/545658' },
  { title: 'Bullet Bash',               year: '2010', url: 'https://www.newgrounds.com/portal/view/541282' },
  { title: 'Rising Angel',              year: '2009', url: 'https://www.newgrounds.com/portal/view/511133' },
  { title: "Einstein's Quiz",           year: '2009', url: 'https://www.newgrounds.com/portal/view/492970' },
  { title: '1 Day Quest',               year: '2009', url: 'https://www.newgrounds.com/portal/view/486610' },
  { title: 'Tripicus',                  year: '2008', url: 'https://www.newgrounds.com/portal/view/471714' },
  { title: 'Spermatron v2',             year: '2008', url: 'https://www.newgrounds.com/portal/view/451057' },
];

// Build lookup map from NG URL → scraped data
const ngScraped = ngScrapedRaw as NgScraped[];
const ngScrapedMap = new Map<string, NgScraped>(
  ngScraped.map(entry => [entry.ng_url, entry])
);
const scraperHasRun = ngScraped.length > 0;

// ── Helpers ───────────────────────────────────────────────────────────────────

function checkUrl(url: string | undefined): FieldStatus {
  if (!url || url.trim() === '') return 'missing';
  if (url.includes('picsum.photos')) return 'placeholder';
  return 'ok';
}

function checkUrlArray(urls: string[]): { status: FieldStatus; count: number } {
  if (urls.length === 0) return { status: 'missing', count: 0 };
  const real = urls.filter(u => !u.includes('picsum.photos'));
  if (real.length === 0) return { status: 'placeholder', count: urls.length };
  return { status: 'ok', count: real.length };
}

function fmt(n: number | null | undefined): string {
  if (n == null) return '—';
  return n.toLocaleString();
}

// Scored fields: icon, logo, screenshots, responsibilities, achievements, technologies, links
function calcScore(fields: FieldStatus[]): number {
  return Math.round((fields.filter(f => f === 'ok').length / fields.length) * 100);
}

// ── Mini-components ───────────────────────────────────────────────────────────

const DOTCLS: Record<FieldStatus, string> = {
  ok:          'bg-mint',
  placeholder: 'bg-butter',
  missing:     'bg-coral',
};
const TXTCLS: Record<FieldStatus, string> = {
  ok:          'text-mint',
  placeholder: 'text-butter',
  missing:     'text-coral',
};

function Dot({ s }: { s: FieldStatus }) {
  return <span className={`inline-block w-2.5 h-2.5 rounded-full flex-shrink-0 ${DOTCLS[s]}`} title={s} />;
}

function Count({ n, s }: { n: number; s: FieldStatus }) {
  return <span className={`font-mono text-[11px] tabular-nums ${TXTCLS[s]}`}>{n > 0 ? n : '—'}</span>;
}

function ScorePill({ score }: { score: number }) {
  const cls = score >= 80 ? 'bg-mint text-ink-base'
            : score >= 50 ? 'bg-butter text-ink-base'
            : 'bg-coral text-surface-base';
  return <span className={`inline-block px-2 py-0.5 rounded font-mono text-[11px] font-bold tabular-nums ${cls}`}>{score}%</span>;
}

function Num({ v }: { v: number | null | undefined }) {
  return <span className={`font-mono text-[11px] tabular-nums ${v != null ? 'text-ink-base' : 'text-ink-base/25'}`}>{fmt(v)}</span>;
}

function StrCell({ v }: { v: string }) {
  return <span className={`font-mono text-[10px] ${v ? 'text-ink-subtle' : 'text-ink-base/25'}`}>{v || '—'}</span>;
}

// ── Table primitives ──────────────────────────────────────────────────────────

const TH = ({ children, center, span, accent }: {
  children: ReactNode;
  center?: boolean;
  span?: number;
  accent?: string;
}) => (
  <th
    colSpan={span}
    className={`px-3 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-surface-base whitespace-nowrap border-r border-surface-inverse/20 last:border-r-0 ${center ? 'text-center' : 'text-left'} ${accent ?? ''}`}
  >
    {children}
  </th>
);

const TD = ({ children, center, className = '' }: {
  children: ReactNode;
  center?: boolean;
  className?: string;
}) => (
  <td className={`px-3 py-2 align-middle border-r border-ink-base/5 last:border-r-0 ${center ? 'text-center' : ''} ${className}`}>
    {children}
  </td>
);

// ── Component ─────────────────────────────────────────────────────────────────

interface Props { experiences: IExperience[] }

export function BacklogView({ experiences }: Props) {

  // ── Build portfolio rows ──────────────────────────────────────────────────
  const portfolioRows = experiences.flatMap(exp =>
    exp.projects.map(proj => {
      const iconSt    = checkUrl(proj.icon);
      const logoSt    = checkUrl(exp.companyLogo);
      const shots     = checkUrlArray(proj.keyScreenshots);
      const respSt:   FieldStatus = proj.responsibilities.length > 0 ? 'ok' : 'missing';
      const achievSt: FieldStatus = proj.achievements.length > 0    ? 'ok' : 'missing';
      const techSt:   FieldStatus = proj.technologies.length > 0    ? 'ok' : 'missing';
      const wsSt    = checkUrl(proj.links.website);
      const ytSt    = checkUrl(proj.links.youtube);
      const storeSt = checkUrl(proj.links.store);
      const linkSt: FieldStatus = (wsSt === 'ok' || ytSt === 'ok' || storeSt === 'ok') ? 'ok' : 'missing';

      // If the project links to Newgrounds, pull scraped metadata so that column is populated
      const ngUrl = proj.links.website?.includes('newgrounds.com') ? proj.links.website : undefined;
      const ng    = (scraperHasRun && ngUrl) ? (ngScrapedMap.get(ngUrl) ?? null) : null;

      return {
        source:      'portfolio' as const,
        company:     exp.company,
        title:       proj.title,
        type:        proj.type,
        period:      `${formatDateToQuarter(proj.startDate)} → ${formatDateToQuarter(proj.endDate)}`,
        role:        proj.role,
        ng,
        ngUrl,
        // Content readiness
        iconSt, logoSt, shots,
        respCount:   proj.responsibilities.length, respSt,
        achievCount: proj.achievements.length,      achievSt,
        techCount:   proj.technologies.length,      techSt,
        wsSt, ytSt, storeSt, linkSt,
        score: calcScore([iconSt, logoSt, shots.status, respSt, achievSt, techSt, linkSt]),
      };
    })
  );

  // ── Build NG pending rows ─────────────────────────────────────────────────
  const ngRows = NG_PENDING.map(entry => {
    const scraped = ngScrapedMap.get(entry.url) ?? null;
    const hasDesc = !!(scraped?.description);
    const hasCred = !!(scraped && Object.keys(scraped.credits).length > 0);

    // Content readiness: icon/logo/screenshots all missing until added to portfolio.json
    const iconSt:   FieldStatus = 'missing';
    const logoSt:   FieldStatus = 'missing';
    const shots     = { status: 'missing' as FieldStatus, count: 0 };
    const respSt:   FieldStatus = 'missing';
    const achievSt: FieldStatus = 'missing';
    const techSt:   FieldStatus = scraped?.tags && scraped.tags.length > 0 ? 'ok' : 'missing';
    const linkSt:   FieldStatus = 'ok'; // NG URL is always a valid link

    return {
      source:      'newgrounds-pending' as const,
      company:     'Newgrounds',
      title:       entry.title,
      type:        'GAME' as const,
      period:      entry.year,
      role:        scraped ? (scraped.credits['Artist'] ?? '—') : '—',
      ng:          scraped,
      ngUrl:       entry.url,
      iconSt, logoSt, shots,
      respCount:   0, respSt,
      achievCount: 0, achievSt,
      techCount:   scraped?.tags?.length ?? 0, techSt,
      wsSt:        'ok'      as FieldStatus,
      ytSt:        'missing' as FieldStatus,
      storeSt:     'missing' as FieldStatus,
      linkSt,
      hasDesc, hasCred,
      score: calcScore([iconSt, logoSt, shots.status, respSt, achievSt, techSt, linkSt]),
    };
  });

  const allRows  = [...portfolioRows, ...ngRows];
  const avgScore = allRows.length
    ? Math.round(allRows.reduce((s, r) => s + r.score, 0) / allRows.length)
    : 0;
  const fullCount = allRows.filter(r => r.score >= 80).length;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="h-[calc(100vh-var(--chrome-navbar-height))] flex flex-col overflow-hidden bg-surface-base">

      {/* ── Stats bar ──────────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 bg-surface-inverse text-surface-base px-6 py-3 flex flex-wrap items-center gap-x-8 gap-y-1 border-b-2 border-ink-base">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-coral">
          [DEBUG] PROJECT BACKLOG
        </span>
        <div className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-[10px] uppercase tracking-widest text-surface-base/60">
          <span><span className="text-surface-base font-bold">{allRows.length}</span> TOTAL</span>
          <span><span className="text-periwinkle font-bold">{portfolioRows.length}</span> TRACKED</span>
          <span><span className="text-butter font-bold">{ngRows.length}</span> NG PENDING</span>
          <span>AVG <span className={avgScore >= 80 ? 'text-mint font-bold' : avgScore >= 50 ? 'text-butter font-bold' : 'text-coral font-bold'}>{avgScore}%</span></span>
          <span><span className="text-mint font-bold">{fullCount}</span> COMPLETE ≥80%</span>
          {scraperHasRun
            ? <span className="text-mint">● SCRAPER DATA LOADED ({ngScraped.length} entries)</span>
            : <span className="text-coral">○ SCRAPER NOT YET RUN — run: python docs/Newgrounds/scraper.py</span>
          }
        </div>
      </div>

      {/* ── Table ──────────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse" style={{ minWidth: '1600px' }}>

          {/* ─ Group header row ─ */}
          <thead className="sticky top-0 z-10">
            <tr className="bg-surface-inverse border-b border-surface-base/10">
              <TH span={7}>IDENTITY</TH>
              <TH span={9} center accent="bg-periwinkle/20 text-periwinkle">
                ▼ NEWGROUNDS METADATA
              </TH>
              <TH span={7} center accent="bg-sky/10 text-sky">
                ▼ CONTENT CHECKLIST
              </TH>
              <TH center>SCORE</TH>
            </tr>

            {/* ─ Column header row ─ */}
            <tr className="bg-surface-inverse">
              {/* IDENTITY */}
              <TH>#</TH>
              <TH>SOURCE</TH>
              <TH>COMPANY</TH>
              <TH>PROJECT</TH>
              <TH>TYPE</TH>
              <TH>PERIOD</TH>
              <TH>ROLE</TH>
              {/* NG METADATA */}
              <TH center accent="border-l-2 border-periwinkle/30">UPLOADED</TH>
              <TH center>VIEWS</TH>
              <TH center>VOTES</TH>
              <TH center>SCORE /5</TH>
              <TH center>FAVES</TH>
              <TH>GENRE</TH>
              <TH center>TAGS</TH>
              <TH center>DESC.</TH>
              {/* CONTENT CHECKLIST */}
              <TH center accent="border-l-2 border-sky/30">ICON</TH>
              <TH center>LOGO</TH>
              <TH center>SHOTS</TH>
              <TH center>RESP.</TH>
              <TH center>ACHIEV.</TH>
              <TH center>TECH</TH>
              <TH>LINKS</TH>
              {/* SCORE */}
              <TH center>%</TH>
            </tr>
          </thead>

          <tbody>
            {/* ─ Portfolio.json section ─ */}
            <tr className="bg-periwinkle/10 border-y border-periwinkle/30">
              <td colSpan={24} className="px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-periwinkle font-bold">
                ▼ TRACKED PROJECTS — {portfolioRows.length} entries
              </td>
            </tr>

            {portfolioRows.map((row, i) => (
              <tr key={i} className={`border-b border-ink-base/8 hover:bg-periwinkle/5 transition-colors ${i % 2 === 0 ? 'bg-surface-base' : 'bg-surface-elevated'}`}>
                {/* IDENTITY */}
                <TD><span className="font-mono text-[10px] text-ink-base/30 tabular-nums">{i + 1}</span></TD>
                <TD><span className="font-mono text-[9px] px-1.5 py-0.5 bg-periwinkle/20 text-periwinkle rounded uppercase whitespace-nowrap">JSON</span></TD>
                <TD><span className="font-mono text-[11px] text-ink-subtle whitespace-nowrap">{row.company}</span></TD>
                <TD><span className="font-mono text-[12px] font-bold text-ink-base whitespace-nowrap">{row.title}</span></TD>
                <TD>
                  <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded uppercase whitespace-nowrap ${row.type === 'GAME' ? 'bg-coral/25 text-ink-subtle' : 'bg-sky/30 text-ink-subtle'}`}>
                    {row.type}
                  </span>
                </TD>
                <TD><span className="font-mono text-[10px] text-ink-whisper whitespace-nowrap">{row.period}</span></TD>
                <TD><span className="font-mono text-[11px] text-ink-subtle">{row.role}</span></TD>

                {/* NG METADATA — populated when project has a Newgrounds URL, N/A otherwise */}
                <TD center className="border-l-2 border-periwinkle/20">
                  {row.ng
                    ? <span className="font-mono text-[10px] text-ink-subtle whitespace-nowrap">{row.ng.upload_date_display || row.ng.upload_date_iso || '—'}</span>
                    : <span className="font-mono text-[10px] text-ink-base/20">N/A</span>}
                </TD>
                <TD center>
                  {row.ng ? <Num v={row.ng.views} /> : <span className="font-mono text-[10px] text-ink-base/20">N/A</span>}
                </TD>
                <TD center>
                  {row.ng ? <Num v={row.ng.votes} /> : <span className="font-mono text-[10px] text-ink-base/20">N/A</span>}
                </TD>
                <TD center>
                  {row.ng
                    ? <span className={`font-mono text-[11px] tabular-nums ${row.ng.score != null ? 'text-ink-base' : 'text-ink-base/25'}`}>
                        {row.ng.score != null ? row.ng.score.toFixed(2) : '—'}
                      </span>
                    : <span className="font-mono text-[10px] text-ink-base/20">N/A</span>}
                </TD>
                <TD center>
                  {row.ng ? <Num v={row.ng.faves} /> : <span className="font-mono text-[10px] text-ink-base/20">N/A</span>}
                </TD>
                <TD>
                  {row.ng ? <StrCell v={row.ng.genre ?? ''} /> : <span className="font-mono text-[10px] text-ink-base/20">N/A</span>}
                </TD>
                <TD center>
                  {row.ng
                    ? <span className={`font-mono text-[11px] ${(row.ng.tags?.length ?? 0) > 0 ? 'text-mint' : 'text-coral'}`}>
                        {row.ng.tags?.length ?? '—'}
                      </span>
                    : <span className="font-mono text-[10px] text-ink-base/20">N/A</span>}
                </TD>
                <TD center>
                  {row.ng ? <Dot s={row.ng.description ? 'ok' : 'missing'} /> : <span className="font-mono text-[10px] text-ink-base/20">N/A</span>}
                </TD>

                {/* CONTENT CHECKLIST */}
                <TD center className="border-l-2 border-sky/20"><Dot s={row.iconSt} /></TD>
                <TD center><Dot s={row.logoSt} /></TD>
                <TD center>
                  <div className="flex items-center justify-center gap-1.5">
                    <Dot s={row.shots.status} />
                    <Count n={row.shots.count} s={row.shots.status} />
                  </div>
                </TD>
                <TD center><Count n={row.respCount}   s={row.respSt}   /></TD>
                <TD center><Count n={row.achievCount} s={row.achievSt} /></TD>
                <TD center><Count n={row.techCount}   s={row.techSt}   /></TD>
                <TD>
                  <div className="flex gap-1 flex-wrap">
                    {row.wsSt   === 'ok' && <span className="font-mono text-[9px] px-1 py-0.5 bg-mint/30 text-ink-base rounded uppercase">WEB</span>}
                    {row.ytSt   === 'ok' && <span className="font-mono text-[9px] px-1 py-0.5 bg-coral/25 text-ink-base rounded uppercase">YT</span>}
                    {row.storeSt === 'ok' && <span className="font-mono text-[9px] px-1 py-0.5 bg-sky/30 text-ink-base rounded uppercase">STORE</span>}
                    {row.linkSt === 'missing' && <span className="font-mono text-[10px] text-coral">—</span>}
                  </div>
                </TD>
                <TD center><ScorePill score={row.score} /></TD>
              </tr>
            ))}

            {/* ─ Newgrounds pending section ─ */}
            <tr className="bg-butter/15 border-y border-butter/40">
              <td colSpan={24} className="px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-base font-bold">
                ▼ NEWGROUNDS PENDING — not yet in portfolio.json — {ngRows.length} entries
                {!scraperHasRun && <span className="ml-4 text-coral">[ run scraper to populate NG metadata columns ]</span>}
              </td>
            </tr>

            {ngRows.map((row, i) => {
              const ng = row.ng;
              return (
                <tr key={i} className={`border-b border-ink-base/8 hover:bg-butter/10 transition-colors ${i % 2 === 0 ? 'bg-butter/5' : 'bg-butter/[0.03]'}`}>
                  {/* IDENTITY */}
                  <TD><span className="font-mono text-[10px] text-ink-base/30 tabular-nums">{portfolioRows.length + i + 1}</span></TD>
                  <TD><span className="font-mono text-[9px] px-1.5 py-0.5 bg-butter/40 text-ink-base rounded uppercase whitespace-nowrap">PENDING</span></TD>
                  <TD><span className="font-mono text-[11px] text-ink-whisper whitespace-nowrap">Newgrounds</span></TD>
                  <TD>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[12px] font-bold text-ink-base whitespace-nowrap">{row.title}</span>
                      <a href={row.ngUrl} target="_blank" rel="noopener noreferrer"
                         className="font-mono text-[9px] px-1 py-0.5 bg-periwinkle/20 text-periwinkle rounded uppercase hover:bg-periwinkle/40 transition-colors whitespace-nowrap">
                        NG ↗
                      </a>
                    </div>
                  </TD>
                  <TD>
                    <span className="font-mono text-[9px] px-1.5 py-0.5 bg-coral/25 text-ink-subtle rounded uppercase">GAME</span>
                  </TD>
                  <TD>
                    <span className="font-mono text-[10px] text-ink-whisper">
                      {ng?.upload_date_iso
                        ? ng.upload_date_iso
                        : ng?.upload_date_display || row.period}
                    </span>
                  </TD>
                  <TD><span className="font-mono text-[10px] text-ink-subtle">{row.role}</span></TD>

                  {/* NG METADATA */}
                  <TD center className="border-l-2 border-periwinkle/20">
                    {scraperHasRun
                      ? <span className="font-mono text-[10px] text-ink-subtle whitespace-nowrap">{ng?.upload_date_display || ng?.upload_date_iso || '—'}</span>
                      : <span className="font-mono text-[9px] text-coral/60">pending</span>}
                  </TD>
                  <TD center>
                    {scraperHasRun ? <Num v={ng?.views} /> : <span className="font-mono text-[9px] text-coral/60">pending</span>}
                  </TD>
                  <TD center>
                    {scraperHasRun ? <Num v={ng?.votes} /> : <span className="font-mono text-[9px] text-coral/60">pending</span>}
                  </TD>
                  <TD center>
                    {scraperHasRun
                      ? <span className={`font-mono text-[11px] tabular-nums ${ng?.score != null ? 'text-ink-base' : 'text-ink-base/25'}`}>
                          {ng?.score != null ? `${ng.score.toFixed(2)}` : '—'}
                        </span>
                      : <span className="font-mono text-[9px] text-coral/60">pending</span>}
                  </TD>
                  <TD center>
                    {scraperHasRun ? <Num v={ng?.faves} /> : <span className="font-mono text-[9px] text-coral/60">pending</span>}
                  </TD>
                  <TD>
                    {scraperHasRun
                      ? <StrCell v={ng?.genre ?? ''} />
                      : <span className="font-mono text-[9px] text-coral/60">pending</span>}
                  </TD>
                  <TD center>
                    {scraperHasRun
                      ? <span className={`font-mono text-[11px] ${(ng?.tags?.length ?? 0) > 0 ? 'text-mint' : 'text-coral'}`}>
                          {ng?.tags?.length ?? '—'}
                        </span>
                      : <span className="font-mono text-[9px] text-coral/60">pending</span>}
                  </TD>
                  <TD center>
                    {scraperHasRun
                      ? <Dot s={row.hasDesc ? 'ok' : 'missing'} />
                      : <span className="font-mono text-[9px] text-coral/60">pending</span>}
                  </TD>

                  {/* CONTENT CHECKLIST */}
                  <TD center className="border-l-2 border-sky/20"><Dot s="missing" /></TD>
                  <TD center><Dot s="missing" /></TD>
                  <TD center><Dot s="missing" /></TD>
                  <TD center><span className="font-mono text-[10px] text-coral">—</span></TD>
                  <TD center><span className="font-mono text-[10px] text-coral">—</span></TD>
                  <TD center>
                    <Count n={row.techCount} s={row.techSt} />
                  </TD>
                  <TD>
                    <span className="font-mono text-[9px] px-1 py-0.5 bg-periwinkle/20 text-periwinkle rounded uppercase">NG</span>
                  </TD>
                  <TD center><ScorePill score={row.score} /></TD>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* ── Legend ───────────────────────────────────────────────────────── */}
        <div className="px-6 py-3 bg-surface-inverse/5 border-t-2 border-ink-base/10 flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-whisper">Legend</span>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-mint" />
            <span className="font-mono text-[10px] text-ink-subtle uppercase tracking-wide">Real data</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-butter" />
            <span className="font-mono text-[10px] text-ink-subtle uppercase tracking-wide">Placeholder (picsum)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-coral" />
            <span className="font-mono text-[10px] text-ink-subtle uppercase tracking-wide">Missing</span>
          </div>
          <span className="font-mono text-[10px] text-ink-whisper ml-4 uppercase tracking-wide border-l border-ink-base/20 pl-4">
            Score: icon · logo · screenshots · responsibilities · achievements · tech · links
          </span>
        </div>
      </div>
    </div>
  );
}
