"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useLanguage } from "./LanguageContext";
import { getEn } from "@/i18n/translations";

/* ──────────────────────────────────────────
   Certificate & Honor Data
   ────────────────────────────────────────── */

interface CertItem {
  title: string;
  subtitle: string;
  issuer: string;
  year: string;
  description: string;
  file: string;
  thumbnail: string;
  fileType: "png" | "pdf";
  category: "honor" | "cloud" | "network" | "ecosystem";
  highlight?: boolean;
}

const certData: CertItem[] = [
  {
    title: "华为总裁奖",
    subtitle: "Huawei President Award",
    issuer: "华为集团",
    year: "2021",
    description:
      "华为最高级别个人荣誉奖项，授予在业务突破中做出卓越贡献的个人。表彰在重大项目中的战略洞察与端到端交付能力。",
    file: "/pic/cert&honor/马信哲-华为集团-总裁奖.pdf",
    thumbnail: "/pic/cert-thumbs/马信哲-华为集团-总裁奖.pdf.png",
    fileType: "pdf",
    category: "honor",
    highlight: true,
  },
  {
    title: "HCIP 云服务解决方案架构",
    subtitle: "Cloud Service Solutions Architect",
    issuer: "华为技术认证",
    year: "2020",
    description:
      "华为云高级认证，验证在云服务解决方案设计、迁移策略及混合云架构方面的专业能力。",
    file: "/pic/cert&honor/马信哲-华为技术认证-云服务解决方案架构HCIP-.pdf",
    thumbnail:
      "/pic/cert-thumbs/马信哲-华为技术认证-云服务解决方案架构HCIP-.pdf.png",
    fileType: "pdf",
    category: "cloud",
  },
  {
    title: "阿里云 ACP 数据分析师",
    subtitle: "Alibaba Cloud ACP Data Analyst",
    issuer: "阿里云",
    year: "2023",
    description:
      "阿里云专业级数据分析认证，涵盖大数据处理、数据仓库设计、BI 可视化及数据驱动决策全链路能力。",
    file: "/pic/cert&honor/马信哲-阿里云ACP数据分析师证书.png",
    thumbnail: "/pic/cert&honor/马信哲-阿里云ACP数据分析师证书.png",
    fileType: "png",
    category: "cloud",
  },
  {
    title: "HCIP 视频会议",
    subtitle: "Video Conferencing HCIP",
    issuer: "华为技术认证",
    year: "2019",
    description:
      "华为高级视频会议认证，掌握企业级视频会议系统的规划、部署与运维能力。",
    file: "/pic/cert&honor/马信哲-华为技术认证-视频会议-HCIP .pdf",
    thumbnail: "/pic/cert-thumbs/马信哲-华为技术认证-视频会议-HCIP .pdf.png",
    fileType: "pdf",
    category: "network",
  },
  {
    title: "企业 ICT 建构与发展认证",
    subtitle: "Enterprise ICT Infrastructure",
    issuer: "华为大学",
    year: "2019",
    description:
      "系统掌握企业 ICT 基础架构的规划、设计与演进策略，涵盖数据中心、网络及安全体系建设。",
    file: "/pic/cert&honor/马信哲-华为大学-企业ICT建构与发展认证.png",
    thumbnail: "/pic/cert&honor/马信哲-华为大学-企业ICT建构与发展认证.png",
    fileType: "png",
    category: "ecosystem",
  },
  {
    title: "生态合作认证",
    subtitle: "Ecosystem Partnership",
    issuer: "华为大学",
    year: "2019",
    description:
      "华为生态伙伴合作体系认证，理解华为渠道策略、合作伙伴赋能模式与生态共赢方法论。",
    file: "/pic/cert&honor/马信哲-华为大学-生态合作认证.png",
    thumbnail: "/pic/cert&honor/马信哲-华为大学-生态合作认证.png",
    fileType: "png",
    category: "ecosystem",
  },
];

const categoryLabels: Record<
  CertItem["category"],
  { label: string; color: string }
> = {
  honor: { label: "荣誉", color: "amber" },
  cloud: { label: "云计算", color: "electric-blue" },
  network: { label: "网络", color: "gem-green" },
  ecosystem: { label: "生态", color: "purple" },
};

