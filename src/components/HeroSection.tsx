"use client";

import { motion } from "framer-motion";
import { useSiteConfig } from "./SiteConfigContext";
import { useLanguage } from "./LanguageContext";

interface HeroTag {
  title: string;
  desc: string;
}

const heroTags: HeroTag[] = [
  { title: "全局解题", desc: "从一个具体问题出发，交付的是背后那套系统级的解决方案。" },
  { title: "秩序构建", desc: "风控模型与流程体系，是业务高速运转的安全底座。" },
  { title: "智能跃迁", desc: "让AI真正扎进业务流程，改变团队实际的工作方式。" },
];

const heroTagsEn: HeroTag[] = [
  { title: "Systemic Solutions", desc: "Start with one real problem. Deliver the system behind it." },
  { title: "Building Order", desc: "Risk models and process frameworks that let the business move fast and stay safe." },
  { title: "AI in Practice", desc: "Making AI a real part of how teams work — not just a slide in a deck." },
];

export default function HeroSection() {
  const { config } = useSiteConfig();
  const { t, locale } = useLanguage();
  const hero = config.hero;
  const tags = locale === "zh" ? heroTags : heroTagsEn;

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Subtle radial glow behind name */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-electric-blue/[0.03] dark:bg-electric-blue/5 blur-[120px]" />
      </div>

      <motion.div
        className="relative z-10 text-center w-full max-w-4xl mx-auto px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Main Name */}
        <motion.h1
          className="text-7xl md:text-9xl font-extrabold tracking-tighter gradient-text animate-breathe"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
        >
          {hero.name}
        </motion.h1>

        {/* Divider line */}
        <motion.div
          className="mx-auto mt-6 h-px bg-gradient-to-r from-transparent via-electric-blue/50 to-transparent"
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ duration: 1, delay: 0.8 }}
        />

        {/* Title */}
        <motion.p
          className="mt-6 text-xl md:text-2xl text-slate-500 dark:text-white/70 font-light tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          {t(hero.title, "Platform Product Expert in the AI Era")}
        </motion.p>

        {/* Motto - 知行合一 */}
        <motion.p
          className="mt-3 text-lg text-electric-blue font-mono tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          {t(hero.motto, "Unity of Knowledge and Action")}
        </motion.p>

        {/* Three Core Values — pure text, no cards */}
        <motion.div
          className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          {tags.map((tag, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 + i * 0.15 }}
            >
              <p className="text-base font-medium text-slate-700 dark:text-white/80 tracking-wide">
                {tag.title}
              </p>
              <p className="mt-2 text-sm text-slate-400 dark:text-white/40 leading-relaxed font-light">
                {tag.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
      >
        <motion.div
          className="w-5 h-8 border border-slate-300 dark:border-white/20 rounded-full flex justify-center"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 bg-slate-300 dark:bg-white/40 rounded-full mt-1.5"
            animate={{ opacity: [0.4, 1, 0.4], y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
