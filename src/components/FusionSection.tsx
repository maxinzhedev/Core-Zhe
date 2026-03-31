"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

const leftItems = [
  {
    title: "IoT 微服务平台",
    desc: "NB-IoT 联接管理平台架构设计，支撑百万级设备接入",
    tag: "研发基因",
  },
  {
    title: "星网 AI Agent",
    desc: "RAG + Workflow 编排，构建智能运营平台",
    tag: "AI 架构",
  },
];

const rightItems = [
  {
    title: "2000万资金追回",
    desc: "通过流程数字化与智能预警，实现大规模应收账款回收",
    tag: "业务实战",
  },
  {
    title: "国际分销入驻率 +60%",
    desc: "阿里云国际 CRM 生态建设，提升合作伙伴入驻转化",
    tag: "增长引擎",
  },
];

function FusionCard({
  title,
  desc,
  tag,
  direction,
  index,
}: {
  title: string;
  desc: string;
  tag: string;
  direction: "left" | "right";
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className="glow-border rounded-2xl p-6 backdrop-blur-sm"
      initial={{
        opacity: 0,
        x: direction === "left" ? -60 : 60,
      }}
      animate={
        isInView
          ? { opacity: 1, x: 0 }
          : {}
      }
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <span
        className={`inline-block px-2 py-0.5 text-xs font-mono rounded-full mb-3 ${
          direction === "left"
            ? "text-electric-blue bg-electric-blue/10 border border-electric-blue/20"
            : "text-gem-green bg-gem-green/10 border border-gem-green/20"
        }`}
      >
        {tag}
      </span>
      <h3 className="text-lg font-bold text-slate-800 dark:text-white tracking-tight">{title}</h3>
      <p className="mt-2 text-sm text-slate-400 dark:text-white/50 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

export default function FusionSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const centerScale = useTransform(scrollYProgress, [0.3, 0.6], [0.8, 1]);
  const centerOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const leftX = useTransform(scrollYProgress, [0.4, 0.7], [0, 20]);
  const rightX = useTransform(scrollYProgress, [0.4, 0.7], [0, -20]);

  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="fusion"
      className="relative py-16 px-6 md:px-16 max-w-7xl mx-auto"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <p className="font-mono text-gem-green/60 text-sm tracking-widest uppercase mb-3">
          07 / Fusion
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-slate-800 dark:text-white">
          核心聚变
        </h2>
        <p className="mt-3 text-slate-400 dark:text-white/40 max-w-lg">
          研发基因与业务实战的深度融合，在阿里、华为平台锤炼出的行业洞察
        </p>
      </motion.div>

      {/* Fusion layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Left wing - 研发基因 */}
        <motion.div className="space-y-4" style={{ x: leftX }}>
          {leftItems.map((item, i) => (
            <FusionCard
              key={item.title}
              {...item}
              direction="left"
              index={i}
            />
          ))}
        </motion.div>

        {/* Center - Fusion point */}
        <motion.div
          className="flex items-center justify-center py-12"
          style={{ scale: centerScale, opacity: centerOpacity }}
        >
          <div className="relative">
            {/* Glow rings */}
            <div className="absolute inset-0 w-40 h-40 rounded-full bg-electric-blue/10 dark:bg-electric-blue/10 blur-xl animate-breathe" />
            <div className="absolute inset-2 w-36 h-36 rounded-full bg-gem-green/10 dark:bg-gem-green/10 blur-lg animate-breathe" style={{ animationDelay: "1s" }} />

            {/* Core */}
            <div className="relative w-40 h-40 rounded-full border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center bg-white/80 dark:bg-white/[0.02] backdrop-blur-sm shadow-sm dark:shadow-none">
              <span className="text-3xl mb-2">⚛️</span>
              <span className="text-xs font-mono text-slate-500 dark:text-white/50">FUSION</span>
              <span className="text-[10px] font-mono text-slate-400 dark:text-white/30 mt-1">
                Tech × Business
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right wing - 业务实战 */}
        <motion.div className="space-y-4" style={{ x: rightX }}>
          {rightItems.map((item, i) => (
            <FusionCard
              key={item.title}
              {...item}
              direction="right"
              index={i}
            />
          ))}
        </motion.div>
      </div>

      {/* Fusion insight */}
      <motion.div
        className="mt-16 glow-border rounded-2xl p-8 text-center"
        style={{ scale: centerScale, opacity: centerOpacity }}
      >
        <p className="text-sm font-mono text-electric-blue/60 mb-2">
          INDUSTRY INSIGHT
        </p>
        <p className="text-lg text-slate-500 dark:text-white/70 max-w-2xl mx-auto leading-relaxed">
          &ldquo;在华为锤炼的平台化思维，与阿里打磨的业务增长方法论，
          <br className="hidden md:block" />
          在 AI 时代汇聚成对产品的独特理解 —— 技术是骨架，商业是血肉，
          <br className="hidden md:block" />
          AI 是神经系统。&rdquo;
        </p>
      </motion.div>
    </section>
  );
}
