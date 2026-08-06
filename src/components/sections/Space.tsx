"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap, prefersReducedMotion } from "@/lib/gsap"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { Leaf } from "@/components/botanical/Flora"
import { space } from "@/content/site"

/**
 * Scene 05 — connection creates growth.
 *
 * An asymmetric gallery: each frame has its own organic radius, its own
 * parallax rate and its own reveal mask, so the grid never resolves into rows.
 * Images are revealed by animating a clip-path inset rather than fading, which
 * reads as the frame opening rather than the picture appearing.
 */

export function Space() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".shot").forEach((shot, i) => {
        const img = shot.querySelector(".shot-img")

        gsap.fromTo(
          shot,
          { clipPath: "inset(12% 8% 12% 8% round 3rem)", opacity: 0 },
          {
            clipPath: "inset(0% 0% 0% 0% round 2.25rem)",
            opacity: 1,
            duration: 1.35,
            ease: "power3.out",
            scrollTrigger: { trigger: shot, start: "top 88%", once: true },
          }
        )

        // The picture drifts inside its frame — a true parallax, not a shift.
        gsap.fromTo(
          img,
          { yPercent: -8, scale: 1.16 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: shot,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.15,
            },
          }
        )

        // Slight vertical offset per column keeps the grid from settling.
        gsap.to(shot, {
          yPercent: i % 3 === 1 ? -7 : i % 3 === 2 ? 5 : 0,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.4 },
        })
      })

      gsap.utils.toArray<HTMLElement>(".space-leaf").forEach((leaf, i) => {
        gsap.to(leaf, {
          yPercent: i % 2 ? -34 : 30,
          rotate: i % 2 ? -14 : 12,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.2 },
        })
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      id={space.id}
      className="relative isolate overflow-hidden bg-cream py-28 sm:py-36"
    >
      <div className="wash-bloom pointer-events-none absolute inset-0 -z-20 opacity-35" />

      <div className="space-leaf pointer-events-none absolute top-24 -left-10 -z-10 w-28 opacity-40 sm:w-40">
        <Leaf seed={811} tone="leaf" className="h-auto w-full" />
      </div>
      <div className="space-leaf pointer-events-none absolute right--8 bottom-32 -z-10 w-24 opacity-35 sm:w-36">
        <Leaf seed={933} tone="forest" className="h-auto w-full" />
      </div>

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeading kicker={space.kicker} title={space.title} lead={space.lead} />

        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-12">
          {space.shots.map((s, i) => (
            <figure
              key={s.caption}
              className={`shot group relative self-start overflow-hidden ${LAYOUT[i] ?? "col-span-2 lg:col-span-4"}`}
              style={{ borderRadius: "2.25rem" }}
            >
              <div className={`relative ${RATIO[i] ?? "aspect-[4/5]"} overflow-hidden`}>
                {s.src ? (
                  <Image
                    src={s.src}
                    alt={s.caption}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="shot-img object-cover"
                  />
                ) : (
                  <div
                    className={`shot-img h-full w-full ${TONE[s.tone as keyof typeof TONE]}`}
                    aria-hidden="true"
                  />
                )}

                {/* Warm scrim. Strong enough at the foot of the frame to keep
                    the caption legible over bright, sunlit photographs. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/15 to-transparent opacity-85 transition-opacity duration-700 group-hover:opacity-95"
                />

                {/* Anchored to the image box, not the figure: grid items stretch
                    to the tallest cell in the row, which left the caption
                    stranded below the shorter frames. */}
                <figcaption
                  className="absolute bottom-5 left-5 z-10 flex items-center gap-2.5 text-[0.85rem] text-cream"
                  style={{ textShadow: "0 1px 10px rgba(16,26,13,0.55)" }}
                >
                  <span
                    aria-hidden="true"
                    className="inline-block h-1.5 w-1.5 rounded-full bg-melon"
                  />
                  {s.caption}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/* Deliberate, uneven placement — the composition is the point. */
const LAYOUT = [
  "col-span-2 lg:col-span-7",
  "col-span-2 lg:col-span-5",
  "col-span-1 lg:col-span-4",
  "col-span-1 lg:col-span-3",
  "col-span-2 lg:col-span-5",
]

const RATIO = [
  "aspect-[16/11]",
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[3/4]",
  "aspect-[16/11]",
]

const TONE = {
  leaf: "bg-gradient-to-br from-leaf-200 via-leaf-400 to-leaf-700",
  melon: "bg-gradient-to-br from-melon-100 via-melon-300 to-melon-600",
  magenta: "bg-gradient-to-br from-magenta-100 via-magenta-300 to-magenta-600",
  forest: "bg-gradient-to-br from-leaf-500 via-leaf-700 to-forest",
}
