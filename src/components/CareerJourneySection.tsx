"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "./LanguageContext";
import { getEn } from "@/i18n/translations";
import { geoOrthographic, geoPath, geoGraticule10, geoInterpolate } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
// eslint-disable-next-line @typescript-eslint/no-require-imports
import countriesJSON from "world-atlas/countries-110m.json";

const worldTopo = countriesJSON as unknown as Topology;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const landFeatures = feature(worldTopo, worldTopo.objects.countries as any);

/* ─── data ──────────────────────────────────────────── */
/* Pipeline stages ordered by enterprise value chain: demand → product → tech */
const pipelineStages = [
  {
    label: "客户拓展",
    en: "Customer Development",
    years: 1,
    color: "#F59E0B",
    description: "一线洞察需求，赋能商业闭环",
    keywords: [
      { zh: "需求洞察", en: "Demand Insight" },
      { zh: "商业闭环", en: "Business Loop" },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
        <path d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "产品运营",
    en: "Product & Operations",
    years: 5.5,
    color: "#10B981",
    description: "主导产品全生命周期管理",
    keywords: [
      { zh: "产品定义", en: "Product Definition" },
      { zh: "全生命周期管理", en: "Full Lifecycle Mgmt" },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
        <path d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "研发",
    en: "R&D Engineering",
    years: 1.5,
    color: "#3B82F6",
    description: "深入技术底层，理解代码到架构",
    keywords: [
      { zh: "技术实现", en: "Tech Implementation" },
      { zh: "代码到架构", en: "Code to Architecture" },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
        <path d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const totalYears = pipelineStages.reduce((s, r) => s + r.years, 0);

const globalFacts = [
  { label: "驻海外工作", value: "6", unit: "个月", color: "#3B82F6" },
  { label: "负责海外业务片区", value: "2", unit: "个", color: "#10B981" },
  { label: "英语能力", value: "CET-6", unit: "", color: "#8B5CF6" },
];

/* overseas work locations — geographic coordinates */
const overseasWorkLocations = [
  { name: "罗马尼亚", en: "Romania", duration: "4", unit: "个月", lon: 26, lat: 45.9, color: "#F59E0B" },
  { name: "印尼", en: "Indonesia", duration: "1", unit: "个月", lon: 107, lat: -6.2, color: "#10B981" },
  { name: "新加坡", en: "Singapore", duration: "1", unit: "个月", lon: 103.8, lat: 1.4, color: "#8B5CF6" },
];

/* business regions */
const businessRegions = [
  { name: "中东", en: "Middle East", lon: 48, lat: 25, color: "#F97316" },
  { name: "东南亚", en: "Southeast Asia", lon: 106, lat: 10, color: "#06B6D4" },
];

const CHINA = { lon: 108, lat: 32 };
/* Rotation that centres the globe on Eurasia — shows Europe to Indonesia */
const HOME_ROT: [number, number, number] = [-70, -20, 0];

/* ── Hover tooltip content keyed by location/region name ── */
type TipInfo = { company: string; companyEn: string; companyColor: string; desc: string; descEn: string };
const hoverInfo: Record<string, TipInfo> = {
  "罗马尼亚": {
    company: "华为", companyEn: "Huawei", companyColor: "#E4002B",
    desc: "华为欧洲运营中心，法国车联网项目的需求挖掘与技术支持",
    descEn: "Huawei European Operations Center — demand discovery & tech support for French connected vehicle project",
  },
  "新加坡": {
    company: "阿里云", companyEn: "Alibaba Cloud", companyColor: "#FF6A00",
    desc: "国际分销伙伴调研",
    descEn: "International distribution partner research",
  },
  "印尼": {
    company: "华为", companyEn: "Huawei", companyColor: "#E4002B",
    desc: "华为云/企业通信产品方案培训",
    descEn: "Huawei Cloud / Enterprise Communications product solution training",
  },
  "中东": {
    company: "华为", companyEn: "Huawei", companyColor: "#E4002B",
    desc: "物联网与企业通信业务解决方案支撑",
    descEn: "IoT and enterprise communications solution support",
  },
  "东南亚": {
    company: "华为", companyEn: "Huawei", companyColor: "#E4002B",
    desc: "物联网与企业通信业务解决方案支撑",
    descEn: "IoT and enterprise communications solution support",
  },
  _other: {
    company: "阿里云", companyEn: "Alibaba Cloud", companyColor: "#FF6A00",
    desc: "国际分销伙伴平台业务范围",
    descEn: "International distribution partner platform business coverage",
  },
};

type HitTarget = { key: string; x: number; y: number };

const aiReadiness = [
  { label: "B端平台业务与AI能力结合", sub: "更好地应对柔性业务与刚性系统的融合挑战" },
  { label: "应对AI时代角色变化挑战", sub: "通过Vibe Coding从交付产品文档到交付准系统，更高效，更准确" },
  { label: "Harness/Context/Prompt工程", sub: "充分挖掘大模型的能力，规避大模型的风险" },
  { label: "紧跟AI技术演进热潮", sub: "过滤可用的技术，瞭望未来的方向，让组织效能永居潮头" },
];

/* ─── Pipeline arrow connector ─────────────────────── */
function SupportArrow({ isInView, delay, flip }: { isInView: boolean; delay: number; flip?: boolean }) {
  return (
    <motion.div
      className="flex items-center justify-center flex-shrink-0"
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={`text-slate-300 dark:text-white/15 w-5 h-5 ${flip ? "rotate-180" : ""}`}
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.div>
  );
}

/* helper: render a single stage card */
function StageCard({ stage, isInView, delay, isActive, onHover, onLeave, isCore }: {
  stage: typeof pipelineStages[number];
  isInView: boolean;
  delay: number;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  isCore?: boolean;
}) {
  const { t } = useLanguage();
  const pct = ((stage.years / totalYears) * 100).toFixed(0);

  return (
    <motion.div
      className={`journey-pipeline-stage rounded-xl p-4 md:p-5 relative group cursor-default ${isCore ? "ring-1 ring-transparent" : ""}`}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        borderColor: isActive ? `${stage.color}40` : undefined,
        boxShadow: isActive
          ? `0 0 24px ${stage.color}15, inset 0 0 12px ${stage.color}08`
          : isCore
            ? `0 0 0 1px ${stage.color}18`
            : undefined,
      }}
    >
      {/* Core badge */}
      {isCore && (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider"
          style={{ background: `${stage.color}20`, color: stage.color }}>
          CORE
        </div>
      )}

      {/* Top: icon + years */}
      <div className="flex items-center justify-between mb-3">
        <div
          className={`${isCore ? "w-11 h-11" : "w-10 h-10"} rounded-lg flex items-center justify-center transition-all duration-300`}
          style={{
            background: `${stage.color}${isActive ? "20" : "10"}`,
            color: stage.color,
            boxShadow: isActive ? `0 0 16px ${stage.color}20` : "none",
          }}
        >
          {stage.icon}
        </div>
        <div className="text-right">
          <span className={`${isCore ? "text-2xl" : "text-xl"} font-bold font-mono`} style={{ color: stage.color }}>
            {stage.years}
          </span>
          <span className="text-[10px] text-slate-400 dark:text-white/30 ml-0.5">{t("年", "yrs")}</span>
          <p className="text-[10px] font-mono text-slate-400 dark:text-white/20">{pct}%</p>
        </div>
      </div>

      {/* Role name */}
      <h4 className={`${isCore ? "text-base" : "text-sm"} font-bold text-slate-800 dark:text-white mb-0.5`}>
        {t(stage.label, getEn(stage.label))}
      </h4>
      <p className="text-[10px] font-mono text-slate-400 dark:text-white/25 mb-2">
        {stage.en}
      </p>

      {/* Description */}
      <p className="text-xs text-slate-500 dark:text-white/40 mb-3">
        {t(stage.description, getEn(stage.description))}
      </p>

      {/* Keyword chips */}
      <div className="flex flex-wrap gap-1.5">
        {stage.keywords.map((kw) => (
          <span
            key={kw.zh}
            className="inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-medium transition-colors duration-300"
            style={{
              background: `${stage.color}${isActive ? "18" : "0A"}`,
              color: isActive ? stage.color : undefined,
            }}
          >
            <span className="text-slate-600 dark:text-white/50" style={isActive ? { color: stage.color } : {}}>
              {t(kw.zh, kw.en)}
            </span>
          </span>
        ))}
      </div>

      {/* Proportional bar at bottom */}
      <div className="mt-3 h-1 rounded-full overflow-hidden bg-slate-200/50 dark:bg-white/[0.04]">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${stage.color}99, ${stage.color})` }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${pct}%` } : {}}
          transition={{ delay: delay + 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </motion.div>
  );
}

/* ─── Enterprise Pipeline View (hub & spoke: Product core, flanked by Customer Dev + R&D) ── */
function PipelineView({ isInView }: { isInView: boolean }) {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState<number | null>(null);

  // stages: 0=客户拓展, 1=产品运营(core), 2=研发
  const left = pipelineStages[0];   // Customer Dev
  const core = pipelineStages[1];   // Product & Ops
  const right = pipelineStages[2];  // R&D

  return (
    <div className="space-y-6">
      {/* Desktop: [left] →  [CORE]  ← [right] */}
      {/* Mobile: stacked — core first, then supporters */}

      {/* Mobile layout: core on top, supporters below */}
      <div className="block md:hidden space-y-3">
        {/* Core card */}
        <StageCard
          stage={core} isInView={isInView} delay={0.3}
          isActive={hovered === 1} isCore
          onHover={() => setHovered(1)} onLeave={() => setHovered(null)}
        />
        {/* Support label */}
        <motion.div
          className="flex items-center gap-2 px-2"
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.55, duration: 0.4 }}
        >
          <div className="flex-1 h-px bg-slate-200/60 dark:bg-white/[0.06]" />
          <span className="text-[10px] font-mono text-slate-400 dark:text-white/25 tracking-wider">
            {t("赋能支撑", "SUPPORTING")}
          </span>
          <div className="flex-1 h-px bg-slate-200/60 dark:bg-white/[0.06]" />
        </motion.div>
        {/* Supporting cards side by side */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col items-center gap-1.5">
            <StageCard
              stage={left} isInView={isInView} delay={0.45}
              isActive={hovered === 0}
              onHover={() => setHovered(0)} onLeave={() => setHovered(null)}
            />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <StageCard
              stage={right} isInView={isInView} delay={0.6}
              isActive={hovered === 2}
              onHover={() => setHovered(2)} onLeave={() => setHovered(null)}
            />
          </div>
        </div>
      </div>

      {/* Desktop layout: [left] → [CORE] ← [right] */}
      <div className="hidden md:flex items-stretch gap-0">
        {/* Left: Customer Dev */}
        <div className="flex-[2] min-w-0">
          <StageCard
            stage={left} isInView={isInView} delay={0.3}
            isActive={hovered === 0}
            onHover={() => setHovered(0)} onLeave={() => setHovered(null)}
          />
        </div>

        {/* Arrow → pointing to core */}
        <div className="flex items-center px-1.5">
          <SupportArrow isInView={isInView} delay={0.5} />
        </div>

        {/* Center: Product & Ops (core, wider) */}
        <div className="flex-[3] min-w-0">
          <StageCard
            stage={core} isInView={isInView} delay={0.35}
            isActive={hovered === 1} isCore
            onHover={() => setHovered(1)} onLeave={() => setHovered(null)}
          />
        </div>

        {/* Arrow ← pointing to core (flipped) */}
        <div className="flex items-center px-1.5">
          <SupportArrow isInView={isInView} delay={0.65} flip />
        </div>

        {/* Right: R&D */}
        <div className="flex-[2] min-w-0">
          <StageCard
            stage={right} isInView={isInView} delay={0.6}
            isActive={hovered === 2}
            onHover={() => setHovered(2)} onLeave={() => setHovered(null)}
          />
        </div>
      </div>

      {/* Coverage insight bar */}
      <motion.div
        className="flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-white/[0.06]"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.0, duration: 0.5 }}
      >
        <span className="text-xs text-slate-500 dark:text-white/35">
          {t("覆盖企业数字化产品的完整视角", "Full-spectrum perspective across enterprise digital products")}
        </span>
        <span className="text-xl font-bold gradient-text">{totalYears} {t("年", "yrs")}</span>
      </motion.div>
    </div>
  );
}

