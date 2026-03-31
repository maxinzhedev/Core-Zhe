"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Lightweight type shim — rrweb-player is Svelte-based, mounted imperatively
type RRWebPlayerInstance = {
  getMetaData: () => { startTime: number; endTime: number; totalTime: number };
  getReplayer: () => { wrapper: HTMLElement };
  addEventListener: (event: string, handler: (params: { payload: unknown }) => void) => void;
  toggle: () => void;
  play: () => void;
  pause: () => void;
  goto: (timeOffset: number, play?: boolean) => void;
  setSpeed: (speed: number) => void;
  triggerResize: () => void;
  $destroy: () => void;
};

interface JourneyPlayerProps {
  onClose: () => void;
}

export default function JourneyPlayer({ onClose }: JourneyPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<RRWebPlayerInstance | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Lock body scroll & close on Escape
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  // Initialize rrweb-player
  useEffect(() => {
    let player: RRWebPlayerInstance | null = null;
    let destroyed = false;

    async function init() {
      if (!containerRef.current) return;

      const [{ default: RRWebPlayer }, eventsModule] = await Promise.all([
        import("rrweb-player"),
        import("@/assets/data/onboarding.json").then((m) => m.default),
      ]);
      // @ts-expect-error -- CSS module has no type declarations
      await import("rrweb-player/dist/style.css");

      if (destroyed) return;

      const events = eventsModule as unknown[];
      if (!events.length) return;

      containerRef.current!.innerHTML = "";

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      player = new RRWebPlayer({
        target: containerRef.current!,
        props: {
          events: events as never[],
          width: vw,
          height: vh,
          autoPlay: true,
          speed: 1,
          showController: true,
          skipInactive: true,
          // Allow the replayer to scale down to fit any screen
          maxScale: 0,
        },
      }) as unknown as RRWebPlayerInstance;

      playerRef.current = player;
      setIsReady(true);
    }

    init();

    return () => {
      destroyed = true;
      if (player) {
        player.$destroy();
        playerRef.current = null;
      }
    };
  }, []);

  // Resize handler — update player dimensions on window resize
  useEffect(() => {
    const onResize = () => {
      const player = playerRef.current;
      if (!player) return;
      player.triggerResize();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleClose = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.pause();
      playerRef.current.$destroy();
      playerRef.current = null;
    }
    onClose();
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex flex-col bg-black/90"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Back button — top-left, semi-transparent */}
      <motion.button
        onClick={handleClose}
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="absolute top-5 left-5 z-10 flex items-center gap-2
          px-4 py-2.5 rounded-xl text-sm font-medium
          bg-white/10 backdrop-blur-md text-white/80
          border border-white/10
          hover:bg-white/20 hover:text-white
          transition-all duration-200
          shadow-lg shadow-black/20"
      >
        {/* Arrow-left icon */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="shrink-0"
        >
          <path
            d="M10 12L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        返回项目页
      </motion.button>

      {/* ESC hint — top-right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute top-6 right-6 z-10 text-white/30 text-xs font-mono
          flex items-center gap-1.5 select-none"
      >
        <span className="px-1.5 py-0.5 rounded border border-white/15 text-[10px]">
          ESC
        </span>
      </motion.div>

      {/* rrweb-player mount point — fills entire screen */}
      <div
        ref={containerRef}
        className="flex-1 w-full h-full overflow-hidden
          [&_.rr-player]:!w-full [&_.rr-player]:!h-full
          [&_.replayer-wrapper]:!mx-auto
          [&_iframe]:!border-none"
      />

      {/* Loading state */}
      <AnimatePresence>
        {!isReady && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center bg-black/90 z-20"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
              <span className="text-sm text-white/40 font-mono">
                加载用户旅程回放…
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
