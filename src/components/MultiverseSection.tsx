import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DimensionInfo, DimensionId } from '../types/orbital';
import { Globe, Compass, Radio, Disc3, Sparkles, Layers, ArrowRight } from 'lucide-react';

interface MultiverseSectionProps {
  onContinue: () => void;
}

const DIMENSIONS: DimensionInfo[] = [
  {
    id: 'dim-01',
    name: 'DIMENSION 01',
    tag: 'EARTH ORIGIN',
    subtitle: 'AZURE ATMOSPHERE // SOL-3',
    color: 'from-blue-600/20 to-cyan-900/10',
    accent: '#00f0ff',
    atmosphere: '1.013 BAR · O2/N2 DUAL SHIELD',
    gravity: '1.00 G',
    status: 'TERRESTRIAL CRADLE',
    description: 'The baseline cradle of human aerospace engineering. Ground telemetry stations coordinate synchronized laser arrays into the orbital shell.',
  },
  {
    id: 'dim-02',
    name: 'DIMENSION 02',
    tag: 'MARS & RED WASTES',
    subtitle: 'CRIMSON DUST // SOL-4',
    color: 'from-rose-800/20 to-orange-950/20',
    accent: '#f97316',
    atmosphere: '0.006 BAR · IRON OXIDE STORMS',
    gravity: '0.38 G',
    status: 'SURFACE COLONIZATION',
    description: 'Arid canyonlands carved by ancient cataclysms. Swarms of R-07 autonomous rovers excavate subterranean ice deposits under twin moon transits.',
  },
  {
    id: 'dim-03',
    name: 'DIMENSION 03',
    tag: 'DEEP ORBIT & VACUUM',
    subtitle: 'HARD VACUUM // KUIPER EDGE',
    color: 'from-slate-800/30 to-slate-950/40',
    accent: '#38bdf8',
    atmosphere: '0.000 BAR · ABSOLUTE VACUUM',
    gravity: 'MICROGRAVITY (< 10^-6 G)',
    status: 'DEEP-SPACE ARRAYS',
    description: 'Pitch-black interstellar expanse. Kinetic spacecraft unfurl hundreds of square meters of photovoltaic sails to capture the faintest stellar winds.',
  },
  {
    id: 'dim-04',
    name: 'DIMENSION 04',
    tag: 'THE UNKNOWN',
    subtitle: 'VIOLET COSMIC LATTICE // OORT INTERFACE',
    color: 'from-purple-900/30 to-violet-950/40',
    accent: '#a855f7',
    atmosphere: 'UNDEFINED · DARK FLUID FLUX',
    gravity: 'HYPERBOLIC GRAVITATIONAL WELL',
    status: 'ANOMALOUS OBSERVATION',
    description: 'A realm of glowing nebular clouds where electromagnetic radiation shifts into non-Euclidean polarization. Ancient megastructures drift in silence.',
  },
  {
    id: 'dim-05',
    name: 'DIMENSION 05',
    tag: 'BEYOND',
    subtitle: 'GEOMETRIC HYPERSPACE // SINGULARITY REALM',
    color: 'from-fuchsia-950/30 to-cyan-950/30',
    accent: '#ec4899',
    atmosphere: 'CHRONO-SPATIAL DILATION',
    gravity: 'RELATIVISTIC TENSOR INFLECTION',
    status: 'TRANSCENDENT HORIZON',
    description: 'The boundary where dimensions converge into crystalline geometric lattices. Here, navigation is governed by probability matrices rather than distance.',
  },
];

export function MultiverseSection({ onContinue }: MultiverseSectionProps) {
  const [selectedDimension, setSelectedDimension] = useState<DimensionInfo>(DIMENSIONS[0]);

  return (
    <section
      id="multiverse"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-8 py-24 select-none"
    >
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl flex flex-col">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs text-cyan-400 mb-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>DIMENSIONAL CONVERGENCE MATRIX</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">5 MULTIVERSE SECTORS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight">
              MULTIVERSE PASSAGE
            </h2>
            <p className="font-mono text-xs text-slate-400 mt-1 uppercase tracking-widest">
              Traverse continuous reality fields engineered by Orbital-X
            </p>
          </div>

          {/* Quick instructions */}
          <div className="font-mono text-xs text-slate-500">
            [ SELECT SECTOR TO SHIFT REALITY FIELD ]
          </div>
        </div>

        {/* Dimension Selectors (5 tabs) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs mb-8">
          {DIMENSIONS.map((dim) => {
            const isSelected = selectedDimension.id === dim.id;
            return (
              <button
                key={dim.id}
                onClick={() => setSelectedDimension(dim)}
                data-cursor="SHIFT"
                className={`p-3.5 text-left border transition-all ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/40 text-white shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                    : 'border-slate-800 bg-slate-900/30 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] text-cyan-400 font-bold mb-1">
                  {dim.name}
                </div>
                <div className="font-semibold truncate">{dim.tag}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Reality Stage Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDimension.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className={`w-full p-8 sm:p-12 border border-slate-800 bg-gradient-to-br ${selectedDimension.color} backdrop-blur-md relative overflow-hidden`}
          >
            {/* Background geometric motif */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-15 pointer-events-none flex items-center justify-center">
              <Disc3
                className="w-96 h-96 animate-spin"
                style={{
                  color: selectedDimension.accent,
                  animationDuration: '50s',
                }}
              />
            </div>

            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-3 font-mono text-xs mb-3">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: selectedDimension.accent,
                    boxShadow: `0 0 10px ${selectedDimension.accent}`,
                  }}
                />
                <span className="font-bold tracking-widest uppercase text-white">
                  {selectedDimension.name} // {selectedDimension.tag}
                </span>
              </div>

              <h3 className="font-display text-3xl sm:text-5xl font-black text-white mb-2">
                {selectedDimension.subtitle}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light mt-4 mb-8">
                {selectedDimension.description}
              </p>

              {/* Physical conditions in this reality (Pill-Free) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block">ATMOSPHERIC DENSITY</span>
                  <span className="text-white font-semibold">{selectedDimension.atmosphere}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">GRAVITATIONAL ACCEL</span>
                  <span className="text-cyan-300 font-semibold">{selectedDimension.gravity}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">FIELD DOMAIN</span>
                  <span className="text-emerald-400 font-semibold">{selectedDimension.status}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Transition button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onContinue}
            data-cursor="LAB"
            className="flex items-center gap-3 px-6 py-3.5 border border-cyan-500/40 bg-cyan-950/20 text-cyan-300 font-mono text-xs tracking-widest uppercase hover:bg-cyan-500/10 hover:border-cyan-300 transition-all"
          >
            <span>ENTER ADVANCED R&D LABORATORY</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </div>
    </section>
  );
}
