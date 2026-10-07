import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Shield, Radio, X, Terminal, ArrowUpRight } from 'lucide-react';

interface ContactSectionProps {
  onExploreLab: () => void;
}

export function ContactSection({ onExploreLab }: ContactSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [missionName, setMissionName] = useState('');
  const [organization, setOrganization] = useState('');
  const [trajectoryType, setTrajectoryType] = useState('INTERPLANETARY');
  const [encryptedBrief, setEncryptedBrief] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!missionName || !encryptedBrief) return;

    // Save to localStorage for real local persistence
    try {
      const existing = JSON.parse(localStorage.getItem('orbital_x_missions') || '[]');
      existing.push({
        id: Date.now(),
        missionName,
        organization,
        trajectoryType,
        encryptedBrief,
        date: new Date().toISOString(),
      });
      localStorage.setItem('orbital_x_missions', JSON.stringify(existing));
    } catch {
      // ignore
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setMissionName('');
      setOrganization('');
      setEncryptedBrief('');
    }, 2400);
  };

  return (
    <footer
      id="contact"
      className="relative w-full bg-[#020408] border-t border-slate-800 text-white select-none pt-24 pb-12 px-4 sm:px-8"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Minimalist Final CTA Header */}
        <div className="w-full max-w-4xl text-center mb-16">
          <div className="flex items-center justify-center gap-2 font-mono text-xs text-cyan-400 mb-4">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="tracking-[0.3em] uppercase">TRANSMISSION CHANNEL // READY</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight">
            BUILD THE NEXT MISSION.
          </h2>

          <p className="mt-4 max-w-xl mx-auto text-slate-400 text-sm sm:text-base font-light leading-relaxed">
            Collaborate with our dimensional aerospace engineers on autonomous spacecraft payloads, robotic rovers, and relativistic navigation hardware.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setModalOpen(true)}
              data-cursor="TRANSMIT"
              className="px-8 py-3.5 bg-cyan-500/10 border border-cyan-400 text-cyan-300 hover:bg-cyan-500/20 hover:shadow-[0_0_25px_rgba(0,240,255,0.3)] font-mono text-xs sm:text-sm tracking-widest uppercase transition-all flex items-center gap-3"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-4 h-4 text-cyan-400" />
            </button>

            <button
              onClick={onExploreLab}
              data-cursor="LAB"
              className="px-8 py-3.5 border border-slate-800 bg-slate-900/40 text-slate-300 hover:text-white hover:border-slate-700 font-mono text-xs sm:text-sm tracking-widest uppercase transition-all"
            >
              EXPLORE THE LAB
            </button>
          </div>
        </div>

        {/* Detailed Aerospace Footer Directory */}
        <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-8 py-12 border-t border-b border-slate-900 font-mono text-xs">
          {/* Brand Info */}
          <div className="col-span-2">
            <span className="font-display text-xl font-bold tracking-[0.25em] text-white block mb-2">
              ORBITAL-X
            </span>
            <p className="font-sans text-xs text-slate-500 max-w-xs font-light leading-relaxed">
              Dimensional aerospace systems and autonomous robotics laboratory pushing beyond the boundary of known physical horizons.
            </p>
            <div className="mt-4 flex items-center gap-2 text-[10px] text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>EARTH RELAY STATION // ONLINE</span>
            </div>
          </div>

          {/* Nav Categories */}
          <div>
            <span className="text-[10px] text-cyan-400 uppercase tracking-widest block mb-4">
              RESEARCH
            </span>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={onExploreLab} className="hover:text-white transition-colors">Relativistic Drives</button></li>
              <li><button onClick={onExploreLab} className="hover:text-white transition-colors">Quantum Lasers</button></li>
              <li><button onClick={onExploreLab} className="hover:text-white transition-colors">Swarm Robotics</button></li>
            </ul>
          </div>

          <div>
            <span className="text-[10px] text-cyan-400 uppercase tracking-widest block mb-4">
              MISSIONS
            </span>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Vessel X-01</button></li>
              <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Rover R-07</button></li>
              <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">World 04</button></li>
            </ul>
          </div>

          <div>
            <span className="text-[10px] text-cyan-400 uppercase tracking-widest block mb-4">
              CONNECT
            </span>
            <ul className="space-y-2 text-slate-400">
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">X (Twitter)</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 font-mono text-[11px] text-slate-500">
          <div>&copy; 2026 ORBITAL-X. ALL RIGHTS RESERVED.</div>
          <div className="flex items-center gap-4">
            <span>COORDINATE: 34.0522°N, 118.2437°W</span>
            <span>·</span>
            <span>CLEARANCE: LEVEL-4</span>
          </div>
        </div>
      </div>

      {/* Start a Project Interactive Transmission Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-slate-950 border border-cyan-500/40 p-6 sm:p-8 text-white shadow-[0_0_50px_rgba(0,240,255,0.25)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white border border-slate-800"
                aria-label="Close project modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 mb-2">
                <Terminal className="w-4 h-4" />
                <span>MISSION DISPATCH TERMINAL // SECURE LINK</span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-2">
                INITIATE MISSION BRIEF
              </h3>
              <p className="text-xs text-slate-400 mb-6 font-light">
                Submit exploratory payload parameters directly to the Orbital-X orbital planning team.
              </p>

              {submitted ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-bounce mb-3" />
                  <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-widest">
                    TRANSMISSION DISPATCHED TO DEEP ORBIT
                  </span>
                  <p className="font-mono text-[11px] text-slate-400 mt-2">
                    ENCRYPTION KEY: 0x89F4B... STORED LOCALLY
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1">MISSION IDENTIFIER *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Deep Recon Europa-Alpha"
                      value={missionName}
                      onChange={(e) => setMissionName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 p-2.5 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-400 block mb-1">ORGANIZATION</label>
                      <input
                        type="text"
                        placeholder="Aerospace agency or lab"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 p-2.5 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">TRAJECTORY CLASS</label>
                      <select
                        value={trajectoryType}
                        onChange={(e) => setTrajectoryType(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 p-2.5 text-white focus:outline-none focus:border-cyan-400"
                      >
                        <option value="LEO">LOW EARTH ORBIT</option>
                        <option value="CISLUNAR">CISLUNAR</option>
                        <option value="INTERPLANETARY">INTERPLANETARY</option>
                        <option value="DEEP_SPACE">DEEP SPACE / OORT</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">TECHNICAL BRIEF / OBJECTIVE *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Describe target payload, mass constraints, or robotics specifications..."
                      value={encryptedBrief}
                      onChange={(e) => setEncryptedBrief(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 p-2.5 text-white focus:outline-none focus:border-cyan-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-cyan-500/20 border border-cyan-400 text-cyan-200 hover:bg-cyan-500/30 uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>DISPATCH SECURE TRANSMISSION</span>
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
