/**
 * Page registry — every section of the site has its own page, and the home page
 * presents them as image-only tiles linking through.
 */

export type SitePage = {
  /** route, e.g. "/facility" */
  slug: string;
  /** short label used in navigation, tiles and cross-links */
  label: string;
  eyebrow: string;
  /** page-title length heading */
  title: string;
  /** one supporting line, page headers only */
  blurb: string;
  tile: { src: string; alt: string };
};

export const pages: SitePage[] = [
  {
    slug: "/facility",
    label: "Facility",
    eyebrow: "Infrastructure",
    title: "Twelve cold rooms, one uninterrupted cold chain",
    blurb:
      "Insulated panels, heated door frames and sealed transfer tunnels hold every room at set point while the docks stay busy.",
    tile: {
      src: "/images/cold-corridor.jpg",
      alt: "Cold vapour drifting through an insulated transfer corridor",
    },
  },
  {
    slug: "/capabilities",
    label: "Capabilities",
    eyebrow: "Services",
    title: "Six services covering the full cold chain",
    blurb:
      "Engage a single stage or hand us the journey from intake to final delivery.",
    tile: {
      src: "/images/blast-freezer.jpg",
      alt: "Frosted evaporator fans inside a blast freezing room",
    },
  },
  {
    slug: "/regimes",
    label: "Temperature regimes",
    eyebrow: "Storage",
    title: "Independently controlled rooms for every product family",
    blurb:
      "Each regime runs on its own refrigeration circuit, alarm set points and calibrated sensors.",
    tile: {
      src: "/images/seafood-pallets.jpg",
      alt: "Frozen cartons on pallets beneath frost",
    },
  },
  {
    slug: "/monitoring",
    label: "Monitoring",
    eyebrow: "Compliance",
    title: "Continuous monitoring with auditor-ready records",
    blurb:
      "1,204 calibrated sensors report every 30 seconds and deviations escalate to an on-call engineer within a minute.",
    tile: {
      src: "/images/control-room.jpg",
      alt: "Cold-chain monitoring station with temperature displays",
    },
  },
  {
    slug: "/commercial",
    label: "Commercial terms",
    eyebrow: "Pricing",
    title: "Storage billed on space, handling billed on movement",
    blurb:
      "Both components quoted up front, so your landed cost per kilo stays predictable.",
    tile: {
      src: "/images/exterior-dusk.jpg",
      alt: "Cold storage facility exterior at dusk",
    },
  },
  {
    slug: "/contact",
    label: "Contact",
    eyebrow: "Enquiries",
    title: "Talk to our commercial team",
    blurb:
      "Send your consignment details and we will respond with capacity, a temperature plan and indicative pricing.",
    tile: {
      src: "/images/tablet-check.jpg",
      alt: "Gloved hands checking a temperature dashboard on a tablet",
    },
  },
];

export const pageBySlug = (slug: string) =>
  pages.find((page) => page.slug === slug) ?? pages[0];

export const otherPages = (slug: string) => pages.filter((page) => page.slug !== slug);
