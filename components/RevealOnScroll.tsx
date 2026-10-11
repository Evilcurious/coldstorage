"use client";

import { useEffect } from "react";

/**
 * Adds `is-frosted` to every `[data-reveal]` element as it scrolls into view.
 * Elements added later (accordions, tab panels, toggled lists) are picked up
 * by a MutationObserver so nothing stays invisible.
 */
export function RevealOnScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const show = (el: Element) => el.classList.add("is-frosted");

    if (reduce) {
      document.querySelectorAll("[data-reveal]").forEach(show);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show(entry.target);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    const scan = () => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not(.is-frosted)")
        .forEach((el) => observer.observe(el));
    };

    scan();

    const mutations = new MutationObserver(() => scan());
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
