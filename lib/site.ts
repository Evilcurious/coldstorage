/**
 * Single source of truth for brand, contact and marketing copy.
 * Change the values here to re-brand the whole site.
 */

export const site = {
  name: "Tahseen Jaber Cold Storage",
  shortName: "Tahseen Jaber",
  tagline: "Cold chain, kept calm.",
  description:
    "Light, modern cold storage warehousing — blast freezing, deep frozen storage and pharma-grade cold rooms monitored 24/7.",
  location: "Uuayrij Industrial Area, Baghdad",
  phone: "+964 770 450 2200",
  phoneHref: "tel:+9647704502200",
  whatsapp: "https://wa.me/9647704502200",
  email: "commercial@tahseenjaber.com",
  hours: "Open 24 / 7 — 365 days",
  founded: 2014,
} as const;

export const nav = [
  { label: "Cold chain", href: "#chain" },
  { label: "Services", href: "#services" },
  { label: "Temperature zones", href: "#zones" },
  { label: "Facility", href: "#facility" },
  { label: "Monitoring", href: "#monitoring" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

export type HeroStat = { value: number; suffix: string; label: string };

export const heroStats: HeroStat[] = [
  { value: 18000, suffix: "+", label: "Pallet positions" },
  { value: 25, suffix: " °C", label: "Coldest room (−25.0)" },
  { value: 99.98, suffix: "%", label: "Temperature uptime" },
  { value: 24, suffix: "/7", label: "Live monitoring" },
];

export type Step = {
  id: string;
  title: string;
  temp: string;
  minutes: string;
  body: string;
  icon: "truck" | "snowflake" | "thermometer" | "package";
};

export const chain: Step[] = [
  {
    id: "receive",
    title: "Receiving & intake",
    temp: "+4 °C",
    minutes: "0 min",
    body: "Inbound trucks back straight into a refrigerated dock. Cargo is weighed, scanned and temperature-probed before it ever meets warm air.",
    icon: "truck",
  },
  {
    id: "blast",
    title: "Blast freezing",
    temp: "−25 °C",
    minutes: "6 hrs",
    body: "High-velocity air blast freezes the core of every pallet fast enough to protect texture, colour and moisture.",
    icon: "snowflake",
  },
  {
    id: "store",
    title: "Deep frozen storage",
    temp: "−22 °C",
    minutes: "up to 24 mo",
    body: "Narrow-aisle racking in independently insulated rooms, each with its own redundant refrigeration circuit.",
    icon: "thermometer",
  },
  {
    id: "dispatch",
    title: "Picking & dispatch",
    temp: "−18 °C",
    minutes: "45 min",
    body: "FEFO picking under cold-safe lighting, loaded into pre-cooled trailers with sealed temperature loggers on every run.",
    icon: "package",
  },
];

export type Service = {
  title: string;
  body: string;
  icon:
    | "snowflake"
    | "package"
    | "thermometer"
    | "clipboard"
    | "truck"
    | "shield";
  tag: string;
};

export const services: Service[] = [
  {
    title: "Blast freezing",
    body: "Rapid −25 °C hard freeze for fresh produce, poultry, red meat and seafood — protected by an unbroken cold chain from intake.",
    icon: "snowflake",
    tag: "From −25 °C",
  },
  {
    title: "Frozen & chilled storage",
    body: "18,000 pallet positions across four temperature regimes, with narrow-aisle access and per-pallet temperature history.",
    icon: "package",
    tag: "4 regimes",
  },
  {
    title: "Pharma-grade cold rooms",
    body: "2–8 °C validated rooms with continuous mapping, alarmed excursions and audit-ready reports for regulated cargo.",
    icon: "thermometer",
    tag: "2–8 °C, validated",
  },
  {
    title: "Inventory management",
    body: "Barcoded pallets, real-time stock visibility and FEFO rotation so first-expiry stock always leaves first.",
    icon: "clipboard",
    tag: "Live stock view",
  },
  {
    title: "Refrigerated distribution",
    body: "A fleet of pre-cooled trailers with dual temperature recorders covering city and interstate delivery windows.",
    icon: "truck",
    tag: "Nationwide",
  },
  {
    title: "Cold-chain consulting",
    body: "Room design, refrigeration sizing and packaging studies for producers moving into frozen export for the first time.",
    icon: "shield",
    tag: "Advisory",
  },
];

export type Zone = {
  id: string;
  label: string;
  temp: string;
  numeric: number;
  min: number;
  max: number;
  accent: string;
  body: string;
  uses: string[];
  image: string;
};

export const zones: Zone[] = [
  {
    id: "frozen",
    label: "Deep frozen",
    temp: "−25 °C",
    numeric: -25,
    min: -30,
    max: 0,
    accent: "#1b7cc4",
    body: "Our coldest rooms hold hard-frozen cargo for months on end with nitrogen-backed backup compressors and twice-hourly probes.",
    uses: ["Frozen meat & poultry", "Seafood", "Ice cream", "Long-hold produce"],
    image: "/images/frozen-racking.jpg",
  },
  {
    id: "chilled",
    label: "Chilled",
    temp: "0 °C",
    numeric: 0,
    min: -2,
    max: 4,
    accent: "#2e9be6",
    body: "A gently chilled regime for fresh produce and dairy that still needs air movement, humidity control and daily rotation.",
    uses: ["Dairy & eggs", "Fresh produce", "Chilled meat", "Bakery input"],
    image: "/images/hero-facility.jpg",
  },
  {
    id: "pharma",
    label: "Pharma & specialty",
    temp: "+15 °C",
    numeric: 15,
    min: 2,
    max: 25,
    accent: "#57b7ef",
    body: "Thermostable and 2–8 °C rooms for regulated product, with calibrated loggers, alarm escalation and audit-ready exports.",
    uses: ["Pharmaceuticals", "Medical devices", "Cosmetics", "Seeds & cultures"],
    image: "/images/pharma-coldroom.jpg",
  },
];

export const facilityStats = [
  { value: "18,000", label: "Pallet positions", detail: "across four regimes" },
  { value: "6", label: "Refrigerated docks", detail: "drive-in, no warm transfer" },
  { value: "4.2 MW", label: "Installed cooling", detail: "dual redundant circuits" },
  { value: "12", label: "Validated cold rooms", detail: "independently mapped" },
];

export type Plan = {
  name: string;
  blurb: string;
  pallet: number;
  tonne: number;
  featured?: boolean;
  features: string[];
};

export const plans: Plan[] = [
  {
    name: "Chilled Flex",
    blurb: "Short-hold chilled space for fresh, seasonal volume.",
    pallet: 34,
    tonne: 52,
    features: [
      "Chilled 0 °C rooms",
      "Per-pallet temperature log",
      "Weekly stock reports",
      "Online stock portal",
      "No long-term contract",
    ],
  },
  {
    name: "Deep Freeze",
    blurb: "Our most-requested long-hold frozen storage.",
    pallet: 26,
    tonne: 41,
    featured: true,
    features: [
      "Frozen −22 °C & blast freezing",
      "FEFO rotation included",
      "Dedicated account manager",
      "24/7 emergency intake line",
      "Automated excursion alerts",
      "Quarterly cold-chain audit",
    ],
  },
  {
    name: "Pharma Assured",
    blurb: "Validated space for regulated and specialty cargo.",
    pallet: 68,
    tonne: 96,
    features: [
      "Validated 2–8 °C cold rooms",
      "Mapping & calibration files",
      "Excursion escalation SLA",
      "Sealed transport loggers",
      "Audit-ready documentation",
    ],
  },
];

export type Feature = { title: string; body: string; icon: "bolt" | "shield" | "gauge" | "leaf" };

export const features: Feature[] = [
  {
    title: "Cold chain, never broken",
    body: "Goods move between rooms through insulated tunnels and −18 °C vestibules. No pallet ever crosses warm air.",
    icon: "bolt",
  },
  {
    title: "Redundancy by design",
    body: "N+1 compressors, dual feeders and a standby generator sized to hold every room at set point for 72 hours.",
    icon: "shield",
  },
  {
    title: "Data you can audit",
    body: "Every pallet carries a temperature history. Every room, door and compressor event is timestamped and exportable.",
    icon: "gauge",
  },
  {
    title: "Efficient refrigeration",
    body: "Heat reclaim, floating head pressure and CO₂-ready systems cut energy per pallet year over year.",
    icon: "leaf",
  },
];

export const industries = [
  "Frozen foods",
  "Poultry & red meat",
  "Seafood",
  "Dairy",
  "Fresh produce",
  "Pharmaceuticals",
  "Bakery & confectionery",
  "Food service",
  "Retail distribution",
  "Ice cream",
  "Seeds & agriculture",
  "Importers & export",
];

export const testimonials = [
  {
    quote:
      "We moved 400 tonnes of frozen poultry into their blast freezers over one Ramadan season. Not a single pallet arrived soft, and their stock reports reconciled to the kilo.",
    name: "Distributor, frozen poultry",
    role: "National food distributor",
  },
  {
    quote:
      "The 2–8 °C rooms came with full mapping documentation, which is exactly what our audit needed. Excursion alerts reach us before our own team notices.",
    name: "Qualified person, pharma import",
    role: "Pharmaceutical wholesaler",
  },
  {
    quote:
      "Twenty-two months of continuous storage for our export programme, and the same account manager throughout. Predictable, cold and boring — we like boring.",
    name: "Operations director",
    role: "Frozen export producer",
  },
];

export const faqs = [
  {
    q: "How quickly can you accept a new consignment?",
    a: "Emergency intake is available 24/7. Send the product type, pallet count and target temperature and we can usually have a dock and a room reserved the same day.",
  },
  {
    q: "Do you offer blast freezing as a standalone service?",
    a: "Yes. Many clients use us purely for the −25 °C hard freeze, then collect their own product for export. Blast freezing is billed per tonne of product rather than per pallet position.",
  },
  {
    q: "Who owns and maintains the temperature records?",
    a: "You do. Every room, door and pallet temperature is logged continuously, and we hand over the full history on request — in exports your auditors can read.",
  },
  {
    q: "What happens if there is a power failure?",
    a: "Dual feeders and a redundant standby generator automatically carry the load. Rooms are held at set point with a tested 72-hour autonomy window, and alarms escalate to on-call engineers within seconds.",
  },
  {
    q: "Can I store pharma and food in the same facility?",
    a: "Segregated rooms, separate access routes and independent records keep regulated product completely separate from food-grade storage.",
  },
  {
    q: "Is there a minimum storage period?",
    a: "No. Chilled Flex and Deep Freeze plans have no long-term commitment. Pharma Assured includes a short qualification period because validated rooms must be rediscovered and mapped for every new product family.",
  },
];

export const footerLinks = [
  {
    heading: "Services",
    links: [
      { label: "Blast freezing", href: "#services" },
      { label: "Frozen & chilled storage", href: "#services" },
      { label: "Pharma cold rooms", href: "#zones" },
      { label: "Inventory management", href: "#services" },
      { label: "Distribution", href: "#services" },
    ],
  },
  {
    heading: "Facility",
    links: [
      { label: "Temperature zones", href: "#zones" },
      { label: "ColdSense monitoring", href: "#monitoring" },
      { label: "Infrastructure", href: "#facility" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Contact", href: "#contact" },
      { label: "Book a tour", href: "#contact" },
      { label: "Careers", href: "#contact" },
      { label: "Compliance", href: "#faq" },
      { label: "Request a quote", href: "#contact" },
    ],
  },
] as const;
