import React from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface DynamicMorphingHorizonProps {
  scrollYProgress: MotionValue<number>;
}

/**
 * DynamicMorphingHorizon
 * Awwwards-standard dynamic morphing parabolic energy horizon portal.
 * Morphs from deep parabolic curve (M 0 140 Q 720 0 1440 140) at scroll start
 * to flattened smooth line (M 0 40 Q 720 35 1440 40) as AboutSection takes full screen.
 * Accompanied by 2px emerald laser line and glow.
 */
export const DynamicMorphingHorizon: React.FC<DynamicMorphingHorizonProps> = ({
  scrollYProgress,
}) => {
  const { scrollY } = useScroll();

  // Hide completely when scrollY === 0 (Home is 100% clean)
  const enterOpacity = useTransform(scrollY, [0, 60], [0, 1]);
  const enterScaleY = useTransform(scrollY, [0, 140], [0, 1]);

  // Morph control points based on scrollYProgress (0 -> 0.2)
  // At 0: peak at Y=0 (deep curve), sides at Y=140
  // At >= 0.2: flattens to peak at Y=35, sides at Y=40
  const curveY = useTransform(scrollYProgress, [0, 0.2], [0, 35]);
  const edgeY = useTransform(scrollYProgress, [0, 0.2], [140, 40]);

  // Dynamic SVG Path morphing for filled body
  const pathD = useTransform([curveY, edgeY], ([cY, eY]) => {
    return `M 0 ${eY} Q 720 ${cY} 1440 ${eY} L 1440 140 L 0 140 Z`;
  });

  // Dynamic SVG Path for 2px Laser Horizon Line
  const lineD = useTransform([curveY, edgeY], ([cY, eY]) => {
    return `M 0 ${eY} Q 720 ${cY} 1440 ${eY}`;
  });

  return (
    <motion.div
      style={{
        opacity: enterOpacity,
        scaleY: enterScaleY,
        transformOrigin: 'bottom center',
      }}
      className="hidden md:block absolute -top-[139px] left-0 right-0 w-full h-[140px] pointer-events-none z-30 select-none overflow-visible drop-shadow-[0_-15px_35px_rgba(6,182,212,0.45)]"
    >
      <svg
        viewBox="0 0 1440 140"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id="laser-horizon-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="20%" stopColor="#0284c7" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="80%" stopColor="#0284c7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>

          <filter id="ice-laser-glow" x="-20%" y="-40%" width="140%" height="180%">
            <feDropShadow dx="0" dy="-4" stdDeviation="8" floodColor="#06b6d4" floodOpacity="0.75" />
          </filter>
        </defs>

        {/* Khối nền #060911 đặc che phủ Home khi trượt lên */}
        <motion.path
          d={pathD}
          fill="#060911"
        />

        {/* Thanh tia sáng quét ngang Electric Cyan / Ice Blue Laser Horizon Line 2px */}
        <motion.path
          d={lineD}
          stroke="url(#laser-horizon-grad)"
          strokeWidth="2"
          fill="none"
          filter="url(#ice-laser-glow)"
        />

        {/* Lớp tia sáng phụ 1px sắc nét trắng ánh băng tuyết */}
        <motion.path
          d={lineD}
          stroke="#e0f2fe"
          strokeOpacity="0.85"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </motion.div>
  );
};

export default DynamicMorphingHorizon;
