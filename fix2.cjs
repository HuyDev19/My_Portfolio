const fs = require('fs');
const file = 'src/sections/Works/index.tsx';
let content = fs.readFileSync(file, 'utf8');

const startStr = 'function FixedLaptopMockup({';
const endStr = 'function ScrollIndicator({';

const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr);

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find boundaries");
  process.exit(1);
}

const before = content.substring(0, startIndex);
// Find the exact line of endStr
const after = content.substring(content.lastIndexOf('\n', endIndex - 2) + 1);

const newComponent = `function FixedLaptopMockup({
  project,
  onSelect,
  wrapperRotateX
}: {
  project: Project;
  onSelect: (project: Project, clickPos: ClickPos) => void;
  wrapperRotateX?: MotionValue<number>;
}) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const setCursorVariant = useCursorStore(state => state.setVariant);

  const [localProject, setLocalProject] = useState(project);
  const [displayedUrl, setDisplayedUrl] = useState(project.url);
  const [isHighlight, setIsHighlight] = useState(false);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (project.id === localProject.id) return;
    let isCancelled = false;

    const runSequence = async () => {
      // 1. Cursor glides to URL bar
      animate('.ghost-cursor', { opacity: 1, left: '50%', top: ['60%', '6%'] }, { duration: 0.4, ease: 'backOut' });
      await new Promise(r => setTimeout(r, 450));
      if (isCancelled) return;
      
      // 2. Click
      animate('.ghost-cursor', { scale: 0.8 }, { duration: 0.1 });
      await new Promise(r => setTimeout(r, 100));
      animate('.ghost-cursor', { scale: 1 }, { duration: 0.1 });
      if (isCancelled) return;
      
      // 3. Highlight text
      setIsHighlight(true);
      await new Promise(r => setTimeout(r, 200));
      if (isCancelled) return;
      
      // 4. Typewriter effect
      setIsHighlight(false);
      setDisplayedUrl('');
      const targetUrl = project.url;
      for (let i = 0; i <= targetUrl.length; i++) {
        if (isCancelled) return;
        setDisplayedUrl(targetUrl.slice(0, i));
        await new Promise(r => setTimeout(r, 20));
      }
      
      // 5. Safari Loading Bar
      animate('.safari-progress', { width: ['0%', '100%'], opacity: [1, 1, 0] }, { duration: 0.4, times: [0, 0.8, 1], ease: 'easeOut' });
      await new Promise(r => setTimeout(r, 250));
      if (isCancelled) return;

      // 6. Update Project Data (Image sweep transition)
      setLocalProject(project);
      
      // 7. Cursor fades out
      animate('.ghost-cursor', { opacity: 0, top: '20%' }, { duration: 0.3 });
    };

    runSequence();
    return () => { isCancelled = true; };
  }, [project, localProject.id, animate]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x: xPct, y: yPct });
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    onSelect(project, {
      x: clickX,
      y: clickY,
      clientX: e.clientX,
      clientY: e.clientY,
    });
  };

  return (
    <motion.div ref={scope} style={{ perspective: "2000px", rotateX: wrapperRotateX || 0 }} className="w-[92%] md:w-[88%] max-w-4xl mx-auto relative z-20">
      {/* REALISTIC MACBOOK PRO MOCKUP FRAME */}
      <div className="relative rounded-t-3xl md:rounded-t-[2.5rem] bg-gradient-to-b from-[#e5e7eb] to-[#9ca3af] p-[2px] md:p-[3px] shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] z-20">
        
        {/* Black Glass Bezel */}
        <div className="relative rounded-t-[calc(1.5rem-2px)] md:rounded-t-[calc(2.5rem-3px)] bg-black p-3 md:p-5 pb-6 md:pb-8 overflow-hidden ring-1 ring-white/10 flex flex-col">
          
          {/* GHOST CURSOR */}
          <motion.div
            className="ghost-cursor absolute z-50 pointer-events-none drop-shadow-2xl"
            initial={{ opacity: 0, left: "50%", top: "60%" }}
            style={{ x: "-50%", y: "-50%" }}
          >
            <svg width="32" height="48" viewBox="0 0 24 36" fill="none">
              <path d="M5.5 32.5L2 2L23 21L12.5 22.5L18 31.5L14 34L8.5 24.5L5.5 32.5Z" fill="black" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </motion.div>

          {/* Safari Browser Bar */}
          <div className="w-full h-10 md:h-12 bg-slate-900/80 rounded-t-lg md:rounded-t-xl flex items-center px-4 gap-4 border-b border-white/10 relative overflow-hidden shrink-0">
            {/* Safari Window Controls */}
            <div className="flex gap-2 relative z-10">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>

            {/* Address Bar */}
            <div className="flex-1 max-w-2xl mx-auto h-6 md:h-8 bg-black/50 rounded-md border border-white/5 flex items-center justify-center gap-2 px-4 overflow-hidden relative">
              <div className="safari-progress absolute top-0 left-0 h-full bg-blue-500/30 w-0 opacity-0" />
              <span className="text-cyan-400 text-[10px] relative z-10">🔒</span>
              <span className={\`truncate tracking-wide font-medium relative z-10 transition-colors \${isHighlight ? 'bg-blue-500/50 text-white' : 'text-slate-300'}\`}>
                {displayedUrl}
                <span className="animate-pulse inline-block w-[6px] h-[14px] bg-slate-300 ml-[1px] translate-y-[2px]" />
              </span>
            </div>

            {/* Top Camera Dot */}
            <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700/80 hidden sm:block" />
          </div>

          {/* SCREEN DISPLAY CANVAS */}
          <div
            onMouseMove={handleMouseMove}
            onMouseEnter={() => {
              setIsHovered(true);
              setCursorVariant('hidden');
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              setCursorVariant('default');
            }}
            onClick={handleClick}
            className="relative aspect-[16/10] w-full overflow-hidden rounded-b-lg bg-slate-950 cursor-none group select-none"
          >
            {/* INSTANT BROWSER LOAD IMAGE TRANSITION */}
            <AnimatePresence>
              <motion.img
                key={localProject.id}
                src={localProject.coverImage}
                alt={localProject.title}
                draggable={false}
                onError={handleImgError}
                initial={{ clipPath: "inset(100% 0 0 0)", filter: "blur(0px)" }}
                animate={{ clipPath: "inset(0% 0 0 0)" }}
                exit={{ filter: "blur(10px)", opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 group-hover:scale-105"
              />
            </AnimatePresence>

            {/* Dark Gradient Overlay for Typography Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />

            {/* Glass Gloss Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none opacity-50 group-hover:opacity-75 transition-opacity" />

            {/* 🌀 JESPER LANDBERG GRAVITATIONAL CHROMATIC BLACK HOLE CURSOR */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute pointer-events-none z-50 flex items-center justify-center"
                  style={{
                    left: \`\${mousePos.x}%\`,
                    top: \`\${mousePos.y}%\`,
                    x: '-50%',
                    y: '-50%',
                  }}
                  initial={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
                  animate={{ scale: 1, opacity: 1, x: '-50%', y: '-50%' }}
                  exit={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                >
                  {/* 🌟 WATER DROP / SPACE BENDING CURSOR */}
                  <div className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24">
                    {/* The Physical Water Drop Lens */}
                    <motion.div
                      className="absolute inset-0 bg-transparent rounded-full shadow-[inset_0_-15px_30px_rgba(255,255,255,0.2),inset_0_15px_30px_rgba(0,0,0,0.5),0_20px_40px_rgba(0,0,0,0.6)]"
                      style={{
                        backdropFilter: 'blur(6px) contrast(180%) saturate(150%) brightness(1.2)',
                        WebkitBackdropFilter: 'blur(6px) contrast(180%) saturate(150%) brightness(1.2)',
                      }}
                      animate={{
                        borderRadius: [
                          "50% 50% 50% 50%",
                          "60% 40% 50% 50%",
                          "50% 60% 40% 60%",
                          "50% 50% 50% 50%"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                    </motion.div>

                    {/* Magnetic Inner Glowing Indicator */}
                    <div className="relative flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.8)]">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="translate-x-[0.5px] -translate-y-[0.5px]">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Project Tagline inside Screen Bottom Left */}
            <div className="absolute bottom-0 left-0 w-full p-5 md:p-8 flex flex-col items-start text-left pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={localProject.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="font-mono text-[10px] md:text-xs text-cyan-400 mb-1.5 tracking-widest uppercase">
                    {localProject.tech}
                  </p>
                  <h3 className="font-serif text-xl md:text-3xl font-black uppercase text-white leading-none tracking-tight mb-1">
                    {localProject.title}
                  </h3>
                  <p className="text-slate-300 font-sans text-xs md:text-sm tracking-wide line-clamp-1 max-w-md">
                    {localProject.tagline}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* MACBOOK PRO LOGO */}
          <div className="absolute bottom-1.5 md:bottom-2 left-1/2 -translate-x-1/2 text-[7px] md:text-[9px] font-sans text-gray-500 tracking-[0.3em] font-medium uppercase z-30">
            MacBook Pro
          </div>
        </div>
      </div>

      {/* 🌟 3D MACBOOK BASE (KEYBOARD & TRACKPAD) 🌟 */}
      <div 
        className="w-full relative z-10 -mt-[2px] md:-mt-[3px]"
        style={{ perspective: "1500px" }}
      >
        <div 
          className="w-full aspect-[16/11] md:aspect-[16/11] bg-gradient-to-b from-[#d1d5db] to-[#71717a] rounded-b-3xl md:rounded-b-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] flex flex-col items-center relative border-t border-slate-400"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "top center",
            transform: "rotateX(65deg) scale(0.99)",
          }}
        >
          {/* Keyboard Well */}
          <div className="w-[84%] h-[48%] mt-[4%] bg-[#0a0a0a] rounded-md md:rounded-lg shadow-[inset_0_4px_20px_rgba(0,0,0,1)] ring-1 ring-white/10 relative overflow-hidden flex flex-col justify-between p-1 md:p-2">
            <div 
              className="absolute inset-0 bg-cyan-500/10"
              style={{
                backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.12) 2px, transparent 2px), linear-gradient(90deg, rgba(255, 255, 255, 0.12) 2px, transparent 2px)",
                backgroundSize: "4% 20%",
                backgroundPosition: "center"
              }}
            />
          </div>

          {/* Trackpad */}
          <div className="w-[32%] h-[32%] mt-[5%] bg-[#a1a1aa] rounded-md md:rounded-lg shadow-[inset_0_2px_5px_rgba(0,0,0,0.2)] ring-1 ring-black/10" />
          
          {/* Front Lip */}
          <div 
            className="absolute -bottom-2 md:-bottom-3 left-0 w-full h-2 md:h-3 bg-gradient-to-r from-[#52525b] via-[#a1a1aa] to-[#52525b] rounded-b-full shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            style={{
              transform: "translateZ(-1px) rotateX(-90deg)",
              transformOrigin: "top"
            }}
          >
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/5 h-1/2 bg-[#3f3f46] rounded-b-md shadow-inner" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
`;

fs.writeFileSync(file, before + newComponent + after, 'utf8');
