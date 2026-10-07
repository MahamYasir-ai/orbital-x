import { motion, type Variants } from 'motion/react';
import { ChevronDown, Compass, Activity, ShieldCheck, Zap } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

export function Hero({ onExplore }: HeroProps) {
  const headlineWords = ['ENGINEERING', 'BEYOND', 'THE', 'KNOWN.'];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: 'blur(12px)',
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 1.1,
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 sm:px-8 pt-28 pb-12 overflow-hidden select-none"
    >
      {/* Subtle overlay gradients for depth */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
      <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none" />

      {/* Top telemetry HUD bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="w-full max-w-7xl flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] sm:text-xs text-slate-400 border-b border-slate-800/80 pb-3"
      >
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-cyan-400">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff] animate-ping" />
            DIMENSION: <strong className="text-white">X-07</strong>
          </span>
          <span className="hidden sm:inline-block text-slate-600">|</span>
          <span className="flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-slate-500" />
            VECTOR: <strong className="text-slate-300">084.21°</strong>
          </span>
          <span className="hidden sm:inline-block text-slate-600">|</span>
          <span className="flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            VELOCITY: <strong className="text-slate-300 tabular-nums">7.82 KM/S</strong>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            SIGNAL: <strong className="text-emerald-400 tabular-nums">98.4%</strong>
          </span>
          <span className="text-slate-600 hidden md:inline">|</span>
          <span className="text-[9px] text-slate-500 uppercase tracking-wider hidden md:inline">
            AEROSPACE INTERFACE CONSOLE
          </span>
        </div>
      </motion.div>

      {/* Center Cinematic Title & Monolithic Typography */}
      <div className="relative z-10 w-full max-w-6xl my-auto py-12 flex flex-col items-center text-center">
        {/* Division kicker */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-4 flex items-center gap-3"
        >
          <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-cyan-500" />
          <span className="font-mono text-xs sm:text-sm tracking-[0.35em] text-cyan-300 uppercase font-semibold">
            DIMENSIONAL EXPLORATION DIVISION
          </span>
          <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-cyan-500" />
        </motion.div>

        {/* Brand Name */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: '0.4em' }}
          animate={{ opacity: 1, letterSpacing: '0.2em' }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mb-3"
        >
          <span className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-400 tracking-wider">
            ORBITAL-X
          </span>
        </motion.div>

        {/* Enormous Staggered Tagline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center items-center gap-x-3 sm:gap-x-6 gap-y-1 sm:gap-y-2 max-w-4xl"
        >
          {headlineWords.map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              className={`font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight ${
                word === 'BEYOND'
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-blue-400 drop-shadow-[0_0_35px_rgba(0,240,255,0.3)]'
                  : 'text-white'
              }`}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* Narrative subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-8 max-w-2xl text-slate-400 text-sm sm:text-base md:text-lg font-light leading-relaxed tracking-wide"
        >
          Pioneering autonomous spacecraft, quantum-linked rovers, and relativistic navigation systems engineered to breach known boundaries.
        </motion.p>

        {/* Status indicator module & action button */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-5"
        >
          <button
            onClick={onExplore}
            data-cursor="TRAVERSE"
            className="group relative px-8 py-3.5 bg-cyan-500/10 border border-cyan-400/60 hover:border-cyan-300 text-cyan-200 font-mono text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 hover:bg-cyan-500/20 hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] flex items-center gap-3"
          >
            <span className="h-2 w-2 rounded-full bg-cyan-400 group-hover:animate-ping" />
            ENTER EXPEDITION
            <span className="text-cyan-400 group-hover:translate-x-1 transition-transform">&rarr;</span>
          </button>

          {/* System status pill-free text indicator */}
          <div className="flex items-center gap-3 px-4 py-3 border border-slate-800 bg-slate-950/60 font-mono text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>SYSTEM STATUS:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ONLINE
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom coordinate indicators & scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="w-full max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-slate-500 border-t border-slate-900 pt-3"
      >
        <div className="flex items-center gap-4">
          <span>PORTAL APERTURE: STABLE</span>
          <span>·</span>
          <span>FRAME: CARTESIAN-XZ</span>
        </div>

        <button
          onClick={onExplore}
          data-cursor="SCROLL"
          className="flex flex-col items-center text-cyan-400 hover:text-white transition-colors group"
        >
          <span className="text-[9px] tracking-[0.25em] uppercase mb-1">FALL FORWARD</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>

        <div className="flex items-center gap-4">
          <span>RELATIVISTIC FACTOR: &gamma; = 1.002</span>
          <span>·</span>
          <span>TRANSMISSION: ENCRYPTED</span>
        </div>
      </motion.div>
    </section>
  );
}
