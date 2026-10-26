import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * WorksToContactTransition
 * Quantum Seam & Horizon Warp Bridge between WorksSection and ContactSection.
 * Slim, elegant laser horizon line with downward-traveling optical laser pulses,
 * smoothly morphing from Works' amber accent into Contact's teal phosphor glow.
 */
export const WorksToContactTransition: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const seamGlow = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.3, 1, 0.4]);
  const beamScaleX = useTransform(scrollYProgress, [0.1, 0.6], [0.4, 1]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-16 sm:h-20 bg-[#050811] overflow-hidden select-none pointer-events-none flex flex-col items-center justify-between z-20"
    >
      {/* ── Top Laser Seam line ── */}
      <motion.div
        style={{ scaleX: beamScaleX, opacity: seamGlow }}
        className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent shadow-[0_0_15px_#f59e0b]"
      />

      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_50%,rgba(45,212,191,0.08)_0%,transparent_70%)]" />

      {/* ── Central Micro Core ── */}
      <div className="relative z-10 pt-2 flex flex-col items-center">
        <div className="flex items-center gap-2 px-3 py-0.5 rounded-full bg-slate-950/80 border border-teal-500/30 shadow-[0_0_12px_rgba(45,212,191,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
          <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.28em] text-teal-300 font-bold uppercase">
            QUANTUM CONDUIT // DOCKING MATRIX
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
        </div>
      </div>

      {/* ── 5 Vertical Laser Pulse Streams ── */}
      <div className="relative w-full max-w-2xl h-full flex justify-around px-8 items-stretch">
        {[
          { color: '#38bdf8', delay: 0 },
          { color: '#2dd4bf', delay: 0.4 },
          { color: '#10b981', delay: 0.2, isMain: true },
          { color: '#2dd4bf', delay: 0.5 },
          { color: '#38bdf8', delay: 0.1 },
        ].map((pulse, i) => (
          <div key={`pulse-line-${i}`} className="relative h-full flex flex-col items-center">
            {/* Guide Wire */}
            <div className={`w-px h-full ${pulse.isMain ? 'bg-teal-500/30' : 'bg-slate-800/40'}`} />

            {/* Traveling Laser Spark */}
            <motion.div
              animate={{ y: ['-10%', '110%'], opacity: [0, 1, 1, 0] }}
              transition={{
                duration: pulse.isMain ? 1.2 : 1.6,
                repeat: Infinity,
                delay: pulse.delay,
                ease: 'easeInOut',
              }}
              style={{
                backgroundColor: pulse.color,
                boxShadow: `0 0 10px ${pulse.color}, 0 0 18px ${pulse.color}`,
              }}
              className={`absolute w-1 rounded-full ${pulse.isMain ? 'h-8' : 'h-5'}`}
            />
          </div>
        ))}
      </div>

      {/* ── Bottom Horizon Seam line entering Contact ── */}
      <motion.div
        style={{ opacity: seamGlow }}
        className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent shadow-[0_0_12px_rgba(45,212,191,0.5)]"
      />
    </div>
  );
};

export default WorksToContactTransition;
