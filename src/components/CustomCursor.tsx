import { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

interface CursorState {
  text: string;
  variant: 'default' | 'hover' | 'action';
  visible: boolean;
}

export function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({
    text: '',
    variant: 'default',
    visible: false,
  });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Smooth springs for cursor position
  const mouseX = useSpring(0, { stiffness: 450, damping: 35, mass: 0.5 });
  const mouseY = useSpring(0, { stiffness: 450, damping: 35, mass: 0.5 });

  useEffect(() => {
    // Check if device is touch or prefers reduced motion
    const touch = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (touch || reducedMotion) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!cursorState.visible) {
        setCursorState((prev) => ({ ...prev, visible: true }));
      }
    };

    const handleMouseLeave = () => {
      setCursorState((prev) => ({ ...prev, visible: false }));
    };

    const handleElementHover = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor]') as HTMLElement | null;
      if (target) {
        const text = target.getAttribute('data-cursor') || '';
        setCursorState({
          text,
          variant: 'action',
          visible: true,
        });
      } else {
        const isClickable = (e.target as HTMLElement).closest('button, a, input, select, textarea');
        if (isClickable) {
          setCursorState({
            text: '',
            variant: 'hover',
            visible: true,
          });
        } else {
          setCursorState({
            text: '',
            variant: 'default',
            visible: true,
          });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleElementHover, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleElementHover);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, cursorState.visible]);

  if (isTouchDevice || !cursorState.visible) return null;

  const isAction = cursorState.variant === 'action' && cursorState.text;
  const isHover = cursorState.variant === 'hover';

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Outer ring / label container */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isAction ? 1.4 : isHover ? 1.2 : 1,
          borderColor: isAction ? 'rgba(0, 240, 255, 0.9)' : isHover ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 240, 255, 0.4)',
          backgroundColor: isAction ? 'rgba(0, 240, 255, 0.12)' : 'rgba(2, 4, 8, 0.2)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className={`flex items-center justify-center rounded-full border backdrop-blur-[1px] transition-all duration-200 ${
          isAction
            ? 'h-16 w-16'
            : isHover
            ? 'h-10 w-10'
            : 'h-7 w-7 border-cyan-500/40'
        }`}
      >
        {isAction ? (
          <span className="font-mono text-[9px] font-bold tracking-widest text-cyan-300 uppercase px-1 text-center leading-none">
            {cursorState.text}
          </span>
        ) : (
          /* Center focal dot */
          <div
            className={`rounded-full transition-transform duration-150 ${
              isHover ? 'h-1 w-1 bg-cyan-400 scale-125' : 'h-1.5 w-1.5 bg-cyan-400 shadow-[0_0_8px_#00f0ff]'
            }`}
          />
        )}
      </motion.div>
    </div>
  );
}
