"use client";

import { useState } from "react";
import { HelpCircle, Minus, Plus, Snowflake } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { faqs } from "@/lib/site";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Questions"
              title={
                <>
                  The things clients ask <span className="gradient-text">before day one</span>
                </>
              }
              body="Still unsure about something? Send the question to our commercial desk and you'll get an answer from an engineer, not a call centre."
            />

            <div
              data-reveal
              className="card mt-8 flex items-start gap-4 rounded-3xl p-5"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-frost-100 text-ice-600">
                <HelpCircle className="h-[18px] w-[18px]" />
              </span>
              <div>
                <p className="text-[13.5px] font-semibold text-ink-800">
                  Need a same-day answer?
                </p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-ink-400">
                  Call the intake line — it is answered by the duty supervisor 24 hours a day,
                  including holidays.
                </p>
              </div>
            </div>
          </div>

          <ul className="space-y-3.5">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <li
                  key={item.q}
                  data-reveal="right"
                  style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                >
                  <div
                    className={`card overflow-hidden rounded-3xl transition-all duration-500 ${
                      isOpen ? "border-ice-300 shadow-lift" : "hover:border-frost-400"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                    >
                      <span className="flex items-center gap-3.5">
                        <Snowflake
                          className={`h-4 w-4 shrink-0 transition-all duration-500 ${
                            isOpen ? "rotate-90 text-ice-600" : "text-ice-300"
                          }`}
                        />
                        <span className="font-display text-[15.5px] font-bold text-ink-900">
                          {item.q}
                        </span>
                      </span>
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                          isOpen
                            ? "border-transparent bg-brand-grad text-white"
                            : "border-frost-400 text-ice-600"
                        }`}
                      >
                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>

                    <div
                      className="grid transition-all duration-500 ease-out"
                      style={{
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-6 pl-[62px] text-[14px] leading-relaxed text-ink-500">
                          {item.a}
                        </p>
                      </div>
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
