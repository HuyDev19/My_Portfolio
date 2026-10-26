import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import avatarImg from '../../assets/card_avatar.png';
import { PhysicalIdCard } from './components/PhysicalIdCard';
import DynamicMorphingHorizon from '../../components/ui/DynamicMorphingHorizon';

/* ─────────────────────────────────────────────────────────────────
 *  CURVED HORIZON PARTICLES DATA (~50 Data Particles)
 * ───────────────────────────────────────────────────────────────── */
const WAVE_PARTICLES = [
  { cx: 80, cy: 285, r: 1.5, fill: '#ffffff', opacity: 0.5 },
  { cx: 130, cy: 275, r: 1.2, fill: '#22d3ee', opacity: 0.6 },
  { cx: 180, cy: 280, r: 2, fill: '#10b981', opacity: 0.7 },
  { cx: 230, cy: 265, r: 1, fill: '#ffffff', opacity: 0.4 },
  { cx: 280, cy: 260, r: 1.8, fill: '#22d3ee', opacity: 0.65 },
  { cx: 330, cy: 245, r: 1.2, fill: '#34d399', opacity: 0.5 },
  { cx: 380, cy: 250, r: 2.2, fill: '#ffffff', opacity: 0.8 },
  { cx: 430, cy: 230, r: 1.5, fill: '#22d3ee', opacity: 0.6 },
  { cx: 480, cy: 220, r: 1, fill: '#ffffff', opacity: 0.35 },
  { cx: 530, cy: 205, r: 2, fill: '#10b981', opacity: 0.75 },
  { cx: 580, cy: 195, r: 1.2, fill: '#22d3ee', opacity: 0.5 },
  { cx: 630, cy: 180, r: 2, fill: '#ffffff', opacity: 0.85 },
  { cx: 680, cy: 175, r: 1, fill: '#34d399', opacity: 0.45 },
  { cx: 730, cy: 160, r: 2.2, fill: '#22d3ee', opacity: 0.7 },
  { cx: 780, cy: 155, r: 1.2, fill: '#ffffff', opacity: 0.5 },
  { cx: 830, cy: 148, r: 1.6, fill: '#10b981', opacity: 0.6 },
  { cx: 880, cy: 142, r: 1, fill: '#22d3ee', opacity: 0.4 },
  { cx: 930, cy: 135, r: 2.2, fill: '#ffffff', opacity: 0.9 },
  { cx: 980, cy: 132, r: 1.2, fill: '#34d399', opacity: 0.5 },
  { cx: 1030, cy: 128, r: 1.8, fill: '#22d3ee', opacity: 0.7 },
  { cx: 1080, cy: 125, r: 1, fill: '#ffffff', opacity: 0.4 },
  { cx: 1130, cy: 124, r: 2, fill: '#10b981', opacity: 0.8 },
  { cx: 1180, cy: 122, r: 1.5, fill: '#22d3ee', opacity: 0.65 },
  { cx: 1230, cy: 120, r: 1, fill: '#ffffff', opacity: 0.5 },
  { cx: 1280, cy: 122, r: 1.8, fill: '#34d399', opacity: 0.7 },
  { cx: 1330, cy: 121, r: 1.2, fill: '#22d3ee', opacity: 0.45 },
  { cx: 1380, cy: 123, r: 2, fill: '#ffffff', opacity: 0.8 },
  { cx: 1420, cy: 120, r: 1, fill: '#10b981', opacity: 0.5 },
  // Upper sky scatter dots
  { cx: 250, cy: 180, r: 1, fill: '#ffffff', opacity: 0.3 },
  { cx: 400, cy: 150, r: 1.5, fill: '#22d3ee', opacity: 0.4 },
  { cx: 550, cy: 130, r: 1.2, fill: '#ffffff', opacity: 0.5 },
  { cx: 700, cy: 110, r: 1.8, fill: '#10b981', opacity: 0.4 },
  { cx: 850, cy: 95, r: 1.2, fill: '#ffffff', opacity: 0.3 },
  { cx: 970, cy: 85, r: 1.8, fill: '#22d3ee', opacity: 0.5 },
  { cx: 1100, cy: 75, r: 1, fill: '#ffffff', opacity: 0.4 },
  { cx: 1220, cy: 70, r: 1.5, fill: '#34d399', opacity: 0.5 },
  { cx: 1350, cy: 65, r: 1, fill: '#22d3ee', opacity: 0.3 },
  { cx: 160, cy: 210, r: 1.2, fill: '#ffffff', opacity: 0.35 },
  { cx: 610, cy: 145, r: 1, fill: '#22d3ee', opacity: 0.45 },
  { cx: 790, cy: 115, r: 1.5, fill: '#34d399', opacity: 0.5 },
  { cx: 1040, cy: 100, r: 1.2, fill: '#ffffff', opacity: 0.6 },
  { cx: 1190, cy: 95, r: 1, fill: '#22d3ee', opacity: 0.4 },
  { cx: 1310, cy: 90, r: 1.5, fill: '#ffffff', opacity: 0.5 },
  { cx: 500, cy: 160, r: 1, fill: '#10b981', opacity: 0.3 },
  { cx: 890, cy: 110, r: 1.3, fill: '#ffffff', opacity: 0.45 },
];

/* ─────────────────────────────────────────────────────────────────
 *  TECH ICONS HELPER (Inline Brand SVG Icons)
 * ───────────────────────────────────────────────────────────────── */
