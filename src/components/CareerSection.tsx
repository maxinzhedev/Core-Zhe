"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";

interface CareerItem {
  company: string;
  department: string;
  role: string;
  period: string;
  logo: string;
  tags: string[];
  highlights: string[];
  metrics: { label: string; value: string }[];
}

const careers: CareerItem[] = [
  {
    company: "中国星网",
    department: "应用研究院",
    role: "平台产品经理",
    period: "2024.05 - 至今",
    logo: "/pic/中国星网.png",
    tags: ["从0到1", "AI提效", "星座运营", "全天候保障"],
    highlights: [
      "从0到1构建运营商智能运营服务平台，制定标准、流程、效能评估指标，应用AI提效赋能",
      "涵盖服务保障系统、客服系统、项目管理系统等多个子系统",
      "跨集团拉通业务流程，完成流程、标准、数字化实现、运营计划全天候设计",
      "保障大系统按时交付支撑星座运营计划",
    ],
    metrics: [
      { label: "服务事故", value: "0" },
      { label: "客户投诉", value: "0" },
    ],
  },
  {
    company: "阿里巴巴",
    department: "阿里云智能国际",
    role: "平台产品经理",
    period: "2022.05 - 2024.03",
    logo: "/pic/阿里云.JPEG",
    tags: ["国际化", "渠道分销", "全生命周期", "AI赋能B端"],
    highlights: [
      "构建阿里云国际渠道分销业务全生命周期流程体系",
      "覆盖分销商入驻、报价、签约、退出等全链路，及伙伴作业、出账、拓客等多角色商业流程",
      "对历史分销体系建立治理方针和准则",
      "通过AI赋能B端产品降本增效、风险识别，包括伙伴风险预估、合同风险点标注",
    ],
    metrics: [
      { label: "入驻效率", value: "+60%" },
      { label: "入驻成功率", value: "+30%" },
      { label: "业务年增", value: "20%" },
    ],
  },
  {
    company: "华为",
    department: "云与计算",
    role: "产品运营经理",
    period: "2020.01 - 2022.02",
    logo: "/pic/华为.png",
    tags: ["风控体系", "MTL/LTC", "数据治理", "总裁奖"],
    highlights: [
      "于华为企业业务孵化华为云转型期，建立华为云分销风控体系",
      "设计MTL、LTC三级流程，制定合作伙伴政策并推动数字化基础设施落地",
      "对历史数据建立数据治理与集成标准，纳入新管控体系",
      "通过百余项佣金财务异常案例总结，发现各维度漏洞，推动重构分销履约链路",
    ],
    metrics: [
      { label: "封堵风险资金", value: "2000万+" },
      { label: "荣誉", value: "总裁奖" },
    ],
  },
  {
    company: "华为",
    department: "云与计算",
    role: "研发工程师 / 产品经理",
    period: "2017.08 - 2020.01",
    logo: "/pic/华为.png",
    tags: ["IoT平台", "车联网", "低代码", "国际大客户"],
    highlights: [
      "于华为物联网平台迎接国际头部车厂市场契机，实现车联网、车辆模型等SaaS应用落地",
      "通过业务模型建设和迭代打磨用户需求与产品实现之间的鸿沟",
      "建立研发文档技能库满足跨团队复用需求",
      "建立「故障处理-需求挖掘-分析评估-排期落地-客户教育」的B端产品迭代方法论",
    ],
    metrics: [
      { label: "标杆客户", value: "标致/淡马锡" },
      { label: "创新", value: "低代码平台" },
    ],
  },
];

/* ============================================================
   Background Orbs — two color spheres that follow the mouse
   ============================================================ */
