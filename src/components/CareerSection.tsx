"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useSiteConfig } from "./SiteConfigContext";
import { useLanguage } from "./LanguageContext";
import { getEn } from "@/i18n/translations";

/* ============================================================
   Data
   ============================================================ */
interface CareerItem {
  company: string;
  department: string;
  role: string;
  period: string;
  logo: string;
  tags: string[];
  highlights: string[];
  metrics: { label: string; value: string }[];
  archKey: "starnet" | "alicloud" | "huawei-risk" | "huawei-iot";
}

/** Keywords that should be highlighted with brand color in highlight text */
const HIGHLIGHT_KEYWORDS = [
  "从0到1",
  "2000万",
  "总裁奖",
  "AI",
  "MTL",
  "LTC",
  "IoT",
  "SaaS",
  "低代码",
  "+60%",
  "+30%",
  "20%",
  "标致",
  "淡马锡",
  "全天候",
  "风控",
];

const careers: CareerItem[] = [
  {
    company: "中国星网",
    department: "应用研究院",
    role: "平台产品经理",
    period: "2024.05 - 至今",
    logo: "/pic/中国星网.png",
    archKey: "starnet",
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
    archKey: "alicloud",
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
    archKey: "huawei-risk",
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
    archKey: "huawei-iot",
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
   Highlight keywords in text with brand color
   ============================================================ */
function HighlightedText({ text }: { text: string }) {
  const regex = new RegExp(`(${HIGHLIGHT_KEYWORDS.map(k => k.replace(/[+%]/g, "\\$&")).join("|")})`, "g");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        HIGHLIGHT_KEYWORDS.includes(part) ? (
          <span key={i} className="text-electric-blue dark:text-electric-blue font-semibold">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/* ============================================================
   SVG Architecture Watermarks — transparent line art
   ============================================================ */

function ArchStarnet() {
  const { t } = useLanguage();
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <ellipse cx="200" cy="120" rx="160" ry="50" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.45" strokeDasharray="4 6" />
      <ellipse cx="200" cy="120" rx="120" ry="38" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.35" strokeDasharray="3 5" />
      <ellipse cx="200" cy="120" rx="80" ry="26" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
      {[0, 72, 144, 216, 288].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x = 200 + 160 * Math.cos(rad);
        const y = 120 + 50 * Math.sin(rad);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="4" fill="currentColor" opacity="0.35" />
            <circle cx={x} cy={y} r="7" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
          </g>
        );
      })}
      <rect x="175" y="200" width="50" height="30" rx="4" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
      <text x="200" y="219" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="currentColor" opacity="0.4">OPS</text>
      <line x1="188" y1="200" x2="150" y2="140" stroke="currentColor" strokeWidth="0.5" opacity="0.25" strokeDasharray="2 3" />
      <line x1="212" y1="200" x2="250" y2="140" stroke="currentColor" strokeWidth="0.5" opacity="0.25" strokeDasharray="2 3" />
      {["服务保障", "客服", "项目管理", "AI引擎"].map((label, i) => {
        const x = 60 + i * 80;
        return (
          <g key={label}>
            <rect x={x} y="255" width="60" height="22" rx="3" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
            <text x={x + 30} y="269" textAnchor="middle" fontSize="6.5" fontFamily="monospace" fill="currentColor" opacity="0.35">{t(label, getEn(label))}</text>
            <line x1={x + 30} y1="255" x2="200" y2="230" stroke="currentColor" strokeWidth="0.4" opacity="0.18" strokeDasharray="2 3" />
          </g>
        );
      })}
    </svg>
  );
}

