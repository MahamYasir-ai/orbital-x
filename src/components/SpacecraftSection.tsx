import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HotspotInfo } from '../types/orbital';
import { Cpu, Zap, Radio, Compass, Flame, Shield, ArrowRight } from 'lucide-react';

interface SpacecraftSectionProps {
  onNext: () => void;
}

const HOTSPOTS: HotspotInfo[] = [
  {
    id: 'propulsion',
    num: '01',
    title: 'PROPULSION',
    subtitle: 'MAGNETO-PLASMA ION THRUSTER',
    techSpec: 'I_sp: 14,200 s · Thrust: 850 N · Xenon-Argon Dual Matrix',
    description: 'High-density relativistic plasma exhaust with magnetic nozzle steering. Delivers continuous specific impulse for multi-AU deep transit without chemical propellant bulk.',
    position: [0, 0, -4.5],
    efficiency: '99.4%',
    status: 'OPTIMAL',
  },
  {
    id: 'navigation',
    num: '02',
    title: 'NAVIGATION',
    subtitle: 'X-RAY PULSAR TIMING SYSTEM',
    techSpec: 'Precision: < 50m at 10 AU · Autonomous Relativistic Kalman Filter',
    description: 'Autonomous spatial triangulation referencing high-frequency millisecond pulsars across the galactic plane, establishing absolute coordinate positioning independent of Earth telemetry.',
    position: [0, 0.6, 1.2],
    efficiency: '99.9%',
    status: 'LOCKED',
  },
  {
    id: 'communication',
    num: '03',
    title: 'COMMUNICATION',
    subtitle: 'QUANTUM ENTANGLEMENT LASER ARRAY',
    techSpec: 'Carrier: 1550nm Laser · Throughput: 1.2 Tbps · Sub-ms Relay',
    description: 'Phased optical array with quantum state repeaters ensuring continuous high-definition telemetry transmission through planetary occultation and solar radiation bursts.',
    position: [0, 1.2, -1],
    efficiency: '98.7%',
    status: 'ACTIVE',
  },
  {
    id: 'power',
    num: '04',
    title: 'POWER MATRIX',
    subtitle: 'GRAPHENE-PEROVSKITE PHOTOVOLTAIC SAILS',
    techSpec: 'Output: 180 kW · Dual-Junction Photovoltaic + Micro-RTG',
    description: 'Ultra-light folding solar wings with carbon-nanotube substrate, coupled to a compact radioisotope thermoelectric core delivering continuous auxiliary baseline power in deep space.',
    position: [4.5, 0, -1],
    efficiency: '96.2%',
    status: 'CHARGED',
  },
  {
    id: 'aicore',
    num: '05',
    title: 'AI CORE',
    subtitle: 'NEUROMORPHIC MISSION INTELLIGENCE',
    techSpec: 'Processing: 400 PFLOPS Optical Neural Lattice · Trajectory Autonomy',
    description: 'Self-governing onboard artificial neural architecture capable of orbital trajectory solving, micrometeorite avoidance maneuvering, and autonomous scientific triage in real-time.',
    position: [0, 0, 0],
    efficiency: '99.8%',
    status: 'SYNCHRONIZED',
  },
];

type ViewMode = 'VISUAL' | 'TECHNICAL' | 'SYSTEMS';

