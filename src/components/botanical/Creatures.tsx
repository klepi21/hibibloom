import { fixed, makeRng } from "@/lib/random"

/**
 * Butterflies, bees and dragonflies.
 *
 * Each is drawn in the logo's flat-colour language and built so the wings are
 * separate nodes — the flapping is done by animating the wing groups, never by
 * translating a static sprite, so the movement reads as alive rather than as a
 * looping GIF.
 */

export function Butterfly({
  seed = 11,
  className,
  idPrefix,
  tone = "magenta",
}: {
  seed?: number
  className?: string
  idPrefix?: string
  tone?: "magenta" | "melon" | "leaf"
}) {
  const rng = makeRng(seed)
  const uid = idPrefix ?? `bf${seed}`
  const tones = {
    magenta: ["#f9459f", "#ed1589", "#9a0b58"],
    melon: ["#ffd166", "#ffb310", "#b87a05"],
    leaf: ["#c3df86", "#abc952", "#556c24"],
  }[tone]

  // Faint speckles on the upper wings, unique per butterfly.
  const spots = Array.from({ length: 5 }, (_, i) => ({
    key: i,
    x: fixed(20 + rng() * 22),
    y: fixed(20 + rng() * 20),
    r: fixed(1.6 + rng() * 2.4),
  }))

  return (
    <svg viewBox="0 0 100 90" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${uid}-w`} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={tones[0]} />
          <stop offset="60%" stopColor={tones[1]} />
          <stop offset="100%" stopColor={tones[2]} />
        </linearGradient>
      </defs>

      {/* left wings */}
      <g className="bf-wing bf-wing-l" style={{ transformOrigin: "50px 45px" }}>
        <path
          d="M49 44 C36 20 20 10 10 18 C1 25 6 42 22 50 C33 55 43 52 49 46 Z"
          fill={`url(#${uid}-w)`}
        />
        <path
          d="M49 47 C38 58 26 68 18 76 C10 84 20 88 30 82 C40 76 47 62 49 50 Z"
          fill={`url(#${uid}-w)`}
          opacity="0.82"
        />
        <g fill="#ffffff" opacity="0.42">
          {spots.map((s) => (
            <circle key={s.key} cx={s.x} cy={s.y} r={s.r} />
          ))}
        </g>
      </g>

      {/* right wings — mirrored about the body */}
      <g
        className="bf-wing bf-wing-r"
        style={{ transformOrigin: "50px 45px" }}
        transform="translate(100 0) scale(-1 1)"
      >
        <path
          d="M49 44 C36 20 20 10 10 18 C1 25 6 42 22 50 C33 55 43 52 49 46 Z"
          fill={`url(#${uid}-w)`}
        />
        <path
          d="M49 47 C38 58 26 68 18 76 C10 84 20 88 30 82 C40 76 47 62 49 50 Z"
          fill={`url(#${uid}-w)`}
          opacity="0.82"
        />
        <g fill="#ffffff" opacity="0.42">
          {spots.map((s) => (
            <circle key={s.key} cx={s.x} cy={s.y} r={s.r} />
          ))}
        </g>
      </g>

      {/* body + antennae */}
      <ellipse cx="50" cy="50" rx="3.1" ry="15" fill="#38491b" />
      <circle cx="50" cy="34" r="3.6" fill="#38491b" />
      <path
        d="M48 31 C44 24 41 21 38 19 M52 31 C56 24 59 21 62 19"
        fill="none"
        stroke="#38491b"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="38" cy="19" r="1.6" fill="#38491b" />
      <circle cx="62" cy="19" r="1.6" fill="#38491b" />
    </svg>
  )
}

export function Bee({ className, idPrefix = "be" }: { className?: string; idPrefix?: string }) {
  return (
    <svg viewBox="0 0 70 56" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${idPrefix}-b`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffd166" />
          <stop offset="100%" stopColor="#ffb310" />
        </linearGradient>
      </defs>
      {/* wings */}
      <g className="be-wing be-wing-l" style={{ transformOrigin: "34px 24px" }}>
        <ellipse cx="26" cy="14" rx="13" ry="8" fill="#ffffff" opacity="0.62" transform="rotate(-22 26 14)" />
      </g>
      <g className="be-wing be-wing-r" style={{ transformOrigin: "34px 24px" }}>
        <ellipse cx="44" cy="14" rx="13" ry="8" fill="#ffffff" opacity="0.62" transform="rotate(22 44 14)" />
      </g>
      {/* body */}
      <ellipse cx="35" cy="31" rx="19" ry="13" fill={`url(#${idPrefix}-b)`} />
      <path d="M30 19 C30 30 30 34 31 43" stroke="#38491b" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <path d="M40 20 C40 30 40 34 39 42" stroke="#38491b" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <circle cx="17" cy="29" r="7.5" fill="#38491b" />
      <circle cx="14.5" cy="27" r="1.8" fill="#ffffff" opacity="0.85" />
      <path
        d="M15 22 C12 17 10 14 8 12 M20 21 C19 16 18 13 17 10"
        fill="none"
        stroke="#38491b"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Dragonfly({
  className,
  idPrefix = "df",
}: {
  className?: string
  idPrefix?: string
}) {
  return (
    <svg viewBox="0 0 110 70" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${idPrefix}-w`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c3df86" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#abc952" stopOpacity="0.42" />
        </linearGradient>
      </defs>
      <g className="df-wing df-wing-tl" style={{ transformOrigin: "44px 30px" }}>
        <ellipse cx="26" cy="20" rx="22" ry="6.5" fill={`url(#${idPrefix}-w)`} transform="rotate(-16 26 20)" />
      </g>
      <g className="df-wing df-wing-bl" style={{ transformOrigin: "46px 34px" }}>
        <ellipse cx="28" cy="42" rx="19" ry="5.5" fill={`url(#${idPrefix}-w)`} transform="rotate(14 28 42)" />
      </g>
      <g className="df-wing df-wing-tr" style={{ transformOrigin: "44px 30px" }}>
        <ellipse cx="66" cy="20" rx="22" ry="6.5" fill={`url(#${idPrefix}-w)`} transform="rotate(16 66 20)" />
      </g>
      <g className="df-wing df-wing-br" style={{ transformOrigin: "46px 34px" }}>
        <ellipse cx="64" cy="42" rx="19" ry="5.5" fill={`url(#${idPrefix}-w)`} transform="rotate(-14 64 42)" />
      </g>
      <path
        d="M40 31 C58 31 78 33 96 36"
        stroke="#74902e"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="36" cy="31" r="6.5" fill="#556c24" />
      <circle cx="33.5" cy="29" r="1.7" fill="#ffffff" opacity="0.8" />
    </svg>
  )
}
