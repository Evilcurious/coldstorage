# Tahseen Jaber Cold Storage — website

Marketing site for a temperature-controlled warehousing and cold-chain logistics facility,
built with Next.js 15, React 19, Tailwind CSS and lucide icons.

The visual language is deliberately corporate: white and cool navy-tinted surfaces, slate
neutrals, a rust accent taken from the logo, tight grid alignment and serif-led
display typography. Motion is used only where it communicates something — live temperature data,
process state, or section entry.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Site map

Every section has its own page, and the home page presents them as photographs only.

| Route | Contents |
| --- | --- |
| `/` | Full-bleed hero slideshow, then a six-tile image mosaic and a photograph ribbon — no body copy, labels appear on hover |
| `/facility` | Facility gallery mosaic, infrastructure, plant metrics |
| `/capabilities` | Six photographic service cards, four-stage cold chain process |
| `/regimes` | Interactive −25 °C / 0 °C / 2–8 °C regime selector with spec tables, service list |
| `/monitoring` | 24-hour temperature trace, live readout, event log, certifications, FAQ |
| `/contact` | Contact channels with icons, structured enquiry form, sectors, FAQ |

`lib/media.ts` holds the locale-independent registry (page slugs, photographs, structural
keys) and `lib/i18n` holds the words, so navigation, tiles, page headers and the "continue
through the facility" cross-links all follow the selected language.

## Brand

The logo supplied with the brief is rebuilt as vector art in two forms:

- `components/Logo.tsx` — inline `<BrandMark />` (rust slats, navy ridge, filled peaks) plus
  the `<Logo />` lockup: "TAHSEEN JABER" wordmark with the routed "COLD STORAGE" sub-line.
  Used in the header and footer; on the dark hero it sits on a white plate so the navy
  wordmark stays legible.
- `public/images/logo-tahseen-jaber.svg` — the full standalone lockup, also referenced by
  the JSON-LD `logo` property.

The palette is sampled from the logo: `ink` is the wordmark navy (`#1B3A63`) and `ember` is
the slat/ridge rust (`#A8481E`). Section labels carry a rust rule, page-header eyebrows a
rust accent and the header scroll bar a navy-to-rust gradient.

## Languages

The site speaks **English (LTR)**, **Urdu** and **Arabic** (both RTL).

- `lib/i18n/types.ts` types the dictionary; `en.ts`, `ur.ts`, `ar.ts` implement it, so a
  missing translation is a type error rather than an English string on an Arabic page.
- `components/LanguageProvider.tsx` sets `<html lang>` / `<html dir>` and remembers the
  choice in `localStorage`; a pre-paint script in `app/layout.tsx` applies the stored
  locale before the first frame so RTL never flashes.
- `components/LanguageChanger.tsx` appears in the header utility bar, in the mobile
  header bar and as a three-button block in the mobile drawer.
- Brand names, phone numbers, e-mail addresses and figures stay Latin in every locale;
  only prose, labels and units are translated.

## Text behaviour

Text reacts to the pointer, always to the brand **rust**: `#A8481E` on light surfaces and
`#C4683F` on dark ones. The rules live in `app/globals.css` and are scoped by `.on-dark` /
`.on-light` wrappers, so a dark band nested inside a light page still behaves correctly.

Photographic tiles carry no text at rest — pointing at one fades its label in, in rust,
over a gradient scrim.

## Hero slideshow

The hero is a full-viewport image slideshow rather than a text block:

- **Five slides** (`hero-facility`, `cold-corridor`, `forklift-cold`, `blast-freezer`,
  `loading-dock`), auto-advancing every **4 seconds**, with minimal text: a short label, the
  regime temperature and one detail line.
- **Alternating travel direction** — slides travel right-to-left, then left-to-right, on
  every automatic change, with a slow Ken Burns drift inside each frame.
- **Controls:** progress indicators that fill over the slide duration, previous/next
  buttons, arrow-key-free hover pause, and touch swipe on mobile.
