import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MissionArchiveItem } from '../types/orbital';
import { Archive, ArrowUpRight, X, Compass, ShieldCheck, Layers, ChevronRight } from 'lucide-react';

interface MissionArchiveProps {
  onContinue: () => void;
}

const MISSIONS: MissionArchiveItem[] = [
  {
    id: 'x-01',
    code: 'X-01',
    title: 'FIRST ORBITAL TEST',
    category: 'ATMOSPHERIC ESCAPE & ORBIT INJECTION',
    year: '2026',
    status: 'COMPLETE // 100% SUCCESS',
    tagline: 'Maiden orbital flight testing the high-specific-impulse magneto-plasma thruster.',
    description: 'Orbital-X launched its sub-scale experimental craft into low Earth orbit to test magnetic plasma containment, telemetry integrity through extreme ionospheric shear, and autonomous recovery protocols.',
    payload: '4,200 KG INSTRUMENT CORE',
    distance: '420 KM PERIGEE / 1,200 KM APOGEE',
    imageType: 'spacecraft',
    specs: [
      { label: 'MAX VELOCITY', value: '7.82 KM/S' },
      { label: 'ORBITAL INCLINATION', value: '28.5°' },
      { label: 'DURATION', value: '18 DAYS' },
      { label: 'PROPULSION EFFICIENCY', value: '99.4%' },
    ],
  },
  {
    id: 'x-03',
    code: 'X-03',
    title: 'LUNAR NAVIGATION',
    category: 'CISLUNAR TRAJECTORY & PULSAR FIX',
    year: '2028',
    status: 'COMPLETE // FLIGHT RECORD',
    tagline: 'Autonomous celestial navigation validating pulsar-based triangulation.',
    description: 'Cislunar pathfinder demonstrating high-precision lunar orbit capture without reliance on terrestrial radio antennas, using purely onboard optical sensors and X-ray pulsar timing.',
    payload: '8,500 KG SCIENTIFIC PROBE',
    distance: '384,400 KM (CISLUNAR)',
    imageType: 'lunar',
    specs: [
      { label: 'TRANSIT TIME', value: '68 HOURS' },
      { label: 'NAVIGATION ERROR', value: '< 24 METERS' },
      { label: 'LUNAR ORBIT', value: 'POLAR 100 KM' },
      { label: 'LASER THROUGHPUT', value: '400 GBPS' },
    ],
  },
  {
    id: 'r-07',
    code: 'R-07',
    title: 'AUTONOMOUS ROVER',
    category: 'DEEP SURFACE RECONNAISSANCE',
    year: '2034',
    status: 'MISSION ACTIVE // EXTENDED PHASE',
    tagline: 'Multi-terrain autonomous planetary rover operating on Mars equivalent surface.',
    description: 'Equipped with the 6-axis sampling arm, laser ablation spectrometer, and stereo flash LIDAR, Rover R-07 has traversed hundreds of kilometers mapping subsurface ice deposits.',
    payload: '1,025 KG ROVER DEPLOYMENT',
    distance: '225,000,000 KM (SOL-4)',
    imageType: 'rover',
    specs: [
      { label: 'AUTONOMY RATE', value: '98.2%' },
      { label: 'SOLS ON SURFACE', value: '1,420 SOLS' },
      { label: 'SAMPLES CACHED', value: '38 TUBES' },
      { label: 'DISTANCE LOGGED', value: '342.6 KM' },
    ],
  },
  {
    id: 'm-12',
    code: 'M-12',
    title: 'MARS SYSTEM',
    category: 'ORBITAL INFRASTRUCTURE NETWORK',
    year: '2038',
    status: 'OPERATIONAL // CONSTANT UPLINK',
    tagline: 'Integrated orbital constellation coordinating surface swarms and relaying to Earth.',
    description: 'A constellation of three synchronized satellites orbiting Mars that orchestrates swarm communications, atmospheric weather forecasting, and real-time guidance for descending entry craft.',
    payload: '3,800 KG EACH (TRIPLE ARRAY)',
    distance: 'AEROSTATIONARY (17,032 KM)',
    imageType: 'mars',
    specs: [
      { label: 'UPLINK COVERAGE', value: '99.9%' },
      { label: 'LASER BANDWIDTH', value: '1.2 TBPS' },
      { label: 'STATIONKEEPING', value: 'ION PULSED' },
      { label: 'POWER MARGIN', value: '+45%' },
    ],
  },
];

