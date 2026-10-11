# Tahseen Jaber Cold Storage — website

A light, modern marketing site for a cold storage & cold-chain facility: white and
light-blue surfaces, drifting snow and frost animations, and interactive temperature
visuals built with Next.js 15, React 19, Tailwind CSS and lucide icons.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## What is on the page

| Section | Highlights |
| --- | --- |
| Sticky header | live "rooms at set point" readout, scroll-progress freeze line, mobile drawer |
| Hero | drifting snowfall, frost scan-line, floated **analogue temperature dial** with a breathing needle, count-up stats |
| Cold chain | auto-advancing 4-step journey with flowing dashed cold line and a temperature ribbon |
| Services | six service cards with ice-crystal hover, sheen sweep and gradient icon tiles |
| Temperature zones | interactive −25 °C / 0 °C / +15 °C selector, animated thermometer that fills to the chosen set point, per-zone cargo lists |
| Facility | image collage, floating frost card, infrastructure stats |
| ColdSense monitoring | animated 24 h temperature trace that draws itself with a travelling probe, room switcher, live event feed, second gauge |
| Pricing | per-pallet / per-tonne toggle with sliding gradient indicator, animated rate counters, interactive monthly estimator |
| Industries | two counter-scrolling marquees that pause on hover |
| Testimonials & FAQ | quote cards with frost hover, animated accordion |
| Contact | enquiry form with frosted success state, direct call/WhatsApp/email tiles, snowfall panel |
| Footer | brand block, link columns, newsletter capture, spinning snowflake watermark |

A floating tap-to-chat widget is always available in the bottom-right corner.

## Animations used

Tailwind keyframes in `tailwind.config.ts`: `snowfall`, `mistDrift`, `drift`,
`floatSlow`, `floatFast`, `spinSlow`, `pulseRing`, `frostBreathe`, `sheen`,
`lineFlow`, `riseFall`, `scan`, `marquee`, `needle`, `shimmerText` and the
scroll-reveal `enterUp`. Chart lines use the `frostCrawl` draw-on effect.
All motion is reduced to near zero under `prefers-reduced-motion: reduce`.

## Structure

```
app/
  layout.tsx      metadata, JSON-LD, mist + frost ambience, scroll-reveal runtime
  page.tsx        section composition
  globals.css     design tokens, components, keyframes
  icon.svg         favicon
components/       one file per section + shared primitives (Icons, Snowfall,
                  RevealOnScroll, CountUp, TempGauge, SectionHeading, SubscribeForm)
lib/site.ts       all copy, contact details, pricing, zones and FAQs in one place
lib/rand.ts       deterministic PRNG used by snow and the temperature traces
public/images/    generated facility photography
```

## Re-branding

Almost everything textual lives in `lib/site.ts` — company name, phone, WhatsApp link,
address, hours, services, zones, plans and FAQ answers. Colours are defined once in
`tailwind.config.ts` (`frost`, `ice`, `ink` palettes) and consumed through the
component classes in `app/globals.css`.
