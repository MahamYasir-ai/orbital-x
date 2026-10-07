import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SatelliteInfo } from '../types/orbital';
import { Radio, Zap, Activity, ShieldCheck, Compass, Orbit, AlertTriangle, ArrowRight } from 'lucide-react';

interface MissionControlProps {
  onTriggerEvent: () => void;
}

const SATELLITES: SatelliteInfo[] = [
  {
    id: 'sat-x07',
    name: 'SAT-X07 (FLAGSHIP)',
    orbit: 'LOW EARTH ORBIT (LEO)',
    status: 'ACTIVE',
    mission: 'MULTISPECTRAL EARTH RECONNAISSANCE & LASER RELAY',
    altitude: '408 KM',
    velocity: '7.66 KM/S',
    inclination: '51.6°',
    signalQuality: 98,
  },
  {
    id: 'sat-x12',
    name: 'DEEP-SCAN 12',
    orbit: 'MEDIUM EARTH ORBIT (MEO)',
    status: 'RELAYING',
    mission: 'HIGH-BANDWIDTH DEEP SPACE TELEMETRY CONDUIT',
    altitude: '20,200 KM',
    velocity: '3.87 KM/S',
    inclination: '55.0°',
    signalQuality: 94,
  },
  {
    id: 'relay-04',
    name: 'SYNCHRON-04',
    orbit: 'GEOSTATIONARY ORBIT (GEO)',
    status: 'ACTIVE',
    mission: 'ZERO-LATENCY QUANTUM ENCRYPTION HUB',
    altitude: '35,786 KM',
    velocity: '3.07 KM/S',
    inclination: '0.0°',
    signalQuality: 99,
  },
];

