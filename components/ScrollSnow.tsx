"use client";

import { useEffect, useRef, useState } from "react";

type Flake = {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  alpha: number;
  /** settled flakes rest on the surface instead of falling */
  settled: boolean;
  settleAt: number;
  wobble: number;
};

/**
 * Snow that starts once the hero has been scrolled past.
 *
 * While the page is scrolling, flakes stream downward with the scroll. When
 * scrolling stops, they slow down and a few come to rest on the screen — then
 * melt away. Returning to the hero clears everything.
 */
export function ScrollSnow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const flakes: Flake[] = [];
    const MAX_FLOW = 190;
    const MAX_SETTLED = 46;

    let running = false;
    let frame = 0;
    let lastScroll = window.scrollY;
    let scrolling = false;
    let idleTimer = 0;
    let heroHeight = window.innerHeight;

    const measureHero = () => {
      const hero =
        document.getElementById("top") ?? document.querySelector<HTMLElement>("[data-hero]");
      heroHeight = hero ? hero.offsetHeight - 40 : window.innerHeight * 0.8;
    };
    measureHero();

    const spawn = (strength: number) => {
      const count = Math.min(1 + Math.round(strength * 2.4), 6);
      for (let i = 0; i < count; i += 1) {
        if (flakes.length > MAX_FLOW) break;
        flakes.push({
          x: Math.random() * width,
          y: -12 - Math.random() * 40,
          r: 0.9 + Math.random() * 2.1,
          vy: 0.35 + Math.random() * 0.8,
          vx: (Math.random() - 0.5) * 0.35,
          alpha: 0.35 + Math.random() * 0.5,
          settled: false,
          settleAt: 0,
          wobble: Math.random() * Math.PI * 2,
        });
      }
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);

      /* how hard the user is scrolling right now */
      const delta = Math.abs(window.scrollY - lastScroll);
      lastScroll = window.scrollY;
      const strength = Math.min(delta / 34, 1);

      if (scrolling) spawn(strength);

      const settledCount = flakes.reduce((n, f) => n + (f.settled ? 1 : 0), 0);
      const now = performance.now();

      for (let i = flakes.length - 1; i >= 0; i -= 1) {
        const flake = flakes[i];

        if (flake.settled) {
          /* settled snow melts away a few seconds after it lands */
          if (now - flake.settleAt > 9000) {
            flake.alpha -= 0.012;
            if (flake.alpha <= 0) flakes.splice(i, 1);
          }
        } else {
          flake.wobble += 0.02;
          if (scrolling) {
            /* movement is driven by scroll speed */
            flake.y += flake.vy + strength * 7.5;
            flake.x += flake.vx * 2 + Math.sin(flake.wobble) * 0.5;
          } else {
            /* scrolling stopped: slow to a halt, then settle */
            flake.vy *= 0.92;
            flake.vx *= 0.92;
            flake.y += flake.vy + 0.22;
            flake.x += flake.vx + Math.sin(flake.wobble) * 0.28;

            if (flake.vy < 0.16 && flake.y > 60 && settledCount < MAX_SETTLED) {
              if (Math.random() < 0.035) {
                flake.settled = true;
                flake.settleAt = now;
              }
            }
          }

          if (flake.y > height + 16) {
            flakes.splice(i, 1);
            continue;
          }
          if (flake.x < -20) flake.x = width + 12;
          if (flake.x > width + 20) flake.x = -12;
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.alpha})`;
        ctx.shadowColor = "rgba(169, 189, 209, 0.9)";
        ctx.shadowBlur = flake.settled ? 8 : 5;
        ctx.arc(flake.x, flake.y, flake.settled ? flake.r * 1.15 : flake.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      const stillMoving = flakes.some((f) => !f.settled) || scrolling;
      if (!stillMoving && flakes.length === 0) {
        running = false;
        return;
      }
      frame = requestAnimationFrame(step);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(step);
    };

    const onScroll = () => {
      const past = window.scrollY > heroHeight;
      setActive(past);

      if (!past) {
        /* back in the hero: clear the sky */
        flakes.length = 0;
        scrolling = false;
        return;
      }

      scrolling = true;
      start();
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        scrolling = false;
      }, 130);
    };

    const onResize = () => {
      resize();
      measureHero();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(idleTimer);
      cancelAnimationFrame(frame);
      running = false;
    };
  }, [enabled]);

  if (!enabled) return null;

  return <canvas ref={canvasRef} aria-hidden className="scroll-snow" data-active={active} />;
}
