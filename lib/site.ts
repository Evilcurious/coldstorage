/**
 * Single source of truth for brand, contact and commercial copy.
 * Copy is kept deliberately short — the site leans on photography.
 */

export const site = {
  name: "Tahseen Jaber Cold Storage",
  /** wordmark lines, as set in the logo */
  wordmark: "Tahseen Jaber",
  wordmarkSub: "Cold Storage",
  shortName: "Tahseen Jaber",
  tagline: "Precision cold chain infrastructure",
  description:
    "Temperature-controlled warehousing in Baghdad: blast freezing to −25 °C, validated 2–8 °C pharmaceutical rooms and monitored cold-chain operations, 24 hours a day.",
  location: "Uuayrij Industrial Area, Baghdad",
  phone: "+964 770 450 2200",
  phoneHref: "tel:+9647704502200",
  whatsapp: "https://wa.me/9647704502200",
  email: "commercial@tahseenjaber.com",
  hours: "Open 24 hours, 365 days",
  founded: 2014,
} as const;

/* ------------------------------------------------------------------ *
 *  Hero slideshow
 * ------------------------------------------------------------------ */
export type HeroSlide = {
  src: string;
  alt: string;
  label: string;
  temp: string;
  detail: string;
};

export const heroSlides: HeroSlide[] = [
  {
    src: "/images/hero-facility.jpg",
    alt: "Racked pallet positions inside a temperature-controlled cold storage room",
    label: "Frozen storage",
    temp: "−25 °C",
    detail: "18,000 pallet positions",
  },
  {
    src: "/images/cold-corridor.jpg",
    alt: "Cold vapour rolling along an insulated corridor between cold rooms",
    label: "Insulated transfer",
    temp: "No warm air",
    detail: "Dock to room without interruption",
  },
  {
    src: "/images/forklift-cold.jpg",
    alt: "Electric forklift moving a pallet through a frozen storage aisle",
    label: "Aisle operations",
    temp: "−22 °C",
    detail: "Narrow-aisle racking",
  },
  {
    src: "/images/blast-freezer.jpg",
    alt: "Frosted evaporator fans inside a blast freezing room",
    label: "Blast freezing",
    temp: "−25 °C",
    detail: "Six hour freeze cycle",
  },
  {
    src: "/images/loading-dock.jpg",
    alt: "Refrigerated trailers backed into the facility loading docks",
    label: "Refrigerated docks",
    temp: "−18 °C",
    detail: "Sealed dock shelters",
  },
];

/* ------------------------------------------------------------------ *
 *  Facility gallery
 * ------------------------------------------------------------------ */
export const gallery = [
  {
    src: "/images/cold-corridor.jpg",
    alt: "Cold vapour drifting through an insulated corridor",
    caption: "Transfer corridor",
    detail: "Sealed, insulated, −18 °C",
    span: "2x2",
  },
  {
    src: "/images/frost-macro.jpg",
    alt: "Ice crystals forming on chilled pipework",
    caption: "Frost control",
    detail: "Overnight defrost cycles",
    span: "1x2",
  },
  {
    src: "/images/seafood-pallets.jpg",
    alt: "Frozen seafood cartons on pallets under frost",
    caption: "Deep frozen cargo",
    detail: "−25 °C hard freeze",
    span: "1x1",
  },
  {
    src: "/images/technician-panel.jpg",
    alt: "Technician inspecting a refrigeration control panel",
    caption: "Plant inspection",
    detail: "Scheduled twice daily",
    span: "1x1",
  },
  {
    src: "/images/exterior-dusk.jpg",
    alt: "Cold storage facility exterior at dusk",
    caption: "Dispatch at blue hour",
    detail: "Six refrigerated docks",
    span: "2x1",
  },
  {
    src: "/images/tablet-check.jpg",
    alt: "Gloved hands checking a temperature dashboard on a tablet",
    caption: "Temperature checks",
    detail: "1,204 sensors",
    span: "1x1",
  },
  {
    src: "/images/pharma-coldroom.jpg",
    alt: "Validated pharmaceutical cold room with monitoring equipment",
    caption: "Pharmaceutical rooms",
    detail: "Validated 2–8 °C",
    span: "1x1",
  },
  {
    src: "/images/frozen-racking.jpg",
    alt: "Frost on racking inside a frozen storage room",
    caption: "Long-hold frozen storage",
    detail: "Up to 24 months",
    span: "2x1",
  },
  {
    src: "/images/control-room.jpg",
    alt: "Cold-chain monitoring station with temperature displays",
    caption: "Monitoring station",
    detail: "Events logged continuously",
    span: "2x1",
  },
] as const;