const renderTechIcon = (name: string) => {
  switch (name) {
    case 'React 19':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-[#00D8FE] shrink-0 transition-transform duration-200 group-hover:scale-115 group-hover:rotate-6">
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.8" fill="currentColor" />
        </svg>
      );
    case 'Next.js':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-white shrink-0 transition-transform duration-200 group-hover:scale-115 group-hover:rotate-6">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.667 17.625l-5.833-8.167h-1.834v8.167H8.5V6.375h2.167l5.833 8.167h.167V6.375h1.5v11.25z" />
        </svg>
      );
    case 'TypeScript':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:scale-115 group-hover:rotate-6">
          <rect width="24" height="24" rx="4" fill="#3178C6" />
          <path d="M4 10h6v2.5H7.8V20H5.2v-7.5H4V10zm8.2 5.5c.6.8 1.4 1.3 2.5 1.3 1 0 1.6-.5 1.6-1.2 0-.8-.7-1.1-1.8-1.5-1.7-.6-2.9-1.4-2.9-2.9 0-1.8 1.5-3.2 3.6-3.2 1.4 0 2.4.5 3.1 1.4l-1.4 1.4c-.5-.6-1.1-.9-1.8-.9-.8 0-1.3.4-1.3 1 0 .7.6 1 1.7 1.4 1.8.6 3 1.4 3 3 0 2-1.6 3.3-3.8 3.3-1.7 0-3-.6-3.8-1.8l1.6-1.4z" fill="#FFF" />
        </svg>
      );
    case 'Tailwind CSS':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#38BDF8] shrink-0 transition-transform duration-200 group-hover:scale-115 group-hover:rotate-6">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
        </svg>
      );
    case 'Framer Motion':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#FF0055] shrink-0 transition-transform duration-200 group-hover:scale-115 group-hover:rotate-6">
          <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
        </svg>
      );
    case 'GSAP':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-[#88CE02] shrink-0 transition-transform duration-200 group-hover:scale-115 group-hover:rotate-6">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );
    case 'Vite':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:scale-115 group-hover:rotate-6">
          <path d="M23.15 2.587L12.503 21.65a.6.6 0 01-1.006 0L.85 2.587A.6.6 0 011.353 1.7h21.294a.6.6 0 01.503.887z" fill="#BD34FE" />
          <path d="M14.5 1.7L9 12.5l3.5-.5L10 20l6.5-10-3.5.5L14.5 1.7z" fill="#FFD62E" />
        </svg>
      );
    case 'Node.js':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#5FA04E] shrink-0 transition-transform duration-200 group-hover:scale-115 group-hover:rotate-6">
          <path d="M12 2l9 5.2v10.4L12 22.8 3 17.6V7.2L12 2zm0 2.3L5 8.3v7.4l7 4 7-4V8.3l-7-4z" />
        </svg>
      );
    case 'Python':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:scale-115 group-hover:rotate-6">
          <path d="M11.9 1.5c-3.1 0-5.1.7-5.1 2.5v1.8h5.2v.7H4.3C2.5 6.5 1 8 1 10.2s1.3 3.6 3.1 3.6h1.2v-1.7c0-2 1.7-3.7 3.7-3.7h5.1V6.6c0-2-2-5.1-2.2-5.1zm-1.8 1.3a.8.8 0 110 1.6.8.8 0 010-1.6z" fill="#3776AB" />
          <path d="M12.1 22.5c3.1 0 5.1-.7 5.1-2.5v-1.8h-5.2v-.7h7.7c1.8 0 3.3-1.5 3.3-3.7s-1.3-3.6-3.1-3.6h-1.2v1.7c0 2-1.7 3.7-3.7 3.7h-5.1v1.8c0 2 2 5.1 2.2 5.1zm1.8-1.3a.8.8 0 110-1.6.8.8 0 010 1.6z" fill="#FFD43B" />
        </svg>
      );
    case 'WebRTC':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-[#3298DC] shrink-0 transition-transform duration-200 group-hover:scale-115 group-hover:rotate-6">
          <circle cx="12" cy="12" r="3" fill="currentColor" />
          <path d="M4.93 4.93a10 10 0 0114.14 0M7.76 7.76a6 6 0 018.48 0" strokeLinecap="round" />
        </svg>
      );
    case 'Socket.IO':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-white shrink-0 transition-transform duration-200 group-hover:scale-115 group-hover:rotate-6">
          <circle cx="12" cy="12" r="10" fill="#010101" stroke="#ffffff" strokeWidth="1.5" />
          <path d="M12 5a7 7 0 100 14 7 7 0 000-14zm-1 3.5h2v7h-2v-7z" fill="#FFFFFF" />
        </svg>
      );
    case 'TCP/IP Sockets':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-[#38BDF8] shrink-0 transition-transform duration-200 group-hover:scale-115 group-hover:rotate-6">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M7 15v-2M12 15v-4M17 15v-6" strokeLinecap="round" />
        </svg>
      );
    case 'Multi-threading':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-[#F59E0B] shrink-0 transition-transform duration-200 group-hover:scale-115 group-hover:rotate-6">
          <path d="M6 3v18M12 3v18M18 3v18M3 9h18M3 15h18" strokeLinecap="round" />
        </svg>
      );
    case 'RAG Architecture':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-[#A855F7] shrink-0 transition-transform duration-200 group-hover:scale-115 group-hover:rotate-6">
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15z" />
          <path d="M9 7h6M9 11h4" strokeLinecap="round" />
        </svg>
      );
    case 'OpenAI / Gemini API':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#10A37F] shrink-0 transition-transform duration-200 group-hover:scale-115 group-hover:rotate-6">
          <path d="M12 2l2.4 6.9 6.9 2.4-6.9 2.4L12 20.6l-2.4-6.9L2.7 11.3l6.9-2.4L12 2z" />
        </svg>
      );
    case 'Vector DB':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-[#EC4899] shrink-0 transition-transform duration-200 group-hover:scale-115 group-hover:rotate-6">
          <path d="M21 8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16V8z" />
          <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
        </svg>
      );
    case 'Semantic Chunking':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0 transition-transform duration-200 group-hover:scale-115 group-hover:rotate-6">
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" strokeLinecap="round" />
        </svg>
      );
    case 'Git / GitHub':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-white shrink-0 transition-transform duration-200 group-hover:scale-115 group-hover:rotate-6">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      );
    case 'Docker':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#2496ED] shrink-0 transition-transform duration-200 group-hover:scale-115 group-hover:rotate-6">
          <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.186.185.186zm0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186zm-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186zm5.893 2.715h2.118a.186.186 0 00.186-.186V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185zm-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185zm-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186h-2.12a.186.186 0 00-.184.185v1.888c0 .102.083.185.185.185zm-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.208a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185z" />
        </svg>
      );
    case 'Cloudflare Edge':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#F38020] shrink-0 transition-transform duration-200 group-hover:scale-115 group-hover:rotate-6">
          <path d="M18.42 10.35a5.55 5.55 0 00-5.4-4.35 5.6 5.6 0 00-5.32 3.86A4.5 4.5 0 004.5 18.5h14a3.5 3.5 0 00-.08-8.15z" />
        </svg>
      );
    case 'Postman':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#FF6C37] shrink-0 transition-transform duration-200 group-hover:scale-115 group-hover:rotate-6">
          <circle cx="12" cy="12" r="10" />
          <path d="M7 12l3 3 7-7" stroke="#FFF" strokeWidth="2" fill="none" />
        </svg>
      );
    case 'Figma':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:scale-115 group-hover:rotate-6">
          <rect x="5" y="2" width="7" height="7" rx="3.5" fill="#F24E1E" />
          <rect x="12" y="2" width="7" height="7" rx="3.5" fill="#FF7262" />
          <rect x="5" y="9" width="7" height="7" rx="3.5" fill="#A259FF" />
          <circle cx="15.5" cy="12.5" r="3.5" fill="#1ABCFE" />
          <rect x="5" y="16" width="7" height="7" rx="3.5" fill="#0ACF83" />
        </svg>
      );
    case 'Linux':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#FCC624] shrink-0 transition-transform duration-200 group-hover:scale-115 group-hover:rotate-6">
          <circle cx="12" cy="12" r="9" />
          <circle cx="9" cy="10" r="1.5" fill="#000" />
          <circle cx="15" cy="10" r="1.5" fill="#000" />
          <ellipse cx="12" cy="14" rx="2.5" ry="1.5" fill="#FFA500" />
        </svg>
      );
    default:
      return <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />;
  }
};

/* ─────────────────────────────────────────────────────────────────
 *  DOSSIER CARDS METADATA
 * ───────────────────────────────────────────────────────────────── */
const CARDS_DATA = [
  {
    id: 'fig-01',
    figure: 'FILE 0.1',
    tabLabel: 'FILE 0.1 // THE ARCHITECT',
    category: 'THE ARCHITECT',
    title: 'CORE IDENTITY & ENGINEERING ETHOS',
    accentColor: '#2DD4BF',
  },
  {
    id: 'fig-02',
    figure: 'FILE 0.2',
    tabLabel: 'FILE 0.2 // THE ARSENAL',
    category: 'THE ARSENAL',
    title: 'TECHNICAL STACK & INFRASTRUCTURE',
    accentColor: '#38BDF8',
  },
  {
    id: 'fig-03',
    figure: 'FILE 0.3',
    tabLabel: 'FILE 0.3 // OPERATIONAL RECORD',
    category: 'OPERATIONAL RECORD',
    title: 'DEPLOYED SYSTEMS & CASE LOGS',
    accentColor: '#F59E0B',
  },
];

/* ─────────────────────────────────────────────────────────────────
 *  MAIN ABOUT COMPONENT
 * ───────────────────────────────────────────────────────────────── */
