"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap"
import { Hibiscus } from "@/components/botanical/Hibiscus"
import { Leaf, SunRays } from "@/components/botanical/Flora"
import { Pollen } from "@/components/botanical/Pollen"
import { Flight, useLeafBreeze } from "@/components/botanical/Flight"
import { MagneticButton } from "@/components/ui/MagneticButton"
import { useContent } from "@/content/LangProvider"

/**
 * Scene 01 — the flower blooms.
 *
 * The section opens in near-darkness and warms as it plays: the sun rises
 * through the canopy, the flower opens, the logo settles in. Scrolling then
 * carries the whole scene up and hands over to Scene 02.
 */

export function Hero() {
  const { hero, contact, programs } = useContent()
  const root = useRef<HTMLElement>(null)
  const flower = useRef<HTMLDivElement>(null)
  useLeafBreeze(root)

  useEffect(() => {
    const el = root.current
    if (!el) return

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion()) {
        // ---- entrance, held until the intro overlay has lifted ----
        gsap.set(".hero-dark", { opacity: 1 })
        gsap.set(".hb-petal", { scale: 0, opacity: 0, svgOrigin: "150 185" })
        gsap.set(".hb-stamen", { scale: 0, opacity: 0, svgOrigin: "150 186" })
        gsap.set(".hb-anthers, .hb-throat", { opacity: 0 })
        gsap.set(".hero-rise", { opacity: 0, y: 40 })
        gsap.set(".hero-logo", { opacity: 0, scale: 0.92, filter: "blur(12px)" })
        gsap.set(".hero-leaf", { opacity: 0, scale: 0.8 })
        gsap.set(".sun-ray", { scaleY: 0, transformOrigin: "50% 0%" })

        const intro = gsap.timeline({ paused: true })

        intro
          // Light comes up through the canopy first.
          .to(".hero-dark", { opacity: 0, duration: 2.4, ease: "power2.inOut" }, 0)
          .to(
            ".sun-ray",
            { scaleY: 1, duration: 2.6, ease: "power2.out", stagger: { each: 0.11, from: "center" } },
            0.2
          )
          .to(
            ".hero-leaf",
            {
              opacity: 1,
              scale: 1,
              duration: 1.5,
              ease: "power3.out",
              stagger: { each: 0.09, from: "random" },
            },
            0.3
          )
          // Then the flower opens.
          .to(
            ".hb-petal",
            {
              scale: 1,
              opacity: 1,
              duration: 1.3,
              ease: "back.out(1.4)",
              stagger: { each: 0.1, from: "random" },
            },
            0.55
          )
          .to(".hb-throat", { opacity: 1, duration: 0.8 }, 1.0)
          .to(".hb-stamen", { scale: 1, opacity: 1, duration: 0.9, ease: "back.out(1.9)" }, 1.15)
          .to(".hb-anthers", { opacity: 1, duration: 0.7 }, 1.5)
          // Finally the words.
          .to(
            ".hero-logo",
            { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.3, ease: "power3.out" },
            1.25
          )
          .to(
            ".hero-rise",
            { opacity: 1, y: 0, duration: 1.15, ease: "power3.out", stagger: 0.13 },
            1.5
          )

        const start = () => intro.play()
        // The preloader fires this; the timeout covers the repeat-visit path
        // where the preloader removes itself before this listener attaches.
        window.addEventListener("hb:intro-done", start, { once: true })
        const fallback = window.setTimeout(start, 600)

        // ---- scroll: the scene lifts away ----
        gsap.to(".hero-parallax-slow", {
          yPercent: -14,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 1 },
        })
        gsap.to(".hero-parallax-fast", {
          yPercent: -34,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.8 },
        })
        gsap.to(".hero-copy", {
          yPercent: -18,
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: el, start: "40% top", end: "bottom top", scrub: 1 },
        })

        // The flower keeps breathing once it is open.
        gsap.to(flower.current, {
          scale: 1.035,
          duration: 5.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        })

        return () => {
          window.removeEventListener("hb:intro-done", start)
          window.clearTimeout(fallback)
        }
      }
    }, el)

    return () => {
      ctx.revert()
      ScrollTrigger.refresh()
    }
  }, [])

  return (
    <section
      ref={root}
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-cream px-5 pt-24 pb-24"
      aria-label="Hibi Bloom"
    >
      {/* --- ground --- */}
      <div className="wash-bloom pointer-events-none absolute inset-0 -z-30" />

      <div className="hero-parallax-slow pointer-events-none absolute inset-x-0 -top-24 -z-20 h-[130%] opacity-80">
        <SunRays className="h-full w-full" seed={9} />
      </div>

      {/* Canopy leaves, front and back layers. */}
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <div className="hero-parallax-slow absolute inset-0">
          {LEAVES_BACK.map((l) => (
            <div
              key={l.key}
              data-leaf
              data-depth={l.depth}
              className="hero-leaf absolute"
              style={{
                left: l.left,
                top: l.top,
                width: l.w,
                transform: `rotate(${l.rot}deg)`,
                opacity: l.o,
              }}
            >
              <Leaf seed={l.key * 17 + 3} tone={l.tone} className="h-auto w-full" />
            </div>
          ))}
        </div>
        <div className="hero-parallax-fast absolute inset-0">
          {LEAVES_FRONT.map((l) => (
            <div
              key={l.key}
              data-leaf
              data-depth={l.depth}
              className="hero-leaf absolute"
              style={{
                left: l.left,
                top: l.top,
                width: l.w,
                transform: `rotate(${l.rot}deg)`,
                opacity: l.o,
              }}
            >
              <Leaf seed={l.key * 29 + 7} tone={l.tone} className="h-auto w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Pollen and light motes over everything botanical. */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Pollen count={110} tone="gold" seed={31} />
      </div>

      {/* Insects. */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Flight kind="butterfly" seed={4} size={52} tone="magenta" />
        <Flight kind="butterfly" seed={18} size={38} tone="melon" duration={34} />
        <Flight kind="bee" seed={26} size={26} duration={22} />
        <Flight kind="dragonfly" seed={12} size={44} duration={40} />
      </div>

      {/* --- the flower --- */}
      <div
        ref={flower}
        className="hero-parallax-fast relative w-[30vw] max-w-[148px] min-w-[104px]"
      >
        <Hibiscus
          seed={97}
          idPrefix="hero"
          className="h-auto w-full drop-shadow-[0_24px_60px_rgba(237,21,137,0.28)]"
        />
      </div>

      {/* --- words --- */}
      <div className="hero-copy relative z-10 flex max-w-3xl flex-col items-center text-center">
        {/* The wordmark-only lockup: the hibiscus above already carries the
            flower, so the full logo here would show it twice. */}
        <div className="hero-logo -mt-1 mb-4 w-[38vw] max-w-[178px] min-w-[132px]">
          <Image
            src="/brand/logo-green-640.webp"
            alt="Hibi Bloom"
            width={640}
            height={532}
            priority
            sizes="(max-width: 640px) 38vw, 178px"
            className="h-auto w-full"
          />
        </div>

        <h1 className="hero-rise font-display text-[clamp(1.95rem,4.9vw,3.25rem)] text-forest">
          <span className="block">{hero.headline[0]}</span>
          <span className="block text-magenta">{hero.headline[1]}</span>
        </h1>

        <ul className="hero-rise mt-6 flex flex-col items-center gap-2.5 text-[clamp(0.8rem,1.5vw,0.92rem)] text-forest/75 sm:flex-row sm:gap-7">
          {hero.bullets.map((b) => (
            <li key={b.text} className="flex items-center gap-2.5">
              <BulletMark kind={b.icon} />
              <span>{b.text}</span>
            </li>
          ))}
        </ul>

        <div className="hero-rise mt-7 flex flex-col items-center gap-3 sm:flex-row">
          <MagneticButton href={`#${contact.id}`} variant="primary">
            {hero.cta}
          </MagneticButton>
          <MagneticButton href={`#${programs.id}`} variant="ghost" strength={0.2}>
            {hero.ctaSecondary}
          </MagneticButton>
        </div>
      </div>

      {/* --- scroll cue: hidden on short viewports, where it collides with the CTAs --- */}
      <div className="hero-rise absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 [@media(min-height:760px)]:block">
        <span className="flex flex-col items-center gap-2 whitespace-nowrap text-[0.66rem] tracking-[0.24em] text-forest/45 uppercase">
          {hero.scroll}
          <span className="relative block h-9 w-px overflow-hidden bg-forest/15">
            <span className="absolute inset-x-0 top-0 h-3 animate-[scroll-cue_2.2s_ease-in-out_infinite] bg-magenta" />
          </span>
        </span>
      </div>

      {/* The darkness the scene begins in. */}
      <div className="hero-dark pointer-events-none absolute inset-0 z-20 bg-forest" />
    </section>
  )
}

/**
 * The three hero markers.
 *
 * The brief wrote these as 🌺 / 🌿 / 🌈, but system emoji render in each OS's
 * own house style — which is exactly the "childish clipart" look the brief
 * rules out, and it would be the one thing on the page not drawn in the
 * brand's hand. These are the same three ideas in the logo's palette.
 */
function BulletMark({ kind }: { kind: string }) {
  if (kind === "flower") {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0" aria-hidden="true">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse
            key={a}
            cx="12"
            cy="7.4"
            rx="4.1"
            ry="5"
            fill="var(--color-magenta)"
            transform={`rotate(${a} 12 12.6)`}
          />
        ))}
        <circle cx="12" cy="12.6" r="2" fill="var(--color-melon)" />
      </svg>
    )
  }
  if (kind === "leaf") {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0" aria-hidden="true">
        <path
          d="M12 22 C12 14 9 8 3.5 3.5 C13.5 3 21 8.5 21 14.5 C21 19 17 22 12 22 Z"
          fill="var(--color-leaf)"
        />
        <path
          d="M12 21.5 C12 14.5 9.5 9 4.5 4.6"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.6"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0" aria-hidden="true">
      <g fill="none" strokeLinecap="round" strokeWidth="2.4">
        <path d="M3 19 A9 9 0 0 1 21 19" stroke="var(--color-magenta)" />
        <path d="M6.6 19 A5.4 5.4 0 0 1 17.4 19" stroke="var(--color-melon)" />
        <path d="M10.2 19 A1.8 1.8 0 0 1 13.8 19" stroke="var(--color-leaf)" />
      </g>
    </svg>
  )
}