export function MissionArchive({ onContinue }: MissionArchiveProps) {
  const [selectedMission, setSelectedMission] = useState<MissionArchiveItem | null>(null);

  return (
    <section
      id="archive"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-8 py-24 select-none"
    >
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl flex flex-col">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6 mb-12">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs text-cyan-400 mb-2">
              <Archive className="w-4 h-4 text-cyan-400" />
              <span>CLASSIFIED &amp; OPERATIONAL LOGS</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">ARCHIVE VAULT // 4 MISSIONS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight">
              MISSION ARCHIVE
            </h2>
            <p className="font-mono text-xs text-slate-400 mt-1 uppercase tracking-widest">
              Historical Milestones &amp; Autonomous Flagship Expeditions
            </p>
          </div>

          <div className="font-mono text-xs text-slate-500">
            [ HOVER TO EXPAND // CLICK TO INSPECT DOSSIER ]
          </div>
        </div>

        {/* Cinematic Grid with Dynamic Visual Transformations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {MISSIONS.map((mission) => (
            <div
              key={mission.id}
              onClick={() => setSelectedMission(mission)}
              data-cursor="OPEN"
              className="group relative p-8 border border-slate-800/80 bg-slate-950/70 hover:border-cyan-400/60 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]"
            >
              {/* Subtle tech background graphic accent */}
              <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                <span className="font-display text-9xl font-black text-white select-none">
                  {mission.code}
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between font-mono text-xs mb-6">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <span className="font-bold text-sm tracking-wider">{mission.code}</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-400">{mission.year}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold tracking-wider">
                    {mission.status}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-black text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {mission.title}
                </h3>
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block mb-4">
                  {mission.category}
                </span>

                <p className="text-slate-300 text-sm leading-relaxed font-light mb-6">
                  {mission.tagline}
                </p>
              </div>

              {/* Card Footer with quick metrics & expand icon */}
              <div className="pt-6 border-t border-slate-900 flex items-center justify-between font-mono text-xs">
                <div>
                  <span className="text-slate-500 text-[10px] block">PAYLOAD</span>
                  <span className="text-white font-medium">{mission.payload}</span>
                </div>

                <div className="flex items-center gap-2 text-cyan-400 group-hover:translate-x-1 transition-transform">
                  <span className="text-[10px] uppercase tracking-wider">VIEW DOSSIER</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Forward to Final Dimension */}
        <div className="mt-12 flex justify-end">
          <button
            onClick={onContinue}
            data-cursor="WARP"
            className="flex items-center gap-3 px-6 py-3 border border-cyan-500/40 bg-cyan-950/20 text-cyan-300 font-mono text-xs tracking-widest uppercase hover:bg-cyan-500/10 hover:border-cyan-300 transition-all"
          >
            <span>ENTER THE FINAL DIMENSION</span>
            <ChevronRight className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </div>

      {/* Interactive Modal Viewer */}
      <AnimatePresence>
        {selectedMission && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setSelectedMission(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-slate-950 border border-cyan-500/40 p-6 sm:p-8 text-white shadow-[0_0_50px_rgba(0,240,255,0.2)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedMission(null)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white border border-slate-800"
                aria-label="Close dossier modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 mb-2">
                <Compass className="w-4 h-4" />
                <span>EXPEDITION DOSSIER // {selectedMission.code}</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400">{selectedMission.year}</span>
              </div>

              <h3 className="font-display text-3xl font-black mb-1">
                {selectedMission.title}
              </h3>
              <p className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-6">
                {selectedMission.category}
              </p>

              <p className="text-slate-300 text-sm leading-relaxed font-light mb-8">
                {selectedMission.description}
              </p>

              {/* Specs Table */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-900/50 border border-slate-800 font-mono text-xs mb-6">
                {selectedMission.specs.map((s, idx) => (
                  <div key={idx}>
                    <span className="text-[10px] text-slate-500 block">{s.label}</span>
                    <span className="text-white font-bold">{s.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between font-mono text-xs text-slate-500 pt-4 border-t border-slate-900">
                <span>DISTANCE: {selectedMission.distance}</span>
                <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED FLIGHT TELEMETRY
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
