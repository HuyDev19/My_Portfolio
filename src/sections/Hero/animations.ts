import type { Variants } from 'framer-motion';

/* ═══════════════════════════════════════════
   Hero Section — Framer Motion Variants
   ═══════════════════════════════════════════ */

/** Stagger container — orchestrates children reveal */
export const heroContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

/** Text reveal — clip từ dưới lên */
export const textRevealVariants: Variants = {
  hidden: {
    y: '100%',
    opacity: 0,
  },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // Expo out
    },
  },
};

/** Fade in + slide up nhẹ — cho body text, CTA */
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/** Signal line — scaleX reveal */
export const signalLineVariants: Variants = {
  hidden: {
    scaleX: 0,
  },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.5,
    },
  },
};

/** Avatar — scale + fade */
export const avatarVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.3,
    },
  },
};

/** Social icons — stagger in */
export const socialContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.9,
    },
  },
};

export const socialItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/** Scroll indicator — continuous bounce */
export const scrollIndicatorVariants: Variants = {
  animate: {
    y: [0, 8, 0],
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};