/* ──────────────────────────────────────────
   SVG Decorative Rosette / Ribbon
   ────────────────────────────────────────── */

function RosetteRibbon({
  color,
  highlight,
}: {
  color: string;
  highlight?: boolean;
}) {
  const colorMap: Record<string, { main: string; light: string; ribbon: string }> = {
    amber: {
      main: "#F59E0B",
      light: "#FCD34D",
      ribbon: "#D97706",
    },
    "electric-blue": {
      main: "#3B82F6",
      light: "#93C5FD",
      ribbon: "#2563EB",
    },
    "gem-green": {
      main: "#10B981",
      light: "#6EE7B7",
      ribbon: "#059669",
    },
    purple: {
      main: "#8B5CF6",
      light: "#C4B5FD",
      ribbon: "#7C3AED",
    },
  };

  const c = colorMap[color] || colorMap["electric-blue"];
  const size = highlight ? 56 : 44;

  return (
    <svg
      width={size}
      height={size + 18}
      viewBox="0 0 56 74"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cert-rosette"
    >
      {/* Ribbon tails */}
      <path
        d="M20 46 L14 72 L22 62 L28 74 L28 46Z"
        fill={c.ribbon}
        opacity="0.85"
      />
      <path
        d="M36 46 L42 72 L34 62 L28 74 L28 46Z"
        fill={c.ribbon}
        opacity="0.85"
      />
      {/* Ribbon highlight stripes */}
      <path
        d="M18 50 L15.5 65 L19 58Z"
        fill={c.light}
        opacity="0.3"
      />
      <path
        d="M38 50 L40.5 65 L37 58Z"
        fill={c.light}
        opacity="0.3"
      />

      {/* Outer rosette petals */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const cx = 28 + Math.cos(angle) * 18;
        const cy = 24 + Math.sin(angle) * 18;
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={8}
            fill={c.main}
            opacity={0.2 + (i % 2) * 0.1}
          />
        );
      })}

      {/* Middle ring */}
      <circle cx="28" cy="24" r="17" fill={c.main} opacity="0.15" />
      <circle
        cx="28"
        cy="24"
        r="17"
        fill="none"
        stroke={c.main}
        strokeWidth="1.5"
        opacity="0.4"
      />

      {/* Inner rosette petals */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = ((i * 45 + 22.5) * Math.PI) / 180;
        const cx = 28 + Math.cos(angle) * 11;
        const cy = 24 + Math.sin(angle) * 11;
        return (
          <circle
            key={`inner-${i}`}
            cx={cx}
            cy={cy}
            r={5}
            fill={c.light}
            opacity={0.25}
          />
        );
      })}

      {/* Center medallion */}
      <circle cx="28" cy="24" r="11" fill={c.main} opacity="0.9" />
      <circle cx="28" cy="24" r="11" fill="url(#medalGrad)" />
      <circle
        cx="28"
        cy="24"
        r="9"
        fill="none"
        stroke={c.light}
        strokeWidth="0.8"
        opacity="0.6"
      />

      {/* Star in center */}
      <path
        d="M28 16 L30 21.5 L36 22 L31.5 26 L33 32 L28 29 L23 32 L24.5 26 L20 22 L26 21.5Z"
        fill={c.light}
        opacity="0.85"
      />

      <defs>
        <radialGradient id="medalGrad" cx="0.35" cy="0.35" r="0.65">
          <stop offset="0%" stopColor={c.light} stopOpacity="0.4" />
          <stop offset="100%" stopColor={c.main} stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ──────────────────────────────────────────
   Category Filter Pill
   ────────────────────────────────────────── */

function FilterPill({
  label,
  active,
  color,
  onClick,
}: {
  label: string;
  active: boolean;
  color: string;
  onClick: () => void;
}) {
  const { t } = useLanguage();
  const colorMap: Record<string, string> = {
    amber: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    "electric-blue": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "gem-green": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    purple: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    all: "bg-white/10 text-white/60 border-white/20",
  };

  const lightColorMap: Record<string, string> = {
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    "electric-blue": "bg-blue-50 text-blue-700 border-blue-200",
    "gem-green": "bg-emerald-50 text-emerald-700 border-emerald-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    all: "bg-slate-100 text-slate-600 border-slate-200",
  };

  return (
    <button
      onClick={onClick}
      data-magnetic
      className={`
        px-4 py-1.5 rounded-full text-xs font-mono tracking-wider border transition-all duration-300
        ${
          active
            ? `${colorMap[color]} dark:${colorMap[color]} ${lightColorMap[color]} scale-105 shadow-lg`
            : `border-white/10 text-white/30 dark:border-white/10 dark:text-white/30 border-slate-200 text-slate-400 hover:border-white/20 dark:hover:border-white/20 hover:text-white/50 dark:hover:text-white/50`
        }
      `}
    >
      {t(label, getEn(label))}
    </button>
  );
}

