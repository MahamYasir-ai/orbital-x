import { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { Navigation } from './components/Navigation';
import { DimensionalCanvas } from './components/DimensionalCanvas';
import { Hero } from './components/Hero';
import { DimensionalTunnel } from './components/DimensionalTunnel';
import { MissionIntro } from './components/MissionIntro';
import { SpacecraftSection } from './components/SpacecraftSection';
import { RoboticsSection } from './components/RoboticsSection';
import { PlanetarySection } from './components/PlanetarySection';
import { MissionControl } from './components/MissionControl';
import { DimensionalEvent } from './components/DimensionalEvent';
import { TheUnknown } from './components/TheUnknown';
import { MultiverseSection } from './components/MultiverseSection';
import { FutureTechSection } from './components/FutureTechSection';
import { TimelineSection } from './components/TimelineSection';
import { MissionArchive } from './components/MissionArchive';
import { FinalDimension } from './components/FinalDimension';
import { ContactSection } from './components/ContactSection';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAnomalyActive, setIsAnomalyActive] = useState(false);

  // Monitor scroll position and detect current section in viewport
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      setScrollProgress(progress);

      const sections = [
        'hero',
        'tunnel',
        'intro',
        'spacecraft',
        'robotics',
        'planet',
        'mission-control',
        'unknown',
        'multiverse',
        'tech',
        'timeline',
        'archive',
        'final-dimension',
        'contact',
      ];

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTriggerAnomaly = () => {
    setIsAnomalyActive(true);
  };

  const handleAnomalyComplete = () => {
    setIsAnomalyActive(false);
    scrollToSection('unknown');
  };

  return (
    <div className="relative min-h-screen bg-[#020408] text-slate-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Custom Desktop Cursor */}
      <CustomCursor />

      {/* Opening HUD Calibration Sequence */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Persistent High-Performance Three.js 3D WebGL Canvas */}
      <DimensionalCanvas
        activeSection={activeSection}
        scrollProgress={scrollProgress}
        isAnomalyActive={isAnomalyActive}
      />

      {/* Dynamic Floating Aerospace Navigation */}
      <Navigation
        activeSection={activeSection}
        onNavigate={scrollToSection}
        isAnomalyActive={isAnomalyActive}
        onTriggerAnomaly={handleTriggerAnomaly}
      />

      {/* Dimensional Rupture Climax Modal */}
      {isAnomalyActive && (
        <DimensionalEvent onTransitionComplete={handleAnomalyComplete} />
      )}

      {/* ONE Continuous Experiential Journey */}
      <main className="relative z-10 flex flex-col">
        {/* 1. HERO — The Fall */}
        <Hero onExplore={() => scrollToSection('tunnel')} />

        {/* 2. DIMENSIONAL TUNNEL — Spacetime Conduit */}
        <DimensionalTunnel onContinue={() => scrollToSection('intro')} />

        {/* 3. MISSION INTRODUCTION — Earth Reconnaissance */}
        <MissionIntro onNext={() => scrollToSection('spacecraft')} />

        {/* 4. SPACECRAFT — Vessel X-01 Flagship */}
        <SpacecraftSection onNext={() => scrollToSection('robotics')} />

        {/* 5. ROBOTICS — Rover R-07 Mars Surface */}
        <RoboticsSection onNext={() => scrollToSection('planet')} />

        {/* 6. PLANETARY EXPLORATION — World / 04 */}
        <PlanetarySection onNext={() => scrollToSection('mission-control')} />

        {/* 7. MISSION CONTROL — Flight Operations Console */}
        <MissionControl onTriggerEvent={handleTriggerAnomaly} />

        {/* 8. THE UNKNOWN — Void Megastructure */}
        <TheUnknown onContinue={() => scrollToSection('multiverse')} />

        {/* 9. MULTIVERSE PASSAGE — 5 Realities */}
        <MultiverseSection onContinue={() => scrollToSection('tech')} />

        {/* 10. FUTURE TECHNOLOGY — R&D Laboratory */}
        <FutureTechSection onContinue={() => scrollToSection('timeline')} />

        {/* 11. TIMELINE OF EXPEDITIONS — 2026 to 2048 */}
        <TimelineSection onContinue={() => scrollToSection('archive')} />

        {/* 12. MISSION ARCHIVE VAULT */}
        <MissionArchive onContinue={() => scrollToSection('final-dimension')} />

        {/* 13. FINAL DIMENSION — The Frontier Has No End */}
        <FinalDimension onReachEnd={() => scrollToSection('contact')} />

        {/* 14. CONTACT & AEROSPACE FOOTER */}
        <ContactSection onExploreLab={() => scrollToSection('tech')} />
      </main>
    </div>
  );
}