function ArchAlicloud() {
  const { t } = useLanguage();
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      {[
        { x: 60, y: 60, label: "SG" }, { x: 160, y: 40, label: "JP" },
        { x: 280, y: 50, label: "US" }, { x: 340, y: 100, label: "EU" },
        { x: 100, y: 110, label: "MY" }, { x: 220, y: 90, label: "KR" },
      ].map((node, i) => (
        <g key={i}>
          <circle cx={node.x} cy={node.y} r="12" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
          <circle cx={node.x} cy={node.y} r="3" fill="currentColor" opacity="0.35" />
          <text x={node.x} y={node.y - 16} textAnchor="middle" fontSize="7" fontFamily="monospace" fill="currentColor" opacity="0.3">{node.label}</text>
        </g>
      ))}
      {[[60,60,160,40],[160,40,280,50],[280,50,340,100],[100,110,220,90],[60,60,100,110],[220,90,280,50]].map(([x1,y1,x2,y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.5" opacity="0.18" strokeDasharray="3 4" />
      ))}
      <text x="200" y="155" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.4" fontWeight="600">CHANNEL LIFECYCLE</text>
      {["入驻", "报价", "签约", "作业", "出账", "退出"].map((step, i) => {
        const x = 40 + i * 58;
        return (
          <g key={step}>
            <rect x={x} y="170" width="48" height="24" rx="4" fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.35" />
            <text x={x + 24} y="185" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="currentColor" opacity="0.4">{t(step, getEn(step))}</text>
            {i < 5 && <line x1={x + 48} y1={182} x2={x + 58} y2={182} stroke="currentColor" strokeWidth="0.6" opacity="0.25" markerEnd="url(#arrow)" />}
          </g>
        );
      })}
      <rect x="130" y="220" width="140" height="28" rx="5" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.3" strokeDasharray="4 3" />
      <text x="200" y="238" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="currentColor" opacity="0.3">{t("AI Risk Engine / 合同标注", "AI Risk Engine / Contract Annotation")}</text>
      <defs>
        <marker id="arrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="4" markerHeight="4" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" opacity="0.3" />
        </marker>
      </defs>
    </svg>
  );
}

function ArchHuaweiRisk() {
  const { t } = useLanguage();
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <path d="M200 30 L300 70 L300 160 Q300 230 200 270 Q100 230 100 160 L100 70 Z" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25" />
      <path d="M200 50 L280 80 L280 155 Q280 215 200 250 Q120 215 120 155 L120 80 Z" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.18" />
      <text x="200" y="90" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.4" fontWeight="600">MTL → LTC</text>
      {["L1 策略层", "L2 管控层", "L3 执行层"].map((label, i) => (
        <g key={label}>
          <rect x="150" y={110 + i * 38} width="100" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
          <text x="200" y={127 + i * 38} textAnchor="middle" fontSize="7" fontFamily="monospace" fill="currentColor" opacity="0.35">{t(label, getEn(label))}</text>
        </g>
      ))}
      <line x1="200" y1="136" x2="200" y2="148" stroke="currentColor" strokeWidth="0.5" opacity="0.22" />
      <line x1="200" y1="174" x2="200" y2="186" stroke="currentColor" strokeWidth="0.5" opacity="0.22" />
      {["佣金审计", "财务异常", "合规校验"].map((label, i) => (
        <g key={label}>
          <rect x="300" y={105 + i * 40} width="70" height="22" rx="3" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.22" strokeDasharray="3 3" />
          <text x="335" y={119 + i * 40} textAnchor="middle" fontSize="6" fontFamily="monospace" fill="currentColor" opacity="0.25">{t(label, getEn(label))}</text>
          <line x1="300" y1={116 + i * 40} x2="250" y2={123 + i * 38} stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
        </g>
      ))}
      <polygon points="200,230 205,242 218,242 208,250 212,262 200,254 188,262 192,250 182,242 195,242" fill="currentColor" opacity="0.18" />
    </svg>
  );
}

