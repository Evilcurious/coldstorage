import Link from "next/link";
import { ArrowLeft, Snowflake } from "lucide-react";
import { SnowflakeMark } from "@/components/Icons";
import { Snowfall } from "@/components/Snowfall";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <Snowfall count={22} seed={1234} speed={0.7} />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-frost-300/50 blur-3xl"
      />

      <div className="enter relative w-full max-w-lg text-center">
        <SnowflakeMark className="animate-spin-slow mx-auto h-16 w-16" />
        <p className="mt-7 inline-flex items-center gap-2 rounded-full border border-frost-400 bg-white/80 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ice-700">
          <Snowflake className="h-3.5 w-3.5" /> Error 404
        </p>
        <h1 className="mt-5 font-display text-[34px] font-extrabold leading-tight tracking-tight text-ink-900 sm:text-[42px]">
          This aisle has <span className="gradient-text">thawed out</span>
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-500">
          The page you were looking for is not in storage here. Everything is still at set point —
          head back to the {site.shortName} homepage.
        </p>
        <Link href="/" className="btn-primary group mt-8">
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to the homepage
        </Link>
      </div>
    </main>
  );
}
