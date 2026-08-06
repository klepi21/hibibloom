"use client"

import { useEffect, useRef, type ElementType, type ReactNode } from "react"
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap"

/**
 * Scroll-triggered reveals.
 *
 * Everything here degrades to "just visible": the animated state is applied by
 * JS only, so a failed script or a reduced-motion preference leaves fully
 * readable content rather than a blank page.
 */

type RevealProps = {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
  y?: number
  duration?: number
  start?: string
  once?: boolean
}

export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  y = 34,
  duration = 1.05,
  start = "top 86%",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const anim = gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start, once },
      }
    )
    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [delay, y, duration, start, once])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

/**
 * Splits text into words and lifts them from behind a mask.
 *
 * Words rather than characters: Greek is heavily accented and diacritics get
 * clipped when each glyph becomes its own overflow-hidden box. Words also keep
 * the text selectable and readable to screen readers.
 */
export function RevealText({
  text,
  as: Tag = "span",
  className,
  wordClassName,
  delay = 0,
  stagger = 0.055,
  start = "top 88%",
}: {
  text: string
  as?: ElementType
  className?: string
  wordClassName?: string
  delay?: number
  stagger?: number
  start?: string
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const words = el.querySelectorAll<HTMLElement>("[data-word]")
    const anim = gsap.fromTo(
      words,
      { yPercent: 115, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        delay,
        ease: "power4.out",
        stagger,
        scrollTrigger: { trigger: el, start, once: true },
      }
    )
    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [text, delay, stagger, start])

  return (
    <Tag ref={ref} className={className}>
      {text.split(" ").map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="reveal-line inline-block align-bottom"
          aria-hidden="true"
        >
          <span data-word className={`inline-block ${wordClassName ?? ""}`}>
            {word}
            {i < text.split(" ").length - 1 ? " " : ""}
          </span>
        </span>
      ))}
      {/* The accessible copy — the split spans above are hidden from AT. */}
      <span className="sr-only">{text}</span>
    </Tag>
  )
}

/** Parallax that follows scroll velocity, used on decorative botanicals. */
export function useParallax(
  ref: React.RefObject<HTMLElement | null>,
  distance = 90,
  opts: { start?: string; end?: string } = {}
) {
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const anim = gsap.fromTo(
      el,
      { y: -distance / 2 },
      {
        y: distance / 2,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: opts.start ?? "top bottom",
          end: opts.end ?? "bottom top",
          scrub: 1.1,
        },
      }
    )
    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [ref, distance, opts.start, opts.end])
}

export { ScrollTrigger }