function AuroraBackground({
  mouseX,
  mouseY,
  orbContract,
}: {
  mouseX: ReturnType<typeof useSpring>;
  mouseY: ReturnType<typeof useSpring>;
  orbContract: ReturnType<typeof useMotionValue>;
}) {
  // orb 1 (blue) — top-right area, follows mouse gently
  const orb1X = useTransform(mouseX, (v) => v * 0.03 + 60);
  const orb1Y = useTransform(mouseY, (v) => v * 0.02 + 5);
  // orb 2 (green) — bottom-left area
  const orb2X = useTransform(mouseX, (v) => v * -0.02 + 10);
  const orb2Y = useTransform(mouseY, (v) => v * -0.03 + 70);

  // contract toward center on tag hover
  const orb1ContractX = useTransform(orbContract, [0, 1], [0, -15]);
  const orb1ContractY = useTransform(orbContract, [0, 1], [0, 20]);
  const orb2ContractX = useTransform(orbContract, [0, 1], [0, 20]);
  const orb2ContractY = useTransform(orbContract, [0, 1], [0, -20]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Base color fill */}
      <div className="absolute inset-0 bg-[#020617] dark:block hidden" />

      {/* Orb 1 — Blue */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full hidden dark:block"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0.04) 40%, transparent 70%)",
          filter: "blur(80px)",
          right: orb1X as unknown as string,
          top: orb1Y as unknown as string,
          x: orb1ContractX,
          y: orb1ContractY,
        }}
      />

      {/* Orb 2 — Green */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full hidden dark:block"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.10) 0%, rgba(16,185,129,0.03) 40%, transparent 70%)",
          filter: "blur(80px)",
          left: orb2X as unknown as string,
          bottom: orb2Y as unknown as string,
          x: orb2ContractX,
          y: orb2ContractY,
        }}
      />

      {/* Noise overlay for film grain (3%) */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:block hidden"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

/* ============================================================
   Scroll Narrative — contextual background visuals per card
   ============================================================ */

/* Medal silhouette for 华为 "总裁奖" */
function MedalNarrative() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute w-[420px] h-[420px] md:w-[520px] md:h-[520px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Medal SVG */}
      <motion.svg
        viewBox="0 0 200 280"
        className="w-48 h-64 md:w-64 md:h-80"
        style={{ filter: "blur(1.5px)" }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 0.07 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        {/* Ribbon */}
        <motion.path
          d="M60 0 L80 70 L100 55 L120 70 L140 0 Z"
          fill="none"
          stroke="rgba(245,158,11,0.6)"
          strokeWidth="1.5"
          animate={{ pathLength: [0, 1] }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <path
          d="M60 0 L80 70 L100 55 L120 70 L140 0 Z"
          fill="rgba(245,158,11,0.15)"
        />

        {/* Medal circle */}
        <motion.circle
          cx="100"
          cy="160"
          r="65"
          fill="none"
          stroke="rgba(245,158,11,0.5)"
          strokeWidth="2"
          animate={{ pathLength: [0, 1] }}
          transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
        />
        <circle
          cx="100"
          cy="160"
          r="65"
          fill="rgba(245,158,11,0.04)"
        />

        {/* Inner circle */}
        <motion.circle
          cx="100"
          cy="160"
          r="50"
          fill="none"
          stroke="rgba(245,158,11,0.3)"
          strokeWidth="1"
          animate={{ pathLength: [0, 1] }}
          transition={{ duration: 1.8, delay: 0.6, ease: "easeOut" }}
        />

        {/* Star */}
        <motion.path
          d="M100 120 L108 145 L135 145 L113 160 L121 185 L100 170 L79 185 L87 160 L65 145 L92 145 Z"
          fill="rgba(245,158,11,0.2)"
          stroke="rgba(245,158,11,0.4)"
          strokeWidth="1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "backOut" }}
          style={{ transformOrigin: "100px 155px" }}
        />

        {/* Text placeholder lines */}
        <motion.line
          x1="75" y1="205" x2="125" y2="205"
          stroke="rgba(245,158,11,0.25)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        />
        <motion.line
          x1="82" y1="215" x2="118" y2="215"
          stroke="rgba(245,158,11,0.15)"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 1.7 }}
        />
      </motion.svg>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-amber-400/20"
          style={{
            left: `${30 + Math.random() * 40}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}

/* Global network lines for 阿里云 "国际化" */
function GlobalNetworkNarrative() {
  // City node positions (simulating a world map layout)
  const nodes = [
    { x: 20, y: 40, label: "SG" },
    { x: 35, y: 25, label: "KR" },
    { x: 80, y: 35, label: "US" },
    { x: 65, y: 55, label: "EU" },
    { x: 45, y: 65, label: "IN" },
    { x: 30, y: 48, label: "MY" },
    { x: 55, y: 30, label: "JP" },
    { x: 75, y: 60, label: "BR" },
    { x: 15, y: 30, label: "HK" },
  ];

  // Connections between nodes
  const links = [
    [0, 1], [0, 5], [1, 6], [2, 6], [2, 3],
    [3, 7], [4, 5], [4, 3], [5, 8], [8, 1],
    [6, 3], [0, 4], [2, 7],
  ];

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Network connections — flowing dashed lines */}
        {links.map(([from, to], i) => (
          <motion.line
            key={`link-${i}`}
            x1={nodes[from].x}
            y1={nodes[from].y}
            x2={nodes[to].x}
            y2={nodes[to].y}
            stroke="rgba(59,130,246,0.08)"
            strokeWidth="0.3"
            strokeDasharray="2 3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 1.5, delay: i * 0.12, ease: "easeOut" },
              opacity: { duration: 0.4, delay: i * 0.12 },
            }}
          />
        ))}

        {/* Flowing data pulses along connections */}
        {links.map(([from, to], i) => (
          <motion.circle
            key={`pulse-${i}`}
            r="0.6"
            fill="rgba(59,130,246,0.2)"
            initial={{ opacity: 0 }}
            animate={{
              cx: [nodes[from].x, nodes[to].x],
              cy: [nodes[from].y, nodes[to].y],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 2.5 + Math.random(),
              delay: 1.5 + i * 0.3,
              repeat: Infinity,
              repeatDelay: 2 + Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* City nodes */}
        {nodes.map((node, i) => (
          <g key={`node-${i}`}>
            {/* Outer ring */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="2.5"
              fill="none"
              stroke="rgba(59,130,246,0.1)"
              strokeWidth="0.3"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            />
            {/* Core dot */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="0.8"
              fill="rgba(59,130,246,0.15)"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{
                scale: {
                  duration: 3,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            />
            {/* Label */}
            <motion.text
              x={node.x}
              y={node.y - 4}
              textAnchor="middle"
              fill="rgba(59,130,246,0.12)"
              fontSize="2.2"
              fontFamily="monospace"
              fontWeight="600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
            >
              {node.label}
            </motion.text>
          </g>
        ))}
      </svg>

      {/* Subtle radial glow at center */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 60%)",
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

/* Scroll narrative controller — renders the right narrative based on visible card */
function ScrollNarrative({ visibleIndex }: { visibleIndex: number | null }) {
  return (
    <div className="absolute inset-0 pointer-events-none -z-[5] overflow-hidden">
      <AnimatePresence mode="wait">
        {visibleIndex === 2 && <MedalNarrative key="medal" />}
        {visibleIndex === 1 && <GlobalNetworkNarrative key="network" />}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   Metric Badge — glowing number for key results
   ============================================================ */
function MetricBadge({ label, value }: { label: string; value: string }) {
  const isHighlight =
    value === "0" ||
    value.includes("+") ||
    value.includes("万") ||
    value === "总裁奖";
  return (
    <motion.span
      className={`
        career-metric inline-flex items-center gap-2 font-mono px-3 py-1.5 rounded-xl border relative overflow-hidden
        ${
          isHighlight
            ? "bg-gem-green/[0.06] border-gem-green/20"
            : "bg-electric-blue/[0.06] border-electric-blue/20"
        }
      `}
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <span className={`text-[11px] ${isHighlight ? "text-gem-green/50" : "text-electric-blue/50"}`}>
        {label}
      </span>
      <span
        className={`
          career-metric-value text-sm font-black tracking-tight
          ${isHighlight ? "text-gem-green" : "text-electric-blue"}
        `}
      >
        {value}
      </span>
    </motion.span>
  );
}

/* ============================================================
   Tag Pill — with glow on hover + orbContract trigger
   ============================================================ */
function TagPill({
  text,
  onHoverStart,
  onHoverEnd,
}: {
  text: string;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  return (
    <motion.span
      className="career-tag text-[11px] px-2.5 py-1 rounded-md font-medium
        bg-slate-100 dark:bg-white/[0.04] text-slate-500 dark:text-white/40
        border border-slate-200/60 dark:border-white/[0.08]
        transition-all duration-300 select-none"
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      whileHover={{
        scale: 1.08,
      }}
    >
      {text}
    </motion.span>
  );
}

/* ============================================================
   Glass Card — frosted glassmorphism with noise
   ============================================================ */
function CareerCard({
  item,
  index,
  isInView,
  onHover,
  onLeave,
  onTagHoverStart,
  onTagHoverEnd,
}: {
  item: CareerItem;
  index: number;
  isInView: boolean;
  onHover: () => void;
  onLeave: () => void;
  onTagHoverStart: () => void;
  onTagHoverEnd: () => void;
}) {
  return (
    <motion.div
      className="relative pl-8 md:pl-12"
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.18,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Timeline node */}
      <motion.div
        className="absolute left-0 top-3 w-4 h-4 md:w-5 md:h-5 rounded-full border-[3px] border-electric-blue bg-white dark:bg-deep-black z-10"
        whileHover={{ scale: 1.4 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      />

      {/* Glass Card */}
      <div className="career-glass-card group rounded-2xl p-6 md:p-8 relative overflow-hidden">
        {/* Card noise grain */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-2xl"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Watermark logo — top-right corner at 5% opacity */}
        <div className="absolute -top-10 -right-10 w-96 h-96 md:w-[480px] md:h-[480px] pointer-events-none opacity-[0.05]"
          style={{ filter: "grayscale(1) brightness(1.2)" }}
        >
          <Image
            src={item.logo}
            alt=""
            fill
            className="object-contain"
            aria-hidden
          />
        </div>

        {/* Header row */}
        <div className="relative flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white/80 dark:bg-white/10 border border-slate-100 dark:border-white/5 flex items-center justify-center overflow-hidden p-1.5 backdrop-blur-sm">
            <Image
              src={item.logo}
              alt={item.company}
              width={48}
              height={48}
              className="object-contain"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-electric-blue/10 text-electric-blue border border-electric-blue/20">
                {item.role}
              </span>
              <span className="text-xs font-mono text-slate-400 dark:text-white/30">
                {item.period}
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white tracking-tight">
              {item.company}
              <span className="text-slate-300 dark:text-white/20 mx-1.5 font-normal">
                /
              </span>
              <span className="text-base text-slate-500 dark:text-white/50 font-medium">
                {item.department}
              </span>
            </h3>
          </div>
        </div>

        {/* Tags */}
        <div className="relative flex flex-wrap gap-1.5 mt-4">
          {item.tags.map((tag) => (
            <TagPill
              key={tag}
              text={tag}
              onHoverStart={onTagHoverStart}
              onHoverEnd={onTagHoverEnd}
            />
          ))}
        </div>

        {/* Highlights */}
        <ul className="relative mt-5 space-y-2.5">
          {item.highlights.map((h, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-white/60 leading-relaxed"
            >
              <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-electric-blue/40" />
              {h}
            </li>
          ))}
        </ul>

        {/* Metrics */}
        <div className="relative mt-5 pt-4 border-t border-slate-200/40 dark:border-white/[0.06]">
          <p className="text-[11px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-widest mb-3">
            Key Results
          </p>
          <div className="flex flex-wrap gap-2">
            {item.metrics.map((m) => (
              <MetricBadge key={m.label} label={m.label} value={m.value} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   Main Section
   ============================================================ */

/* Hook: track which card index is in the center of the viewport */
function useVisibleCardIndex(refs: React.RefObject<HTMLDivElement | null>[]) {
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibilityMap = new Map<number, boolean>();

    refs.forEach((ref, index) => {
      if (!ref.current) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          visibilityMap.set(index, entry.isIntersecting);
          // Find the first visible card from top
          let found: number | null = null;
          for (let i = 0; i < refs.length; i++) {
            if (visibilityMap.get(i)) {
              found = i;
              break;
            }
          }
          setVisibleIndex(found);
        },
        { rootMargin: "-35% 0px -35% 0px", threshold: 0 }
      );
      observer.observe(ref.current);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [refs]);

  return visibleIndex;
}

export default function CareerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Per-card refs for scroll narrative (fixed count, no loop)
  const cardRef0 = useRef<HTMLDivElement>(null);
  const cardRef1 = useRef<HTMLDivElement>(null);
  const cardRef2 = useRef<HTMLDivElement>(null);
  const cardRef3 = useRef<HTMLDivElement>(null);
  const cardRefs = [cardRef0, cardRef1, cardRef2, cardRef3];
  const visibleIndex = useVisibleCardIndex(cardRefs);

  // Mouse tracking for aurora orbs
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const mouseX = useSpring(rawMouseX, { stiffness: 50, damping: 30 });
  const mouseY = useSpring(rawMouseY, { stiffness: 50, damping: 30 });

  // Orb contract on tag hover
  const orbContract = useMotionValue(0);
  const smoothContract = useSpring(orbContract, {
    stiffness: 120,
    damping: 20,
  });

  // Hovered card index for watermark logo in cards
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      rawMouseX.set(e.clientX - rect.left);
      rawMouseY.set(e.clientY - rect.top);
    },
    [rawMouseX, rawMouseY]
  );

  useEffect(() => {
    return () => orbContract.set(0);
  }, [orbContract]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 md:px-16 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Aurora background */}
      <AuroraBackground
        mouseX={mouseX}
        mouseY={mouseY}
        orbContract={smoothContract}
      />

      {/* Scroll-driven narrative background */}
      <ScrollNarrative visibleIndex={visibleIndex} />

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Section header */}
        <div className="mb-16">
          <p className="font-mono text-electric-blue/60 text-sm tracking-widest uppercase mb-3">
            03 / Career
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-slate-800 dark:text-white">
            工作经历
          </h2>
          <p className="mt-3 text-slate-400 dark:text-white/40 max-w-lg">
            从研发到产品，从IoT到云到星网，持续构建数字化平台能力
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <motion.div
            className="absolute left-[7px] md:left-[9px] top-0 bottom-0 w-px bg-gradient-to-b from-electric-blue/50 via-electric-blue/20 to-transparent"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
          />

          {/* Career cards */}
          <div className="space-y-8">
            {careers.map((item, index) => (
              <div key={`${item.company}-${item.period}`} ref={cardRefs[index]}>
                <CareerCard
                  item={item}
                  index={index}
                  isInView={isInView}
                  onHover={() => setActiveCardIndex(index)}
                  onLeave={() => setActiveCardIndex(null)}
                  onTagHoverStart={() => orbContract.set(1)}
                  onTagHoverEnd={() => orbContract.set(0)}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
