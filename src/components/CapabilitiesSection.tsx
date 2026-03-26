"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const capabilities = [
  {
    title: "架构能力",
    subtitle: "Platform Architecture",
    items: ["数据建模 & ER 设计", "UML 系统建模", "LTC/MTL 流程设计", "微服务架构拆分"],
    icon: "⚡",
    color: "electric-blue",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "AI 基因",
    subtitle: "AI Native Thinking",
    items: ["RAG 检索增强生成", "Agent 智能体设计", "Workflow 编排", "Salesforce Agentforce"],
    icon: "🧠",
    color: "gem-green",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "认证与荣誉",
    subtitle: "Certifications",
    items: ["华为总裁奖"],
    icon: "🏆",
    color: "electric-blue",
    span: "md:col-span-1",
  },
  {
    title: "云认证",
    subtitle: "Cloud Certs",
    items: ["阿里云 ACP"],
    icon: "☁️",
    color: "gem-green",
    span: "md:col-span-1",
  },
  {
    title: "网络认证",
    subtitle: "Network Certs",
    items: ["HCIP"],
    icon: "🔗",
    color: "electric-blue",
    span: "md:col-span-1",
  },
  {
    title: "核心数据",
    subtitle: "Key Metrics",
    items: ["32岁", "硕士学位", "8年大厂 PM"],
    icon: "📊",
    color: "gem-green",
    span: "md:col-span-1",
  },
];

function CapabilityCard({
  item,
  index,
}: {
  item: (typeof capabilities)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const isLarge = item.span.includes("row-span-2");

  return (
    <motion.div
      ref={ref}
      className={`glow-border rounded-2xl p-6 md:p-8 backdrop-blur-sm ${item.span}`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-2xl md:text-3xl">{item.icon}</span>
          <h3 className="mt-3 text-lg md:text-xl font-bold text-slate-800 dark:text-white tracking-tight">
            {item.title}
          </h3>
          <p className="text-xs font-mono text-slate-400 dark:text-white/30 mt-1">
            {item.subtitle}
          </p>
        </div>
        <div
          className={`w-2 h-2 rounded-full mt-2 ${
            item.color === "electric-blue" ? "bg-electric-blue" : "bg-gem-green"
          }`}
        />
      </div>

      <ul className={`space-y-2 ${isLarge ? "mt-6" : "mt-3"}`}>
        {item.items.map((text, i) => (
          <li
            key={i}
            className="flex items-center gap-2 text-sm text-slate-500 dark:text-white/60"
          >
            <span
              className={`w-1 h-1 rounded-full flex-shrink-0 ${
                item.color === "electric-blue"
                  ? "bg-electric-blue/60"
                  : "bg-gem-green/60"
              }`}
            />
            {text}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function CapabilitiesSection() {
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
            05 / Capabilities
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-slate-800 dark:text-white">
            能力金字塔
          </h2>
          <p className="mt-3 text-slate-400 dark:text-white/40 max-w-lg">
            从平台架构到 AI 智能体，跨越技术与业务的完整能力图谱
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {capabilities.map((item, index) => (
            <CapabilityCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
