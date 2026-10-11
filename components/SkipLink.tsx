"use client";

import { useI18n } from "@/components/LanguageProvider";

/** Keyboard shortcut past the header, labelled in the reader's language. */
export function SkipLink() {
  const { content } = useI18n();

  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-5 focus:py-2.5 focus:text-[13px] focus:font-semibold focus:text-ice-700 focus:shadow-panel"
    >
      {content.ui.skip}
    </a>
  );
}
