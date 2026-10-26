import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useCursorStore } from '../../store/useCursorStore';

export default function CustomCursor() {
  const { position, variant } = useCursorStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Hide cursor on mobile/touch devices
    const checkMobile = () => setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Spring physics cho sự mượt mà
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(position.x, springConfig);
  const cursorY = useSpring(position.y, springConfig);

  useEffect(() => {
    cursorX.set(position.x);
    cursorY.set(position.y);
  }, [position, cursorX, cursorY]);

  if (isMobile) return null;

  // Sizes for different variants
  let size = 20;
  if (variant === 'hover') size = 60;
  if (variant === 'hidden') size = 0;

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full bg-white mix-blend-difference pointer-events-none z-[9999] flex items-center justify-center"
      style={{
        x: cursorX,
        y: cursorY,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
      animate={{
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Optional internal dot or text */}
      {variant === 'hover' && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-black text-[10px] font-bold tracking-widest uppercase"
        >
          VIEW
        </motion.span>
      )}
    </motion.div>
  );
}
