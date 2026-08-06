import { fixed, makeRng, type Rng } from "@/lib/random"

/**
 * The Hibi Bloom hibiscus, rebuilt as vector so it can bloom.
 *
 * The delivered logo kit is raster only (every PDF wraps a 6966×8448 bitmap),
 * so the wordmark is used as-supplied everywhere it appears. This component is
 * the *botanical illustration* the brief asks for — same construction as the
 * logo flower (five obovate petals, fine white veins radiating from the throat,
 * a long melon-yellow staminal column with anthers) so it reads as the same
 * hand, but with each petal addressable for animation.
 *
 * Geometry lives in a 300×320 viewBox with the flower throat at (150, 185).
 * GSAP animates petals around that point via `svgOrigin: "150 185"`.
 */

export const HIBISCUS_ORIGIN = "150 185"

/**
 * One petal: narrow at the throat, broad and rounded at the margin (obovate),
 * with a shallow ruffle at the tip. Width ~108 against length ~126 keeps the
 * five petals overlapping into a full disc, the way the logo flower reads.
 */
const PETAL_D = [
  "M150 185",
  "C137 165 122 147 113 127",
  "C101 104 96 84 107 70",
  "C116 59 133 54 143 63",
  "C146 66.5 148 64 150 61",
  "C152 64 154 66.5 157 63",
  "C167 54 184 59 193 70",
  "C204 84 199 104 187 127",
  "C178 147 163 165 150 185",
  "Z",
].join(" ")

/** Fine white lines fanning from the throat toward the petal margin. */
function veins(rng: Rng, count: number) {
  const out: { d: string; w: number; o: number }[] = []
  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0.5 : i / (count - 1)
    // Fan across ±36°, with a touch of jitter so no two petals match.
    const angle = (-38 + t * 76 + (rng() - 0.5) * 5) * (Math.PI / 180)
    // Short, dense strokes clustered near the throat — as in the logo.
    const len = 58 + rng() * 26 - Math.abs(t - 0.5) * 18
    const sx = 150 + Math.sin(angle) * 9
    const sy = 179 - Math.cos(angle) * 9
    const ex = 150 + Math.sin(angle) * len
    const ey = 179 - Math.cos(angle) * len
    // Bow each vein slightly outward for a hand-drawn feel.
    const bow = (rng() - 0.5) * 10
    const cx = (sx + ex) / 2 + Math.cos(angle) * bow
    const cy = (sy + ey) / 2 + Math.sin(angle) * bow
    out.push({
      d: `M${fixed(sx)} ${fixed(sy)} Q${fixed(cx)} ${fixed(cy)} ${fixed(ex)} ${fixed(ey)}`,
      w: fixed(0.7 + rng() * 1.1),
      o: fixed(0.5 + rng() * 0.38),
    })
  }
  return out
}

/** The staminal column: a long curved stalk with anthers clustered at the tip. */
function anthers(rng: Rng, count: number) {
  const out: { x: number; y: number; r: number; sx: number; sy: number }[] = []
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1 || 1)
    // Cluster toward the top of the column, mirrored left/right.
    const side = i % 2 === 0 ? -1 : 1
    const up = 76 - t * 44
    const spread = (6 + t * 16) * side + (rng() - 0.5) * 4
    const sx = 150 + spread * 0.35 + 10 * (1 - t)
    const sy = 185 - up - 34
    out.push({
      x: fixed(150 + spread + 14 * (1 - t)),
      y: fixed(sy - 6 - rng() * 5),
      r: fixed(1.9 + rng() * 1.5),
      sx: fixed(sx),
      sy: fixed(sy),
    })
  }
  return out
}

export type HibiscusProps = {
  /** Seed drives petal jitter, vein bow and anther scatter. */
  seed?: number
  /** Number of petals. Five matches the logo. */
  petals?: number
  className?: string
  /** Rendered inside a <g> the caller can animate; ids are namespaced by seed. */
  idPrefix?: string
  /** Adds a soft radial glow behind the bloom. */
  glow?: boolean
  title?: string
}

