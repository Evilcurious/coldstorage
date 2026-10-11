"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { useI18n } from "@/components/LanguageProvider";

/** Footer capacity-updates capture. */
export function SubscribeForm() {
  const { content } = useI18n();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <form
      className="flex w-full max-w-md gap-2.5"
      onSubmit={(e) => {
        e.preventDefault();
        if (!email) return;
        setDone(true);
        setEmail("");
      }}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setDone(false);
        }}
        placeholder={content.footer.placeholder}
        aria-label={content.ui.email}
        className="h-11 w-full min-w-0 rounded-lg border border-white/15 bg-white/5 px-3.5 text-[13.5px] text-white transition placeholder:text-slate-500 focus:border-ember-400 focus:outline-none focus:ring-2 focus:ring-ember-500/25"
      />
      <button type="submit" className="btn shrink-0 bg-white text-ink-900 hover:bg-slate-100">
        {done ? (
          <>
            {content.footer.subscribed} <Check className="h-4 w-4" />
          </>
        ) : (
          content.footer.subscribe
        )}
      </button>
    </form>
  );
}
