import { useRef } from 'react';
import { motion } from 'motion/react';
import { TimelineEvent } from '../types/orbital';
import { Calendar, ChevronLeft, ChevronRight, Lock, Sparkles, ArrowRight } from 'lucide-react';

interface TimelineSectionProps {
  onContinue: () => void;
}

const EVENTS: TimelineEvent[] = [
  {
    year: '2026',
    title: 'ORBITAL-X FOUNDED',
    classification: 'PUBLIC',
    phase: 'GENESIS OF DIMENSIONAL AEROSPACE',
    summary: 'Consortium of aerospace propulsion physicists and robotics pioneers establish Orbital-X, initiating development of relativistic ion drives and autonomous deep-space flight software.',
    telemetry: 'LATENCY BENCHMARK: 0.12 MS · INITIAL SEED LAB: MOJAVE FACILITY',
  },
  {
    year: '2028',
    title: 'LUNAR SYSTEM TEST',
    phase: 'AUTONOMOUS SOUTH POLE SURVEY',
    classification: 'PUBLIC',
    summary: 'Successful lunar soft-landing and autonomous navigation test on the Shackleton Crater rim, validating real-time visual SLAM under extreme permanently-shadowed conditions.',
    telemetry: 'ALTITUDE INSERTION: 15.2 KM · SAMPLE EXTRACTION: 42 KG',
  },
  {
    year: '2030',
    title: 'MARS ORBITER',
    phase: 'HIGH-BANDWIDTH OPTICAL RELAY',
    classification: 'PUBLIC',
    summary: 'Deployment of Mars Orbiter X-02 in aerostationary orbit, establishing continuous 1.2 Tbps laser communication telemetry linking Earth ground stations directly to Mars.',
    telemetry: 'OPTICAL CARRIER: 1550 NM · TRANSIT DURATION: 114 DAYS',
  },
  {
    year: '2034',
    title: 'AUTONOMOUS ROVER',
    phase: 'ROBOTICS R-07 SWARM INSERTION',
    classification: 'PUBLIC',
    summary: 'First long-duration multi-year robotic mission operated with 98.2% autonomous machine decision-making across the canyonlands of Valles Marineris.',
    telemetry: 'TRAVERSED: 340 KM · AUTONOMOUS WAYPOINTS: 14,200',
  },
  {
    year: '2040',
    title: 'DEEP SPACE MISSION',
    phase: 'VESSEL X-01 FLAGSHIP DEPARTURE',
    classification: 'RESTRICTED',
    summary: 'Vessel X-01 accelerates beyond the Kuiper Belt powered by the revolutionary magneto-plasma ion drive, embarking toward interstellar boundary space.',
    telemetry: 'TERMINAL VELOCITY: 48 KM/S · TARGET: OORT CLOUD PERIPHERY',
  },
  {
    year: '2048',
    title: 'CLASSIFIED',
    phase: 'DIMENSIONAL CONVERGENCE PROTOCOL',
    classification: 'CLASSIFIED',
    summary: 'Redacted experimental initiative exploring trans-dimensional geodesic traversals beyond conventional spacetime metric geometry. Details restricted to clearance level Omega.',
    telemetry: 'STATUS: ACTIVE · METRIC ANOMALY: CONFIRMED',
    highlight: true,
  },
];

export function TimelineSection({ onContinue }: TimelineSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -360, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 360, behavior: 'smooth' });
  };

  return (
    <section
      id="timeline"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-8 py-24 select-none"
    >
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl flex flex-col">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs text-cyan-400 mb-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>CHRONOLOGY OF EXPLORATION</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">2026 &mdash; 2048+</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight">
              TIMELINE OF EXPEDITIONS
            </h2>
            <p className="font-mono text-xs text-slate-400 mt-1 uppercase tracking-widest">
              From Terrestrial Prototype to Classified Trans-Dimensional Traversal
            </p>
          </div>

          {/* Scroll arrow buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={scrollLeft}
              data-cursor="PREV"
              className="p-3 border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
              aria-label="Scroll timeline back"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              data-cursor="NEXT"
              className="p-3 border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
              aria-label="Scroll timeline forward"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Container */}
        <div
          ref={scrollRef}
          className="w-full overflow-x-auto flex gap-6 pb-6 scrollbar-thin select-none snap-x"
        >
          {EVENTS.map((event, index) => {
            const isClassified = event.classification === 'CLASSIFIED';
            return (
              <div
                key={event.year}
                className={`min-w-[320px] sm:min-w-[380px] max-w-[380px] p-6 sm:p-8 flex flex-col justify-between border transition-all snap-start ${
                  isClassified
                    ? 'border-violet-500/60 bg-gradient-to-b from-violet-950/40 to-slate-950/80 shadow-[0_0_30px_rgba(121,40,202,0.25)]'
                    : 'border-slate-800 bg-slate-950/80 hover:border-cyan-500/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs mb-4 pb-3 border-b border-slate-900">
                    <span className="text-slate-500">INDEX 0{index + 1}</span>
                    <span
                      className={`text-[10px] tracking-wider uppercase flex items-center gap-1 ${
                        isClassified ? 'text-violet-400 font-bold' : 'text-slate-400'
                      }`}
                    >
                      {isClassified ? <Lock className="w-3.5 h-3.5" /> : null}
                      {event.classification}
                    </span>
                  </div>

                  {/* Year Tag */}
                  <div
                    className={`font-display text-4xl sm:text-5xl font-black mb-1 ${
                      isClassified ? 'text-violet-300' : 'text-cyan-400'
                    }`}
                  >
                    {event.year}
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-1">
                    {event.title}
                  </h3>
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block mb-4">
                    {event.phase}
                  </span>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light mb-6">
                    {event.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-900 font-mono text-[10px] text-slate-500">
                  {event.telemetry}
                </div>
              </div>
            );
          })}
        </div>

        {/* Forward to Archive button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onContinue}
            data-cursor="ARCHIVE"
            className="flex items-center gap-3 px-6 py-3 border border-cyan-500/40 bg-cyan-950/20 text-cyan-300 font-mono text-xs tracking-widest uppercase hover:bg-cyan-500/10 hover:border-cyan-300 transition-all"
          >
            <span>EXPLORE MISSION ARCHIVE VAULT</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </div>
    </section>
  );
}
