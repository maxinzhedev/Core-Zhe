"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteConfig } from "./SiteConfigContext";

type Tab = "links" | "text" | "images";

/* ─── small helpers ─── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-xs font-mono uppercase tracking-widest text-electric-blue/60 mb-3 mt-6 first:mt-0">
      {children}
    </h4>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="mb-3">
      <label className="block text-[11px] font-mono text-slate-400 dark:text-white/40 mb-1">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-sm rounded-lg
          bg-white dark:bg-white/[0.04]
          border border-slate-200 dark:border-white/10
          text-slate-700 dark:text-white/80
          placeholder:text-slate-300 dark:placeholder:text-white/20
          focus:outline-none focus:border-electric-blue/40 focus:ring-1 focus:ring-electric-blue/20
          transition-colors"
      />
    </div>
  );
}

function TagsField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <div className="mb-3">
      <label className="block text-[11px] font-mono text-slate-400 dark:text-white/40 mb-1">
        {label}（逗号分隔）
      </label>
      <input
        type="text"
        value={value.join(", ")}
        onChange={(e) =>
          onChange(
            e.target.value
              .split(/[,，]/)
              .map((s) => s.trim())
              .filter(Boolean)
          )
        }
        className="w-full px-3 py-2 text-sm rounded-lg
          bg-white dark:bg-white/[0.04]
          border border-slate-200 dark:border-white/10
          text-slate-700 dark:text-white/80
          focus:outline-none focus:border-electric-blue/40 focus:ring-1 focus:ring-electric-blue/20
          transition-colors"
      />
    </div>
  );
}

/* ─── main panel ─── */

