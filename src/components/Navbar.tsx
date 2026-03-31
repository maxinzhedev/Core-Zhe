"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageContext";

const NAV_ITEMS = [
  { id: "hero", zh: "首页", en: "Home", num: "00" },
  { id: "education", zh: "教育", en: "Edu", num: "01" },
  { id: "career", zh: "职业", en: "Career", num: "02" },
  { id: "projects", zh: "项目", en: "Projects", num: "03" },
  { id: "journey", zh: "旅程", en: "Journey", num: "04" },
  { id: "certifications", zh: "荣誉", en: "Certs", num: "05" },
  { id: "methodology", zh: "方法", en: "Method", num: "06" },
  { id: "hobbies", zh: "爱好", en: "Interests", num: "07" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { locale, toggleLocale } = useLanguage();
  const isDark = theme === "dark";
  const activeIdx = NAV_ITEMS.findIndex((n) => n.id === activeSection);

  const getLabel = (item: typeof NAV_ITEMS[0]) => locale === "zh" ? item.zh : item.en;

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    setScrollProgress(docH > 0 ? scrollY / docH : 0);

    const viewportCenter = window.innerHeight / 3;
    for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
      const el = document.getElementById(NAV_ITEMS[i].id);
      if (el && el.getBoundingClientRect().top <= viewportCenter) {
        setActiveSection(NAV_ITEMS[i].id);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileOpen(false);
    }
  };

  /* ══════════════════════════════════════════
   * Desktop — left sidebar with always-visible labels
   * ══════════════════════════════════════════ */
  const desktopNav = (
    <motion.nav
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed left-0 top-0 bottom-0 z-[9997] hidden lg:flex flex-col w-[72px] py-8 items-center"
    >
      {/* ── Brand ── */}
      <motion.button
        onClick={() => scrollTo("hero")}
        data-magnetic
        className="relative mb-8 group"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-sm font-black tracking-tight gradient-text select-none">
          Zhe
        </span>
        <motion.div
          className="absolute -inset-2 rounded-lg bg-electric-blue/5 opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* ── Navigation items with track ── */}
      <div className="relative flex-1 flex flex-col w-full pl-3">
        {/* Track background — pinned to left column (dot center = left 16px) */}
        <div className="absolute left-[15px] top-0 bottom-0 w-px bg-slate-200/20 dark:bg-white/[0.05]" />

        {/* Track progress fill */}
        <motion.div
          className="absolute left-[15px] top-0 w-px origin-top"
          style={{
            background: "linear-gradient(180deg, #3B82F6, #10B981)",
            scaleY: scrollProgress,
            height: "100%",
          }}
        />

        {/* Nodes */}
        <div className="relative flex flex-col justify-between h-full">
          {NAV_ITEMS.map((item, i) => {
            const isActive = activeSection === item.id;
            const isPassed = i < activeIdx;

            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                data-magnetic
                className="group relative flex items-center gap-3 py-0.5"
              >
                {/* Dot — fixed width column so track aligns */}
                <div className="relative flex items-center justify-center w-[7px] flex-shrink-0">
                  <motion.div
                    className="rounded-full z-10"
                    animate={{
                      width: isActive ? 10 : 5,
                      height: isActive ? 10 : 5,
                      backgroundColor: isActive
                        ? "#3B82F6"
                        : isPassed
                          ? (isDark ? "rgba(59,130,246,0.45)" : "rgba(59,130,246,0.35)")
                          : (isDark ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.1)"),
                      boxShadow: isActive
                        ? "0 0 12px rgba(59,130,246,0.4)"
                        : "none",
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    whileHover={{
                      width: 8,
                      height: 8,
                      backgroundColor: isActive ? "#3B82F6" : (isDark ? "rgba(59,130,246,0.35)" : "rgba(59,130,246,0.25)"),
                    }}
                  />

                  {/* Active ring pulse */}
                  {isActive && (
                    <motion.div
                      className="absolute rounded-full border border-electric-blue/25"
                      animate={{
                        width: [12, 22, 12],
                        height: [12, 22, 12],
                        opacity: [0.6, 0, 0.6],
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                </div>

                {/* Label — to the right of dot, never overlaps track */}
                <span
                  className={`
                    text-[11px] font-semibold leading-none tracking-wide select-none transition-colors duration-300 whitespace-nowrap
                    ${isActive
                      ? "text-electric-blue"
                      : isPassed
                        ? "text-slate-400 dark:text-white/30"
                        : "text-slate-300 dark:text-white/15 group-hover:text-slate-500 dark:group-hover:text-white/40"
                    }
                  `}
                >
                  {getLabel(item)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Bottom: progress + language + theme toggle ── */}
      <div className="mt-8 flex flex-col items-center gap-4">
        {/* Progress number */}
        <span className="text-[10px] font-mono text-slate-400/50 dark:text-white/15 tabular-nums select-none">
          {Math.round(scrollProgress * 100).toString().padStart(2, "0")}%
        </span>

        {/* Divider */}
        <div className="w-5 h-px bg-slate-200/30 dark:bg-white/[0.06]" />

        {/* Language toggle */}
        <motion.button
          data-magnetic
          onClick={toggleLocale}
          className="w-9 h-9 rounded-xl flex items-center justify-center
            text-slate-400 dark:text-white/25
            hover:text-slate-700 dark:hover:text-white/60
            hover:bg-slate-100/60 dark:hover:bg-white/[0.04]
            transition-all duration-300 text-[11px] font-mono font-bold tracking-wide select-none"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={locale === "zh" ? "Switch to English" : "切换中文"}
        >
          {locale === "zh" ? "EN" : "中"}
        </motion.button>

        {/* Theme toggle */}
        <motion.button
          data-magnetic
          onClick={toggleTheme}
          className="w-9 h-9 rounded-xl flex items-center justify-center
            text-slate-400 dark:text-white/25
            hover:text-slate-700 dark:hover:text-white/60
            hover:bg-slate-100/60 dark:hover:bg-white/[0.04]
            transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={isDark ? "切换浅色模式" : "切换暗色模式"}
        >
          <motion.div
            animate={{ rotate: isDark ? 0 : 180 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.06 1.06l1.06 1.06z" />
              </svg>
            )}
          </motion.div>
        </motion.button>
      </div>
    </motion.nav>
  );

  /* ══════════════════════════════════════════
   * Mobile — bottom floating pill + expandable panel
   * ══════════════════════════════════════════ */
  const mobileNav = (
    <>
      {/* Floating pill — bottom center */}
      <motion.button
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9997] lg:hidden
          flex items-center gap-2.5 px-5 py-3 rounded-full
          mobile-nav-pill shadow-lg shadow-black/10 dark:shadow-black/30"
        data-magnetic
      >
        <motion.div
          className="w-2 h-2 rounded-full bg-electric-blue"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="text-xs font-mono text-slate-500 dark:text-white/50 tracking-wider">
          {NAV_ITEMS[activeIdx]?.num}
        </span>
        <span className="text-sm font-semibold text-slate-800 dark:text-white/80">
          {NAV_ITEMS[activeIdx] ? getLabel(NAV_ITEMS[activeIdx]) : ""}
        </span>
        <motion.svg
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          className="text-slate-400 dark:text-white/30 ml-0.5"
          animate={{ rotate: mobileOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <path d="M3.5 5.5L7 9L10.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.button>

      {/* Expanded panel */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[9996] bg-black/20 dark:bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed bottom-[72px] left-4 right-4 z-[9997] lg:hidden
                mobile-nav-panel rounded-2xl p-5 shadow-xl shadow-black/10 dark:shadow-black/30"
            >
              <div className="grid grid-cols-3 gap-2">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={`
                        flex flex-col items-center gap-1.5 py-3.5 rounded-xl transition-all duration-300
                        ${isActive
                          ? "bg-electric-blue/10 dark:bg-electric-blue/[0.08]"
                          : "hover:bg-slate-100 dark:hover:bg-white/[0.04]"
                        }
                      `}
                    >
                      <span className={`text-[10px] font-mono tracking-widest ${isActive ? "text-electric-blue" : "text-slate-400 dark:text-white/25"}`}>
                        {item.num}
                      </span>
                      <span className={`text-sm font-semibold ${isActive ? "text-electric-blue" : "text-slate-600 dark:text-white/60"}`}>
                        {getLabel(item)}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400 dark:text-white/25 tracking-wider">THEME</span>
                <button
                  onClick={toggleTheme}
                  className="text-sm font-mono text-slate-500 dark:text-white/40 hover:text-slate-800 dark:hover:text-white/70 transition-colors"
                >
                  {isDark ? "◑ Dark" : "○ Light"}
                </button>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-200/50 dark:border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400 dark:text-white/25 tracking-wider">LANG</span>
                <button
                  onClick={toggleLocale}
                  className="text-sm font-mono text-slate-500 dark:text-white/40 hover:text-slate-800 dark:hover:text-white/70 transition-colors"
                >
                  {locale === "zh" ? "EN English" : "中 中文"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <>
      {desktopNav}
      {mobileNav}
    </>
  );
}