/* ──────────────────────────────────────────
   Certificate Card — Skeuomorphic Thumbnail
   ────────────────────────────────────────── */

function CertCard({
  cert,
  index,
  onSelect,
}: {
  cert: CertItem;
  index: number;
  onSelect: (cert: CertItem) => void;
}) {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const cat = categoryLabels[cert.category];

  const catColorClasses: Record<string, string> = {
    amber: "text-amber-500 border-amber-500/30 bg-amber-500/10",
    "electric-blue": "text-blue-500 border-blue-500/30 bg-blue-500/10",
    "gem-green": "text-emerald-500 border-emerald-500/30 bg-emerald-500/10",
    purple: "text-purple-500 border-purple-500/30 bg-purple-500/10",
  };

  return (
    <motion.div
      ref={ref}
      className={`cert-card group relative rounded-2xl backdrop-blur-sm cursor-pointer overflow-hidden flex flex-col ${
        cert.highlight ? "cert-card-highlight" : ""
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onClick={() => onSelect(cert)}
      layout
      data-magnetic
    >
      {/* Highlight glow for honor card */}
      {cert.highlight && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/5 via-transparent to-amber-500/5 dark:from-amber-500/10 dark:via-transparent dark:to-amber-500/10 pointer-events-none z-0" />
      )}

      {/* ── Skeuomorphic Certificate Thumbnail ── */}
      <div className="relative mx-5 mt-5 md:mx-6 md:mt-6">
        {/* Rosette decoration — top-right corner, overlapping */}
        <div className="absolute -top-4 -right-3 z-20 cert-rosette-wrapper">
          <RosetteRibbon color={cat.color} highlight={cert.highlight} />
        </div>

        {/* Faux-paper certificate frame */}
        <div className="cert-thumb-frame relative rounded-lg overflow-hidden">
          {/* Paper texture background */}
          <div className="absolute inset-0 cert-paper-bg z-0" />

          {/* Gold/colored border inset */}
          <div
            className={`absolute inset-[3px] rounded-[5px] z-[1] pointer-events-none ${
              cert.highlight
                ? "cert-border-gold"
                : "cert-border-default"
            }`}
          />

          {/* Thumbnail image */}
          <div className="relative z-[2] p-1">
            <Image
              src={cert.thumbnail}
              alt={cert.title}
              width={400}
              height={280}
              className="w-full h-36 md:h-44 object-cover object-top rounded"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Sheen overlay on hover */}
          <div className="cert-sheen absolute inset-0 z-[3] pointer-events-none" />
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="relative z-10 px-5 pt-4 pb-5 md:px-6 md:pb-6 flex flex-col flex-1">
        {/* Category badge */}
        <div className="flex items-center justify-between mb-3">
          <span
            className={`text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full border ${catColorClasses[cat.color]}`}
          >
            {t(cat.label, getEn(cat.label))}
          </span>
          <span className="text-xs font-mono text-electric-blue/60">
            {cert.year}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1 group-hover:text-electric-blue dark:group-hover:text-electric-blue transition-colors duration-300">
          {t(cert.title, getEn(cert.title))}
        </h3>
        <p className="text-xs font-mono text-slate-400 dark:text-white/30 mb-3">
          {cert.subtitle}
        </p>

        {/* Description */}
        <p className="text-sm text-slate-500 dark:text-white/50 leading-relaxed mb-4 line-clamp-2 flex-1">
          {t(cert.description, getEn(cert.description))}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400 dark:text-white/40">
            {t(cert.issuer, getEn(cert.issuer))}
          </span>
          {/* View hint */}
          <span className="text-[10px] font-mono text-electric-blue/40 group-hover:text-electric-blue/80 transition-colors duration-300 flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
            {t("查看", "View")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────
   Certificate Lightbox / Modal
   ────────────────────────────────────────── */

function CertModal({
  cert,
  onClose,
}: {
  cert: CertItem;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/70 dark:bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="relative z-10 w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden
                   bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl"
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-white/10">
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
              {cert.title}
            </h3>
            <p className="text-xs font-mono text-slate-400 dark:text-white/40 mt-0.5">
              {cert.issuer} · {cert.year}
            </p>
          </div>
          <button
            onClick={onClose}
            data-magnetic
            className="w-9 h-9 rounded-full flex items-center justify-center border border-slate-200 dark:border-white/10
                       text-slate-400 dark:text-white/40 hover:text-slate-600 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20
                       transition-colors duration-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6 flex items-center justify-center bg-slate-50 dark:bg-slate-950/50">
          {cert.fileType === "png" ? (
            <Image
              src={cert.file}
              alt={cert.title}
              width={800}
              height={600}
              className="max-w-full h-auto rounded-lg shadow-lg"
              style={{ objectFit: "contain" }}
            />
          ) : (
            <iframe
              src={cert.file}
              className="w-full h-[70vh] rounded-lg border border-slate-200 dark:border-white/10"
              title={cert.title}
            />
          )}
        </div>

        <div className="px-6 py-4 border-t border-slate-100 dark:border-white/10">
          <p className="text-sm text-slate-500 dark:text-white/50 leading-relaxed">
            {cert.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────
   Summary Stats Bar
   ────────────────────────────────────────── */

function StatsBar() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const stats = [
    { value: "1", label: "最高荣誉", accent: "text-amber-500" },
    { value: "3", label: "技术认证", accent: "text-blue-500" },
    { value: "2", label: "生态认证", accent: "text-emerald-500" },
    { value: "3", label: "认证体系", accent: "text-purple-500" },
  ];

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          className="cert-stat-card rounded-xl px-5 py-4 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
        >
          <div className={`text-3xl font-extrabold ${s.accent} mb-1`}>
            {s.value}
          </div>
          <div className="text-xs font-mono text-slate-400 dark:text-white/40 tracking-wider">
            {t(s.label, getEn(s.label))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ──────────────────────────────────────────
   Main Section
   ────────────────────────────────────────── */

export default function CertHonorSection() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [activeCategory, setActiveCategory] = useState<
    CertItem["category"] | "all"
  >("all");
  const [selectedCert, setSelectedCert] = useState<CertItem | null>(null);

  const filteredCerts =
    activeCategory === "all"
      ? certData
      : certData.filter((c) => c.category === activeCategory);

  const handleSelect = useCallback((cert: CertItem) => {
    setSelectedCert(cert);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedCert(null);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative py-16 px-6 md:px-16 max-w-7xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Section header */}
        <div className="mb-16">
          <p className="font-mono text-electric-blue/60 text-sm tracking-widest uppercase mb-3">
            09 / Certifications
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-slate-800 dark:text-white">
            {t("荣誉与认证", "Honors & Certifications")}
          </h2>
          <p className="mt-3 text-slate-400 dark:text-white/40 max-w-lg">
            {t("从华为总裁奖到多项云计算与技术认证，每一份证书背后都是实战淬炼的专业能力。", "From Huawei President Award to multiple cloud and tech certifications — each backed by battle-tested expertise.")}
          </p>
        </div>

        <StatsBar />

        {/* Category filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          <FilterPill
            label={t("全部", "All")}
            active={activeCategory === "all"}
            color="all"
            onClick={() => setActiveCategory("all")}
          />
          {(Object.keys(categoryLabels) as CertItem["category"][]).map(
            (key) => (
              <FilterPill
                key={key}
                label={categoryLabels[key].label}
                active={activeCategory === key}
                color={categoryLabels[key].color}
                onClick={() => setActiveCategory(key)}
              />
            )
          )}
        </div>

        {/* Certificate grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert, index) => (
              <CertCard
                key={cert.title}
                cert={cert}
                index={index}
                onSelect={handleSelect}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedCert && (
          <CertModal cert={selectedCert} onClose={handleClose} />
        )}
      </AnimatePresence>
    </section>
  );
}