/* ─── 3D Globe (canvas + d3-geo orthographic) ──────── */
function Globe3D({ isInView, onHoverGlobe }: { isInView: boolean; onHoverGlobe?: (on: boolean) => void }) {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const rot = useRef<[number, number, number]>([...HOME_ROT]);
  const drag = useRef(false);
  const last = useRef<[number, number]>([0, 0]);
  const raf = useRef(0);

  /* hit-testing refs — populated during draw() */
  const hitsRef = useRef<HitTarget[]>([]);
  const globeGeo = useRef({ cx: 0, cy: 0, r: 0 });
  const hoveredKey = useRef("");
  const onGlobe = useRef(false);

  /* tooltip state: key + fixed screen position */
  const [tip, setTip] = useState<{ key: string; sx: number; sy: number } | null>(null);
  /* globe hover (zoom) state */
  const [zoomed, setZoomed] = useState(false);

  /* ── draw one frame ── */
  const draw = useCallback(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = cvs.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    cvs.width = Math.round(w * dpr);
    cvs.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const radius = Math.min(w, h) / 2 - 2;
    const isDark = document.documentElement.classList.contains("dark");

    const proj = geoOrthographic()
      .rotate(rot.current)
      .translate([w / 2, h / 2])
      .scale(radius)
      .clipAngle(90);

    const path = geoPath(proj, ctx);

    /* save globe geometry for hit-testing */
    globeGeo.current = { cx: w / 2, cy: h / 2, r: radius };
    const hits: HitTarget[] = [];

    /* atmosphere glow */
    const grd = ctx.createRadialGradient(w / 2, h / 2, radius * 0.92, w / 2, h / 2, radius * 1.12);
    grd.addColorStop(0, isDark ? "rgba(59,130,246,0.07)" : "rgba(59,130,246,0.05)");
    grd.addColorStop(1, "rgba(59,130,246,0)");
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, radius * 1.12, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();

    /* ocean */
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, radius, 0, Math.PI * 2);
    ctx.fillStyle = isDark ? "rgba(15,23,42,0.55)" : "rgba(219,234,254,0.35)";
    ctx.fill();
    ctx.strokeStyle = isDark ? "rgba(59,130,246,0.12)" : "rgba(59,130,246,0.08)";
    ctx.lineWidth = 1;
    ctx.stroke();

    /* graticule */
    ctx.beginPath();
    path(geoGraticule10());
    ctx.strokeStyle = isDark ? "rgba(255,255,255,0.04)" : "rgba(148,163,184,0.12)";
    ctx.lineWidth = 0.5;
    ctx.stroke();

    /* land */
    ctx.beginPath();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    path(landFeatures as any);
    ctx.fillStyle = isDark ? "rgba(100,116,139,0.35)" : "rgba(148,163,184,0.28)";
    ctx.fill();
    ctx.strokeStyle = isDark ? "rgba(148,163,184,0.18)" : "rgba(100,116,139,0.18)";
    ctx.lineWidth = 0.4;
    ctx.stroke();

    /* business-region circles */
    for (const r of businessRegions) {
      const pt = proj([r.lon, r.lat]);
      if (!pt) continue;
      const isHov = hoveredKey.current === r.name;
      ctx.beginPath();
      ctx.arc(pt[0], pt[1], isHov ? 26 : 22, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? `${r.color}${isHov ? "20" : "12"}` : `${r.color}${isHov ? "18" : "0D"}`;
      ctx.fill();
      ctx.setLineDash([4, 3]);
      ctx.strokeStyle = `${r.color}${isHov ? "90" : "50"}`;
      ctx.lineWidth = isHov ? 1.5 : 1;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.font = `bold ${isHov ? 11 : 10}px system-ui,sans-serif`;
      ctx.fillStyle = r.color;
      ctx.textAlign = "center";
      ctx.globalAlpha = isHov ? 1 : 0.75;
      ctx.fillText(t(r.name, r.en), pt[0], pt[1] - (isHov ? 30 : 26));
      ctx.globalAlpha = 1;
      hits.push({ key: r.name, x: pt[0], y: pt[1] });
    }

    /* great-circle arcs China → destinations */
    for (const loc of overseasWorkLocations) {
      const isHov = hoveredKey.current === loc.name;
      const interp = geoInterpolate([CHINA.lon, CHINA.lat], [loc.lon, loc.lat]);
      ctx.beginPath();
      let on = false;
      for (let s = 0; s <= 60; s++) {
        const p = proj(interp(s / 60));
        if (!p) { on = false; continue; }
        if (!on) { ctx.moveTo(p[0], p[1]); on = true; }
        else ctx.lineTo(p[0], p[1]);
      }
      ctx.strokeStyle = `${loc.color}${isHov ? "E0" : "90"}`;
      ctx.lineWidth = isHov ? 2.5 : 1.5;
      ctx.setLineDash([5, 3]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    /* China marker */
    const cp = proj([CHINA.lon, CHINA.lat]);
    if (cp) {
      ctx.beginPath(); ctx.arc(cp[0], cp[1], 5, 0, Math.PI * 2);
      ctx.fillStyle = "#3B82F6"; ctx.fill();
      ctx.beginPath(); ctx.arc(cp[0], cp[1], 10, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(59,130,246,0.25)"; ctx.lineWidth = 1.2; ctx.stroke();
      ctx.font = "bold 11px system-ui,sans-serif";
      ctx.fillStyle = "#3B82F6"; ctx.textAlign = "center";
      ctx.fillText(t("中国", "China"), cp[0], cp[1] - 14);
    }

    /* work-location markers */
    for (const loc of overseasWorkLocations) {
      const pt = proj([loc.lon, loc.lat]);
      if (!pt) continue;
      const isHov = hoveredKey.current === loc.name;
      ctx.beginPath(); ctx.arc(pt[0], pt[1], isHov ? 6 : 4.5, 0, Math.PI * 2);
      ctx.fillStyle = loc.color; ctx.fill();
      ctx.beginPath(); ctx.arc(pt[0], pt[1], isHov ? 11 : 8, 0, Math.PI * 2);
      ctx.strokeStyle = `${loc.color}${isHov ? "70" : "40"}`; ctx.lineWidth = isHov ? 1.5 : 1; ctx.stroke();

      const above = loc.lat < 15;
      const ly = above ? pt[1] + 18 : pt[1] - 12;
      ctx.font = `bold ${isHov ? 11 : 10}px system-ui,sans-serif`;
      ctx.fillStyle = loc.color; ctx.textAlign = "center";
      ctx.fillText(t(loc.name, loc.en), pt[0], ly);
      ctx.font = "9px monospace";
      ctx.globalAlpha = 0.7;
      ctx.fillText(`${loc.duration}${t(loc.unit, getEn(loc.unit))}`, pt[0], ly + 12);
      ctx.globalAlpha = 1;
      hits.push({ key: loc.name, x: pt[0], y: pt[1] });
    }

    hitsRef.current = hits;
  }, [t]);

  /* ── hover detection (separate from drag) ── */
  const checkHover = useCallback((e: React.PointerEvent) => {
    const cvs = canvasRef.current;
    if (!cvs || drag.current) return;
    const rect = cvs.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const g = globeGeo.current;
    const distToCenter = Math.sqrt((mx - g.cx) ** 2 + (my - g.cy) ** 2);

    /* outside globe → clear */
    if (distToCenter > g.r) {
      if (hoveredKey.current !== "" || onGlobe.current) {
        hoveredKey.current = "";
        onGlobe.current = false;
        setTip(null);
        setZoomed(false);
        onHoverGlobe?.(false);
        draw();
      }
      return;
    }

    /* entered globe */
    if (!onGlobe.current) {
      onGlobe.current = true;
      setZoomed(true);
      onHoverGlobe?.(true);
    }

    /* find closest marker / region */
    let closest: HitTarget | null = null;
    let closestDist = 25; // px threshold
    for (const h of hitsRef.current) {
      const d = Math.sqrt((mx - h.x) ** 2 + (my - h.y) ** 2);
      if (d < closestDist) { closest = h; closestDist = d; }
    }

    const newKey = closest ? closest.key : "_other";
    if (newKey === hoveredKey.current) return; // unchanged

    hoveredKey.current = newKey;
    draw(); // re-draw with highlight

    /* compute tooltip screen position */
    const anchor = closest ?? { x: mx, y: my };
    const sx = rect.left + anchor.x;
    const sy = rect.top + anchor.y;
    setTip({ key: newKey, sx, sy });
  }, [draw, onHoverGlobe]);

  /* ── pointer handlers ── */
  const onDown = useCallback((e: React.PointerEvent) => {
    drag.current = true;
    last.current = [e.clientX, e.clientY];
    cancelAnimationFrame(raf.current);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    /* hide tooltip while dragging, keep zoom */
    if (hoveredKey.current !== "") {
      hoveredKey.current = "";
      setTip(null);
      draw();
    }
  }, [draw]);

  const onMove = useCallback((e: React.PointerEvent) => {
    if (!drag.current) {
      checkHover(e);
      return;
    }
    const dx = e.clientX - last.current[0];
    const dy = e.clientY - last.current[1];
    last.current = [e.clientX, e.clientY];
    const s = 0.35;
    rot.current = [
      rot.current[0] - dx * s,
      Math.max(-60, Math.min(60, rot.current[1] + dy * s)),
      0,
    ];
    draw();
  }, [draw, checkHover]);

  const onUp = useCallback(() => {
    if (!drag.current) return;
    drag.current = false;
    const snap = () => {
      const [r0, r1] = rot.current;
      const [d0, d1] = HOME_ROT;
      const k = 0.07;
      rot.current = [r0 + (d0 - r0) * k, r1 + (d1 - r1) * k, 0];
      draw();
      if (Math.abs(rot.current[0] - d0) > 0.08 || Math.abs(rot.current[1] - d1) > 0.08) {
        raf.current = requestAnimationFrame(snap);
      } else {
        rot.current = [...HOME_ROT];
        draw();
      }
    };
    raf.current = requestAnimationFrame(snap);
  }, [draw]);

  const onLeave = useCallback(() => {
    if (drag.current) {
      onUp();
    }
    hoveredKey.current = "";
    onGlobe.current = false;
    setTip(null);
    setZoomed(false);
    onHoverGlobe?.(false);
    draw();
  }, [draw, onUp, onHoverGlobe]);

  /* ── lifecycle ── */
  useEffect(() => {
    if (!isInView) return;
    draw();
    const ro = new ResizeObserver(() => { if (!drag.current) draw(); });
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => { ro.disconnect(); cancelAnimationFrame(raf.current); };
  }, [isInView, draw]);

  /* ── tooltip content resolver ── */
  const tipData = tip ? hoverInfo[tip.key] : null;
  const tipOnRight = tip ? tip.sx < (typeof window !== "undefined" ? window.innerWidth / 2 : 400) : true;

  return (
    <div ref={wrapRef} className="relative w-full">
      {/* Backdrop overlay — dims the page when globe is zoomed */}
      {typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/40 pointer-events-none transition-opacity duration-500 ease-out"
          style={{ opacity: zoomed ? 1 : 0, zIndex: zoomed ? 40 : -1 }}
        />,
        document.body,
      )}

      {/* Globe canvas */}
      <motion.div
        className="aspect-square max-w-[280px] sm:max-w-[340px] mx-auto relative"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ zIndex: zoomed ? 50 : "auto" }}
      >
        <div
          className="w-full h-full transition-all duration-500"
          style={{
            transform: zoomed ? "scale(1.35) translateY(-6px)" : "scale(1)",
            filter: zoomed ? "brightness(1.12) drop-shadow(0 20px 40px rgba(59,130,246,0.22)) drop-shadow(0 8px 16px rgba(0,0,0,0.18))" : "none",
            transitionTimingFunction: zoomed ? "cubic-bezier(0.34,1.56,0.64,1)" : "cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-grab active:cursor-grabbing touch-none rounded-full"
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerLeave={onLeave}
          />
        </div>
      </motion.div>

      {/* Tooltip — portalled to body so overflow:hidden parents can't clip it */}
      {tip && tipData && typeof document !== "undefined" && createPortal(
        <div
          className="fixed z-[9999] pointer-events-none transition-all duration-200 ease-out"
          style={{
            left: tip.sx + (tipOnRight ? 16 : -16),
            top: tip.sy - 12,
            transform: tipOnRight ? "translateX(0)" : "translateX(-100%)",
            opacity: 1,
          }}
        >
          <div className="rounded-xl px-3.5 py-2.5 shadow-xl backdrop-blur-xl border max-w-[200px]
            bg-white/90 border-slate-200/60 dark:bg-slate-800/90 dark:border-white/10">
            {/* company badge */}
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: tipData.companyColor }} />
              <span className="text-xs font-bold tracking-wide" style={{ color: tipData.companyColor }}>
                {t(tipData.company, tipData.companyEn)}
              </span>
            </div>
            {/* description */}
            <p className="text-[11px] leading-relaxed text-slate-600 dark:text-white/60">
              {t(tipData.desc, tipData.descEn)}
            </p>
          </div>
        </div>,
        document.body,
      )}

      {/* Hint */}
      <motion.p
        className="text-center text-[10px] text-slate-400 dark:text-white/20 mt-2 font-mono tracking-wider"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        {t("↔ 拖动旋转地球仪", "↔ Drag to rotate")}
      </motion.p>

      {/* ── Legend ── */}
      <div className="max-w-2xl mx-auto mt-5 space-y-3">
        {/* Work locations */}
        <motion.div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
          initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          <span className="text-xs font-mono text-slate-400 dark:text-white/30 tracking-wider mr-1">
            {t("驻海外工作", "Overseas Work")}
          </span>
          {overseasWorkLocations.map((loc, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs journey-stat-pill">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: loc.color }} />
              <span className="font-semibold text-slate-700 dark:text-white/80">{t(loc.name, loc.en)}</span>
              <span className="font-mono font-bold" style={{ color: loc.color }}>{loc.duration}</span>
              <span className="text-slate-400 dark:text-white/40 text-[10px]">{t(loc.unit, getEn(loc.unit))}</span>
            </span>
          ))}
        </motion.div>

        {/* Business regions */}
        <motion.div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
          initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.6, duration: 0.5 }}
        >
          <span className="text-xs font-mono text-slate-400 dark:text-white/30 tracking-wider mr-1">
            {t("负责海外业务片区", "Business Regions")}
          </span>
          {businessRegions.map((region, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs journey-stat-pill">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 border"
                style={{ borderColor: region.color, background: `${region.color}30` }} />
              <span className="font-semibold text-slate-700 dark:text-white/80">{t(region.name, region.en)}</span>
            </span>
          ))}
        </motion.div>

        {/* Stat pills */}
        <motion.div className="flex flex-wrap justify-center gap-3 pt-1"
          initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8, duration: 0.5 }}
        >
          {globalFacts.map((s) => (
            <div key={s.label} className="journey-stat-pill flex items-center gap-2 rounded-full px-4 py-2">
              <span className="text-base font-bold font-mono" style={{ color: s.color }}>{s.value}</span>
              {s.unit && <span className="text-[10px] text-slate-500 dark:text-white/40">{t(s.unit, getEn(s.unit))}</span>}
              <span className="text-xs text-slate-500 dark:text-white/40">{t(s.label, getEn(s.label))}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ─── AI readiness — compact 2×2 grid ────────────────── */
function AIReadinessGrid({ isInView }: { isInView: boolean }) {
  const { t } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(() => setActiveIdx(p => (p + 1) % aiReadiness.length), 2500);
    return () => clearInterval(id);
  }, [isInView]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      {aiReadiness.map((item, i) => {
        const isActive = activeIdx === i;
        return (
          <motion.div
            key={item.label}
            className={`journey-ai-node rounded-xl px-3.5 py-3 flex items-start gap-3 transition-all duration-500 cursor-default ${isActive ? "journey-ai-node-active" : ""}`}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2 + i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            onMouseEnter={() => setActiveIdx(i)}
          >
            {/* index marker */}
            <div className={`
              w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-mono font-bold flex-shrink-0 mt-0.5 transition-all duration-500
              ${isActive
                ? "bg-purple-500/20 text-purple-400 shadow-[0_0_10px_rgba(139,92,246,0.2)]"
                : "bg-slate-200/50 dark:bg-white/[0.04] text-slate-400 dark:text-white/30"
              }
            `}>
              0{i + 1}
            </div>
            <div className="min-w-0">
              <p className={`text-xs font-semibold transition-colors duration-300 leading-tight ${isActive ? "text-purple-500 dark:text-purple-400" : "text-slate-700 dark:text-white/70"}`}>
                {t(item.label, getEn(item.label))}
              </p>
              <p className="text-[10px] text-slate-400 dark:text-white/30 mt-0.5 leading-snug">{t(item.sub, getEn(item.sub))}</p>
            </div>
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
  const [globeHovered, setGlobeHovered] = useState(false);

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

          {/* Card 1 — Pipeline + AI (full width hero card) */}
          <motion.div
            className="journey-card rounded-2xl p-6 md:p-8 relative overflow-hidden lg:col-span-12"
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
              <PipelineView isInView={isInView} />

              {/* AI Section — fused into bottom */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                <div className="my-6 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-glow-pulse" />
                  <span className="text-xs font-mono text-purple-400/70 tracking-wider uppercase">AI Native</span>
                  <span className="text-xs text-slate-400 dark:text-white/30 ml-1">
                    {t("AI 时代就绪", "AI-Era Ready")}
                  </span>
                </div>
                <AIReadinessGrid isInView={isInView} />
              </motion.div>
            </div>
          </motion.div>

          {/* Card 2 — Global vision (full width) */}
          <motion.div
            className={`journey-card rounded-2xl p-6 md:p-8 relative lg:col-span-12 transition-[overflow] duration-300 ${globeHovered ? "overflow-visible z-50" : "overflow-hidden"}`}
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
              <Globe3D isInView={isInView} onHoverGlobe={setGlobeHovered} />
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
