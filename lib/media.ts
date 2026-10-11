/**
 * Locale-independent media and structure. Text lives in lib/i18n so it can be
 * translated; these keys keep the two sides in sync and type-checked.
 */

export const pageSlugs = [
  "facility",
  "capabilities",
  "regimes",
  "monitoring",
  "contact",
] as const;
export type PageSlug = (typeof pageSlugs)[number];

/* ---------------- hero slideshow ---------------- */
export const heroSlides = [
  { key: "frozen", src: "/images/hero-facility.jpg" },
  { key: "corridor", src: "/images/cold-corridor.jpg" },
  { key: "aisle", src: "/images/forklift-cold.jpg" },
  { key: "blast", src: "/images/blast-freezer.jpg" },
  { key: "dock", src: "/images/loading-dock.jpg" },
] as const;
export type HeroKey = (typeof heroSlides)[number]["key"];

/* ---------------- page banners ---------------- */
export const pageTiles: Record<PageSlug, { src: string; alt: string }> = {
  facility: {
    src: "/images/cold-corridor.jpg",
    alt: "Cold vapour drifting through an insulated transfer corridor",
  },
  capabilities: {
    src: "/images/blast-freezer.jpg",
    alt: "Frosted evaporator fans inside a blast freezing room",
  },
  regimes: {
    src: "/images/seafood-pallets.jpg",
    alt: "Frozen cartons on pallets beneath frost",
  },
  monitoring: {
    src: "/images/control-room.jpg",
    alt: "Cold-chain monitoring station with temperature displays",
  },
  contact: {
    src: "/images/tablet-check.jpg",
    alt: "Gloved hands checking a temperature dashboard on a tablet",
  },
};

/* ---------------- facility gallery ---------------- */
export const galleryTiles = [
  { key: "corridor", src: "/images/cold-corridor.jpg", span: "2x2" },
  { key: "frost", src: "/images/frost-macro.jpg", span: "1x2" },
  { key: "seafood", src: "/images/seafood-pallets.jpg", span: "1x1" },
  { key: "plant", src: "/images/technician-panel.jpg", span: "1x1" },
  { key: "dusk", src: "/images/exterior-dusk.jpg", span: "2x1" },
  { key: "tablet", src: "/images/tablet-check.jpg", span: "1x1" },
  { key: "pharma", src: "/images/pharma-coldroom.jpg", span: "1x1" },
  { key: "racking", src: "/images/frozen-racking.jpg", span: "2x1" },
  { key: "control", src: "/images/control-room.jpg", span: "2x1" },
] as const;
export type GalleryKey = (typeof galleryTiles)[number]["key"];

/* ---------------- services ---------------- */
export const serviceMedia = {
  blast: "/images/blast-freezer.jpg",
  storage: "/images/frozen-racking.jpg",
  pharma: "/images/pharma-coldroom.jpg",
  inventory: "/images/tablet-check.jpg",
  distribution: "/images/loading-dock.jpg",
  advisory: "/images/technician-panel.jpg",
} as const;
export type ServiceKey = keyof typeof serviceMedia;
export const serviceKeys = Object.keys(serviceMedia) as ServiceKey[];

/* ---------------- temperature regimes ---------------- */
export const zoneMedia = {
  frozen: { src: "/images/seafood-pallets.jpg", accent: "#1B3A63", numeric: -25 },
  chilled: { src: "/images/hero-facility.jpg", accent: "#35618F", numeric: 0 },
  pharma: { src: "/images/pharma-coldroom.jpg", accent: "#6E8AA6", numeric: 5 },
} as const;
export type ZoneKey = keyof typeof zoneMedia;
export const zoneKeys = Object.keys(zoneMedia) as ZoneKey[];

/* ---------------- cold chain stages ---------------- */
export const chainKeys = ["receive", "blast", "store", "dispatch"] as const;
export type ChainKey = (typeof chainKeys)[number];

/* ---------------- industries ---------------- */
export const industryKeys = [
  "frozen",
  "meat",
  "seafood",
  "dairy",
  "produce",
  "pharma",
  "bakery",
  "service",
  "retail",
  "icecream",
  "seeds",
  "trade",
] as const;
export type IndustryKey = (typeof industryKeys)[number];
