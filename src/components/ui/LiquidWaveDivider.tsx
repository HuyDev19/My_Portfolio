import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * LiquidWaveDivider
 * Multi-layer liquid water ripple wave transition between HomeSection and AboutSection.
 * At scrollY === 0, scaleY is 0 (HomeSection is 100% clean with zero protrusion).
 * As user scrolls, the water level rises with organic liquid ripples and light refraction.
 */
export const LiquidWaveDivider: React.FC = () => {
  const { scrollY } = useScroll();

  // Chiều cao gợn sóng dâng lên từ 0 đến 1 khi bắt đầu cuộn từ Home xuống About (0px -> 320px)
  const scaleY = useTransform(scrollY, [0, 320], [0, 1]);
  const waveOpacity = useTransform(scrollY, [0, 60], [0, 1]);

  return (
    <motion.div
      style={{
        scaleY,
        opacity: waveOpacity,
        transformOrigin: 'bottom center',
      }}
      className="absolute -top-20 md:-top-24 left-0 right-0 w-full h-20 md:h-24 pointer-events-none z-30 overflow-hidden select-none"
    >
      {/* ── Lớp khúc xạ ánh sáng mặt nước ngay tại rìa ngọn sóng (Backdrop Blur & Refraction) ── */}
      <div className="absolute top-0 inset-x-0 h-12 backdrop-blur-md bg-gradient-to-b from-emerald-500/10 to-transparent z-10 pointer-events-none" />

      {/* ── Lớp sóng 1: Sóng ngọc Emerald mờ xa (fill="rgba(16, 185, 129, 0.08)") ── */}
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-x-0 bottom-0 w-[200%] h-full flex"
      >
        <svg viewBox="0 0 2880 100" fill="none" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M 0 50 Q 360 15 720 50 T 1440 50 Q 2160 15 2880 50 L 2880 100 L 0 100 Z"
            fill="rgba(16, 185, 129, 0.08)"
          />
        </svg>
      </motion.div>

      {/* ── Lớp sóng 2: Sóng sẫm bán trong suốt (fill="rgba(6, 9, 17, 0.7)") ── */}
      <motion.div
        animate={{ x: ['-50%', '0%'] }}
        transition={{ duration: 19, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-x-0 bottom-0 w-[200%] h-full flex"
      >
        <svg viewBox="0 0 2880 100" fill="none" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M 0 40 Q 360 65 720 40 T 1440 40 Q 2160 65 2880 40 L 2880 100 L 0 100 Z"
            fill="rgba(6, 9, 17, 0.7)"
          />
        </svg>
      </motion.div>

      {/* ── Lớp sóng 3: Sóng chính đặc che kín HomeSection (fill="#060911") ── */}
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-x-0 bottom-0 w-[200%] h-full flex z-20"
      >
        <svg viewBox="0 0 2880 100" fill="none" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M 0 30 Q 360 5 720 30 T 1440 30 Q 2160 5 2880 30 L 2880 100 L 0 100 Z"
            fill="#060911"
          />
          {/* Đường viền bọt sóng phát sáng (Crest Line) */}
          <path
            d="M 0 30 Q 360 5 720 30 T 1440 30 Q 2160 5 2880 30"
            stroke="#22d3ee"
            strokeOpacity="0.45"
            strokeWidth="1.5"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default LiquidWaveDivider;
