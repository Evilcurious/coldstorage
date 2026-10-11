import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** Simple line icons so every network sits at the same optical weight. */

export function FacebookIcon({ className = "", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path
        d="M15.5 8.5h-1.9c-.6 0-1.1.5-1.1 1.1V12h3l-.4 2.6h-2.6V21h-2.8v-6.4H8V12h1.7V9.4c0-2 1.2-3.4 3.1-3.4h2.7z"
        fill="currentColor"
      />
    </svg>
  );
}

export function InstagramIcon({ className = "", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.9"
      />
      <circle cx="12" cy="12" r="3.9" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="17" cy="7" r="1.25" fill="currentColor" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path
        d="M12 3.6a8.2 8.2 0 0 0-7 12.5L4.2 20l4-1.1A8.2 8.2 0 1 0 12 3.6Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path
        d="M9.3 8.6c.3-.6.6-.6.9-.6h.7c.2 0 .4.2.5.5l.6 1.4c.1.3 0 .5-.1.7l-.5.6c-.1.2-.2.4-.1.6.4.8 1.1 1.5 1.9 1.9.2.1.4 0 .6-.1l.6-.5c.2-.2.4-.2.7-.1l1.4.6c.3.1.5.3.5.5v.7c0 .3 0 .6-.6.9-.7.3-1.7.3-3-.3a9 9 0 0 1-4-4c-.6-1.3-.6-2.3-.2-3Z"
        fill="currentColor"
      />
    </svg>
  );
}

export const socialIconMap = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  whatsapp: WhatsAppIcon,
} as const;
