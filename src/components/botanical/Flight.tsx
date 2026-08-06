"use client"

import { useEffect, useRef } from "react"
import { gsap, prefersReducedMotion } from "@/lib/gsap"
import { makeRng } from "@/lib/random"
import { Butterfly, Bee, Dragonfly } from "@/components/botanical/Creatures"

/**
 * Puts an insect on a wandering flight path.
 *
 * Real insects do not travel in straight lines and do not flap in time with
 * their travel, so three independent timelines run per creature: the path, the
 * wingbeat, and a slow bank/rotation. Their durations are deliberately
 * non-multiples of each other, which keeps the combined motion from ever
 * visibly repeating.
 */

type Kind = "butterfly" | "bee" | "dragonfly"

export function Flight({
  kind = "butterfly",
  seed = 5,
  className,
  size = 46,
  tone = "magenta",
  /** Path is expressed in % of the parent box. */
  path,
  duration,
}: {
  kind?: Kind
  seed?: number
  className?: string
  size?: number
  tone?: "magenta" | "melon" | "leaf"
  path?: { x: number; y: number }[]
  duration?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const wingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const rng = makeRng(seed)

    // A meandering set of waypoints across the parent, unique per seed.
    // Vertically constrained to 22–88% so nothing flies through the fixed
    // navigation bar or across the headline.
    const pts =
      path ??
      Array.from({ length: 6 }, (_, i) => {
        const y = 55 + Math.sin(i * 1.4 + rng() * 2) * 26 + (rng() - 0.5) * 14
        return {
          x: -10 + (i / 5) * 120 + (rng() - 0.5) * 22,
          y: Math.min(88, Math.max(22, y)),
        }
      })

    const parent = el.parentElement
    const box = parent?.getBoundingClientRect()
    const w = box?.width || 1000
    const h = box?.height || 700

    const travel = gsap.to(el, {
      motionPath: {
        path: pts.map((p) => ({ x: (p.x / 100) * w, y: (p.y / 100) * h })),
        curviness: 1.5,
        autoRotate: false,
      },
      duration: duration ?? 26 + rng() * 20,
      ease: "none",
      repeat: -1,
      // A little rest between passes, varying each time.
      repeatDelay: rng() * 3,
    })

    // Wingbeat: fast for the bee, slow and sweeping for the butterfly.
    const beat =
      kind === "butterfly" ? 0.34 + rng() * 0.12 : kind === "bee" ? 0.09 : 0.13
    const wings = gsap.to(wingRef.current?.querySelectorAll(".bf-wing, .be-wing, .df-wing") ?? [], {
      scaleX: kind === "butterfly" ? 0.18 : 0.5,
      duration: beat,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      transformOrigin: "50% 50%",
      stagger: { each: 0.02, from: "center" },
    })

    // Slow bank, on its own clock.
    const bank = gsap.to(el, {
      rotation: (rng() - 0.5) * 26,
      duration: 3.5 + rng() * 3,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    })

    return () => {
      travel.kill()
      wings.kill()
      bank.kill()
    }
  }, [kind, seed, path, duration])

  const Creature =
    kind === "bee" ? (
      <Bee idPrefix={`f${seed}`} className="h-full w-full" />
    ) : kind === "dragonfly" ? (
      <Dragonfly idPrefix={`f${seed}`} className="h-full w-full" />
    ) : (
      <Butterfly seed={seed} idPrefix={`f${seed}`} tone={tone} className="h-full w-full" />
    )

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute top-0 left-0 will-change-transform ${className ?? ""}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div ref={wingRef} className="h-full w-full">
        {Creature}
      </div>
    </div>
  )
}

/**
 * Leaves that sway on their own and tilt slightly away from the cursor.
 * The cursor response is damped and capped so it reads as a breeze, not a
 * cursor-follower.
 */
export function useLeafBreeze(scope: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = scope.current
    if (!root || prefersReducedMotion()) return

    const leaves = Array.from(root.querySelectorAll<HTMLElement>("[data-leaf]"))
    if (!leaves.length) return

    const sways = leaves.map((leaf, i) => {
      const rng = makeRng(i * 977 + 13)
      gsap.set(leaf, { transformOrigin: "50% 92%" })
      return gsap.to(leaf, {
        rotation: `+=${4 + rng() * 7}`,
        duration: 2.6 + rng() * 2.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: rng() * 2,
      })
    })

    const quicks = leaves.map((leaf) => ({
      x: gsap.quickTo(leaf, "x", { duration: 0.9, ease: "power3.out" }),
      y: gsap.quickTo(leaf, "y", { duration: 0.9, ease: "power3.out" }),
    }))

    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect()
      const nx = (e.clientX - r.left) / Math.max(r.width, 1) - 0.5
      const ny = (e.clientY - r.top) / Math.max(r.height, 1) - 0.5
      leaves.forEach((leaf, i) => {
        const depth = Number(leaf.dataset.depth ?? 1)
        quicks[i].x(-nx * 16 * depth)
        quicks[i].y(-ny * 10 * depth)
      })
    }
    window.addEventListener("pointermove", onMove, { passive: true })

    return () => {
      window.removeEventListener("pointermove", onMove)
      sways.forEach((s) => s.kill())
    }
  }, [scope])
}
