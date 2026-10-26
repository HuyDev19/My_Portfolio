import React, { useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import avatarImg from '../../../assets/card_avatar.png';

interface PhysicalIdCardProps {
  className?: string;
}

// Scannable, valid QR code SVG path for "https://github.com/HuyDev19"
const GITHUB_QR_PATH =
  'M 0,0 l 6,0 0,6 -6,0 z M 6,0 l 6,0 0,6 -6,0 z M 12,0 l 6,0 0,6 -6,0 z M 18,0 l 6,0 0,6 -6,0 z M 24,0 l 6,0 0,6 -6,0 z M 30,0 l 6,0 0,6 -6,0 z M 36,0 l 6,0 0,6 -6,0 z M 60,0 l 6,0 0,6 -6,0 z M 72,0 l 6,0 0,6 -6,0 z M 78,0 l 6,0 0,6 -6,0 z M 96,0 l 6,0 0,6 -6,0 z M 108,0 l 6,0 0,6 -6,0 z M 114,0 l 6,0 0,6 -6,0 z M 120,0 l 6,0 0,6 -6,0 z M 126,0 l 6,0 0,6 -6,0 z M 132,0 l 6,0 0,6 -6,0 z M 138,0 l 6,0 0,6 -6,0 z M 144,0 l 6,0 0,6 -6,0 z M 0,6 l 6,0 0,6 -6,0 z M 36,6 l 6,0 0,6 -6,0 z M 48,6 l 6,0 0,6 -6,0 z M 60,6 l 6,0 0,6 -6,0 z M 84,6 l 6,0 0,6 -6,0 z M 90,6 l 6,0 0,6 -6,0 z M 96,6 l 6,0 0,6 -6,0 z M 108,6 l 6,0 0,6 -6,0 z M 144,6 l 6,0 0,6 -6,0 z M 0,12 l 6,0 0,6 -6,0 z M 12,12 l 6,0 0,6 -6,0 z M 18,12 l 6,0 0,6 -6,0 z M 24,12 l 6,0 0,6 -6,0 z M 36,12 l 6,0 0,6 -6,0 z M 72,12 l 6,0 0,6 -6,0 z M 84,12 l 6,0 0,6 -6,0 z M 96,12 l 6,0 0,6 -6,0 z M 108,12 l 6,0 0,6 -6,0 z M 120,12 l 6,0 0,6 -6,0 z M 126,12 l 6,0 0,6 -6,0 z M 132,12 l 6,0 0,6 -6,0 z M 144,12 l 6,0 0,6 -6,0 z M 0,18 l 6,0 0,6 -6,0 z M 12,18 l 6,0 0,6 -6,0 z M 18,18 l 6,0 0,6 -6,0 z M 24,18 l 6,0 0,6 -6,0 z M 36,18 l 6,0 0,6 -6,0 z M 48,18 l 6,0 0,6 -6,0 z M 54,18 l 6,0 0,6 -6,0 z M 60,18 l 6,0 0,6 -6,0 z M 72,18 l 6,0 0,6 -6,0 z M 78,18 l 6,0 0,6 -6,0 z M 108,18 l 6,0 0,6 -6,0 z M 120,18 l 6,0 0,6 -6,0 z M 126,18 l 6,0 0,6 -6,0 z M 132,18 l 6,0 0,6 -6,0 z M 144,18 l 6,0 0,6 -6,0 z M 0,24 l 6,0 0,6 -6,0 z M 12,24 l 6,0 0,6 -6,0 z M 18,24 l 6,0 0,6 -6,0 z M 24,24 l 6,0 0,6 -6,0 z M 36,24 l 6,0 0,6 -6,0 z M 54,24 l 6,0 0,6 -6,0 z M 78,24 l 6,0 0,6 -6,0 z M 96,24 l 6,0 0,6 -6,0 z M 108,24 l 6,0 0,6 -6,0 z M 120,24 l 6,0 0,6 -6,0 z M 126,24 l 6,0 0,6 -6,0 z M 132,24 l 6,0 0,6 -6,0 z M 144,24 l 6,0 0,6 -6,0 z M 0,30 l 6,0 0,6 -6,0 z M 36,30 l 6,0 0,6 -6,0 z M 48,30 l 6,0 0,6 -6,0 z M 54,30 l 6,0 0,6 -6,0 z M 66,30 l 6,0 0,6 -6,0 z M 72,30 l 6,0 0,6 -6,0 z M 78,30 l 6,0 0,6 -6,0 z M 84,30 l 6,0 0,6 -6,0 z M 90,30 l 6,0 0,6 -6,0 z M 96,30 l 6,0 0,6 -6,0 z M 108,30 l 6,0 0,6 -6,0 z M 144,30 l 6,0 0,6 -6,0 z M 0,36 l 6,0 0,6 -6,0 z M 6,36 l 6,0 0,6 -6,0 z M 12,36 l 6,0 0,6 -6,0 z M 18,36 l 6,0 0,6 -6,0 z M 24,36 l 6,0 0,6 -6,0 z M 30,36 l 6,0 0,6 -6,0 z M 36,36 l 6,0 0,6 -6,0 z M 48,36 l 6,0 0,6 -6,0 z M 60,36 l 6,0 0,6 -6,0 z M 72,36 l 6,0 0,6 -6,0 z M 84,36 l 6,0 0,6 -6,0 z M 96,36 l 6,0 0,6 -6,0 z M 108,36 l 6,0 0,6 -6,0 z M 114,36 l 6,0 0,6 -6,0 z M 120,36 l 6,0 0,6 -6,0 z M 126,36 l 6,0 0,6 -6,0 z M 132,36 l 6,0 0,6 -6,0 z M 138,36 l 6,0 0,6 -6,0 z M 144,36 l 6,0 0,6 -6,0 z M 54,42 l 6,0 0,6 -6,0 z M 60,42 l 6,0 0,6 -6,0 z M 66,42 l 6,0 0,6 -6,0 z M 84,42 l 6,0 0,6 -6,0 z M 0,48 l 6,0 0,6 -6,0 z M 6,48 l 6,0 0,6 -6,0 z M 12,48 l 6,0 0,6 -6,0 z M 18,48 l 6,0 0,6 -6,0 z M 24,48 l 6,0 0,6 -6,0 z M 36,48 l 6,0 0,6 -6,0 z M 42,48 l 6,0 0,6 -6,0 z M 48,48 l 6,0 0,6 -6,0 z M 54,48 l 6,0 0,6 -6,0 z M 66,48 l 6,0 0,6 -6,0 z M 72,48 l 6,0 0,6 -6,0 z M 84,48 l 6,0 0,6 -6,0 z M 90,48 l 6,0 0,6 -6,0 z M 102,48 l 6,0 0,6 -6,0 z M 114,48 l 6,0 0,6 -6,0 z M 126,48 l 6,0 0,6 -6,0 z M 138,48 l 6,0 0,6 -6,0 z M 6,54 l 6,0 0,6 -6,0 z M 18,54 l 6,0 0,6 -6,0 z M 24,54 l 6,0 0,6 -6,0 z M 30,54 l 6,0 0,6 -6,0 z M 48,54 l 6,0 0,6 -6,0 z M 60,54 l 6,0 0,6 -6,0 z M 72,54 l 6,0 0,6 -6,0 z M 78,54 l 6,0 0,6 -6,0 z M 96,54 l 6,0 0,6 -6,0 z M 114,54 l 6,0 0,6 -6,0 z M 138,54 l 6,0 0,6 -6,0 z M 6,60 l 6,0 0,6 -6,0 z M 12,60 l 6,0 0,6 -6,0 z M 18,60 l 6,0 0,6 -6,0 z M 24,60 l 6,0 0,6 -6,0 z M 30,60 l 6,0 0,6 -6,0 z M 36,60 l 6,0 0,6 -6,0 z M 48,60 l 6,0 0,6 -6,0 z M 60,60 l 6,0 0,6 -6,0 z M 90,60 l 6,0 0,6 -6,0 z M 114,60 l 6,0 0,6 -6,0 z M 120,60 l 6,0 0,6 -6,0 z M 126,60 l 6,0 0,6 -6,0 z M 138,60 l 6,0 0,6 -6,0 z M 144,60 l 6,0 0,6 -6,0 z M 0,66 l 6,0 0,6 -6,0 z M 6,66 l 6,0 0,6 -6,0 z M 12,66 l 6,0 0,6 -6,0 z M 48,66 l 6,0 0,6 -6,0 z M 72,66 l 6,0 0,6 -6,0 z M 96,66 l 6,0 0,6 -6,0 z M 102,66 l 6,0 0,6 -6,0 z M 108,66 l 6,0 0,6 -6,0 z M 114,66 l 6,0 0,6 -6,0 z M 144,66 l 6,0 0,6 -6,0 z M 0,72 l 6,0 0,6 -6,0 z M 18,72 l 6,0 0,6 -6,0 z M 24,72 l 6,0 0,6 -6,0 z M 30,72 l 6,0 0,6 -6,0 z M 36,72 l 6,0 0,6 -6,0 z M 48,72 l 6,0 0,6 -6,0 z M 54,72 l 6,0 0,6 -6,0 z M 60,72 l 6,0 0,6 -6,0 z M 66,72 l 6,0 0,6 -6,0 z M 78,72 l 6,0 0,6 -6,0 z M 84,72 l 6,0 0,6 -6,0 z M 102,72 l 6,0 0,6 -6,0 z M 108,72 l 6,0 0,6 -6,0 z M 120,72 l 6,0 0,6 -6,0 z M 132,72 l 6,0 0,6 -6,0 z M 138,72 l 6,0 0,6 -6,0 z M 144,72 l 6,0 0,6 -6,0 z M 0,78 l 6,0 0,6 -6,0 z M 6,78 l 6,0 0,6 -6,0 z M 18,78 l 6,0 0,6 -6,0 z M 30,78 l 6,0 0,6 -6,0 z M 42,78 l 6,0 0,6 -6,0 z M 54,78 l 6,0 0,6 -6,0 z M 66,78 l 6,0 0,6 -6,0 z M 72,78 l 6,0 0,6 -6,0 z M 84,78 l 6,0 0,6 -6,0 z M 102,78 l 6,0 0,6 -6,0 z M 114,78 l 6,0 0,6 -6,0 z M 126,78 l 6,0 0,6 -6,0 z M 138,78 l 6,0 0,6 -6,0 z M 0,84 l 6,0 0,6 -6,0 z M 12,84 l 6,0 0,6 -6,0 z M 30,84 l 6,0 0,6 -6,0 z M 36,84 l 6,0 0,6 -6,0 z M 48,84 l 6,0 0,6 -6,0 z M 54,84 l 6,0 0,6 -6,0 z M 84,84 l 6,0 0,6 -6,0 z M 90,84 l 6,0 0,6 -6,0 z M 102,84 l 6,0 0,6 -6,0 z M 108,84 l 6,0 0,6 -6,0 z M 114,84 l 6,0 0,6 -6,0 z M 120,84 l 6,0 0,6 -6,0 z M 126,84 l 6,0 0,6 -6,0 z M 138,84 l 6,0 0,6 -6,0 z M 144,84 l 6,0 0,6 -6,0 z M 0,90 l 6,0 0,6 -6,0 z M 18,90 l 6,0 0,6 -6,0 z M 30,90 l 6,0 0,6 -6,0 z M 42,90 l 6,0 0,6 -6,0 z M 48,90 l 6,0 0,6 -6,0 z M 54,90 l 6,0 0,6 -6,0 z M 72,90 l 6,0 0,6 -6,0 z M 84,90 l 6,0 0,6 -6,0 z M 108,90 l 6,0 0,6 -6,0 z M 114,90 l 6,0 0,6 -6,0 z M 120,90 l 6,0 0,6 -6,0 z M 144,90 l 6,0 0,6 -6,0 z M 0,96 l 6,0 0,6 -6,0 z M 12,96 l 6,0 0,6 -6,0 z M 18,96 l 6,0 0,6 -6,0 z M 24,96 l 6,0 0,6 -6,0 z M 30,96 l 6,0 0,6 -6,0 z M 36,96 l 6,0 0,6 -6,0 z M 48,96 l 6,0 0,6 -6,0 z M 54,96 l 6,0 0,6 -6,0 z M 60,96 l 6,0 0,6 -6,0 z M 78,96 l 6,0 0,6 -6,0 z M 84,96 l 6,0 0,6 -6,0 z M 90,96 l 6,0 0,6 -6,0 z M 96,96 l 6,0 0,6 -6,0 z M 102,96 l 6,0 0,6 -6,0 z M 108,96 l 6,0 0,6 -6,0 z M 114,96 l 6,0 0,6 -6,0 z M 120,96 l 6,0 0,6 -6,0 z M 132,96 l 6,0 0,6 -6,0 z M 48,102 l 6,0 0,6 -6,0 z M 60,102 l 6,0 0,6 -6,0 z M 66,102 l 6,0 0,6 -6,0 z M 72,102 l 6,0 0,6 -6,0 z M 78,102 l 6,0 0,6 -6,0 z M 84,102 l 6,0 0,6 -6,0 z M 90,102 l 6,0 0,6 -6,0 z M 96,102 l 6,0 0,6 -6,0 z M 120,102 l 6,0 0,6 -6,0 z M 126,102 l 6,0 0,6 -6,0 z M 0,108 l 6,0 0,6 -6,0 z M 6,108 l 6,0 0,6 -6,0 z M 12,108 l 6,0 0,6 -6,0 z M 18,108 l 6,0 0,6 -6,0 z M 24,108 l 6,0 0,6 -6,0 z M 30,108 l 6,0 0,6 -6,0 z M 36,108 l 6,0 0,6 -6,0 z M 48,108 l 6,0 0,6 -6,0 z M 72,108 l 6,0 0,6 -6,0 z M 96,108 l 6,0 0,6 -6,0 z M 108,108 l 6,0 0,6 -6,0 z M 120,108 l 6,0 0,6 -6,0 z M 132,108 l 6,0 0,6 -6,0 z M 138,108 l 6,0 0,6 -6,0 z M 144,108 l 6,0 0,6 -6,0 z M 0,114 l 6,0 0,6 -6,0 z M 36,114 l 6,0 0,6 -6,0 z M 54,114 l 6,0 0,6 -6,0 z M 60,114 l 6,0 0,6 -6,0 z M 66,114 l 6,0 0,6 -6,0 z M 84,114 l 6,0 0,6 -6,0 z M 96,114 l 6,0 0,6 -6,0 z M 120,114 l 6,0 0,6 -6,0 z M 126,114 l 6,0 0,6 -6,0 z M 138,114 l 6,0 0,6 -6,0 z M 0,120 l 6,0 0,6 -6,0 z M 12,120 l 6,0 0,6 -6,0 z M 18,120 l 6,0 0,6 -6,0 z M 24,120 l 6,0 0,6 -6,0 z M 36,120 l 6,0 0,6 -6,0 z M 48,120 l 6,0 0,6 -6,0 z M 60,120 l 6,0 0,6 -6,0 z M 84,120 l 6,0 0,6 -6,0 z M 90,120 l 6,0 0,6 -6,0 z M 96,120 l 6,0 0,6 -6,0 z M 102,120 l 6,0 0,6 -6,0 z M 108,120 l 6,0 0,6 -6,0 z M 114,120 l 6,0 0,6 -6,0 z M 120,120 l 6,0 0,6 -6,0 z M 132,120 l 6,0 0,6 -6,0 z M 0,126 l 6,0 0,6 -6,0 z M 12,126 l 6,0 0,6 -6,0 z M 18,126 l 6,0 0,6 -6,0 z M 24,126 l 6,0 0,6 -6,0 z M 36,126 l 6,0 0,6 -6,0 z M 48,126 l 6,0 0,6 -6,0 z M 66,126 l 6,0 0,6 -6,0 z M 102,126 l 6,0 0,6 -6,0 z M 108,126 l 6,0 0,6 -6,0 z M 120,126 l 6,0 0,6 -6,0 z M 126,126 l 6,0 0,6 -6,0 z M 132,126 l 6,0 0,6 -6,0 z M 138,126 l 6,0 0,6 -6,0 z M 144,126 l 6,0 0,6 -6,0 z M 0,132 l 6,0 0,6 -6,0 z M 12,132 l 6,0 0,6 -6,0 z M 18,132 l 6,0 0,6 -6,0 z M 24,132 l 6,0 0,6 -6,0 z M 36,132 l 6,0 0,6 -6,0 z M 48,132 l 6,0 0,6 -6,0 z M 54,132 l 6,0 0,6 -6,0 z M 60,132 l 6,0 0,6 -6,0 z M 84,132 l 6,0 0,6 -6,0 z M 126,132 l 6,0 0,6 -6,0 z M 132,132 l 6,0 0,6 -6,0 z M 144,132 l 6,0 0,6 -6,0 z M 0,138 l 6,0 0,6 -6,0 z M 36,138 l 6,0 0,6 -6,0 z M 48,138 l 6,0 0,6 -6,0 z M 96,138 l 6,0 0,6 -6,0 z M 114,138 l 6,0 0,6 -6,0 z M 120,138 l 6,0 0,6 -6,0 z M 126,138 l 6,0 0,6 -6,0 z M 144,138 l 6,0 0,6 -6,0 z M 0,144 l 6,0 0,6 -6,0 z M 6,144 l 6,0 0,6 -6,0 z M 12,144 l 6,0 0,6 -6,0 z M 18,144 l 6,0 0,6 -6,0 z M 24,144 l 6,0 0,6 -6,0 z M 30,144 l 6,0 0,6 -6,0 z M 36,144 l 6,0 0,6 -6,0 z M 48,144 l 6,0 0,6 -6,0 z M 72,144 l 6,0 0,6 -6,0 z M 78,144 l 6,0 0,6 -6,0 z M 84,144 l 6,0 0,6 -6,0 z M 108,144 l 6,0 0,6 -6,0 z M 114,144 l 6,0 0,6 -6,0 z M 120,144 l 6,0 0,6 -6,0 z M 126,144 l 6,0 0,6 -6,0 z M 132,144 l 6,0 0,6 -6,0 z M 138,144 l 6,0 0,6 -6,0 z M 144,144 l 6,0 0,6 -6,0 z';

export const PhysicalIdCard: React.FC<PhysicalIdCardProps> = ({ className = '' }) => {

  // Motion values directly bound to drag gesture (zero frame-lag)
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // Dragging state to seamlessly coordinate mouse tilt vs drag pendulum
  const [isDragging, setIsDragging] = useState(false);

  // Pendulum swing angle based on horizontal drag distance with organic inertia
  const rawRotateZ = useTransform(dragX, [-140, 140], [-16, 16]);
  const dragRotateZ = useSpring(rawRotateZ, { stiffness: 45, damping: 12 });

  // Gentle 3D perspective mouse tilt when hovering
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-150, 150], [6, -6]),
    { stiffness: 180, damping: 25 }
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-130, 130], [-6, 6]),
    { stiffness: 180, damping: 25 }
  );

  // ── Synchronous Dynamic SVG Lanyard ──
  // Top anchor points fixed at (55, 0) and (145, 0)
  // Bottom convergence point matches (100 + dragX, 92 + dragY) directly in the same frame!
  // Plus catenary sag calculation: soft woven drape at rest, tensioned cord when pulled
  const leftLanyardPath = useTransform([dragX, dragY], ([x, y]) => {
    const tx = x as number;
    const ty = y as number;
    const targetX = 100 + tx;
    const targetY = 92 + ty;
    const dist = Math.hypot(tx, ty);
    const slack = Math.max(0, 1 - dist / 110);
    const ctrlX = 70 + tx * 0.42 - slack * 6;
    const ctrlY = 44 + ty * 0.42 + slack * 10;
    return `M 55 0 Q ${ctrlX} ${ctrlY}, ${targetX} ${targetY}`;
  });

  const rightLanyardPath = useTransform([dragX, dragY], ([x, y]) => {
    const tx = x as number;
    const ty = y as number;
    const targetX = 100 + tx;
    const targetY = 92 + ty;
    const dist = Math.hypot(tx, ty);
    const slack = Math.max(0, 1 - dist / 110);
    const ctrlX = 130 + tx * 0.42 + slack * 6;
    const ctrlY = 44 + ty * 0.42 + slack * 10;
    return `M 145 0 Q ${ctrlX} ${ctrlY}, ${targetX} ${targetY}`;
  });

  // Clamp stays attached to top punch hole with zero lag
  const clampFollowX = dragX;
  const clampFollowY = dragY;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className={`flex flex-col items-center w-full max-w-[320px] my-auto relative select-none ${className}`}>
      {/* ── Khung Cơ Khí Kim Loại 4 Ốc Vít (Physical ID Telemetry Mount) ── */}
      <div className="relative z-20 flex flex-col items-center">
        {/* 2 ống dẫn cơ khí nối từ trên xuống 2 góc */}
        <div className="absolute -top-7 left-3 w-1.5 h-8 bg-gradient-to-b from-slate-600 to-slate-800 border-x border-slate-500 rounded-full" />
        <div className="absolute -top-7 right-3 w-1.5 h-8 bg-gradient-to-b from-slate-600 to-slate-800 border-x border-slate-500 rounded-full" />

        {/* Khối ngàm kim loại chính bo góc viền sáng 4 ốc vít */}
        <div className="relative px-5 py-2 rounded-xl bg-gradient-to-b from-[#1b253b] via-[#10192a] to-[#0a101f] border border-slate-600/90 shadow-[0_6px_20px_rgba(0,0,0,0.7)] flex items-center justify-center gap-2.5">
          {/* 4 ốc vít kim loại ở 4 góc */}
          <div className="absolute top-1.5 left-2 w-1.5 h-1.5 rounded-full bg-slate-300 border border-slate-500 shadow-inner" />
          <div className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full bg-slate-300 border border-slate-500 shadow-inner" />
          <div className="absolute bottom-1.5 left-2 w-1.5 h-1.5 rounded-full bg-slate-300 border border-slate-500 shadow-inner" />
          <div className="absolute bottom-1.5 right-2 w-1.5 h-1.5 rounded-full bg-slate-300 border border-slate-500 shadow-inner" />

          {/* Đèn báo xanh ngọc phát sáng */}
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
          <span className="text-[10px] font-mono tracking-[0.25em] text-slate-200 uppercase font-bold">
            PHYSICAL ID TELEMETRY
          </span>
        </div>

        {/* 2 khuyên móc kim loại phía dưới đáy ngàm làm điểm neo trực tiếp cho 2 đầu dây đeo */}
        <div className="flex justify-between w-[92px] -mt-0.5 pointer-events-none z-10">
          <div className="w-3.5 h-3 rounded-b-md border-b-2 border-x-2 border-slate-400 bg-slate-800 shadow-md" />
          <div className="w-3.5 h-3 rounded-b-md border-b-2 border-x-2 border-slate-400 bg-slate-800 shadow-md" />
        </div>
      </div>

      {/* ── Container dây đeo và thẻ vật lý: chui khít vào dưới ngàm (-mt-4 relative z-10) ── */}
      <div
        className="-mt-4 relative z-10 flex flex-col items-center w-full"
        style={{ perspective: 1000 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Dây đeo SVG cố định 2 đỉnh trên, đỉnh dưới co dãn động theo thẻ */}
        <svg
          className="w-52 h-28 -mb-5 relative z-20 pointer-events-none overflow-visible"
          viewBox="0 0 200 115"
          fill="none"
        >
          {/* Dây bên trái: nền vải dệt sẫm + chỉ dạ quang trung tâm */}
          <motion.path d={leftLanyardPath} stroke="#1e293b" strokeWidth="10" strokeLinecap="round" />
          <motion.path d={leftLanyardPath} stroke="#334155" strokeWidth="2" strokeLinecap="round" />

          {/* Dây bên phải: nền vải dệt sẫm + chỉ dạ quang trung tâm */}
          <motion.path d={rightLanyardPath} stroke="#1e293b" strokeWidth="10" strokeLinecap="round" />
          <motion.path d={rightLanyardPath} stroke="#334155" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Kẹp kim loại hình trụ bạc nghiêng nhẹ + Khuyên tròn gắn chặt vào lỗ xỏ */}
        <motion.div
          style={{ x: clampFollowX, y: clampFollowY }}
          className="relative z-30 flex flex-col items-center -mb-3.5 rotate-[14deg] pointer-events-none"
        >
          <div className="w-3.5 h-5 rounded-sm bg-gradient-to-r from-slate-300 via-white to-slate-400 shadow-md border border-slate-300" />
          <div className="w-2.5 h-2.5 rounded-full border-2 border-slate-200 -mt-1 bg-transparent" />
        </motion.div>

        {/* Thân Thẻ ID Vật Lý với độ đàn hồi mượt mà & không khựng */}
        <motion.div
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.45}
          dragTransition={{
            bounceStiffness: 45,
            bounceDamping: 13,
            power: 0.08,
            timeConstant: 350,
          }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          style={{
            x: dragX,
            y: dragY,
            rotateX: isDragging ? 0 : rotateX,
            rotateY: isDragging ? 0 : rotateY,
            rotateZ: dragRotateZ,
            transformStyle: 'preserve-3d',
            transformOrigin: '50% 0%',
          }}
          whileDrag={{ scale: 1.03, cursor: 'grabbing' }}
          className="w-[250px] rounded-[20px] bg-[#0b101b] border border-slate-800/90 shadow-[0_25px_50px_rgba(0,0,0,0.85)] overflow-hidden relative z-10 cursor-grab"
        >
          {/* Lỗ khoét đeo thẻ hình viên thuốc ở chính giữa đỉnh thẻ */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-11 h-2.5 rounded-full bg-[#060911] border border-slate-800/80 z-30 shadow-inner" />

          {/* Phần Ảnh Chân Dung */}
          <div className="relative h-[245px] w-full overflow-hidden bg-[#070b14]">
            <img
              src={avatarImg}
              alt="Huỳnh Nhất Huy"
              className="w-full h-full object-cover object-top pointer-events-none relative z-10"
            />
            {/* Con dấu OFFICIAL ID màu đỏ nghiêng ở góc trái trên */}
            <div className="absolute top-6 left-3 -rotate-[12deg] border border-red-500/60 bg-red-950/30 backdrop-blur-[2px] px-3 py-1 rounded-[4px] z-20">
              <span className="text-[9px] font-mono tracking-[0.22em] text-red-400 font-semibold uppercase">
                OFFICIAL ID
              </span>
            </div>
          </div>

          {/* Phần Thông Tin Dưới Đáy Thẻ */}
          <div className="p-4 bg-[#0b101b] border-t border-slate-800/80">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[10px] font-mono tracking-[0.15em] text-slate-400 mb-0.5">
                  ID // HNH-2025
                </p>
                <h3 className="text-[19px] font-bold text-white tracking-tight leading-none whitespace-nowrap">
                  Huynh Nhat Huy
                </h3>
              </div>

              {/* [Mã QR Tương tác kết nối GitHub HuyDev19 thay cho LEVEL 4] */}
              <a
                href="https://github.com/HuyDev19"
                target="_blank"
                rel="noopener noreferrer"
                title="Scan or click to open GitHub: HuyDev19"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                className="w-10 h-10 p-1 bg-white/95 rounded-md border border-emerald-500/50 hover:border-emerald-400 hover:scale-105 hover:shadow-[0_0_12px_rgba(16,185,129,0.5)] transition-all cursor-pointer group relative overflow-hidden flex items-center justify-center shrink-0"
              >
                <svg
                  viewBox="0 0 150 150"
                  className="w-full h-full text-slate-950"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d={GITHUB_QR_PATH} />
                </svg>
              </a>
            </div>

            <div className="pt-2.5 border-t border-slate-800/70 flex items-center justify-between text-[9px] font-mono tracking-[0.05em] whitespace-nowrap">
              <span className="text-slate-400 uppercase">FRONTEND DEVELOPER</span>
              <span className="text-emerald-400 font-semibold">GPA 3.2 / 4.0</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── 3 dòng chữ Telemetry bên dưới Thẻ ID ── */}
      <div className="mt-7 text-center space-y-2 select-none">
        <div className="flex items-center justify-center gap-2 text-[10px] font-mono tracking-[0.25em] text-slate-400 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
          <span>SUBJECT // HUYNH NHAT HUY</span>
        </div>
        <div className="text-[9px] font-mono tracking-[0.22em] text-slate-500 uppercase">
          CLEARANCE: VERIFIED — FRONTEND ENG
        </div>
        <div className="text-[9px] font-mono tracking-[0.25em] text-slate-500 uppercase pt-1">
          [ DRAG TO INTERACT ]
        </div>
      </div>
    </div>
  );
};

export default PhysicalIdCard;
