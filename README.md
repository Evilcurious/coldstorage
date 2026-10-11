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

## Page structure

| Section | Purpose |
| --- | --- |
| Utility bar + header | address and email, 24/7 acceptance status, intake phone, scroll progress |
| Hero | positioning statement, headline metrics, facility photograph, live conditions panel |
| Compliance strip | ISO 22000, HACCP, GDP and Halal handling credentials |
| Cold chain process | four documented stages with temperature and cycle time for each |
| Capabilities | six services including blast freezing, pharma rooms and distribution |
| Temperature regimes | interactive −25 °C / 0 °C / 2–8 °C selector plotted on one operating scale |
| Infrastructure | facility photography, redundancy and documentation capabilities, plant metrics |
| Monitoring & compliance | 24-hour temperature trace, live readout, event log, client data access |
| Commercial terms | per-pallet / per-tonne rates, agreement comparison, indicative cost estimator |
| Sectors | twelve customer categories served |
| Client experience | three outcome-led references |
| FAQ | six operational and commercial questions |
| Contact | commercial contact channels and a structured enquiry form, on a dark band |
| Footer | navigation, capacity updates, legal line |

A discreet contact button for the operations desk floats in the bottom-right corner.

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
  layout.tsx      metadata, JSON-LD, reveal runtime
  page.tsx        section composition
  globals.css     design tokens, component classes (.card, .btn, .field, .label…), keyframes
  icon.svg        favicon
components/
  SiteHeader, Hero, LiveConditions, Compliance, Chain, Services, Zones, Facility,
  Monitoring, Pricing, Industries, Testimonials, Faq, Contact, Footer,
  SectionHeading, Snowfall, CountUp, SubscribeForm, RevealOnScroll, Icons, WhatsAppWidget
lib/
  site.ts         all copy, contact details, regimes, plans and FAQs
  rand.ts         deterministic PRNG for snow and temperature series
public/images/    generated facility photography
```

## Re-branding

Company name, contact details, services, temperature regimes, commercial plans and FAQ
answers all live in `lib/site.ts`. The palette is defined once in `tailwind.config.ts`
(`ink` navy, `ice` accent scale) and consumed through the component classes in
`app/globals.css`, so a colour change is a single edit.
