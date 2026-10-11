# Tahseen Jaber Cold Storage — website

Marketing site for a temperature-controlled warehousing and cold-chain logistics facility,
built with Next.js 15, React 19, Tailwind CSS and lucide icons.

The visual language is deliberately corporate: white and light-blue surfaces, slate
neutrals, a single restrained accent blue, tight grid alignment and typography-led
layout. Motion is used only where it communicates something — live temperature data,
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
| `/commercial` | Per-pallet / per-tonne pricing, cost estimator, sectors, references |
| `/contact` | Commercial channels, structured enquiry form, FAQ |

`lib/pages.ts` is the registry that drives the navigation, the home tiles, the page
headers and the "continue through the facility" cross-links on every page.

## Text behaviour

Text reacts to the pointer. On dark surfaces white type lifts to light blue
(`#94C9EC`); on light surfaces ink type lifts to the accent blue (`#2A89C8`). The
rules live in `app/globals.css` and are scoped by `.on-dark` / `.on-light` wrappers,
so a dark band nested inside a light page still behaves correctly.

Photographic tiles carry no text at rest — pointing at one fades its label in, in
light blue, over a gradient scrim.

## Hero slideshow

The hero is a full-viewport image slideshow rather than a text block:

- **Five slides** (`hero-facility`, `cold-corridor`, `forklift-cold`, `blast-freezer`,
  `loading-dock`), auto-advancing every **7 seconds**, with minimal text: a short label, the
  regime temperature and one detail line.
- **Alternating travel direction** — slides travel right-to-left, then left-to-right, on
  every automatic change, with a slow Ken Burns drift inside each frame.
- **Controls:** progress indicators that fill over the slide duration, previous/next
  buttons, arrow-key-free hover pause, and touch swipe on mobile.
- The header and utility bar are transparent over the slideshow and switch to a white
  bar with dark text once you scroll past the hero.

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
  layout.tsx      metadata, JSON-LD, header, footer, smoke, reveal runtime
  page.tsx        home: hero + tile mosaic + photograph ribbon
  facility/ capabilities/ regimes/ monitoring/ commercial/ contact/   section pages
  globals.css     design tokens, component classes (.card, .btn, .field, .label…),
                  text-hover rules, tile states, keyframes
  icon.svg        favicon
components/
  SiteHeader, Footer, Hero, PageHero, PageOutro, SectionTile, ExploreGrid,
  ImageRibbon, LiveConditions, Compliance, Chain, Services, Zones, Facility,
  Monitoring, Pricing, Industries, Testimonials, Faq, Contact, Gallery,
  SectionHeading, Smoke, Snowfall, CountUp, SubscribeForm, RevealOnScroll,
  Icons, WhatsAppWidget
lib/
  site.ts         all copy, contact details, regimes, plans and FAQs
  pages.ts        page registry driving navigation, tiles and cross-links
  rand.ts         deterministic PRNG for snow and temperature series
public/images/    generated facility photography
```

## Re-branding

Company name, contact details, services, temperature regimes, commercial plans and FAQ
answers all live in `lib/site.ts`. The palette is defined once in `tailwind.config.ts`
(`ink` navy, `ice` accent scale) and consumed through the component classes in
`app/globals.css`, so a colour change is a single edit.
