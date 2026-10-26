import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  heroContainerVariants,
  fadeUpVariants,
  avatarVariants,
  socialContainerVariants,
  socialItemVariants,
  scrollIndicatorVariants,
} from './animations';
import avatarImg from '../../assets/avatar.png';

/* ─── Social Links Data ─── */
const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
] as const;

/* ─── Shared UI Blocks ─── */
function LeftBlock() {
  return (
    <div className="flex flex-col gap-5 pointer-events-auto">
      {/* Name (Editorial Serif) */}
      <motion.div variants={fadeUpVariants}>
        <div className="flex flex-col text-left mt-8 md:mt-0 relative z-10">
          <h1 className="text-5xl md:text-6xl lg:text-[5rem] leading-[1] md:leading-[0.95] font-serif font-black uppercase text-white tracking-tight">
            HUYNH <br />
            NHAT HUY
          </h1>
        </div>
      </motion.div>

      {/* Location Badge */}
      <motion.div variants={fadeUpVariants}>
        <div className="inline-flex items-center gap-3 px-4 py-2.5
          bg-white/10
          rounded-full"
        >
          <span className="text-body-sm font-medium leading-tight
            text-white">
            Based in<br />Hồ Chí Minh
          </span>
          <div className="w-8 h-8 rounded-full
            bg-white/20
            flex items-center justify-center shrink-0"
          >
            <svg className="w-4 h-4 text-content-primary-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Social Links */}
      <motion.div
        variants={socialContainerVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center gap-3"
      >
        {SOCIAL_LINKS.map((social) => (
          <motion.a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            variants={socialItemVariants}
            className="flex items-center justify-center w-10 h-10 rounded-full
              border border-white/20
              text-slate-400
              hover:text-accent-teal hover:border-accent-teal/50
              transition-all duration-300 ease-smooth"
            aria-label={social.label}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {social.icon}
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}

function TypewriterLoop({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");
  const [phase, setPhase] = useState<"TYPING" | "PAUSED" | "DELETING">("TYPING");

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "TYPING") {
      if (displayedText.length < text.length) {
        timeout = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length + 1));
        }, 50);
      } else {
        setPhase("PAUSED");
      }
    } else if (phase === "PAUSED") {
      timeout = setTimeout(() => {
        setPhase("DELETING");
      }, 3500);
    } else if (phase === "DELETING") {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length - 1));
        }, 20);
      } else {
        timeout = setTimeout(() => {
          setPhase("TYPING");
        }, 500);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, phase, text]);

  return (
    <>
      {displayedText}
      <span className="inline-block w-[0.4rem] h-[1em] bg-white ml-[2px] animate-pulse align-middle translate-y-[-1px]"></span>
    </>
  );
}

