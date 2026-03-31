"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "./LanguageContext";

export default function FooterSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer
      ref={ref}
      id="footer"
      className="relative py-20 px-6 overflow-hidden"
    >
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-3xl h-px bg-gradient-to-r from-transparent via-electric-blue/30 to-transparent" />

      {/* Subtle glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full bg-electric-blue/[0.03] dark:bg-electric-blue/5 blur-[100px]" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-10">
        {/* Slogan */}
        <motion.p
          className="text-lg md:text-xl text-center font-light tracking-wide text-slate-600 dark:text-white/60 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
                    {"\u201C" + t("寻求志同道合的伙伴，让我们共同定义 AI 时代的组织价值。", "Seeking like-minded partners to define organizational value in the AI era.") + "\u201D"}
        </motion.p>

        {/* Email */}
        <motion.a
          href="mailto:maxinzhe123@gmail.com"
          className="group flex items-center gap-3 text-sm md:text-base font-mono tracking-wide text-slate-500 dark:text-white/50 hover:text-electric-blue dark:hover:text-electric-blue transition-colors duration-300"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          {/* Mail icon */}
          <svg
            className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="2" y="4" width="16" height="12" rx="2" />
            <path d="M2 6l8 5 8-5" />
          </svg>
          maxinzhe123@gmail.com
        </motion.a>

        {/* Divider */}
        <motion.div
          className="w-12 h-px bg-gradient-to-r from-transparent via-slate-400/30 dark:via-white/20 to-transparent"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
        />

        {/* Copyright */}
        <motion.p
          className="text-xs text-slate-400 dark:text-white/30 tracking-wider"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          &copy; {new Date().getFullYear()} Core-Zhe. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
}
