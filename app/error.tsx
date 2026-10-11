"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCw } from "lucide-react";
import { SnowflakeMark } from "@/components/Icons";
import { useI18n } from "@/components/LanguageProvider";

/**
 * Route-level error boundary. Any client exception that would otherwise leave a
 * blank page lands here, in the reader's language, with a way back.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { content } = useI18n();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-6 py-28">
      <div className="enter w-full max-w-lg text-center">
        <SnowflakeMark className="mx-auto h-14 w-14" />
        <h1 className="mt-7 text-balance font-display text-[26px] font-bold leading-tight text-ink-900 sm:text-[32px]">
          {content.error.title}
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-slate-600">{content.error.body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={() => reset()} className="btn-primary">
            <RotateCw className="h-4 w-4" />
            {content.error.retry}
          </button>
          <Link href="/" className="btn-secondary">
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {content.notFound.back}
          </Link>
        </div>
      </div>
    </main>
  );
}
