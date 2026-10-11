import type { ReactNode } from "react";
import { Snowflake } from "lucide-react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      data-reveal
      className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      <span className="eyebrow">
        <Snowflake className="h-3.5 w-3.5 text-ice-500" />
        {eyebrow}
      </span>
      <h2 className="mt-5 font-display text-[30px] font-extrabold leading-[1.12] tracking-tight text-ink-900 sm:text-[38px] lg:text-[42px]">
        {title}
      </h2>
      {body ? (
        <p
          className={`mt-4 text-[16px] leading-relaxed text-ink-500 ${
            centered ? "mx-auto" : ""
          }`}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}
