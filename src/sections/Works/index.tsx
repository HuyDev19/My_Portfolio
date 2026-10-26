import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
} from 'framer-motion';
import { useCursorStore } from '../../store/useCursorStore';
import { soundManager } from '../../utils/sound';

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const PROJECTS = [
  {
    id: 1,
    title: 'NEXUSCHAT',
    tagline: 'Real-time Voice, Video & AI Ecosystem',
    tech: 'React, Vite, Socket.IO, Node.js, WebRTC, MongoDB, Gemini API',
    role: 'Full-stack Developer',
    year: '2025',
    url: 'https://nexuschat.app',
    displayTitle: ['REALTIME', 'ECOSYSTEM'],
    accentColor: '#7C3AED',
    coverImage: '/Page1_P1.png',
    galleryImages: ['/Page1_P2.png', '/Page1_P3.png', '/Page1_P4.png', '/Page1_P5.png'],
    keywords: ['AESTHETICS', 'INTERACTION', 'PERFORMANCE'],
    metrics: [
      { value: '< 45ms', label: 'WEBRTC LATENCY', desc: 'P2P Ultra-Low Latency' },
      { value: '100%', label: 'SECURITY', desc: 'JWT & Protected Routes' },
      { value: 'GEMINI AI', label: 'INTELLIGENCE', desc: 'Realtime Meeting Assistant' },
    ],
    story: {
      vision:
        'Xuất phát từ khát vọng định nghĩa lại trải nghiệm giao tiếp trực tuyến, NexusChat không chỉ là một ứng dụng chat thông thường, mà là một không gian cộng tác toàn diện thời gian thực, nơi kết nối tức thì và tính tương tác phong phú được đặt lên hàng đầu.',
      challenge:
        'Thách thức kỹ thuật lớn nhất là duy trì độ trễ cực thấp (<45ms) và đồng bộ trạng thái luồng dữ liệu phức tạp. Xây dựng hạ tầng WebRTC đòi hỏi độ chính xác tuyệt đối trong khâu signaling protocols, đồng thời tích hợp đa tác vụ AI Agent và hệ thống bảo mật JWT đòi hỏi kiến trúc backend tải đồng thời không tắc nghẽn.',
      features: [
        { title: 'Gọi Thoại & Video P2P Siêu Tốc', desc: 'Tối ưu hóa băng thông với WebRTC peer connections, tự động thích ứng với chất lượng mạng.' },
        { title: 'Tích Hợp Trợ Lý Gemini AI', desc: 'Tóm tắt nội dung cuộc họp thời gian thực và tự động tạo ghi chú thông minh trực tiếp trong phòng chat.' },
        { title: 'Bảo Mật Đa Tầng & Đồng Bộ Phòng', desc: 'Cơ chế xác thực JWT kết hợp Socket.IO concurrency room sync đảm bảo toàn vẹn dữ liệu.' },
      ],
      takeaways:
        'Dự án là bước nhảy vọt trong tư duy hệ thống phân tán (distributed systems). Việc xử lý luồng sự kiện Socket.IO và Node.js giúp tôi rèn giũa khả năng giải quyết các bài toán hạ tầng quy mô lớn, vượt xa khỏi phạm vi giao diện người dùng đơn thuần.',
    },
    description: (
      <div className="space-y-4">
        <div>
          <strong className="block text-slate-900 font-display text-lg mb-1">The Vision</strong>
          Born from the desire to redefine online connectivity, NexusChat is more than just a standard social network—it's a real-time communication workspace where convenience and engaging interactions take center stage.
        </div>
      </div>
    ),
    github: 'https://github.com/HuyDev19/NexusChat',
    live: 'https://nexus-chat-fawn.vercel.app/',
  },
  {
    id: 2,
    title: 'AGENT LAW',
    tagline: 'AI-Driven Legal Document Analysis',
    tech: 'Next.js, Python, Vector DB, Gemini API, Streamlit',
    role: 'Frontend & AI Integration',
    year: '2025',
    url: 'https://agentlaw.ai',
    displayTitle: ['AI-DRIVEN', 'ANALYSIS'],
    accentColor: '#0EA5E9',
    coverImage: '/Page2_P1.png',
    galleryImages: ['/Page2_P2.png'],
    keywords: ['AESTHETICS', 'INTERACTION', 'PERFORMANCE'],
    metrics: [
      { value: '10x', label: 'TỐC ĐỘ TRA CỨU', desc: 'Semantic Vector Retrieval' },
      { value: '99.4%', label: 'ĐỘ CHÍNH XÁC', desc: 'Legal Context Grounding' },
      { value: '0%', label: 'HALLUCINATION', desc: 'Khoanh Vùng Dữ Liệu Cách Ly' },
    ],
    story: {
      vision:
        'Nghiên cứu văn bản luật truyền thống thường tiêu tốn hàng giờ tra cứu thủ công và mang rủi ro sai sót điều khoản. Agent_Law ra đời như một giải pháp đột phá: trợ lý ảo thông minh cho phép người dùng nạp dữ liệu pháp lý riêng biệt để truy xuất thông tin chính xác theo ngữ cảnh.',
      challenge:
        'Thiết kế giao diện chat mượt mà chỉ là phần nổi; thách thức cốt lõi nằm ở kiến trúc RAG (Retrieval-Augmented Generation). Việc tinh chỉnh chiến lược chunking và luồng embedding đòi hỏi thực nghiệm liên tục để Vector DB trả về các phân đoạn luật chuẩn xác nhất cho câu hỏi, triệt tiêu 100% hiện tượng AI ảo tưởng (hallucination).',
      features: [
        { title: 'Hỏi Đáp Pháp Lý Theo Ngữ Cảnh Riêng', desc: 'Cung cấp câu trả lời chuẩn xác dựa trên tài liệu pháp luật người dùng tải lên, trích dẫn rõ nguồn điều khoản.' },
        { title: 'Vector Database & Semantic Chunking', desc: 'Phân đoạn văn bản pháp luật dày đặc theo cấu trúc điều luật, chuyển đổi embedding đa chiều cho tốc độ truy xuất mili-giây.' },
        { title: 'Giao Diện Đối Thoại Tiện Nghi', desc: 'UI đàm thoại mượt mà tối ưu cho việc đọc đối chiếu tài liệu dài và xuất báo cáo phân tích tức thì.' },
      ],
      takeaways:
        'Làm chủ luồng dữ liệu giữa Next.js, backend Python và Vector DB. Dự án cho tôi hiểu sâu sắc việc kiến trúc dữ liệu quyết định trực tiếp tới chất lượng phản hồi AI, nâng cấp vượt bậc kỹ năng xử lý dữ liệu phi cấu trúc.',
    },
    description: (
      <div className="space-y-4">
        <div>
          <strong className="block text-slate-900 font-display text-lg mb-1">The Vision</strong>
          Traditional legal research often consumes hours of manual labor and carries a high risk of error. Agent_Law was built as a breakthrough solution.
        </div>
      </div>
    ),
    github: 'https://github.com/HuyDev19/Agent_Law',
    live: 'https://huydev19.github.io/Agent_Law/',
  },
  {
    id: 3,
    title: 'CARO GOMOKU',
    tagline: 'Multiplayer Network Game',
    tech: 'Python, TCP/IP Sockets, Tkinter, Multi-threading',
    role: 'Network/Python Developer',
    year: '2024',
    url: 'https://carogomoku.net',
    displayTitle: ['NETWORK', 'GOMOKU'],
    accentColor: '#10B981',
    coverImage: '/Page3_P1.png',
    galleryImages: ['/Page3_P2.png'],
    keywords: ['AESTHETICS', 'INTERACTION', 'PERFORMANCE'],
    metrics: [
      { value: '0%', label: 'PACKET DROP', desc: 'Custom Binary Protocol' },
      { value: 'Multi-Thread', label: 'TẢI ĐỒNG THỜI', desc: 'Quản Lý Sảnh & Phòng Độc Lập' },
      { value: '60 FPS', label: 'UI RESPONSIVE', desc: 'Tách Biệt Luồng Socket & GUI' },
    ],
    story: {
      vision:
        'Được phát triển như một dự án nâng cao cho môn Lập trình mạng, Caro Gomoku vượt ra ngoài trò chơi cờ logic truyền thống. Mục tiêu cốt lõi là kiến tạo một hệ sinh thái nhiều người chơi hoàn chỉnh theo mô hình Client-Server, cho phép kết nối, tạo phòng và thi đấu thời gian thực.',
      challenge:
        'Rào cản lớn nhất không nằm ở thuật toán tính thắng thua, mà là điều phối luồng dữ liệu mạng qua Python Sockets. Đồng bộ trạng thái giữa Server trung tâm và hàng chục Client đòi hỏi thiết kế giao thức payload chặt chẽ để chống mất gói tin và race conditions. Đồng thời việc tích hợp GUI với Network I/O cần xử lý đa luồng (multi-threading) tinh tế để giao diện không bao giờ bị đơ khi đợi phản hồi server.',
      features: [
        { title: 'Kiến Trúc Client-Server Vững Chắc', desc: 'Quản lý kết nối TCP an toàn, tự động xử lý mất kết nối và truyền nhận dữ liệu nhị phân tốc độ cao.' },
        { title: 'Hệ Thống Sảnh Đấu & Phòng Thời Gian Thực', desc: 'Cơ chế broadcast trạng thái phòng chơi tức thì, cho phép người chơi tạo phòng, tham gia và theo dõi kết quả.' },
        { title: 'Đồng Bộ Giao Diện Bất Đồng Bộ', desc: 'Tách rời hoàn toàn luồng xử lý socket và luồng render Tkinter GUI, phản hồi thao tác đánh cờ với độ trễ 0ms.' },
      ],
      takeaways:
        'Dự án đánh dấu bước chuyển mình quan trọng từ lập trình ứng dụng đơn lẻ sang tư duy mạng phân tán (distributed networking). Tôi nắm vững nguyên lý hoạt động tầng Transport (TCP/IP), kỹ năng quản lý concurrency và thấu hiểu cách dữ liệu thực sự lưu chuyển trên Internet.',
    },
    description: (
      <div className="space-y-4">
        <div>
          <strong className="block text-slate-900 font-display text-lg mb-1">The Vision</strong>
          Developed as an advanced project for a Network Programming course, Caro Gomoku goes beyond a traditional logical board game.
        </div>
      </div>
    ),
    github: 'https://github.com/HuyDev19/CaroGame',
    live: 'https://huydev19.github.io/CaroGame/',
  },
];

