import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SnowflakeMark } from "@/components/Icons";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="enter w-full max-w-lg text-center">
        <SnowflakeMark className="mx-auto h-14 w-14" />
        <p className="mt-7 text-2xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Error 404
        </p>
        <h1 className="mt-4 font-display text-[30px] font-bold leading-tight text-ink-900 sm:text-[36px]">
          This page is not in storage
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
          The address you requested does not exist on this site. Everything else is where it should
          be — return to the {site.shortName} homepage to continue.
        </p>
        <Link href="/" className="btn-primary mt-8">
          <ArrowLeft className="h-4 w-4" />
          Back to the homepage
        </Link>
      </div>
    </main>
  );
}
