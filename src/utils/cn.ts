import { type ClassValue, clsx } from 'clsx';

/**
 * Utility: Merge class names conditionally.
 * Kết hợp clsx cho conditional classes.
 * 
 * Usage:
 *   cn('base-class', isActive && 'active', className)
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
