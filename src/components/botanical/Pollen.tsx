"use client"

import { useEffect, useRef } from "react"
import { makeRng } from "@/lib/random"

/**
 * Floating pollen and light motes.
 *
 * Canvas rather than DOM nodes: a few hundred particles as elements would
 * thrash layout, whereas one canvas stays cheap. The field drifts on a slow
 * curl so it never reads as a loop, and leans away from the cursor.
 *
 * Pauses when scrolled out of view and when the tab is hidden, and does not
 * run at all under prefers-reduced-motion.
 */

type Props = {
  count?: number
  className?: string
  /** Tint of the motes. */
  tone?: "gold" | "pink" | "mixed"
  /** Multiplier on drift speed. */
  speed?: number
  seed?: number
}

const TONES = {
  gold: ["255,209,102", "255,179,16"],
  pink: ["249,69,159", "237,21,137"],
  mixed: ["255,209,102", "237,21,137", "171,201,82"],
}

export function Pollen({ count = 90, className, tone = "gold", speed = 1, seed = 21 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointer = useRef({ x: 0.5, y: 0.5, active: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (reduced.matches) return

    const rng = makeRng(seed)
    const palette = TONES[tone]
    let width = 0
    let height = 0
    let dpr = 1
    let raf = 0
    let visible = true
    let running = true

    type Mote = {
      x: number
      y: number
      r: number
      a: number
      colour: string
      // Independent phase per axis keeps the drift from ever repeating.
      px: number
      py: number
      sx: number
      sy: number
      amp: number
      vy: number
    }

    const motes: Mote[] = Array.from({ length: count }, () => ({
      x: rng(),
      y: rng(),
      r: 0.7 + rng() * 2.4,
      a: 0.18 + rng() * 0.55,
      colour: palette[Math.floor(rng() * palette.length)],
      px: rng() * Math.PI * 2,
      py: rng() * Math.PI * 2,
      sx: 0.12 + rng() * 0.3,
      sy: 0.1 + rng() * 0.26,
      amp: 0.006 + rng() * 0.02,
      vy: (0.006 + rng() * 0.022) * (rng() > 0.82 ? -0.5 : 1),
    }))

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
      },
      { rootMargin: "120px" }
    )
    io.observe(canvas)

    const onVisibility = () => {
      running = !document.hidden
    }
    document.addEventListener("visibilitychange", onVisibility)

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.current = {
        x: (e.clientX - rect.left) / Math.max(rect.width, 1),
        y: (e.clientY - rect.top) / Math.max(rect.height, 1),
        active: true,
      }
    }
    window.addEventListener("pointermove", onPointer, { passive: true })

    let last = performance.now()
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      if (!visible || !running) return

      ctx.clearRect(0, 0, width, height)
      const t = now / 1000
      const p = pointer.current

      for (const m of motes) {
        // Curl drift: two out-of-phase sines per axis, never in step.
        m.px += m.sx * dt * speed
        m.py += m.sy * dt * speed
        m.y -= m.vy * dt * speed

        if (m.y < -0.05) m.y = 1.05
        if (m.y > 1.05) m.y = -0.05

        const wobbleX = Math.sin(m.px + t * 0.08) * m.amp + Math.sin(m.py * 1.7) * m.amp * 0.4
        const wobbleY = Math.cos(m.py + t * 0.06) * m.amp * 0.6

        let x = m.x + wobbleX
        let y = m.y + wobbleY

        // Gentle avoidance so the field feels aware of the cursor.
        if (p.active) {
          const dx = x - p.x
          const dy = y - p.y
          const d2 = dx * dx + dy * dy
          if (d2 < 0.02 && d2 > 0.000001) {
            const push = (0.02 - d2) * 3.2
            const d = Math.sqrt(d2)
            x += (dx / d) * push
            y += (dy / d) * push
          }
        }

        const px = x * width
        const py = y * height
        // Twinkle, offset per mote so they never pulse together.
        const twinkle = 0.72 + Math.sin(t * 0.9 + m.px * 3) * 0.28
        ctx.beginPath()
        ctx.fillStyle = `rgba(${m.colour},${(m.a * twinkle).toFixed(3)})`
        ctx.arc(px, py, m.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener("pointermove", onPointer)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [count, tone, speed, seed])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  )
}