export function SpacecraftSection({ onNext }: SpacecraftSectionProps) {
  const [activeHotspot, setActiveHotspot] = useState<HotspotInfo>(HOTSPOTS[0]);
  const [viewMode, setViewMode] = useState<ViewMode>('VISUAL');

  return (
    <section
      id="spacecraft"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-8 py-24 select-none"
    >
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl flex flex-col">
        {/* Section Header with Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs text-cyan-400 mb-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span>FLAGSHIP CLASS // EXPLORATION FLEET</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">SERIAL: ORB-X01-ALPHA</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight">
              VESSEL / X-01
            </h2>
            <p className="font-mono text-xs text-slate-400 mt-1 uppercase tracking-widest">
              Autonomous Deep-Space Reconnaissance & Planetary Insert Craft
            </p>
          </div>

          {/* View Mode Toggle: VISUAL | TECHNICAL | SYSTEMS */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded font-mono text-xs">
            {(['VISUAL', 'TECHNICAL', 'SYSTEMS'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                data-cursor="MODE"
                className={`px-4 py-2 uppercase tracking-wider transition-all rounded ${
                  viewMode === mode
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Main Stage Grid: Interactive Craft Blueprint & Telemetry Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left/Center Visual & Blueprint Interactive Viewport (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="relative w-full aspect-[16/10] bg-slate-950/80 border border-slate-800/80 rounded-sm overflow-hidden flex flex-col justify-between p-6">
              {/* Technical Grid Overlay */}
              <div
                className={`absolute inset-0 bg-tech-grid pointer-events-none transition-opacity duration-500 ${
                  viewMode === 'TECHNICAL' ? 'opacity-40' : 'opacity-15'
                }`}
              />

              {/* Blueprint Wireframe Callouts (Visible in Technical View) */}
              {viewMode === 'TECHNICAL' && (
                <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between font-mono text-[10px] text-cyan-400/80">
                  <div className="flex justify-between border-b border-cyan-500/20 pb-2">
                    <span>FRAME LENGTH: 48.6 METERS</span>
                    <span>WINGSPAN: 34.2 METERS</span>
                    <span>DRY MASS: 12,400 KG</span>
                  </div>
                  <div className="flex justify-between border-t border-cyan-500/20 pt-2">
                    <span>THERMAL SHIELD: CERAMIC AEROGEL MATRIX</span>
                    <span>OPERATIONAL RADIUS: 50 AU</span>
                  </div>
                </div>
              )}

              {/* Central Vector Craft Graphic / Blueprint Animation */}
              <div className="relative z-10 my-auto flex flex-col items-center justify-center py-8">
                {/* Visual SVG schematic representing Vessel X-01 */}
                <div className="relative w-full max-w-lg aspect-[16/9] flex items-center justify-center">
                  <svg
                    viewBox="0 0 600 350"
                    className="w-full h-full drop-shadow-[0_0_25px_rgba(0,240,255,0.15)]"
                    style={{
                      filter: viewMode === 'TECHNICAL' ? 'invert(0.1) hue-rotate(180deg)' : 'none',
                    }}
                  >
                    {/* Background coordinate grid lines */}
                    <line x1="50" y1="175" x2="550" y2="175" stroke="rgba(0,240,255,0.2)" strokeDasharray="4 4" />
                    <line x1="300" y1="30" x2="300" y2="320" stroke="rgba(0,240,255,0.2)" strokeDasharray="4 4" />
                    <circle cx="300" cy="175" r="90" fill="none" stroke="rgba(0,240,255,0.1)" />

                    {/* Solar Wings (Left & Right) */}
                    <polygon
                      points="160,165 40,110 30,140 160,175"
                      fill="#0a101f"
                      stroke="#00f0ff"
                      strokeWidth="1.2"
                      opacity="0.8"
                    />
                    <polygon
                      points="440,165 560,110 570,140 440,175"
                      fill="#0a101f"
                      stroke="#00f0ff"
                      strokeWidth="1.2"
                      opacity="0.8"
                    />

                    {/* Wing Photovoltaic Gridlines */}
                    <line x1="70" y1="120" x2="80" y2="150" stroke="#00f0ff" strokeWidth="0.8" opacity="0.4" />
                    <line x1="110" y1="135" x2="120" y2="165" stroke="#00f0ff" strokeWidth="0.8" opacity="0.4" />
                    <line x1="490" y1="135" x2="480" y2="165" stroke="#00f0ff" strokeWidth="0.8" opacity="0.4" />
                    <line x1="530" y1="120" x2="520" y2="150" stroke="#00f0ff" strokeWidth="0.8" opacity="0.4" />

                    {/* Main Diamond Fuselage */}
                    <polygon
                      points="300,50 360,170 330,270 270,270 240,170"
                      fill="#0f172a"
                      stroke={viewMode === 'TECHNICAL' ? '#38bdf8' : '#e2e8f0'}
                      strokeWidth="1.8"
                    />

                    {/* Cockpit / Sensor Array Visor */}
                    <ellipse
                      cx="300"
                      cy="110"
                      rx="16"
                      ry="35"
                      fill="#00f0ff"
                      fillOpacity="0.4"
                      stroke="#00f0ff"
                      strokeWidth="1.5"
                    />

                    {/* Ion Thrusters (Rear) */}
                    <rect
                      x="280"
                      y="270"
                      width="40"
                      height="20"
                      fill="#1e293b"
                      stroke="#00f0ff"
                      strokeWidth="1"
                    />
                    {/* Ion Plume Cone */}
                    <polygon
                      points="285,290 300,340 315,290"
                      fill="url(#ionGradient)"
                      opacity="0.85"
                    />

                    <defs>
                      <linearGradient id="ionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#7928ca" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Hotspot Floating Buttons over Craft */}
              <div className="relative z-20 flex flex-wrap justify-center gap-3 pt-4 border-t border-slate-800">
                {HOTSPOTS.map((h) => {
                  const isActive = activeHotspot.id === h.id;
                  return (
                    <button
                      key={h.id}
                      onClick={() => setActiveHotspot(h)}
                      data-cursor="INSPECT"
                      className={`px-3 py-1.5 font-mono text-xs flex items-center gap-2 border transition-all ${
                        isActive
                          ? 'border-cyan-400 bg-cyan-950/60 text-cyan-200 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                          : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <span className="font-bold text-cyan-400">{h.num}</span>
                      <span>{h.title}</span>
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Systems Readout Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
              <div className="border border-slate-800 bg-slate-950/40 p-3">
                <span className="text-slate-500 text-[10px] block">PROPULSION STATUS</span>
                <span className="text-cyan-400 font-bold">14,200 s ISP</span>
              </div>
              <div className="border border-slate-800 bg-slate-950/40 p-3">
                <span className="text-slate-500 text-[10px] block">THERMAL SHIELD</span>
                <span className="text-emerald-400 font-bold">3,200 K MAX</span>
              </div>
              <div className="border border-slate-800 bg-slate-950/40 p-3">
                <span className="text-slate-500 text-[10px] block">POWER RESERVE</span>
                <span className="text-white font-bold">98.4% NOMINAL</span>
              </div>
              <div className="border border-slate-800 bg-slate-950/40 p-3">
                <span className="text-slate-500 text-[10px] block">AI GUIDANCE</span>
                <span className="text-cyan-300 font-bold">AUTONOMOUS</span>
              </div>
            </div>
          </div>

          {/* Right Selected Hotspot Dossier (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col h-full justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHotspot.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="border border-cyan-500/30 bg-slate-950/70 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-slate-500 mb-2">
                    <span className="text-cyan-400 font-bold tracking-widest">
                      SUBSYSTEM // {activeHotspot.num}
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {activeHotspot.status}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white mb-1">
                    {activeHotspot.title}
                  </h3>
                  <p className="font-mono text-[11px] text-cyan-300 uppercase tracking-wider mb-4">
                    {activeHotspot.subtitle}
                  </p>

                  <div className="bg-slate-900/60 border border-slate-800 p-3 font-mono text-[11px] text-slate-300 mb-4">
                    <span className="text-slate-500 block text-[9px] uppercase">
                      TECHNICAL SPECIFICATION:
                    </span>
                    {activeHotspot.techSpec}
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed font-light mb-6">
                    {activeHotspot.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between font-mono text-xs">
                  <div>
                    <span className="text-slate-500 text-[10px] block">EFFICIENCY RATIO</span>
                    <span className="text-white font-bold">{activeHotspot.efficiency}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">REDUNDANCY</span>
                    <span className="text-cyan-400 font-bold">TRIPLE MODULAR</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Next section button */}
            <div className="mt-6">
              <button
                onClick={onNext}
                data-cursor="ROVER"
                className="w-full py-3.5 border border-cyan-500/40 bg-cyan-950/20 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-300 font-mono text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2"
              >
                <span>DEPLOY ROBOTICS ON SURFACE</span>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
