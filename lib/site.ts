/**
 * Non-translatable configuration: brand names, numbers, addresses and links.
 * Everything a visitor reads lives in `lib/i18n` so it can switch language.
 */

export const site = {
  name: "Tahseen Jaber Cold Storage",
  /** wordmark lines, as set in the logo */
  wordmark: "Tahseen Jaber",
  wordmarkSub: "Cold Storage",
  shortName: "Tahseen Jaber",
  location: "Uuayrij Industrial Area, Baghdad",
  phone: "+964 770 450 2200",
  phoneHref: "tel:+9647704502200",
  whatsapp:
    "https://api.whatsapp.com/send/?phone=9647768677775&text&type=phone_number&app_absent=0",
  email: "commercial@tahseenjaber.com",
  whatsappNumber: "+964 776 867 7775",
  founded: 2014,
} as const;

export const socials = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/Tahseenjaber.Coldstorage?mibextid=wwXIfr&rdid=326uZ0kFUuFoyAfF&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19xUcfxzZj%2F%3Fmibextid%3DwwXIfr#",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/tahseenjaber.coldstorage?obrf=cHBvdGg3Njl6cHFn",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://api.whatsapp.com/send/?phone=9647768677775&text&type=phone_number&app_absent=0",
  },
] as const;

/** Contact channels rendered as icon rows on the contact page. */
export const contactChannels = [
  { id: "phone" as const, value: site.phone, href: site.phoneHref },
  { id: "email" as const, value: site.email, href: `mailto:${site.email}` },
  { id: "whatsapp" as const, value: site.whatsappNumber, href: site.whatsapp },
  { id: "location" as const, value: site.location, href: undefined },
];