export function MissionControl({ onTriggerEvent }: MissionControlProps) {
  const [selectedSat, setSelectedSat] = useState<SatelliteInfo>(SATELLITES[0]);
  const [altitude, setAltitude] = useState(408.2);
  const [velocity, setVelocity] = useState(7.662);
  const [signal, setSignal] = useState(98.4);
  const orbitCanvasRef = useRef<HTMLCanvasElement>(null);
  const waveformCanvasRef = useRef<HTMLCanvasElement>(null);

  // Live dynamic telemetry drift simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setAltitude((prev) => +(prev + (Math.random() - 0.5) * 0.4).toFixed(1));
      setVelocity((prev) => +(prev + (Math.random() - 0.5) * 0.004).toFixed(3));
      setSignal((prev) => +(98.0 + Math.random() * 0.8).toFixed(1));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // Earth Orbit Visualization Canvas
  useEffect(() => {
    const canvas = orbitCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      t += 0.015;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Radial coordinate grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let r = 40; r <= 150; r += 35) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Central Earth Globe representation
      const earthGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, 26);
      earthGrad.addColorStop(0, '#38bdf8');
      earthGrad.addColorStop(0.6, '#0284c7');
      earthGrad.addColorStop(1, '#082f49');
      ctx.fillStyle = earthGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 24, 0, Math.PI * 2);
      ctx.fill();

      // Atmospheric glowing rim
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Three Orbits with moving satellites
      // Orbit 1: LEO (SAT-X07)
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.35)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.ellipse(cx, cy, 65, 45, Math.PI / 6, 0, Math.PI * 2);
      ctx.stroke();

      const x1 = cx + 65 * Math.cos(t) * Math.cos(Math.PI / 6) - 45 * Math.sin(t) * Math.sin(Math.PI / 6);
      const y1 = cy + 65 * Math.cos(t) * Math.sin(Math.PI / 6) + 45 * Math.sin(t) * Math.cos(Math.PI / 6);

      ctx.setLineDash([]);
      ctx.fillStyle = '#00f0ff';
      ctx.beginPath();
      ctx.arc(x1, y1, 5, 0, Math.PI * 2);
      ctx.fill();

      // Orbit 2: MEO (DEEP-SCAN 12)
      ctx.strokeStyle = 'rgba(121, 40, 202, 0.35)';
      ctx.setLineDash([3, 5]);
      ctx.beginPath();
      ctx.ellipse(cx, cy, 105, 80, -Math.PI / 4, 0, Math.PI * 2);
      ctx.stroke();

      const x2 = cx + 105 * Math.cos(t * 0.6) * Math.cos(-Math.PI / 4) - 80 * Math.sin(t * 0.6) * Math.sin(-Math.PI / 4);
      const y2 = cy + 105 * Math.cos(t * 0.6) * Math.sin(-Math.PI / 4) + 80 * Math.sin(t * 0.6) * Math.cos(-Math.PI / 4);

      ctx.setLineDash([]);
      ctx.fillStyle = '#a855f7';
      ctx.beginPath();
      ctx.arc(x2, y2, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Orbit 3: GEO (SYNCHRON-04)
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.25)';
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      ctx.ellipse(cx, cy, 140, 110, 0, 0, Math.PI * 2);
      ctx.stroke();

      const x3 = cx + 140 * Math.cos(t * 0.35);
      const y3 = cy + 110 * Math.sin(t * 0.35);

      ctx.setLineDash([]);
      ctx.fillStyle = '#34d399';
      ctx.beginPath();
      ctx.arc(x3, y3, 4, 0, Math.PI * 2);
      ctx.fill();
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // Waveform oscilloscope simulator canvas
  useEffect(() => {
    const canvas = waveformCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      phase += 0.05;
      const w = canvas.width;
      const h = canvas.height;

      ctx.fillStyle = 'rgba(2, 4, 8, 0.25)';
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();

      for (let x = 0; x < w; x++) {
        const y = h / 2 + Math.sin(x * 0.05 + phase) * 16 + Math.cos(x * 0.12 - phase * 0.5) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section
      id="mission-control"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-8 py-24 select-none bg-[#020408]"
    >
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl flex flex-col">
        {/* Mission Control Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cyan-500/20 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs text-cyan-400 mb-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span>PRIMARY FLIGHT OPERATIONS // HOUSTON-ORBIT RELAY</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">CONSOLE ID: MOC-07</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight">
              MISSION CONTROL
            </h2>
            <div className="flex items-center gap-4 mt-2 font-mono text-xs">
              <span className="text-slate-400">MISSION: <strong className="text-cyan-300">X-07</strong></span>
              <span className="text-slate-600">·</span>
              <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4" /> STATUS: NOMINAL
              </span>
            </div>
          </div>

          {/* Trigger Dimensional Event button */}
          <button
            onClick={onTriggerEvent}
            data-cursor="WARP"
            className="px-5 py-3 border border-violet-500/60 bg-violet-950/30 hover:bg-violet-900/40 text-violet-300 font-mono text-xs tracking-widest uppercase transition-all flex items-center gap-2.5 shadow-[0_0_20px_rgba(121,40,202,0.3)]"
          >
            <AlertTriangle className="w-4 h-4 text-violet-400 animate-pulse" />
            <span>BREACH REALITY BARRIER</span>
          </button>
        </div>

        {/* Real-time Telemetry Dashboard Stream (Pill-Free) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs mb-8">
          <div className="p-4 bg-slate-950/90 border border-slate-800">
            <span className="text-slate-500 text-[10px] block mb-1">ALTITUDE</span>
            <span className="text-2xl font-bold text-white tabular-nums">{altitude}</span>
            <span className="text-[10px] text-cyan-400 ml-1">KM (LEO)</span>
          </div>
          <div className="p-4 bg-slate-950/90 border border-slate-800">
            <span className="text-slate-500 text-[10px] block mb-1">ORBITAL VELOCITY</span>
            <span className="text-2xl font-bold text-cyan-300 tabular-nums">{velocity}</span>
            <span className="text-[10px] text-cyan-400 ml-1">KM/S</span>
          </div>
          <div className="p-4 bg-slate-950/90 border border-slate-800">
            <span className="text-slate-500 text-[10px] block mb-1">ION FUEL MATRIX</span>
            <span className="text-2xl font-bold text-white tabular-nums">84%</span>
            <span className="text-[10px] text-emerald-400 ml-1">XENON STABLE</span>
          </div>
          <div className="p-4 bg-slate-950/90 border border-slate-800">
            <span className="text-slate-500 text-[10px] block mb-1">SOLAR POWER</span>
            <span className="text-2xl font-bold text-white tabular-nums">94%</span>
            <span className="text-[10px] text-amber-400 ml-1">180 KW GEN</span>
          </div>
          <div className="p-4 bg-slate-950/90 border border-slate-800 col-span-2 sm:col-span-1">
            <span className="text-slate-500 text-[10px] block mb-1">OPTICAL SIGNAL</span>
            <span className="text-2xl font-bold text-emerald-400 tabular-nums">{signal}%</span>
            <span className="text-[10px] text-slate-500 ml-1">BER: 10^-12</span>
          </div>
        </div>

        {/* Orbit Visualization & Interactive Satellite Tracker */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Earth Orbit Radar Canvas (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col bg-slate-950/90 border border-slate-800 p-6">
            <div className="flex items-center justify-between font-mono text-xs text-slate-400 mb-4 pb-3 border-b border-slate-900">
              <span className="flex items-center gap-2 text-cyan-400">
                <Orbit className="w-4 h-4" /> EARTH-ORBIT INTERACTIVE CONDUIT
              </span>
              <span>EPHEMERIS: J2000.0</span>
            </div>

            <div className="relative aspect-square max-h-[380px] flex items-center justify-center">
              <canvas
                ref={orbitCanvasRef}
                width={380}
                height={380}
                data-cursor="INSPECT"
                className="w-full h-full max-h-[380px]"
              />
            </div>

            {/* Satellite Quick Switcher */}
            <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-slate-900 font-mono text-xs">
              {SATELLITES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSat(s)}
                  data-cursor="SELECT"
                  className={`px-3 py-1.5 border transition-all ${
                    selectedSat.id === s.id
                      ? 'border-cyan-400 bg-cyan-950/60 text-cyan-300'
                      : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Selected Satellite Dossier & Oscilloscope (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Live Carrier Waveform Display */}
            <div className="p-5 bg-slate-950/90 border border-slate-800">
              <div className="flex items-center justify-between font-mono text-xs text-slate-400 mb-2">
                <span className="flex items-center gap-2 text-cyan-400">
                  <Activity className="w-4 h-4" /> TELEMETRY CARRIER WAVEFORM
                </span>
                <span className="text-[10px] text-emerald-400">CARRIER LOCK</span>
              </div>
              <canvas
                ref={waveformCanvasRef}
                width={300}
                height={60}
                className="w-full h-16 border border-slate-800/80 bg-slate-950"
              />
            </div>

            {/* Satellite Tracking Dossier */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-6 bg-slate-950/90 border border-cyan-500/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-slate-500 mb-2">
                    <span className="text-cyan-400 font-bold">VESSEL DOSSIER</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {selectedSat.status}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white mb-1">
                    {selectedSat.name}
                  </h3>
                  <p className="font-mono text-xs text-slate-400 mb-4">
                    {selectedSat.orbit}
                  </p>

                  <div className="space-y-2 font-mono text-xs mb-6">
                    <div className="flex justify-between py-1.5 border-b border-slate-900">
                      <span className="text-slate-500">APOGEE / PERIGEE:</span>
                      <span className="text-white font-semibold">{selectedSat.altitude}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-900">
                      <span className="text-slate-500">ORBITAL SPEED:</span>
                      <span className="text-cyan-300 font-semibold">{selectedSat.velocity}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-900">
                      <span className="text-slate-500">INCLINATION:</span>
                      <span className="text-white font-semibold">{selectedSat.inclination}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-900">
                      <span className="text-slate-500">OPTICAL LINK QUALITY:</span>
                      <span className="text-emerald-400 font-semibold">{selectedSat.signalQuality}%</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    {selectedSat.mission}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-900">
                  <button
                    onClick={onTriggerEvent}
                    data-cursor="WARP"
                    className="w-full py-3.5 border border-cyan-500/40 bg-cyan-950/20 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-300 font-mono text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2"
                  >
                    <span>INITIATE DIMENSIONAL EVENT</span>
                    <ArrowRight className="w-4 h-4 text-cyan-400" />
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
