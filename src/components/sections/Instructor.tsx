"use client"

import { useEffect, useRef } from "react"
import { gsap, prefersReducedMotion } from "@/lib/gsap"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { Hibiscus } from "@/components/botanical/Hibiscus"
import { Leaf } from "@/components/botanical/Flora"
import { instructor } from "@/content/site"

/**
 * Η δασκάλα: η Ρεγγίνα Αυγουστή, μόνη της.
 *
 * Ένα πρόσωπο, ένα editorial layout: πορτρέτο αριστερά, λόγια δεξιά. Το
 * πλαίσιο του πορτρέτου δείχνει προς το παρόν το βοτανικό μοτίβο του brand·
 * η πραγματική φωτογραφία της Ρεγγίνας μπαίνει στη θέση του χωρίς άλλη αλλαγή.
 */
export function Instructor() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ins-portrait",
        { opacity: 0, x: -40, rotate: -3 },
        {
          opacity: 1,
          x: 0,
          rotate: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 74%", toggleActions: "play none play none" },
        }
      )
      gsap.fromTo(
        ".ins-copy > *",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 70%", toggleActions: "play none play none" },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      id={instructor.id}
      className="relative isolate overflow-hidden bg-cream-warm py-28 sm:py-36"
    >
      <div className="wash-bloom pointer-events-none absolute inset-0 -z-20 opacity-30" />
      <div className="pointer-events-none absolute -bottom-8 -left-10 -z-10 w-32 rotate-[152deg] opacity-30 sm:w-44">
        <Leaf seed={731} tone="leaf" className="h-auto w-full" />
      </div>

      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <SectionHeading kicker={instructor.kicker} title={instructor.title} />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Πορτρέτο */}
          <div className="ins-portrait lg:col-span-5">
            <div className="radius-soft relative mx-auto aspect-[4/5] max-w-[420px] overflow-hidden border border-forest/8 bg-magenta-50">
              <div className="absolute inset-0 grid place-items-center">
                <div className="w-[62%]">
                  <Hibiscus seed={961} idPrefix="regina" glow={false} className="h-auto w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Κείμενο */}
          <div className="ins-copy lg:col-span-7">
            <h3 className="font-display text-[clamp(1.7rem,3.6vw,2.5rem)] text-forest">
              {instructor.name}
            </h3>
            <p className="mt-2 text-[0.95rem] text-magenta-600">{instructor.role}</p>

            <blockquote className="mt-8 border-l-2 border-melon pl-5 font-display text-[clamp(1.15rem,2.3vw,1.5rem)] leading-[1.5] text-forest/85">
              «{instructor.quote}»
            </blockquote>

            <div className="mt-8 space-y-5">
              {instructor.bio.map((par) => (
                <p key={par.slice(0, 24)} className="max-w-[62ch] text-[1rem] leading-[1.85] text-forest/68">
                  {par}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
