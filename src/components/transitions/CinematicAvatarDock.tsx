import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import avatarImg from '../../assets/avatar.png';

/**
 * CinematicAvatarDock
 * Awwwards-standard cinematic transition where the Hero avatar portrait
 * lifts off in a parabolic trajectory, sweeps across the curved horizon,
 * laser-scans, and docks seamlessly into the Physical ID Card in the About section.
 */
export const CinematicAvatarDock: React.FC = () => {
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parabolic trajectory coordinates (measured precisely for 1536x864 & scaled dynamically)
  // X: from center (0vw) to Left Column ID card slot (-36.4vw)
  const x = useTransform(scrollY, [0, 580], ['0vw', '-36.4vw']);

  // Y: subtle organic parabolic arc — gently lifts up (-90px peak at 220px scroll)
  // then docks smoothly into the ID card frame at -115px
  const y = useTransform(scrollY, [0, 220, 580], ['0px', '-90px', '-115px']);

  // Scale: scales down from Hero presence (1.0) to ID Card portrait size (0.55)
  const scale = useTransform(scrollY, [0, 580], [1, 0.55]);

  // Opacity: visible throughout Hero & flight, smoothly hands off to the ID card (500px - 600px)
  const opacity = useTransform(scrollY, [0, 500, 600], [1, 1, 0]);

  // Optical laser security scan line sweeping down the torso during flight
  const scanTop = useTransform(scrollY, [80, 520], ['-10%', '110%']);
  const scanOpacity = useTransform(scrollY, [80, 160, 440, 540], [0, 1, 1, 0]);

  // If user scrolls way past About, disable rendering to save GPU cycles
  const [isFarPast, setIsFarPast] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsFarPast(window.scrollY > 1600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted || isFarPast) return null;

  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        opacity,
        transformOrigin: '50% 80%',
      }}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="hidden md:flex fixed bottom-0 inset-x-0 z-[25] justify-center items-end pointer-events-none select-none"
    >
      <div className="relative overflow-visible">
        <img
          src={avatarImg}
          alt="Huỳnh Nhất Huy — Hero Transition Avatar"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, black 82%, transparent 98%)',
            maskImage: 'linear-gradient(to bottom, black 82%, transparent 98%)',
          }}
          className="w-[380px] lg:w-[460px] xl:w-[500px] h-auto object-contain mix-blend-lighten drop-shadow-[0_0_60px_rgba(0,0,0,0.15)] pointer-events-none"
          loading="eager"
          draggable={false}
        />

        {/* Optical Laser Security Scan Line */}
        <motion.div
          style={{ top: scanTop, opacity: scanOpacity }}
          className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] pointer-events-none"
        />
      </div>
    </motion.div>
  );
};

export default CinematicAvatarDock;