/* ------------------------------------------------------------------ *
 *  Process, services, regimes
 * ------------------------------------------------------------------ */
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
    title: "Receiving",
    temp: "+4 °C",
    duration: "No ambient exposure",
    body: "Trailers seal to six refrigerated docks and product is core-probed before unloading.",
    icon: "truck",
  },
  {
    id: "blast",
    title: "Blast freezing",
    temp: "−25 °C",
    duration: "6 hour cycle",
    body: "High-velocity air freezes product through its centre, protecting texture and moisture.",
    icon: "snowflake",
  },
  {
    id: "store",
    title: "Frozen storage",
    temp: "−22 °C",
    duration: "Up to 24 months",
    body: "Narrow-aisle racking in insulated rooms, each on its own redundant circuit.",
    icon: "thermometer",
  },
  {
    id: "dispatch",
    title: "Dispatch",
    temp: "−18 °C",
    duration: "45 minute turnaround",
    body: "FEFO picking into pre-cooled trailers with sealed temperature loggers.",
    icon: "package",
  },
];

export type Service = {
  title: string;
  body: string;
  image: string;
  icon: "snowflake" | "package" | "thermometer" | "clipboard" | "truck" | "shield";
  meta: string;
};

export const services: Service[] = [
  {
    title: "Blast freezing",
    body: "Rapid −25 °C hard freeze from intake to pallet.",
    image: "/images/blast-freezer.jpg",
    icon: "snowflake",
    meta: "−25 °C",
  },
  {
    title: "Frozen & chilled storage",
    body: "18,000 pallet positions across four regimes.",
    image: "/images/frozen-racking.jpg",
    icon: "package",
    meta: "Four regimes",
  },
  {
    title: "Pharmaceutical cold rooms",
    body: "Validated 2–8 °C rooms with mapped sensors.",
    image: "/images/pharma-coldroom.jpg",
    icon: "thermometer",
    meta: "2–8 °C",
  },
  {
    title: "Inventory management",
    body: "Barcoded pallets, live stock data, FEFO rotation.",
    image: "/images/tablet-check.jpg",
    icon: "clipboard",
    meta: "Live data",
  },
  {
    title: "Refrigerated distribution",
    body: "Pre-cooled trailers with dual recorders.",
    image: "/images/loading-dock.jpg",
    icon: "truck",
    meta: "Nationwide",
  },
  {
    title: "Cold-chain advisory",
    body: "Room design, refrigeration sizing and packaging studies.",
    image: "/images/technician-panel.jpg",
    icon: "shield",
    meta: "Engineering",
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
    body: "Our coldest rooms, with nitrogen-backed backup compressors and twice-hourly probe checks.",
    uses: ["Frozen meat & poultry", "Seafood", "Ice cream", "Long-hold produce"],
    image: "/images/seafood-pallets.jpg",
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
    body: "For fresh produce and dairy needing air movement, humidity control and daily rotation.",
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
    body: "Validated rooms with calibrated loggers, escalation procedures and exportable records.",
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

/** Three infrastructure facts — headline and figure only. */
export const capabilities = [
  { title: "Redundant refrigeration", stat: "72 h autonomy" },
  { title: "Documented temperature history", stat: "2,880 samples / room / day" },
  { title: "Efficient plant operation", stat: "18 % less kWh / pallet" },
];

/* ------------------------------------------------------------------ *
 *  Commercial
 * ------------------------------------------------------------------ */
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
    blurb: "Short-hold chilled capacity.",
    pallet: 34,
    tonne: 52,
    features: [
      "Chilled 0 °C rooms",
      "Per-pallet temperature log",
      "Monthly reconciliation",
      "Client stock portal",
      "No long-term commitment",
    ],
  },
  {
    name: "Deep Freeze",
    blurb: "Long-hold frozen storage.",
    pallet: 26,
    tonne: 41,
    featured: true,
    features: [
      "Frozen −22 °C & blast freezing",
      "FEFO rotation included",
      "Named account manager",
      "24/7 emergency intake",
      "Automated excursion alerts",
      "Quarterly cold-chain review",
    ],
  },
  {
    name: "Pharma Assured",
    blurb: "Validated regulated storage.",
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
  "Bakery",
  "Food service",
  "Retail distribution",
  "Ice cream",
  "Seeds & agriculture",
  "Import & export",
];

export const certifications = [
  { name: "ISO 22000:2018", detail: "Food safety management" },
  { name: "HACCP", detail: "Critical control point programme" },
  { name: "GDP compliant", detail: "Pharmaceutical distribution" },
  { name: "Halal handling", detail: "Segregated lines on request" },
] as const;

export const testimonials = [
  {
    quote:
      "400 tonnes of frozen poultry in one season and nothing arrived soft. Their stock reports reconciled to the kilo.",
    name: "National food distributor",
    role: "Frozen poultry",
  },
  {
    quote:
      "Full mapping documentation came with the 2–8 °C rooms — exactly what our audit required.",
    name: "Pharmaceutical wholesaler",
    role: "Qualified person",
  },
  {
    quote:
      "Twenty-two months of continuous storage with the same account manager. Predictable and uneventful.",
    name: "Frozen export producer",
    role: "Operations director",
  },
];

export const faqs = [
  {
    q: "How quickly can you accept a new consignment?",
    a: "Emergency intake runs 24 hours a day. Send the product type, pallet count and target temperature and we can normally reserve a dock and a room the same day.",
  },
  {
    q: "Is blast freezing available as a standalone service?",
    a: "Yes. Many clients use us purely for the −25 °C hard freeze and collect the product themselves. It is billed per tonne rather than per pallet position.",
  },
  {
    q: "Who owns the temperature records?",
    a: "You do. Room, door and pallet temperatures are logged continuously and the full history is available on request in an auditor-readable format.",
  },
  {
    q: "What happens during a power failure?",
    a: "Dual feeders and a redundant standby generator carry the load automatically, holding set point within a tested 72-hour autonomy window.",
  },
  {
    q: "Can pharmaceuticals and food share the facility?",
    a: "They share the campus, never the cold chain: segregated rooms, separate access routes and independent documentation.",
  },
  {
    q: "Is there a minimum storage period?",
    a: "Chilled Flex and Deep Freeze carry no long-term commitment. Pharma Assured requires a short qualification period for each new product family.",
  },
];

export const footerLinks = [
  {
    heading: "Capabilities",
    links: [
      { label: "Blast freezing", href: "/capabilities" },
      { label: "Frozen & chilled storage", href: "/capabilities" },
      { label: "Pharmaceutical rooms", href: "/regimes" },
      { label: "Inventory management", href: "/capabilities" },
      { label: "Distribution", href: "/capabilities" },
    ],
  },
  {
    heading: "Facility",
    links: [
      { label: "Gallery", href: "/facility" },
      { label: "Temperature regimes", href: "/regimes" },
      { label: "Monitoring", href: "/monitoring" },
      { label: "Compliance", href: "/monitoring" },
      { label: "Commercial terms", href: "/commercial" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Book a site visit", href: "/contact" },
      { label: "Careers", href: "/contact" },
      { label: "FAQ", href: "/monitoring" },
      { label: "Request a quotation", href: "/contact" },
    ],
  },
] as const;
