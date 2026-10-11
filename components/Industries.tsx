import { Snowflake } from "lucide-react";
import { industries } from "@/lib/site";

/** Two duplicated tracks scrolling in opposite directions, pausing on hover. */
export function Industries() {
  const one = industries.slice(0, Math.ceil(industries.length / 2));
  const two = industries.slice(Math.ceil(industries.length / 2));

  return (
    <section className="relative overflow-hidden py-14">
      <div className="shell">
        <p
          data-reveal
          className="text-center text-[11.5px] font-semibold uppercase tracking-[0.22em] text-ink-300"
        >
          Storing for producers, importers and distributors across
        </p>
      </div>

      <div className="group relative mt-7 space-y-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

        <Marquee items={one} />
        <Marquee items={two} reverse />
      </div>
    </section>
  );
}

function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <div
        className="animate-marquee flex w-max shrink-0 items-center gap-3 pr-3 group-hover:[animation-play-state:paused]"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-frost-300 bg-white/75 px-5 py-3 text-[13.5px] font-medium text-ink-600 shadow-soft backdrop-blur transition-colors duration-300 hover:border-ice-300 hover:text-ice-700"
          >
            <Snowflake className="h-3.5 w-3.5 text-ice-400" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
