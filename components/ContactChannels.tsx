"use client";

import { Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { useI18n } from "@/components/LanguageProvider";
import { contactChannels } from "@/lib/site";

const iconMap: Record<(typeof contactChannels)[number]["id"], LucideIcon> = {
  phone: Phone,
  email: Mail,
  whatsapp: MessageCircle,
  location: MapPin,
};

/**
 * Contact channels as icons — sits where the commercial-terms entry used to be
 * in the footer, and repeats beside the mobile drawer's contact actions.
 */
export function ContactIconRow({
  tone = "dark",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const { content } = useI18n();

  const shell =
    tone === "dark"
      ? "border-white/15 text-slate-300 hover:border-ember-400 hover:text-ember-300"
      : "border-slate-200 text-slate-500 hover:border-ember-400 hover:text-ember-700";

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {contactChannels.map((channel, i) => {
        const Icon = iconMap[channel.id];
        const label = content.contact.channels[i]?.label ?? channel.id;
        const glyph = <Icon className="h-4 w-4" aria-hidden />;

        return channel.href ? (
          <a
            key={channel.id}
            href={channel.href}
            target={channel.id === "whatsapp" ? "_blank" : undefined}
            rel={channel.id === "whatsapp" ? "noopener noreferrer" : undefined}
            aria-label={label}
            title={`${label} · ${channel.value}`}
            className={`grid h-10 w-10 place-items-center rounded-lg border transition ${shell}`}
          >
            {glyph}
          </a>
        ) : (
          <span
            key={channel.id}
            aria-label={label}
            title={`${label} · ${channel.value}`}
            className={`grid h-10 w-10 place-items-center rounded-lg border ${shell}`}
          >
            {glyph}
          </span>
        );
      })}
    </div>
  );
}
