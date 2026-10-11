"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

/** A small gloved hand, cuff in brand rust, drawn as vector art. */
function Hand({ className = "", tone = "navy" }: { className?: string; tone?: "navy" | "rust" }) {
  const outline = tone === "navy" ? "#1B3A63" : "#A8481E";
  return (
    <svg viewBox="0 0 46 66" className={className} fill="none">
      {/* cuff */}
      <rect x="11" y="48" width="24" height="16" rx="5" fill="#A8481E" />
      <rect x="11" y="48" width="24" height="4" rx="2" fill="#8A3413" />
      {/* palm */}
      <path
        d="M9 44c0-4 3-6 5-6h16c3 0 5 2.5 5 6v6c0 4-2.5 6-6 6H14c-4 0-5-2.5-5-6z"
        fill="#ffffff"
        stroke={outline}
        strokeWidth="2.4"
      />
      {/* fingers */}
      <g stroke={outline} strokeWidth="2.4" strokeLinecap="round">
        <rect x="11" y="20" width="7" height="22" rx="3.5" fill="#ffffff" />
        <rect x="19.5" y="14" width="7" height="28" rx="3.5" fill="#ffffff" />
        <rect x="28" y="17" width="7" height="25" rx="3.5" fill="#ffffff" />
        <rect x="35.5" y="26" width="6.5" height="17" rx="3.25" fill="#ffffff" />
      </g>
      {/* thumb */}
      <path
        d="M9.5 34c-3 0-6 2-6 5.5S6.5 45 10 44.5"
        fill="#ffffff"
        stroke={outline}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Two little hands that wave hello once the hero has been scrolled past.
 * Deliberately small, waves gently, and can be dismissed for the session.
 */
export function WaveHands() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true);
  const [greeting, setGreeting] = useState(false);

  /* decorative: stay out of the way of reduced-motion users and past dismissals */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hidden = window.sessionStorage.getItem("tj-hands-hidden") === "1";
    setDismissed(reduce || hidden);
  }, []);

  /* appear once the hero is behind you */
  useEffect(() => {
    if (dismissed) return;
    const onScroll = () => {
      const hero =
        document.getElementById("top") ?? document.querySelector<HTMLElement>("[data-hero]");
      const threshold = hero ? hero.offsetHeight - 120 : window.innerHeight * 0.7;
      setVisible(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  /* a short "hello" bubble the first time they appear */
  useEffect(() => {
    if (!visible) {
      setGreeting(false);
      return;
    }
    const show = window.setTimeout(() => setGreeting(true), 700);
    const hide = window.setTimeout(() => setGreeting(false), 6200);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, [visible]);

  /* mounted only while it should be seen, so it never traps focus */
  if (dismissed || !visible) return null;

  return (
    <div className="enter fixed bottom-4 left-4 z-40 sm:bottom-6 sm:left-6">
      <div className="relative flex items-end gap-1">
        {/* hello bubble */}
        <span
          className={`absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-ink-900 shadow-card transition-all duration-500 ${
            greeting ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
          }`}
        >
          Hello
        </span>

        {/* first hand */}
        <span className="wave-sleeve block origin-bottom">
          <Hand className="wave-hand h-14 w-auto drop-shadow-sm sm:h-16" />
        </span>

        {/* second hand, slightly behind and offset in time */}
        <span className="wave-sleeve wave-sleeve--alt block origin-bottom">
          <Hand className="wave-hand wave-hand--alt h-11 w-auto opacity-95 drop-shadow-sm sm:h-12" />
        </span>

        <button
          type="button"
          onClick={() => {
            window.sessionStorage.setItem("tj-hands-hidden", "1");
            setDismissed(true);
          }}
          aria-label="Hide the waving hands"
          className="absolute -right-2 -top-6 grid h-6 w-6 place-items-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-card transition hover:text-ink-900"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
