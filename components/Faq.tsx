"use client";

import { useState } from "react";
import { ChevronDown, Phone } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { faqs, site } from "@/lib/site";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Frequently asked"
              title="Questions asked before the first consignment"
              body="If your question is not covered here, our commercial desk answers directly."
            />

            <div data-reveal className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-[13.5px] font-semibold text-ink-900">
                Need an answer today?
              </p>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-500">
                The intake line is answered by the duty supervisor at any hour, including public
                holidays.
              </p>
              <a
                href={site.phoneHref}
                className="mt-4 inline-flex items-center gap-2 text-[13.5px] font-semibold text-ice-700 transition hover:text-ice-800"
              >
                <Phone className="h-4 w-4" />
                {site.phone}
              </a>
            </div>
          </div>

          <ul className="border-t border-slate-200">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q} data-reveal style={{ "--reveal-delay": `${i * 50}ms` } as React.CSSProperties}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 border-b border-slate-200 py-5 text-left"
                    >
                      <span className="font-display text-[15.5px] font-semibold text-ink-900">
                        {item.q}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-ice-600" : ""
                        }`}
                      />
                    </button>
                  </h3>
                  <div
                    className="grid transition-all duration-300 ease-out"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="border-b border-slate-200 py-4 pr-8 text-[14px] leading-relaxed text-slate-600">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