function RightBlock({ align = 'left' }: { align?: 'left' | 'right' }) {
  return (
    <div className={`flex flex-col gap-5 pointer-events-auto
      ${align === 'right' ? 'items-end text-right' : 'items-start text-left'}`}
    >


      <div className="flex flex-col items-start text-left w-full max-w-md">
        {/* Tiêu đề phụ (Không có border trên) */}
        <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-black uppercase text-white leading-tight tracking-tight">
          Frontend <br /> Developer
        </h2>

        {/* Đường kẻ ngang (Divider) */}
        <div className="w-full h-[1px] bg-white/30 mt-4 mb-5 md:mt-5 md:mb-6"></div>

        {/* THẺ BỌC TEXT (Đã khóa chiều cao) */}
        <motion.div
          variants={fadeUpVariants}
          className="w-full min-h-[96px] mb-6"
        >
          <p className="font-mono text-[14px] md:text-[15px] leading-relaxed text-slate-300 m-0 w-full text-left break-words">
            <TypewriterLoop text="Crafting high-performance web environments where scalable UI meets seamless real-time connectivity." />
          </p>
        </motion.div>

        {/* Nút bấm CTA */}
        <motion.div
          variants={fadeUpVariants}
          className="flex gap-4 items-center mt-auto"
        >
          <button className="px-6 py-2.5 rounded-full border border-white/20 hover:bg-white hover:text-slate-900 transition-all duration-300 font-sans font-medium text-sm flex items-center gap-2">
            Explore Works ↗
          </button>
          <button className="px-4 py-2.5 text-sm font-sans font-medium text-slate-300 hover:text-white relative after:content-[''] after:absolute after:bottom-1 after:left-4 after:w-0 after:h-[1px] after:bg-white hover:after:w-[calc(100%-2rem)] after:transition-all after:duration-300">
            Let's Talk
          </button>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Deep Space Dust / Stardust Particles ─── */
const HERO_STARS = [
  { top: '12%', left: '14%', size: 2, delay: 0, duration: 4, color: '#e0f2fe' },
  { top: '22%', left: '26%', size: 1.5, delay: 1.2, duration: 3.5, color: '#38bdf8' },
  { top: '16%', left: '74%', size: 2.2, delay: 0.5, duration: 5, color: '#e0f2fe' },
  { top: '32%', left: '86%', size: 1.5, delay: 2, duration: 4, color: '#06b6d4' },
  { top: '48%', left: '8%', size: 2.5, delay: 0.8, duration: 4.2, color: '#7dd3fc' },
  { top: '65%', left: '18%', size: 1.5, delay: 1.5, duration: 3.8, color: '#ffffff' },
  { top: '28%', left: '38%', size: 1.5, delay: 2.5, duration: 4.5, color: '#e0f2fe' },
  { top: '72%', left: '84%', size: 2, delay: 1, duration: 4, color: '#38bdf8' },
  { top: '14%', left: '52%', size: 1.8, delay: 3, duration: 5, color: '#bae6fd' },
  { top: '56%', left: '92%', size: 1.5, delay: 0.3, duration: 3.2, color: '#e0f2fe' },
  { top: '8%', left: '36%', size: 1.2, delay: 1.8, duration: 4.8, color: '#ffffff' },
  { top: '42%', left: '22%', size: 1.5, delay: 2.2, duration: 3.6, color: '#06b6d4' },
  { top: '68%', left: '32%', size: 2, delay: 0.7, duration: 4.2, color: '#38bdf8' },
  { top: '38%', left: '65%', size: 1.2, delay: 1.4, duration: 3.9, color: '#e0f2fe' },
  { top: '82%', left: '14%', size: 1.5, delay: 2.7, duration: 4.1, color: '#7dd3fc' },
  { top: '24%', left: '92%', size: 2, delay: 0.9, duration: 4.6, color: '#38bdf8' },
  { top: '60%', left: '76%', size: 1.5, delay: 1.7, duration: 3.7, color: '#bae6fd' },
  { top: '85%', left: '68%', size: 2, delay: 2.1, duration: 4.3, color: '#e0f2fe' },
  { top: '52%', left: '5%', size: 1.5, delay: 1.1, duration: 3.5, color: '#38bdf8' },
  { top: '15%', left: '82%', size: 1.2, delay: 2.4, duration: 4.7, color: '#ffffff' },
  { top: '78%', left: '42%', size: 1.8, delay: 1.9, duration: 4.4, color: '#7dd3fc' },
  { top: '90%', left: '28%', size: 1.5, delay: 0.6, duration: 3.8, color: '#e0f2fe' },
];

/* ─── Main Component ─── */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  const smoothScrollY = useSpring(scrollY, { stiffness: 120, damping: 25, mass: 0.5 });

  // [Yêu cầu 1] 3D Camera Dive: Tách nhẹ hai bên chữ trái & phải
  const leftX = useTransform(smoothScrollY, [0, 380], [0, -80]);
  const leftOpacity = useTransform(smoothScrollY, [0, 260], [1, 0]);

  const rightX = useTransform(smoothScrollY, [0, 380], [0, 80]);
  const rightOpacity = useTransform(smoothScrollY, [0, 260], [1, 0]);

  // [Yêu cầu 1] Chân dung chính giữa và chữ PORTFOLIO phóng nhẹ (scale: 1 -> 1.18, y: 0 -> -60px, opacity: 1 -> 0)
  const centerScale = useTransform(smoothScrollY, [0, 420], [1, 1.18]);
  const centerY = useTransform(smoothScrollY, [0, 420], [0, -60]);
  const centerOpacity = useTransform(smoothScrollY, [0, 420], [1, 0]);

  // [Yêu cầu 1] Tối ưu GPU 60FPS: Lớp phủ tối dần thay cho filter: blur() trên thẻ cha lớn
  const overlayOpacity = useTransform(smoothScrollY, [0, 380], [0, 0.95]);

  const indicatorOpacity = useTransform(smoothScrollY, [0, 100], [1, 0]);

  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Chỉ kích hoạt ẩn Hero khi người dùng dùng Desktop (>= 768px) hoàn tất hiệu ứng Camera Dive.
      // Trên Mobile, trang cuộn dọc bình thường nên không làm mờ hoặc ẩn Hero.
      if (window.innerWidth >= 768) {
        setIsPastHero(window.scrollY > window.innerHeight * 0.9);
      } else {
        setIsPastHero(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      id="hero"
      variants={heroContainerVariants}
      initial="hidden"
      animate="visible"
      style={{
        opacity: isPastHero ? 0 : 1,
        transformOrigin: 'center center',
        visibility: isPastHero ? 'hidden' : 'visible',
        pointerEvents: isPastHero ? 'none' : 'auto',
      }}
      className="relative md:sticky md:top-0 overflow-hidden z-10 will-change-transform bg-[#060911]"
    >
      {/* ─── Global Noise / Film Grain Layer ─── */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('/noise.png')] mix-blend-difference"></div>

      {/* ─── NỀN: Bầu Trời Sao (Deep Space Dust) + Hào Quang Điện Ảnh (Cinematic Aura) + Chữ PORTFOLIO Căn Giữa ─── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Lớp bụi sao vi hạt lấp lánh (Deep Space Dust) */}
        {HERO_STARS.map((star, i) => (
          <motion.div
            key={`hero-star-${i}`}
            animate={{
              opacity: [0.15, 0.85, 0.15],
              scale: [0.8, 1.25, 0.8],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              backgroundColor: star.color,
              boxShadow: `0 0 ${star.size * 3}px ${star.color}`,
            }}
            className="absolute rounded-full pointer-events-none"
          />
        ))}

        {/* Quầng sáng tỏa điện ảnh sau chân dung (Deep Midnight Navy & Dark Indigo Aura) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Lớp hào quang chính: Deep Midnight Navy & Indigo sẫm trầm ấm */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.18, 0.32, 0.18],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] rounded-full blur-[140px] md:blur-[170px] mix-blend-screen bg-gradient-to-tr from-[#022c43] via-[#1e1b4b] to-[#0f172a]"
          />

          {/* Lớp hào quang lõi: Dark Oceanic Blue dịu mắt */}
          <motion.div
            animate={{
              scale: [1.06, 0.95, 1.06],
              opacity: [0.12, 0.24, 0.12],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-[60vw] h-[60vw] max-w-[650px] max-h-[650px] rounded-full blur-[130px] mix-blend-screen bg-gradient-to-b from-[#0369a1]/30 via-[#1e1b4b]/20 to-transparent"
          />
        </div>

        {/* Chữ PORTFOLIO khổng lồ căn CHÍNH GIỮA 100% màn hình */}
        <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
          <motion.h1
            style={{
              scale: centerScale,
              y: centerY,
              opacity: useTransform(centerOpacity, (v) => v * 0.12),
            }}
            className="font-serif text-[18vw] font-black uppercase text-white mix-blend-overlay tracking-tighter whitespace-nowrap will-change-transform select-none"
          >
            PORTFOLIO
          </motion.h1>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          MOBILE LAYOUT (<md) - Dennis Snellenberg Style
         ══════════════════════════════════════════════ */}
      <div className="md:hidden flex flex-col relative w-full bg-transparent">

        {/* === HERO FOLD (100dvh) === */}
        <div className="relative w-full h-[100dvh] flex flex-col justify-end overflow-hidden pt-20">

          {/* Layer 0: Infinite Marquee Background */}
          <div className="absolute inset-0 z-0 flex flex-col justify-center gap-8 md:gap-12 pointer-events-none overflow-hidden">
            {/* Marquee Row 1 - Name */}
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
              className="flex whitespace-nowrap w-max"
            >
              {[...Array(2)].map((_, i) => (
                <span key={i} className="font-sans text-5xl sm:text-7xl md:text-9xl font-black uppercase tracking-widest leading-[0.8] px-4 text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.4)] select-none">
                  HUYNH NHAT HUY — HUYNH NHAT HUY — HUYNH NHAT HUY — HUYNH NHAT HUY
                </span>
              ))}
            </motion.div>
            {/* Marquee Row 2 - Role (Smaller, Reverse direction) */}
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
              className="flex whitespace-nowrap mt-4 w-max"
            >
              {[...Array(2)].map((_, i) => (
                <span key={i} className="font-sans text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-widest leading-none px-4 text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.4)] select-none">
                  FRONTEND DEVELOPER — FRONTEND DEVELOPER — FRONTEND DEVELOPER — FRONTEND DEVELOPER —
                </span>
              ))}
            </motion.div>
          </div>

          {/* Top Half: Avatar (Layer 1) */}
          <motion.div
            variants={avatarVariants}
            className="flex justify-center items-end w-full h-[85%] relative z-[1]"
          >
            <img
              src={avatarImg}
              alt="Huỳnh Nhất Huy — Frontend Developer"
              className="w-[90vw] max-w-[420px] h-full object-contain object-bottom
                mix-blend-lighten  pointer-events-none"
              loading="eager"
              draggable={false}
            />
          </motion.div>

          {/* Overlays (Layer 2) - At the bottom of the fold, over the avatar */}
          <motion.div
            variants={fadeUpVariants}
            className="absolute bottom-6 inset-x-6 z-[2] flex justify-between items-end pointer-events-auto"
          >
            {/* Left: Role & Arrow */}
            <div className="flex flex-col gap-3">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25" />
              </svg>
              <div className="font-display text-body-md font-semibold leading-tight text-white tracking-tight">
                Frontend<br />Developer
              </div>
            </div>

            {/* Right: Globe */}
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-slate-950/30 backdrop-blur-md">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* === CONTENT BELOW THE FOLD (Luôn sáng rõ, sắc nét, không bị che mờ khi cuộn trên mobile) === */}
        <div className="relative z-10 w-full bg-transparent px-6 py-12 flex flex-col gap-8">

          {/* Info Block */}
          <div className="flex flex-col gap-2 border-b border-white/15 pb-6">
            <h1 className="font-serif text-5xl sm:text-6xl font-black uppercase text-white leading-[0.95] tracking-tight">
              HUYNH <br />
              NHAT HUY
            </h1>
            <span className="mt-3 text-sm sm:text-base font-sans font-semibold text-accent-teal tracking-widest uppercase">
              Frontend Developer
            </span>
          </div>

          <p className="text-base sm:text-lg font-normal text-slate-200 leading-relaxed max-w-lg">
            Crafting high-performance web environments where scalable UI meets seamless real-time connectivity.
          </p>

          <div className="flex flex-col gap-6">
            {/* Socials */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-11 h-11 rounded-full border border-white/20 text-white hover:text-accent-teal hover:border-accent-teal/50 bg-white/5 backdrop-blur-sm transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#works"
                className="flex-1 flex justify-center items-center gap-2 text-center py-3.5 px-5 rounded-full bg-accent-teal text-slate-950 font-semibold text-sm shadow-[0_0_24px_rgba(45,212,191,0.25)] hover:brightness-110 active:scale-95 transition-all"
              >
                Explore Works <span className="inline-block">↗</span>
              </a>
              <a
                href="#contact"
                className="px-6 py-3.5 rounded-full border border-white/30 text-white text-sm font-semibold hover:bg-white/10 active:scale-95 transition-all"
              >
                Let's Talk
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 60FPS Darkening Overlay on Dive (Chỉ áp dụng trên Desktop) ─── */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="hidden md:block absolute inset-0 bg-[#060911] pointer-events-none z-[4]"
      />

      {/* ══════════════════════════════════════════════
          DESKTOP LAYOUT (≥md)
         ══════════════════════════════════════════════ */}
      <div className="hidden md:flex relative h-screen items-end">

        {/* Center Avatar Portrait Grounded at Bottom — Zoom forward on dive */}
        <motion.div
          variants={avatarVariants}
          style={{ scale: centerScale, y: centerY, opacity: centerOpacity }}
          className="absolute bottom-0 inset-x-0 z-[2] flex justify-center items-end pointer-events-none will-change-transform origin-bottom"
        >
          <img
            src={avatarImg}
            alt="Huỳnh Nhất Huy — Frontend Developer"
            className="h-[88vh] max-h-[850px] w-auto object-contain object-bottom mix-blend-lighten pointer-events-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            loading="eager"
            draggable={false}
          />
        </motion.div>

        {/* UI layer — Left and Right splitting away smoothly */}
        <div className="relative z-[3] w-full pointer-events-none">
          <div className="grid-layout items-end pb-16 lg:pb-24">

            {/* Left: HUYNH NHAT HUY tách sang trái */}
            <motion.div
              style={{ x: leftX, opacity: leftOpacity }}
              className="col-span-4 lg:col-span-3 will-change-transform"
            >
              <LeftBlock />
            </motion.div>

            {/* Center spacer */}
            <div className="col-span-4 lg:col-span-6" />

            {/* Right: FRONTEND DEVELOPER tách sang phải */}
            <motion.div
              style={{ x: rightX, opacity: rightOpacity }}
              className="col-span-4 lg:col-span-3 will-change-transform"
            >
              <RightBlock align="right" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ─── Scroll Indicator — shared ─── */}
      <motion.div
        variants={scrollIndicatorVariants}
        animate="animate"
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[4] flex flex-col items-center gap-1.5"
      >
        <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
        </svg>
      </motion.div>
    </motion.section>
  );
}