function ArchHuaweiIoT() {
  const { t } = useLanguage();
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <ellipse cx="200" cy="55" rx="100" ry="30" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      <text x="200" y="59" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.35">IoT Cloud Platform</text>
      <rect x="130" y="100" width="140" height="28" rx="5" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
      <text x="200" y="118" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="currentColor" opacity="0.3">Gateway / Protocol Adapter</text>
      <line x1="200" y1="85" x2="200" y2="100" stroke="currentColor" strokeWidth="0.5" opacity="0.22" strokeDasharray="2 2" />
      {[
        { x: 60, y: 170, label: "Peugeot" },
        { x: 160, y: 170, label: "Temasek" },
        { x: 260, y: 170, label: "OEM-C" },
        { x: 340, y: 170, label: "OEM-D" },
      ].map((dev, i) => (
        <g key={i}>
          <rect x={dev.x - 18} y={dev.y} width="36" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
          <circle cx={dev.x - 10} cy={dev.y + 18} r="3.5" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
          <circle cx={dev.x + 10} cy={dev.y + 18} r="3.5" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
          <text x={dev.x} y={dev.y + 32} textAnchor="middle" fontSize="6" fontFamily="monospace" fill="currentColor" opacity="0.3">{dev.label}</text>
          <line x1={dev.x} y1={dev.y} x2="200" y2="128" stroke="currentColor" strokeWidth="0.4" opacity="0.18" strokeDasharray="2 3" />
        </g>
      ))}
      {["车辆模型", "低代码引擎", "数据分析"].map((label, i) => {
        const x = 80 + i * 100;
        return (
          <g key={label}>
            <rect x={x} y="230" width="80" height="24" rx="4" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.28" />
            <text x={x + 40} y="245" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="currentColor" opacity="0.3">{t(label, getEn(label))}</text>
            <line x1={x + 40} y1="230" x2="200" y2="128" stroke="currentColor" strokeWidth="0.35" opacity="0.12" strokeDasharray="3 4" />
          </g>
        );
      })}
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={140 + i * 30} cy="95" r="1.5" fill="currentColor" opacity="0.22" />
      ))}
    </svg>
  );
}

const archComponents: Record<CareerItem["archKey"], React.FC> = {
  starnet: ArchStarnet,
  alicloud: ArchAlicloud,
  "huawei-risk": ArchHuaweiRisk,
  "huawei-iot": ArchHuaweiIoT,
};

/* ============================================================
   Background Orbs
   ============================================================ */
function AuroraBackground({
  mouseX,
  mouseY,
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const orb1X = useTransform(mouseX, (v) => v * 0.03 + 60);
  const orb1Y = useTransform(mouseY, (v) => v * 0.02 + 5);
  const orb2X = useTransform(mouseX, (v) => v * -0.02 + 10);
  const orb2Y = useTransform(mouseY, (v) => v * -0.03 + 70);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute inset-0 bg-[#020617] dark:block hidden" />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full hidden dark:block"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0.04) 40%, transparent 70%)",
          filter: "blur(80px)",
          right: orb1X as unknown as string,
          top: orb1Y as unknown as string,
        }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full hidden dark:block"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.10) 0%, rgba(16,185,129,0.03) 40%, transparent 70%)",
          filter: "blur(80px)",
          left: orb2X as unknown as string,
          bottom: orb2Y as unknown as string,
        }}
      />
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
   Center Axis Line — vertical dashed gradient with nodes
   ============================================================ */
