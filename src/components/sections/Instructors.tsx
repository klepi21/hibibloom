"use client"

import { useEffect, useRef } from "react"
import { gsap, prefersReducedMotion } from "@/lib/gsap"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { Hibiscus } from "@/components/botanical/Hibiscus"
import { instructors } from "@/content/site"

/**
 * The team.
 *
 * ⚠️  The portraits are intentionally *not* photographs. Generating synthetic
 * faces and presenting them as a real studio's staff would misrepresent the
 * business to the exact audience that has to trust it. Each card carries an
 * organic monogram frame instead — drop the real headshots into `portrait` in
 * `content/site.ts` and the card renders them without further changes.
 */

const ACCENT = {
  magenta: { bg: "bg-magenta-100", ring: "group-hover:border-magenta/45", text: "text-magenta-600" },
  leaf: { bg: "bg-leaf-100", ring: "group-hover:border-leaf/60", text: "text-leaf-700" },
  melon: { bg: "bg-melon-100", ring: "group-hover:border-melon/60", text: "text-melon-600" },
} as const

export function Instructors() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".person",
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".person-grid", start: "top 85%", once: true },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      id={instructors.id}
      className="relative isolate overflow-hidden bg-cream py-28 sm:py-36"
    >
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <SectionHeading
          kicker={instructors.kicker}
          title={instructors.title}
          lead={instructors.lead}
        />

        <div className="person-grid mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {instructors.people.map((p, i) => {
            const a = ACCENT[p.accent as keyof typeof ACCENT]
            return (
              <article key={`${p.name}-${i}`} className="person group">
                {/* An organic frame rather than an oval: a real headshot has to
                    drop straight in here without being cropped into an egg. */}
                <div
                  className={`radius-soft relative mb-5 aspect-[4/5] overflow-hidden border border-forest/8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${a.bg} ${a.ring}`}
                >
                  {/* Botanical stand-in until real photography exists. */}
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="w-[62%] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:rotate-6">
                      <Hibiscus
                        seed={900 + i * 61}
                        idPrefix={`in${i}`}
                        glow={false}
                        className="h-auto w-full"
                      />
                    </div>
                  </div>
                </div>

                <h3 className="text-[1.15rem] font-medium text-forest">{p.name}</h3>
                <p className={`mt-1 text-[0.85rem] ${a.text}`}>{p.role}</p>
                <p className="mt-2 text-[0.66rem] tracking-[0.2em] text-forest/40 uppercase">
                  {p.creds}
                </p>
                <p className="mt-3 text-[0.94rem] leading-[1.75] text-forest/62">{p.text}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
