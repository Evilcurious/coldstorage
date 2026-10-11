"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_LOCALE,
  STORAGE_KEY,
  dictionaries,
  isLocale,
  localeMeta,
  type Dict,
  type LocaleCode,
  type LocaleMeta,
} from "@/lib/i18n";

type I18nValue = {
  locale: LocaleCode;
  dir: "ltr" | "rtl";
  meta: LocaleMeta;
  content: Dict;
  setLocale: (next: LocaleCode) => void;
};

const I18nContext = createContext<I18nValue>({
  locale: DEFAULT_LOCALE,
  dir: "ltr",
  meta: localeMeta(DEFAULT_LOCALE),
  content: dictionaries[DEFAULT_LOCALE],
  setLocale: () => {},
});

/** Applied to <html> so the document direction and language stay in step. */
function applyToDocument(code: LocaleCode) {
  const meta = localeMeta(code);
  const root = document.documentElement;
  root.lang = meta.htmlLang;
  root.dir = meta.dir;
  root.dataset.locale = code;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleCode>(DEFAULT_LOCALE);

  /* the inline boot script already set <html lang|dir>; mirror it in state.
     Storage can throw inside sandboxed frames, so a failed read just keeps English. */
  useEffect(() => {
    let initial: LocaleCode = DEFAULT_LOCALE;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) ?? DEFAULT_LOCALE;
      if (isLocale(stored)) initial = stored;
    } catch {
      /* no storage: stay on the default locale */
    }
    setLocaleState(initial);
    applyToDocument(initial);
  }, []);

  const setLocale = useCallback((next: LocaleCode) => {
    setLocaleState(next);
    applyToDocument(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage may be unavailable; the session still switches */
    }
  }, []);

  const value = useMemo<I18nValue>(() => {
    const meta = localeMeta(locale);
    return {
      locale,
      dir: meta.dir,
      meta,
      content: dictionaries[locale],
      setLocale,
    };
  }, [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
