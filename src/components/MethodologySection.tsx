"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useTransform } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import { getEn } from "@/i18n/translations";

/* ────────────────────────────────────────────
   Data
   ──────────────────────────────────────────── */
interface Methodology {
  id: string;
  titleZh: string;
  titleEn: string;
  icon: string; // SVG path data or emoji
  accent: string; // tailwind color token
  accentRgb: string; // for rgba
  caseStudy: string;
  keywords: string[];
}

const methodologies: Methodology[] = [
  {
    id: "communicate",
    titleZh: "设计的前提是充分沟通和调研",
    titleEn: "Align People, Align Design",
    icon: "communicate",
    accent: "blue",
    accentRgb: "59,130,246",
    caseStudy:
      "面对长流程、跨部门的系统设计，要充分了解各个部门、各个角色的个人诉求和组织诉求。在阿里云分销系统构建中，只有系统给每个角色都提供了价值，系统才可以推广出去，才能真正用起来。当阻力较大时，局部培养志愿者和标杆团队，再口碑推广是一个很好的办法。",
    keywords: ["沟通", "调研", "共识", "推广"],
  },
  {
    id: "deconstruct",
    titleZh: "用简单的界面，解构复杂的业务",
    titleEn: "Simple Surface, Complex Core",
    icon: "deconstruct",
    accent: "emerald",
    accentRgb: "16,185,129",
    caseStudy:
      "B端页面要清晰易用，逻辑清晰，板块分明。但在流程上要承载住复杂的业务。在阿里云分销系统构建中，坚持要点提前、风险点强调、变化点可追溯的设计原则。珍惜重视用户的注意力和焦点，有的放矢。",
    keywords: ["简洁", "逻辑", "聚焦", "追溯"],
  },
  {
    id: "resilience",
    titleZh: "流程要有自驱性，也要有健壮性",
    titleEn: "Self-Driven & Resilient Flow",
    icon: "resilience",
    accent: "violet",
    accentRgb: "139,92,246",
    caseStudy:
      "自驱型就是流程要有关心他的人，推动流程审批。无论是主动的还是被动的，需要进行合理的编排。流程在驳回时，要尽量保留可以复用的信息。如果所有流程因为一个节点被驳回就要从头再来，损失的不但是组织的效率、客户的体验，也是用户的积极性。",
    keywords: ["自驱", "编排", "容错", "复用"],
  },
  {
    id: "mvp",
    titleZh: "需求会很多，但好钢要用在刀刃上",
    titleEn: "Focus on What Truly Matters",
    icon: "mvp",
    accent: "amber",
    accentRgb: "245,158,11",
    caseStudy:
      "要在资源有限、人力有限、时间有限的项目中，面对可能模糊的需求，探索MVP，以各方的最大公约数驱动项目演进。在宏观协调的同时，以点带面，挖掘业务和业务参与者层层掩盖下的最真实的需求。以数据和逻辑推动项目的整体完善。",
    keywords: ["MVP", "聚焦", "数据驱动", "最大公约数"],
  },
];

/* ────────────────────────────────────────────
   Decorative SVG Icons
   ──────────────────────────────────────────── */
