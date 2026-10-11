"use client";

import { useState } from "react";
import { Check } from "lucide-react";

/** Footer capacity-updates capture. */
export function SubscribeForm() {
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
        placeholder="you@company.com"
        aria-label="Email address"
        className="h-11 w-full rounded-lg border border-white/15 bg-white/5 px-3.5 text-[13.5px] text-white transition placeholder:text-slate-500 focus:border-ice-400 focus:outline-none focus:ring-2 focus:ring-ice-500/20"
      />
      <button type="submit" className="btn shrink-0 bg-white text-ink-900 hover:bg-slate-100">
        {done ? (
          <>
            Subscribed <Check className="h-4 w-4" />
          </>
        ) : (
          "Subscribe"
        )}
      </button>
    </form>
  );
}
