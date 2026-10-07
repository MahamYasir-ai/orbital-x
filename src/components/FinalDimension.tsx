import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowDown } from 'lucide-react';

interface FinalDimensionProps {
  onReachEnd: () => void;
}

const MEMORIES = [
  'EARTH ORBITAL ASCENT',
  'MARS RED DUST WASTES',
  'VESSEL X-01 ION PLUME',
  'ROVER R-07 AUTONOMOUS DRILL',
  'MISSION CONTROL TELEMETRY',
  'ANOMALOUS MEGASTRUCTURE',
];

export function FinalDimension({ onReachEnd }: FinalDimensionProps) {
  const [activeMemoryIdx, setActiveMemoryIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMemoryIdx((prev) => (prev + 1) % MEMORIES.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="final-dimension"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-8 py-32 select-none bg-[#010204]"
    >
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center">
        {/* Memory Flash Subliminal Ticker */}
        <div className="mb-8 font-mono text-xs text-cyan-400 flex items-center gap-3">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
          <span className="tracking-[0.3em] uppercase">
            CHRONO-SPATIAL REPLAY // {MEMORIES[activeMemoryIdx]}
          </span>
        </div>

        {/* The Frontier Quote Typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="max-w-4xl"
        >
          <h2 className="font-display text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white leading-none tracking-tight">
            THE FRONTIER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-violet-400">
              HAS NO END.
            </span>
          </h2>
        </motion.div>

        {/* Brand Signature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-12 flex flex-col items-center"
        >
          <span className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-[0.25em]">
            ORBITAL-X
          </span>
          <span className="font-mono text-xs sm:text-sm tracking-[0.35em] text-cyan-400/90 uppercase mt-2">
            ENGINEERING BEYOND THE KNOWN.
          </span>
        </motion.div>

        {/* Scroll down to contact */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16"
        >
          <button
            onClick={onReachEnd}
            data-cursor="CONTACT"
            className="flex items-center gap-2 font-mono text-xs text-slate-400 hover:text-cyan-300 transition-colors uppercase tracking-widest"
          >
            <span>JOIN THE MISSION</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-cyan-400" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