function MethodologyIcon({ type, accent }: { type: string; accent: string }) {
  const colorMap: Record<string, string> = {
    blue: "#3B82F6",
    emerald: "#10B981",
    violet: "#8B5CF6",
    amber: "#F59E0B",
  };
  const color = colorMap[accent] || "#8B5CF6";

  if (type === "communicate") {
    return (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        {/* Connected nodes representing stakeholder alignment */}
        <circle cx="32" cy="12" r="5" stroke={color} strokeWidth="1.5" fill="none" opacity="0.8" />
        <circle cx="12" cy="42" r="5" stroke={color} strokeWidth="1.5" fill="none" opacity="0.8" />
        <circle cx="52" cy="42" r="5" stroke={color} strokeWidth="1.5" fill="none" opacity="0.8" />
        <circle cx="32" cy="52" r="5" stroke={color} strokeWidth="1.5" fill="none" opacity="0.8" />
        {/* Connection lines */}
        <line x1="32" y1="17" x2="12" y2="37" stroke={color} strokeWidth="1" opacity="0.4" />
        <line x1="32" y1="17" x2="52" y2="37" stroke={color} strokeWidth="1" opacity="0.4" />
        <line x1="12" y1="42" x2="52" y2="42" stroke={color} strokeWidth="1" opacity="0.4" />
        <line x1="12" y1="47" x2="32" y2="47" stroke={color} strokeWidth="1" opacity="0.4" />
        <line x1="52" y1="47" x2="32" y2="47" stroke={color} strokeWidth="1" opacity="0.4" />
        {/* Center pulse */}
        <circle cx="32" cy="32" r="8" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.1">
          <animate attributeName="r" values="7;10;7" dur="3s" repeatCount="indefinite" />
          <animate attributeName="fillOpacity" values="0.1;0.2;0.1" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="32" cy="32" r="3" fill={color} opacity="0.6" />
      </svg>
    );
  }

  if (type === "deconstruct") {
    return (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        {/* Layered rectangles - complex to simple */}
        <rect x="8" y="8" width="48" height="48" rx="4" stroke={color} strokeWidth="1" opacity="0.2" strokeDasharray="4 4" />
        <rect x="14" y="14" width="36" height="36" rx="3" stroke={color} strokeWidth="1" opacity="0.3" strokeDasharray="3 3" />
        <rect x="20" y="20" width="24" height="24" rx="2" stroke={color} strokeWidth="1.5" opacity="0.6" />
        {/* Core diamond */}
        <path d="M32 24 L40 32 L32 40 L24 32 Z" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.15">
          <animate attributeName="fillOpacity" values="0.1;0.25;0.1" dur="2.5s" repeatCount="indefinite" />
        </path>
        <circle cx="32" cy="32" r="2.5" fill={color} opacity="0.7" />
      </svg>
    );
  }

  if (type === "mvp") {
    return (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        {/* Diamond / prism — focus, precision */}
        <path
          d="M32 6 L54 24 L32 58 L10 24 Z"
          stroke={color}
          strokeWidth="1.5"
          fill={color}
          fillOpacity="0.08"
        >
          <animate attributeName="fillOpacity" values="0.06;0.15;0.06" dur="3s" repeatCount="indefinite" />
        </path>
        {/* Facet lines */}
        <line x1="32" y1="6" x2="32" y2="58" stroke={color} strokeWidth="0.8" opacity="0.25" />
        <line x1="10" y1="24" x2="54" y2="24" stroke={color} strokeWidth="0.8" opacity="0.25" />
        <line x1="10" y1="24" x2="32" y2="58" stroke={color} strokeWidth="0.8" opacity="0.15" />
        <line x1="54" y1="24" x2="32" y2="58" stroke={color} strokeWidth="0.8" opacity="0.15" />
        {/* Inner focus point */}
        <circle cx="32" cy="28" r="6" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.15">
          <animate attributeName="r" values="5;7;5" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="32" cy="28" r="2.5" fill={color} opacity="0.7" />
        {/* Radiating lines from focus — precision */}
        <line x1="32" y1="22" x2="32" y2="14" stroke={color} strokeWidth="0.6" opacity="0.3" />
        <line x1="38" y1="26" x2="44" y2="22" stroke={color} strokeWidth="0.6" opacity="0.3" />
        <line x1="26" y1="26" x2="20" y2="22" stroke={color} strokeWidth="0.6" opacity="0.3" />
      </svg>
    );
  }

  // resilience
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      {/* Circular flow arrows */}
      <path
        d="M32 8 A24 24 0 0 1 56 32"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
        strokeLinecap="round"
      />
      <path
        d="M56 32 A24 24 0 0 1 32 56"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
        strokeLinecap="round"
      />
      <path
        d="M32 56 A24 24 0 0 1 8 32"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
        strokeLinecap="round"
      />
      <path
        d="M8 32 A24 24 0 0 1 32 8"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
        strokeLinecap="round"
      />
      {/* Arrow heads */}
      <polygon points="54,28 58,32 54,36" fill={color} opacity="0.5" />
      <polygon points="36,54 32,58 28,54" fill={color} opacity="0.5" />
      <polygon points="10,36 6,32 10,28" fill={color} opacity="0.5" />
      <polygon points="28,10 32,6 36,10" fill={color} opacity="0.5" />
      {/* Shield center */}
      <path
        d="M32 20 L42 26 L42 38 L32 46 L22 38 L22 26 Z"
        stroke={color}
        strokeWidth="1.5"
        fill={color}
        fillOpacity="0.1"
      >
        <animate attributeName="fillOpacity" values="0.08;0.2;0.08" dur="3s" repeatCount="indefinite" />
      </path>
      <path d="M28 32 L31 35 L37 28" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
    </svg>
  );
}

