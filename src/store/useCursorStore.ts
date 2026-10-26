import { create } from 'zustand';

type CursorVariant = 'default' | 'hover' | 'text' | 'hidden';

interface CursorState {
  /** Vị trí chuột thực tế */
  position: { x: number; y: number };

  /** Variant hiện tại của cursor */
  variant: CursorVariant;

  /** Cập nhật vị trí chuột — gọi từ mousemove event */
  setPosition: (x: number, y: number) => void;

  /** Thay đổi variant */
  setVariant: (variant: CursorVariant) => void;
}

/**
 * Global cursor store — Zustand
 * Quản lý vị trí và trạng thái của custom cursor.
 * Được sử dụng bởi CustomCursor component và các interactive elements.
 */
export const useCursorStore = create<CursorState>((set) => ({
  position: { x: 0, y: 0 },
  variant: 'default',

  setPosition: (x, y) => set({ position: { x, y } }),
  setVariant: (variant) => set({ variant }),
}));
