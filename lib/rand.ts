/** Deterministic PRNG helpers so server and client render identical output. */
export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A gently wandering temperature series in °C around `base`. */
export function buildSeries({
  seed,
  base,
  spread = 1,
  points = 48,
}: {
  seed: number;
  base: number;
  spread?: number;
  points?: number;
}): number[] {
  const rand = mulberry32(seed);
  let value = base + (rand() - 0.5) * spread;
  return Array.from({ length: points }, () => {
    value += (rand() - 0.5) * spread * 0.8;
    value += (base - value) * 0.18; // pull back toward set point
    return Number(value.toFixed(2));
  });
}
