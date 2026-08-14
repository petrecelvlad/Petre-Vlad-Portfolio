import React, { useState } from 'react';
import { SkinRegistry } from '@/src/components/bento/SkinRegistry';
import {
  WorkbenchMasterView,
  WoodTile,
  CardboardCeramicTile,
  LeatherStrap,
  CorkboardNote,
  ToggleSwitch,
  RotaryFlapUnit,
  PolaroidWaxSeal,
  SlideGauge,
  EmergencyButton
} from '@/src/components/bento/skins/gamified/widgets';
import { Wrench, Grid, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

export function GamifiedShowcase() {
  const [viewMode, setViewMode] = useState<'workbench' | 'bento'>('workbench');
  const gamifiedStrategy = SkinRegistry.getStrategy('gamified');

  // Interactive state tracking shared across views
  const [toggleState, setToggleState] = useState(true);
  const [counterVal, setCounterVal] = useState(8);
  const [gaugeVal, setGaugeVal] = useState(65);
  const [noteChecked, setNoteChecked] = useState(true);
  const [emergencyCount, setEmergencyCount] = useState(0);

  return (
    <div className="w-full h-full max-w-7xl mx-auto px-2 md:px-4 py-2 md:py-3 flex flex-col justify-between overflow-hidden">
      {/* Header bar for Showcase */}
      <div className="flex flex-row items-center justify-between gap-2 mb-2 bg-[#1C1610]/95 border-2 border-[#523917] px-3 py-2 rounded-xl text-amber-100 shadow-xl backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-amber-600/30 border border-amber-500/50 rounded-lg text-amber-400 shrink-0">
            <Wrench className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-base md:text-xl font-black tracking-wide text-amber-200 uppercase truncate">
                {gamifiedStrategy.name} Theme Lab
              </h2>
              <span className="hidden sm:flex px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full items-center gap-1 shrink-0">
                <Sparkles className="w-3 h-3 text-amber-400" /> Modular System
              </span>
            </div>
            <p className="text-[11px] text-amber-200/70 font-mono hidden md:block truncate">
              Extracted from 3demo.md &bull; Reusable interactive 3D UI modules
            </p>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1.5 bg-[#0E0704] p-1 rounded-lg border border-[#3A220F] shrink-0">
          <button
            onClick={() => setViewMode('workbench')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold transition-all ${
              viewMode === 'workbench'
                ? 'bg-amber-600 text-amber-950 shadow font-extrabold'
                : 'text-amber-300/70 hover:text-amber-200 hover:bg-amber-950/40'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Full Workbench
          </button>
          <button
            onClick={() => setViewMode('bento')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold transition-all ${
              viewMode === 'bento'
                ? 'bg-amber-600 text-amber-950 shadow font-extrabold'
                : 'text-amber-300/70 hover:text-amber-200 hover:bg-amber-950/40'
            }`}
          >
            <Grid className="w-3.5 h-3.5" /> Bento Grid
          </button>
        </div>
      </div>

      {/* Main View Area (Guaranteed no overflow / fits screen bounds) */}
      <div className="flex-1 min-h-0 w-full flex flex-col justify-center items-center overflow-hidden">
        {viewMode === 'workbench' ? (
          /* Full Unified Workbench View (Exact SVG Layering + Responsive Scaling) */
          <div className="w-full h-full max-h-full flex items-center justify-center p-1">
            <WorkbenchMasterView
              toggleState={toggleState}
              onToggleStateChange={setToggleState}
              counterVal={counterVal}
              onCounterValChange={setCounterVal}
              gaugeVal={gaugeVal}
              onGaugeValChange={setGaugeVal}
              noteChecked={noteChecked}
              onNoteCheckedChange={setNoteChecked}
              emergencyCount={emergencyCount}
              onEmergencyPress={() => setEmergencyCount(c => c + 1)}
              className="max-h-[calc(100vh-140px)] w-auto max-w-full aspect-[4/3] object-contain shadow-2xl rounded-xl border-4 border-[#170E08]"
            />
          </div>
        ) : (
          /* Bento Grid View with padded unclipped SVGs */
          <div className="w-full h-full overflow-y-auto max-h-full pr-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 p-1">
              {/* Card 1: Wood Tile */}
              <div className="bg-[#1C1610] border-2 border-[#523917] rounded-xl p-3 flex flex-col justify-between gap-2 shadow-lg">
                <div className="flex items-center justify-between border-b border-amber-900/50 pb-1">
                  <span className="font-mono text-xs font-bold text-amber-300">&lt;WoodTile /&gt;</span>
                  <span className="text-[9px] bg-amber-900/40 text-amber-200 px-1.5 py-0.5 rounded border border-amber-700/50">3D Extruded</span>
                </div>
                <div className="p-1 bg-[#0E0704] rounded-lg">
                  <WoodTile label="OAK_BLOCK_01" />
                </div>
                <p className="text-[10px] text-amber-200/70 font-sans">
                  Extruded oak tile with bevel, inset tray, and brass gear emblem.
                </p>
              </div>

              {/* Card 2: Cardboard Ceramic */}
              <div className="bg-[#1C1610] border-2 border-[#523917] rounded-xl p-3 flex flex-col justify-between gap-2 shadow-lg">
                <div className="flex items-center justify-between border-b border-amber-900/50 pb-1">
                  <span className="font-mono text-xs font-bold text-amber-300">&lt;CardboardCeramicTile /&gt;</span>
                  <span className="text-[9px] bg-amber-900/40 text-amber-200 px-1.5 py-0.5 rounded border border-amber-700/50">Multi-Layer</span>
                </div>
                <div className="p-1 bg-[#0E0704] rounded-lg">
                  <CardboardCeramicTile />
                </div>
                <p className="text-[10px] text-amber-200/70 font-sans">
                  Corrugated cardboard base with fluted edge & ceramic top tile.
                </p>
              </div>

              {/* Card 3: Leather Strap */}
              <div className="bg-[#1C1610] border-2 border-[#523917] rounded-xl p-3 flex flex-col justify-between gap-2 shadow-lg">
                <div className="flex items-center justify-between border-b border-amber-900/50 pb-1">
                  <span className="font-mono text-xs font-bold text-amber-300">&lt;LeatherStrap /&gt;</span>
                  <span className="text-[9px] bg-amber-900/40 text-amber-200 px-1.5 py-0.5 rounded border border-amber-700/50">Tactile Leather</span>
                </div>
                <div className="p-1 bg-[#0E0704] rounded-lg">
                  <LeatherStrap label="LEATHER_STRAP_01" />
                </div>
                <p className="text-[10px] text-amber-200/70 font-sans">
                  Padded leather strap with stitching, brass buckle & rivets.
                </p>
              </div>

              {/* Card 4: Corkboard Note */}
              <div className="bg-[#1C1610] border-2 border-[#523917] rounded-xl p-3 flex flex-col justify-between gap-2 shadow-lg">
                <div className="flex items-center justify-between border-b border-amber-900/50 pb-1">
                  <span className="font-mono text-xs font-bold text-amber-300">&lt;CorkboardNote /&gt;</span>
                  <span className="text-[9px] bg-amber-900/40 text-amber-200 px-1.5 py-0.5 rounded border border-amber-700/50">Interactive Note</span>
                </div>
                <div className="p-1 bg-[#0E0704] rounded-lg">
                  <CorkboardNote
                    line1="HERITAGE RULES"
                    line2="CORKBOARD TEX"
                    line3="RED PUSHPIN"
                    initialChecked={noteChecked}
                    onToggleCheck={setNoteChecked}
                  />
                </div>
                <p className="text-[10px] text-amber-200/70 font-sans">
                  Cork surface with pinned note, tape, & 3D red pushpin.
                </p>
              </div>

              {/* Card 5: Industrial Toggle Switch */}
              <div className="bg-[#1C1610] border-2 border-[#523917] rounded-xl p-3 flex flex-col justify-between gap-2 shadow-lg">
                <div className="flex items-center justify-between border-b border-amber-900/50 pb-1">
                  <span className="font-mono text-xs font-bold text-amber-300">&lt;ToggleSwitch /&gt;</span>
                  <span className="text-[9px] bg-green-900/40 text-green-300 px-1.5 py-0.5 rounded border border-green-700/50">Interactive Switch</span>
                </div>
                <div className="p-1 bg-[#0E0704] rounded-lg">
                  <ToggleSwitch initialOn={toggleState} onToggle={setToggleState} label="SWITCH_WIDGET" />
                </div>
                <p className="text-[10px] text-amber-200/70 font-sans">
                  Metal plate switch with hex bolts, 3D lever, & ON/OFF LEDs.
                </p>
              </div>

              {/* Card 6: Rotary & Split Flap */}
              <div className="bg-[#1C1610] border-2 border-[#523917] rounded-xl p-3 flex flex-col justify-between gap-2 shadow-lg">
                <div className="flex items-center justify-between border-b border-amber-900/50 pb-1">
                  <span className="font-mono text-xs font-bold text-amber-300">&lt;RotaryFlapUnit /&gt;</span>
                  <span className="text-[9px] bg-green-900/40 text-green-300 px-1.5 py-0.5 rounded border border-green-700/50">Interactive Counter</span>
                </div>
                <div className="p-1 bg-[#0E0704] rounded-lg">
                  <RotaryFlapUnit initialValue={counterVal} onChange={setCounterVal} />
                </div>
                <p className="text-[10px] text-amber-200/70 font-sans">
                  Rotary Bakelite knob connected to 3D split-flap counter unit.
                </p>
              </div>

              {/* Card 7: Polaroid Wax Seal */}
              <div className="bg-[#1C1610] border-2 border-[#523917] rounded-xl p-3 flex flex-col justify-between gap-2 shadow-lg">
                <div className="flex items-center justify-between border-b border-amber-900/50 pb-1">
                  <span className="font-mono text-xs font-bold text-amber-300">&lt;PolaroidWaxSeal /&gt;</span>
                  <span className="text-[9px] bg-amber-900/40 text-amber-200 px-1.5 py-0.5 rounded border border-amber-700/50">Wax Crest</span>
                </div>
                <div className="p-1 bg-[#0E0704] rounded-lg">
                  <PolaroidWaxSeal label="Sample_v04.png" />
                </div>
                <p className="text-[10px] text-amber-200/70 font-sans">
                  Polaroid photo frame with paperclip & crimson melted wax seal.
                </p>
              </div>

              {/* Card 8: Slide Gauge */}
              <div className="bg-[#1C1610] border-2 border-[#523917] rounded-xl p-3 flex flex-col justify-between gap-2 shadow-lg">
                <div className="flex items-center justify-between border-b border-amber-900/50 pb-1">
                  <span className="font-mono text-xs font-bold text-amber-300">&lt;SlideGauge /&gt;</span>
                  <span className="text-[9px] bg-green-900/40 text-green-300 px-1.5 py-0.5 rounded border border-green-700/50">Interactive Slider</span>
                </div>
                <div className="p-1 bg-[#0E0704] rounded-lg">
                  <SlideGauge initialValue={gaugeVal} onChange={setGaugeVal} label="METRIC_SLIDE" />
                </div>
                <p className="text-[10px] text-amber-200/70 font-sans">
                  Mahogany slide rule with laser etched ticks & amber glass cursor.
                </p>
              </div>

              {/* Card 9: Emergency Button */}
              <div className="bg-[#1C1610] border-2 border-[#523917] rounded-xl p-3 flex flex-col justify-between gap-2 shadow-lg">
                <div className="flex items-center justify-between border-b border-amber-900/50 pb-1">
                  <span className="font-mono text-xs font-bold text-amber-300">&lt;EmergencyButton /&gt;</span>
                  <span className="text-[9px] bg-red-900/40 text-red-300 px-1.5 py-0.5 rounded border border-red-700/50">Interactive Press</span>
                </div>
                <div className="p-1 bg-[#0E0704] rounded-lg">
                  <EmergencyButton onPress={() => setEmergencyCount(c => c + 1)} sublabel={`TRIG: ${emergencyCount}`} />
                </div>
                <p className="text-[10px] text-amber-200/70 font-sans">
                  Hazard caution plate with steel housing & 3D red STOP button.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer bar */}
      <div className="mt-1 text-center text-[10px] font-mono text-amber-200/50 py-1 border-t border-amber-900/40 shrink-0">
        <CheckCircle2 className="w-3 h-3 inline-block mr-1 text-green-400" />
        All 10 tactile components modularized in <code className="text-amber-300 font-bold">src/components/bento/skins/gamified/widgets/</code>
      </div>
    </div>
  );
}
