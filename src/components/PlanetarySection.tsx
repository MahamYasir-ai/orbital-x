import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Globe, Thermometer, Wind, Compass, MapPin, ArrowRight } from 'lucide-react';

interface PlanetarySectionProps {
  onNext: () => void;
}

interface LandingSite {
  id: string;
  name: string;
  coords: string;
  elevation: string;
  target: string;
  hazardRisk: string;
}

const SITES: LandingSite[] = [
  {
    id: 'site-alpha',
    name: 'MERIDIANI CHASM',
    coords: '14.2°S, 175.4°E',
    elevation: '-3,420 M',
    target: 'Sedimentary iron silicate deposits & fossil microbial strata.',
    hazardRisk: 'LOW',
  },
  {
    id: 'site-beta',
    name: 'VALLES OLYMPUS',
    coords: '08.6°N, 042.1°W',
    elevation: '+1,850 M',
    target: 'Subsurface permafrost ice extraction and geothermal vents.',
    hazardRisk: 'MODERATE',
  },
  {
    id: 'site-gamma',
    name: 'PROMETHEUS CRATER',
    coords: '42.9°S, 210.8°E',
    elevation: '-1,100 M',
    target: 'Impact melt sheet minerals & pristine solar wind mantle samples.',
    hazardRisk: 'LOW',
  },
];

