/* ═══════════════════════════════════════════
   Hero Section — Scoped Styles (CSS-in-JS object)
   ═══════════════════════════════════════════ */

/**
 * Signal line glow effect — subtle teal glow dưới tên.
 * Dùng box-shadow thay vì filter để tránh layout thrashing.
 */
export const signalLineGlow = {
  boxShadow: '0 0 24px rgba(45, 212, 191, 0.15), 0 0 8px rgba(45, 212, 191, 0.1)',
} as const;

/**
 * Avatar placeholder gradient — sẽ thay bằng ảnh thật sau.
 */
export const avatarPlaceholderStyle = {
  background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 50%, #1E293B 100%)',
} as const;
