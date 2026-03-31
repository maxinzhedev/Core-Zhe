"use client";

import { motion } from "framer-motion";

interface BrowserFrameProps {
  url?: string;
  children: React.ReactNode;
  className?: string;
}

export default function BrowserFrame({
  url = "https://cloud-dist.demo.com/onboarding",
  children,
  className = "",
}: BrowserFrameProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`w-full max-w-5xl mx-auto rounded-xl overflow-hidden
        shadow-[0_8px_60px_rgba(0,0,0,0.25)]
        dark:shadow-[0_8px_60px_rgba(0,0,0,0.5)]
        border border-white/10 dark:border-white/5 ${className}`}
    >
      {/* Title Bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#e8e8e8] dark:bg-[#2a2a2a] border-b border-black/5 dark:border-white/5">
        {/* Traffic Lights */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-inner" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e] shadow-inner" />
          <span className="w-3 h-3 rounded-full bg-[#28c840] shadow-inner" />
        </div>

        {/* URL Bar */}
        <div className="flex-1 flex justify-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md
              bg-white/80 dark:bg-white/10
              border border-black/5 dark:border-white/10
              max-w-md w-full"
          >
            {/* Lock Icon */}
            <svg
              className="w-3.5 h-3.5 text-green-600 dark:text-green-400 shrink-0"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-.5V4.5A3.5 3.5 0 0 0 8 1Zm2 6V4.5a2 2 0 1 0-4 0V7h4Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs text-gray-500 dark:text-gray-400 truncate font-mono select-all">
              {url}
            </span>
          </div>
        </div>

        {/* Spacer to balance traffic lights */}
        <div className="w-[52px] shrink-0" />
      </div>

      {/* Content Area */}
      <div className="bg-white dark:bg-[#1a1a1a] w-full aspect-video overflow-auto">
        {children}
      </div>
    </motion.div>
  );
}
