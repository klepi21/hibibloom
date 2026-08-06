import { fixed, makeRng } from "@/lib/random"

/**
 * Leaves, vines and sprouts — drawn in the same reduced, rounded language as
 * the logo flower: flat brand colour, one soft interior highlight, no outlines.
 */

const LEAF_D = [
  "M60 196",
  "C60 152 57 122 43 94",
  "C30 69 33 40 60 11",
  "C87 40 90 69 77 94",
  "C63 122 60 152 60 196",
  "Z",
].join(" ")

export function Leaf({
  seed = 1,
  className,
  idPrefix,
  tone = "leaf",
}: {
  seed?: number
  className?: string
  idPrefix?: string
  tone?: "leaf" | "forest" | "melon"
}) {
  const rng = makeRng(seed)
  const uid = idPrefix ?? `lf${seed}`
  const tones = {
    leaf: ["#c3df86", "#abc952", "#74902e"],
    forest: ["#74902e", "#556c24", "#38491b"],
    melon: ["#ffcc5e", "#ffb310", "#b87a05"],
  }[tone]

  // Side veins branching off the midrib, alternating and slightly uneven.
  const ribs = Array.from({ length: 7 }, (_, i) => {
    const t = (i + 1) / 8
    const y = 178 - t * 148
    const side = i % 2 === 0 ? -1 : 1
    const reach = (16 + (1 - Math.abs(t - 0.45) * 1.6) * 22) * side
    const jitter = (rng() - 0.5) * 5
    return `M60 ${fixed(y)} Q${fixed(60 + reach * 0.55)} ${fixed(y - 8 + jitter)} ${fixed(
      60 + reach
    )} ${fixed(y - 20 + jitter)}`
  })

  return (
    <svg viewBox="0 0 120 200" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${uid}-g`} x1="0.1" y1="1" x2="0.9" y2="0">
          <stop offset="0%" stopColor={tones[2]} />
          <stop offset="52%" stopColor={tones[1]} />
          <stop offset="100%" stopColor={tones[0]} />
        </linearGradient>
      </defs>
      <path d={LEAF_D} fill={`url(#${uid}-g)`} />
      <path
        d="M60 194 C60 150 60 90 60 14"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.34"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <g fill="none" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1.4" strokeLinecap="round">
        {ribs.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  )
}

/**
 * A climbing vine. `length` controls how much of the stem is drawn; pair it
 * with stroke-dashoffset to make the vine grow on scroll.
 */
export function Vine({
  seed = 2,
  className,
  idPrefix,
  leaves = 6,
  flip = false,
}: {
  seed?: number
  className?: string
  idPrefix?: string
  leaves?: number
  flip?: boolean
}) {
  const rng = makeRng(seed)
  const uid = idPrefix ?? `vn${seed}`

  // A serpentine stem climbing the full height of the viewBox.
  const stem = `M100 600 C${fixed(60 + rng() * 30)} 520 ${fixed(140 + rng() * 30)} 460 100 386
    C${fixed(58 + rng() * 26)} 312 ${fixed(140 + rng() * 26)} 250 100 176
    C${fixed(70 + rng() * 24)} 118 ${fixed(126 + rng() * 20)} 66 100 6`

  const sprouts = Array.from({ length: leaves }, (_, i) => {
    const t = (i + 0.5) / leaves
    const y = 600 - t * 580
    const side = i % 2 === 0 ? 1 : -1
    const rot = side * (34 + rng() * 30)
    const scale = fixed(0.13 + rng() * 0.1)
    return { key: i, y: fixed(y), rot: fixed(rot), scale, seed: seed * 31 + i }
  })

  return (
    <svg
      viewBox="0 0 200 600"
      className={className}
      aria-hidden="true"
      focusable="false"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        className="vine-stem"
        d={stem}
        fill="none"
        stroke="var(--color-leaf-600, #74902e)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {sprouts.map((s) => (
        <g
          key={s.key}
          className="vine-leaf"
          transform={`translate(100 ${s.y}) rotate(${s.rot}) scale(${s.scale}) translate(-60 -190)`}
        >
          <Leaf seed={s.seed} idPrefix={`${uid}-l${s.key}`} className="w-full" />
        </g>
      ))}
    </svg>
  )
}

/** A small sprout used as a bullet/marker throughout the site. */
export function Sprout({ className, tone = "leaf" }: { className?: string; tone?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        d="M12 22 C12 16 12 12 12 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 13 C7 13 4 10 4 6 C9 6 12 9 12 13 Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M12 11 C17 11 20 8 20 4 C15 4 12 7 12 11 Z"
        fill="currentColor"
        opacity="0.55"
      />
      <title>{tone}</title>
    </svg>
  )
}

/** Sun rays raking through the canopy. Purely decorative. */
export function SunRays({ className, seed = 5 }: { className?: string; seed?: number }) {
  const rng = makeRng(seed)
  const rays = Array.from({ length: 7 }, (_, i) => {
    const x = 60 + i * 130 + (rng() - 0.5) * 60
    const w = 26 + rng() * 70
    const o = fixed(0.05 + rng() * 0.11)
    const skew = fixed(-14 + rng() * 8)
    return { key: i, x: fixed(x), w: fixed(w), o, skew }
  })
  return (
    <svg
      viewBox="0 0 1000 700"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="ray-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe9a8" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#ffd166" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#ffd166" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g className="sun-rays">
        {rays.map((r) => (
          <rect
            key={r.key}
            className="sun-ray"
            x={r.x}
            y={-80}
            width={r.w}
            height={780}
            fill="url(#ray-fade)"
            opacity={r.o}
            transform={`skewX(${r.skew})`}
          />
        ))}
      </g>
    </svg>
  )
}
