import { useEffect, useCallback } from 'react';
import { useCursorStore } from '../store/useCursorStore';

/**
 * Hook: useMouse
 * Theo dõi vị trí chuột và cập nhật vào Zustand cursor store.
 * Chỉ gọi 1 lần ở root level (App.tsx).
 */
export function useMouse() {
  const setPosition = useCursorStore((state) => state.setPosition);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      setPosition(e.clientX, e.clientY);
    },
    [setPosition]
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);
}
