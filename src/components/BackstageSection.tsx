"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const projects = [
  {
    id: "starnet",
    icon: "🤖",
    title: "星网 AI Agent 运营平台",
    tag: "AI Agent",
    detail: [
      "$ cat architecture.md",
      "",
      "## 星网 AI Agent 运营平台",
      "├── RAG 检索增强生成引擎",
      "│   ├── 知识库向量化存储",
      "│   ├── 多路召回策略",
      "│   └── Re-ranking 精排模型",
      "├── Workflow 编排引擎",
      "│   ├── 可视化流程设计器",
      "│   ├── 条件分支 & 循环节点",
      "│   └── 人机协同审批节点",
      "└── Agent 智能体框架",
      "    ├── Tool Calling 工具调用",
      "    ├── Memory 上下文管理",
      "    └── Multi-Agent 协作编排",
      "",
      "> 低代码架构，让业务团队也能构建 AI 应用",
    ],
  },
  {
    id: "alicrm",
    icon: "🌐",
    title: "阿里云国际 CRM",
    tag: "生态增长",
    detail: [
      "$ cat growth-metrics.json",
      "",
      "{",
      '  "platform": "阿里云国际 CRM",',
      '  "focus": ["生态合规", "伙伴增长", "分销管理"],',
      '  "achievements": {',
      '    "partner_onboarding_rate": "+60%",',
      '    "compliance_automation": "95%+",',
      '    "distributor_coverage": "30+ 国家"',
      "  },",
      '  "architecture": {',
      '    "pattern": "低代码 + 中台化",',
      '    "integration": "Salesforce Agentforce",',
      '    "data_model": "多租户隔离"',
      "  }",
      "}",
    ],
  },
  {
    id: "patent",
    icon: "📜",
    title: "发明专利（第一发明人）",
    tag: "创新",
    detail: [
      "$ grep -r 'inventor' patents.db",
      "",
      "┌─────────────────────────────────┐",
      "│  PATENT RECORDS                 │",
      "├─────────────────────────────────┤",
      "│  Status: 第一发明人              │",
      "│  Domain: AI + IoT               │",
      "│  Focus:  智能体协作方法          │",
      "│                                 │",
      "│  > 将平台化思维注入专利设计      │",
      "│  > 技术方案具备工业级可行性      │",
      "└─────────────────────────────────┘",
    ],
  },
  {
    id: "music",
    icon: "🎵",
    title: "《北京蒸汽朋克》",
    tag: "跨界创作",
    detail: [
      "$ play --album '北京蒸汽朋克'",
      "",
      "♫ Loading album...",
      "",
      "┌──────────────────────────────┐",
      "│  ▶  北京蒸汽朋克              │",
      "│     Original Album           │",
      "│                              │",
      "│  Concept:                    │",
      "│  将帝都的钢铁森林与蒸汽朋克  │",
      "│  美学融合，用音乐构建一个    │",
      "│  平行宇宙的北京               │",
      "│                              │",
      "│  ━━━━━━━━━━●━━━━━━  3:42    │",
      "│  ◂◂   ▶   ▸▸   🔊          │",
      "└──────────────────────────────┘",
    ],
  },
];

function TerminalWindow({
  lines,
  isOpen,
}: {
  lines: string[];
  isOpen: boolean;
}) {
  return (
    <motion.div
      className="terminal overflow-hidden"
      initial={{ height: 0, opacity: 0 }}
      animate={
        isOpen
          ? { height: "auto", opacity: 1 }
          : { height: 0, opacity: 0 }
      }
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="terminal-header">
        <div className="terminal-dot bg-red-500/80" />
        <div className="terminal-dot bg-yellow-500/80" />
        <div className="terminal-dot bg-green-500/80" />
      </div>
      <div className="p-4 text-xs md:text-sm leading-relaxed">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={isOpen ? { opacity: 1 } : {}}
            transition={{ delay: i * 0.03 }}
            className={`${
              line.startsWith("$")
                ? "text-gem-green"
                : line.startsWith(">")
                ? "text-electric-blue"
                : line.startsWith("#")
                ? "text-slate-700 dark:text-white/80 font-bold"
                : "text-slate-500 dark:text-white/50"
            }`}
          >
            {line || "\u00A0"}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function BackstageSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 md:px-16 max-w-7xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Section header */}
        <div className="mb-16">
          <p className="font-mono text-slate-300 dark:text-white/30 text-sm tracking-widest uppercase mb-3">
            07 / Backstage
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-slate-800 dark:text-white">
            幕后逻辑
          </h2>
          <p className="mt-3 text-slate-400 dark:text-white/40 max-w-lg">
            展示&ldquo;不可见&rdquo;的深度思考 — 产品原型、技术专利与跨界创作
          </p>
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {/* Clickable card header */}
              <button
                data-magnetic
                onClick={() =>
                  setOpenId(openId === project.id ? null : project.id)
                }
                className="w-full text-left glow-border rounded-2xl p-6 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{project.icon}</span>
                    <div>
                      <h3 className="text-base font-bold text-slate-800 dark:text-white tracking-tight">
                        {project.title}
                      </h3>
                      <span className="text-xs font-mono text-slate-400 dark:text-white/30">
                        {project.tag}
                      </span>
                    </div>
                  </div>
                  <motion.span
                    className="text-slate-300 dark:text-white/30 text-xl"
                    animate={{ rotate: openId === project.id ? 45 : 0 }}
                  >
                    +
                  </motion.span>
                </div>
              </button>

              {/* Terminal detail */}
              <div className="mt-2">
                <TerminalWindow
                  lines={project.detail}
                  isOpen={openId === project.id}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        className="mt-32 text-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent mb-8" />
        <p className="text-xs font-mono text-slate-300 dark:text-white/20">
          Designed &amp; Built with obsessive attention to detail
        </p>
        <p className="text-xs font-mono text-slate-200 dark:text-white/10 mt-1">
          &copy; 2024 马信哲 &middot; 知行合一
        </p>
      </motion.div>
    </section>
  );
}
