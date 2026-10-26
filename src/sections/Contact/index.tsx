import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { soundManager } from '../../utils/sound';
import CyberDeck from './components/CyberDeck';

const CONTACT_EMAIL = 'huynhnhathuy.dev@gmail.com';

const QUICK_TOPICS = [
  'Tuyển dụng Frontend',
  'Dự án Web tương tác',
  'Tư vấn Real-Time/AI',
  'Giao lưu công nghệ',
];

export const ContactSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  // Form toggle state (hidden by default per user request)
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Quick Dispatch Form State
  const [selectedTopic, setSelectedTopic] = useState(QUICK_TOPICS[0]);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // Toggle Form Handler
  const handleToggleForm = () => {
    setIsFormOpen((prev) => {
      const next = !prev;
      if (next) {
        setTimeout(() => {
          formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
      return next;
    });
  };

  // Handle Transmit Message
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderEmail && !senderName) return;

    soundManager.playButtonClick();
    setIsTransmitting(true);

    setTimeout(() => {
      setIsTransmitting(false);
      setIsSent(true);
      soundManager.playBeepSuccess();

      // Open mail client with prefilled body
      const subject = encodeURIComponent(`[${selectedTopic}] Liên hệ từ ${senderName || 'Nhà tuyển dụng'}`);
      const body = encodeURIComponent(
        `Chào Huy,\n\nTôi là ${senderName} (${senderEmail}).\nMục đích kết nối: ${selectedTopic}\n\nNội dung:\n${message}\n\nTrân trọng.`
      );
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    }, 1100);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className={`relative w-full bg-[#050811] text-white flex flex-col justify-center items-center min-h-screen pt-20 sm:pt-24 lg:pt-6 pb-28 sm:pb-32 lg:pb-6 ${
        isFormOpen ? 'lg:h-auto lg:min-h-screen lg:py-12' : 'lg:h-screen'
      }`}
    >
      {/* ── Background Cyber Blueprint Grid & Ambient Lights ── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_40%,#000_65%,transparent_100%)] opacity-20 pointer-events-none" />

      {/* Ambient Radial Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-[10%] w-[450px] h-[350px] bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* ── Main Content Container (Fits perfectly inside 100vh when form is closed) ── */}
      <motion.div
        animate={{ opacity: isInView ? 1 : 0.85, y: isInView ? 0 : 15 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center items-center my-auto"
      >
        {/* Top Header Telemetry */}
        <div className="text-center max-w-3xl mx-auto mb-3 sm:mb-4 px-2">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-0.5 rounded-full bg-slate-900/80 border border-teal-500/30 mb-1.5 sm:mb-2 max-w-full">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping shrink-0" />
            <span className="font-mono text-[8px] sm:text-[10px] text-teal-300 tracking-wider sm:tracking-widest uppercase font-bold truncate">
              <span className="hidden sm:inline">PHYSICAL HARDWARE // </span>CYBER_DECK DOCKING TERMINAL
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none">
            INITIATE <span className="text-teal-400 font-normal italic">CONTACT</span>
          </h2>
          <p className="font-sans text-[11px] sm:text-xs text-slate-400 mt-1 sm:mt-2 max-w-lg mx-auto leading-relaxed">
            Tương tác trực tiếp trên thiết bị Cyber Deck vật lý hoặc gửi tín hiệu thông điệp nhanh bên dưới để kết nối với Huỳnh Nhất Huy.
          </p>
        </div>

        {/* ── 3D CYBER DECK INTERACTIVE CENTERPIECE ── */}
        <CyberDeck onToggleForm={handleToggleForm} isFormOpen={isFormOpen} />

        {/* ── EXPANDABLE TRANSMISSION BUFFER FORM (Hidden by default, slides down via terminal or switch) ── */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              ref={formRef}
              key="transmission-buffer-form"
              initial={{ opacity: 0, height: 0, scale: 0.97, y: -20 }}
              animate={{ opacity: 1, height: 'auto', scale: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, scale: 0.97, y: -20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl mx-auto w-full mt-6 rounded-2xl border-2 border-teal-500/50 bg-[#080d19]/95 backdrop-blur-2xl p-5 sm:p-7 shadow-[0_20px_60px_rgba(45,212,191,0.15)] overflow-hidden"
            >
              {/* Form Header with Close Button */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <h3 className="font-mono text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                    TRANSMISSION BUFFER // GỬI THÔNG ĐIỆP TRỰC TIẾP
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={handleToggleForm}
                  onMouseEnter={() => soundManager.playHoverTick()}
                  className="px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>✕ THU GỌN FORM</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Topic Chips */}
                <div>
                  <label className="block font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-1.5">
                    01 // CHỦ ĐỀ KẾT NỐI (SELECT TOPIC):
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_TOPICS.map((topic) => {
                      const isSelected = selectedTopic === topic;
                      return (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => {
                            soundManager.playButtonClick();
                            setSelectedTopic(topic);
                          }}
                          className={`px-2.5 py-1 rounded-lg font-mono text-xs transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/60 shadow-[0_0_10px_rgba(45,212,191,0.2)] font-semibold'
                              : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
                          }`}
                        >
                          {isSelected ? '● ' : ''}
                          {topic}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Inputs Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-1">
                      02 // DANH XƯNG CỦA BẠN:
                    </label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. HR / Tech Lead / Founder"
                      className="w-full bg-[#050812] border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-teal-500/60 transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-1">
                      03 // EMAIL PHẢN HỒI:
                    </label>
                    <input
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="e.g. yourname@company.com"
                      className="w-full bg-[#050812] border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-teal-500/60 transition-colors font-sans"
                    />
                  </div>
                </div>

                {/* Brief Message */}
                <div>
                  <label className="block font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-1">
                    04 // LỜI NHẮN HOẶC YÊU CẦU DỰ ÁN:
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Mô tả ngắn gọn về vị trí tuyển dụng, ý tưởng dự án hoặc nội dung trao đổi..."
                    className="w-full bg-[#050812] border border-slate-800 rounded-lg p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-teal-500/60 transition-colors font-sans resize-none"
                  />
                </div>

                {/* Action Bar */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="font-mono text-[10px] text-slate-500">
                    ⚡ HỆ THỐNG SẼ PHẢN HỒI TRONG VÒNG &lt;24H
                  </span>

                  <button
                    type="submit"
                    disabled={isTransmitting}
                    onMouseEnter={() => soundManager.playHoverTick()}
                    className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      isSent
                        ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                        : isTransmitting
                          ? 'bg-teal-600 text-slate-950 opacity-80 cursor-wait'
                          : 'bg-teal-400 hover:bg-teal-300 text-slate-950 shadow-[0_0_15px_rgba(45,212,191,0.3)] hover:shadow-[0_0_25px_rgba(45,212,191,0.5)] hover:-translate-y-0.5'
                    }`}
                  >
                    {isSent ? (
                      <span>✓ ĐÃ GỬI TÍN HIỆU THÀNH CÔNG</span>
                    ) : isTransmitting ? (
                      <>
                        <span className="animate-spin text-sm">⟳</span>
                        <span>ĐANG TRUYỀN PHÁT...</span>
                      </>
                    ) : (
                      <span>[ TRANSMIT SIGNAL ↗ ]</span>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </section>
  );
};

export default ContactSection;
