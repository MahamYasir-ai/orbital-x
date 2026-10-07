import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const STEPS = [
  'INITIALIZING EXPLORATION SYSTEM',
  'CALIBRATING NAVIGATION',
  'CALIBRATING TELEMETRY',
  'CALIBRATING DIMENSIONAL CORE',
  'SYSTEM READY',
];

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setExiting(true);
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        const next = prev + 3;
        const newStep = Math.min(
          STEPS.length - 1,
          Math.floor((next / 100) * STEPS.length)
        );
        setStepIndex(newStep);
        return next;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    setExiting(true);
    setTimeout(onComplete, 400);
  };

  // Convert progress into 20 blocks
  const filledBlocks = Math.round((progress / 100) * 20);
  const barString = '█'.repeat(filledBlocks) + '░'.repeat(20 - filledBlocks);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#020408] text-slate-100 select-none overflow-hidden"
        >
          {/* Subtle background coordinate grid */}
          <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />

          {/* Radial cosmic vignette */}
          <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

          {/* Center telemetry module */}
          <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center text-center">
            {/* Minimalist aerospace emblem */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative mb-6 flex items-center justify-center"
            >
              <div className="h-16 w-16 rounded-full border border-cyan-500/30 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full border-t border-cyan-400 animate-spin" style={{ animationDuration: '3s' }} />
                <div className="h-7 w-7 rounded-full border border-slate-700 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#00f0ff]" />
                </div>
              </div>
            </motion.div>

            {/* Brand Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-2xl tracking-[0.35em] text-white font-bold mb-1"
            >
              ORBITAL-X
            </motion.h1>
            <p className="font-mono text-[10px] tracking-[0.25em] text-cyan-400/80 uppercase mb-8">
              DIMENSIONAL EXPLORATION DIVISION
            </p>

            {/* Terminal Block Progress Bar */}
            <div className="w-full bg-slate-950/80 border border-slate-800/80 p-4 font-mono text-xs">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                <span className="text-cyan-400">STATUS: BOOTSTRAP</span>
                <span className="tabular-nums font-bold text-white">{progress}%</span>
              </div>

              {/* Character-based progress bar */}
              <div className="font-mono text-cyan-400 text-xs sm:text-sm tracking-wider overflow-hidden whitespace-nowrap mb-3 select-none">
                [{barString}]
              </div>

              {/* Dynamic status line */}
              <div className="flex items-center gap-2 text-[11px] text-slate-300 h-5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="tracking-wider">{STEPS[stepIndex]}</span>
              </div>
            </div>

            {/* Skip button for fast accessibility */}
            <button
              onClick={handleSkip}
              className="mt-6 font-mono text-[11px] text-slate-500 hover:text-cyan-400 transition-colors uppercase tracking-widest focus:outline-none focus:text-cyan-400"
            >
              [ ENTER LAB DIRECTLY &rarr; ]
            </button>
          </div>

          {/* Bottom telemetry footer */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between font-mono text-[10px] text-slate-600">
            <span>CORE: QUANTUM-07</span>
            <span>SECURE LINK: ESTABLISHED</span>
            <span>VER: 2026.10</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
