"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import { getEn } from "@/i18n/translations";

/* ────────────────────────────────────────────
   Hobby Icon SVGs — artistic line-art style
   ──────────────────────────────────────────── */
function HobbyIcon({ type }: { type: string }) {
  const common = "w-full h-full";
  switch (type) {
    case "badminton":
      return (
        <svg viewBox="0 0 48 48" fill="none" className={common}>
          {/* Racket frame */}
          <ellipse cx="24" cy="16" rx="10" ry="13" stroke="currentColor" strokeWidth="1.5" />
          {/* Strings */}
          <line x1="24" y1="3" x2="24" y2="29" stroke="currentColor" strokeWidth="0.7" opacity="0.4" />
          <line x1="14" y1="16" x2="34" y2="16" stroke="currentColor" strokeWidth="0.7" opacity="0.4" />
          <line x1="15.5" y1="10" x2="32.5" y2="10" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          <line x1="15.5" y1="22" x2="32.5" y2="22" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          {/* Handle */}
          <line x1="24" y1="29" x2="24" y2="44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          {/* Shuttlecock */}
          <circle cx="38" cy="6" r="2" fill="currentColor" opacity="0.5" />
          <path d="M38 8 L36 13 M38 8 L38 14 M38 8 L40 13" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
        </svg>
      );
    case "tabletennis":
      return (
        <svg viewBox="0 0 48 48" fill="none" className={common}>
          {/* Paddle */}
          <circle cx="22" cy="18" r="12" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="22" cy="18" r="12" fill="currentColor" fillOpacity="0.05" />
          {/* Divider line on paddle */}
          <line x1="22" y1="6" x2="22" y2="30" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
          {/* Handle */}
          <line x1="22" y1="30" x2="22" y2="44" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          {/* Ball */}
          <circle cx="38" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M35.5 7 Q38 10 35.5 13" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />
        </svg>
      );
    case "swimming":
      return (
        <svg viewBox="0 0 48 48" fill="none" className={common}>
          {/* Swimmer body */}
          <circle cx="14" cy="20" r="3.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M17.5 20 L32 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          {/* Arm extended */}
          <path d="M32 20 L38 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          {/* Legs */}
          <path d="M17.5 20 L14 27 M17.5 20 L20 26" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          {/* Waves */}
          <path d="M4 32 Q10 28 16 32 Q22 36 28 32 Q34 28 40 32 Q46 36 48 34" stroke="currentColor" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
          <path d="M4 38 Q10 34 16 38 Q22 42 28 38 Q34 34 40 38 Q46 42 48 40" stroke="currentColor" strokeWidth="0.8" opacity="0.25" strokeLinecap="round" />
        </svg>
      );
    case "cycling":
      return (
        <svg viewBox="0 0 48 48" fill="none" className={common}>
          {/* Wheels */}
          <circle cx="12" cy="32" r="9" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="36" cy="32" r="9" stroke="currentColor" strokeWidth="1.3" />
          {/* Spokes */}
          <line x1="12" y1="23" x2="12" y2="41" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          <line x1="3" y1="32" x2="21" y2="32" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          <line x1="36" y1="23" x2="36" y2="41" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          <line x1="27" y1="32" x2="45" y2="32" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          {/* Frame */}
          <path d="M12 32 L22 18 L36 32 M22 18 L30 18 L36 32 M22 18 L18 32" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Seat */}
          <line x1="20" y1="17" x2="25" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          {/* Handlebar */}
          <path d="M30 18 L32 15 L35 15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
    case "guitar":
      return (
        <svg viewBox="0 0 48 48" fill="none" className={common}>
          {/* Body */}
          <path d="M20 38 Q12 36 10 30 Q8 24 12 20 Q14 18 18 16 Q14 18 12 20 Q8 24 10 30 Q12 36 20 38 Q28 40 32 34 Q36 28 34 22 Q32 18 28 16 Q24 18 28 16 Q32 18 34 22 Q36 28 32 34 Q28 40 20 38Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.04" />
          {/* Sound hole */}
          <circle cx="22" cy="30" r="3.5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          {/* Neck */}
          <line x1="23" y1="16" x2="28" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          {/* Headstock */}
          <path d="M27 5 L32 3 M27.5 6 L32 5" stroke="currentColor" strokeWidth="1" opacity="0.6" strokeLinecap="round" />
          {/* Strings */}
          <line x1="21" y1="34" x2="27" y2="5" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
          <line x1="23" y1="34" x2="29" y2="5" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
          {/* Bridge */}
          <line x1="20" y1="34" x2="24" y2="34" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
        </svg>
      );
    case "piano":
      return (
        <svg viewBox="0 0 48 48" fill="none" className={common}>
          {/* Piano body outline */}
          <rect x="4" y="14" width="40" height="24" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.03" />
          {/* White keys */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <line key={i} x1={9 + i * 5} y1="14" x2={9 + i * 5} y2="38" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
          ))}
          {/* Black keys */}
          {[0, 1, 3, 4, 5].map((i) => (
            <rect key={`b${i}`} x={7.5 + i * 5} y="14" width="3" height="14" rx="0.5" fill="currentColor" fillOpacity="0.25" />
          ))}
          {/* Lid open hint */}
          <path d="M4 14 L24 6 L44 14" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        </svg>
      );
    case "drums":
      return (
        <svg viewBox="0 0 48 48" fill="none" className={common}>
          {/* Snare drum */}
          <ellipse cx="24" cy="28" rx="14" ry="5" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="24" cy="28" rx="14" ry="5" fill="currentColor" fillOpacity="0.04" />
          <line x1="10" y1="28" x2="10" y2="38" stroke="currentColor" strokeWidth="1.3" />
          <line x1="38" y1="28" x2="38" y2="38" stroke="currentColor" strokeWidth="1.3" />
          <ellipse cx="24" cy="38" rx="14" ry="5" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          {/* Hi-hat */}
          <ellipse cx="8" cy="14" rx="6" ry="2" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <ellipse cx="8" cy="16" rx="6" ry="2" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <line x1="8" y1="16" x2="8" y2="38" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
          {/* Cymbal */}
          <ellipse cx="40" cy="12" rx="7" ry="2.5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <line x1="40" y1="14.5" x2="40" y2="38" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
          {/* Drumsticks */}
          <line x1="18" y1="8" x2="28" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <line x1="30" y1="8" x2="20" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </svg>
      );
    default:
      return null;
  }
}

