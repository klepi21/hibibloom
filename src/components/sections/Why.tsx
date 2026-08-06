"use client"

import { useEffect, useRef } from "react"
import { gsap, prefersReducedMotion } from "@/lib/gsap"
import { Reveal } from "@/components/ui/Reveal"
import { Vine, Sprout } from "@/components/botanical/Flora"
import { ScrollBloom } from "@/components/botanical/ScrollBloom"
import { KidFloat } from "@/components/botanical/KidFloat"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { why } from "@/content/site"

/**
 * Scene 02 — children discover movement.
 *
 * The vine at the left edge draws itself as the section passes, so the reader's
 * progress and the plant's growth are the same gesture.
 */

export function Why() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      // The stem draws on, then each leaf unfurls just after the stem reaches it.
      gsap.set(".vine-stem", { drawSVG: "0% 0%" })
      gsap.set(".vine-leaf", { scale: 0, opacity: 0, transformOrigin: "50% 100%" })

      gsap.to(".vine-stem", {
        drawSVG: "0% 100%",
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 75%", end: "bottom 70%", scrub: 0.9 },
      })
      gsap.to(".vine-leaf", {
        scale: 1,
        opacity: 1,
        ease: "back.out(1.6)",
        stagger: 0.4,
        scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 75%", scrub: 1.2 },
      })

      // Pillars rise in a soft stagger.
      gsap.fromTo(
        ".pillar",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          ease: "power3.out",
          stagger: { each: 0.08, grid: "auto", from: "start" },
          scrollTrigger: { trigger: ".pillar-grid", start: "top 82%", once: true },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      id={why.id}
      className="relative isolate overflow-hidden bg-cream py-28 sm:py-36"
    >
      <div className="wash-bloom pointer-events-none absolute inset-0 -z-20 opacity-45" />

      {/* The growing vine. */}
      <div className="pointer-events-none absolute top-16 -left-20 -z-10 hidden h-[74%] w-[150px] opacity-40 xl:block">
        <Vine seed={8} leaves={6} className="h-full w-full" />
      </div>

      {/* Λουλούδι που ανοίγει με το scroll + ένα παιδάκι σε δέντρο. */}
      <ScrollBloom
        seed={1810}
        idPrefix="whybloom"
        rotate={14}
        className="-right-20 top-24 -z-10 w-56 opacity-20 sm:w-72"
      />
      <KidFloat
        pose="tree"
        drift={-46}
        className="right-[3%] bottom-[7%] -z-10 hidden w-24 opacity-90 lg:block xl:w-28"
      />

      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <SectionHeading kicker={why.kicker} title={why.title} />

        <div className="mt-10 grid gap-8 md:grid-cols-12 md:gap-12">
          <Reveal className="md:col-span-6 md:col-start-2" delay={0.05}>
            <p className="font-display text-[clamp(1.5rem,3.4vw,2.35rem)] text-forest">
              {why.lead}
            </p>
          </Reveal>
          <Reveal className="md:col-span-4" delay={0.15}>
            <p className="text-[1.02rem] leading-[1.85] text-forest/70">{why.body}</p>
          </Reveal>
        </div>

        <div className="pillar-grid mt-20 grid gap-x-8 gap-y-11 sm:grid-cols-2 lg:grid-cols-4">
          {why.pillars.map((p, i) => (
            <div key={p.title} className="pillar group relative">
              <span
                aria-hidden="true"
                className="mb-4 block text-[0.68rem] tracking-[0.22em] text-magenta/45 tabular-nums"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="mb-3 flex items-center gap-2.5">
                <Sprout
                  className="h-5 w-5 shrink-0 text-leaf-500 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[8deg] group-hover:scale-110"
                  tone={p.title}
                />
                <h3 className="text-[1.06rem] font-medium text-forest">{p.title}</h3>
              </div>
              <p className="text-[0.94rem] leading-[1.75] text-forest/62">{p.text}</p>
              <span className="mt-5 block h-px w-full origin-left scale-x-100 bg-forest/8 transition-colors duration-500 group-hover:bg-magenta/30" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
