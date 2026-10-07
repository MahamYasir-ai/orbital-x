import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Cpu, Radio, Flame, Globe, ArrowUpRight, Zap } from 'lucide-react';

interface FutureTechSectionProps {
  onContinue: () => void;
}

interface TechPillar {
  id: string;
  code: string;
  title: string;
  category: string;
  metric: string;
  narrative: string;
  breakthrough: string;
  icon: any;
}

const PILLARS: TechPillar[] = [
  {
    id: 'ai-nav',
    code: 'TECH-01',
    title: 'AI NAVIGATION',
    category: 'RELATIVISTIC TRAJECTORY SOLVER',
    metric: '< 10 MICROSECONDS LATENCY',
    narrative: 'Deep-space positioning using autonomous visual SLAM, pulsar time delays, and real-time gravity anomaly inversion. Solves orbital transfers even when communications black out.',
    breakthrough: 'Neuromorphic optical processor running decentralized spatial Kalman filters directly on spacecraft hardware.',
    icon: Compass,
  },
  {
    id: 'robotics',
    code: 'TECH-02',
    title: 'AUTONOMOUS ROBOTICS',
    category: 'SWARM EXCAVATION & FABRICATION',
    metric: '99.4% SELF-SUFFICIENCY',
    narrative: 'Next-generation rover swarms that coordinate in-situ resource extraction, subterranean shelter 3D printing, and automated repair lattices across harsh planetary regolith.',
    breakthrough: 'Synthetic tendon biomorphic actuators engineered with carbon nanotube muscles immune to extreme cryogenic embrittlement.',
    icon: Cpu,
  },
  {
    id: 'quantum-comm',
    code: 'TECH-03',
    title: 'QUANTUM COMMUNICATION',
    category: 'ENTANGLEMENT LASER REPEATER',
    metric: 'ZERO-LOSS QUANTUM CHANNEL',
    narrative: 'Photonic quantum entanglement repeaters deployed in halo orbits around Lagrange points, enabling un-interceptable scientific telemetry across interstellar distances.',
    breakthrough: 'Continuous-variable quantum memory nodes operating in deep cryo-vacuum without active refrigeration.',
    icon: Radio,
  },
  {
    id: 'deep-space',
    code: 'TECH-04',
    title: 'DEEP SPACE SYSTEMS',
    category: 'MAGNETOHYDRODYNAMIC PROPULSION',
    metric: '120,000 M/S EXHAUST VELOCITY',
    narrative: 'Coupled micro-fusion magnetoplasma drives that yield sustained specific impulses enabling human and robotic missions to Jupiter’s moons in less than 90 Earth days.',
    breakthrough: 'High-temperature superconducting magnetic nozzles that confine 50-million-kelvin plasma streams with zero wall erosion.',
    icon: Flame,
  },
  {
    id: 'planetary',
    code: 'TECH-05',
    title: 'PLANETARY SCIENCE',
    category: 'IN-SITU ATMOSPHERIC CONVERSION',
    metric: '45 KG O2 / HOUR EXTRACTION',
    narrative: 'Closed-loop ecological reactors and solid-oxide electrolysis plants that process ambient carbon dioxide and regolith ice into propellant, breathable air, and drinking water.',
    breakthrough: 'Direct microwave thermal liquefaction of regolith hydrates yielding pure water and structural building blocks simultaneously.',
    icon: Globe,
  },
];

export function FutureTechSection({ onContinue }: FutureTechSectionProps) {
  const [activeTech, setActiveTech] = useState<TechPillar>(PILLARS[0]);

  return (
    <section
      id="tech"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-8 py-24 select-none bg-slate-950/90"
    >
      <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl flex flex-col">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6 mb-12">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs text-cyan-400 mb-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>ORBITAL-X ADVANCED RESEARCH &amp; DEVELOPMENT</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">DIVISION: LAB-07</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight">
              FUTURE TECHNOLOGY
            </h2>
            <p className="font-mono text-xs text-slate-400 mt-1 uppercase tracking-widest">
              Fundamental Engineering Breakthroughs Reshaping Exploration
            </p>
          </div>

          <div className="font-mono text-xs text-slate-500">
            [ INTERACTIVE R&amp;D BLUEPRINTS ]
          </div>
        </div>

        {/* Experimental Asymmetric Lab Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Large Pillar Selector List (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            {PILLARS.map((p) => {
              const isSelected = activeTech.id === p.id;
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveTech(p)}
                  data-cursor="EXPAND"
                  className={`p-5 text-left border transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-950/40 text-white shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                      : 'border-slate-800/80 bg-slate-900/30 text-slate-400 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2.5 rounded border ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300'
                          : 'border-slate-800 text-slate-500 group-hover:text-cyan-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-cyan-400 block tracking-widest">
                        {p.code}
                      </span>
                      <h3 className="font-display font-bold text-lg text-white">
                        {p.title}
                      </h3>
                    </div>
                  </div>

                  <ArrowUpRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected
                        ? 'text-cyan-300 translate-x-0.5 -translate-y-0.5'
                        : 'text-slate-600 group-hover:text-slate-300'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Deep Dive Lab Inspector (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTech.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="h-full border border-cyan-500/30 bg-slate-950/90 p-8 sm:p-10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-slate-500 mb-4 pb-3 border-b border-slate-900">
                    <span className="text-cyan-400 font-bold">{activeTech.code} // CLASSIFICATION: UNCLASSIFIED</span>
                    <span className="text-slate-400">TRL LEVEL: 8</span>
                  </div>

                  <span className="font-mono text-xs text-cyan-300 uppercase tracking-widest block mb-2">
                    {activeTech.category}
                  </span>

                  <h3 className="font-display text-3xl sm:text-4xl font-black text-white mb-6">
                    {activeTech.title}
                  </h3>

                  <p className="text-slate-300 text-base leading-relaxed font-light mb-8">
                    {activeTech.narrative}
                  </p>

                  <div className="p-4 bg-slate-900/60 border border-slate-800/80 mb-6">
                    <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest block mb-1">
                      PRIMARY SCIENTIFIC BREAKTHROUGH:
                    </span>
                    <p className="text-xs text-slate-300 font-mono leading-relaxed">
                      {activeTech.breakthrough}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
                  <div>
                    <span className="text-slate-500 text-[10px] block">CRITICAL BENCHMARK</span>
                    <span className="text-cyan-300 font-bold text-sm">{activeTech.metric}</span>
                  </div>

                  <button
                    onClick={onContinue}
                    data-cursor="TIMELINE"
                    className="px-5 py-2.5 border border-cyan-500/40 bg-cyan-950/20 text-cyan-300 hover:bg-cyan-500/10 font-mono text-xs tracking-wider uppercase transition-all flex items-center gap-2"
                  >
                    <span>VIEW MISSION TIMELINE &rarr;</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
