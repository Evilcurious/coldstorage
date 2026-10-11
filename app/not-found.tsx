"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SnowflakeMark } from "@/components/Icons";
import { useI18n } from "@/components/LanguageProvider";

export default function NotFound() {
  const { content } = useI18n();

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-24">
      <div className="enter w-full max-w-lg text-center">
        <SnowflakeMark className="mx-auto h-14 w-14" />
        <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
          {content.notFound.code}
        </p>
        <h1 className="mt-4 text-balance font-display text-[28px] font-bold leading-tight text-ink-900 sm:text-[36px]">
          {content.notFound.title}
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-slate-600">{content.notFound.body}</p>
        <Link href="/" className="btn-primary mt-8">
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          {content.notFound.back}
        </Link>
      </div>
    </main>
  );
}
