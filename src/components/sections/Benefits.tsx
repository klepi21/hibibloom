"use client"

import { useEffect, useRef } from "react"
import { gsap, prefersReducedMotion } from "@/lib/gsap"
import { Hibiscus } from "@/components/botanical/Hibiscus"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { Pollen } from "@/components/botanical/Pollen"
import { benefits } from "@/content/site"

/**
 * Scene 03 — movement creates confidence.
 *
 * Each card carries its own hibiscus, seeded differently, so no two cards hold
 * the same flower. On scroll the card rises while its flower opens; on hover
 * the flower opens further and turns a few degrees.
 */

export function Benefits() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".benefit-card")

      cards.forEach((card, i) => {
        const petals = card.querySelectorAll(".hb-petal")
        const stamen = card.querySelectorAll(".hb-stamen, .hb-anthers, .hb-throat")

        gsap.set(petals, { scale: 0.1, opacity: 0, svgOrigin: "150 185" })
        gsap.set(stamen, { opacity: 0 })

        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none play none" },
        })

        tl.fromTo(
          card,
          { opacity: 0, y: 46 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
          0
        )
          .to(
            petals,
            {
              scale: 1,
              opacity: 1,
              duration: 1.1,
              ease: "back.out(1.5)",
              // A different opening order on every card.
              stagger: { each: 0.07, from: i % 2 ? "end" : "random" },
            },
            0.12
          )
          .to(stamen, { opacity: 1, duration: 0.6, ease: "power2.out" }, 0.6)
      })

      // Hover: the flower opens a little further and rotates.
      cards.forEach((card) => {
        const flower = card.querySelector(".benefit-flower")
        const petals = card.querySelectorAll(".hb-petal")
        const enter = () => {
          gsap.to(flower, { scale: 1.12, rotate: 6, duration: 0.9, ease: "power3.out" })
          gsap.to(petals, {
            scale: 1.07,
            duration: 0.8,
            ease: "power2.out",
            stagger: { each: 0.04, from: "center" },
          })
        }
        const leave = () => {
          gsap.to(flower, { scale: 1, rotate: 0, duration: 1.1, ease: "elastic.out(1, 0.55)" })
          gsap.to(petals, { scale: 1, duration: 0.7, ease: "power2.out", stagger: 0.03 })
        }
        card.addEventListener("pointerenter", enter)
        card.addEventListener("pointerleave", leave)
        card.addEventListener("focusin", enter)
        card.addEventListener("focusout", leave)
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      id={benefits.id}
      className="on-dark relative isolate overflow-hidden bg-forest py-28 text-cream sm:py-36"
    >
      <div className="wash-forest pointer-events-none absolute inset-0 -z-20 opacity-90" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <Pollen count={70} tone="mixed" seed={64} speed={0.8} />
      </div>

      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <SectionHeading
          kicker={benefits.kicker}
          title={benefits.title}
          lead={benefits.lead}
          tone="cream"
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.items.map((b, i) => (
            <article
              key={b.title}
              tabIndex={0}
              className="benefit-card group glass-dark radius-soft relative isolate overflow-hidden p-8 pt-10 transition-colors duration-500 hover:border-melon/40"
            >
              {/* The flower each card grows from. */}
              <div className="benefit-flower pointer-events-none absolute -top-8 -right-8 w-36 opacity-45 transition-opacity duration-500 group-hover:opacity-70">
                <Hibiscus
                  seed={200 + i * 37}
                  idPrefix={`bn${i}`}
                  glow={false}
                  className="h-auto w-full"
                />
              </div>

              <span className="mb-6 block text-[0.68rem] tracking-[0.24em] text-melon/50 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="relative mb-3 text-[1.24rem] font-medium text-cream">{b.title}</h3>
              <p className="relative text-[0.95rem] leading-[1.8] text-cream/65">{b.text}</p>

              <span
                aria-hidden="true"
                className="mt-7 block h-px w-10 bg-melon/40 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full group-hover:bg-magenta/50"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
