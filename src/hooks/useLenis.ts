import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Hook: useLenis
 * Khởi tạo Lenis smooth scroll instance và tự cleanup khi unmount.
 * Trả về ref tới Lenis instance để có thể điều khiển (scrollTo, stop, v.v.)
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo easing
      touchMultiplier: 2,
      smoothWheel: true,
      wheelMultiplier: 0.8,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
