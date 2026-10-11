"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

/** Footer newsletter capture. Client-side only so the footer can stay static. */
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
        className="w-full rounded-2xl border border-frost-400 bg-white/90 px-4 py-3 text-[13.5px] outline-none transition focus:border-ice-400"
      />
      <button
        type="submit"
        className="btn-primary shrink-0 !px-5 !py-3"
        aria-live="polite"
      >
        {done ? (
          <>
            Subscribed <Check className="h-4 w-4" />
          </>
        ) : (
          <>
            Subscribe <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
