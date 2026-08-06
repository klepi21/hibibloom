"use client"

import { useEffect, useRef } from "react"
import { gsap, prefersReducedMotion } from "@/lib/gsap"
import { Hibiscus } from "@/components/botanical/Hibiscus"

/**
 * A decorative hibiscus that blooms as its section scrolls past.
 *
 * The petals are scrubbed to scroll position, so the reader literally opens
 * each flower by moving down the page. Scattered through the light sections
 * (and with the Contact finale already doing the same), the whole page reads
 * as a garden that keeps blooming while you scroll.
 *
 * Reduced motion: the flower renders fully open and never animates.
 */
export function ScrollBloom({
  seed,
  idPrefix,
  className,
  start = "top 90%",
  end = "top 25%",
  rotate = 10,
}: {
  seed: number
  idPrefix: string
  className?: string
  start?: string
  end?: string
  /** Slow rotation applied across the scrub, degrees. */
  rotate?: number
}) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.set(".hb-petal", { scale: 0.12, opacity: 0, svgOrigin: "150 185" })
      gsap.set(".hb-stamen, .hb-anthers, .hb-throat", { opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start, end, scrub: 1 },
      })

      tl.to(".hb-petal", {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        stagger: { each: 0.09, from: "random" },
      })
        .to(".hb-throat", { opacity: 1, duration: 0.4 }, 0.45)
        .to(".hb-stamen", { opacity: 1, duration: 0.5 }, 0.55)
        .to(".hb-anthers", { opacity: 1, duration: 0.4 }, 0.75)

      gsap.to(el, {
        rotation: rotate,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.4 },
      })
    }, el)

    return () => ctx.revert()
  }, [start, end, rotate])

  return (
    <div ref={root} className={`pointer-events-none absolute ${className ?? ""}`} aria-hidden="true">
      <Hibiscus seed={seed} idPrefix={idPrefix} glow={false} className="h-auto w-full" />
    </div>
  )
}
