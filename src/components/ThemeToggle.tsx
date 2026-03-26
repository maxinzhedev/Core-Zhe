"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      data-magnetic
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-[9998] group"
      aria-label={isDark ? "切换浅色模式" : "切换暗色模式"}
    >
      <div
        className={`
          relative w-14 h-7 rounded-full p-0.5
          transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${
            isDark
              ? "bg-white/[0.08] border border-white/[0.12] shadow-[0_0_12px_rgba(59,130,246,0.15)]"
              : "bg-black/[0.06] border border-black/[0.1] shadow-[0_0_12px_rgba(16,185,129,0.15)]"
          }
          group-hover:scale-105
        `}
      >
        {/* Track glow */}
        <div
          className={`
            absolute inset-0 rounded-full opacity-0 group-hover:opacity-100
            transition-opacity duration-300
            ${isDark ? "bg-electric-blue/5" : "bg-gem-green/5"}
          `}
        />

        {/* Knob */}
        <motion.div
          className={`
            relative w-6 h-6 rounded-full flex items-center justify-center
            transition-colors duration-500
            ${
              isDark
                ? "bg-gradient-to-br from-[#1e293b] to-[#0f172a] shadow-[0_0_8px_rgba(59,130,246,0.3)]"
                : "bg-gradient-to-br from-white to-[#f8fafc] shadow-[0_1px_4px_rgba(0,0,0,0.15)]"
            }
          `}
          animate={{ x: isDark ? 0 : 28 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
            mass: 0.8,
          }}
        >
          {/* Moon icon (dark) */}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-3.5 h-3.5 text-electric-blue"
            animate={{ opacity: isDark ? 1 : 0, rotate: isDark ? 0 : -90, scale: isDark ? 1 : 0.5 }}
            transition={{ duration: 0.3 }}
            style={{ position: "absolute" }}
          >
            <path
              fillRule="evenodd"
              d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z"
              clipRule="evenodd"
            />
          </motion.svg>

          {/* Sun icon (light) */}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-3.5 h-3.5 text-amber-500"
            animate={{ opacity: isDark ? 0 : 1, rotate: isDark ? 90 : 0, scale: isDark ? 0.5 : 1 }}
            transition={{ duration: 0.3 }}
            style={{ position: "absolute" }}
          >
            <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.06 1.06l1.06 1.06z" />
          </motion.svg>
        </motion.div>
      </div>
    </button>
  );
}
