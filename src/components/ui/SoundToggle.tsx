import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { soundManager } from '../../utils/sound';

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(soundManager.enabled);

  useEffect(() => {
    const unsubscribe = soundManager.subscribe((val) => setEnabled(val));
    return unsubscribe;
  }, []);

  const handleToggle = () => {
    soundManager.toggle();
  };

  return (
    <motion.button
      onClick={handleToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={enabled ? 'Mute sound effects' : 'Unmute sound effects'}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[90] flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#0c1220]/85 backdrop-blur-md border border-white/15 hover:border-white/35 text-white/80 hover:text-white transition-all shadow-[0_10px_30px_rgba(0,0,0,0.6)] cursor-pointer select-none group"
    >
      {/* Animated Equalizer Waveform or Mute Bars */}
      <div className="flex items-center gap-[3px] h-3.5 w-3.5 justify-center">
        {enabled ? (
          <>
            <motion.span
              animate={{ height: ['4px', '14px', '6px'] }}
              transition={{ repeat: Infinity, duration: 0.6, ease: 'easeInOut' }}
              className="w-[2px] bg-sky-400 rounded-full"
            />
            <motion.span
              animate={{ height: ['12px', '4px', '14px'] }}
              transition={{ repeat: Infinity, duration: 0.7, ease: 'easeInOut', delay: 0.1 }}
              className="w-[2px] bg-sky-400 rounded-full"
            />
            <motion.span
              animate={{ height: ['6px', '14px', '4px'] }}
              transition={{ repeat: Infinity, duration: 0.5, ease: 'easeInOut', delay: 0.2 }}
              className="w-[2px] bg-sky-400 rounded-full"
            />
          </>
        ) : (
          <div className="relative flex items-center justify-center w-full h-full text-white/50 group-hover:text-white/80 transition-colors">
            {/* Muted Speaker Icon */}
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          </div>
        )}
      </div>

      <span className="font-mono text-[9.5px] tracking-[0.2em] uppercase font-semibold text-white/70 group-hover:text-white transition-colors">
        {enabled ? 'AUDIO ON' : 'AUDIO OFF'}
      </span>
    </motion.button>
  );
}
