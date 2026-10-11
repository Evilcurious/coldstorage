import { en } from "./en";
import { ur } from "./ur";
import { ar } from "./ar";
import type { Dict, LocaleCode, LocaleMeta } from "./types";

export const locales: LocaleMeta[] = [
  { code: "en", label: "English", native: "English", dir: "ltr", htmlLang: "en" },
  { code: "ur", label: "Urdu", native: "اردو", dir: "rtl", htmlLang: "ur" },
  { code: "ar", label: "Arabic", native: "العربية", dir: "rtl", htmlLang: "ar" },
];

export const DEFAULT_LOCALE: LocaleCode = "en";

export const dictionaries: Record<LocaleCode, Dict> = { en, ur, ar };

export const isLocale = (value: string): value is LocaleCode => value in dictionaries;

export const localeMeta = (code: LocaleCode): LocaleMeta =>
  locales.find((locale) => locale.code === code) ?? locales[0];

export const STORAGE_KEY = "tj-locale";

export type { Dict, LocaleCode, LocaleMeta };
