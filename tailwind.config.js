/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    /* ─── 12-Column Grid Container ─── */
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",  // 24px — gap mặc định
        sm: "1.5rem",
        lg: "2rem",
        xl: "2rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",    // Max-width chuẩn Context.md
      },
    },

    extend: {
      /* ─── Midnight Slate Color Palette ─── */
      colors: {
        surface: {
          light: "#FAFAFA",       // Off-White / Alabaster
          "light-alt": "#F4F4F5", // Zinc-100 variant
          dark: "#0B1120",        // Midnight Slate
          "dark-elevated": "#1E293B", // Card/Modal surfaces
          "dark-subtle": "#0F172A",   // Slightly lighter than dark
        },
        content: {
          primary: {
            light: "#18181B",     // Xám Than — text chính light mode
            dark: "#F8FAFC",      // Trắng đục — text chính dark mode
          },
          secondary: {
            light: "#3F3F46",     // Zinc-700
            dark: "#94A3B8",      // Slate-400
          },
          muted: {
            light: "#71717A",     // Zinc-500
            dark: "#64748B",      // Slate-500
          },
        },
        accent: {
          silver: "#94A3B8",      // Bạc sáng — viền, subtle highlights
          teal: "#2DD4BF",        // Xanh lơ tĩnh lặng — điểm nhấn vi mô
          "teal-dim": "#14B8A6",  // Teal darker variant for hover
        },
        border: {
          light: "#E4E4E7",       // Zinc-200
          dark: "#1E293B",        // Slate-800
        },
      },

      /* ─── Fluid Typography (clamp) ─── */
      fontSize: {
        // Display — Hero headlines
        "display-xl": [
          "clamp(3rem, 6vw + 1rem, 6rem)",    // 48px → 96px
          { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        "display-lg": [
          "clamp(2.5rem, 5vw + 0.5rem, 4.5rem)", // 40px → 72px
          { lineHeight: "1.08", letterSpacing: "-0.025em", fontWeight: "700" },
        ],
        "display-md": [
          "clamp(2rem, 3.5vw + 0.5rem, 3.5rem)",  // 32px → 56px
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" },
        ],

        // Heading — Section titles
        "heading-xl": [
          "clamp(1.75rem, 2.5vw + 0.5rem, 2.5rem)", // 28px → 40px
          { lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "600" },
        ],
        "heading-lg": [
          "clamp(1.5rem, 2vw + 0.25rem, 2rem)",      // 24px → 32px
          { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        "heading-md": [
          "clamp(1.25rem, 1.5vw + 0.25rem, 1.5rem)",  // 20px → 24px
          { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "500" },
        ],

        // Body — Paragraph text
        "body-lg": [
          "clamp(1.0625rem, 0.5vw + 0.875rem, 1.25rem)", // 17px → 20px
          { lineHeight: "1.65", fontWeight: "400" },
        ],
        "body-md": [
          "clamp(0.9375rem, 0.3vw + 0.8125rem, 1.0625rem)", // 15px → 17px
          { lineHeight: "1.6", fontWeight: "400" },
        ],
        "body-sm": [
          "clamp(0.8125rem, 0.2vw + 0.75rem, 0.875rem)", // 13px → 14px
          { lineHeight: "1.5", fontWeight: "400" },
        ],

        // Label/Caption
        "label": [
          "0.75rem",  // 12px — fixed, no fluid needed
          { lineHeight: "1.4", letterSpacing: "0.05em", fontWeight: "500" },
        ],
      },

      /* ─── 8pt Spacing System ─── */
      spacing: {
        "0.5": "0.125rem",  // 2px
        "1": "0.25rem",     // 4px
        "2": "0.5rem",      // 8px
        "3": "0.75rem",     // 12px
        "4": "1rem",        // 16px
        "5": "1.25rem",     // 20px
        "6": "1.5rem",      // 24px
        "8": "2rem",        // 32px
        "10": "2.5rem",     // 40px
        "12": "3rem",       // 48px
        "14": "3.5rem",     // 56px
        "16": "4rem",       // 64px
        "20": "5rem",       // 80px
        "24": "6rem",       // 96px
        "32": "8rem",       // 128px
        "40": "10rem",      // 160px
        "48": "12rem",      // 192px
        "56": "14rem",      // 224px
        "64": "16rem",      // 256px
        "72": "18rem",      // 288px
        "80": "20rem",      // 320px
        "96": "24rem",      // 384px
      },

      /* ─── Grid — 12 Columns ─── */
      gridTemplateColumns: {
        "layout": "repeat(12, minmax(0, 1fr))",
      },
      gap: {
        "grid": "1.5rem", // 24px — gap chuẩn Context.md
      },

      /* ─── Font Family ─── */
      fontFamily: {
        sans: ['"Inter"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        display: ['"Space Grotesk"', '"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },

      /* ─── Border Radius (rounded, premium feel) ─── */
      borderRadius: {
        "sm": "0.375rem",   // 6px
        "md": "0.5rem",     // 8px
        "lg": "0.75rem",    // 12px
        "xl": "1rem",       // 16px
        "2xl": "1.5rem",    // 24px
      },

      /* ─── Transition Defaults ─── */
      transitionDuration: {
        "DEFAULT": "300ms",
        "fast": "150ms",
        "slow": "500ms",
        "slower": "700ms",
      },
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.16, 1, 0.3, 1)",     // Expo out — mượt cho UI
        "bounce": "cubic-bezier(0.34, 1.56, 0.64, 1)",  // Overshoot nhẹ
      },

      /* ─── Z-Index Scale ─── */
      zIndex: {
        "cursor": "9999",
        "modal": "100",
        "header": "50",
        "overlay": "40",
      },

      /* ─── Backdrop Blur ─── */
      backdropBlur: {
        "nav": "16px",
      },
    },
  },
  plugins: [],
};