export function PlanetarySection({ onNext }: PlanetarySectionProps) {
  const [selectedSite, setSelectedSite] = useState<LandingSite>(SITES[0]);
  const [rotationAngle, setRotationAngle] = useState(0);
  const planetCanvasRef = useRef<HTMLCanvasElement>(null);
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);

  // Canvas based interactive planet renderer
  useEffect(() => {
    const canvas = planetCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      animId = requestAnimationFrame(render);
      const width = canvas.width;
      const height = canvas.height;
      const radius = 130;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Deep space background vignette behind globe
      const bgGrad = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius * 1.5);
      bgGrad.addColorStop(0, 'rgba(0, 240, 255, 0.08)');
      bgGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Planet Base Sphere
      const sphereGrad = ctx.createRadialGradient(cx - 40, cy - 40, 10, cx, cy, radius);
      sphereGrad.addColorStop(0, '#c2410c'); // rich rusty orange
      sphereGrad.addColorStop(0.4, '#7c2d12'); // deep reddish brown
      sphereGrad.addColorStop(0.8, '#431407');
      sphereGrad.addColorStop(1, '#0c0a09');

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();

      ctx.fillStyle = sphereGrad;
      ctx.fillRect(0, 0, width, height);

      // Procedural swirling surface bands rotating
      const offset = (rotationAngle * 0.5) % 360;
      ctx.fillStyle = 'rgba(254, 215, 170, 0.15)';
      for (let i = 0; i < 8; i++) {
        const y = cy - 100 + i * 28;
        ctx.beginPath();
        ctx.ellipse(cx, y, radius, 12, (offset * Math.PI) / 180, 0, Math.PI * 2);
        ctx.fill();
      }

      // High-albedo polar ice caps
      const northIce = ctx.createRadialGradient(cx, cy - radius + 15, 5, cx, cy - radius + 15, 45);
      northIce.addColorStop(0, 'rgba(240, 253, 250, 0.85)');
      northIce.addColorStop(1, 'rgba(240, 253, 250, 0)');
      ctx.fillStyle = northIce;
      ctx.beginPath();
      ctx.arc(cx, cy - radius + 10, 40, 0, Math.PI * 2);
      ctx.fill();

      // Atmospheric limb rim / terminator shadow
      const shadowGrad = ctx.createLinearGradient(cx - radius, cy, cx + radius, cy);
      shadowGrad.addColorStop(0, 'rgba(0,0,0,0)');
      shadowGrad.addColorStop(0.65, 'rgba(0,0,0,0.3)');
      shadowGrad.addColorStop(1, 'rgba(2,4,8,0.95)');
      ctx.fillStyle = shadowGrad;
      ctx.fillRect(0, 0, width, height);

      // Landing site coordinate marker on globe
      ctx.fillStyle = '#00f0ff';
      ctx.beginPath();
      ctx.arc(cx - 20, cy + 10, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx - 20, cy + 10, 10, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();

      // Atmospheric outer glow ring
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 1, 0, Math.PI * 2);
      ctx.stroke();
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [rotationAngle]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastXRef.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    setRotationAngle((prev) => prev + delta * 0.8);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <section
      id="planet"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-8 py-24 select-none"
    >
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl flex flex-col">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs text-orange-400 mb-2">
              <Globe className="w-4 h-4 text-orange-400 animate-spin" style={{ animationDuration: '20s' }} />
              <span>EXOPLANETARY SURVEY // UNCHARTED TERRESTRIAL BODY</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">DESIGNATION: WORLD / 04</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight">
              WORLD / 04
            </h2>
            <p className="font-mono text-xs text-slate-400 mt-1 uppercase tracking-widest">
              Fictional Primary Colonization & Atmospheric Extraction Target
            </p>
          </div>

          <div className="font-mono text-xs text-slate-500">
            [ DRAG GLOBE TO ROTATE COORDINATE AXIS ]
          </div>
        </div>

        {/* Fictional Planetary World-Building Metrics (Pill-Free) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs mb-8">
          <div className="p-4 bg-slate-950/80 border border-slate-800">
            <span className="text-slate-500 text-[10px] block mb-1 flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5 text-cyan-400" /> SURFACE ATMOSPHERE
            </span>
            <span className="text-2xl font-bold text-white tabular-nums">0.62 BAR</span>
            <span className="text-[10px] text-slate-500 block mt-1">94.2% CO2 · 3.8% N2</span>
          </div>

          <div className="p-4 bg-slate-950/80 border border-slate-800">
            <span className="text-slate-500 text-[10px] block mb-1 flex items-center gap-1.5">
              <Thermometer className="w-3.5 h-3.5 text-rose-400" /> MEAN TEMPERATURE
            </span>
            <span className="text-2xl font-bold text-white tabular-nums">-63&deg;C</span>
            <span className="text-[10px] text-slate-500 block mt-1">DIURNAL RANGE: &plusmn;35&deg;C</span>
          </div>

          <div className="p-4 bg-slate-950/80 border border-slate-800">
            <span className="text-slate-500 text-[10px] block mb-1 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-400" /> SURFACE GRAVITY
            </span>
            <span className="text-2xl font-bold text-white tabular-nums">0.38 G</span>
            <span className="text-[10px] text-slate-500 block mt-1">ESCAPE VEL: 5.02 KM/S</span>
          </div>

          <div className="p-4 bg-slate-950/80 border border-slate-800">
            <span className="text-slate-500 text-[10px] block mb-1 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-emerald-400" /> DIURNAL ROTATION
            </span>
            <span className="text-2xl font-bold text-white tabular-nums">24H 37M</span>
            <span className="text-[10px] text-slate-500 block mt-1">AXIAL TILT: 25.19&deg;</span>
          </div>
        </div>

        {/* Interactive Planetary Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Rotating Interactive 3D Canvas Globe (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-slate-950/80 border border-slate-800 relative">
            <canvas
              ref={planetCanvasRef}
              width={340}
              height={340}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              data-cursor="ROTATE"
              className="cursor-grab active:cursor-grabbing max-w-full h-auto"
            />
            <div className="w-full flex items-center justify-between font-mono text-[10px] text-slate-500 mt-4 border-t border-slate-900 pt-3">
              <span>LATITUDE: 08.4&deg;S</span>
              <span>LONGITUDE: 142.1&deg;E</span>
              <span>SOLAR DISTANCE: 1.52 AU</span>
            </div>
          </div>

          {/* Landing Sites Selector & Telemetry Dossier (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest">
              DESIGNATED LANDING ZONES:
            </div>

            <div className="flex flex-col gap-3">
              {SITES.map((site) => {
                const isSelected = selectedSite.id === site.id;
                return (
                  <button
                    key={site.id}
                    onClick={() => setSelectedSite(site)}
                    data-cursor="SELECT"
                    className={`p-4 text-left border transition-all font-mono text-xs ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-950/40 text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                        : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-display font-bold text-sm text-cyan-300 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-cyan-400" />
                        {site.name}
                      </span>
                      <span className="text-[10px] text-slate-500">{site.coords}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-light mt-1">
                      {site.target}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800/80">
                      <span>ELEVATION: {site.elevation}</span>
                      <span className="text-emerald-400 font-semibold">RISK: {site.hazardRisk}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={onNext}
              data-cursor="CONTROL"
              className="mt-4 w-full py-3.5 border border-cyan-500/40 bg-cyan-950/20 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-300 font-mono text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2"
            >
              <span>ACCESS MISSION CONTROL CONSOLE</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
