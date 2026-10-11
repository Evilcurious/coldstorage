/**
 * Single source of truth for brand, contact and commercial copy.
 * Change the values here to re-brand the whole site.
 */

export const site = {
  name: "Tahseen Jaber Cold Storage",
  shortName: "Tahseen Jaber",
  tagline: "Precision cold chain infrastructure",
  description:
    "Temperature-controlled warehousing and cold-chain logistics in Baghdad: blast freezing to −25 °C, validated 2–8 °C pharmaceutical rooms and 24/7 monitored operations.",
  location: "Uuayrij Industrial Area, Baghdad",
  phone: "+964 770 450 2200",
  phoneHref: "tel:+9647704502200",
  whatsapp: "https://wa.me/9647704502200",
  email: "commercial@tahseenjaber.com",
  hours: "Open 24 hours, 365 days",
  founded: 2014,
} as const;

export const nav = [
  { label: "Capabilities", href: "#services" },
  { label: "Temperature regimes", href: "#zones" },
  { label: "Infrastructure", href: "#facility" },
  { label: "Monitoring", href: "#monitoring" },
  { label: "Commercial", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

export type HeroStat = { value: number; suffix: string; label: string };

export const heroStats: HeroStat[] = [
  { value: 18000, suffix: "", label: "Pallet positions" },
  { value: 25, suffix: " °C", label: "Coldest room" },
  { value: 99.98, suffix: "%", label: "Temperature uptime" },
  { value: 24, suffix: "/7", label: "Monitored operations" },
];

export const certifications = [
  {
    name: "ISO 22000:2018",
    detail: "Food safety management system, independently audited",
  },
  {
    name: "HACCP",
    detail: "Hazard analysis and critical control point programme",
  },
  {
    name: "GDP compliant",
    detail: "Good distribution practice for pharmaceutical cargo",
  },
  {
    name: "Halal handling",
    detail: "Segregated storage and handling lines on request",
  },
] as const;

export type Step = {
  id: string;
  title: string;
  temp: string;
  duration: string;
  body: string;
  icon: "truck" | "snowflake" | "thermometer" | "package";
};

export const chain: Step[] = [
  {
    id: "receive",
    title: "Receiving & intake",
    temp: "+4 °C",
    duration: "Dock-to-room in 0 min",
    body: "Inbound vehicles back directly onto six refrigerated docks. Cargo is weighed, scanned and core-probed before it leaves the trailer.",
    icon: "truck",
  },
  {
    id: "blast",
    title: "Blast freezing",
    temp: "−25 °C",
    duration: "6 hour cycle",
    body: "High-velocity air blast freezes product through its thermal core, protecting texture, colour and moisture loss on thaw.",
    icon: "snowflake",
  },
  {
    id: "store",
    title: "Deep frozen storage",
    temp: "−22 °C",
    duration: "Up to 24 months",
    body: "Narrow-aisle racking in independently insulated rooms, each served by its own redundant refrigeration circuit.",
    icon: "thermometer",
  },
  {
    id: "dispatch",
    title: "Picking & dispatch",
    temp: "−18 °C",
    duration: "45 minute turnaround",
    body: "FEFO picking under cold-safe lighting, loaded into pre-cooled trailers with sealed temperature loggers on every consignment.",
    icon: "package",
  },
];

export type Service = {
  title: string;
  body: string;
  icon: "snowflake" | "package" | "thermometer" | "clipboard" | "truck" | "shield";
  meta: string;
};

export const services: Service[] = [
  {
    title: "Blast freezing",
    body: "Rapid −25 °C hard freeze for fresh produce, poultry, red meat and seafood, with an unbroken cold chain from intake to pallet.",
    icon: "snowflake",
    meta: "From −25 °C",
  },
  {
    title: "Frozen & chilled storage",
    body: "18,000 pallet positions across four temperature regimes, with narrow-aisle access and per-pallet temperature history.",
    icon: "package",
    meta: "Four regimes",
  },
  {
    title: "Pharmaceutical cold rooms",
    body: "Validated 2–8 °C rooms with continuous mapping, alarmed excursion limits and audit-ready documentation for regulated cargo.",
    icon: "thermometer",
    meta: "2–8 °C validated",
  },
  {
    title: "Inventory management",
    body: "Barcoded pallet tracking, real-time stock visibility and FEFO rotation, with monthly reconciliation against your own records.",
    icon: "clipboard",
    meta: "Live stock data",
  },
  {
    title: "Refrigerated distribution",
    body: "Pre-cooled trailers with dual temperature recorders covering city and interstate delivery windows on fixed schedules.",
    icon: "truck",
    meta: "Nationwide",
  },
  {
    title: "Cold-chain advisory",
    body: "Room design, refrigeration sizing and packaging studies for producers establishing frozen export programmes for the first time.",
    icon: "shield",
    meta: "Engineering support",
  },
];

export type Zone = {
  id: string;
  label: string;
  temp: string;
  numeric: number;
  accent: string;
  body: string;
  uses: string[];
  image: string;
  specs: { label: string; value: string }[];
};

export const zones: Zone[] = [
  {
    id: "frozen",
    label: "Deep frozen",
    temp: "−25 °C",
    numeric: -25,
    accent: "#1470AC",
    body: "Our coldest rooms hold hard-frozen cargo for extended periods, with nitrogen-backed backup compressors and twice-hourly probe checks.",
    uses: ["Frozen meat & poultry", "Seafood", "Ice cream", "Long-hold produce"],
    image: "/images/frozen-racking.jpg",
    specs: [
      { label: "Set point", value: "−25.0 °C" },
      { label: "Permitted deviation", value: "±1.0 °C" },
      { label: "Relative humidity", value: "70 %" },
      { label: "Capacity", value: "7,400 pallets" },
    ],
  },
  {
    id: "chilled",
    label: "Chilled",
    temp: "0 °C",
    numeric: 0,
    accent: "#2A89C8",
    body: "A gently chilled regime for fresh produce and dairy requiring air movement, controlled humidity and daily rotation.",
    uses: ["Dairy & eggs", "Fresh produce", "Chilled meat", "Bakery inputs"],
    image: "/images/hero-facility.jpg",
    specs: [
      { label: "Set point", value: "0.0 °C" },
      { label: "Permitted deviation", value: "±1.0 °C" },
      { label: "Relative humidity", value: "88 %" },
      { label: "Capacity", value: "5,100 pallets" },
    ],
  },
  {
    id: "pharma",
    label: "Pharmaceutical",
    temp: "2–8 °C",
    numeric: 5,
    accent: "#57A8DE",
    body: "Validated rooms for regulated product, with calibrated loggers, escalation procedures and exportable records for inspections.",
    uses: ["Pharmaceuticals", "Medical devices", "Cosmetics", "Seeds & cultures"],
    image: "/images/pharma-coldroom.jpg",
    specs: [
      { label: "Set point", value: "+5.0 °C" },
      { label: "Permitted deviation", value: "±0.5 °C" },
      { label: "Relative humidity", value: "60 %" },
      { label: "Capacity", value: "2,300 pallets" },
    ],
  },
];

export const facilityStats = [
  { value: "18,000", label: "Pallet positions", detail: "across four regimes" },
  { value: "6", label: "Refrigerated docks", detail: "direct, no warm transfer" },
  { value: "4.2 MW", label: "Installed cooling", detail: "dual redundant circuits" },
  { value: "12", label: "Validated cold rooms", detail: "independently mapped" },
];

export const capabilities = [
  {
    title: "Redundant refrigeration",
    body: "N+1 compressors and dual feeders, with a standby generator sized to hold every room at set point for 72 hours.",
    stat: "72 h autonomy",
  },
  {
    title: "Documented temperature history",
    body: "Every room, door and pallet event is timestamped and exportable in a format your auditors can read.",
    stat: "2,880 samples / room / day",
  },
  {
    title: "Efficient plant operation",
    body: "Heat reclaim, floating head pressure and CO₂-ready systems reduce energy per pallet stored year on year.",
    stat: "18 % less kWh / pallet",
  },
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
    blurb: "Short-hold chilled capacity for fresh and seasonal volume.",
    pallet: 34,
    tonne: 52,
    features: [
      "Chilled 0 °C rooms",
      "Per-pallet temperature log",
      "Monthly stock reconciliation",
      "Client stock portal",
      "No long-term commitment",
    ],
  },
  {
    name: "Deep Freeze",
    blurb: "Long-hold frozen storage, our most widely used agreement.",
    pallet: 26,
    tonne: 41,
    featured: true,
    features: [
      "Frozen −22 °C storage & blast freezing",
      "FEFO rotation included",
      "Named account manager",
      "24/7 emergency intake line",
      "Automated excursion alerts",
      "Quarterly cold-chain review",
    ],
  },
  {
    name: "Pharma Assured",
    blurb: "Validated capacity for regulated and specialty cargo.",
    pallet: 68,
    tonne: 96,
    features: [
      "Validated 2–8 °C cold rooms",
      "Mapping & calibration records",
      "Excursion escalation SLA",
      "Sealed transport loggers",
      "Audit-ready documentation",
    ],
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
  "Import & export",
];

export const testimonials = [
  {
    quote:
      "We moved 400 tonnes of frozen poultry through their blast freezers in a single season. Nothing arrived soft, and their stock reports reconciled to the kilo.",
    name: "National food distributor",
    role: "Frozen poultry, 400 t in season",
  },
  {
    quote:
      "The 2–8 °C rooms came with full mapping documentation, which is precisely what our audit required. Excursion alerts reach us before our own team notices.",
    name: "Pharmaceutical wholesaler",
    role: "Qualified person, import & distribution",
  },
  {
    quote:
      "Twenty-two months of continuous storage for our export programme, with the same account manager throughout. Predictable, cold and uneventful.",
    name: "Frozen export producer",
    role: "Operations director",
  },
];

export const faqs = [
  {
    q: "How quickly can you accept a new consignment?",
    a: "Emergency intake is available 24 hours a day. Send the product type, pallet count and target temperature and we can normally reserve a dock and a room the same day.",
  },
  {
    q: "Is blast freezing available as a standalone service?",
    a: "Yes. Many clients use us purely for the −25 °C hard freeze and then collect their own product for export. Blast freezing is billed per tonne of product rather than per pallet position.",
  },
  {
    q: "Who owns and maintains the temperature records?",
    a: "You do. Room, door and pallet temperatures are logged continuously, and the full history is available on request in a format your auditors can read.",
  },
  {
    q: "What happens during a power failure?",
    a: "Dual feeders and a redundant standby generator carry the load automatically. Rooms hold set point within a tested 72-hour autonomy window, and alarms escalate to on-call engineers within seconds.",
  },
  {
    q: "Can you store pharmaceuticals and food in the same facility?",
    a: "Yes, in fully segregated rooms with separate access routes and independent documentation, so regulated product never shares a cold chain with food-grade cargo.",
  },
  {
    q: "Is there a minimum storage period?",
    a: "Chilled Flex and Deep Freeze agreements carry no long-term commitment. Pharma Assured requires a short qualification period, because validated rooms must be re-mapped for each new product family.",
  },
];

export const footerLinks = [
  {
    heading: "Capabilities",
    links: [
      { label: "Blast freezing", href: "#services" },
      { label: "Frozen & chilled storage", href: "#services" },
      { label: "Pharmaceutical cold rooms", href: "#zones" },
      { label: "Inventory management", href: "#services" },
      { label: "Refrigerated distribution", href: "#services" },
    ],
  },
  {
    heading: "Operations",
    links: [
      { label: "Temperature regimes", href: "#zones" },
      { label: "Monitoring & compliance", href: "#monitoring" },
      { label: "Infrastructure", href: "#facility" },
      { label: "Commercial terms", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Contact", href: "#contact" },
      { label: "Book a site visit", href: "#contact" },
      { label: "Careers", href: "#contact" },
      { label: "Compliance & certificates", href: "#monitoring" },
      { label: "Request a quotation", href: "#contact" },
    ],
  },
] as const;