/* ────────────────────────────────────────────
   Hobby grid item
   ──────────────────────────────────────────── */
const hobbies = [
  { id: "badminton", label: "羽毛球", en: "Badminton", color: "59,130,246" },
  { id: "tabletennis", label: "乒乓球", en: "Table Tennis", color: "16,185,129" },
  { id: "swimming", label: "游泳", en: "Swimming", color: "6,182,212" },
  { id: "cycling", label: "骑行", en: "Cycling", color: "245,158,11" },
  { id: "guitar", label: "吉他", en: "Guitar", color: "239,68,68" },
  { id: "piano", label: "钢琴", en: "Piano", color: "139,92,246" },
  { id: "drums", label: "架子鼓", en: "Drums", color: "236,72,153" },
];

function HobbyCard({ hobby, index }: { hobby: typeof hobbies[0]; index: number }) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group hobby-card rounded-2xl p-5 flex flex-col items-center gap-3 text-center"
      data-magnetic
    >
      {/* Icon container with glow */}
      <div className="relative w-14 h-14 md:w-16 md:h-16">
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
          style={{ background: `rgba(${hobby.color}, 0.25)` }}
        />
        <motion.div
          className="relative w-full h-full"
          style={{ color: `rgba(${hobby.color}, 0.7)` }}
          whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
          transition={{ scale: { type: "spring", stiffness: 300, damping: 15 }, rotate: { duration: 0.4, ease: "easeInOut" } }}
        >
          <HobbyIcon type={hobby.id} />
        </motion.div>
      </div>

      {/* Label */}
      <div>
        <span className="block text-sm font-bold text-slate-800 dark:text-white/85 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
          {t(hobby.label, getEn(hobby.label))}
        </span>
        <span
          className="block text-[10px] font-light tracking-wider mt-0.5 transition-colors duration-300"
          style={{ color: `rgba(${hobby.color}, 0.5)` }}
        >
          {hobby.en}
        </span>
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   Patent card
   ──────────────────────────────────────────── */
