import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Radio, Compass, Orbit, Disc3, ShieldAlert } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isAnomalyActive: boolean;
  onTriggerAnomaly: () => void;
}

const SECTION_LABELS: Record<string, { label: string; code: string; icon: any }> = {
  hero: { label: 'ORBITAL-X', code: 'DIMENSION // X-00', icon: Radio },
  tunnel: { label: 'DIMENSIONAL TUNNEL', code: 'SECTOR // SINGULARITY', icon: Disc3 },
  intro: { label: 'EARTH RECON', code: 'POINT // 001', icon: Orbit },
  spacecraft: { label: 'VESSEL / X-01', code: 'CRAFT // DOCK-07', icon: Compass },
  robotics: { label: 'ROBOTICS / R-07', code: 'AUTONOMY // 98.2%', icon: Radio },
  planet: { label: 'WORLD / 04', code: 'SURFACE // 0.62 BAR', icon: Orbit },
  'mission-control': { label: 'MISSION CONTROL', code: 'TELEMETRY // NOMINAL', icon: Radio },
  unknown: { label: 'THE UNKNOWN', code: 'ANOMALY // UNCHARTED', icon: ShieldAlert },
  multiverse: { label: 'MULTIVERSE PASSAGE', code: '5 REALITIES', icon: Disc3 },
  tech: { label: 'ADVANCED R&D', code: 'QUANTUM LAB', icon: Radio },
  timeline: { label: 'CHRONOLOGY', code: '2026-2048', icon: Compass },
  archive: { label: 'MISSION ARCHIVE', code: 'VAULT // 4 LOGS', icon: Orbit },
  contact: { label: 'MISSION TERMINAL', code: 'TRANSMISSION // ACTIVE', icon: Radio },
};

export function Navigation({
  activeSection,
  onNavigate,
  isAnomalyActive,
  onTriggerAnomaly,
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentMeta = SECTION_LABELS[activeSection] || SECTION_LABELS.hero;
  const CurrentIcon = currentMeta.icon;

  const navLinks = [
    { id: 'hero', label: 'ORIGIN' },
    { id: 'tunnel', label: 'WARP' },
    { id: 'spacecraft', label: 'VESSEL' },
    { id: 'robotics', label: 'ROBOTICS' },
    { id: 'mission-control', label: 'CONTROL' },
    { id: 'multiverse', label: 'MULTIVERSE' },
    { id: 'archive', label: 'ARCHIVE' },
    { id: 'contact', label: 'CONTACT' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#020408]/85 backdrop-blur-md border-b border-slate-800/60 py-3'
            : 'bg-gradient-to-b from-[#020408]/90 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Mark with Dynamic Section Identity */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('hero')}
              data-cursor="ORIGIN"
              className="flex items-center gap-3 text-left focus:outline-none group"
            >
              <div className="h-8 w-8 rounded-full border border-cyan-500/40 bg-cyan-950/30 flex items-center justify-center relative overflow-hidden group-hover:border-cyan-400 transition-colors">
                <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f0ff]" />
                <div className="absolute inset-0 border-t border-cyan-400/60 animate-spin" style={{ animationDuration: '4s' }} />
              </div>
              <div>
                <span className="font-display font-bold tracking-[0.25em] text-white text-base block group-hover:text-cyan-400 transition-colors">
                  ORBITAL-X
                </span>
                <span className="font-mono text-[9px] tracking-widest text-slate-400 block -mt-0.5">
                  AEROSPACE LAB
                </span>
              </div>
            </button>

            {/* Dynamic Status Module: transforms as user travels */}
            <div className="hidden lg:flex items-center gap-2.5 pl-4 border-l border-slate-800 text-xs font-mono">
              <CurrentIcon className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <div className="flex flex-col">
                <span className="text-[10px] text-cyan-300 font-semibold tracking-wider uppercase">
                  {currentMeta.label}
                </span>
                <span className="text-[9px] text-slate-500 tracking-wider">
                  {currentMeta.code}
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 font-mono text-xs text-slate-400">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                data-cursor="GO"
                className={`transition-colors tracking-widest hover:text-cyan-400 relative py-1 ${
                  activeSection === link.id ? 'text-cyan-300 font-semibold' : ''
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_8px_#00f0ff]"
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Action HUD / Anomaly Warp trigger & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Visualizer bars (sound-less telemetry animation) */}
            <div className="hidden sm:flex items-center gap-0.5 h-4 px-2.5 py-1 bg-slate-900/60 border border-slate-800 rounded">
              <span className="h-2 w-0.5 bg-cyan-400/80 animate-pulse" style={{ animationDelay: '0.1s' }} />
              <span className="h-3 w-0.5 bg-cyan-400 animate-pulse" style={{ animationDelay: '0.3s' }} />
              <span className="h-1.5 w-0.5 bg-cyan-400/60 animate-pulse" style={{ animationDelay: '0.2s' }} />
              <span className="h-4 w-0.5 bg-cyan-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
              <span className="h-2.5 w-0.5 bg-cyan-400/70 animate-pulse" style={{ animationDelay: '0.15s' }} />
              <span className="ml-1.5 font-mono text-[9px] text-slate-400">SYNC</span>
            </div>

            {/* Quick Dimensional Fracture Button */}
            <button
              onClick={onTriggerAnomaly}
              data-cursor="WARP"
              className={`px-3 py-1.5 font-mono text-[10px] tracking-wider uppercase border transition-all flex items-center gap-1.5 ${
                isAnomalyActive
                  ? 'border-violet-500 bg-violet-950/50 text-violet-300 shadow-[0_0_15px_rgba(121,40,202,0.5)]'
                  : 'border-cyan-500/40 bg-cyan-950/20 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400'
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
              {isAnomalyActive ? 'ANOMALY ACTIVE' : 'WARP JUMP'}
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white border border-slate-800 bg-slate-900/50"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[60px] z-40 bg-[#020408]/95 backdrop-blur-xl border-b border-slate-800 p-6 md:hidden"
          >
            <div className="font-mono text-[11px] text-cyan-400 mb-3 tracking-widest uppercase">
              CURRENT FLIGHT VECTOR: {currentMeta.label}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-3 text-left font-mono text-xs border transition-colors ${
                    activeSection === link.id
                      ? 'border-cyan-400 bg-cyan-950/30 text-cyan-300'
                      : 'border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                onTriggerAnomaly();
                setMobileMenuOpen(false);
              }}
              className="mt-4 w-full py-2.5 font-mono text-xs text-center border border-violet-500/60 bg-violet-950/30 text-violet-300 uppercase tracking-widest"
            >
              TRIGGER DIMENSIONAL JUMP
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
