"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { gsap, prefersReducedMotion } from "@/lib/gsap"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { Petal } from "@/components/botanical/Hibiscus"
import { testimonials } from "@/content/site"

/**
 * Parents' words.
 *
 * A real carousel rather than an auto-playing marquee: it exposes previous/next
 * controls, responds to arrow keys, announces changes politely, and pauses its
 * own autoplay on hover or focus. Autoplay never runs under reduced-motion.
 *
 * ⚠️  The quotes in `content/site.ts` are placeholders. Publishing invented
 * testimonials as real customer reviews would be misleading — replace them
 * with genuine, attributed feedback before launch.
 */

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const root = useRef<HTMLElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
  const count = testimonials.items.length

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count]
  )

  // Autoplay, paused on interaction.
  useEffect(() => {
    if (paused || prefersReducedMotion()) return
    const t = window.setInterval(() => go(1), 7000)
    return () => window.clearInterval(t)
  }, [paused, go])

  // Animate the quote swap.
  useEffect(() => {
    const el = quoteRef.current
    if (!el || prefersReducedMotion()) return
    const anim = gsap.fromTo(
      el,
      { opacity: 0, y: 22, filter: "blur(6px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.85, ease: "power3.out" }
    )
    return () => {
      anim.kill()
    }
  }, [index])

  // Drifting petals behind the quote.
  useEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".float-petal").forEach((p, i) => {
        gsap.to(p, {
          y: `random(-34, 34)`,
          x: `random(-24, 24)`,
          rotation: `random(-28, 28)`,
          duration: 7 + i * 1.7,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.5,
        })
      })
    }, el)
    return () => ctx.revert()
  }, [])

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      go(-1)
    }
    if (e.key === "ArrowRight") {
      e.preventDefault()
      go(1)
    }
  }

  const current = testimonials.items[index]

  return (
    <section
      ref={root}
      id={testimonials.id}
      className="on-dark relative isolate overflow-hidden bg-forest py-28 text-cream sm:py-36"
    >
      <div className="wash-forest pointer-events-none absolute inset-0 -z-20 opacity-80" />

      {PETALS.map((p) => (
        <div
          key={p.key}
          className="float-petal pointer-events-none absolute -z-10"
          style={{ left: p.left, top: p.top, width: p.w, opacity: p.o, rotate: `${p.rot}deg` }}
          aria-hidden="true"
        >
          <Petal seed={p.key * 41} idPrefix={`tp${p.key}`} className="h-auto w-full" />
        </div>
      ))}

      <div className="mx-auto max-w-[1000px] px-5 sm:px-8">
        <SectionHeading kicker={testimonials.kicker} title={testimonials.title} tone="cream" align="center" />

        <div
          className="relative mt-14"
          role="region"
          aria-roledescription="carousel"
          aria-label={testimonials.title}
          tabIndex={0}
          onKeyDown={onKey}
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div aria-live="polite" aria-atomic="true">
            <div ref={quoteRef} className="text-center">
              <span
                aria-hidden="true"
                className="mx-auto mb-6 block font-display text-[4rem] leading-none text-magenta/45"
              >
                &ldquo;
              </span>
              <blockquote className="mx-auto max-w-[38ch] font-display text-[clamp(1.3rem,3.4vw,2.05rem)] leading-[1.45] text-cream">
                {current.quote}
              </blockquote>
              <figcaption className="mt-8 text-[0.86rem] tracking-wide text-leaf-200/70">
                {current.author}
                <span className="mx-2 text-melon/50" aria-hidden="true">
                  ·
                </span>
                <span className="text-cream/50">{current.detail}</span>
              </figcaption>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-center gap-5">
            <CarouselButton onClick={() => go(-1)} label="Προηγούμενη μαρτυρία" dir="prev" />

            <div className="flex items-center gap-2.5" role="tablist" aria-label="Μαρτυρίες">
              {testimonials.items.map((t, i) => (
                <button
                  key={t.quote.slice(0, 12)}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Μαρτυρία ${i + 1} από ${count}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === index ? "w-7 bg-magenta" : "w-2 bg-cream/25 hover:bg-cream/45"
                  }`}
                />
              ))}
            </div>

            <CarouselButton onClick={() => go(1)} label="Επόμενη μαρτυρία" dir="next" />
          </div>
        </div>
      </div>
    </section>
  )
}

function CarouselButton({
  onClick,
  label,
  dir,
}: {
  onClick: () => void
  label: string
  dir: "prev" | "next"
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group grid h-12 w-12 place-items-center rounded-full border border-leaf/25 text-cream/80 transition-all duration-400 hover:border-melon/60 hover:text-melon"
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-4 w-4 transition-transform duration-500 ${
          dir === "prev" ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {dir === "prev" ? <path d="M15 5 8 12l7 7" /> : <path d="M9 5l7 7-7 7" />}
      </svg>
    </button>
  )
}

/* Opacity is kept fairly high: brand magenta at 20% over deep forest reads as
   a muddy maroon blob rather than as a petal. */
const PETALS = [
  { key: 1, left: "6%", top: "22%", w: "58px", o: 0.62, rot: -18 },
  { key: 2, left: "88%", top: "30%", w: "44px", o: 0.55, rot: 26 },
  { key: 3, left: "14%", top: "70%", w: "38px", o: 0.48, rot: 62 },
  { key: 4, left: "80%", top: "72%", w: "52px", o: 0.58, rot: -44 },
  { key: 5, left: "48%", top: "12%", w: "32px", o: 0.4, rot: 12 },
]
