"use client"

import { useRef, type ReactNode } from "react"
import { gsap, prefersReducedMotion } from "@/lib/gsap"

/**
 * A button that leans toward the cursor and blooms a petal wash on hover.
 *
 * The magnetism is capped and eased so it reads as attraction rather than as
 * the button chasing the pointer. Touch devices and reduced-motion get a plain,
 * fully functional button — the effect is decoration, never the affordance.
 */

type Props = {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: "primary" | "ghost" | "light"
  className?: string
  strength?: number
  type?: "button" | "submit"
  disabled?: boolean
  "aria-label"?: string
}

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  strength = 0.32,
  type = "button",
  disabled,
  ...rest
}: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  const inner = useRef<HTMLSpanElement>(null)

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || prefersReducedMotion()) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    const max = 14
    gsap.to(el, {
      x: gsap.utils.clamp(-max, max, dx * strength),
      y: gsap.utils.clamp(-max, max, dy * strength),
      duration: 0.5,
      ease: "power3.out",
    })
    gsap.to(inner.current, {
      x: gsap.utils.clamp(-6, 6, dx * strength * 0.4),
      y: gsap.utils.clamp(-6, 6, dy * strength * 0.4),
      duration: 0.6,
      ease: "power3.out",
    })
  }

  const reset = () => {
    gsap.to([ref.current, inner.current], {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.4)",
    })
  }

  const styles = {
    primary:
      "bg-magenta text-white shadow-[0_14px_40px_-12px_rgba(237,21,137,0.6)] hover:shadow-[0_20px_60px_-14px_rgba(237,21,137,0.7)]",
    ghost:
      "border border-forest/20 text-forest hover:border-magenta/50 hover:text-magenta",
    light:
      "glass-dark text-cream border-leaf/30 hover:border-melon/50 hover:text-melon-200",
  }[variant]

  const content = (
    <>
      {/* The bloom wash that grows from the centre on hover. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 scale-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,179,16,0.85),rgba(237,21,137,0)_70%)] opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-150 group-hover:opacity-100"
      />
      <span ref={inner} className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </>
  )

  const cls = `group relative isolate inline-flex items-center justify-center overflow-visible rounded-full px-7 py-4 text-[0.95rem] font-medium tracking-[0.01em] transition-colors duration-300 will-change-transform disabled:opacity-50 ${styles} ${className}`

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        className={cls}
        onPointerMove={onMove}
        onPointerLeave={reset}
        {...rest}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cls}
      onPointerMove={onMove}
      onPointerLeave={reset}
      {...rest}
    >
      {content}
    </button>
  )
}