/**
 * Hand-placed so the composition is deliberate rather than scattered.
 * Kept small and pushed to the margins — these frame the centre, they do not
 * compete with it. The generous empty middle is the point.
 */
const LEAVES_BACK = [
  { key: 1, left: "-3%", top: "4%", w: "7vw", rot: 24, o: 0.36, depth: 0.6, tone: "forest" as const },
  { key: 2, left: "93%", top: "-2%", w: "8vw", rot: -32, o: 0.34, depth: 0.7, tone: "forest" as const },
  { key: 3, left: "86%", top: "74%", w: "6vw", rot: 148, o: 0.3, depth: 0.5, tone: "leaf" as const },
  { key: 4, left: "3%", top: "78%", w: "6.5vw", rot: -162, o: 0.3, depth: 0.55, tone: "leaf" as const },
]

const LEAVES_FRONT = [
  { key: 5, left: "-4%", top: "36%", w: "9vw", rot: 68, o: 0.6, depth: 1.4, tone: "leaf" as const },
  { key: 6, left: "94%", top: "40%", w: "9.5vw", rot: -78, o: 0.58, depth: 1.5, tone: "leaf" as const },
  { key: 7, left: "12%", top: "-7%", w: "6vw", rot: 162, o: 0.42, depth: 1.1, tone: "forest" as const },
  { key: 8, left: "82%", top: "-8%", w: "6.5vw", rot: -168, o: 0.4, depth: 1.2, tone: "forest" as const },
  { key: 9, left: "46%", top: "93%", w: "5vw", rot: 8, o: 0.38, depth: 1, tone: "melon" as const },
]
