"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap, prefersReducedMotion } from "@/lib/gsap"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { Sprout } from "@/components/botanical/Flora"
import { ScrollBloom } from "@/components/botanical/ScrollBloom"
import { home } from "@/content/site"

/**
 * Scene 05: η yoga έρχεται στο παιδί, όχι το παιδί στη yoga.
 *
 * Το Hibi Bloom δεν έχει δικό του χώρο, οπότε αυτό το section δεν δείχνει
 * "εγκαταστάσεις": δείχνει τους δύο τρόπους που γίνονται τα μαθήματα (σπίτι,
 * συνεργαζόμενοι χώροι) με εικονογραφήσεις στο ύφος του brand, και τα τρία
 * απλά βήματα για να ξεκινήσει κανείς.
 */

const ACCENT = {
  melon: { chip: "bg-melon-100 text-melon-700", ring: "hover:border-melon/50" },
  leaf: { chip: "bg-leaf-100 text-leaf-700", ring: "hover:border-leaf/60" },
} as const

export function HomeLessons() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".place-card",
        { opacity: 0, y: 52 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: { trigger: ".place-grid", start: "top 84%", toggleActions: "play none play none" },
        }
      )

      gsap.fromTo(
        ".step",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".step-row", start: "top 88%", toggleActions: "play none play none" },
        }
      )

      // Η εικόνα ταξιδεύει ελαφρά μέσα στο πλαίσιό της.
      gsap.utils.toArray<HTMLElement>(".place-img").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -6, scale: 1.1 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: 1.1 },
          }
        )
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      id={home.id}
      className="relative isolate overflow-hidden bg-cream py-28 sm:py-36"
    >
      <div className="wash-bloom pointer-events-none absolute inset-0 -z-20 opacity-35" />

      {/* Λουλούδι που ανθίζει καθώς περνάει το section. */}
      <ScrollBloom
        seed={2210}
        idPrefix="hl"
        rotate={-12}
        className="top-10 -right-24 -z-10 w-64 opacity-25 sm:w-80"
      />

      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <SectionHeading kicker={home.kicker} title={home.title} lead={home.lead} />

        <div className="place-grid mt-16 grid gap-6 lg:grid-cols-2">
          {home.places.map((p) => {
            const a = ACCENT[p.accent as keyof typeof ACCENT]
            return (
              <article
                key={p.key}
                className={`place-card group radius-soft relative isolate overflow-hidden border border-forest/8 bg-white/70 transition-all duration-600 ${a.ring}`}
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="place-img object-cover"
                  />
                </div>

                <div className="p-8 sm:p-9">
                  <h3 className="mb-3 text-[1.3rem] font-medium text-forest">{p.title}</h3>
                  <p className="mb-6 text-[0.97rem] leading-[1.8] text-forest/68">{p.text}</p>
                  <ul className="space-y-2.5">
                    {p.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-[0.9rem] text-forest/72">
                        <Sprout className="mt-0.5 h-4 w-4 shrink-0 text-leaf-500" tone={point} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            )
          })}
        </div>

        {/* Τρία βήματα για να ξεκινήσετε. */}
        <div className="step-row mt-16 grid gap-8 sm:grid-cols-3">
          {home.steps.map((s, i) => (
            <div key={s.title} className="step relative">
              <span className="mb-3 block font-display text-[2.2rem] text-magenta/30">
                0{i + 1}
              </span>
              <h3 className="mb-2 text-[1.05rem] font-medium text-forest">{s.title}</h3>
              <p className="text-[0.92rem] leading-[1.75] text-forest/62">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
