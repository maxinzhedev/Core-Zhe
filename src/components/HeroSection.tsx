"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Subtle radial glow behind name */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-electric-blue/[0.03] dark:bg-electric-blue/5 blur-[120px]" />
      </div>

      <motion.div
        className="relative z-10 text-center"
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
          Maxwell Ma
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
          AI赋能的平台产品经理
        </motion.p>

        {/* Subtitle - 知行合一 */}
        <motion.p
          className="mt-3 text-lg text-electric-blue font-mono tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          知行合一
        </motion.p>

        {/* Tags */}
        <motion.div
          className="mt-8 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 text-sm text-slate-400 dark:text-white/50 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <span className="px-3 py-1 border border-slate-200 dark:border-white/10 rounded-full">
            解决问题，持续交付用户价值
          </span>
          <span className="hidden md:inline text-slate-300 dark:text-white/20">·</span>
          <span className="px-3 py-1 border border-slate-200 dark:border-white/10 rounded-full">
            建立风控模型和流程体系
          </span>
          <span className="hidden md:inline text-slate-300 dark:text-white/20">·</span>
          <span className="px-3 py-1 border border-slate-200 dark:border-white/10 rounded-full">
            AI赋能组织提效业务变革
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
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
