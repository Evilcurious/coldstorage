"use client";

import { QuoteProvider } from "./QuoteContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <QuoteProvider>{children}</QuoteProvider>;
}
