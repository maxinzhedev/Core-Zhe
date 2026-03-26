"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  demoLink: string;
  exploreLink: string;
  icon: React.ReactNode;
}

const projects: Project[] = [
  {
    id: "cloud-distribution",
    title: "云分销管理系统",
    subtitle: "Cloud Distribution CRM",
    description:
      "面向国际云市场的渠道分销全生命周期管理平台，覆盖伙伴入驻、报价、签约、出账、退出等核心商业流程，支撑业务年增20%战略目标。",
    tags: ["渠道管理", "全生命周期", "风控引擎", "国际化"],
    demoLink: "#",
    exploreLink: "#",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="4" y="20" width="8" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        <rect x="16" y="12" width="8" height="22" rx="1.5" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
        <rect x="28" y="6" width="8" height="28" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 18L20 10L32 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" opacity="0.4" />
        <circle cx="8" cy="18" r="2" fill="currentColor" opacity="0.5" />
        <circle cx="20" cy="10" r="2" fill="currentColor" opacity="0.7" />
        <circle cx="32" cy="4" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "smart-service",
    title: "智能客服工作台",
    subtitle: "AI Service Workbench",
    description:
      "基于AI Agent的智能运营客服平台，融合故障诊断、工单流转、知识库检索等能力，实现服务保障0事故、0投诉的星座运营目标。",
    tags: ["AI Agent", "工单系统", "知识库", "智能诊断"],
    demoLink: "#",
    exploreLink: "#",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="6" y="6" width="28" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 30L12 36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M26 30L28 36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 36H30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="15" cy="16" r="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="25" cy="16" r="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M17 21C18 22.5 22 22.5 23 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <motion.path
          d="M32 8L36 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.4"
        />
        <motion.path
          d="M34 12H38"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.3"
        />
      </svg>
    ),
  },
];

/* ---- Project Card ---- */
function ProjectCard({
  project,
  index,
  isInView,
}: {
  project: Project;
  index: number;
  isInView: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Main card */}
      <div className="project-card relative rounded-2xl p-8 md:p-10 overflow-hidden">
        {/* Noise grain */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-2xl"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Corner glow on hover */}
        <motion.div
          className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={isOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.5 }}
        />

        {/* Content */}
        <div className="relative">
          {/* Icon + Title row */}
          <div className="flex items-start gap-5">
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-electric-blue/[0.08] border border-electric-blue/10 flex items-center justify-center text-electric-blue">
              {project.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-mono text-electric-blue/50 uppercase tracking-widest mb-1">
                {project.subtitle}
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
                {project.title}
              </h3>
            </div>

            {/* Expand indicator */}
            <motion.div
              className="flex-shrink-0 w-8 h-8 rounded-full border border-slate-200/40 dark:border-white/10 flex items-center justify-center"
              animate={isOpen ? { rotate: 180, borderColor: "rgba(59,130,246,0.3)" } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="text-slate-400 dark:text-white/30"
              >
                <path
                  d="M3 5L7 9L11 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>

          {/* Description */}
          <p className="mt-4 text-sm text-slate-500 dark:text-white/50 leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded-md font-medium
                  bg-slate-100 dark:bg-white/[0.04] text-slate-500 dark:text-white/40
                  border border-slate-200/60 dark:border-white/[0.08]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Sliding drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="relative mt-6 pt-6 border-t border-slate-200/30 dark:border-white/[0.06]"
              initial={{ height: 0, opacity: 0, marginTop: 0, paddingTop: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: 24, paddingTop: 24 }}
              exit={{ height: 0, opacity: 0, marginTop: 0, paddingTop: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ overflow: "hidden" }}
            >
              <p className="text-[11px] font-mono text-slate-400 dark:text-white/30 uppercase tracking-widest mb-4">
                Interactive Demo
              </p>
              <div className="flex gap-3">
                {/* 旅程演示 */}
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="demo-btn-primary flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold
                    bg-electric-blue/10 text-electric-blue border border-electric-blue/20
                    hover:bg-electric-blue/20 hover:border-electric-blue/40
                    transition-all duration-300"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 2L13 8L3 14V2Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                  旅程演示
                </a>

                {/* 自由探索 */}
                <a
                  href={project.exploreLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-medium
                    bg-slate-100/80 dark:bg-white/[0.04] text-slate-600 dark:text-white/50
                    border border-slate-200/60 dark:border-white/[0.08]
                    hover:bg-slate-200/60 dark:hover:bg-white/[0.08] hover:text-slate-800 dark:hover:text-white/70
                    transition-all duration-300"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
                    <path
                      d="M8 4V8L10.5 10.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  自由探索
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ---- Section ---- */
export default function ProjectShowcaseSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 px-6 md:px-16 max-w-7xl mx-auto">
      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Section header */}
        <div className="mb-16">
          <p className="font-mono text-electric-blue/60 text-sm tracking-widest uppercase mb-3">
            04 / Projects
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-slate-800 dark:text-white">
            项目复现
          </h2>
          <p className="mt-3 text-slate-400 dark:text-white/40 max-w-lg">
            可交互的产品原型，还原真实业务场景与设计思路
          </p>
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