function PatentCard() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="hobby-feature-card rounded-2xl p-6 md:p-8 overflow-hidden relative group"
      data-magnetic
    >
      {/* Decorative patent stamp watermark */}
      <div className="absolute top-4 right-4 opacity-[0.04] dark:opacity-[0.06] pointer-events-none select-none">
        <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-32 md:h-32">
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="3" fill="none" />
          <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1" fill="none" />
          <text x="50" y="45" textAnchor="middle" fontSize="10" fill="currentColor" fontWeight="bold">PATENT</text>
          <text x="50" y="60" textAnchor="middle" fontSize="7" fill="currentColor">CN</text>
        </svg>
      </div>

      <div className="relative z-10">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 dark:bg-amber-400/10 flex items-center justify-center">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-amber-500 dark:text-amber-400">
              <path fillRule="evenodd" d="M5.5 3A2.5 2.5 0 003 5.5v2.879a2.5 2.5 0 00.732 1.767l6.5 6.5a2.5 2.5 0 003.536 0l2.878-2.878a2.5 2.5 0 000-3.536l-6.5-6.5A2.5 2.5 0 008.38 3H5.5zM6 7a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-[10px] font-mono tracking-[0.3em] text-amber-500/60 dark:text-amber-400/50 uppercase">
            Invention Patent
          </span>
        </div>

        <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-1.5">
          {t("《一种电子设备及控制方法》", "Electronic Device & Control Method")}
        </h3>
        <p className="text-xs text-slate-500 dark:text-white/40 mb-3 font-light">
          {t("第一发明人", "First Inventor")} &middot; First Inventor
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider bg-amber-500/8 dark:bg-amber-400/8 text-amber-600 dark:text-amber-400/70 border border-amber-500/15 dark:border-amber-400/12">
            CN106647782A
          </span>
          <span className="text-[11px] text-slate-400 dark:text-white/25 font-light">
            {t("公开号", "Publication No.")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   Music player card — QQ Music embed
   ──────────────────────────────────────────── */
function MusicCard() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="hobby-feature-card rounded-2xl p-6 md:p-8 overflow-hidden relative group"
      data-magnetic
    >
      {/* Piano keys watermark */}
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none select-none opacity-[0.035] dark:opacity-[0.05]">
        <svg viewBox="0 0 560 100" preserveAspectRatio="none" className="w-full h-full">
          {/* White keys */}
          {Array.from({ length: 20 }, (_, i) => (
            <g key={`w${i}`}>
              <rect x={i * 28} y="0" width="27" height="100" fill="currentColor" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
            </g>
          ))}
          {/* Black keys */}
          {Array.from({ length: 20 }, (_, i) => {
            const pos = i % 7;
            if (pos === 2 || pos === 6) return null;
            return (
              <rect key={`b${i}`} x={i * 28 + 18} y="0" width="16" height="58" rx="1" fill="currentColor" opacity="0.6" />
            );
          })}
        </svg>
      </div>

      <div className="relative z-10">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-violet-500/10 dark:bg-violet-400/10 flex items-center justify-center">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-violet-500 dark:text-violet-400">
              <path d="M18 3.25a.75.75 0 00-1.004-.706L8.246 5.789A1.5 1.5 0 007.5 7.21v6.04a3 3 0 10 1.5 2.6V7.21l7.5-2.879v5.92a3 3 0 101.5 2.6V3.25z" />
            </svg>
          </div>
          <span className="text-[10px] font-mono tracking-[0.3em] text-violet-500/60 dark:text-violet-400/50 uppercase">
            Original Album
          </span>
        </div>

        <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-1">
          {t("《北京蒸汽朋克》", "Beijing Steampunk")}
        </h3>
        <p className="text-xs text-slate-500 dark:text-white/40 mb-5 font-light">
          {t("原创歌曲专辑", "Original Music Album")} &middot; Original Music
        </p>

        {/* Custom mini player — links to QQ Music */}
        <a
          href="https://c6.y.qq.com/base/fcgi-bin/u?__=XeuQ3rTba92Y"
          target="_blank"
          rel="noopener noreferrer"
          className="hobby-player rounded-xl flex items-center gap-4 px-4 py-3 group/player cursor-pointer"
        >
          {/* Play button */}
          <div className="w-10 h-10 rounded-full bg-violet-500/15 dark:bg-violet-400/10 flex items-center justify-center flex-shrink-0 group-hover/player:bg-violet-500/25 dark:group-hover/player:bg-violet-400/20 transition-colors duration-300">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-violet-500 dark:text-violet-400 ml-0.5">
              <path d="M6.3 2.84A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.27l9.344-5.891a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>

          {/* Track info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 dark:text-white/80 truncate">
              {t("雪花落下想起你", "Snowflakes Remind Me of You")}
            </p>
            <p className="text-[11px] text-slate-400 dark:text-white/30 font-light mt-0.5">
              {t("点击前往 QQ 音乐收听", "Listen on QQ Music")}
            </p>
          </div>

          {/* Decorative visualizer bars */}
          <div className="flex items-end gap-[3px] h-5 flex-shrink-0">
            {[0.6, 1, 0.4, 0.8, 0.5].map((h, i) => (
              <motion.div
                key={i}
                className="w-[3px] rounded-full bg-violet-500/30 dark:bg-violet-400/20"
                animate={{ height: [`${h * 20}px`, `${h * 8}px`, `${h * 20}px`] }}
                transition={{ duration: 1.2 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>

          {/* External link icon */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 text-slate-300 dark:text-white/15 group-hover/player:text-violet-400 transition-colors duration-300">
            <path d="M3 11L11 3M11 3H6M11 3V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        {/* Album link */}
        <a
          href="https://y.qq.com/n/ryqq/albumDetail/000TTyM81hFypT"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-4 text-[11px] font-mono tracking-wider text-violet-500/50 dark:text-violet-400/40 hover:text-violet-500 dark:hover:text-violet-400 transition-colors duration-300"
          data-magnetic
        >
          <span>VIEW FULL ALBUM ON QQ MUSIC</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   Section Title
   ──────────────────────────────────────────── */
function SectionTitle() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="text-center mb-14 md:mb-18"
    >
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="text-[10px] font-mono tracking-[0.4em] text-slate-400 dark:text-white/25 uppercase block mb-4"
      >
        11 / Interests
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <span className="block text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
          {t("爱好与特长", "Interests & Talents")}
        </span>
        <span className="block text-lg md:text-xl lg:text-2xl font-extralight italic tracking-[0.15em] text-slate-400 dark:text-white/30 mt-1">
          Interests & Talents
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-5 text-sm md:text-base text-slate-500 dark:text-white/40 max-w-md mx-auto font-light leading-relaxed"
      >
        {t("技术之外，热爱运动与音乐", "Beyond technology — passionate about sports and music")}
      </motion.p>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mt-6 mx-auto h-px w-20 origin-center"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.4), rgba(245,158,11,0.4), transparent)",
        }}
      />
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   Main Section
   ──────────────────────────────────────────── */
export default function HobbiesSection() {
  return (
    <section
      id="hobbies"
      className="relative py-12 md:py-16 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto"
    >
      <SectionTitle />

      {/* Featured: Patent + Music side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        <PatentCard />
        <MusicCard />
      </div>

      {/* Hobby icon grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 md:gap-4">
        {hobbies.map((h, i) => (
          <HobbyCard key={h.id} hobby={h} index={i} />
        ))}
      </div>
    </section>
  );
}