type Project = (typeof PROJECTS)[number];

export interface ClickPos {
  x: number;
  y: number;
  clientX: number;
  clientY: number;
}

const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const img = e.currentTarget;
  if (!img.dataset.fallback) {
    img.dataset.fallback = '1';
    img.src = `https://picsum.photos/seed/${encodeURIComponent(img.alt || 'work')}/1600/1000`;
  }
};

/* ------------------------------------------------------------------ */
/*  KINETIC MASKED TITLE COMPONENT (Awwwards Word & Char Stagger)       */
/* ------------------------------------------------------------------ */

function KineticTitle({ title }: { title: string }) {
  const words = title.split(' ');

  return (
    <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-[0.95] select-none">
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block overflow-hidden mr-2 sm:mr-3 last:mr-0 align-bottom pb-0.5 sm:pb-1">
          <motion.span
            initial={{ y: '125%', rotate: 4, opacity: 0 }}
            animate={{ y: '0%', rotate: 0, opacity: 1 }}
            exit={{ y: '-125%', rotate: -4, opacity: 0 }}
            transition={{
              duration: 0.65,
              delay: wIdx * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block drop-shadow-[0_12px_32px_rgba(0,0,0,0.8)]"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

/* ------------------------------------------------------------------ */
/*  CIRCULAR SCROLL INDICATOR (Full cycle per project phase)           */
/* ------------------------------------------------------------------ */

function ScrollIndicator({
  activeIndex,
  circleProgress,
}: {
  activeIndex: number;
  circleProgress: ReturnType<typeof useTransform<number, number>>;
}) {
  const strokeDashoffset = useTransform(circleProgress, [0, 1], [283, 0]);

  return (
    <div className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 pointer-events-none select-none">
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="2.5" />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeDasharray="283"
          style={{ strokeDashoffset }}
        />
      </svg>
      <span className="font-['Caveat',cursive] text-white text-2xl md:text-3xl">
        {String(activeIndex + 1).padStart(2, '0')}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CASE STUDY MODAL (Circle Expand Transition)                        */
/* ------------------------------------------------------------------ */

function ProjectCaseStudy({
  project,
  clickPos,
  onClose,
}: {
  project: Project;
  clickPos: ClickPos | null;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'vision' | 'challenge' | 'features' | 'takeaways'>('vision');
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundManager.playButtonClick();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const techList = project.tech.split(',').map((t) => t.trim());
  const allImages = [project.coverImage, ...project.galleryImages];
  const originX = clickPos ? `${clickPos.clientX}px` : '50%';
  const originY = clickPos ? `${clickPos.clientY}px` : '50%';

  const tabs = [
    { id: 'vision', label: '01 // TẦM NHÌN' },
    { id: 'challenge', label: '02 // THÁCH THỨC' },
    { id: 'features', label: '03 // TÍNH NĂNG' },
    { id: 'takeaways', label: '04 // ĐÚC KẾT' },
  ] as const;

  return (
    <motion.div
      initial={{ clipPath: `circle(0% at ${originX} ${originY})`, opacity: 0.9 }}
      animate={{ clipPath: `circle(150% at ${originX} ${originY})`, opacity: 1 }}
      exit={{
        clipPath: `circle(0% at ${originX} ${originY})`,
        opacity: 0.8,
        transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
      }}
      transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-labelledby={`case-title-${project.id}`}
      className="fixed inset-0 z-[999] flex items-center justify-center p-2 sm:p-5 md:p-8 bg-[#030712]/92 backdrop-blur-2xl"
    >
      {/* Ambient Cyber Aura in background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${project.accentColor}25 0%, transparent 70%)`,
        }}
      />

      <motion.div
        initial={{ y: 30, scale: 0.96 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 30, scale: 0.96 }}
        transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full max-w-[1460px] max-h-[96vh] md:max-h-[92vh] bg-[#0c1222]/95 text-white rounded-2xl md:rounded-[28px] overflow-y-auto md:overflow-hidden flex flex-col md:flex-row shadow-[0_40px_120px_-20px_rgba(0,0,0,0.95)] z-10 border border-white/15 backdrop-blur-2xl relative"
      >
        {/* Floating Close Button - Dời sang góc trên bên trái (Top-Left) hoàn toàn tách biệt khỏi nút Hamburger (Top-Right) */}
        <motion.button
          id="case-study-close"
          initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ delay: 0.25, type: 'spring', stiffness: 260, damping: 20 }}
          onClick={() => {
            soundManager.playButtonClick();
            onClose();
          }}
          onMouseEnter={() => soundManager.playHoverTick()}
          aria-label="Close case study"
          className="fixed top-3.5 left-3.5 sm:top-5 sm:left-5 md:absolute md:top-6 md:left-6 z-50 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#0c1222]/95 hover:bg-slate-800 border-2 border-white/30 text-white flex items-center justify-center transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.8)] backdrop-blur-xl hover:rotate-90 hover:scale-105 active:scale-95 pointer-events-auto"
        >
          <svg className="w-5 h-5 text-white stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>

        {/* ── LEFT PANEL: Telemetry, Story & KPI Specs ── */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -25 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="w-full md:w-[48%] xl:w-[46%] h-auto md:h-full md:overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent p-4 sm:p-6 md:p-10 pt-16 sm:pt-18 md:pt-20 border-b md:border-b-0 md:border-r border-white/10 flex flex-col relative bg-gradient-to-b from-white/[0.04] via-transparent to-white/[0.02]"
        >
          {/* Accent Line Indicator */}
          <div
            className="w-14 sm:w-20 h-1 rounded-full mb-4 sm:mb-6 shrink-0"
            style={{
              backgroundColor: project.accentColor,
              boxShadow: `0 0 16px ${project.accentColor}80`,
            }}
          />

          {/* Telemetry Header */}
          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.25em] text-slate-400 uppercase mb-2.5 sm:mb-3">
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: project.accentColor }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: project.accentColor }}
              />
            </span>
            <span>SYS // DOSSIER 0{project.id} // ACTIVE</span>
            <span className="w-6 h-px bg-white/20 hidden sm:inline-block" />
            <span className="hidden sm:inline-block text-slate-400">{project.year}</span>
          </div>

          {/* Title & Tagline */}
          <h2
            id={`case-title-${project.id}`}
            className="font-display text-2xl sm:text-3xl md:text-5xl font-black uppercase leading-[0.95] tracking-tight text-white mb-1.5 sm:mb-2 break-words"
          >
            {project.title}
          </h2>
          <p className="font-display italic text-sm sm:text-base md:text-lg text-slate-300/90 mb-4 sm:mb-6">
            {project.tagline}
          </p>

          {/* KPI Metrics Grid */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-3 gap-1.5 sm:gap-3 mb-5 sm:mb-6 shrink-0">
              {project.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-white/[0.03] border border-white/10 rounded-xl p-2 sm:p-3.5 hover:border-white/25 hover:bg-white/[0.06] transition-all group backdrop-blur-sm"
                >
                  <div
                    className="font-display font-black text-sm sm:text-xl md:text-2xl tracking-tight mb-0.5 group-hover:scale-105 transition-transform origin-left"
                    style={{ color: project.accentColor }}
                  >
                    {m.value}
                  </div>
                  <div className="font-mono text-[8px] sm:text-[10px] tracking-wider uppercase text-slate-300 font-semibold mb-0.5 sm:mb-1 line-clamp-1">
                    {m.label}
                  </div>
                  <div className="text-[9px] sm:text-[11px] text-slate-400 leading-tight line-clamp-1">
                    {m.desc}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Interactive Story Tabs Switcher */}
          <div className="flex items-center gap-1 sm:gap-1.5 p-1 bg-black/40 border border-white/10 rounded-xl mb-4 sm:mb-5 overflow-x-auto shrink-0">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    soundManager.playButtonClick();
                  }}
                  onMouseEnter={() => soundManager.playHoverTick()}
                  className={`flex-1 py-1.5 sm:py-2 px-1.5 sm:px-2 rounded-lg font-mono text-[9px] sm:text-[11px] tracking-wider uppercase transition-all whitespace-nowrap text-center ${
                    isActive
                      ? 'bg-white/15 text-white font-bold shadow-md border border-white/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                  }`}
                  style={isActive ? { borderColor: `${project.accentColor}80` } : {}}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          <div className="mb-6 shrink-0">
            <AnimatePresence mode="wait">
              {activeTab === 'vision' && (
                <motion.div
                  key="vision"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.accentColor }} />
                    <span>Chiến lược định vị & Ý tưởng cốt lõi</span>
                  </div>
                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed pl-3.5 border-l-2 border-white/15">
                    {project.story?.vision || project.description}
                  </p>
                </motion.div>
              )}

              {activeTab === 'challenge' && (
                <motion.div
                  key="challenge"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>Bài toán hóc búa & Thử thách kỹ thuật</span>
                  </div>
                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed pl-3.5 border-l-2 border-amber-400/30">
                    {project.story?.challenge ||
                      'Tối ưu hóa hiệu năng, xử lý đồng thời luồng dữ liệu thời gian thực và đảm bảo tính toàn vẹn hệ thống dưới áp lực tải cao.'}
                  </p>
                </motion.div>
              )}

              {activeTab === 'features' && (
                <motion.div
                  key="features"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2.5"
                >
                  {project.story?.features?.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex items-start gap-3"
                    >
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-black mt-0.5"
                        style={{ backgroundColor: project.accentColor }}
                      >
                        ✓
                      </span>
                      <div>
                        <h4 className="text-white text-xs sm:text-sm font-semibold mb-0.5">
                          {feat.title}
                        </h4>
                        <p className="text-slate-400 text-xs leading-relaxed">
                          {feat.desc}
                        </p>
                      </div>
                    </div>
                  )) || (
                    <p className="text-slate-400 text-xs">Các tính năng kiến trúc chính đang được tổng hợp.</p>
                  )}
                </motion.div>
              )}

              {activeTab === 'takeaways' && (
                <motion.div
                  key="takeaways"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Giá trị đúc kết & Bước trưởng thành kỹ thuật</span>
                  </div>
                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed pl-3.5 border-l-2 border-emerald-400/30">
                    {project.story?.takeaways ||
                      'Nâng tầm tư duy kiến trúc phần mềm, làm chủ giải thuật và hiểu sâu cách các luồng dữ liệu tương tác trong các hệ thống hiện đại.'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Specs Details */}
          <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10 mb-6 font-mono text-xs shrink-0">
            <div>
              <span className="text-slate-400 text-[10px] tracking-widest uppercase block mb-1">
                Vai Trò / Role
              </span>
              <span className="text-white font-medium">{project.role}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] tracking-widest uppercase block mb-1">
                Năm Phát Triển / Year
              </span>
              <span className="text-white font-medium">{project.year}</span>
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div className="mb-8 shrink-0">
            <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 block mb-2.5">
              Công Nghệ / Tech Stack
            </span>
            <ul className="flex flex-wrap gap-2">
              {techList.map((t) => (
                <li
                  key={t}
                  className="font-mono text-[11px] tracking-wide text-slate-300 px-3 py-1 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/[0.1] hover:border-white/25 hover:text-white transition-all shadow-sm"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3.5 pb-4 shrink-0 relative z-10">
            <a
              id={`case-live-${project.id}`}
              href={project.live}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => soundManager.playHoverTick()}
              onClick={() => soundManager.playButtonClick()}
              className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
              style={{
                backgroundColor: project.accentColor,
                boxShadow: `0 8px 24px -4px ${project.accentColor}60`,
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              <span>Live Demo</span>
              <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
            <a
              id={`case-github-${project.id}`}
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => soundManager.playHoverTick()}
              onClick={() => soundManager.playButtonClick()}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl border border-white/20 bg-white/[0.05] text-white font-medium text-sm hover:bg-white/[0.12] hover:border-white/40 transition-all duration-300 shadow-sm hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.7 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
              </svg>
              <span>GitHub Repo</span>
            </a>
          </div>

          {/* Nút đóng phụ tiện lợi cho người dùng mobile khi cuộn đọc tới chân trang */}
          <button
            onClick={() => {
              soundManager.playButtonClick();
              onClose();
            }}
            className="w-full mt-2 py-3 px-4 rounded-xl border border-white/20 bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 hover:text-white font-mono text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all active:scale-[0.98] select-none cursor-pointer"
          >
            <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Đóng Case Study</span>
          </button>
        </motion.div>

        {/* ── RIGHT PANEL: Interactive macOS Chrome Showcase & Gallery ── */}
        <div className="w-full md:w-[52%] xl:w-[54%] h-auto md:h-full md:overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent bg-black/45 p-4 sm:p-6 md:p-8 flex flex-col justify-between space-y-4 sm:space-y-6">
          {/* macOS Browser Mockup */}
          <div className="w-full rounded-2xl overflow-hidden border border-white/15 bg-[#0a0f1d] shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-md">
            {/* Browser Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0f172a]/90 border-b border-white/10 select-none">
              {/* Traffic lights */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50" />
              </div>
              {/* URL Address Bar */}
              <div className="flex-1 max-w-md mx-3 px-3 py-1 rounded-lg bg-black/50 border border-white/10 flex items-center gap-2 font-mono text-[11px] text-slate-300">
                <svg className="w-3 h-3 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="truncate text-slate-300">{project.live || project.url}</span>
              </div>
              {/* Online status badge */}
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="hidden sm:inline">ONLINE</span>
              </div>
            </div>

            {/* Browser Viewport with AnimatePresence */}
            <div className="relative aspect-video w-full bg-[#050811] overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImgIdx}
                  src={allImages[selectedImgIdx]}
                  alt={`${project.title} screenshot ${selectedImgIdx + 1}`}
                  onError={handleImgError}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover object-top"
                />
              </AnimatePresence>

              {/* Overlay Screen Badge */}
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/15 font-mono text-[11px] text-slate-300 flex items-center gap-2 pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.accentColor }} />
                <span>
                  SCREEN {selectedImgIdx + 1} / {allImages.length}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Thumbnail Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="tracking-wider uppercase">ẢNH CHI TIẾT (Click để xem màn hình)</span>
              <span>{allImages.length} MÀN HÌNH</span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
              {allImages.map((img, idx) => {
                const isSelected = selectedImgIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedImgIdx(idx);
                      soundManager.playButtonClick();
                    }}
                    onMouseEnter={() => soundManager.playHoverTick()}
                    className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 group ${
                      isSelected
                        ? 'border-white scale-[1.04] shadow-lg shadow-black/80'
                        : 'border-white/15 opacity-60 hover:opacity-100 hover:border-white/40'
                    }`}
                    style={isSelected ? { borderColor: project.accentColor } : {}}
                  >
                    <img
                      src={img}
                      alt={`Thumb ${idx + 1}`}
                      onError={handleImgError}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                    {isSelected && (
                      <span
                        className="absolute top-1 right-1 w-2 h-2 rounded-full shadow-sm"
                        style={{ backgroundColor: project.accentColor }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Bar with Back button */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => {
                soundManager.playButtonClick();
                onClose();
              }}
              onMouseEnter={() => soundManager.playHoverTick()}
              className="font-mono text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-2 group py-2"
            >
              <span className="transition-transform group-hover:-translate-x-1">←</span>
              <span>Đóng & Quay lại danh sách dự án</span>
            </button>
            <span className="font-mono text-[10px] text-slate-500 hidden sm:inline">
              ESC để đóng • Click thumbnail để chuyển ảnh
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── MAGNETIC VIEW BUTTON (Hút 8px theo vị trí chuột + Sound Effect) ─── */
function MagneticViewButton({
  onClick,
  accentColor,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  accentColor: string;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 340, damping: 20 });
  const springY = useSpring(y, { stiffness: 340, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    // Magnetic pull: 8px
    const normX = Math.max(-1, Math.min(1, distanceX / (rect.width / 2)));
    const normY = Math.max(-1, Math.min(1, distanceY / (rect.height / 2)));
    x.set(normX * 8);
    y.set(normY * 8);
  };

  const handleMouseEnter = () => {
    soundManager.playHoverTick();
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundManager.playButtonClick();
    onClick(e);
  };

  return (
    <motion.button
      ref={btnRef}
      style={{
        x: springX,
        y: springY,
        backgroundColor: accentColor,
        boxShadow: `0 10px 25px -4px ${accentColor}70`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white transition-shadow hover:scale-105 active:scale-95 cursor-pointer will-change-transform"
    >
      View Case Study <span className="text-sm">↗</span>
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/*  WORKS SECTION MAIN (Center Lock + Cycle Completion + Crystal Images)*/
/* ------------------------------------------------------------------ */

export default function WorksSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [clickPos, setClickPos] = useState<ClickPos | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const setCursorVariant = useCursorStore((state) => state.setVariant);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // Interactive Magnetic Mockup Tilt (Site of the Day standard: 3° to 5° tilt)
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 280, damping: 22 });
  const springTiltY = useSpring(tiltY, { stiffness: 280, damping: 22 });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Buttery-smooth spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.6,
    restDelta: 0.001,
  });

  /* ──────────────────────────────────────────────────────────────────
   *  LOGIC CUỘN MỚI (Hold at Center + Complete Circle before Next):
   *  - Giai đoạn 0: Dwell [0.00 - 0.28] (P0 ở tâm, bộ đếm chạy 0% -> 100%)
   *  - Chuyển tiếp 0->1: [0.28 - 0.36] (P0 trượt lên, P1 vào tâm)
   *  - Giai đoạn 1: Dwell [0.36 - 0.64] (P1 ở tâm, bộ đếm chạy 0% -> 100%)
   *  - Chuyển tiếp 1->2: [0.64 - 0.72] (P1 trượt lên, P2 vào tâm)
   *  - Giai đoạn 2: Dwell [0.72 - 1.00] (P2 ở tâm, bộ đếm chạy 0% -> 100%)
   * ────────────────────────────────────────────────────────────────── */

  // Theo dõi active project chính xác theo mốc chuyển tiếp + play sound effect
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    let nextIdx = 0;
    if (latest < 0.32) {
      nextIdx = 0;
    } else if (latest < 0.68) {
      nextIdx = 1;
    } else {
      nextIdx = 2;
    }
    if (nextIdx !== activeIndex) {
      setActiveIndex(nextIdx);
      soundManager.playCardSwitch();
    }
  });

  const activeProject = PROJECTS[activeIndex] || PROJECTS[0];

  // Tiến trình quay 1 vòng tròn trọn vẹn (0 -> 1) cho từng project đang ở tâm
  const circleProgress = useTransform(smoothProgress, (p) => {
    if (p <= 0.28) {
      return Math.min(1, Math.max(0, p / 0.28));
    } else if (p < 0.36) {
      return 1; // Hoàn thành vòng trước khi đổi tab
    } else if (p <= 0.64) {
      return Math.min(1, Math.max(0, (p - 0.36) / 0.28));
    } else if (p < 0.72) {
      return 1;
    } else {
      return Math.min(1, Math.max(0, (p - 0.72) / 0.28));
    }
  });

  /* ── Background Opacity (Chuyển tiếp mượt, không chớp, không vần màu) ── */
  const bgOpacity0 = useTransform(smoothProgress, [0, 0.28, 0.36], [1, 1, 0]);
  const bgOpacity1 = useTransform(smoothProgress, [0.28, 0.36, 0.64, 0.72], [0, 1, 1, 0]);
  const bgOpacity2 = useTransform(smoothProgress, [0.64, 0.72, 1], [0, 1, 1]);
  const bgOpacities = [bgOpacity0, bgOpacity1, bgOpacity2];

  /* ── Dịch chuyển Băng chuyền Trục Dọc (Giữ nguyên vị trí trong giai đoạn Dwell) ── */
  const stepDistance = isMobile ? '24vh' : '48vh';
  const negStepDistance = isMobile ? '-24vh' : '-48vh';

  const ribbonY = useTransform(
    smoothProgress,
    [0, 0.28, 0.36, 0.64, 0.72, 1],
    [stepDistance, stepDistance, '0vh', '0vh', negStepDistance, negStepDistance]
  );

  /* ── Độ phóng, Độ mờ và Blur từng Card (Chuẩn Thiết Kế Ảnh Mẫu 5: Active: 1/1/0px, Inactive Preview: 0.65/0.42/2px) ── */
  const scale0 = useTransform(smoothProgress, [0, 0.28, 0.36], [1, 1, 0.65]);
  const opacity0 = useTransform(smoothProgress, [0, 0.28, 0.36], [1, 1, 0.42]);
  const blur0 = useTransform(smoothProgress, [0, 0.28, 0.36], [0, 0, 2]);
  const filter0 = useTransform(blur0, (v) => `blur(${v}px)`);

  const scale1 = useTransform(
    smoothProgress,
    [0, 0.28, 0.36, 0.64, 0.72, 1],
    [0.65, 0.65, 1, 1, 0.65, 0.65]
  );
  const opacity1 = useTransform(
    smoothProgress,
    [0, 0.28, 0.36, 0.64, 0.72, 1],
    [0.42, 0.42, 1, 1, 0.42, 0.42]
  );
  const blur1 = useTransform(
    smoothProgress,
    [0, 0.28, 0.36, 0.64, 0.72, 1],
    [2, 2, 0, 0, 2, 2]
  );
  const filter1 = useTransform(blur1, (v) => `blur(${v}px)`);

  const scale2 = useTransform(smoothProgress, [0, 0.64, 0.72, 1], [0.65, 0.65, 1, 1]);
  const opacity2 = useTransform(smoothProgress, [0, 0.64, 0.72, 1], [0.42, 0.42, 1, 1]);
  const blur2 = useTransform(smoothProgress, [0, 0.64, 0.72, 1], [2, 2, 0, 0]);
  const filter2 = useTransform(blur2, (v) => `blur(${v}px)`);

  const cardScales = [scale0, scale1, scale2];
  const cardOpacities = [opacity0, opacity1, opacity2];
  const cardFilters = [filter0, filter1, filter2];
  const cardOffsets = [negStepDistance, '0vh', stepDistance];

  const handleSelectProject = useCallback((project: Project, pos: ClickPos) => {
    setClickPos(pos);
    setSelectedProject(project);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });

    // Interactive 3D Magnetic Mockup Tilt (3° to 5°)
    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    const MAX_TILT = 4.5; // degrees (3° to 5° as requested)
    tiltX.set(-normY * MAX_TILT);
    tiltY.set(normX * MAX_TILT);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCursorVariant('default');
    tiltX.set(0);
    tiltY.set(0);
  };

  const handleCardClick = (idx: number, e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    if (idx === activeIndex) {
      const rect = e.currentTarget.getBoundingClientRect();
      handleSelectProject(PROJECTS[idx], {
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
        clientX: e.clientX,
        clientY: e.clientY,
      });
    } else {
      // Cuộn nhanh tới giữa giai đoạn của card được click
      if (containerRef.current) {
        const targetOffsets = [0.14, 0.50, 0.86];
        const targetProgress = targetOffsets[idx];
        const containerRect = containerRef.current.getBoundingClientRect();
        const scrollTop = window.scrollY + containerRect.top;
        const scrollDistance = containerRef.current.scrollHeight - window.innerHeight;
        window.scrollTo({
          top: scrollTop + targetProgress * scrollDistance,
          behavior: 'smooth',
        });
      }
    }
  };

  // Awwwards 3D Camera Recession when scrolling from Works into Contact
  const worksExitScale = useTransform(smoothProgress, [0.90, 1], [1, 0.93]);
  const worksExitOpacity = useTransform(smoothProgress, [0.92, 1], [1, 0.25]);
  const worksExitBlur = useTransform(smoothProgress, [0.90, 1], [0, 4]);
  const worksExitFilter = useTransform(worksExitBlur, (v) => `blur(${v}px)`);
  const worksExitY = useTransform(smoothProgress, [0.90, 1], [0, -35]);

  return (
    <section ref={containerRef} id="works" className="relative z-30 h-[540vh] bg-[#060911]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap');
      `}</style>

      {/* ── STICKY VIEWPORT ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden select-none bg-[#060911]">
        <motion.div
          style={{
            scale: worksExitScale,
            opacity: worksExitOpacity,
            filter: worksExitFilter,
            y: worksExitY,
          }}
          className="w-full h-full relative"
        >

        {/* ── [Awwwards Transition] CYBER HORIZON SEAM (Chuyển tiếp mượt mà, đồng bộ màu dự án) ── */}
        <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none">
          {/* Lớp ánh sáng phát quang mờ chuyển tiếp từ About sang Works */}
          <div
            className="w-full h-28 bg-gradient-to-b from-transparent to-transparent transition-all duration-700"
            style={{
              backgroundImage: `linear-gradient(to bottom, ${activeProject.accentColor}15, transparent)`,
            }}
          />

          {/* Đường Laser Horizon sắc nét, phát quang đồng bộ theo màu dự án */}
          <div
            className="absolute top-0 inset-x-0 h-[1.5px] transition-all duration-700"
            style={{
              background: `linear-gradient(to right, transparent, ${activeProject.accentColor}, transparent)`,
              boxShadow: `0 0 18px ${activeProject.accentColor}80`,
            }}
          />

          {/* Badge định vị tinh tế đặt an toàn BÊN TRONG khung hình (top-3 md:top-6), không bị cắt đôi hay rớt dòng */}
          <div
            className="absolute top-2.5 sm:top-4 md:top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#060911]/90 backdrop-blur-md border transition-all duration-700 shadow-lg select-none whitespace-nowrap z-40"
            style={{
              borderColor: `${activeProject.accentColor}40`,
              boxShadow: `0 0 16px ${activeProject.accentColor}25`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse transition-colors duration-500"
              style={{ backgroundColor: activeProject.accentColor, boxShadow: `0 0 8px ${activeProject.accentColor}` }}
            />
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.22em] text-white/90 uppercase font-semibold whitespace-nowrap">
              REPOSITORY // 0{activeIndex + 1} OF 03
            </span>
          </div>
        </div>

        {/* ── 1. BACKGROUND LAYER: Full-Screen Atmospheric Immersion (Lan tỏa toàn khung hình, không bị khoanh vùng) ── */}
        <div className="absolute inset-0 -z-10 bg-[#060911] overflow-hidden pointer-events-none">
          {/* Lớp màu nền hòa sắc toàn màn hình biến chuyển theo active project */}
          <div
            className="absolute inset-0 transition-colors duration-1000 ease-out"
            style={{
              backgroundColor: `${activeProject.accentColor}08`,
            }}
          />

          {/* Lớp phản chiếu ánh sáng nghệ thuật từ ảnh dự án lan tỏa toàn khung hình */}
          {PROJECTS.map((proj, idx) => (
            <motion.div
              key={proj.id}
              style={{ opacity: bgOpacities[idx] }}
              className="absolute inset-0 will-change-[opacity]"
            >
              <img
                src={proj.coverImage}
                alt=""
                onError={handleImgError}
                aria-hidden
                className="w-full h-full object-cover blur-[90px] md:blur-[130px] scale-135 saturate-[1.65] contrast-[1.08] opacity-65"
              />
            </motion.div>
          ))}

          {/* Vầng hào quang thể tích lan tỏa mượt mà toàn màn hình, không khoanh vùng góc cạnh */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`ambient-volumetric-${activeProject.id}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 0.65, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              style={{
                background: `radial-gradient(ellipse 95% 85% at 50% 50%, ${activeProject.accentColor}38 0%, ${activeProject.accentColor}20 50%, ${activeProject.accentColor}08 80%, transparent 100%)`,
              }}
              className="absolute inset-0 blur-[90px] md:blur-[140px] mix-blend-screen pointer-events-none"
            />
          </AnimatePresence>
        </div>

        {/* ── BOTTOM TICKER CONTAINER (Ẩn trên mobile để nhường không gian cho nội dung & nút âm thanh) ── */}
        <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/60 via-black/20 to-transparent pt-4 pb-2 md:pt-8 md:pb-3 pointer-events-none hidden sm:block">
          <div className="px-8 md:px-16 flex justify-between items-center text-white/50 font-mono text-[9px] md:text-[11px] tracking-[0.25em] uppercase select-none">
            <span className="text-white/40 font-light text-sm md:text-base">+</span>
            <span>TENSION</span>
            <span className="hidden sm:inline text-white/40 font-light text-sm md:text-base">+</span>
            <span>IMMERSION</span>
            <span className="hidden md:inline text-white/40 font-light text-sm md:text-base">+</span>
            <span>IMPACT</span>
            <span className="text-white/40 font-light text-sm md:text-base">+</span>
          </div>
        </div>

        {/* ── 2. EDITORIAL 3-COLUMN CONTENT GRID ── */}
        <div className="relative z-10 w-full h-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col md:flex-row items-center justify-between md:justify-between gap-2 sm:gap-4 md:gap-8 pointer-events-none">

          {/* ── LEFT COLUMN: Kinetic Text Reveal ── */}
          <div className="w-full md:w-[28%] lg:w-[27%] pt-10 sm:pt-14 md:pt-0 flex flex-col justify-center items-start text-left pointer-events-auto z-20 pr-0 md:pr-4 shrink-0">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeProject.id}
                className="w-full"
              >
                {/* Category / Role với hiệu ứng vạch mở rộng */}
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-[0.25em] uppercase mb-1 sm:mb-2 text-slate-300"
                >
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: isMobile ? 18 : 32 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="inline-block h-px"
                    style={{ backgroundColor: activeProject.accentColor }}
                  />
                  <span style={{ color: activeProject.accentColor, filter: 'brightness(1.3)' }}>{activeProject.role}</span>
                </motion.div>

                {/* Big Display Title với Kinetic Word-Mask Stagger */}
                <KineticTitle title={activeProject.title} />

                {/* Mobile-only inline tagline */}
                <p className="block md:hidden text-slate-300/85 font-sans text-xs sm:text-sm line-clamp-1 mt-1 mb-1">
                  {activeProject.tagline}
                </p>

                {/* Year & Featured Badge với fade stagger */}
                <motion.div
                  initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-1 sm:mt-4 flex items-center gap-2.5"
                >
                  <span className="font-mono text-[11px] sm:text-xs text-white/50 tracking-widest">{activeProject.year}</span>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeProject.accentColor }} />
                  <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase text-white/60">Featured Work</span>
                </motion.div>

                {/* Action button với Interactive Magnetic Attraction 8px */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.45, delay: 0.15 }}
                  className="mt-2.5 sm:mt-6 flex items-center gap-3"
                >
                  <MagneticViewButton
                    accentColor={activeProject.accentColor}
                    onClick={(e) => handleCardClick(activeIndex, e)}
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Awwwards style segmented accent dashes */}
            <div className="hidden md:flex items-center gap-1 mt-12 select-none opacity-50">
              {Array.from({ length: 18 }).map((_, i) => (
                <span
                  key={i}
                  className="w-1 h-3 rounded-xs transition-colors duration-500"
                  style={{
                    backgroundColor:
                      i < (activeIndex + 1) * 6 ? activeProject.accentColor : 'rgba(255,255,255,0.18)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* ── CENTER COLUMN: Crystal-Clear Screenshots & Ribbon ── */}
          <div className="w-full md:w-[44%] lg:w-[46%] h-[32vh] sm:h-[38vh] md:h-full flex items-center justify-center pointer-events-auto relative my-1 sm:my-2 md:my-0">
            <div
              className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[540px] xl:max-w-[620px] aspect-[16/10] flex items-center justify-center cursor-none"
              style={{ perspective: 1200 }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => {
                setIsHovered(true);
                setCursorVariant('hidden');
              }}
              onMouseLeave={handleMouseLeave}
            >
              {/* Reactive Ambient Halo: Quầng sáng thể tích tỏa ra sau Card trung tâm */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`card-halo-${activeProject.id}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.5, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  style={{
                    background: `radial-gradient(circle at center, ${activeProject.accentColor} 0%, ${activeProject.accentColor}33 45%, transparent 70%)`,
                  }}
                  className="absolute w-[140%] h-[140%] -top-[20%] -left-[20%] rounded-full blur-[100px] md:blur-[140px] pointer-events-none z-0 mix-blend-screen"
                />
              </AnimatePresence>

              {/* Vertical Ribbon Moving Track (Dải băng chuyền dọc 3D tương tự Ảnh Mẫu 5) */}
              <motion.div
                style={{ y: ribbonY }}
                className="absolute inset-0 flex items-center justify-center z-10"
              >
                {PROJECTS.map((proj, idx) => {
                  const isCenter = activeIndex === idx;
                  const scaleVal = cardScales[idx];
                  const opacityVal = cardOpacities[idx];
                  const yOffset = cardOffsets[idx];

                  return (
                    <motion.div
                      key={proj.id}
                      style={{
                        y: yOffset,
                        scale: scaleVal,
                        opacity: opacityVal,
                        filter: cardFilters[idx],
                        rotateX: isCenter ? springTiltX : 0,
                        rotateY: isCenter ? springTiltY : 0,
                        transformStyle: 'preserve-3d',
                      }}
                      onClick={(e) => handleCardClick(idx, e)}
                      className={`group absolute inset-0 rounded-2xl md:rounded-[26px] overflow-hidden bg-[#0c1220] transition-shadow duration-500 select-none will-change-transform ${
                        isCenter
                          ? 'cursor-pointer border border-white/25 shadow-[0_35px_100px_-15px_rgba(0,0,0,0.95),0_0_50px_rgba(0,0,0,0.8)] ring-1 ring-white/20'
                          : 'cursor-pointer border border-white/10 hover:border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.7)]'
                      }`}
                    >
                      {/* Lớp phản chiếu kính mờ góc trên bên trái (Cyber Glass Reflection) */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.06] pointer-events-none z-10" />

                      {/* Interactive Magnetic Glare / Specular Sheen (Chỉ hiện khi hover card chính) */}
                      {isCenter && (
                        <div
                          className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300 mix-blend-overlay"
                          style={{
                            opacity: isHovered ? 0.6 : 0,
                            background: `radial-gradient(circle 420px at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.06) 50%, transparent 80%)`,
                          }}
                        />
                      )}

                      {/* Ảnh Project CHÂN THỰC, SẮC NÉT, KHÔNG BỊ KHUNG CHỮ HAY NGÀM CHE KHUẤT (Chuẩn Ảnh Mẫu 5) */}
                      <img
                        src={proj.coverImage}
                        alt={proj.title}
                        onError={handleImgError}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                        draggable={false}
                      />

                      {/* Peek Card Hint on non-center preview cards */}
                      {!isCenter && (
                        <div className="absolute inset-0 bg-black/35 flex items-center justify-center hover:bg-black/20 transition-colors">
                          <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/90 px-3.5 py-1.5 rounded-full bg-black/70 border border-white/20 backdrop-blur-xs shadow-md">
                            {proj.title}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Custom Magnetic "VIEW" Cursor Ring */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    className="absolute pointer-events-none z-50 flex items-center justify-center"
                    style={{
                      left: `${mousePos.x}%`,
                      top: `${mousePos.y}%`,
                      x: '-50%',
                      y: '-50%',
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  >
                    <div className="w-20 h-20 rounded-full flex items-center justify-center border-2 border-white/90 bg-white/20 backdrop-blur-md shadow-2xl">
                      <span className="font-display font-black text-white text-xs uppercase tracking-widest">
                        View
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Editorial Description & Dynamic Circular Progress Ring ── */}
          <div className="w-full md:w-[28%] lg:w-[26%] pb-6 md:pb-0 flex flex-col justify-center items-center md:items-end text-center md:text-right pointer-events-auto z-20 space-y-2 sm:space-y-4 md:space-y-6">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeProject.id}
                className="w-full space-y-2 sm:space-y-4"
              >
                <motion.p
                  initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
                  transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden md:block text-white/80 font-sans text-sm md:text-base leading-relaxed max-w-sm"
                >
                  {activeProject.tagline}
                </motion.p>

                {/* Tech Pills với Spring Stagger */}
                <div className="flex flex-wrap gap-1.5 justify-center md:justify-end">
                  {activeProject.tech.split(',').slice(0, 3).map((t, idx) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, scale: 0.8, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.35, delay: 0.12 + idx * 0.05 }}
                      className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/10 text-white/90 border border-white/15 backdrop-blur-sm"
                    >
                      {t.trim()}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Mobile Project Indicator: 3 Tap-to-jump Pills */}
            <div className="flex md:hidden items-center justify-center gap-2 pt-0.5 select-none">
              {PROJECTS.map((p, i) => (
                <button
                  key={p.id}
                  onClick={(e) => handleCardClick(i, e)}
                  aria-label={`Go to project ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === i ? 'w-7 shadow-sm' : 'w-2 bg-white/25 hover:bg-white/50'
                  }`}
                  style={activeIndex === i ? { backgroundColor: activeProject.accentColor } : {}}
                />
              ))}
            </div>

            {/* Circular Progress Ring: Hoàn thành 1 chu kỳ trọn vẹn trước khi chuyển tab (Desktop) */}
            <div className="hidden md:flex pt-2 items-center gap-4">
              <ScrollIndicator
                activeIndex={activeIndex}
                circleProgress={circleProgress}
              />
            </div>

            {/* Scroll Down Hint */}
            <p className="font-mono text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-white/40 flex items-center gap-1.5 select-none">
              <span>Scroll to explore</span>
              <span className="inline-block animate-bounce text-xs sm:text-sm">↓</span>
            </p>
          </div>
        </div>
        </motion.div>
      </div>

      {/* ── CASE STUDY MODAL ── */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectCaseStudy
            key={selectedProject.id}
            project={selectedProject}
            clickPos={clickPos}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
