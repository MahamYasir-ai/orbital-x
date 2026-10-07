import { motion } from 'motion/react';
import { EyeOff, Compass, ArrowRight } from 'lucide-react';

interface TheUnknownProps {
  onContinue: () => void;
}

export function TheUnknown({ onContinue }: TheUnknownProps) {
  return (
    <section
      id="unknown"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-8 py-32 select-none bg-[#010204]"
    >
      {/* Deepest pitch-black vignette with faintest violet haze */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(76,29,149,0.15),_transparent_60%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center">
        {/* Subtle breathing room metadata */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="mb-8 flex items-center gap-3 font-mono text-[11px] text-violet-400/80"
        >
          <EyeOff className="w-3.5 h-3.5" />
          <span className="tracking-[0.4em] uppercase">COORDINATE ZERO // UNMAPPED VOID</span>
          <span className="text-slate-700">·</span>
          <span className="text-slate-500">SIGNALS: ZERO ECHO</span>
        </motion.div>

        {/* Monolithic Slow Emergence Typography */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <h2 className="font-display text-4xl sm:text-7xl md:text-8xl font-black text-white leading-tight tracking-tight">
            WHAT EXISTS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-slate-400">
              BEYOND
            </span> <br />
            THE MAP?
          </h2>
        </motion.div>

        {/* Minimal mysterious annotation */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1.6 }}
          className="mt-8 max-w-lg text-slate-400 text-sm sm:text-base font-light leading-relaxed tracking-wider"
        >
          Beyond the orbit of Pluto, where standard physical telemetry falls silent, sensor arrays detected a megastructure older than the solar system itself.
        </motion.p>

        {/* Geometric Megastructure Schematic Silhouette */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 2 }}
          className="my-12 relative w-64 h-64 flex items-center justify-center pointer-events-none"
        >
          <div className="absolute inset-0 rounded-full border border-violet-500/20 animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="w-48 h-48 border border-dashed border-violet-400/30 rotate-45 animate-spin" style={{ animationDuration: '60s' }} />
          <div className="absolute w-24 h-24 border border-cyan-400/20 rotate-12" />
          <div className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_20px_#a855f7]" />
        </motion.div>

        {/* Quiet Continue Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.6, duration: 1 }}
        >
          <button
            onClick={onContinue}
            data-cursor="TRAVERSE"
            className="flex items-center gap-3 px-6 py-3 border border-violet-500/30 bg-violet-950/20 text-violet-300 font-mono text-xs tracking-widest uppercase hover:border-violet-400 hover:text-white transition-colors"
          >
            <span>TRAVEL ACROSS MULTIVERSE PASSAGE</span>
            <ArrowRight className="w-4 h-4 text-violet-400" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