/* ────────────────────────────────────────────
   Expanding Card with "Prism Reveal" animation
   ──────────────────────────────────────────── */
function MethodologyCard({
  item,
  index,
  isExpanded,
  onHoverStart,
  onHoverEnd,
}: {
  item: Methodology;
  index: number;
  isExpanded: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-3, 3]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    onHoverEnd();
  };

  const borderMap: Record<string, string> = {
    blue: "hover:border-blue-500/30 dark:hover:border-blue-400/25",
    emerald: "hover:border-emerald-500/30 dark:hover:border-emerald-400/25",
    violet: "hover:border-violet-500/30 dark:hover:border-violet-400/25",
    amber: "hover:border-amber-500/30 dark:hover:border-amber-400/25",
  };

  const numStr = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="relative"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={onHoverStart}
        onMouseLeave={handleMouseLeave}
        onClick={() => { if (isExpanded) onHoverEnd(); else onHoverStart(); }}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1200,
        }}
        className={`
          group relative methodology-card rounded-2xl overflow-hidden
          transition-all duration-500 cursor-none
          ${borderMap[item.accent]}
        `}
        data-magnetic
      >
        {/* Subtle left accent bar instead of full card border */}
        <div
          className="absolute top-2 bottom-2 left-0 w-[2px] rounded-full"
          style={{
            background: `linear-gradient(180deg, rgba(${item.accentRgb}, 0.5), rgba(${item.accentRgb}, 0.05))`,
          }}
        />

        <div className="relative z-10 p-6 md:p-8">
          {/* Header row */}
          <div className="flex items-start gap-5 mb-6">
            {/* Icon */}
            <div className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0 relative">
              <div
                className="absolute inset-0 rounded-xl opacity-20"
                style={{
                  background: `radial-gradient(circle, rgba(${item.accentRgb}, 0.3), transparent 70%)`,
                }}
              />
              <MethodologyIcon type={item.icon} accent={item.accent} />
            </div>

            <div className="flex-1 min-w-0">
              {/* Index number */}
              <span
                className="text-[10px] font-mono tracking-[0.3em] uppercase mb-2 block"
                style={{ color: `rgba(${item.accentRgb}, 0.6)` }}
              >
                Methodology {numStr}
              </span>

              {/* Chinese title — artistic typography */}
              <h3 className="text-lg md:text-xl font-extrabold tracking-wide leading-tight text-slate-900 dark:text-white mb-1.5">
                <span className="methodology-title-text">
                  {t(item.titleZh, getEn(item.titleZh))}
                </span>
              </h3>

              {/* English subtitle — italic serif feel */}
              <p
                className="text-xs md:text-sm font-light italic tracking-wider"
                style={{ color: `rgba(${item.accentRgb}, 0.7)` }}
              >
                — {item.titleEn}
              </p>
            </div>
          </div>

          {/* Keywords as floating pills */}
          <div className="flex flex-wrap gap-2 mb-5">
            {item.keywords.map((kw, ki) => (
              <motion.span
                key={kw}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.15 + ki * 0.08 + 0.3 }}
                className="methodology-keyword px-3 py-1 rounded-full text-[11px] font-medium tracking-wider"
                style={{
                  color: `rgba(${item.accentRgb}, 0.8)`,
                  background: `rgba(${item.accentRgb}, 0.06)`,
                  border: `1px solid rgba(${item.accentRgb}, 0.12)`,
                }}
              >
                {t(kw, getEn(kw))}
              </motion.span>
            ))}
          </div>

          {/* Hover hint */}
          <div
            className={`flex items-center gap-2 text-xs font-mono tracking-wider transition-all duration-300 ${isExpanded ? "opacity-0 h-0" : "opacity-100"}`}
            style={{ color: `rgba(${item.accentRgb}, 0.4)` }}
          >
            <span className="hidden md:inline">HOVER TO EXPLORE</span>
            <span className="md:hidden">TAP TO EXPLORE</span>
            <motion.svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <path
                d="M3 5.5L7 9.5L11 5.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </div>

          {/* Expandable case study — "Prism Reveal" */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
                  opacity: { duration: 0.4, delay: 0.1 },
                }}
                className="overflow-hidden"
              >
                <div className="pt-5 mt-5 relative">
                  {/* Separator line with glow */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{
                      background: `linear-gradient(90deg, transparent, rgba(${item.accentRgb}, 0.3), transparent)`,
                    }}
                  />

                  {/* Case study content with typing reveal effect */}
                  <div className="flex gap-4">
                    {/* Vertical accent bar */}
                    <div
                      className="w-[2px] flex-shrink-0 rounded-full"
                      style={{
                        background: `linear-gradient(180deg, rgba(${item.accentRgb}, 0.5), rgba(${item.accentRgb}, 0.05))`,
                      }}
                    />

                    <div className="flex-1">
                      <span
                        className="text-[10px] font-mono tracking-[0.25em] uppercase block mb-3"
                        style={{ color: `rgba(${item.accentRgb}, 0.5)` }}
                      >
                        Case Study — Alibaba Cloud
                      </span>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-300/80 font-light"
                      >
                        {t(item.caseStudy, getEn(item.caseStudy))}
                      </motion.p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom glow edge */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          style={{
            background: `linear-gradient(90deg, transparent, rgba(${item.accentRgb}, 0.4), transparent)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   Section title component with artistic typography
   ──────────────────────────────────────────── */
function SectionTitle() {
  const { t } = useLanguage();
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={titleRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="text-center mb-16 md:mb-20"
    >
      {/* Section number */}
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="text-[10px] font-mono tracking-[0.4em] text-slate-400 dark:text-white/25 uppercase block mb-4"
      >
        10 / Methodology
      </motion.span>

      {/* Main title — artistic mixed language */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative inline-block"
      >
        <span className="block text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
          {t("方法论", "Methodology")}
        </span>
        <span className="block text-lg md:text-xl lg:text-2xl font-extralight italic tracking-[0.15em] text-slate-400 dark:text-white/30 mt-1">
          Methodology
        </span>
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-5 text-sm md:text-base text-slate-500 dark:text-white/40 max-w-xl mx-auto font-light leading-relaxed"
      >
        {t("经验沉淀为方法，方法驱动下一场实践", "Experience crystallizes into methodology; methodology drives the next practice")}
      </motion.p>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mt-6 mx-auto h-px w-20 origin-center"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.4), rgba(16,185,129,0.4), transparent)",
        }}
      />
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   Blog link component
   ──────────────────────────────────────────── */
function BlogLink() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mt-16 md:mt-20 flex justify-center"
    >
      <motion.a
        href="https://www.zhihu.com/column/c_1746565789208096768"
        target="_blank"
        rel="noopener noreferrer"
        className="methodology-blog-link group relative flex items-center gap-4 px-6 py-4 md:px-8 md:py-5 rounded-2xl overflow-hidden"
        whileHover={{ y: -3, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        data-magnetic
      >
        {/* Background gradient glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "radial-gradient(ellipse at center, rgba(59,130,246,0.06), transparent 70%)",
          }}
        />

        {/* Zhihu icon */}
        <div className="relative flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-blue-500/10 dark:bg-blue-400/10 group-hover:bg-blue-500/15 dark:group-hover:bg-blue-400/15 transition-colors duration-300">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-500 dark:text-blue-400">
            <path d="M5.721 0C2.251 0 0 2.25 0 5.719V18.28C0 21.751 2.252 24 5.721 24h12.56C21.751 24 24 21.75 24 18.281V5.72C24 2.249 21.75 0 18.281 0zm1.964 4.078h5.36c.022.18.111.36.194.547l-.672.635h-4.882s.226 3.81.36 5.666h3.878l-.095-.76s.542-.12.677.24c.148.39.384 1.307.384 1.307l-.096.144h-4.56l.135 1.47s1.733 2.14 4.08 3.16c0 0-.92.665-1.637 1.504 0 0-2.444-1.76-3.413-4.184-.38 1.97-1.965 3.73-4.175 4.65 0 0-.48-.44-1.347-1.16 0 0 3.014-.993 3.493-3.47h-3.59l-.063-.61h3.748l-.15-1.47H5.41l-.063-.67h3.91c-.152-2.148-.362-5.03-.362-5.03h-1.2v.61s-.41.29-.744.29H5.67l-.075-.66h4.09z" />
          </svg>
        </div>

        <div className="relative">
          <span className="text-[10px] font-mono tracking-[0.25em] text-slate-400 dark:text-white/30 uppercase block mb-0.5">
            Blog on Zhihu
          </span>
          <span className="text-sm md:text-base font-semibold text-slate-700 dark:text-white/80 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {t("漫谈产品经理和软件工程", "On Product Management & Software Engineering")}
          </span>
        </div>

        {/* Arrow */}
        <motion.svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="ml-auto text-slate-400 dark:text-white/25 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300"
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.a>
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   Watermark SVG — philosophy, science & code
   ──────────────────────────────────────────── */
function WatermarkBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden>
      {/* Large rotated Greek text watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
        <span className="block text-[10rem] md:text-[16rem] font-black tracking-tighter leading-none text-slate-900/[0.02] dark:text-white/[0.02] -rotate-12 select-none font-serif italic">
          Φιλοσοφία
        </span>
      </div>

      {/* Philosopher names scattered */}
      <div className="absolute top-[8%] left-[5%] -rotate-6">
        <span className="text-[2.5rem] md:text-[3.5rem] font-serif italic text-slate-900/[0.025] dark:text-white/[0.02] select-none">
          Σωκράτης
        </span>
      </div>
      <div className="absolute top-[22%] right-[8%] rotate-3">
        <span className="text-[2rem] md:text-[2.8rem] font-serif italic text-slate-900/[0.02] dark:text-white/[0.018] select-none">
          Ἀριστοτέλης
        </span>
      </div>
      <div className="absolute bottom-[30%] left-[3%] rotate-[8deg]">
        <span className="text-[1.8rem] md:text-[2.5rem] font-serif italic text-slate-900/[0.02] dark:text-white/[0.015] select-none">
          Πλάτων
        </span>
      </div>

      {/* Code snippet watermarks */}
      <div className="absolute top-[15%] right-[3%] rotate-3 opacity-[0.03] dark:opacity-[0.025]">
        <pre className="text-[0.6rem] md:text-xs font-mono text-slate-900 dark:text-white leading-relaxed select-none">
{`function think(problem) {
  const parts = deconstruct(problem);
  return parts
    .map(analyze)
    .reduce(synthesize);
}`}
        </pre>
      </div>
      <div className="absolute bottom-[15%] right-[5%] -rotate-2 opacity-[0.025] dark:opacity-[0.02]">
        <pre className="text-[0.55rem] md:text-[0.7rem] font-mono text-slate-900 dark:text-white leading-relaxed select-none">
{`while (iterating) {
  observe(data);
  hypothesis = formulate();
  if (experiment(hypothesis))
    theory = refine(theory);
}`}
        </pre>
      </div>

      {/* SVG layer: astronomy, science & geometry */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 800 1000"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Star field - small dots like a night sky */}
        {Array.from({ length: 35 }).map((_, i) => {
          const cx = 30 + ((i * 137) % 740);
          const cy = 20 + ((i * 197) % 960);
          const r = (i % 3 === 0) ? 1.8 : 1;
          return (
            <circle
              key={`star-${i}`}
              cx={cx}
              cy={cy}
              r={r}
              className="fill-slate-400/[0.06] dark:fill-white/[0.03]"
            />
          );
        })}

        {/* Orbital rings — astronomical observation */}
        <ellipse
          cx="620" cy="180" rx="110" ry="45"
          className="stroke-blue-500/[0.04] dark:stroke-blue-400/[0.03]"
          strokeWidth="0.8"
          transform="rotate(-20 620 180)"
        />
        <ellipse
          cx="620" cy="180" rx="80" ry="32"
          className="stroke-blue-500/[0.03] dark:stroke-blue-400/[0.025]"
          strokeWidth="0.6"
          transform="rotate(15 620 180)"
        />
        <circle cx="620" cy="180" r="8"
          className="fill-blue-500/[0.04] dark:fill-blue-400/[0.03]"
        />
        {/* Planet on orbit */}
        <circle cx="710" cy="160" r="3.5"
          className="fill-blue-500/[0.06] dark:fill-blue-400/[0.04]"
        />

        {/* Atom / molecular model — scientific experiment */}
        <circle cx="150" cy="700" r="6"
          className="fill-violet-500/[0.04] dark:fill-violet-400/[0.03]"
        />
        <ellipse cx="150" cy="700" rx="55" ry="22"
          className="stroke-violet-500/[0.04] dark:stroke-violet-400/[0.03]"
          strokeWidth="0.7"
        />
        <ellipse cx="150" cy="700" rx="55" ry="22"
          className="stroke-violet-500/[0.04] dark:stroke-violet-400/[0.03]"
          strokeWidth="0.7"
          transform="rotate(60 150 700)"
        />
        <ellipse cx="150" cy="700" rx="55" ry="22"
          className="stroke-violet-500/[0.04] dark:stroke-violet-400/[0.03]"
          strokeWidth="0.7"
          transform="rotate(120 150 700)"
        />
        {/* Electrons */}
        <circle cx="205" cy="700" r="2.5"
          className="fill-violet-500/[0.06] dark:fill-violet-400/[0.04]"
        />
        <circle cx="125" cy="674" r="2.5"
          className="fill-violet-500/[0.06] dark:fill-violet-400/[0.04]"
        />

        {/* Golden ratio spiral — philosophy meets math */}
        <path
          d="M380 450
             Q380 410, 420 410
             Q470 410, 470 460
             Q470 520, 410 520
             Q340 520, 340 450
             Q340 370, 420 370
             Q510 370, 510 460
             Q510 560, 410 560
             Q300 560, 300 450"
          className="stroke-emerald-500/[0.04] dark:stroke-emerald-400/[0.03]"
          strokeWidth="0.8"
        />
        {/* Phi symbol at spiral center */}
        <text
          x="415" y="468"
          className="fill-emerald-500/[0.06] dark:fill-emerald-400/[0.04]"
          fontSize="18"
          fontFamily="serif"
          fontStyle="italic"
        >
          φ
        </text>

        {/* Telescope / observation lines */}
        <line x1="50" y1="100" x2="200" y2="250"
          className="stroke-slate-400/[0.03] dark:stroke-white/[0.015]"
          strokeWidth="0.5" strokeDasharray="6 12"
        />
        <line x1="200" y1="250" x2="350" y2="150"
          className="stroke-slate-400/[0.03] dark:stroke-white/[0.015]"
          strokeWidth="0.5" strokeDasharray="6 12"
        />

        {/* Constellation lines */}
        <line x1="500" y1="650" x2="580" y2="700"
          className="stroke-blue-500/[0.03] dark:stroke-blue-400/[0.02]"
          strokeWidth="0.6" strokeDasharray="4 8"
        />
        <line x1="580" y1="700" x2="650" y2="670"
          className="stroke-blue-500/[0.03] dark:stroke-blue-400/[0.02]"
          strokeWidth="0.6" strokeDasharray="4 8"
        />
        <line x1="650" y1="670" x2="700" y2="730"
          className="stroke-blue-500/[0.03] dark:stroke-blue-400/[0.02]"
          strokeWidth="0.6" strokeDasharray="4 8"
        />
        <line x1="580" y1="700" x2="560" y2="760"
          className="stroke-blue-500/[0.03] dark:stroke-blue-400/[0.02]"
          strokeWidth="0.6" strokeDasharray="4 8"
        />
        {/* Constellation stars */}
        <circle cx="500" cy="650" r="2.5" className="fill-blue-500/[0.05] dark:fill-blue-400/[0.035]" />
        <circle cx="580" cy="700" r="3" className="fill-blue-500/[0.06] dark:fill-blue-400/[0.04]" />
        <circle cx="650" cy="670" r="2" className="fill-blue-500/[0.05] dark:fill-blue-400/[0.035]" />
        <circle cx="700" cy="730" r="2.5" className="fill-blue-500/[0.05] dark:fill-blue-400/[0.035]" />
        <circle cx="560" cy="760" r="2" className="fill-blue-500/[0.05] dark:fill-blue-400/[0.035]" />

        {/* Flask / beaker outline — experiment */}
        <path
          d="M85 380 L85 430 L60 490 Q55 500, 65 505 L130 505 Q140 500, 135 490 L110 430 L110 380"
          className="stroke-emerald-500/[0.035] dark:stroke-emerald-400/[0.025]"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Flask liquid level */}
        <path
          d="M68 485 Q97 470, 127 485 L135 490 Q140 500, 130 505 L65 505 Q55 500, 60 490 Z"
          className="fill-emerald-500/[0.02] dark:fill-emerald-400/[0.015]"
        />
        {/* Bubbles */}
        <circle cx="90" cy="475" r="2" className="stroke-emerald-500/[0.04] dark:stroke-emerald-400/[0.03]" strokeWidth="0.5" />
        <circle cx="100" cy="465" r="1.5" className="stroke-emerald-500/[0.04] dark:stroke-emerald-400/[0.03]" strokeWidth="0.5" />
        <circle cx="95" cy="455" r="1" className="stroke-emerald-500/[0.04] dark:stroke-emerald-400/[0.03]" strokeWidth="0.5" />

        {/* Greek philosophical quotes fragments */}
        <text
          x="550" y="900"
          className="fill-slate-900/[0.025] dark:fill-white/[0.018]"
          fontSize="11"
          fontFamily="serif"
          fontStyle="italic"
        >
          γνῶθι σεαυτόν
        </text>
        <text
          x="80" y="880"
          className="fill-slate-900/[0.02] dark:fill-white/[0.015]"
          fontSize="9"
          fontFamily="serif"
          fontStyle="italic"
        >
          ἓν οἶδα ὅτι οὐδὲν οἶδα
        </text>
      </svg>
    </div>
  );
}

/* ────────────────────────────────────────────
   Main Section
   ──────────────────────────────────────────── */
export default function MethodologySection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section
      id="methodology"
      className="relative py-12 md:py-16 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto"
    >
      {/* Themed watermark background */}
      <WatermarkBg />

      <SectionTitle />

      {/* Cards stack */}
      <div className="relative space-y-5 md:space-y-6">
        {methodologies.map((m, i) => (
          <MethodologyCard
            key={m.id}
            item={m}
            index={i}
            isExpanded={expandedId === m.id}
            onHoverStart={() => setExpandedId(m.id)}
            onHoverEnd={() => setExpandedId(null)}
          />
        ))}
      </div>

      {/* Blog link */}
      <BlogLink />
    </section>
  );
}
