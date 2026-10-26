const fs = require('fs');
const file = 'src/sections/Works/index.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  '  useMotionValueEvent,\n} from \'framer-motion\';',
  '  useMotionValueEvent,\n  useAnimate,\n  useVelocity,\n  useSpring,\n  MotionValue\n} from \'framer-motion\';'
);

content = content.replace(
  '  const { scrollYProgress } = useScroll({\n    target: containerRef,\n    offset: [\'start start\', \'end end\'],\n  });\n\n  useMotionValueEvent',
  '  const { scrollYProgress } = useScroll({\n    target: containerRef,\n    offset: [\'start start\', \'end end\'],\n  });\n\n  const scrollVelocity = useVelocity(scrollYProgress);\n  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });\n  const wrapperRotateX = useTransform(smoothVelocity, [-0.5, 0.5], [10, -10]);\n\n  useMotionValueEvent'
);

content = content.replace(
  '  onSelect,\n}: {\n  project: Project;\n  onSelect: (project: Project, clickPos: ClickPos) => void;\n}) {',
  '  onSelect,\n  wrapperRotateX\n}: {\n  project: Project;\n  onSelect: (project: Project, clickPos: ClickPos) => void;\n  wrapperRotateX?: MotionValue<number>;\n}) {'
);

const oldInternals = `  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const setCursorVariant = useCursorStore(state => state.setVariant);`;

const newInternals = `  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
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
      animate('.ghost-cursor', { opacity: 1, x: ['50%', '50%'], y: ['40%', '-4%'] }, { duration: 0.4, ease: 'backOut' });
      await new Promise(r => setTimeout(r, 450));
      if (isCancelled) return;
      
      animate('.ghost-cursor', { scale: 0.8 }, { duration: 0.1 });
      await new Promise(r => setTimeout(r, 100));
      animate('.ghost-cursor', { scale: 1 }, { duration: 0.1 });
      if (isCancelled) return;
      
      setIsHighlight(true);
      await new Promise(r => setTimeout(r, 200));
      if (isCancelled) return;
      
      setIsHighlight(false);
      setDisplayedUrl('');
      const targetUrl = project.url;
      for (let i = 0; i <= targetUrl.length; i++) {
        if (isCancelled) return;
        setDisplayedUrl(targetUrl.slice(0, i));
        await new Promise(r => setTimeout(r, 20));
      }
      
      animate('.safari-progress', { width: ['0%', '100%'], opacity: [1, 1, 0] }, { duration: 0.4, times: [0, 0.8, 1], ease: 'easeOut' });
      await new Promise(r => setTimeout(r, 250));
      if (isCancelled) return;

      setLocalProject(project);
      
      animate('.ghost-cursor', { opacity: 0, y: '20%' }, { duration: 0.3 });
    };

    runSequence();
    return () => { isCancelled = true; };
  }, [project, localProject.id, animate]);`;

content = content.replace(oldInternals, newInternals);

content = content.replace(
  '  return (\n    <div className="w-[92%] md:w-[88%] max-w-4xl mx-auto relative z-20">',
  '  return (\n    <motion.div ref={scope} style={{ perspective: "2000px", rotateX: wrapperRotateX || 0 }} className="w-[92%] md:w-[88%] max-w-4xl mx-auto relative z-20">'
);

content = content.replace(/    <\/div>\n  \);\n}/, '    </motion.div>\n  );\n}');

content = content.replace(
  '<motion.span\n              key={`url-${project.id}`}\n              initial={{ opacity: 0.5 }}\n              animate={{ opacity: 1 }}\n              transition={{ duration: 0.3 }}\n              className="truncate tracking-wide text-slate-300 font-medium relative z-10"\n            >\n              {project.url}\n            </motion.span>',
  `<span className={\`truncate tracking-wide font-medium relative z-10 transition-colors \${isHighlight ? 'bg-blue-500/50 text-white' : 'text-slate-300'}\`}>
              {displayedUrl}
              <span className="animate-pulse inline-block w-[6px] h-[14px] bg-slate-300 ml-[1px] translate-y-[2px]" />
            </span>`
);

content = content.replace(
  'className="absolute top-0 left-0 h-full bg-blue-500/30"',
  'className="safari-progress absolute top-0 left-0 h-full bg-blue-500/30"'
);

content = content.replace(
  /<motion\.div[\s\S]*?className="safari-progress absolute top-0 left-0 h-full bg-blue-500\/30"\s*\/>/,
  '<div className="safari-progress absolute top-0 left-0 h-full bg-blue-500/30 w-0 opacity-0" />'
);

content = content.replace(
  '<motion.img\n              key={project.id}\n              src={project.coverImage}',
  '<motion.img\n              key={localProject.id}\n              src={localProject.coverImage}'
);

content = content.replace(
  'initial={{ opacity: 0, filter: \'blur(20px)\' }}\n              animate={{ opacity: 1, filter: \'blur(0px)\' }}\n              exit={{ opacity: 0, y: \'-20%\' }}',
  'initial={{ clipPath: "inset(100% 0 0 0)", filter: "blur(0px)" }}\n              animate={{ clipPath: "inset(0% 0 0 0)" }}\n              exit={{ filter: "blur(10px)", opacity: 0 }}'
);

const ghostCursor = `
        {/* GHOST CURSOR */}
        <motion.div
          className="ghost-cursor absolute z-50 pointer-events-none drop-shadow-2xl"
          initial={{ opacity: 0, x: "50%", y: "40%" }}
        >
          <svg width="32" height="48" viewBox="0 0 24 36" fill="none">
            <path d="M5.5 32.5L2 2L23 21L12.5 22.5L18 31.5L14 34L8.5 24.5L5.5 32.5Z" fill="black" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </motion.div>
`;
content = content.replace(
  '{/* SCREEN DISPLAY CANVAS WITH SMOOTH IMAGE CAROUSEL */}',
  ghostCursor + '\n        {/* SCREEN DISPLAY CANVAS WITH SMOOTH IMAGE CAROUSEL */}'
);

content = content.replace(
  '<FixedLaptopMockup\n            project={activeProject}\n            onSelect={handleSelectProject}\n          />',
  '<FixedLaptopMockup\n            project={activeProject}\n            onSelect={handleSelectProject}\n            wrapperRotateX={wrapperRotateX}\n          />'
);

fs.writeFileSync(file, content, 'utf8');
console.log('Done!');
