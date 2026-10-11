import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** optional right-hand slot (link or button) shown on wide screens */
  aside?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  className = "",
  aside,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={`flex flex-col gap-6 ${
        centered
          ? "items-center text-center"
          : "lg:flex-row lg:items-end lg:justify-between"
      } ${className}`}
    >
      <div className={`${centered ? "max-w-2xl" : "max-w-2xl"} `} data-reveal>
        <span className={`label ${centered ? "label-center" : ""}`}>{eyebrow}</span>
        <h2 className="mt-4 font-display text-[27px] font-bold leading-[1.18] text-ink-900 sm:text-[34px] lg:text-[38px]">
          {title}
        </h2>
        {body ? (
          <p className="mt-4 text-[15.5px] leading-relaxed text-slate-600">{body}</p>
        ) : null}
      </div>

      {aside ? (
        <div className="shrink-0" data-reveal>
          {aside}
        </div>
      ) : null}
    </div>
  );
}
