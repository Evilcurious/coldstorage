"use client";

import { useState } from "react";
import { ChevronDown, Phone } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { useI18n } from "@/components/LanguageProvider";
import { site } from "@/lib/site";

export function Faq() {
  const { content } = useI18n();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow={content.faqs.eyebrow}
              title={content.faqs.title}
              body={content.faqs.body}
            />

            <div data-reveal className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-[13.5px] font-semibold text-ink-900">{content.faqs.helpTitle}</p>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-500">
                {content.faqs.helpBody}
              </p>
              <a
                href={site.phoneHref}
                className="numeric mt-4 inline-flex items-center gap-2 text-[13.5px] font-semibold text-ice-700 transition hover:text-ember-700"
              >
                <Phone className="h-4 w-4" />
                {content.hero.phoneLabel}
              </a>
            </div>
          </div>

          <ul className="border-t border-slate-200">
            {content.faqs.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <li
                  key={item.q}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 50}ms` } as React.CSSProperties}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 border-b border-slate-200 py-5 text-start"
                    >
                      <span className="font-display text-[15px] font-semibold text-ink-900 sm:text-[15.5px]">
                        {item.q}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-ember-600" : ""
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
                      <p className="border-b border-slate-200 py-4 pe-8 text-[14px] leading-relaxed text-slate-600">
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
