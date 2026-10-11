"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SnowflakeMark } from "@/components/Icons";

/** How long the frost veil takes to cover the outgoing page. */
const COVER_MS = 260;
/** How long the veil takes to clear once the new route has painted. */
const CLEAR_MS = 360;
/** Safety net: never leave the veil up if a navigation goes nowhere. */
const STUCK_MS = 2500;

type Phase = "idle" | "exit" | "enter";

/**
 * Page transitions.
 *
 * · First load / reload — the page fades up into place (`.page-enter`).
 * · Internal links — a frost veil covers the screen with a thin ice/ember
 *   progress bar, the route changes behind it, then the veil clears and the
 *   new page fades in. Browser back/forward replays the fade-in as well.
 *
 * Only same-origin, left-clicked, un-modified links are intercepted; external
 * links, `mailto:`/`tel:`, downloads, hash links and anything marked
 * `data-no-transition` behave exactly as before.
 */
export function RouteTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const phaseRef = useRef<Phase>("idle");
  const previousPath = useRef(pathname);

  phaseRef.current = phase;

  /* Intercept internal link clicks. */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const timers: number[] = [];

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download") || anchor.hasAttribute("data-no-transition")) return;
      if (!anchor.getAttribute("href")) return;

      let url: URL;
      try {
        url = new URL((anchor as HTMLAnchorElement).href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      /* hash links and links to the page you are already on: leave them alone */
      if (url.pathname + url.search === window.location.pathname + window.location.search) return;

      event.preventDefault();
      const href = `${url.pathname}${url.search}${url.hash}`;

      setPhase("exit");
      /* warm the route while the veil closes so the swap is instant */
      try {
        router.prefetch(url.pathname);
      } catch {
        /* prefetch is best-effort */
      }

      timers.push(
        window.setTimeout(() => {
          router.push(href);
          timers.push(window.setTimeout(() => setPhase("idle"), STUCK_MS));
        }, COVER_MS),
      );
    };

    /* capture phase: this must preventDefault before next/link's own onClick
       (dispatched by React in the bubble phase) decides to navigate itself. */
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [router]);

  /* Lift the veil once the new route has painted. */
  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;

    /* back/forward: no veil to lift, the fade-in below is enough */
    if (phaseRef.current !== "exit") return;

    setPhase("enter");
    const id = window.setTimeout(() => setPhase("idle"), CLEAR_MS);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return (
    <>
      <div
        aria-hidden
        className="route-veil fixed inset-0 z-[90] grid place-items-center"
        data-state={phase}
      >
        {phase !== "idle" ? (
          <>
            <span className="absolute inset-0 bg-gradient-to-b from-white via-ice-50 to-ice-100 backdrop-blur-[3px]" />
            <span className="absolute inset-x-0 top-0 h-[2px] overflow-hidden">
              <span
                className="route-bar block h-full w-full bg-gradient-to-r from-ice-600 via-ice-400 to-ember-400"
                data-state={phase}
              />
            </span>
            {phase === "exit" ? <SnowflakeMark className="route-mark relative h-12 w-12" /> : null}
          </>
        ) : null}
      </div>

      {/* keyed by pathname so the fade-in replays on every navigation */}
      <div key={pathname} className="page-enter">
        {children}
      </div>
    </>
  );
}
