import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Compass, Zap, MoveRight, Layers } from 'lucide-react';

interface DimensionalTunnelProps {
  onContinue: () => void;
}

export function DimensionalTunnel({ onContinue }: DimensionalTunnelProps) {
  const [velocityLevel, setVelocityLevel] = useState<'WARP-1' | 'WARP-2' | 'WARP-MAX'>('WARP-2');
  const [activeLayer, setActiveLayer] = useState<'GEOMETRY' | 'PARTICLES' | 'RINGS'>('GEOMETRY');

  return (
    <section
      id="tunnel"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-8 py-24 overflow-hidden select-none"
    >
      {/* Background ambient lighting vignette */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

      {/* Dimensional Tunnel HUD frame */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">
        {/* Dimension indicator badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 flex items-center gap-3 font-mono text-xs text-cyan-400"
        >
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="tracking-[0.3em] uppercase">SPATIAL CONDUIT // ENTRY VECTOR</span>
          <span className="text-slate-600">·</span>
          <span className="text-violet-400">WARP COEFFICIENT: 0.94c</span>
        </motion.div>

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight">
            DIMENSIONAL TUNNEL
          </h2>
          <p className="mt-3 text-slate-400 font-mono text-xs sm:text-sm tracking-widest uppercase">
            TRANSIT PATH: DIMENSION 01 &rarr; DIMENSION 02
          </p>
        </motion.div>

        {/* Interactive Holographic Tunnel Portal Frame */}
        <div className="relative w-full max-w-4xl aspect-[16/9] sm:aspect-[21/9] border border-cyan-500/30 bg-slate-950/60 backdrop-blur-md overflow-hidden flex flex-col justify-between p-6 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.08)]">
          {/* Subtle grid and crosshair overlay */}
          <div className="absolute inset-0 bg-tech-grid opacity-25 pointer-events-none" />
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-cyan-500/15 pointer-events-none" />
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-cyan-500/15 pointer-events-none" />

          {/* Concentric rings visualizer inside panel */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
            <div className="w-48 h-48 rounded-full border border-cyan-400/50 animate-ping" style={{ animationDuration: '4s' }} />
            <div className="absolute w-80 h-80 rounded-full border border-dashed border-violet-500/40 animate-spin" style={{ animationDuration: '25s' }} />
            <div className="absolute w-[440px] h-[440px] rounded-full border border-cyan-500/20" />
          </div>

          {/* Top Panel Telemetry */}
          <div className="relative z-10 flex items-center justify-between font-mono text-[11px] text-slate-400">
            <div className="flex items-center gap-3">
              <span className="text-cyan-300 font-semibold">HYPER-TORUS #04</span>
              <span>·</span>
              <span className="text-slate-500">APERTURE: 14.8 KM</span>
            </div>
            <div className="flex items-center gap-2 text-violet-300">
              <Zap className="w-3.5 h-3.5" />
              <span>SPATIAL CURVATURE: &kappa; = 0.812</span>
            </div>
          </div>

          {/* Center Callout: Dimensional Fracture */}
          <div className="relative z-10 my-auto text-center py-4">
            <div className="inline-block px-4 py-1.5 border border-cyan-500/40 bg-cyan-950/40 font-mono text-xs text-cyan-200 mb-3">
              [ RELATIVISTIC COMPRESSION ACTIVE ]
            </div>
            <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-200 font-light leading-relaxed">
              Particles and light trails fold along gravitational geodesics. As velocity escalates, the fabric of spacetime breaks into crystalline geometry.
            </p>
          </div>

          {/* Bottom Interactive Controls */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs pt-4 border-t border-slate-800/80">
            {/* Warp Velocity Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-[10px]">WARP TIER:</span>
              {(['WARP-1', 'WARP-2', 'WARP-MAX'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setVelocityLevel(lvl)}
                  data-cursor="SPEED"
                  className={`px-2.5 py-1 text-[10px] tracking-wider border transition-all ${
                    velocityLevel === lvl
                      ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                      : 'border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            {/* Dimensional layer filter */}
            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-[10px]">VECTOR FILTER:</span>
              {(['GEOMETRY', 'PARTICLES', 'RINGS'] as const).map((layer) => (
                <button
                  key={layer}
                  onClick={() => setActiveLayer(layer)}
                  data-cursor="LAYER"
                  className={`px-2.5 py-1 text-[10px] tracking-wider border transition-all ${
                    activeLayer === layer
                      ? 'border-violet-400 bg-violet-500/20 text-violet-300'
                      : 'border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {layer}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Narrative footer & navigation trigger */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between w-full max-w-4xl gap-4 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>ORIGIN REALITY: DEPARTED</span>
            <span>&rarr;</span>
            <span className="text-white">DESTINATION: EARTH RECONNAISSANCE</span>
          </div>

          <button
            onClick={onContinue}
            data-cursor="BREACH"
            className="flex items-center gap-2 text-cyan-400 hover:text-white transition-colors group"
          >
            <span>EMERGE FROM SINGULARITY</span>
            <MoveRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
