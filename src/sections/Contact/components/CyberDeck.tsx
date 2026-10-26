import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { soundManager } from '../../../utils/sound';

const CONTACT_EMAIL = 'huynhnhathuy.dev@gmail.com';
const GITHUB_URL = 'https://github.com/HuyDev19';
const LINKEDIN_URL = 'https://linkedin.com';
const FACEBOOK_URL = 'https://facebook.com';
const TIKTOK_URL = 'https://tiktok.com';

interface TerminalMessage {
  type: 'system' | 'user' | 'success' | 'info' | 'guide';
  text: string;
}

interface CyberDeckProps {
  onToggleForm: () => void;
  isFormOpen: boolean;
}

export const CyberDeck: React.FC<CyberDeckProps> = ({ onToggleForm, isFormOpen }) => {
  const deckRef = useRef<HTMLDivElement>(null);
  const logsContainerRef = useRef<HTMLDivElement>(null);

  // 3D Parallax Tilt Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 220, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 220, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const glareX = useTransform(springX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(springY, [-0.5, 0.5], ['0%', '100%']);

  // Real-time HCM Clock & Ping Latency
  const [hcmTime, setHcmTime] = useState('');
  const [latency, setLatency] = useState(14);

  // CRT Screen Power-on sequence
  const [isBooted, setIsBooted] = useState(false);

  // Scroll to Top
  const scrollToTop = () => {
    soundManager.playButtonClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Terminal State
  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState<TerminalMessage[]>([
    { type: 'system', text: '>> CYBER_DECK OS v2.5 [SYSTEM ONLINE]' },
    { type: 'system', text: '>> HOST: HUYNH NHAT HUY // FRONTEND ENGINEER' },
    {
      type: 'guide',
      text: '--------------------------------------------------\n💡 HƯỚNG DẪN: Click các cổng điều khiển bên dưới hoặc gõ lệnh:\n  • message / form ➔ Mở/đóng form gửi thông điệp trực tiếp\n  • email          ➔ Sao chép địa chỉ email\n  • cv             ➔ Kích hoạt giải mã hồ sơ năng lực PDF\n  • fb / tiktok    ➔ Kết nối mạng xã hội Facebook & TikTok\n  • github / git   ➔ Mở kho mã nguồn dự án GitHub\n  • skills         ➔ Xem danh mục công nghệ cốt lõi\n  • info           ➔ Xem thông số kỹ thuật & bản quyền\n--------------------------------------------------',
    },
  ]);

  // Copy state & Decrypt CV animation state
  const [copied, setCopied] = useState(false);
  const [decryptProgress, setDecryptProgress] = useState<number | null>(null);

  // Auto-scroll terminal container ONLY (never scrolls browser window or pushes title)
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [messages, decryptProgress]);

  // Boot sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBooted(true);
      soundManager.playBeepSuccess();
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Clock ticker & Latency
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = new Intl.DateTimeFormat('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);
      setHcmTime(timeString);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    const pingInt = setInterval(() => {
      setLatency(Math.floor(12 + Math.random() * 6));
    }, 3800);

    return () => {
      clearInterval(interval);
      clearInterval(pingInt);
    };
  }, []);

  // Handle Mouse Move for 3D Tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!deckRef.current) return;
    const rect = deckRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Trigger Open Form Module
  const triggerOpenForm = () => {
    soundManager.playButtonClick();
    onToggleForm();
    soundManager.playBeepSuccess();

    if (!isFormOpen) {
      setMessages((prev) => [
        ...prev,
        { type: 'user', text: '> execute: open_message_module' },
        {
          type: 'success',
          text: '✓ ĐÃ MỞ MODULE: TRANSMISSION BUFFER (Form gửi thông điệp nhanh đã hiển thị bên dưới).',
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        { type: 'user', text: '> execute: close_message_module' },
        {
          type: 'info',
          text: '>> Đã thu gọn module form gửi thông điệp.',
        },
      ]);
    }
  };

  // Copy Email Function
  const triggerEmail = () => {
    soundManager.playButtonClick();
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    soundManager.playBeepSuccess();

    setMessages((prev) => [
      ...prev,
      { type: 'user', text: '> execute: copy_email' },
      {
        type: 'success',
        text: `✓ ĐÃ SAO CHÉP EMAIL [${CONTACT_EMAIL}] VÀO CLIPBOARD. SẴN SÀNG GỬI THƯ!`,
      },
    ]);
  };

  // Decrypt CV Animation
  const triggerDecryptCV = () => {
    if (decryptProgress !== null) return;
    soundManager.playButtonClick();
    soundManager.playBeepSuccess();

    setMessages((prev) => [
      ...prev,
      { type: 'user', text: '> execute: decrypt_resume_dossier' },
      { type: 'system', text: '>> INITIATING QUANTUM DECRYPTION PROTOCOL...' },
    ]);

    setDecryptProgress(0);
    const stepInterval = setInterval(() => {
      setDecryptProgress((prev) => {
        if (prev === null) return 0;
        const next = prev + 25;
        soundManager.playKeypress();
        if (next >= 100) {
          clearInterval(stepInterval);
          soundManager.playBeepSuccess();
          setTimeout(() => {
            setMessages((m) => [
              ...m,
              {
                type: 'success',
                text: '✓ GIẢI MÃ HOÀN TẤT [100%]. RESUME // HUYNH_NHAT_HUY_FRONTEND_ENGINEER.PDF',
              },
              {
                type: 'info',
                text: '>> Bạn có thể gửi email trực tiếp để nhận bản PDF chi tiết mới nhất!',
              },
            ]);
            setDecryptProgress(null);
          }, 300);
          return 100;
        }
        return next;
      });
    }, 180);
  };

  // Process Terminal Command
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    soundManager.playKeypress();
    setMessages((prev) => [...prev, { type: 'user', text: `guest@cyberdeck:~$ ${inputVal}` }]);
    setInputVal('');

    switch (cmd) {
      case 'message':
      case 'form':
      case 'contact':
      case 'send':
      case 'nhan':
        triggerOpenForm();
        break;

      case 'close':
      case 'dong':
        if (isFormOpen) {
          triggerOpenForm();
        } else {
          setMessages((prev) => [
            ...prev,
            { type: 'info', text: '>> Form hiện tại đã được thu gọn.' },
          ]);
        }
        break;

      case 'help':
      case 'trogiup':
      case '?':
        soundManager.playBeepSuccess();
        setMessages((prev) => [
          ...prev,
          {
            type: 'guide',
            text: 'DANH SÁCH LỆNH HỆ THỐNG:\n• message   : Mở/Đóng form gửi thông điệp trực tiếp bên dưới\n• email     : Sao chép địa chỉ email vào clipboard\n• cv        : Kích hoạt giải mã hồ sơ năng lực PDF\n• fb        : Kết nối Facebook cá nhân (lệnh: facebook)\n• tiktok    : Xem kênh TikTok sáng tạo (lệnh: tt)\n• github    : Mở kho mã nguồn HuyDev19 (lệnh: git)\n• linkedin  : Kết nối mạng lưới chuyên môn\n• skills    : Liệt kê kho vũ khí công nghệ cốt lõi\n• clear     : Dọn sạch màn hình terminal\n• top       : Cuộn mượt về đầu trang',
          },
        ]);
        break;

      case 'email':
      case 'mail':
        triggerEmail();
        break;

      case 'github':
      case 'git':
        soundManager.playButtonClick();
        window.open(GITHUB_URL, '_blank');
        setMessages((prev) => [
          ...prev,
          { type: 'success', text: `>> MỞ TAB GITHUB: ${GITHUB_URL}` },
        ]);
        break;

      case 'facebook':
      case 'fb':
        soundManager.playButtonClick();
        window.open(FACEBOOK_URL, '_blank');
        setMessages((prev) => [
          ...prev,
          { type: 'success', text: `>> MỞ TAB FACEBOOK: ${FACEBOOK_URL}` },
        ]);
        break;

      case 'tiktok':
      case 'tt':
        soundManager.playButtonClick();
        window.open(TIKTOK_URL, '_blank');
        setMessages((prev) => [
          ...prev,
          { type: 'success', text: `>> MỞ TAB TIKTOK: ${TIKTOK_URL}` },
        ]);
        break;

      case 'linkedin':
        soundManager.playButtonClick();
        window.open(LINKEDIN_URL, '_blank');
        setMessages((prev) => [
          ...prev,
          { type: 'success', text: `>> MỞ TAB LINKEDIN: ${LINKEDIN_URL}` },
        ]);
        break;

      case 'cv':
      case 'resume':
        triggerDecryptCV();
        break;

      case 'skills':
      case 'tech':
      case 'kynang':
        soundManager.playBeepSuccess();
        setMessages((prev) => [
          ...prev,
          {
            type: 'info',
            text: 'KHO VŨ KHÍ CÔNG NGHỆ (CORE STACK):\n• FRONTEND : React 19, Next.js, TypeScript, Tailwind CSS, Framer Motion, GSAP\n• BACKEND  : Node.js, Python Sockets, WebRTC, Socket.IO, Multi-threading\n• AI/DATA  : RAG Architecture, Vector DB, Gemini/OpenAI API, Semantic Chunking',
          },
        ]);
        break;

      case 'clear':
      case 'cls':
        setMessages([
          { type: 'system', text: '>> TERMINAL CLEARED. CYBER_DECK READY.' },
        ]);
        break;

      case 'system':
      case 'info':
      case 'copyright':
      case 'banquyen':
        soundManager.playBeepSuccess();
        setMessages((prev) => [
          ...prev,
          {
            type: 'guide',
            text: '>> HUYNH NHAT HUY // FRONTEND ENGINEER & ARCHITECT\n>> BẢN QUYỀN © 2026 TẤT CẢ QUYỀN ĐƯỢC BẢO LƯU.\n>> KIẾN TRÚC: REACT 19 · FRAMER MOTION · 60FPS UI · LENIS ACCELERATION\n>> TRẠNG THÁI: SẴN SÀNG CHO CƠ HỘI MỚI (AVAILABLE FOR HIRE)',
          },
        ]);
        break;

      case 'top':
      case 'home':
      case 'vedau':
        scrollToTop();
        setMessages((prev) => [
          ...prev,
          { type: 'success', text: '>> ĐÃ CUỘN VỀ ĐẦU TRANG (HOME).' },
        ]);
        break;

      default:
        setMessages((prev) => [
          ...prev,
          {
            type: 'info',
            text: `>> ĐÃ GHI NHẬN: "${cmd}". Gõ "help" hoặc click nút [ ✉ Gửi lời nhắn ] để mở form.`,
          },
        ]);
        break;
    }
  };

  return (
    <div
      ref={deckRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-4xl mx-auto select-none"
      style={{ perspective: 1200 }}
    >
      {/* ── 3D CYBER DECK BODY ── */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative rounded-3xl bg-[#0B101D] border-2 border-slate-700/80 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(45,212,191,0.08)] p-4 sm:p-6 md:p-7 overflow-hidden transition-shadow duration-300 hover:shadow-[0_35px_100px_rgba(0,0,0,0.95),0_0_50px_rgba(45,212,191,0.16)]"
      >
        {/* Dynamic Glass Glare Sweep */}
        <motion.div
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)',
            left: glareX,
            top: glareY,
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] pointer-events-none rounded-full blur-2xl z-40"
        />

        {/* 4 Corner Hex Torx Screws */}
        <div className="absolute top-2.5 left-2.5 text-slate-500 font-mono text-[9px] flex items-center gap-1">
          <svg className="w-3.5 h-3.5 text-slate-600" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" stroke="#334155" strokeWidth="2" fill="#0f172a" />
            <circle cx="12" cy="12" r="3" fill="#64748b" />
          </svg>
        </div>
        <div className="absolute top-2.5 right-2.5 text-slate-500 font-mono text-[9px] flex items-center gap-1">
          <svg className="w-3.5 h-3.5 text-slate-600" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" stroke="#334155" strokeWidth="2" fill="#0f172a" />
            <circle cx="12" cy="12" r="3" fill="#64748b" />
          </svg>
        </div>
        <div className="absolute bottom-2.5 left-2.5 text-slate-500 font-mono text-[9px] flex items-center gap-1">
          <svg className="w-3.5 h-3.5 text-slate-600" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" stroke="#334155" strokeWidth="2" fill="#0f172a" />
            <circle cx="12" cy="12" r="3" fill="#64748b" />
          </svg>
        </div>
        <div className="absolute bottom-2.5 right-2.5 text-slate-500 font-mono text-[9px] flex items-center gap-1">
          <svg className="w-3.5 h-3.5 text-slate-600" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" stroke="#334155" strokeWidth="2" fill="#0f172a" />
            <circle cx="12" cy="12" r="3" fill="#64748b" />
          </svg>
        </div>

        {/* Lateral Cooling Vents */}
        <div className="absolute left-1.5 top-16 bottom-16 w-1 flex flex-col justify-around pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div key={`vent-l-${i}`} className="w-full h-2.5 rounded bg-slate-800 shadow-[0_0_6px_rgba(45,212,191,0.4)]" />
          ))}
        </div>
        <div className="absolute right-1.5 top-16 bottom-16 w-1 flex flex-col justify-around pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div key={`vent-r-${i}`} className="w-full h-2.5 rounded bg-slate-800 shadow-[0_0_6px_rgba(45,212,191,0.4)]" />
          ))}
        </div>

        {/* ── TOP HARDWARE STRIP (Metal Badge & LED Status) ── */}
        <div className="relative z-10 flex flex-wrap items-center justify-between pb-2.5 border-b border-slate-700/60 mb-3 px-1">
          {/* Laser-etched Metal Badge */}
          <div className="flex items-center gap-2">
            <div className="px-2.5 py-0.5 rounded bg-[#070b14] border border-slate-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_#2dd4bf]" />
              <span className="font-mono text-[10px] tracking-wider text-teal-300 font-bold uppercase">
                CYBER_DECK MK-III // HUYNH NHAT HUY
              </span>
            </div>
            <span className="hidden sm:inline font-mono text-[9px] text-slate-500 uppercase tracking-widest">
              SER: HNH-2025-DEV
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              onMouseEnter={() => soundManager.playHoverTick()}
              className="px-2 py-0.5 rounded bg-slate-800/80 hover:bg-teal-500/20 text-slate-400 hover:text-teal-300 border border-slate-700 hover:border-teal-500/50 font-mono text-[9px] uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer"
              title="Cuộn về đầu trang"
            >
              <span>TOP</span>
              <span className="font-bold">↑</span>
            </button>
          </div>

          {/* LED Status Indicators */}
          <div className="flex items-center gap-3 font-mono text-[9px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
              <span>PWR: ON</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee] animate-pulse" />
              <span>SYNC: {latency}ms</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
              <span>HCM: {hcmTime || '17:28:00'}</span>
            </div>
          </div>
        </div>

        {/* ── CENTRAL CRT / LCD PHOSPHOR SCREEN ── */}
        <motion.div
          initial={{ scaleY: 0.05, filter: 'brightness(2.5)' }}
          animate={{ scaleY: isBooted ? 1 : 0.05, filter: isBooted ? 'brightness(1)' : 'brightness(2.5)' }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative rounded-2xl bg-[#040914] border-2 border-teal-500/40 shadow-[inset_0_0_35px_rgba(45,212,191,0.12),0_8px_25px_rgba(0,0,0,0.8)] p-3.5 sm:p-4 md:p-5 overflow-hidden mb-4"
        >
          {/* Scanline CRT overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.45)_50%)] bg-[size:100%_4px] pointer-events-none z-20 opacity-80" />
          
          {/* Phosphor curvature vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_65%,rgba(0,0,0,0.7)_100%)] pointer-events-none z-20" />

          {/* Terminal Screen Header */}
          <div className="relative z-10 flex items-center justify-between pb-1.5 border-b border-teal-500/20 font-mono text-[9px] sm:text-[10px] text-teal-400/80 mb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
              <span>CONDUIT_RECEIVER // TELEMETRY TERMINAL</span>
            </div>
            <span>CH: 142.850 MHz</span>
          </div>

          {/* Terminal Logs Viewport (Separated Internal Scroll: Never scrolls window or pushes title) */}
          <div
            ref={logsContainerRef}
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            className="relative z-10 font-mono text-[11px] sm:text-xs md:text-sm text-teal-300 space-y-1 h-32 sm:h-36 md:h-40 overflow-y-auto pr-1.5 custom-scrollbar overscroll-contain select-text"
          >
            {messages.map((m, idx) => (
              <div
                key={`term-msg-${idx}`}
                className={`leading-relaxed whitespace-pre-wrap ${
                  m.type === 'user'
                    ? 'text-white font-semibold'
                    : m.type === 'success'
                      ? 'text-emerald-400 font-bold bg-emerald-950/40 p-1.5 rounded border border-emerald-500/30'
                      : m.type === 'guide'
                        ? 'text-cyan-300/95 bg-slate-950/60 p-2 rounded border border-cyan-500/20'
                        : m.type === 'system'
                          ? 'text-teal-400/90'
                          : 'text-cyan-300'
                }`}
              >
                {m.text}
              </div>
            ))}

            {/* Decrypting Progress Bar Animation */}
            {decryptProgress !== null && (
              <div className="bg-slate-900/90 border border-teal-500/50 p-2 rounded-lg font-mono text-xs">
                <div className="flex justify-between text-teal-300 mb-1">
                  <span>DECRYPTING CV DOSSIER...</span>
                  <span className="font-bold text-emerald-400">{decryptProgress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-200"
                    style={{ width: `${decryptProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Streamlined Command Shortcuts Toolbar */}
          <div className="relative z-10 pt-2 border-t border-teal-500/20 flex flex-wrap items-center justify-between gap-1.5 mt-2.5">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              <span className="font-mono text-[9px] text-teal-400/70 uppercase tracking-wider shrink-0 mr-1">
                LỆNH NHANH:
              </span>
              {[
                {
                  label: isFormOpen ? '✕ Đóng form' : '✉ Gửi thông điệp',
                  action: triggerOpenForm,
                  highlight: true,
                },
                {
                  label: '📋 Copy Mail',
                  action: triggerEmail,
                  highlight: false,
                },
                {
                  label: '💾 Tải CV',
                  action: triggerDecryptCV,
                  highlight: false,
                },
                {
                  label: '⚡ Kỹ năng',
                  action: () => {
                    soundManager.playKeypress();
                    setInputVal('skills');
                    setTimeout(() => {
                      handleTerminalSubmit({ preventDefault: () => {} } as React.FormEvent);
                    }, 50);
                  },
                  highlight: false,
                },
                {
                  label: '❓ Trợ giúp',
                  action: () => {
                    soundManager.playKeypress();
                    setInputVal('help');
                    setTimeout(() => {
                      handleTerminalSubmit({ preventDefault: () => {} } as React.FormEvent);
                    }, 50);
                  },
                  highlight: false,
                },
              ].map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={chip.action}
                  onMouseEnter={() => soundManager.playHoverTick()}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer shrink-0 ${
                    chip.highlight
                      ? 'bg-teal-500/30 text-teal-200 border border-teal-400 font-bold hover:bg-teal-400 hover:text-slate-950'
                      : 'bg-teal-950/50 border border-teal-500/30 text-teal-300 hover:bg-teal-500 hover:text-slate-950'
                  }`}
                >
                  [ {chip.label} ]
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                soundManager.playKeypress();
                setInputVal('clear');
                setTimeout(() => {
                  handleTerminalSubmit({ preventDefault: () => {} } as React.FormEvent);
                }, 50);
              }}
              onMouseEnter={() => soundManager.playHoverTick()}
              className="text-[9px] font-mono text-slate-500 hover:text-teal-300 transition-colors cursor-pointer ml-auto shrink-0"
              title="Xóa log terminal"
            >
              [ ✕ Clear ]
            </button>
          </div>

          {/* Interactive Command Line Input */}
          <form onSubmit={handleTerminalSubmit} className="relative z-10 mt-2 flex items-center gap-2">
            <span className="font-mono text-[11px] sm:text-xs text-teal-400 font-bold shrink-0">
              guest@cyberdeck:~$
            </span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="gõ lệnh (ví dụ: message, email, fb, tiktok, cv, skills)..."
              className="flex-1 bg-transparent font-mono text-xs sm:text-sm text-white placeholder-teal-600/60 focus:outline-none"
            />
            <button
              type="submit"
              className="px-2.5 py-0.5 rounded bg-teal-500/20 hover:bg-teal-500 hover:text-slate-950 border border-teal-500/50 text-[10px] font-mono text-teal-300 transition-colors cursor-pointer"
            >
              ENTER ↵
            </button>
          </form>
        </motion.div>

        {/* ── LOWER TACTILE DECK (Organized into Core Consoles + Social Channels) ── */}
        <div className="relative z-10 space-y-2 px-0.5">
          {/* ROW 1: 3 CORE TACTICAL CONSOLES */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
            {/* Port 01: Message Buffer Switch */}
            <button
              type="button"
              onClick={triggerOpenForm}
              onMouseEnter={() => soundManager.playHoverTick()}
              className={`group p-2.5 rounded-xl border transition-all duration-200 flex flex-col justify-between text-left cursor-pointer active:translate-y-0.5 ${
                isFormOpen
                  ? 'bg-teal-950/80 border-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.3)]'
                  : 'bg-slate-900/90 border-slate-700 hover:border-teal-400'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[9px] text-slate-400 uppercase tracking-wider">
                  PORT 01 // DISPATCH BUFFER
                </span>
                <span className={`w-1.5 h-1.5 rounded-full ${isFormOpen ? 'bg-teal-400 animate-pulse' : 'bg-slate-500'}`} />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-teal-950 flex items-center justify-center text-teal-400 text-xs group-hover:scale-105 transition-transform">
                  ✉
                </span>
                <span className="font-mono text-[11px] sm:text-xs font-bold text-white group-hover:text-teal-300">
                  {isFormOpen ? '✕ ĐÓNG FORM' : 'MỞ FORM GỬI THƯ'}
                </span>
              </div>
            </button>

            {/* Port 02: Direct Email Copy */}
            <button
              type="button"
              onClick={triggerEmail}
              onMouseEnter={() => soundManager.playHoverTick()}
              className="group p-2.5 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-emerald-400 transition-all duration-200 flex flex-col justify-between text-left cursor-pointer active:translate-y-0.5"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[9px] text-slate-400 uppercase tracking-wider">
                  PORT 02 // DIRECT FREQUENCY
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-emerald-950 flex items-center justify-center text-emerald-400 text-xs group-hover:scale-105 transition-transform">
                  📋
                </span>
                <span className="font-mono text-[11px] sm:text-xs font-bold text-white group-hover:text-emerald-300">
                  {copied ? '✓ ĐÃ COPY EMAIL' : 'SAO CHÉP EMAIL'}
                </span>
              </div>
            </button>

            {/* Port 03: Quantum Decrypt CV */}
            <button
              type="button"
              onClick={triggerDecryptCV}
              onMouseEnter={() => soundManager.playHoverTick()}
              className="group p-2.5 rounded-xl bg-gradient-to-r from-amber-950/40 to-slate-900 border border-amber-500/50 hover:border-amber-400 transition-all duration-200 flex flex-col justify-between text-left cursor-pointer active:translate-y-0.5 shadow-[0_0_12px_rgba(245,158,11,0.15)]"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[9px] text-amber-300/80 uppercase tracking-wider">
                  SLOT 03 // QUANTUM CV DRIVE
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-amber-950 flex items-center justify-center text-amber-400 text-xs group-hover:scale-105 transition-transform">
                  💾
                </span>
                <span className="font-mono text-[11px] sm:text-xs font-bold text-amber-300 group-hover:text-amber-200">
                  DECRYPT CV ⬇
                </span>
              </div>
            </button>
          </div>

          {/* ROW 2: SATELLITE NETWORK UPLINKS (GITHUB, FACEBOOK, TIKTOK, LINKEDIN) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* Uplink 01: GitHub */}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                soundManager.playButtonClick();
                setMessages((prev) => [
                  ...prev,
                  { type: 'user', text: '> access: uplink_github' },
                  { type: 'success', text: `>> MỞ TAB GITHUB: ${GITHUB_URL}` },
                ]);
              }}
              onMouseEnter={() => soundManager.playHoverTick()}
              className="group px-2.5 py-1.5 rounded-lg bg-slate-900/70 border border-slate-700/80 hover:border-teal-400/80 hover:bg-slate-800/80 transition-all duration-200 flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] sm:text-[11px] font-bold text-slate-200 group-hover:text-teal-300 leading-tight">
                    GitHub
                  </span>
                  <span className="font-mono text-[8px] text-slate-500">@HuyDev19</span>
                </div>
              </div>
              <span className="font-mono text-[9px] text-slate-600 group-hover:text-teal-400">↗</span>
            </a>

            {/* Uplink 02: Facebook */}
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                soundManager.playButtonClick();
                setMessages((prev) => [
                  ...prev,
                  { type: 'user', text: '> access: uplink_facebook' },
                  { type: 'success', text: `>> MỞ TAB FACEBOOK: ${FACEBOOK_URL}` },
                ]);
              }}
              onMouseEnter={() => soundManager.playHoverTick()}
              className="group px-2.5 py-1.5 rounded-lg bg-slate-900/70 border border-slate-700/80 hover:border-blue-500/80 hover:bg-slate-800/80 transition-all duration-200 flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#1877F2] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] sm:text-[11px] font-bold text-slate-200 group-hover:text-blue-400 leading-tight">
                    Facebook
                  </span>
                  <span className="font-mono text-[8px] text-slate-500">Kết nối Profile</span>
                </div>
              </div>
              <span className="font-mono text-[9px] text-slate-600 group-hover:text-blue-400">↗</span>
            </a>

            {/* Uplink 03: TikTok */}
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                soundManager.playButtonClick();
                setMessages((prev) => [
                  ...prev,
                  { type: 'user', text: '> access: uplink_tiktok' },
                  { type: 'success', text: `>> MỞ TAB TIKTOK: ${TIKTOK_URL}` },
                ]);
              }}
              onMouseEnter={() => soundManager.playHoverTick()}
              className="group px-2.5 py-1.5 rounded-lg bg-slate-900/70 border border-slate-700/80 hover:border-pink-500/80 hover:bg-slate-800/80 transition-all duration-200 flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-pink-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] sm:text-[11px] font-bold text-slate-200 group-hover:text-pink-400 leading-tight">
                    TikTok
                  </span>
                  <span className="font-mono text-[8px] text-slate-500">Tech & Shorts</span>
                </div>
              </div>
              <span className="font-mono text-[9px] text-slate-600 group-hover:text-pink-400">↗</span>
            </a>

            {/* Uplink 04: LinkedIn */}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                soundManager.playButtonClick();
                setMessages((prev) => [
                  ...prev,
                  { type: 'user', text: '> access: uplink_linkedin' },
                  { type: 'success', text: `>> MỞ TAB LINKEDIN: ${LINKEDIN_URL}` },
                ]);
              }}
              onMouseEnter={() => soundManager.playHoverTick()}
              className="group px-2.5 py-1.5 rounded-lg bg-slate-900/70 border border-slate-700/80 hover:border-[#0A66C2]/80 hover:bg-slate-800/80 transition-all duration-200 flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#0A66C2] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] sm:text-[11px] font-bold text-slate-200 group-hover:text-blue-400 leading-tight">
                    LinkedIn
                  </span>
                  <span className="font-mono text-[8px] text-slate-500">Mạng lưới Pro</span>
                </div>
              </div>
              <span className="font-mono text-[9px] text-slate-600 group-hover:text-blue-400">↗</span>
            </a>
          </div>
        </div>

        {/* ── CHASSIS BOTTOM PLATE // INTEGRATED FOOTER METRICS ── */}
        <div className="relative z-10 pt-3 mt-3 border-t border-slate-700/60 flex flex-wrap items-center justify-between font-mono text-[9px] text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded bg-slate-800 border border-teal-500/40 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-teal-400" />
            </div>
            <span className="text-slate-300 font-semibold">© 2026 HUYNH NHAT HUY · ALL RIGHTS RESERVED</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-slate-500">REACT 19 · 60FPS HARDWARE ACCELERATION</span>
            <button
              type="button"
              onClick={scrollToTop}
              onMouseEnter={() => soundManager.playHoverTick()}
              className="text-teal-400 hover:text-teal-300 flex items-center gap-1 font-bold cursor-pointer transition-colors"
              title="Cuộn mượt về đầu trang"
            >
              <span>RETURN TO TOP</span>
              <span>↑</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CyberDeck;
