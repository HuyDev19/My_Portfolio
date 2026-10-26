import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useCursorStore } from '../../store/useCursorStore';

interface MagneticProps {
  children: React.ReactElement;
  hoverVariant?: 'hover' | 'default' | 'hidden';
}

export default function Magnetic({ children, hoverVariant = 'hover' }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const setVariant = useCursorStore(state => state.setVariant);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Magnetic intensity - how far the element moves towards the mouse
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
    setVariant('default');
  };

  const onMouseEnter = () => {
    setVariant(hoverVariant);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onMouseEnter={onMouseEnter}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