- The header and utility bar are transparent over the slideshow and switch to a white
  bar with dark text once you scroll past the hero.

## Greeting and scroll effects

- **`components/ScrollSnow.tsx`** — snow that begins once the hero is behind you. Flakes
  stream downward with your scrolling; when the page stops they slow to a halt and a few
  come to rest on the screen before melting away. Returning to the hero clears the sky.
  Rendered as three canvas rasters (blurred, then composited) so dense snow stays cheap.
- **`components/WaveHands.tsx`** — two small gloved hands (cuff in brand rust) that wave
  hello from the bottom-left corner after the hero, with a brief "Hello" bubble. They are
  decorative only: dismissed by the close button, remembered for the session, disabled for
  `prefers-reduced-motion` users, and never focusable.

Both use the same hero threshold (`#top` on the home page, `[data-hero]` on section pages).

## Smoke system

`components/Smoke.tsx` provides three layers:

| Export | Use |
| --- | --- |
| `SiteSmoke` | fixed, site-wide cold vapour — five slow plumes drifting above every section |
| `PanelSmoke` | local vapour for the hero, gallery and photographic panels (`variant="floor"` adds rolling ground mist) |
| `SmokeTexture` | SVG `feTurbulence` vapour texture; `animated` is enabled only in the hero so the noise animation stays cheap |

The plumes animate with transforms only (blurred rasters are reused), and the turbulence
filter is rendered at low resolution and stretched.

## Motion policy

- **Data motion only where it means something:** the live conditions panel breathes inside
  a documented band, the 24-hour trace draws itself with a probe travelling along the
  series, the process rail fills as stages are selected, the pricing figures animate when
  the basis changes.
- **Section entry:** a single subtle reveal (`opacity` + 14 px) driven by
  `components/RevealOnScroll.tsx`.
- **Cold-storage signature:** very sparse, slow snowfall inside photographic panels
  (`components/Snowfall.tsx`, deterministic PRNG so server and client render identically).
- Everything collapses to near-zero motion under `prefers-reduced-motion: reduce`.

## Structure

```
app/
  layout.tsx      metadata, JSON-LD, locale boot script, header, footer, smoke, reveal runtime
  page.tsx        home: hero + tile mosaic + photograph ribbon
  facility/ capabilities/ regimes/ monitoring/ contact/   section pages
  globals.css     design tokens, component classes (.card, .btn, .field, .label…),
                  text-hover rules, tile states, viewport-height boxes, keyframes
  icon.svg        favicon
  error.tsx       route error boundary (translated, with retry)
  global-error.tsx  last-resort boundary with self-contained styles
components/
  SiteHeader, Footer, Hero, PageHero, PageOutro, SectionTile, ExploreGrid,
  ImageRibbon, LiveConditions, Compliance, Chain, Services, Zones, Facility,
  Monitoring, Industries, Testimonials, Faq, Contact, ContactChannels, Gallery,
  SectionHeading, Smoke, SubscribeForm, RevealOnScroll, Icons, WhatsAppWidget,
  LanguageProvider, LanguageChanger, SkipLink
lib/
  i18n/           typed dictionaries (en, ur, ar) and the locale registry
  site.ts         non-translatable config: brand, numbers, e-mail, socials, contact channels
  media.ts        locale-independent photographs and structural keys
  rand.ts         deterministic PRNG for snow and temperature series
public/images/    generated facility photography
```

## Re-branding

Company name, phone numbers, e-mail address, social links and the contact-channel list live
in `lib/site.ts`; every word a visitor reads lives in `lib/i18n` — edit `en.ts` and mirror the
change in `ur.ts` and `ar.ts`. The palette is defined once in `tailwind.config.ts` (`ink`
navy, `ice` cool ramp, `ember` rust) and consumed through the component classes in
`app/globals.css`, so a colour change is a single edit.
