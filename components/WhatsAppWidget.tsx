"use client";

import { MessageCircle } from "lucide-react";
import { COMPANY } from "@/lib/constants";

const MSG = encodeURIComponent(
  "Hello Tahseen Jaber Cold Storage — I would like to inquire about temperature-controlled capacity."
);

export function WhatsAppWidget() {
  return (
    <a
      href={`https://wa.me/${COMPANY.whatsapp}?text=${MSG}`}
      target="_blank"
      rel="noreferrer"
      className="group fixed bottom-5 right-5 z-50"
      aria-label="Chat on WhatsApp"
    >
      <span className="pointer-events-none absolute right-16 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-navy-900/90 px-3 py-2 text-xs text-slate-200 opacity-0 shadow-glass backdrop-blur-md transition group-hover:opacity-100 sm:block">
        Chat with commercial desk
      </span>
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg">
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulseRing" />
        <MessageCircle className="relative h-7 w-7 fill-white" />
      </span>
    </a>
  );
}
