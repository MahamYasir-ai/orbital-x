import { motion } from 'motion/react';
import { Globe, Compass, Shield, Cpu, ChevronRight } from 'lucide-react';

interface MissionIntroProps {
  onNext: () => void;
}

export function MissionIntro({ onNext }: MissionIntroProps) {
  return (
    <section
      id="intro"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-8 py-24 select-none"
    >
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">
        {/* Top coordinate tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 flex items-center gap-3 font-mono text-xs text-cyan-400"
        >
          <Globe className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="tracking-[0.25em] uppercase">ORBITAL VIEW // SOL-3</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400">ALTITUDE: 35,786 KM (GEO)</span>
        </motion.div>

        {/* Powerful Staggered Manifesto */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center max-w-4xl"
        >
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight">
            WE DON&apos;T EXPLORE <br />
            <span className="text-slate-500">SPACE.</span>
          </h2>
          <h2 className="mt-4 font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-white leading-[1.05] tracking-tight">
            WE EXPLORE <br />
            WHAT COMES NEXT.
          </h2>
        </motion.div>

        {/* Sub-label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-6 flex items-center gap-4 text-center"
        >
          <span className="h-[1px] w-12 bg-cyan-500/50" />
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-cyan-400 uppercase font-bold">
            ORBITAL-X ADVANCED EXPLORATION SYSTEMS
          </span>
          <span className="h-[1px] w-12 bg-cyan-500/50" />
        </motion.div>

        {/* Narrative columns: Concise, cinematic aerospace mission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl"
        >
          <div className="border border-slate-800 bg-slate-950/60 p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-colors">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-4">
                <span>PILLAR 01</span>
                <Compass className="w-4 h-4 text-cyan-400" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">
                Relativistic Trajectories
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                Engineering propulsion geometries that harness magnetohydrodynamic containment, reducing transit times to deep outer worlds by orders of magnitude.
              </p>
            </div>
            <div className="mt-6 font-mono text-[10px] text-cyan-400 tracking-wider">
              EFFICIENCY &Delta;V: +410%
            </div>
          </div>

          <div className="border border-slate-800 bg-slate-950/60 p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-colors">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-4">
                <span>PILLAR 02</span>
                <Cpu className="w-4 h-4 text-cyan-400" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">
                Autonomous Kinetic AI
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                Decentralized on-board neural navigation nodes operating independently of Earth telemetry during light-delay blackouts and hostile orbital insertions.
              </p>
            </div>
            <div className="mt-6 font-mono text-[10px] text-cyan-400 tracking-wider">
              LATENCY TOLERANCE: ZERO
            </div>
          </div>

          <div className="border border-slate-800 bg-slate-950/60 p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-colors">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-4">
                <span>PILLAR 03</span>
                <Shield className="w-4 h-4 text-cyan-400" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">
                Multi-Planetary Robotics
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                Extreme-environment rovers engineered with synthetic diamond gear trains and cryogenic lubricants capable of surviving the cryogenic crusts of Europa and Titan.
              </p>
            </div>
            <div className="mt-6 font-mono text-[10px] text-cyan-400 tracking-wider">
              SURVIVAL RATING: 20,000 HRS
            </div>
          </div>
        </motion.div>

        {/* Forward transition button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <button
            onClick={onNext}
            data-cursor="VESSEL"
            className="flex items-center gap-3 px-6 py-3 border border-cyan-500/40 bg-cyan-950/20 text-cyan-300 font-mono text-xs tracking-widest uppercase hover:bg-cyan-500/10 hover:border-cyan-300 transition-all"
          >
            <span>INSPECT VESSEL X-01 FLAGSHIP</span>
            <ChevronRight className="w-4 h-4 text-cyan-400" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
