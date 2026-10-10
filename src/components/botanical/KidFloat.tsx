"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap, prefersReducedMotion } from "@/lib/gsap"

/**
 * Ένα εικονογραφημένο παιδάκι σε στάση yoga που "επιπλέει" στο περιθώριο ενός
 * section: μπαίνει με ένα άνοιγμα καθώς εμφανίζεται, ταξιδεύει ελαφρά με το
 * scroll (parallax) και ανασαίνει αργά επιτόπου. Καθαρά διακοσμητικό.
 */

const POSES = {
  tree: { src: "/images/kid-tree.webp", w: 520, h: 1237 },
  lotus: { src: "/images/kid-lotus.webp", w: 520, h: 704 },
  dog: { src: "/images/kid-dog.webp", w: 520, h: 385 },
  warrior: { src: "/images/kid-warrior.webp", w: 520, h: 482 },
} as const

export function KidFloat({
  pose,
  className,
  drift = 60,
  sway = 3,
}: {
  pose: keyof typeof POSES
  className?: string
  /** Πόσα px ταξιδεύει κατακόρυφα όσο περνά το section. */
  drift?: number
  /** Μοίρες αργού λικνίσματος επιτόπου. */
  sway?: number
}) {
  const root = useRef<HTMLDivElement>(null)
  const p = POSES[pose]

  useEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40, scale: 0.85 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none play none" },
        }
      )

      gsap.to(el, {
        y: drift,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.3 },
      })

      // Αργή "αναπνοή" ώστε τίποτα να μη στέκεται εντελώς ακίνητο.
      gsap.to(el.firstElementChild, {
        rotation: sway,
        y: -8,
        duration: 3.4 + drift * 0.01,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      })
    }, el)

    return () => ctx.revert()
  }, [drift, sway])

  return (
    <div ref={root} className={`pointer-events-none absolute ${className ?? ""}`} aria-hidden="true">
      <Image src={p.src} alt="" width={p.w} height={p.h} className="h-auto w-full" />
    </div>
  )
}
