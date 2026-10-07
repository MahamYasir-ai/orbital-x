import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { AlertOctagon, Sparkles, Orbit, Radio } from 'lucide-react';

interface DimensionalEventProps {
  onTransitionComplete: () => void;
}

export function DimensionalEvent({ onTransitionComplete }: DimensionalEventProps) {
  const [phase, setPhase] = useState<'WARNING' | 'COLLAPSE' | 'WARP'>('WARNING');
  const [glitchNumbers, setGlitchNumbers] = useState('894.21884');

  useEffect(() => {
    // Phase 1: Warning & Telemetry distortion
    const numInterval = setInterval(() => {
      setGlitchNumbers(
        `${(Math.random() * 999).toFixed(2)}.${(Math.random() * 9999).toFixed(0)}`
      );
    }, 80);

    const timer1 = setTimeout(() => {
      setPhase('COLLAPSE');
    }, 1800);

    const timer2 = setTimeout(() => {
      setPhase('WARP');
    }, 3600);

    const timer3 = setTimeout(() => {
      onTransitionComplete();
    }, 5200);

    return () => {
      clearInterval(numInterval);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onTransitionComplete]);

  return (
    <div className="fixed inset-0 z-[9000] flex flex-col items-center justify-center bg-[#020408] text-white overflow-hidden select-none">
      {/* Background radial flash */}
      <motion.div
        animate={{
          scale: phase === 'WARP' ? [1, 2.5, 4] : [1, 1.2, 1],
          opacity: phase === 'WARP' ? [0.6, 1, 0.2] : 0.4,
        }}
        transition={{ duration: 1.5, repeat: phase === 'WARP' ? 0 : Infinity }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(121,40,202,0.4),_transparent_70%)] pointer-events-none"
      />

      {/* Spacetime grid distortion lines */}
      <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none scale-150 rotate-12 transition-transform duration-1000" />

      {/* Central dimensional rupture */}
      <div className="relative z-10 max-w-xl px-6 flex flex-col items-center text-center">
        {phase === 'WARNING' && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center"
          >
            <div className="h-16 w-16 rounded-full border border-violet-500 bg-violet-950/40 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(121,40,202,0.8)]">
              <AlertOctagon className="w-8 h-8 text-violet-300 animate-spin" style={{ animationDuration: '8s' }} />
            </div>

            <span className="font-mono text-xs tracking-[0.3em] text-violet-400 uppercase mb-2">
              GRAVITATIONAL ANOMALY DETECTED
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              SPACETIME COLLAPSE
            </h2>
            <div className="p-3 bg-slate-950 border border-violet-500/50 font-mono text-xs text-violet-300 space-y-1">
              <div>METRIC TENSOR DIVERGENCE: <strong className="text-white">{glitchNumbers}</strong></div>
              <div>GEODESIC DEVIATION: <strong className="text-white">CRITICAL &infin;</strong></div>
            </div>
          </motion.div>
        )}

        {phase === 'COLLAPSE' && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            className="flex flex-col items-center"
          >
            <div className="relative w-44 h-44 mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400 animate-spin" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-3 rounded-full border-2 border-violet-500 animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
              <div className="h-10 w-10 rounded-full bg-white shadow-[0_0_50px_#ffffff] animate-ping" />
            </div>

            <span className="font-mono text-xs tracking-[0.3em] text-cyan-300 uppercase mb-2">
              SINGULARITY CORE FORMED
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-violet-400">
              FRACTURING REALITY
            </h2>
          </motion.div>
        )}

        {phase === 'WARP' && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.8, opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="flex flex-col items-center"
          >
            <Sparkles className="w-16 h-16 text-cyan-200 animate-spin mb-4" />
            <h2 className="font-display text-5xl sm:text-7xl font-black text-white tracking-tighter">
              TRANSIT TO UNKNOWN
            </h2>
          </motion.div>
        )}

        {/* Skip button if user wants immediate transition */}
        <button
          onClick={onTransitionComplete}
          className="mt-8 font-mono text-[11px] text-slate-500 hover:text-cyan-400 tracking-widest uppercase transition-colors"
        >
          [ SKIP DIMENSIONAL WARP &rarr; ]
        </button>
      </div>
    </div>
  );
}
