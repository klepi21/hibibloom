/**
 * Deterministic pseudo-randomness.
 *
 * The brief asks that "every flower blooms differently" and that nothing feels
 * like a repeating loop. Math.random() would do that — but it would also
 * produce different markup on the server and the client, which React 19 treats
 * as a hydration error. So every organic variation on this site is seeded:
 * same seed in, same numbers out, on both sides of the render.
 */

/** mulberry32 — small, fast, good enough distribution for visual jitter. */
export function makeRng(seed: number): () => number {
  let a = seed >>> 0
  return function rng() {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Turns any string into a stable 32-bit seed. */
export function hashSeed(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export type Rng = () => number

/** Uniform float in [min, max). */
export const between = (rng: Rng, min: number, max: number) => min + rng() * (max - min)

/** Uniform int in [min, max]. */
export const intBetween = (rng: Rng, min: number, max: number) =>
  Math.floor(between(rng, min, max + 1))

/** Picks one element. */
export const pick = <T>(rng: Rng, list: readonly T[]): T => list[Math.floor(rng() * list.length)]

/** Rounds to a fixed precision so SSR/CSR strings match exactly. */
export const fixed = (n: number, p = 3) => Number(n.toFixed(p))