function CenterAxisLine({
  activeIndex,
  totalCards,
}: {
  activeIndex: number | null;
  totalCards: number;
}) {
  return (
    <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 pointer-events-none hidden lg:block z-0">
      {/* The dashed gradient line */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{
          background:
            "repeating-linear-gradient(to bottom, transparent 0px, rgba(59,130,246,0.15) 4px, rgba(59,130,246,0.15) 8px, transparent 8px, transparent 16px)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 10%, rgba(0,0,0,0.6) 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 10%, rgba(0,0,0,0.6) 90%, transparent 100%)",
        }}
      />

      {/* Nodes for each card — positioned at equal intervals */}
      {Array.from({ length: totalCards }).map((_, i) => {
        const isActive = activeIndex === i;
        const topPercent = ((i + 0.5) / totalCards) * 100;
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 -translate-x-1/2"
            style={{ top: `${topPercent}%` }}
          >
            {/* Glow ring */}
            <motion.div
              className="absolute -inset-3 rounded-full"
              animate={{
                boxShadow: isActive
                  ? "0 0 20px rgba(59,130,246,0.35), 0 0 6px rgba(59,130,246,0.25)"
                  : "0 0 0px transparent",
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            {/* Outer ring */}
            <motion.div
              className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
              animate={{
                borderColor: isActive
                  ? "rgba(59,130,246,0.8)"
                  : "rgba(59,130,246,0.2)",
                scale: isActive ? 1.2 : 1,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ background: "rgba(2,6,23,0.8)" }}
            >
              {/* Inner dot */}
              <motion.div
                className="w-2 h-2 rounded-full"
                animate={{
                  backgroundColor: isActive
                    ? "rgba(59,130,246,0.9)"
                    : "rgba(59,130,246,0.15)",
                  boxShadow: isActive
                    ? "0 0 8px rgba(59,130,246,0.6)"
                    : "none",
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ============================================================
   Metric Badge
   ============================================================ */
function MetricBadge({ label, value }: { label: string; value: string }) {
  const { t } = useLanguage();
  const isHighlight =
    value === "0" ||
    value.includes("+") ||
    value.includes("万") ||
    value === "总裁奖";
  return (
    <motion.span
      className={`
        career-metric inline-flex items-center gap-2 font-mono px-3 py-1.5 rounded-xl border relative overflow-hidden
        ${isHighlight
          ? "bg-gem-green/[0.06] border-gem-green/20"
          : "bg-electric-blue/[0.06] border-electric-blue/20"
        }
      `}
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <span className={`text-[11px] ${isHighlight ? "text-gem-green/50" : "text-electric-blue/50"}`}>
        {t(label, getEn(label))}
      </span>
      <span
        className={`career-metric-value text-sm font-black tracking-tight ${isHighlight ? "text-gem-green" : "text-electric-blue"}`}
      >
        {t(value, getEn(value))}
      </span>
    </motion.span>
  );
}

/* ============================================================
   Tag Pill
   ============================================================ */
function TagPill({ text }: { text: string }) {
  const { t } = useLanguage();
  return (
    <span
      className="career-tag text-[11px] px-2.5 py-1 rounded-md font-medium
        bg-slate-100 dark:bg-white/[0.04] text-slate-500 dark:text-white/40
        border border-slate-200/60 dark:border-white/[0.08]
        transition-all duration-300 select-none hover:scale-[1.08]"
    >
      {t(text, getEn(text))}
    </span>
  );
}

/* ============================================================
   Zig-Zag Career Card
   Layout: odd index (0,2) = text LEFT, image RIGHT
           even index (1,3) = image LEFT, text RIGHT
   (first item 星网: text left, arch right)
   ============================================================ */
function ZigZagCard({
  item,
  index,
  onInView,
}: {
  item: CareerItem;
  index: number;
  onInView: (index: number, visible: boolean) => void;
}) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isActiveView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    onInView(index, isActiveView);
  }, [isActiveView, index, onInView]);

  // index 0,2 → text LEFT, arch RIGHT (text slides from left, arch from right)
  // index 1,3 → arch LEFT, text RIGHT (arch slides from left, text from right)
  const textOnLeft = index % 2 === 0;

  const ArchSvg = archComponents[item.archKey];

  const ease = [0.25, 0.46, 0.45, 0.94] as const;

  const leftVariants = {
    hidden: { opacity: 0, x: -120 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease } },
  };
  const rightVariants = {
    hidden: { opacity: 0, x: 120 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.1, ease } },
  };

  /* --- Architecture / SVG side (transparent, offset toward center) --- */
  const archSide = (
    <motion.div
      className={`relative w-full lg:w-1/2 hidden lg:flex min-h-[360px] items-center justify-center pointer-events-none ${
        textOnLeft ? "-ml-8" : "-mr-8"
      }`}
      style={{ zIndex: 0 }}
      variants={textOnLeft ? rightVariants : leftVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* SVG Architecture Lines — transparent background, higher contrast */}
      <div className="relative w-full h-full text-slate-500/80 dark:text-white/70 p-2">
        <ArchSvg />
      </div>
    </motion.div>
  );

  /* --- Text side --- */
  const textSide = (
    <motion.div
      className="w-full lg:w-1/2 flex flex-col justify-center relative"
      style={{ zIndex: 1 }}
      variants={textOnLeft ? leftVariants : rightVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="career-glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden">
        {/* Watermark company logo behind text content */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-[0.064] pointer-events-none"
          style={{ filter: "grayscale(1) brightness(1.2)" }}
        >
          <div className="relative w-40 h-40 md:w-56 md:h-56">
            <Image src={item.logo} alt="" fill className="object-contain" aria-hidden />
          </div>
        </div>
        {/* Noise grain */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-2xl"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g2)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Header */}
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
                {t(item.role, getEn(item.role))}
              </span>
              <span className="text-xs font-mono text-slate-400 dark:text-white/30">
                {item.period.replace("至今", t("至今", "Present"))}
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight">
              {t(item.company, getEn(item.company))}
              <span className="text-slate-300 dark:text-white/20 mx-1.5 font-normal">/</span>
              <span className="text-lg md:text-xl text-slate-500 dark:text-white/50 font-semibold">
                {t(item.department, getEn(item.department))}
              </span>
            </h3>
          </div>
        </div>

        {/* Tags */}
        <div className="relative flex flex-wrap gap-1.5 mt-4">
          {item.tags.map((tag) => (
            <TagPill key={tag} text={tag} />
          ))}
        </div>

        {/* Highlights with keyword highlighting */}
        <ul className="relative mt-5 space-y-2.5">
          {item.highlights.map((h, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-white/60 leading-relaxed"
            >
              <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-electric-blue/40" />
              <span>
                <HighlightedText text={t(h, getEn(h))} />
              </span>
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

  return (
    <div ref={ref} className="relative flex flex-col lg:flex-row items-stretch lg:items-center">
      {textOnLeft ? (
        <>
          {textSide}
          {archSide}
        </>
      ) : (
        <>
          {archSide}
          {textSide}
        </>
      )}
    </div>
  );
}

/* ============================================================
   Main Section
   ============================================================ */
export default function CareerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const { config } = useSiteConfig();
  const { t } = useLanguage();

  // merge config data onto static career definitions
  const mergedCareers = careers.map((c, i) => {
    const cfg = config.careers[i];
    if (!cfg) return c;
    return {
      ...c,
      company: cfg.company,
      department: cfg.department,
      role: cfg.role,
      period: cfg.period,
      tags: cfg.tags,
      logo: cfg.logo,
    };
  });

  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const mouseX = useSpring(rawMouseX, { stiffness: 50, damping: 30 });
  const mouseY = useSpring(rawMouseY, { stiffness: 50, damping: 30 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      rawMouseX.set(e.clientX - rect.left);
      rawMouseY.set(e.clientY - rect.top);
    },
    [rawMouseX, rawMouseY]
  );

  const handleCardInView = useCallback((index: number, visible: boolean) => {
    if (visible) {
      setActiveCardIndex(index);
    } else {
      setActiveCardIndex((prev) => (prev === index ? null : prev));
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="career"
      className="relative py-10 md:py-16 px-4 md:px-16 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <AuroraBackground mouseX={mouseX} mouseY={mouseY} />

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Section header */}
        <div className="mb-10 md:mb-16">
          <p className="font-mono text-electric-blue/60 text-sm tracking-widest uppercase mb-3">
            03 / Career
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-slate-800 dark:text-white">
            {t("工作经历", "Career Experience")}
          </h2>
          <p className="mt-3 text-slate-400 dark:text-white/40 max-w-lg">
            {t("从研发到产品，从IoT到云到星网，持续构建数字化平台能力", "From R&D to Product, IoT to Cloud to StarNet — building digital platform capabilities")}
          </p>
        </div>

        {/* Cards container with center axis */}
        <div className="relative">
          {/* Center Axis Line — only on desktop */}
          <CenterAxisLine activeIndex={activeCardIndex} totalCards={careers.length} />

          {/* Zig-Zag Cards */}
          <div className="space-y-3 lg:space-y-4">
            {mergedCareers.map((item, index) => (
              <ZigZagCard
                key={`${item.company}-${item.period}`}
                item={item}
                index={index}
                onInView={handleCardInView}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
