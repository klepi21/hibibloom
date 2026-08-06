"use client"

import { useEffect, useRef } from "react"
import { gsap, prefersReducedMotion } from "@/lib/gsap"
import { Hibiscus } from "@/components/botanical/Hibiscus"
import { Leaf } from "@/components/botanical/Flora"
import { ScrollBloom } from "@/components/botanical/ScrollBloom"
import { KidFloat } from "@/components/botanical/KidFloat"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { MagneticButton } from "@/components/ui/MagneticButton"
import { programs } from "@/content/site"

/**
 * Scene 04 — confidence creates connection.
 *
 * One card per age group, each with its own botanical accent colour drawn from
 * the brand trio so the four read as a family rather than a repeated template.
 */

const ACCENTS = {
  melon: {
    ring: "hover:border-melon/60",
    dot: "bg-melon",
    text: "text-melon-600",
    glow: "group-hover:shadow-[0_30px_80px_-40px_rgba(255,179,16,0.75)]",
    wash: "from-melon-100/70",
    leaf: "melon" as const,
  },
  leaf: {
    ring: "hover:border-leaf/60",
    dot: "bg-leaf-500",
    text: "text-leaf-700",
    glow: "group-hover:shadow-[0_30px_80px_-40px_rgba(171,201,82,0.75)]",
    wash: "from-leaf-100/70",
    leaf: "leaf" as const,
  },
  magenta: {
    ring: "hover:border-magenta/60",
    dot: "bg-magenta",
    text: "text-magenta-600",
    glow: "group-hover:shadow-[0_30px_80px_-40px_rgba(237,21,137,0.6)]",
    wash: "from-magenta-100/70",
    leaf: "leaf" as const,
  },
  forest: {
    ring: "hover:border-leaf-700/60",
    dot: "bg-leaf-700",
    text: "text-leaf-800",
    glow: "group-hover:shadow-[0_30px_80px_-40px_rgba(56,73,27,0.6)]",
    wash: "from-leaf-200/70",
    leaf: "forest" as const,
  },
} as const

export function Programs() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".program-card",
        { opacity: 0, y: 56 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.11,
          scrollTrigger: { trigger: ".program-grid", start: "top 84%", once: true },
        }
      )

      // The decorative leaf on each card drifts a little as the section scrolls.
      gsap.utils.toArray<HTMLElement>(".program-leaf").forEach((leaf, i) => {
        gsap.to(leaf, {
          yPercent: i % 2 ? 16 : -16,
          rotate: i % 2 ? 8 : -8,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.3 },
        })
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      id={programs.id}
      className="relative isolate overflow-hidden bg-cream-warm py-28 sm:py-36"
    >
      <div className="wash-bloom pointer-events-none absolute inset-0 -z-20 opacity-40" />

      {/* Το λουλούδι ανοίγει καθώς φτάνει το section, τα παιδάκια πλαισιώνουν. */}
      <ScrollBloom
        seed={2650}
        idPrefix="pgbloom"
        rotate={-10}
        className="top-16 -left-24 -z-10 w-60 opacity-[0.18] sm:w-80"
      />
      <KidFloat
        pose="lotus"
        drift={40}
        className="left-[2%] bottom-[4%] -z-10 hidden w-24 opacity-90 lg:block"
      />
      <KidFloat
        pose="warrior"
        drift={-52}
        className="right-[2%] top-[16%] -z-10 hidden w-28 opacity-90 lg:block"
      />

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeading kicker={programs.kicker} title={programs.title} lead={programs.lead} />

        <div className="program-grid mt-16 grid gap-6 md:grid-cols-2">
          {programs.items.map((p, i) => {
            const a = ACCENTS[p.accent as keyof typeof ACCENTS]
            return (
              <article
                key={p.name}
                className={`program-card group radius-soft relative isolate overflow-hidden border border-forest/8 bg-white/70 p-8 transition-all duration-600 sm:p-10 ${a.ring} ${a.glow}`}
              >
                {/* colour wash that blooms in on hover */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${a.wash} to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100`}
                />

                <div className="program-leaf pointer-events-none absolute -top-6 right-4 w-20 opacity-30 sm:w-24">
                  <Leaf seed={400 + i * 53} tone={a.leaf} className="h-auto w-full" />
                </div>

                <div className="mb-7 flex items-baseline gap-3">
                  <span className={`font-display text-[clamp(2.6rem,6vw,3.6rem)] ${a.text}`}>
                    {p.age}
                  </span>
                  <span className="text-[0.9rem] text-forest/50">{p.unit}</span>
                </div>

                <h3 className="mb-1 text-[1.3rem] font-medium text-forest">{p.name}</h3>
                <p className="mb-5 flex items-center gap-2 text-[0.8rem] tracking-wide text-forest/45">
                  <span aria-hidden="true" className={`inline-block h-1.5 w-1.5 rounded-full ${a.dot}`} />
                  {p.duration}
                </p>

                <p className="mb-7 max-w-[46ch] text-[0.97rem] leading-[1.8] text-forest/68">
                  {p.text}
                </p>

                <ul className="flex flex-wrap gap-2">
                  {p.highlights.map((h) => (
                    <li
                      key={h}
                      className="rounded-full border border-forest/10 bg-white/60 px-3.5 py-1.5 text-[0.8rem] text-forest/65 transition-colors duration-500 group-hover:border-forest/16"
                    >
                      {h}
                    </li>
                  ))}
                </ul>

                {/* A small flower that opens as the card is hovered. */}
                <div className="pointer-events-none absolute -right-10 -bottom-12 w-40 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-bottom-8 group-hover:opacity-35">
                  <Hibiscus seed={600 + i * 71} idPrefix={`pg${i}`} glow={false} className="h-auto w-full" />
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-14 flex justify-center">
          <MagneticButton href="#epikoinonia" variant="primary">
            {programs.cta}
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