export const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  /* 3D Dossier scroll progress across 300vh */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  /* Awwwards 3D Camera Recession when scrolling from About into Works */
  const exitScale = useTransform(scrollYProgress, [0.88, 1], [1, 0.93]);
  const exitOpacity = useTransform(scrollYProgress, [0.90, 1], [1, 0.25]);
  const exitY = useTransform(scrollYProgress, [0.88, 1], [0, -35]);
  const exitBlur = useTransform(scrollYProgress, [0.90, 1], [0, 4]);
  const exitFilter = useTransform(exitBlur, (v: number) => `blur(${v}px)`);

  /* Smooth scroll spring */
  useSpring(scrollYProgress, { stiffness: 90, damping: 25, mass: 0.5 });

  /* Update active index tab indicator */
  const isManualClickRef = useRef(false);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      if (isManualClickRef.current) return;
      const progress = typeof latest === 'number' && !isNaN(latest) ? latest : 0;
      const targetTab = Math.min(2, Math.max(0, Math.floor(progress * 3)));
      setActiveTab(targetTab);
    });
  }, [scrollYProgress]);

  /* Tab click handler that syncs scroll position smoothly */
  const handleTabClick = (index: number) => {
    setActiveTab(index);
    isManualClickRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isManualClickRef.current = false;
    }, 1200);

    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const currentScrollY = window.scrollY;
      const sectionTop = currentScrollY + rect.top;
      const scrollableDist = sectionRef.current.scrollHeight - window.innerHeight;
      const targetOffsets = [0.15, 0.50, 0.85];
      const targetScroll = sectionTop + targetOffsets[index] * scrollableDist;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-20 w-full bg-[#060911] min-h-[300vh]"
    >
      <style>{`
        @keyframes radar-pulse {
          0%, 100% {
            border-color: rgba(45, 212, 191, 0.4);
            box-shadow: 0 0 8px rgba(45, 212, 191, 0.25), inset 0 0 6px rgba(45, 212, 191, 0.15);
          }
          50% {
            border-color: rgba(45, 212, 191, 1);
            box-shadow: 0 0 22px rgba(45, 212, 191, 0.8), inset 0 0 10px rgba(45, 212, 191, 0.35);
          }
        }
        .btn-initiate-contact {
          animation: radar-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .btn-initiate-contact:hover {
          animation: none !important;
          background-color: #2DD4BF !important;
          color: #000000 !important;
          border-color: #2DD4BF !important;
          box-shadow: 0 0 28px rgba(45, 212, 191, 0.9) !important;
        }
      `}</style>



      {/* ── [Yêu cầu 2] Mặt Vòm Năng Lượng Biến Hình Theo Cuộn (Dynamic Morphing Horizon Portal) ── */}
      <DynamicMorphingHorizon scrollYProgress={scrollYProgress} />

      {/* ══════════════════════════════════════════════════════════════
          DESKTOP PINNED STAGE (≥ md): Sticky 3D Dossier Deck
         ══════════════════════════════════════════════════════════════ */}
      <div className="hidden md:block sticky top-0 h-screen w-full z-10 overflow-hidden bg-[#060911]">
        
        {/* ── Curved Particle Wave Horizon SVG Layer (Chuẩn Ảnh Mẫu 2) ── */}
        <div className="absolute top-0 left-0 w-full h-[380px] pointer-events-none z-0 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 1440 380" fill="none" preserveAspectRatio="none">
            <defs>
              <filter id="ice-wave-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#06b6d4" floodOpacity="0.6" />
              </filter>
              <filter id="cyan-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#38bdf8" floodOpacity="0.7" />
              </filter>
            </defs>
            {/* Khối che kín đặc màu #060911 bên dưới đường sóng cong xanh ngọc để che kín HomeSection */}
            <path
              d="M -20 280 C 400 300, 800 130, 1460 120 L 1460 380 L -20 380 Z"
              fill="#060911"
            />
            {/* 2 Đường cong Bezier lớn màu Electric Cyan uốn lượn kèm phát sáng */}
            <path
              d="M -20 280 C 400 300, 800 130, 1460 120"
              stroke="#06b6d4"
              strokeOpacity="0.45"
              strokeWidth="1.5"
              filter="url(#ice-wave-glow)"
            />
            <path
              d="M -20 250 C 450 260, 850 150, 1460 145"
              stroke="#38bdf8"
              strokeOpacity="0.3"
              strokeWidth="1.2"
              strokeDasharray="4 6"
            />

            {/* Vòm sóng quỹ đạo bên phải phía trên Dossier Cards (Chuẩn Ảnh 2) */}
            <path
              d="M 900 240 C 1040 100, 1340 110, 1480 240"
              stroke="#22d3ee"
              strokeOpacity="0.45"
              strokeWidth="1.5"
              filter="url(#cyan-glow)"
            />
            <path
              d="M 960 250 C 1080 130, 1300 140, 1440 250"
              stroke="#38bdf8"
              strokeOpacity="0.25"
              strokeWidth="1"
              strokeDasharray="5 7"
            />
            {/* Tọa độ marker vệ tinh trên vòm quỹ đạo */}
            <circle cx="1140" cy="148" r="3" fill="#22d3ee" opacity="0.9" filter="url(#cyan-glow)" />
            <circle cx="1270" cy="158" r="2.5" fill="#7dd3fc" opacity="0.85" />

            {/* Hạt sáng nhỏ màu trắng và xanh cyan dọc đường cong */}
            {WAVE_PARTICLES.map((p, idx) => (
              <circle
                key={`wave-dot-${idx}`}
                cx={p.cx}
                cy={p.cy}
                r={p.r}
                fill={p.fill}
                opacity={p.opacity}
              />
            ))}
          </svg>
        </div>

        {/* ── Concentric Sonar / Radar Rings behind Physical ID Card (Chuẩn Ảnh 2) ── */}
        <div className="absolute top-1/2 left-[16%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
          {/* Vùng phát sáng xanh ngọc mềm mại phía sau thẻ */}
          <div className="w-[320px] h-[320px] rounded-full bg-teal-500/10 blur-[85px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          {/* Vòng Radar 1 - Vòng tròn đặc */}
          <div className="w-[230px] h-[230px] rounded-full border border-teal-500/25 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          {/* Vòng Radar 2 - Vòng nét đứt quay chậm */}
          <div className="w-[340px] h-[340px] rounded-full border border-teal-400/20 border-dashed absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_80s_linear_infinite]" />
          {/* Vòng Radar 3 - Vòng viền cyan */}
          <div className="w-[450px] h-[450px] rounded-full border border-cyan-500/15 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          {/* Vòng Radar 4 - Vòng ngoài cùng nét đứt mờ */}
          <div className="w-[560px] h-[560px] rounded-full border border-teal-400/10 border-dashed absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_120s_linear_infinite_reverse]" />
        </div>

        {/* ── Fixed Tactical Radar Grid ── */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035] z-0"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* ── Static Film Noise Layer ── */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.025] bg-[url('/noise.png')] mix-blend-overlay" />

        {/* ── Reactive Ambient Auras behind cards ── */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              background:
                activeTab === 0
                  ? 'radial-gradient(circle, rgba(45,212,191,0.13) 0%, rgba(14,165,233,0.05) 50%, transparent 70%)'
                  : activeTab === 1
                    ? 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, rgba(99,102,241,0.06) 50%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, rgba(239,68,68,0.05) 50%, transparent 70%)',
              scale: [1, 1.06, 1],
            }}
            transition={{
              background: { duration: 0.8, ease: 'easeInOut' },
              scale: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="absolute top-1/2 right-[20%] -translate-y-1/2 w-[55vw] h-[55vw] max-w-[750px] max-h-[750px] rounded-full blur-[130px] mix-blend-screen"
          />

          <motion.div
            animate={{
              background:
                activeTab === 0
                  ? 'radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 70%)'
                  : activeTab === 1
                    ? 'radial-gradient(circle, rgba(45,212,191,0.08) 0%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
            }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute top-1/3 left-[5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full blur-[120px] mix-blend-screen"
          />
        </div>

        <motion.div
          style={{
            scale: exitScale,
            opacity: exitOpacity,
            y: exitY,
            filter: exitFilter,
          }}
          className="w-full h-full flex items-center will-change-transform"
        >

          {/* ── CỘT TRÁI (32% width): Thẻ ID Vật Lý & Dây Đeo ── */}
          <div className="w-[32%] xl:w-[30%] h-full flex flex-col items-center justify-center shrink-0 relative">
            {/* Soft vertical gradient divider */}
            <div className="absolute right-0 top-16 bottom-16 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none" />

            {/* [Yêu cầu 3] Thẻ ID Vật lý: Thả rơi con lắc nhẹ từ trên xuống */}
            <motion.div
              initial={{ y: -45, rotateZ: 6, opacity: 0 }}
              whileInView={{ y: 0, rotateZ: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ type: "spring", stiffness: 180, damping: 16 }}
              style={{ transformOrigin: "50% 0%" }}
              className="w-full flex justify-center"
            >
              <PhysicalIdCard />
            </motion.div>
          </div>

          {/* ── CỘT PHẢI (68% width): True 3D Stacked Folder Cards Stage ── */}
          <motion.div
            initial={{ y: 40, scale: 0.94, opacity: 0 }}
            whileInView={{ y: 0, scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.1 }}
            className="flex-1 h-full flex flex-col justify-center px-6 lg:px-12 xl:px-16 max-w-[880px]"
          >

            {/* Header: INTELLIGENCE DOSSIER + ABOUT ME */}
            <div className="mb-3 w-full">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 block">
                INTELLIGENCE DOSSIER
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl font-black uppercase text-white tracking-tight leading-none mt-1">
                ABOUT <span className="text-white/20">ME</span>
              </h2>
            </div>

            {/* [Yêu cầu 2] 1 Hàng Gáy Thư Mục Cố Định gồm cả 3 tab theo đúng thứ tự từ trái sang phải */}
            <div className="flex items-end gap-1.5 pl-6 -mb-[1px] relative z-40 select-none">
              {CARDS_DATA.map((card, i) => {
                const isActive = activeTab === i;
                return (
                  <button
                    key={`folder-tab-${card.id}`}
                    type="button"
                    onClick={() => handleTabClick(i)}
                    className={`px-4 py-2 rounded-t-xl border-t border-l border-r font-mono text-xs flex items-center gap-2 cursor-pointer transition-all select-none ${
                      isActive
                        ? 'bg-[#0b111e] text-emerald-400 border-emerald-500/40 border-b-transparent translate-y-[1px] font-bold shadow-[0_-4px_12px_rgba(16,185,129,0.15)] z-10'
                        : 'bg-[#070b14]/80 text-slate-500 border-slate-800 hover:text-slate-300 py-1.5 z-0'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isActive ? 'bg-emerald-400 shadow-[0_0_8px_#10b981]' : 'bg-slate-600'
                      }`}
                    />
                    <span>{card.figure}</span>
                  </button>
                );
              })}
            </div>

            {/* ── [Yêu cầu 2] True 3D Stacked Folder Cards Container ── */}
            <div className="relative w-full h-[470px] md:h-[490px] lg:h-[500px]" style={{ perspective: 1200 }}>
              {[0, 1, 2].map((index) => {
                const safeActiveTab = Math.min(2, Math.max(0, activeTab ?? 0));
                const offset = (index - safeActiveTab + 3) % 3;
                const isFront = offset === 0;

                return (
                  <motion.div
                    key={`stacked-card-${index}`}
                    onClick={() => {
                      if (!isFront) handleTabClick(index);
                    }}
                    animate={{
                      x: offset * 16,
                      y: offset * -14,
                      scale: 1 - offset * 0.03,
                      zIndex: 30 - offset * 10,
                      opacity: offset === 0 ? 1 : offset === 1 ? 0.75 : 0.45,
                    }}
                    transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                    className={`absolute inset-0 w-full h-full rounded-2xl border border-teal-500/30 bg-[#090e1a] backdrop-blur-2xl p-6 md:p-7 lg:p-8 flex flex-col justify-between shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] select-none ${
                      !isFront ? 'cursor-pointer hover:border-teal-400/50' : ''
                    }`}
                  >
                    {/* Technical Blueprint Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none rounded-2xl" />

                    {/* [Yêu cầu 2] Nội dung thẻ: sáng rõ 100% khi isFront, ẩn hoàn toàn khi nằm lớp sau */}
                    <div className={`w-full h-full flex flex-col justify-between transition-opacity duration-150 ${isFront ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                      
                      {/* CARD 0 CONTENT: CORE IDENTITY & ENGINEERING ETHOS */}
                      {index === 0 && (
                        <div className="flex flex-col h-full justify-between">
                          {/* Header */}
                          <div className="relative z-10 flex items-center justify-between pb-3 border-b border-teal-500/20">
                            <h3 className="font-mono text-xs uppercase tracking-widest text-teal-400 font-semibold flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
                              <span>[ FILE 0.1 // CORE IDENTITY & ENGINEERING ETHOS ]</span>
                            </h3>
                            <span className="font-mono text-[9px] uppercase tracking-wider text-teal-300/80 bg-teal-950/40 border border-teal-500/30 px-2 py-0.5 rounded">
                              THE ARCHITECT
                            </span>
                          </div>

                          {/* Main Ethos & Narrative */}
                          <div className="relative z-10 my-auto flex flex-col justify-center py-2">
                            <blockquote className="font-serif italic text-lg md:text-xl lg:text-2xl text-white font-normal leading-snug mb-3">
                              "Tỉ mỉ đến từng mili-giây. Tôi không chỉ viết mã nguồn; tôi kiến tạo những trải nghiệm số mượt mà, phản hồi tức thì — nơi thẩm mỹ thị giác giao thoa cùng kiến trúc hệ thống vững chắc."
                            </blockquote>

                            <p className="font-sans text-xs md:text-sm text-slate-300 leading-relaxed mb-4">
                              Kỹ sư định hướng Frontend với nền tảng Khoa học Máy tính vững chắc tại ĐH Giao thông Vận tải TP.HCM (UTH). Kết nối liền mạch giữa giao diện tương tác cao và kiến trúc backend phức tạp — từ mạng socket phân tán bằng Python đến WebRTC thời gian thực và chuỗi xử lý AI RAG.
                            </p>

                            {/* 3-Column Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                              <div className="border border-slate-800 bg-slate-900/40 p-3 rounded-lg flex flex-col justify-center">
                                <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase block mb-0.5">EDUCATION</span>
                                <span className="text-xs md:text-sm font-semibold text-white">CNTT @ UTH (GPA 3.2/4.0)</span>
                              </div>
                              <div className="border border-slate-800 bg-slate-900/40 p-3 rounded-lg flex flex-col justify-center">
                                <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase block mb-0.5">CREDENTIALS</span>
                                <span className="text-xs md:text-sm font-semibold text-white">Tiếng Anh B1.4 & Tin học UD</span>
                              </div>
                              <div className="border border-slate-800 bg-slate-900/40 p-3 rounded-lg flex flex-col justify-center">
                                <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase block mb-0.5">AVAILABILITY</span>
                                <span className="text-xs md:text-sm font-semibold text-teal-300 flex items-center gap-2">
                                  <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                                  </span>
                                  <span>Sẵn sàng thực tập / Làm việc</span>
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Bottom Tags */}
                          <div className="relative z-10 flex flex-wrap gap-2 pt-3 border-t border-white/5">
                            {['[KIẾN TRÚC HỆ THỐNG]', '[60FPS UI/UX]', '[MẠNG REAL-TIME]', '[TP. HỒ CHÍ MINH]'].map((tag) => (
                              <span
                                key={tag}
                                className="bg-teal-900/20 text-teal-300 border border-teal-500/30 px-2.5 py-1 text-xs font-mono rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* CARD 1 CONTENT: TECHNICAL STACK & INFRASTRUCTURE */}
                      {index === 1 && (
                        <div className="flex flex-col h-full justify-between">
                          {/* Header */}
                          <div className="relative z-10 flex items-center justify-between pb-3 border-b border-teal-500/20">
                            <h3 className="font-mono text-xs uppercase tracking-widest text-teal-400 font-semibold flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
                              <span>[ FILE 0.2 // TECHNICAL STACK & INFRASTRUCTURE ]</span>
                            </h3>
                            <span className="font-mono text-[9px] uppercase tracking-wider text-teal-300/80 bg-teal-950/40 border border-teal-500/30 px-2 py-0.5 rounded">
                              THE ARSENAL
                            </span>
                          </div>

                          {/* Bento Grid 2x2 with SVG Tech Icons */}
                          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-3.5 my-auto py-2">
                            {/* 01 // FRONTEND & MOTION */}
                            <div className="border border-slate-800/80 bg-slate-900/40 p-3.5 md:p-4 rounded-xl flex flex-col gap-2.5 transition-colors hover:border-emerald-500/30">
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                  01 // FRONTEND & MOTION
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {['React 19', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Vite'].map((skill) => (
                                  <div
                                    key={skill}
                                    className="group flex items-center gap-1.5 text-xs bg-slate-800/60 text-slate-200 px-2.5 py-1 rounded-md border border-slate-700/50 font-mono transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400/60 hover:shadow-[0_0_12px_rgba(52,211,153,0.2)] cursor-default"
                                  >
                                    {renderTechIcon(skill)}
                                    <span>{skill}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* 02 // BACKEND & NETWORKS */}
                            <div className="border border-slate-800/80 bg-slate-900/40 p-3.5 md:p-4 rounded-xl flex flex-col gap-2.5 transition-colors hover:border-cyan-500/30">
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                  02 // BACKEND & NETWORKS
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {['Node.js', 'Python', 'WebRTC', 'Socket.IO', 'TCP/IP Sockets', 'Multi-threading'].map((skill) => (
                                  <div
                                    key={skill}
                                    className="group flex items-center gap-1.5 text-xs bg-slate-800/60 text-slate-200 px-2.5 py-1 rounded-md border border-slate-700/50 font-mono transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/60 hover:shadow-[0_0_12px_rgba(34,211,238,0.2)] cursor-default"
                                  >
                                    {renderTechIcon(skill)}
                                    <span>{skill}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* 03 // AI & DATA PIPELINES */}
                            <div className="border border-slate-800/80 bg-slate-900/40 p-3.5 md:p-4 rounded-xl flex flex-col gap-2.5 transition-colors hover:border-purple-500/30">
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-xs font-semibold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                  03 // AI & DATA PIPELINES
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {['RAG Architecture', 'OpenAI / Gemini API', 'Vector DB', 'Semantic Chunking'].map((skill) => (
                                  <div
                                    key={skill}
                                    className="group flex items-center gap-1.5 text-xs bg-slate-800/60 text-slate-200 px-2.5 py-1 rounded-md border border-slate-700/50 font-mono transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-400/60 hover:shadow-[0_0_12px_rgba(168,85,247,0.2)] cursor-default"
                                  >
                                    {renderTechIcon(skill)}
                                    <span>{skill}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* 04 // DEVOPS & WORKFLOW */}
                            <div className="border border-slate-800/80 bg-slate-900/40 p-3.5 md:p-4 rounded-xl flex flex-col gap-2.5 transition-colors hover:border-slate-500/30">
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                                  04 // DEVOPS & WORKFLOW
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {['Git / GitHub', 'Docker', 'Cloudflare Edge', 'Postman', 'Figma', 'Linux'].map((skill) => (
                                  <div
                                    key={skill}
                                    className="group flex items-center gap-1.5 text-xs bg-slate-800/60 text-slate-200 px-2.5 py-1 rounded-md border border-slate-700/50 font-mono transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-400/60 hover:shadow-[0_0_12px_rgba(45,212,191,0.2)] cursor-default"
                                  >
                                    {renderTechIcon(skill)}
                                    <span>{skill}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/5 font-mono text-[10px] text-white/40 uppercase">
                            <span>KHO VŨ KHÍ CÔNG NGHỆ // SẴN SÀNG TRIỂN KHAI PRODUCTION</span>
                            <span>PHIÊN BẢN 2025.2</span>
                          </div>
                        </div>
                      )}

                      {/* CARD 2 CONTENT: DEPLOYED SYSTEMS & CASE LOGS */}
                      {index === 2 && (
                        <div className="flex flex-col h-full justify-between">
                          {/* Header */}
                          <div className="relative z-10 flex items-center justify-between pb-3 border-b border-teal-500/20">
                            <h3 className="font-mono text-xs uppercase tracking-widest text-teal-400 font-semibold flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
                              <span>[ FILE 0.3 // DEPLOYED SYSTEMS & CASE LOGS ]</span>
                            </h3>
                            <span className="font-mono text-[9px] uppercase tracking-wider text-teal-300/80 bg-teal-950/40 border border-teal-500/30 px-2 py-0.5 rounded">
                              OPERATIONAL RECORD
                            </span>
                          </div>

                          {/* 2-Column Featured Case Logs */}
                          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 my-auto py-2">
                            {/* Card Left: NEXUSCHAT */}
                            <div className="border border-slate-800/80 bg-slate-900/40 p-4 md:p-5 rounded-xl flex flex-col justify-between gap-3 transition-colors hover:border-teal-500/30">
                              <div>
                                <div className="flex items-center justify-between mb-1.5">
                                  <h4 className="font-mono text-sm md:text-base font-bold text-teal-300 tracking-wide uppercase">
                                    NEXUSCHAT — Hệ Sinh Thái Giao Tiếp Real-Time
                                  </h4>
                                </div>
                                <p className="font-mono text-[11px] text-teal-400/80 mb-2.5">
                                  React · Node.js · WebRTC · Socket.IO
                                </p>
                                <p className="font-sans text-xs md:text-sm text-slate-300 leading-relaxed">
                                  "Xây dựng đường truyền WebRTC P2P gọi thoại/video độ trễ thấp (&lt;45ms) và đồng bộ phòng đa luồng, tích hợp trợ lý AI thông minh cùng bảo mật JWT đa tầng."
                                </p>
                              </div>
                            </div>

                            {/* Card Right: AGENT_LAW */}
                            <div className="border border-slate-800/80 bg-slate-900/40 p-4 md:p-5 rounded-xl flex flex-col justify-between gap-3 transition-colors hover:border-purple-500/30">
                              <div>
                                <div className="flex items-center justify-between mb-1.5">
                                  <h4 className="font-mono text-sm md:text-base font-bold text-purple-300 tracking-wide uppercase">
                                    AGENT_LAW — Trợ Lý Pháp Lý RAG AI
                                  </h4>
                                </div>
                                <p className="font-mono text-[11px] text-purple-400/80 mb-2.5">
                                  Next.js · Python · Vector DB · LLM
                                </p>
                                <p className="font-sans text-xs md:text-sm text-slate-300 leading-relaxed">
                                  "Thiết kế pipeline phân đoạn ngữ nghĩa (semantic chunking) và tìm kiếm vector tương đồng trên dữ liệu luật chuyên sâu, triệt tiêu hoàn toàn ảo tưởng AI và rút ngắn tra cứu từ hàng giờ xuống vài giây."
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Footer with Status & Contact button */}
                          <div className="relative z-10 pt-3 border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2 font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
                              <span>STATUS: ACTIVE RADAR</span>
                            </div>

                            <a
                              href="#contact"
                              onClick={(e) => {
                                const el = document.getElementById('contact');
                                if (el) {
                                  e.preventDefault();
                                  el.scrollIntoView({ behavior: 'smooth' });
                                }
                              }}
                              className="btn-initiate-contact px-6 py-2.5 rounded-md font-mono text-xs font-semibold tracking-wider text-[#2DD4BF] border border-[#2DD4BF] uppercase transition-all duration-300 flex items-center gap-2 select-none cursor-pointer"
                            >
                              <svg
                                className="w-3.5 h-3.5 text-[#2DD4BF]"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                              </svg>
                              <span>[ KẾT NỐI // CONTACT ↗ ]</span>
                            </a>
                          </div>
                        </div>
                      )}

                    </div>
                  </motion.div>
                );
              })}
            </div>

          </motion.div>

        </motion.div>

      </div>

      {/* ══════════════════════════════════════════════════════════════
          MOBILE EXPERIENCE (< md): Compact Touch Dossier Flow
         ══════════════════════════════════════════════════════════════ */}
      <div className="md:hidden relative z-10 px-5 py-16 space-y-8">
        {/* Header */}
        <div>
          <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase block">
            INTELLIGENCE DOSSIER
          </span>
          <h2 className="font-serif text-4xl font-black uppercase text-white mt-1">
            ABOUT <span className="text-white/20">ME</span>
          </h2>
        </div>

        {/* Mobile ID Card in interactive frame */}
        <div className="w-full relative rounded-2xl overflow-hidden border border-white/10 bg-[#080D1A]/90 flex flex-col items-center py-6 px-4">
          <div className="flex items-center justify-center gap-2.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
            <span className="text-[10px] font-mono tracking-[0.28em] text-slate-400 uppercase">
              PHYSICAL ID TELEMETRY
            </span>
          </div>

          <div className="w-[250px] rounded-[20px] bg-[#0b101b] border border-slate-800/90 shadow-[0_25px_50px_rgba(0,0,0,0.85)] overflow-hidden relative">
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-11 h-2.5 rounded-full bg-[#060911] border border-slate-800/80 z-30 shadow-inner" />
            <div className="relative h-[245px] w-full overflow-hidden">
              <img src={avatarImg} alt="Huỳnh Nhất Huy" className="w-full h-full object-cover object-top" />
              <div className="absolute top-6 left-3 -rotate-[12deg] border border-red-500/60 bg-red-950/30 backdrop-blur-[2px] px-3 py-1 rounded-[4px]">
                <span className="text-[9px] font-mono tracking-[0.22em] text-red-400 font-semibold uppercase">
                  OFFICIAL ID
                </span>
              </div>
            </div>
            <div className="p-4 bg-[#0b101b] border-t border-slate-800/80">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-[10px] font-mono tracking-[0.15em] text-slate-400 mb-0.5">
                    ID // HNH-2025
                  </p>
                  <h3 className="text-[19px] font-bold text-white tracking-tight leading-none whitespace-nowrap">
                    Huynh Nhat Huy
                  </h3>
                </div>
                <a
                  href="https://github.com/HuyDev19"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Scan or click to open GitHub: HuyDev19"
                  className="w-10 h-10 p-1 bg-white/95 rounded-md border border-emerald-500/50 hover:border-emerald-400 transition-all flex items-center justify-center shrink-0"
                >
                  <svg
                    viewBox="0 0 150 150"
                    className="w-full h-full text-slate-950"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M 0,0 l 6,0 0,6 -6,0 z M 6,0 l 6,0 0,6 -6,0 z M 12,0 l 6,0 0,6 -6,0 z M 18,0 l 6,0 0,6 -6,0 z M 24,0 l 6,0 0,6 -6,0 z M 30,0 l 6,0 0,6 -6,0 z M 36,0 l 6,0 0,6 -6,0 z M 60,0 l 6,0 0,6 -6,0 z M 72,0 l 6,0 0,6 -6,0 z M 78,0 l 6,0 0,6 -6,0 z M 96,0 l 6,0 0,6 -6,0 z M 108,0 l 6,0 0,6 -6,0 z M 114,0 l 6,0 0,6 -6,0 z M 120,0 l 6,0 0,6 -6,0 z M 126,0 l 6,0 0,6 -6,0 z M 132,0 l 6,0 0,6 -6,0 z M 138,0 l 6,0 0,6 -6,0 z M 144,0 l 6,0 0,6 -6,0 z M 0,6 l 6,0 0,6 -6,0 z M 36,6 l 6,0 0,6 -6,0 z M 48,6 l 6,0 0,6 -6,0 z M 60,6 l 6,0 0,6 -6,0 z M 84,6 l 6,0 0,6 -6,0 z M 90,6 l 6,0 0,6 -6,0 z M 96,6 l 6,0 0,6 -6,0 z M 108,6 l 6,0 0,6 -6,0 z M 144,6 l 6,0 0,6 -6,0 z M 0,12 l 6,0 0,6 -6,0 z M 12,12 l 6,0 0,6 -6,0 z M 18,12 l 6,0 0,6 -6,0 z M 24,12 l 6,0 0,6 -6,0 z M 36,12 l 6,0 0,6 -6,0 z M 72,12 l 6,0 0,6 -6,0 z M 84,12 l 6,0 0,6 -6,0 z M 96,12 l 6,0 0,6 -6,0 z M 108,12 l 6,0 0,6 -6,0 z M 120,12 l 6,0 0,6 -6,0 z M 126,12 l 6,0 0,6 -6,0 z M 132,12 l 6,0 0,6 -6,0 z M 144,12 l 6,0 0,6 -6,0 z M 0,18 l 6,0 0,6 -6,0 z M 12,18 l 6,0 0,6 -6,0 z M 18,18 l 6,0 0,6 -6,0 z M 24,18 l 6,0 0,6 -6,0 z M 36,18 l 6,0 0,6 -6,0 z M 48,18 l 6,0 0,6 -6,0 z M 54,18 l 6,0 0,6 -6,0 z M 60,18 l 6,0 0,6 -6,0 z M 72,18 l 6,0 0,6 -6,0 z M 78,18 l 6,0 0,6 -6,0 z M 108,18 l 6,0 0,6 -6,0 z M 120,18 l 6,0 0,6 -6,0 z M 126,18 l 6,0 0,6 -6,0 z M 132,18 l 6,0 0,6 -6,0 z M 144,18 l 6,0 0,6 -6,0 z M 0,24 l 6,0 0,6 -6,0 z M 12,24 l 6,0 0,6 -6,0 z M 18,24 l 6,0 0,6 -6,0 z M 24,24 l 6,0 0,6 -6,0 z M 36,24 l 6,0 0,6 -6,0 z M 54,24 l 6,0 0,6 -6,0 z M 78,24 l 6,0 0,6 -6,0 z M 96,24 l 6,0 0,6 -6,0 z M 108,24 l 6,0 0,6 -6,0 z M 120,24 l 6,0 0,6 -6,0 z M 126,24 l 6,0 0,6 -6,0 z M 132,24 l 6,0 0,6 -6,0 z M 144,24 l 6,0 0,6 -6,0 z M 0,30 l 6,0 0,6 -6,0 z M 36,30 l 6,0 0,6 -6,0 z M 48,30 l 6,0 0,6 -6,0 z M 54,30 l 6,0 0,6 -6,0 z M 66,30 l 6,0 0,6 -6,0 z M 72,30 l 6,0 0,6 -6,0 z M 78,30 l 6,0 0,6 -6,0 z M 84,30 l 6,0 0,6 -6,0 z M 90,30 l 6,0 0,6 -6,0 z M 96,30 l 6,0 0,6 -6,0 z M 108,30 l 6,0 0,6 -6,0 z M 144,30 l 6,0 0,6 -6,0 z M 0,36 l 6,0 0,6 -6,0 z M 6,36 l 6,0 0,6 -6,0 z M 12,36 l 6,0 0,6 -6,0 z M 18,36 l 6,0 0,6 -6,0 z M 24,36 l 6,0 0,6 -6,0 z M 30,36 l 6,0 0,6 -6,0 z M 36,36 l 6,0 0,6 -6,0 z M 48,36 l 6,0 0,6 -6,0 z M 60,36 l 6,0 0,6 -6,0 z M 72,36 l 6,0 0,6 -6,0 z M 84,36 l 6,0 0,6 -6,0 z M 96,36 l 6,0 0,6 -6,0 z M 108,36 l 6,0 0,6 -6,0 z M 114,36 l 6,0 0,6 -6,0 z M 120,36 l 6,0 0,6 -6,0 z M 126,36 l 6,0 0,6 -6,0 z M 132,36 l 6,0 0,6 -6,0 z M 138,36 l 6,0 0,6 -6,0 z M 144,36 l 6,0 0,6 -6,0 z M 54,42 l 6,0 0,6 -6,0 z M 60,42 l 6,0 0,6 -6,0 z M 66,42 l 6,0 0,6 -6,0 z M 84,42 l 6,0 0,6 -6,0 z M 0,48 l 6,0 0,6 -6,0 z M 6,48 l 6,0 0,6 -6,0 z M 12,48 l 6,0 0,6 -6,0 z M 18,48 l 6,0 0,6 -6,0 z M 24,48 l 6,0 0,6 -6,0 z M 36,48 l 6,0 0,6 -6,0 z M 42,48 l 6,0 0,6 -6,0 z M 48,48 l 6,0 0,6 -6,0 z M 54,48 l 6,0 0,6 -6,0 z M 66,48 l 6,0 0,6 -6,0 z M 72,48 l 6,0 0,6 -6,0 z M 84,48 l 6,0 0,6 -6,0 z M 90,48 l 6,0 0,6 -6,0 z M 102,48 l 6,0 0,6 -6,0 z M 114,48 l 6,0 0,6 -6,0 z M 126,48 l 6,0 0,6 -6,0 z M 138,48 l 6,0 0,6 -6,0 z M 6,54 l 6,0 0,6 -6,0 z M 18,54 l 6,0 0,6 -6,0 z M 24,54 l 6,0 0,6 -6,0 z M 30,54 l 6,0 0,6 -6,0 z M 48,54 l 6,0 0,6 -6,0 z M 60,54 l 6,0 0,6 -6,0 z M 72,54 l 6,0 0,6 -6,0 z M 78,54 l 6,0 0,6 -6,0 z M 96,54 l 6,0 0,6 -6,0 z M 114,54 l 6,0 0,6 -6,0 z M 138,54 l 6,0 0,6 -6,0 z M 6,60 l 6,0 0,6 -6,0 z M 12,60 l 6,0 0,6 -6,0 z M 18,60 l 6,0 0,6 -6,0 z M 24,60 l 6,0 0,6 -6,0 z M 30,60 l 6,0 0,6 -6,0 z M 36,60 l 6,0 0,6 -6,0 z M 48,60 l 6,0 0,6 -6,0 z M 60,60 l 6,0 0,6 -6,0 z M 90,60 l 6,0 0,6 -6,0 z M 114,60 l 6,0 0,6 -6,0 z M 120,60 l 6,0 0,6 -6,0 z M 126,60 l 6,0 0,6 -6,0 z M 138,60 l 6,0 0,6 -6,0 z M 144,60 l 6,0 0,6 -6,0 z M 0,66 l 6,0 0,6 -6,0 z M 6,66 l 6,0 0,6 -6,0 z M 12,66 l 6,0 0,6 -6,0 z M 48,66 l 6,0 0,6 -6,0 z M 72,66 l 6,0 0,6 -6,0 z M 96,66 l 6,0 0,6 -6,0 z M 102,66 l 6,0 0,6 -6,0 z M 108,66 l 6,0 0,6 -6,0 z M 114,66 l 6,0 0,6 -6,0 z M 144,66 l 6,0 0,6 -6,0 z M 0,72 l 6,0 0,6 -6,0 z M 18,72 l 6,0 0,6 -6,0 z M 24,72 l 6,0 0,6 -6,0 z M 30,72 l 6,0 0,6 -6,0 z M 36,72 l 6,0 0,6 -6,0 z M 48,72 l 6,0 0,6 -6,0 z M 54,72 l 6,0 0,6 -6,0 z M 60,72 l 6,0 0,6 -6,0 z M 66,72 l 6,0 0,6 -6,0 z M 78,72 l 6,0 0,6 -6,0 z M 84,72 l 6,0 0,6 -6,0 z M 102,72 l 6,0 0,6 -6,0 z M 108,72 l 6,0 0,6 -6,0 z M 120,72 l 6,0 0,6 -6,0 z M 132,72 l 6,0 0,6 -6,0 z M 138,72 l 6,0 0,6 -6,0 z M 144,72 l 6,0 0,6 -6,0 z M 0,78 l 6,0 0,6 -6,0 z M 6,78 l 6,0 0,6 -6,0 z M 18,78 l 6,0 0,6 -6,0 z M 30,78 l 6,0 0,6 -6,0 z M 42,78 l 6,0 0,6 -6,0 z M 54,78 l 6,0 0,6 -6,0 z M 66,78 l 6,0 0,6 -6,0 z M 72,78 l 6,0 0,6 -6,0 z M 84,78 l 6,0 0,6 -6,0 z M 102,78 l 6,0 0,6 -6,0 z M 114,78 l 6,0 0,6 -6,0 z M 126,78 l 6,0 0,6 -6,0 z M 138,78 l 6,0 0,6 -6,0 z M 0,84 l 6,0 0,6 -6,0 z M 12,84 l 6,0 0,6 -6,0 z M 30,84 l 6,0 0,6 -6,0 z M 36,84 l 6,0 0,6 -6,0 z M 48,84 l 6,0 0,6 -6,0 z M 54,84 l 6,0 0,6 -6,0 z M 84,84 l 6,0 0,6 -6,0 z M 90,84 l 6,0 0,6 -6,0 z M 102,84 l 6,0 0,6 -6,0 z M 108,84 l 6,0 0,6 -6,0 z M 114,84 l 6,0 0,6 -6,0 z M 120,84 l 6,0 0,6 -6,0 z M 126,84 l 6,0 0,6 -6,0 z M 138,84 l 6,0 0,6 -6,0 z M 144,84 l 6,0 0,6 -6,0 z M 0,90 l 6,0 0,6 -6,0 z M 18,90 l 6,0 0,6 -6,0 z M 30,90 l 6,0 0,6 -6,0 z M 42,90 l 6,0 0,6 -6,0 z M 48,90 l 6,0 0,6 -6,0 z M 54,90 l 6,0 0,6 -6,0 z M 72,90 l 6,0 0,6 -6,0 z M 84,90 l 6,0 0,6 -6,0 z M 108,90 l 6,0 0,6 -6,0 z M 114,90 l 6,0 0,6 -6,0 z M 120,90 l 6,0 0,6 -6,0 z M 144,90 l 6,0 0,6 -6,0 z M 0,96 l 6,0 0,6 -6,0 z M 12,96 l 6,0 0,6 -6,0 z M 18,96 l 6,0 0,6 -6,0 z M 24,96 l 6,0 0,6 -6,0 z M 30,96 l 6,0 0,6 -6,0 z M 36,96 l 6,0 0,6 -6,0 z M 48,96 l 6,0 0,6 -6,0 z M 54,96 l 6,0 0,6 -6,0 z M 60,96 l 6,0 0,6 -6,0 z M 78,96 l 6,0 0,6 -6,0 z M 84,96 l 6,0 0,6 -6,0 z M 90,96 l 6,0 0,6 -6,0 z M 96,96 l 6,0 0,6 -6,0 z M 102,96 l 6,0 0,6 -6,0 z M 108,96 l 6,0 0,6 -6,0 z M 114,96 l 6,0 0,6 -6,0 z M 120,96 l 6,0 0,6 -6,0 z M 132,96 l 6,0 0,6 -6,0 z M 48,102 l 6,0 0,6 -6,0 z M 60,102 l 6,0 0,6 -6,0 z M 66,102 l 6,0 0,6 -6,0 z M 72,102 l 6,0 0,6 -6,0 z M 78,102 l 6,0 0,6 -6,0 z M 84,102 l 6,0 0,6 -6,0 z M 90,102 l 6,0 0,6 -6,0 z M 96,102 l 6,0 0,6 -6,0 z M 120,102 l 6,0 0,6 -6,0 z M 126,102 l 6,0 0,6 -6,0 z M 0,108 l 6,0 0,6 -6,0 z M 6,108 l 6,0 0,6 -6,0 z M 12,108 l 6,0 0,6 -6,0 z M 18,108 l 6,0 0,6 -6,0 z M 24,108 l 6,0 0,6 -6,0 z M 30,108 l 6,0 0,6 -6,0 z M 36,108 l 6,0 0,6 -6,0 z M 48,108 l 6,0 0,6 -6,0 z M 72,108 l 6,0 0,6 -6,0 z M 96,108 l 6,0 0,6 -6,0 z M 108,108 l 6,0 0,6 -6,0 z M 120,108 l 6,0 0,6 -6,0 z M 132,108 l 6,0 0,6 -6,0 z M 138,108 l 6,0 0,6 -6,0 z M 144,108 l 6,0 0,6 -6,0 z M 0,114 l 6,0 0,6 -6,0 z M 36,114 l 6,0 0,6 -6,0 z M 54,114 l 6,0 0,6 -6,0 z M 60,114 l 6,0 0,6 -6,0 z M 66,114 l 6,0 0,6 -6,0 z M 84,114 l 6,0 0,6 -6,0 z M 96,114 l 6,0 0,6 -6,0 z M 120,114 l 6,0 0,6 -6,0 z M 126,114 l 6,0 0,6 -6,0 z M 138,114 l 6,0 0,6 -6,0 z M 0,120 l 6,0 0,6 -6,0 z M 12,120 l 6,0 0,6 -6,0 z M 18,120 l 6,0 0,6 -6,0 z M 24,120 l 6,0 0,6 -6,0 z M 36,120 l 6,0 0,6 -6,0 z M 48,120 l 6,0 0,6 -6,0 z M 60,120 l 6,0 0,6 -6,0 z M 84,120 l 6,0 0,6 -6,0 z M 90,120 l 6,0 0,6 -6,0 z M 96,120 l 6,0 0,6 -6,0 z M 102,120 l 6,0 0,6 -6,0 z M 108,120 l 6,0 0,6 -6,0 z M 114,120 l 6,0 0,6 -6,0 z M 120,120 l 6,0 0,6 -6,0 z M 132,120 l 6,0 0,6 -6,0 z M 0,126 l 6,0 0,6 -6,0 z M 12,126 l 6,0 0,6 -6,0 z M 18,126 l 6,0 0,6 -6,0 z M 24,126 l 6,0 0,6 -6,0 z M 36,126 l 6,0 0,6 -6,0 z M 48,126 l 6,0 0,6 -6,0 z M 66,126 l 6,0 0,6 -6,0 z M 102,126 l 6,0 0,6 -6,0 z M 108,126 l 6,0 0,6 -6,0 z M 120,126 l 6,0 0,6 -6,0 z M 126,126 l 6,0 0,6 -6,0 z M 132,126 l 6,0 0,6 -6,0 z M 138,126 l 6,0 0,6 -6,0 z M 144,126 l 6,0 0,6 -6,0 z M 0,132 l 6,0 0,6 -6,0 z M 12,132 l 6,0 0,6 -6,0 z M 18,132 l 6,0 0,6 -6,0 z M 24,132 l 6,0 0,6 -6,0 z M 36,132 l 6,0 0,6 -6,0 z M 48,132 l 6,0 0,6 -6,0 z M 54,132 l 6,0 0,6 -6,0 z M 60,132 l 6,0 0,6 -6,0 z M 84,132 l 6,0 0,6 -6,0 z M 126,132 l 6,0 0,6 -6,0 z M 132,132 l 6,0 0,6 -6,0 z M 144,132 l 6,0 0,6 -6,0 z M 0,138 l 6,0 0,6 -6,0 z M 36,138 l 6,0 0,6 -6,0 z M 48,138 l 6,0 0,6 -6,0 z M 96,138 l 6,0 0,6 -6,0 z M 114,138 l 6,0 0,6 -6,0 z M 120,138 l 6,0 0,6 -6,0 z M 126,138 l 6,0 0,6 -6,0 z M 144,138 l 6,0 0,6 -6,0 z M 0,144 l 6,0 0,6 -6,0 z M 6,144 l 6,0 0,6 -6,0 z M 12,144 l 6,0 0,6 -6,0 z M 18,144 l 6,0 0,6 -6,0 z M 24,144 l 6,0 0,6 -6,0 z M 30,144 l 6,0 0,6 -6,0 z M 36,144 l 6,0 0,6 -6,0 z M 48,144 l 6,0 0,6 -6,0 z M 72,144 l 6,0 0,6 -6,0 z M 78,144 l 6,0 0,6 -6,0 z M 84,144 l 6,0 0,6 -6,0 z M 108,144 l 6,0 0,6 -6,0 z M 114,144 l 6,0 0,6 -6,0 z M 120,144 l 6,0 0,6 -6,0 z M 126,144 l 6,0 0,6 -6,0 z M 132,144 l 6,0 0,6 -6,0 z M 138,144 l 6,0 0,6 -6,0 z M 144,144 l 6,0 0,6 -6,0 z " />
                  </svg>
                </a>
              </div>
              <div className="pt-2.5 border-t border-slate-800/70 flex items-center justify-between text-[9px] font-mono tracking-[0.05em] whitespace-nowrap">
                <span className="text-slate-400 uppercase">FRONTEND DEVELOPER</span>
                <span className="text-emerald-400 font-semibold">GPA 3.2 / 4.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Dossier Cards */}
        <div className="space-y-6">
          {/* Mobile Card 1 */}
          <div className="relative rounded-2xl border border-white/12 bg-[#080D1A]/95 p-6 flex flex-col gap-4 shadow-lg min-h-[380px] overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
            <div className="relative z-10 pb-3 border-b border-teal-500/20 flex items-center justify-between">
              <span className="font-mono text-xs text-teal-400 tracking-widest uppercase font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                [ FILE 0.1 // CORE IDENTITY & ENGINEERING ETHOS ]
              </span>
            </div>
            <div className="relative z-10 flex flex-col gap-3 my-auto">
              <blockquote className="font-serif italic text-base sm:text-lg text-white font-normal leading-snug">
                "Tỉ mỉ đến từng mili-giây. Tôi không chỉ viết mã nguồn; tôi kiến tạo những trải nghiệm số mượt mà, phản hồi tức thì — nơi thẩm mỹ thị giác giao thoa cùng kiến trúc hệ thống vững chắc."
              </blockquote>
              <p className="font-sans text-xs text-slate-300 leading-relaxed">
                Kỹ sư định hướng Frontend với nền tảng Khoa học Máy tính vững chắc tại ĐH Giao thông Vận tải TP.HCM (UTH). Kết nối liền mạch giữa giao diện tương tác cao và kiến trúc backend phức tạp — từ mạng socket phân tán bằng Python đến WebRTC thời gian thực và chuỗi xử lý AI RAG.
              </p>
              <div className="grid grid-cols-1 gap-2 pt-1">
                <div className="border border-slate-800 bg-slate-900/40 p-2.5 rounded-lg">
                  <span className="text-[9px] font-mono text-slate-400 tracking-wider uppercase block">EDUCATION</span>
                  <span className="text-xs font-semibold text-white">CNTT @ UTH (GPA 3.2/4.0)</span>
                </div>
                <div className="border border-slate-800 bg-slate-900/40 p-2.5 rounded-lg">
                  <span className="text-[9px] font-mono text-slate-400 tracking-wider uppercase block">CREDENTIALS</span>
                  <span className="text-xs font-semibold text-white">Tiếng Anh B1.4 & Tin học UD</span>
                </div>
                <div className="border border-slate-800 bg-slate-900/40 p-2.5 rounded-lg">
                  <span className="text-[9px] font-mono text-slate-400 tracking-wider uppercase block">AVAILABILITY</span>
                  <span className="text-xs font-semibold text-teal-300 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    <span>Sẵn sàng thực tập / Làm việc</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="relative z-10 mt-auto flex flex-wrap gap-2 pt-3 border-t border-white/5">
              {['[KIẾN TRÚC HỆ THỐNG]', '[60FPS UI/UX]', '[MẠNG REAL-TIME]', '[TP. HỒ CHÍ MINH]'].map((tag) => (
                <span
                  key={tag}
                  className="bg-teal-900/20 text-teal-300 border border-teal-500/30 px-2.5 py-1 text-[10px] font-mono rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Mobile Card 2 */}
          <div className="relative rounded-2xl border border-white/12 bg-[#080D1A]/95 p-6 flex flex-col gap-4 shadow-lg min-h-[380px] overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
            <div className="relative z-10 pb-3 border-b border-teal-500/20 flex items-center justify-between">
              <span className="font-mono text-xs text-teal-400 tracking-widest uppercase font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                [ FILE 0.2 // TECHNICAL STACK & INFRASTRUCTURE ]
              </span>
            </div>
            <div className="relative z-10 flex flex-col gap-3 my-auto">
              <div className="border border-slate-800/80 bg-slate-900/40 p-3 rounded-xl flex flex-col gap-2">
                <span className="font-mono text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  01 // FRONTEND & MOTION
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['React 19', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Vite'].map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-1 text-[11px] bg-slate-800/60 text-slate-200 px-2 py-0.5 rounded-md border border-slate-700/50 font-mono"
                    >
                      {renderTechIcon(skill)}
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-slate-800/80 bg-slate-900/40 p-3 rounded-xl flex flex-col gap-2">
                <span className="font-mono text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                  02 // BACKEND & NETWORKS
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Node.js', 'Python', 'WebRTC', 'Socket.IO', 'TCP/IP Sockets', 'Multi-threading'].map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-1 text-[11px] bg-slate-800/60 text-slate-200 px-2 py-0.5 rounded-md border border-slate-700/50 font-mono"
                    >
                      {renderTechIcon(skill)}
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-slate-800/80 bg-slate-900/40 p-3 rounded-xl flex flex-col gap-2">
                <span className="font-mono text-xs font-semibold text-purple-400 uppercase tracking-wider">
                  03 // AI & DATA PIPELINES
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['RAG Architecture', 'OpenAI / Gemini API', 'Vector DB', 'Semantic Chunking'].map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-1 text-[11px] bg-slate-800/60 text-slate-200 px-2 py-0.5 rounded-md border border-slate-700/50 font-mono"
                    >
                      {renderTechIcon(skill)}
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-slate-800/80 bg-slate-900/40 p-3 rounded-xl flex flex-col gap-2">
                <span className="font-mono text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  04 // DEVOPS & WORKFLOW
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Git / GitHub', 'Docker', 'Cloudflare Edge', 'Postman', 'Figma', 'Linux'].map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-1 text-[11px] bg-slate-800/60 text-slate-200 px-2 py-0.5 rounded-md border border-slate-700/50 font-mono"
                    >
                      {renderTechIcon(skill)}
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Card 3 */}
          <div className="relative rounded-2xl border border-white/12 bg-[#080D1A]/95 p-6 flex flex-col gap-4 shadow-lg min-h-[380px] overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
            <div className="relative z-10 pb-3 border-b border-teal-500/20 flex items-center justify-between">
              <span className="font-mono text-xs text-teal-400 tracking-widest uppercase font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                [ FILE 0.3 // DEPLOYED SYSTEMS & CASE LOGS ]
              </span>
            </div>
            <div className="relative z-10 flex flex-col gap-3 my-auto">
              <div className="border border-slate-800/80 bg-slate-900/40 p-4 rounded-xl flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-mono text-xs sm:text-sm font-bold text-teal-300 uppercase">
                    NEXUSCHAT — Hệ Sinh Thái Giao Tiếp Real-Time
                  </h4>
                </div>
                <p className="font-mono text-[10px] text-teal-400/80">
                  React · Node.js · WebRTC · Socket.IO
                </p>
                <p className="font-sans text-xs text-slate-300 leading-relaxed">
                  "Xây dựng đường truyền WebRTC P2P gọi thoại/video độ trễ thấp (&lt;45ms) và đồng bộ phòng đa luồng, tích hợp trợ lý AI thông minh cùng bảo mật JWT đa tầng."
                </p>
              </div>

              <div className="border border-slate-800/80 bg-slate-900/40 p-4 rounded-xl flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-mono text-xs sm:text-sm font-bold text-purple-300 uppercase">
                    AGENT_LAW — Trợ Lý Pháp Lý RAG AI
                  </h4>
                </div>
                <p className="font-mono text-[10px] text-purple-400/80">
                  Next.js · Python · Vector DB · LLM
                </p>
                <p className="font-sans text-xs text-slate-300 leading-relaxed">
                  "Thiết kế pipeline phân đoạn ngữ nghĩa (semantic chunking) và tìm kiếm vector tương đồng trên dữ liệu luật chuyên sâu, triệt tiêu hoàn toàn ảo tưởng AI và rút ngắn tra cứu từ hàng giờ xuống vài giây."
                </p>
              </div>
            </div>
            <div className="relative z-10 mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-mono text-[9px] text-gray-400 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
                <span>ACTIVE RADAR</span>
              </div>
              <a
                href="#contact"
                className="btn-initiate-contact px-4 py-2 rounded-md font-mono text-xs uppercase tracking-wider text-[#2DD4BF] border border-[#2DD4BF] transition-all duration-300 flex items-center gap-1.5"
              >
                <svg
                  className="w-3 h-3 text-[#2DD4BF]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>[ KẾT NỐI // CONTACT ↗ ]</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section Bottom Border ── */}
      <div className="relative z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
};

export default About;
