"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import { getEn } from "@/i18n/translations";

/* ─── data ──────────────────────────────────────────── */
const roles = [
  {
    label: "研发",
    en: "R&D Engineering",
    years: 1.5,
    color: "#3B82F6",
    description: "深入技术底层，理解代码到架构",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <path d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "产品运营",
    en: "Product & Operations",
    years: 5.5,
    color: "#10B981",
    description: "主导产品全生命周期管理",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <path d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "客户拓展",
    en: "Customer Development",
    years: 1,
    color: "#F59E0B",
    description: "一线洞察需求，赋能商业闭环",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <path d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const totalYears = roles.reduce((s, r) => s + r.years, 0);

const globalFacts = [
  { label: "驻海外工作", value: "6", unit: "个月", color: "#3B82F6" },
  { label: "海外业务经验", value: "3", unit: "年", color: "#10B981" },
  { label: "英语能力", value: "CET-6", unit: "", color: "#8B5CF6" },
];

const aiReadiness = [
  { label: "B端平台业务与AI能力结合", sub: "更好地应对柔性业务与刚性系统的融合挑战" },
  { label: "应对AI时代角色变化挑战", sub: "通过Vibe Coding从交付产品文档到交付准系统，更高效，更准确" },
  { label: "Harness/Context/Prompt工程", sub: "充分挖掘大模型的能力，规避大模型的风险" },
  { label: "紧跟AI技术演进热潮", sub: "过滤可用的技术，瞭望未来的方向，让组织效能永居潮头" },
];

/* ─── Animated arc bar (horizontal) ─────────────────── */
function RoleTimeline({ isInView }: { isInView: boolean }) {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="space-y-5">
      {/* Horizontal segmented bar */}
      <div className="relative h-3 rounded-full overflow-hidden bg-slate-200/50 dark:bg-white/[0.04]">
        {roles.reduce<{ elements: React.ReactNode[]; offset: number }>(
          (acc, role, i) => {
            const pct = (role.years / totalYears) * 100;
            acc.elements.push(
              <motion.div
                key={role.label}
                className="absolute top-0 h-full rounded-full"
                style={{
                  left: `${acc.offset}%`,
                  background: `linear-gradient(90deg, ${role.color}CC, ${role.color})`,
                  boxShadow: hovered === i ? `0 0 14px ${role.color}60` : "none",
                }}
                initial={{ width: 0 }}
                animate={isInView ? { width: `${pct}%` } : {}}
                transition={{ delay: 0.4 + i * 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            );
            acc.offset += pct;
            return acc;
          },
          { elements: [], offset: 0 }
        ).elements}
      </div>

      {/* Role detail rows */}
      <div className="space-y-3">
        {roles.map((role, i) => {
          const pct = ((role.years / totalYears) * 100).toFixed(0);
          const isActive = hovered === i;
          return (
            <motion.div
              key={role.label}
              className="flex items-center gap-4 rounded-xl px-4 py-3 transition-colors duration-300"
              style={{
                background: isActive ? `${role.color}08` : "transparent",
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* icon */}
              <div
                className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                style={{
                  background: `${role.color}${isActive ? '20' : '10'}`,
                  color: role.color,
                  boxShadow: isActive ? `0 0 16px ${role.color}20` : "none",
                }}
              >
                {role.icon}
              </div>

              {/* text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-slate-800 dark:text-white">
                    {t(role.label, getEn(role.label))}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-white/30">
                    {role.en}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-white/40 mt-0.5">{t(role.description, getEn(role.description))}</p>
              </div>

              {/* metric */}
              <div className="flex-shrink-0 text-right">
                <span className="text-lg font-bold font-mono" style={{ color: role.color }}>
                  {role.years}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-white/30 ml-0.5">{t("年", "yrs")}</span>
                <p className="text-[10px] font-mono text-slate-400 dark:text-white/20">{pct}%</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Total */}
      <motion.div
        className="flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-white/[0.06]"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        <span className="text-xs font-mono text-slate-400 dark:text-white/30 tracking-wider">TOTAL EXPERIENCE</span>
        <span className="text-xl font-bold gradient-text">{totalYears} {t("年", "yrs")}</span>
      </motion.div>
    </div>
  );
}

/* ─── World map with arcs ───────────────────────────── */
function GlobalMap({ isInView }: { isInView: boolean }) {
  const { t } = useLanguage();
  const mapDots: [number, number][] = [
    [48,22],[50,24],[52,20],[46,26],[54,28],[44,30],
    [48,38],[50,42],[46,46],[52,36],[44,50],
    [62,24],[66,22],[70,20],[74,26],[78,28],[72,32],[68,30],[64,28],[76,22],[80,30],[82,26],
    [75,24],[77,25],[76,27],[78,23],[74,22],
    [28,22],[26,28],[24,34],[30,26],[32,30],[22,40],[26,44],[28,48],[30,42],
    [80,46],[82,48],[78,44],
  ];

  const connections = [
    { from: [76,27], to: [48,22] },
    { from: [76,27], to: [28,22] },
    { from: [76,27], to: [66,22] },
    { from: [76,27], to: [80,46] },
  ] as const;

  return (
    <div className="relative w-full">
      <div className="aspect-[2/1] max-w-lg mx-auto">
        <svg viewBox="0 0 100 60" className="w-full h-full" fill="none">
          {mapDots.map(([cx, cy], i) => {
            const isChina = cx >= 74 && cx <= 80 && cy >= 22 && cy <= 28;
            return (
              <motion.circle
                key={`d-${i}`}
                cx={cx} cy={cy}
                r={isChina ? 1 : 0.6}
                className={isChina ? "fill-electric-blue" : "fill-slate-400/30 dark:fill-white/15"}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 + i * 0.015, duration: 0.35 }}
              />
            );
          })}
          {connections.map((c, i) => (
            <motion.line
              key={`l-${i}`}
              x1={c.from[0]} y1={c.from[1]} x2={c.to[0]} y2={c.to[1]}
              stroke="url(#jg)" strokeWidth={0.3} strokeDasharray="2 1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
              transition={{ delay: 0.8 + i * 0.15, duration: 0.7, ease: "easeOut" }}
            />
          ))}
          <motion.circle
            cx={76} cy={25} r={3} fill="none" stroke="#3B82F6" strokeWidth={0.4}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={isInView ? { scale: [0.5,1.8,0.5], opacity: [0.6,0,0.6] } : {}}
            transition={{ delay: 1, duration: 2.5, repeat: Infinity }}
          />
          <defs>
            <linearGradient id="jg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Stat pills */}
      <div className="flex flex-wrap justify-center gap-3 mt-5">
        {globalFacts.map((s, i) => (
          <motion.div
            key={s.label}
            className="journey-stat-pill flex items-center gap-2 rounded-full px-4 py-2"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.3 + i * 0.12, duration: 0.5 }}
          >
            <span className="text-base font-bold font-mono" style={{ color: s.color }}>
              {s.value}
            </span>
            {s.unit && <span className="text-[10px] text-slate-500 dark:text-white/40">{t(s.unit, getEn(s.unit))}</span>}
            <span className="text-xs text-slate-500 dark:text-white/40">{t(s.label, getEn(s.label))}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── AI readiness orbit ────────────────────────────── */
function AIOrbit({ isInView }: { isInView: boolean }) {
  const { t } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(() => setActiveIdx(p => (p + 1) % aiReadiness.length), 2500);
    return () => clearInterval(id);
  }, [isInView]);

  return (
    <div className="space-y-4">
      {aiReadiness.map((item, i) => {
        const isActive = activeIdx === i;
        return (
          <motion.div
            key={item.label}
            className={`journey-ai-node rounded-xl px-4 py-3.5 flex items-center gap-4 transition-all duration-500 ${isActive ? "journey-ai-node-active" : ""}`}
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            onMouseEnter={() => setActiveIdx(i)}
          >
            {/* index marker */}
            <div className={`
              w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 transition-all duration-500
              ${isActive
                ? "bg-purple-500/20 text-purple-400 shadow-[0_0_12px_rgba(139,92,246,0.2)]"
                : "bg-slate-200/50 dark:bg-white/[0.04] text-slate-400 dark:text-white/30"
              }
            `}>
              0{i + 1}
            </div>
            <div className="min-w-0">
              <p className={`text-sm font-semibold transition-colors duration-300 ${isActive ? "text-purple-500 dark:text-purple-400" : "text-slate-700 dark:text-white/70"}`}>
                {t(item.label, getEn(item.label))}
              </p>
              <p className="text-[11px] text-slate-400 dark:text-white/30 mt-0.5">{t(item.sub, getEn(item.sub))}</p>
            </div>
            {/* active indicator */}
            {isActive && (
              <motion.div
                className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0"
                layoutId="ai-dot"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── Main Section ──────────────────────────────────── */
export default function CareerJourneySection() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="journey" className="relative py-16 px-6 md:px-16 max-w-7xl mx-auto overflow-hidden">
      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* ── Header ── */}
        <div className="mb-20">
          <p className="font-mono text-electric-blue/60 text-sm tracking-widest uppercase mb-3">
            05 / Journey
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-slate-800 dark:text-white">
            {t("职业旅途", "Career Journey")}
          </h2>
          <p className="mt-3 text-slate-400 dark:text-white/40 max-w-lg">
            {t("八年深耕，跨越研发、产品、商务三大领域，构建国际化全栈视野", "8 years spanning R&D, Product and Business — building an international full-stack perspective")}
          </p>
        </div>

        {/* ── Bento grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* Card 1 — Multi-role timeline (spans 7 cols) */}
          <motion.div
            className="journey-card rounded-2xl p-6 md:p-8 relative overflow-hidden lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-electric-blue/[0.03] rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-glow-pulse" />
                <span className="text-xs font-mono text-electric-blue/70 tracking-wider uppercase">Multi-Role</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-1">
                {t("全流程多岗位", "Multi-Role Pipeline")}
              </h3>
              <p className="text-sm text-slate-500 dark:text-white/40 mb-6">
                {t("深入理解产品从 0 到 1 的完整链路", "Deep understanding of the full 0-to-1 product pipeline")}
              </p>
              <RoleTimeline isInView={isInView} />
            </div>
          </motion.div>

          {/* Card 2 — AI readiness (spans 5 cols) */}
          <motion.div
            className="journey-card rounded-2xl p-6 md:p-8 relative overflow-hidden lg:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="absolute top-0 left-0 w-40 h-40 bg-purple-500/[0.04] rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-glow-pulse" />
                <span className="text-xs font-mono text-purple-400/70 tracking-wider uppercase">AI Native</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-1">
                {t("AI 时代就绪", "AI-Era Ready")}
              </h3>
              <p className="text-sm text-slate-500 dark:text-white/40 mb-6">
                {t("为应对新角色定位和挑战做好准备", "Prepared for new role definitions and challenges in the AI era")}
              </p>
              <AIOrbit isInView={isInView} />
            </div>
          </motion.div>

          {/* Card 3 — Global vision (full width) */}
          <motion.div
            className="journey-card rounded-2xl p-6 md:p-8 relative overflow-hidden lg:col-span-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="absolute bottom-0 right-0 w-56 h-56 bg-gem-green/[0.03] rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-gem-green animate-glow-pulse" />
                <span className="text-xs font-mono text-gem-green/70 tracking-wider uppercase">Global Vision</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-1">
                {t("国际化多元视野", "Global Perspective")}
              </h3>
              <p className="text-sm text-slate-500 dark:text-white/40 mb-5">
                {t("英文沟通良好，胜任工作讨论和技术文档读写", "Strong English skills for work discussions and technical documentation")}
              </p>
              <GlobalMap isInView={isInView} />
            </div>
          </motion.div>

        </div>

        {/* ── Bottom tagline ── */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <p className="text-sm font-mono text-slate-400 dark:text-white/25 tracking-widest">
            DEVELOPER &rarr; PRODUCT &rarr; BUSINESS &rarr; <span className="text-electric-blue">AI ERA</span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
