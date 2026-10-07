import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Radar, Compass, Wrench, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

interface RoboticsSectionProps {
  onNext: () => void;
}

type RoverComponent = 'ARM' | 'CAMERA' | 'WHEELS' | 'LIDAR';

export function RoboticsSection({ onNext }: RoboticsSectionProps) {
  const [activeComponent, setActiveComponent] = useState<RoverComponent>('ARM');
  const [armAngle, setArmAngle] = useState(45);
  const [cameraPan, setCameraPan] = useState(0);
  const lidarCanvasRef = useRef<HTMLCanvasElement>(null);

  // Simulated LIDAR sweep radar point cloud animation
  useEffect(() => {
    const canvas = lidarCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let angle = 0;
    let animId: number;

    const points: { x: number; y: number; r: number; alpha: number }[] = [];
    for (let i = 0; i < 60; i++) {
      const dist = 30 + Math.random() * 80;
      const ptAngle = Math.random() * Math.PI * 2;
      points.push({
        x: 100 + Math.cos(ptAngle) * dist,
        y: 100 + Math.sin(ptAngle) * dist,
        r: 1.5 + Math.random() * 2,
        alpha: 0.2 + Math.random() * 0.8,
      });
    }

    const render = () => {
      animId = requestAnimationFrame(render);
      ctx.fillStyle = 'rgba(2, 4, 8, 0.2)';
      ctx.fillRect(0, 0, 200, 200);

      // Radar rings
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(100, 100, 40, 0, Math.PI * 2);
      ctx.arc(100, 100, 75, 0, Math.PI * 2);
      ctx.stroke();

      // Radar sweep line
      angle += 0.04;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.7)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(100, 100);
      ctx.lineTo(100 + Math.cos(angle) * 85, 100 + Math.sin(angle) * 85);
      ctx.stroke();

      // Terrain obstacle point cloud
      points.forEach((p) => {
        ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section
      id="robotics"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-8 py-24 select-none bg-gradient-to-b from-[#020408] via-[#0d0909] to-[#020408]"
    >
      {/* Planetary Martian dust atmospheric glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(180,60,30,0.12),_transparent_70%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl flex flex-col">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-red-950/40 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs text-rose-400 mb-2">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
              <span>SURFACE EXPEDITION UNIT // MARS EQUIVALENT</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">ZONE: VALLES PROMETHEUS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight">
              ROBOTICS / R-07
            </h2>
            <p className="font-display text-xl sm:text-2xl font-light text-slate-300 mt-2 max-w-xl">
              &ldquo;WHEN HUMANS CANNOT GO, OUR MACHINES DO.&rdquo;
            </p>
          </div>

          {/* Autonomy Telemetry Card */}
          <div className="flex items-center gap-4 p-3 bg-slate-950/90 border border-slate-800 rounded font-mono text-xs">
            <div>
              <span className="text-[10px] text-slate-500 block">AI AUTONOMY RATING</span>
              <span className="text-2xl font-bold text-cyan-400 tabular-nums">98.2%</span>
            </div>
            <div className="h-8 w-[1px] bg-slate-800" />
            <div>
              <span className="text-[10px] text-slate-500 block">HAZARD AVOIDANCE</span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> ONLINE
              </span>
            </div>
          </div>
        </div>

        {/* Live System Status Indicators (Pill-free) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs mb-8">
          <div className="p-3 bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-2">
              <Eye className="w-4 h-4 text-cyan-400" /> VISION
            </span>
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ACTIVE
            </span>
          </div>
          <div className="p-3 bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-2">
              <Radar className="w-4 h-4 text-cyan-400" /> LIDAR
            </span>
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ACTIVE
            </span>
          </div>
          <div className="p-3 bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" /> NAVIGATION
            </span>
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ACTIVE
            </span>
          </div>
          <div className="p-3 bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-cyan-400" /> ROBOTIC ARM
            </span>
            <span className="text-cyan-300 font-bold flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              READY
            </span>
          </div>
        </div>

        {/* Interactive Rover Sandbox Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visualizer Stage (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="relative aspect-[16/10] bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between p-6">
              {/* Mars Surface Silhouette Backdrop */}
              <div className="absolute inset-0 bg-gradient-to-t from-red-950/30 via-slate-950/60 to-transparent pointer-events-none" />

              {/* Surface Terrain Ground Line */}
              <div className="absolute bottom-12 left-0 right-0 h-1 bg-red-900/40" />
              <div className="absolute bottom-10 left-0 right-0 h-16 bg-gradient-to-t from-red-950/40 to-transparent pointer-events-none" />

              {/* Top status bar inside panel */}
              <div className="relative z-10 flex items-center justify-between font-mono text-[11px] text-slate-400">
                <span className="text-rose-300">ROVER CHASSIS: TITANIUM-GRAPHENE</span>
                <span>GROUND CLEARANCE: 58 CM</span>
                <span className="text-cyan-400">SPEED: 0.14 M/S</span>
              </div>

              {/* Rover Schematic SVG with Animated Arm & Mast */}
              <div className="relative z-10 my-auto flex items-center justify-center">
                <svg viewBox="0 0 500 280" className="w-full max-w-md h-auto">
                  {/* Rocker-Bogie Suspension bars */}
                  <line x1="170" y1="180" x2="250" y2="150" stroke="#64748b" strokeWidth="4" />
                  <line x1="250" y1="150" x2="330" y2="180" stroke="#64748b" strokeWidth="4" />
                  <line x1="210" y1="165" x2="190" y2="210" stroke="#64748b" strokeWidth="4" />
                  <line x1="310" y1="170" x2="320" y2="210" stroke="#64748b" strokeWidth="4" />

                  {/* 6 Wheels with Tread Grips */}
                  {[120, 190, 260, 330, 390].map((wx, i) => (
                    <g key={i}>
                      <circle
                        cx={wx}
                        cy="225"
                        r="18"
                        fill="#0f172a"
                        stroke={activeComponent === 'WHEELS' ? '#00f0ff' : '#94a3b8'}
                        strokeWidth="2.5"
                      />
                      <circle cx={wx} cy="225" r="7" fill="#334155" />
                    </g>
                  ))}

                  {/* Main Chassis Body Box */}
                  <rect
                    x="180"
                    y="110"
                    width="180"
                    height="65"
                    rx="4"
                    fill="#1e293b"
                    stroke="#475569"
                    strokeWidth="2"
                  />
                  {/* Equipment deck vents & solar panel */}
                  <rect x="200" y="100" width="140" height="10" fill="#0284c7" />

                  {/* Remote Sensing Mast (Camera) with Dynamic Rotation */}
                  <g
                    transform={`translate(310, 100) rotate(${cameraPan})`}
                    className="transition-transform duration-300"
                  >
                    <line x1="0" y1="0" x2="0" y2="-60" stroke="#cbd5e1" strokeWidth="4" />
                    {/* Mast head sensor cluster */}
                    <rect
                      x="-14"
                      y="-72"
                      width="28"
                      height="16"
                      rx="2"
                      fill={activeComponent === 'CAMERA' ? '#00f0ff' : '#0f172a'}
                      stroke="#38bdf8"
                      strokeWidth="2"
                    />
                    {/* Stereo lenses */}
                    <circle cx="-6" cy="-64" r="3" fill="#f87171" />
                    <circle cx="6" cy="-64" r="3" fill="#00f0ff" />
                  </g>

                  {/* Robotic Arm with Animated Joint Articulation */}
                  <g transform="translate(190, 140)">
                    {/* Shoulder base */}
                    <circle cx="0" cy="0" r="8" fill="#e2e8f0" />
                    {/* Upper Arm segment */}
                    <line
                      x1="0"
                      y1="0"
                      x2={-40 * Math.cos((armAngle * Math.PI) / 180)}
                      y2={-40 * Math.sin((armAngle * Math.PI) / 180)}
                      stroke={activeComponent === 'ARM' ? '#00f0ff' : '#cbd5e1'}
                      strokeWidth="5"
                    />
                    {/* Elbow Joint & Forearm */}
                    <circle
                      cx={-40 * Math.cos((armAngle * Math.PI) / 180)}
                      cy={-40 * Math.sin((armAngle * Math.PI) / 180)}
                      r="6"
                      fill="#38bdf8"
                    />
                    {/* Forearm & Drill Tool */}
                    <line
                      x1={-40 * Math.cos((armAngle * Math.PI) / 180)}
                      y1={-40 * Math.sin((armAngle * Math.PI) / 180)}
                      x2={-75 * Math.cos((armAngle * Math.PI) / 180)}
                      y2={-20}
                      stroke={activeComponent === 'ARM' ? '#00f0ff' : '#94a3b8'}
                      strokeWidth="4"
                    />
                    {/* Core Sample Drill End-Effector */}
                    <rect
                      x={-85 * Math.cos((armAngle * Math.PI) / 180)}
                      y="-25"
                      width="16"
                      height="12"
                      fill="#f59e0b"
                    />
                  </g>
                </svg>
              </div>

              {/* Bottom Interactive Component Tabs */}
              <div className="relative z-10 flex flex-wrap gap-2 pt-4 border-t border-slate-800">
                {(['ARM', 'CAMERA', 'WHEELS', 'LIDAR'] as const).map((comp) => (
                  <button
                    key={comp}
                    onClick={() => setActiveComponent(comp)}
                    data-cursor="TEST"
                    className={`px-4 py-2 font-mono text-xs border transition-all ${
                      activeComponent === comp
                        ? 'border-cyan-400 bg-cyan-950/60 text-cyan-200'
                        : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white'
                    }`}
                  >
                    TEST {comp}
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-component interaction toolbars */}
            {activeComponent === 'ARM' && (
              <div className="p-4 bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-4 font-mono text-xs">
                <span className="text-slate-400">ARTICULATE 6-AXIS ARM:</span>
                <input
                  type="range"
                  min="15"
                  max="85"
                  value={armAngle}
                  onChange={(e) => setArmAngle(Number(e.target.value))}
                  className="flex-1 accent-cyan-400 cursor-pointer"
                />
                <span className="text-cyan-400 font-bold">{armAngle}&deg; EXTENSION</span>
              </div>
            )}

            {activeComponent === 'CAMERA' && (
              <div className="p-4 bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-4 font-mono text-xs">
                <span className="text-slate-400">ROTATE STEREOSCOPIC MAST:</span>
                <input
                  type="range"
                  min="-30"
                  max="30"
                  value={cameraPan}
                  onChange={(e) => setCameraPan(Number(e.target.value))}
                  className="flex-1 accent-cyan-400 cursor-pointer"
                />
                <span className="text-cyan-400 font-bold">{cameraPan}&deg; AZIMUTH</span>
              </div>
            )}
          </div>

          {/* Right Dossier & LIDAR radar panel (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* LIDAR Point Cloud Radar Feed */}
            <div className="p-5 bg-slate-950/80 border border-cyan-500/30 flex flex-col items-center">
              <div className="w-full flex items-center justify-between font-mono text-[11px] text-slate-400 mb-3">
                <span className="text-cyan-400 font-semibold flex items-center gap-1.5">
                  <Radar className="w-3.5 h-3.5" /> LIVE LIDAR SCAN
                </span>
                <span>RANGE: 120M</span>
              </div>
              <canvas
                ref={lidarCanvasRef}
                width={200}
                height={200}
                className="w-48 h-48 border border-slate-800 rounded-full bg-slate-950"
              />
              <span className="font-mono text-[10px] text-slate-500 mt-3 text-center">
                TERRAIN ELEVATION MAPPED IN REAL TIME
              </span>
            </div>

            {/* Selected Subsystem Narrative */}
            <div className="p-5 bg-slate-950/80 border border-slate-800">
              <div className="font-mono text-xs text-rose-400 mb-1">
                SUBSYSTEM: {activeComponent}
              </div>
              <h4 className="font-display text-lg font-bold text-white mb-2">
                {activeComponent === 'ARM' && '6-Degree-of-Freedom Sampling Arm'}
                {activeComponent === 'CAMERA' && 'SuperCam Stereoscopic Multispectral Array'}
                {activeComponent === 'WHEELS' && 'Titanium Rocker-Bogie Mobility System'}
                {activeComponent === 'LIDAR' && 'Solid-State Relativistic Flash LIDAR'}
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed font-light mb-4">
                {activeComponent === 'ARM' &&
                  'Equipped with diamond-tipped core drill, ultraviolet luminescence spectrometer, and hermetic sample tube cache for deep stratigraphic analysis.'}
                {activeComponent === 'CAMERA' &&
                  'Capable of resolving 1mm geological grain structures at 10 meters distance, utilizing pulsed laser ablation to vaporize surface dust.'}
                {activeComponent === 'WHEELS' &&
                  'Machined from single billet aircraft-grade titanium with curved chevron cleats, conquering 45-degree talus slopes without slippage.'}
                {activeComponent === 'LIDAR' &&
                  'Emits 400,000 laser pulses per second, computing instant 3D voxel hazard grids for fully autonomous rover driving at top velocity.'}
              </p>

              <button
                onClick={onNext}
                data-cursor="WORLD"
                className="w-full py-3 border border-rose-500/40 bg-rose-950/20 text-rose-300 hover:bg-rose-500/10 hover:border-rose-300 font-mono text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2"
              >
                <span>ASCEND TO PLANET // WORLD 04</span>
                <ArrowRight className="w-4 h-4 text-rose-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
