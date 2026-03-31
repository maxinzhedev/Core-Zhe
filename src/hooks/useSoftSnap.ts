"use client";

import { useEffect, useRef } from "react";

/**
 * Soft magnetic scroll — after the user stops scrolling, the page
 * gently nudges to align the nearest section top with the viewport.
 * Unlike CSS scroll-snap, this gives a "suggestion" rather than a lock,
 * preserving natural scroll feel.
 *
 * Key behaviours:
 *  - Only activates after a 150ms scroll pause (no interference while scrolling)
 *  - Only snaps when a section top is within a tight threshold (120px)
 *  - Uses exponential ease-out for silk-smooth deceleration
 *  - Immediately cancels if the user scrolls again mid-snap
 *  - Skips snap entirely during programmatic smooth-scroll (nav clicks)
 */
export function useSoftSnap() {
  const rafId = useRef<number>(0);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const isSnapping = useRef(false);
  const isSmoothScrolling = useRef(false);

  useEffect(() => {
    const SECTION_IDS = [
      "hero",
      "education",
      "career",
      "projects",
      "journey",
      "certifications",
      "capabilities",
      "fusion",
      "backstage",
    ];

    const SNAP_DELAY = 150; // ms after scroll stops before snapping
    const THRESHOLD = 120; // px — only snap if very close to a section top
    const NAV_HEIGHT = 0; // left-rail nav, no top offset needed
    const MIN_SNAP = 4; // px — ignore micro offsets

    // Detect programmatic smooth scrolls (from nav clicks) and skip snapping
    const origScrollIntoView = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = function (arg?: boolean | ScrollIntoViewOptions) {
      isSmoothScrolling.current = true;
      origScrollIntoView.call(this, arg as ScrollIntoViewOptions);
      // Clear flag after the smooth scroll finishes (~800ms is generous)
      setTimeout(() => { isSmoothScrolling.current = false; }, 900);
    };

    function getClosestSection(): { el: HTMLElement; offset: number } | null {
      let closest: { el: HTMLElement; offset: number } | null = null;
      let minDist = Infinity;

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const offset = rect.top - NAV_HEIGHT;
        const dist = Math.abs(offset);

        if (dist < minDist && dist < THRESHOLD) {
          minDist = dist;
          closest = { el, offset };
        }
      }
      return closest;
    }

    function smoothSnapTo(offset: number) {
      if (Math.abs(offset) < 1) {
        isSnapping.current = false;
        return;
      }

      isSnapping.current = true;
      // Ease out — move 14% of remaining distance each frame (gentle deceleration)
      const step = offset * 0.14;
      window.scrollBy({ top: step, behavior: "instant" as ScrollBehavior });

      rafId.current = requestAnimationFrame(() => smoothSnapTo(offset - step));
    }

    function onScrollEnd() {
      if (isSnapping.current || isSmoothScrolling.current) return;

      const target = getClosestSection();
      if (target && Math.abs(target.offset) > MIN_SNAP) {
        smoothSnapTo(target.offset);
      }
    }

    function onScroll() {
      // Cancel any pending snap while user is still scrolling
      if (isSnapping.current) {
        cancelAnimationFrame(rafId.current);
        isSnapping.current = false;
      }
      clearTimeout(timeout.current);
      timeout.current = setTimeout(onScrollEnd, SNAP_DELAY);
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timeout.current);
      cancelAnimationFrame(rafId.current);
      Element.prototype.scrollIntoView = origScrollIntoView;
    };
  }, []);
}