export default function AdminPanel() {
  const { config, updateConfig, resetConfig } = useSiteConfig();
  const [open, setOpen] = useState(true);
  const [tab, setTab] = useState<Tab>("links");
  const [confirmReset, setConfirmReset] = useState(false);

  const handleReset = useCallback(() => {
    if (confirmReset) {
      resetConfig();
      setConfirmReset(false);
    } else {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 3000);
    }
  }, [confirmReset, resetConfig]);

  const tabs: { key: Tab; label: string }[] = [
    { key: "links", label: "链接" },
    { key: "text", label: "文案" },
    { key: "images", label: "图片" },
  ];

  return (
    <>
      {/* Floating toggle button */}
      <motion.button
        onClick={() => setOpen((p) => !p)}
        className="fixed bottom-6 right-6 z-[9999] w-12 h-12 rounded-full
          bg-electric-blue text-white shadow-lg shadow-electric-blue/30
          flex items-center justify-center
          hover:scale-110 transition-transform"
        whileTap={{ scale: 0.9 }}
        title="管理面板"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M8.325 2.317a1.75 1.75 0 013.35 0l.548 1.078a1.75 1.75 0 001.698.957l1.202-.078a1.75 1.75 0 011.675 2.372l-.45 1.122a1.75 1.75 0 00.474 1.88l.86.86a1.75 1.75 0 01-.58 2.9l-1.122.45a1.75 1.75 0 00-.957 1.698l.078 1.202a1.75 1.75 0 01-2.372 1.675l-1.122-.45a1.75 1.75 0 00-1.88.474l-.86.86a1.75 1.75 0 01-2.9-.58l-.45-1.122a1.75 1.75 0 00-1.698-.957l-1.202.078a1.75 1.75 0 01-1.675-2.372l.45-1.122a1.75 1.75 0 00-.474-1.88l-.86-.86a1.75 1.75 0 01.58-2.9l1.122-.45a1.75 1.75 0 00.957-1.698l-.078-1.202a1.75 1.75 0 012.372-1.675l1.122.45a1.75 1.75 0 001.88-.474l.86-.86z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: 420, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 420, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 z-[9998] h-full w-[400px] max-w-[90vw]
              bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl
              border-l border-slate-200/60 dark:border-white/10
              shadow-2xl shadow-black/10 dark:shadow-black/40
              flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200/40 dark:border-white/[0.06]">
              <div>
                <h3 className="text-base font-bold text-slate-800 dark:text-white">
                  管理面板
                </h3>
                <p className="text-[11px] text-slate-400 dark:text-white/30 font-mono">
                  Admin Mode
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-lg border border-slate-200/50 dark:border-white/10
                  flex items-center justify-center text-slate-400 dark:text-white/40
                  hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex px-5 pt-3 gap-1">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    tab === t.key
                      ? "bg-electric-blue/10 text-electric-blue"
                      : "text-slate-400 dark:text-white/40 hover:text-slate-600 dark:hover:text-white/60"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 py-4 custom-scrollbar">
              {tab === "links" && <LinksTab config={config} updateConfig={updateConfig} />}
              {tab === "text" && <TextTab config={config} updateConfig={updateConfig} />}
              {tab === "images" && <ImagesTab config={config} updateConfig={updateConfig} />}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-slate-200/40 dark:border-white/[0.06] flex gap-2">
              <button
                onClick={handleReset}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  confirmReset
                    ? "bg-red-500/10 text-red-500 border border-red-500/30"
                    : "bg-slate-100 dark:bg-white/[0.04] text-slate-500 dark:text-white/40 border border-slate-200/60 dark:border-white/[0.08]"
                }`}
              >
                {confirmReset ? "确认重置？" : "重置默认"}
              </button>
              <div className="flex-1" />
              <p className="text-[10px] text-slate-300 dark:text-white/20 font-mono self-center">
                自动保存至 localStorage
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── tab: links ─── */

function LinksTab({
  config,
  updateConfig,
}: {
  config: ReturnType<typeof useSiteConfig>["config"];
  updateConfig: ReturnType<typeof useSiteConfig>["updateConfig"];
}) {
  return (
    <div>
      {config.projects.map((proj, i) => (
        <div key={i}>
          <SectionTitle>
            项目 {i + 1}：{proj.title}
          </SectionTitle>
          <Field
            label="旅程演示链接"
            value={proj.demoLink}
            onChange={(v) => updateConfig(`projects.${i}.demoLink`, v)}
            placeholder="https://..."
          />
          <Field
            label="自由探索链接"
            value={proj.exploreLink}
            onChange={(v) => updateConfig(`projects.${i}.exploreLink`, v)}
            placeholder="https://..."
          />
          <Field
            label="代码仓库链接"
            value={proj.repoLink}
            onChange={(v) => updateConfig(`projects.${i}.repoLink`, v)}
            placeholder="https://github.com/..."
          />
          <Field
            label="产品文档链接"
            value={proj.docsLink}
            onChange={(v) => updateConfig(`projects.${i}.docsLink`, v)}
            placeholder="https://docs...."
          />
        </div>
      ))}
    </div>
  );
}

/* ─── tab: text ─── */

function TextTab({
  config,
  updateConfig,
}: {
  config: ReturnType<typeof useSiteConfig>["config"];
  updateConfig: ReturnType<typeof useSiteConfig>["updateConfig"];
}) {
  return (
    <div>
      {/* Hero */}
      <SectionTitle>首屏 Hero</SectionTitle>
      <Field
        label="姓名"
        value={config.hero.name}
        onChange={(v) => updateConfig("hero.name", v)}
      />
      <Field
        label="Title"
        value={config.hero.title}
        onChange={(v) => updateConfig("hero.title", v)}
      />
      <Field
        label="座右铭"
        value={config.hero.motto}
        onChange={(v) => updateConfig("hero.motto", v)}
      />
      <TagsField
        label="标签"
        value={config.hero.tags}
        onChange={(v) => updateConfig("hero.tags", v)}
      />

      {/* Education */}
      {config.education.map((edu, i) => (
        <div key={i}>
          <SectionTitle>
            学历 {i + 1}：{edu.school}
          </SectionTitle>
          <Field
            label="学校"
            value={edu.school}
            onChange={(v) => updateConfig(`education.${i}.school`, v)}
          />
          <Field
            label="专业"
            value={edu.major}
            onChange={(v) => updateConfig(`education.${i}.major`, v)}
          />
          <Field
            label="学历类型"
            value={edu.type}
            onChange={(v) => updateConfig(`education.${i}.type`, v)}
          />
          <Field
            label="时间"
            value={edu.period}
            onChange={(v) => updateConfig(`education.${i}.period`, v)}
          />
        </div>
      ))}

      {/* Careers */}
      {config.careers.map((career, i) => (
        <div key={i}>
          <SectionTitle>
            工作 {i + 1}：{career.company}
          </SectionTitle>
          <Field
            label="公司"
            value={career.company}
            onChange={(v) => updateConfig(`careers.${i}.company`, v)}
          />
          <Field
            label="部门"
            value={career.department}
            onChange={(v) => updateConfig(`careers.${i}.department`, v)}
          />
          <Field
            label="岗位"
            value={career.role}
            onChange={(v) => updateConfig(`careers.${i}.role`, v)}
          />
          <Field
            label="时间"
            value={career.period}
            onChange={(v) => updateConfig(`careers.${i}.period`, v)}
          />
          <TagsField
            label="标签"
            value={career.tags}
            onChange={(v) => updateConfig(`careers.${i}.tags`, v)}
          />
        </div>
      ))}

      {/* Projects */}
      {config.projects.map((proj, i) => (
        <div key={i}>
          <SectionTitle>
            项目 {i + 1}：{proj.title}
          </SectionTitle>
          <Field
            label="项目名称"
            value={proj.title}
            onChange={(v) => updateConfig(`projects.${i}.title`, v)}
          />
          <Field
            label="副标题"
            value={proj.subtitle}
            onChange={(v) => updateConfig(`projects.${i}.subtitle`, v)}
          />
          <div className="mb-3">
            <label className="block text-[11px] font-mono text-slate-400 dark:text-white/40 mb-1">
              描述
            </label>
            <textarea
              value={proj.description}
              onChange={(e) =>
                updateConfig(`projects.${i}.description`, e.target.value)
              }
              rows={3}
              className="w-full px-3 py-2 text-sm rounded-lg
                bg-white dark:bg-white/[0.04]
                border border-slate-200 dark:border-white/10
                text-slate-700 dark:text-white/80
                focus:outline-none focus:border-electric-blue/40 focus:ring-1 focus:ring-electric-blue/20
                transition-colors resize-none"
            />
          </div>
          <TagsField
            label="标签"
            value={proj.tags}
            onChange={(v) => updateConfig(`projects.${i}.tags`, v)}
          />
        </div>
      ))}

      {/* Capabilities metrics */}
      <SectionTitle>核心数据</SectionTitle>
      {config.capabilities.metrics.map((m, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <div className="flex-1">
            <Field
              label="标签"
              value={m.label}
              onChange={(v) =>
                updateConfig(`capabilities.metrics.${i}.label`, v)
              }
            />
          </div>
          <div className="flex-1">
            <Field
              label="值"
              value={m.value}
              onChange={(v) =>
                updateConfig(`capabilities.metrics.${i}.value`, v)
              }
            />
          </div>
        </div>
      ))}

      {/* Footer */}
      <SectionTitle>页脚</SectionTitle>
      <Field
        label="版权文字"
        value={config.footer.copyright}
        onChange={(v) => updateConfig("footer.copyright", v)}
      />
    </div>
  );
}

/* ─── tab: images ─── */

function ImagesTab({
  config,
  updateConfig,
}: {
  config: ReturnType<typeof useSiteConfig>["config"];
  updateConfig: ReturnType<typeof useSiteConfig>["updateConfig"];
}) {
  return (
    <div>
      <SectionTitle>学历 Logo</SectionTitle>
      {config.education.map((edu, i) => (
        <div key={i} className="mb-4">
          <Field
            label={`${edu.school} Logo 路径`}
            value={edu.logo}
            onChange={(v) => updateConfig(`education.${i}.logo`, v)}
            placeholder="/pic/xxx.png"
          />
          {edu.logo && (
            <div className="mt-1 w-12 h-12 rounded-lg border border-slate-200/40 dark:border-white/10 overflow-hidden bg-white dark:bg-white/[0.04]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={edu.logo}
                alt={edu.school}
                className="w-full h-full object-contain p-1"
              />
            </div>
          )}
        </div>
      ))}

      <SectionTitle>公司 Logo</SectionTitle>
      {config.careers.map((career, i) => (
        <div key={i} className="mb-4">
          <Field
            label={`${career.company} · ${career.department} Logo 路径`}
            value={career.logo}
            onChange={(v) => updateConfig(`careers.${i}.logo`, v)}
            placeholder="/pic/xxx.png"
          />
          {career.logo && (
            <div className="mt-1 w-12 h-12 rounded-lg border border-slate-200/40 dark:border-white/10 overflow-hidden bg-white dark:bg-white/[0.04]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={career.logo}
                alt={career.company}
                className="w-full h-full object-contain p-1"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
