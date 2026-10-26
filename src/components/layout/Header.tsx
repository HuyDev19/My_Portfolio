import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';

const NAV_ITEMS = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Works', href: '#works' },
  { label: 'Contact', href: '#contact' },
] as const;

export default function Header() {
  const { isMenuOpen, setMenuOpen, toggleMenu } = useAppStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [curtainTarget, setCurtainTarget] = useState<{ href: string, label: string } | null>(null);
  const { scrollY } = useScroll();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  // Curtain Transition Logic
  useEffect(() => {
    if (curtainTarget) {
      // Allow 800ms for the curtain to slide up and cover the screen
      const slideInTimer = setTimeout(() => {
        // Scroll instantly under the cover
        const target = document.querySelector(curtainTarget.href);
        if (target) {
          target.scrollIntoView({ behavior: 'instant' });
        } else if (curtainTarget.href === '#top') {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }

        // Wait 300ms for the user to read the label, then slide up to exit
        setTimeout(() => {
          setCurtainTarget(null);
        }, 300);
      }, 800);

      return () => clearTimeout(slideInTimer);
    }
  }, [curtainTarget]);

  const handleLinkClick = (href: string, label: string) => {
    setMenuOpen(false);
    setCurtainTarget({ href, label });
  };

  // Hiện nút Hamburger nổi nếu menu đang mở, đã cuộn xuống, hoặc đang dùng màn hình Mobile (width < 768)
  const isMobile = dimensions.width > 0 && dimensions.width < 768;
  const showFloatingHamburger = isMenuOpen || isScrolled || isMobile;

  const w = dimensions.width;
  const h = dimensions.height;

  const initialPath = `
    M0 ${h + 300}
    Q${w / 2} ${h} ${w} ${h + 300}
    L${w} ${h + 1000}
    Q${w / 2} ${h + 1000} 0 ${h + 1000}
    Z
  `;

  const enterPath = `
    M0 0
    Q${w / 2} 0 ${w} 0
    L${w} ${h + 1000}
    Q${w / 2} ${h + 1000} 0 ${h + 1000}
    Z
  `;

  const exitPath = `
    M0 -1000
    Q${w / 2} -1000 ${w} -1000
    L${w} -300
    Q${w / 2} 0 0 -300
    Z
  `;

  return (
    <>
      {/* ─── MAIN NAVBAR (mix-blend-difference) ─── */}
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 }
        }}
        initial="visible"
        animate={isScrolled ? "hidden" : "visible"}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] pointer-events-none mix-blend-difference"
      >
        <div className="flex justify-between items-center px-6 md:px-12 py-6 max-w-7xl mx-auto w-full pointer-events-auto">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); handleLinkClick('#top', 'HOME'); }}
            className="text-white text-xl font-mono font-bold tracking-widest uppercase hover:opacity-70 transition-opacity"
          >
            HNH
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-10 items-center pointer-events-auto">
            {NAV_ITEMS.filter(item => item.label !== 'Home').map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleLinkClick(item.href, item.label); }}
                className="text-white text-sm font-semibold tracking-widest uppercase hover:opacity-70 transition-opacity"
              >
                {item.label}
              </a>
            ))}
          </nav>

        </div>
      </motion.header>


      {/* ─── FLOATING HAMBURGER (Magnetic Button) ─── */}
      <AnimatePresence>
        {showFloatingHamburger && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-6 right-6 md:top-6 md:right-12 z-[110] mix-blend-difference pointer-events-none"
          >
            <button
              onClick={toggleMenu}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-transparent border border-white text-white flex flex-col items-center justify-center gap-[5px] transition-transform hover:scale-105 active:scale-95 pointer-events-auto"
              aria-label="Toggle Menu"
            >
              <span className={`block h-[1.5px] bg-current transition-all duration-300 origin-center ${isMenuOpen ? 'w-5 rotate-45 translate-y-[6.5px]' : 'w-5'}`} />
              <span className={`block h-[1.5px] bg-current transition-all duration-300 ${isMenuOpen ? 'w-0 opacity-0' : 'w-5 opacity-100'}`} />
              <span className={`block h-[1.5px] bg-current transition-all duration-300 origin-center ${isMenuOpen ? 'w-5 -rotate-45 -translate-y-[6.5px]' : 'w-5'}`} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── FULL-SCREEN OVERLAY MENU ─── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[55] bg-[#0B1120]/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-4 md:gap-8">
              {NAV_ITEMS.map((item, i) => (
                <div key={item.href} className="overflow-hidden p-2">
                  <motion.a
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); handleLinkClick(item.href, item.label); }}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "100%", opacity: 0 }}
                    transition={{
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                      delay: i * 0.08
                    }}
                    className="block text-5xl md:text-7xl font-bold uppercase tracking-tight text-white hover:text-sky-400 transition-colors"
                  >
                    {item.label}
                  </motion.a>
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ─── CURTAIN TRANSITION OVERLAY (Fluid SVG Curve) ─── */}
      <AnimatePresence>
        {curtainTarget && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
          >
            {/* Màn trập SVG */}
            {w > 0 && (
              <motion.svg
                className="absolute inset-0 w-full h-[calc(100vh+600px)] pointer-events-none overflow-visible"
              >
                <motion.path
                  fill="#0F172A"
                  variants={{
                    initial: { d: initialPath },
                    enter: { d: enterPath },
                    exit: { d: exitPath }
                  }}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                />
              </motion.svg>
            )}

            {/* Chữ ở giữa màn hình */}
            <div className="overflow-hidden inline-flex relative z-10">
              <motion.span
                initial={{ y: "100%" }}
                animate={{
                  y: "0%",
                  transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }
                }}
                exit={{
                  y: "-100%",
                  transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0 }
                }}
                className="block text-white text-4xl md:text-6xl font-black uppercase tracking-widest font-clash"
              >
                {curtainTarget.label}
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
