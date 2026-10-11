"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { NAV } from "@/lib/constants";
import { useQuote } from "./QuoteContext";

export function Navbar() {
  const { setOpen } = useQuote();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menu
          ? "border-b border-white/10 bg-navy-950/80 backdrop-blur-xl shadow-glass"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium tracking-wide text-slate-300 transition hover:text-ice-300"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <button type="button" className="btn-primary !py-2.5 !px-5" onClick={() => setOpen(true)}>
            Request Storage Quote
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
          aria-expanded={menu}
          aria-label={menu ? "Close menu" : "Open menu"}
          onClick={() => setMenu((v) => !v)}
        >
          {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menu && (
        <div className="border-t border-white/10 bg-navy-950/95 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenu(false)}
                className="rounded-xl px-4 py-3 text-base text-slate-200 hover:bg-white/5 hover:text-ice-300"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              className="btn-primary mt-2"
              onClick={() => {
                setMenu(false);
                setOpen(true);
              }}
            >
              Request Storage Quote
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