export function Hibiscus({
  seed = 7,
  petals = 5,
  className,
  idPrefix,
  glow = true,
  title,
}: HibiscusProps) {
  const rng = makeRng(seed)
  const uid = idPrefix ?? `hb${seed}`

  const petalNodes = Array.from({ length: petals }, (_, i) => {
    const base = (360 / petals) * i
    // Each petal is nudged and resized a little so the flower never looks stamped.
    const rot = fixed(base + (rng() - 0.5) * 7)
    const scale = fixed(0.93 + rng() * 0.14)
    const veinSet = veins(rng, 11 + Math.floor(rng() * 4))
    return { i, rot, scale, veinSet }
  })

  const antherNodes = anthers(rng, 14)

  return (
    <svg
      viewBox="0 0 300 320"
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <defs>
        <radialGradient id={`${uid}-petal`} cx="50%" cy="72%" r="62%">
          <stop offset="0%" stopColor="#f9459f" />
          <stop offset="58%" stopColor="var(--color-magenta, #ed1589)" />
          <stop offset="100%" stopColor="#d10d78" />
        </radialGradient>
        <radialGradient id={`${uid}-glow`} cx="50%" cy="58%" r="50%">
          <stop offset="0%" stopColor="var(--color-melon, #ffb310)" stopOpacity="0.5" />
          <stop offset="45%" stopColor="var(--color-magenta, #ed1589)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--color-magenta, #ed1589)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-column`} x1="0" y1="1" x2="0.3" y2="0">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="55%" stopColor="var(--color-melon, #ffb310)" />
          <stop offset="100%" stopColor="#ffd166" />
        </linearGradient>
        {/* Keeps every vein inside its own petal margin. */}
        <clipPath id={`${uid}-clip`}>
          <path d={PETAL_D} />
        </clipPath>
        <radialGradient id={`${uid}-throat`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.92" />
          <stop offset="45%" stopColor="#ffd9ec" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffd9ec" stopOpacity="0" />
        </radialGradient>
      </defs>

      {glow && (
        <circle
          className="hb-glow"
          cx="150"
          cy="168"
          r="150"
          fill={`url(#${uid}-glow)`}
          opacity="0.9"
        />
      )}

      <g className="hb-petals">
        {petalNodes.map(({ i, rot, scale, veinSet }) => (
          // Rotation and the per-petal size jitter are baked into the SVG
          // transform attribute, which leaves the CSS transform on `.hb-petal`
          // entirely free for GSAP to drive the bloom.
          <g
            key={i}
            transform={`rotate(${rot} 150 185) translate(150 185) scale(${scale}) translate(-150 -185)`}
          >
            <g className="hb-petal" data-petal={i}>
              <path d={PETAL_D} fill={`url(#${uid}-petal)`} />
              <g
                className="hb-veins"
                fill="none"
                stroke="#ffffff"
                strokeLinecap="round"
                clipPath={`url(#${uid}-clip)`}
              >
                {veinSet.map((v, k) => (
                  <path key={k} d={v.d} strokeWidth={v.w} opacity={v.o} />
                ))}
              </g>
            </g>
          </g>
        ))}
      </g>

      {/* Throat: where the veins converge and the petal colour goes pale. */}
      <circle className="hb-throat" cx="150" cy="183" r="26" fill={`url(#${uid}-throat)`} />
      {/* Also class-hooked: without it this dot stays lit while the rest of the
          flower is hidden before a bloom animation starts. */}
      <circle
        className="hb-throat"
        cx="150"
        cy="184"
        r="7"
        fill="var(--color-melon, #ffb310)"
        opacity="0.45"
      />

      {/* Staminal column, tilted like the logo's. */}
      <g className="hb-stamen">
        <path
          d="M150 186 C152 160 154 132 158 108 C160 96 163 84 166 74"
          fill="none"
          stroke={`url(#${uid}-column)`}
          strokeWidth="11"
          strokeLinecap="round"
        />
        <path
          d="M150 186 C152 160 154 132 158 108"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.18"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <g className="hb-anthers" fill="var(--color-melon, #ffb310)">
          {antherNodes.map((a, k) => (
            <g key={k}>
              <path
                d={`M${a.sx} ${a.sy} Q${(a.sx + a.x) / 2} ${a.y + 4} ${a.x} ${a.y}`}
                fill="none"
                stroke="var(--color-melon, #ffb310)"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <circle cx={a.x} cy={a.y} r={a.r} />
            </g>
          ))}
        </g>
      </g>
    </svg>
  )
}

/** A single petal on its own — used for the drift of falling petals. */
export function Petal({
  seed = 3,
  className,
  idPrefix,
}: {
  seed?: number
  className?: string
  idPrefix?: string
}) {
  const rng = makeRng(seed)
  const uid = idPrefix ?? `pt${seed}`
  const veinSet = veins(rng, 7)
  return (
    <svg viewBox="95 55 110 135" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${uid}-p`} cx="50%" cy="80%" r="70%">
          <stop offset="0%" stopColor="#f9459f" />
          <stop offset="70%" stopColor="var(--color-magenta, #ed1589)" />
          <stop offset="100%" stopColor="#cf0c76" />
        </radialGradient>
      </defs>
      <path d={PETAL_D} fill={`url(#${uid}-p)`} />
      <g fill="none" stroke="#fff" strokeLinecap="round">
        {veinSet.map((v, k) => (
          <path key={k} d={v.d} strokeWidth={v.w} opacity={v.o * 0.8} />
        ))}
      </g>
    </svg>
  )
}
