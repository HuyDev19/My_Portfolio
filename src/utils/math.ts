/**
 * Clamp a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation (lerp) giữa hai giá trị.
 * Dùng cho smooth cursor movement, parallax, v.v.
 * 
 * @param start - Giá trị bắt đầu
 * @param end - Giá trị kết thúc
 * @param factor - Hệ số nội suy (0 → 1)
 */
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

/**
 * Map một giá trị từ range này sang range khác.
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
