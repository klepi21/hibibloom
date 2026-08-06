"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import Image from "next/image"
import { gsap, prefersReducedMotion } from "@/lib/gsap"
import { Hibiscus } from "@/components/botanical/Hibiscus"
import { loader } from "@/content/site"

/**
 * The opening bloom.
 *
 * Sits over the hero as an overlay — the page content is always in the DOM, so
 * crawlers and screen readers are unaffected and nothing depends on JS to be
 * readable. The overlay removes itself after the timeline, on reduced-motion,
 * on a second visit within the session, and on Escape.
 */

const SEEN_KEY = "hb:intro-seen"

/**
 * Decided once per page load and memoised, so the value is a stable snapshot
 * for useSyncExternalStore (an unstable snapshot would re-render forever).
 */
let introDecision: boolean | null = null
function shouldPlayIntro(): boolean {
  if (introDecision !== null) return introDecision
  introDecision = !sessionStorage.getItem(SEEN_KEY) && !prefersReducedMotion()
  if (introDecision) sessionStorage.setItem(SEEN_KEY, "1")
  return introDecision
}

// The overlay must not exist in server markup, or a visitor without JS would
// be stuck behind it. useSyncExternalStore gives us "false on the server, real
// answer on the client" without a setState-inside-an-effect cascade.
const neverChanges = () => () => {}

export function Preloader() {
  const play = useSyncExternalStore(neverChanges, shouldPlayIntro, () => false)
  const [done, setDone] = useState(false)
  const root = useRef<HTMLDivElement>(null)

  // When the intro is skipped (repeat visit, reduced motion), the hero still
  // needs its cue to start.
  useEffect(() => {
    if (play) return
    window.dispatchEvent(new CustomEvent("hb:intro-done"))
  }, [play])

  useEffect(() => {
    if (!play || done) return

    const finish = () => {
      setDone(true)
      document.documentElement.classList.remove("intro-lock")
      window.dispatchEvent(new CustomEvent("hb:intro-done"))
    }

    document.documentElement.classList.add("intro-lock")

    // Browsers restore the previous scroll position on reload, which would play
    // the opening bloom while the reader is halfway down the page.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual"
    window.scrollTo(0, 0)

    const el = root.current
    if (!el) return
    // Ξεχωριστό const με ρητό τύπο: μέσα στη hoisted buildIntro ο TS χάνει το
    // narrowing του el.
    const scope: HTMLDivElement = el

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        tl?.progress(1)
      }
    }
    window.addEventListener("keydown", onKey)

    // Failsafe: αν για οποιονδήποτε λόγο το timeline δεν ολοκληρώσει (σφάλμα
    // αλλού στη σελίδα, χαμένο tab focus με throttled rAF, σπασμένο HMR chunk),
    // το overlay ΔΕΝ επιτρέπεται να μείνει: αυτοκαταργείται μετά από 8".
    const failsafe = window.setTimeout(finish, 8000)

    // Selectors are scoped to the overlay by gsap.context, so the shared
    // `.hb-*` hooks inside <Hibiscus> only match this instance.
    // Δεύτερο failsafe: αν η ίδια η δημιουργία σκάσει, δεν μένουμε ποτέ με
    // στημένο (κρυμμένο) περιεχόμενο κάτω από ζωντανό overlay.
    let tl: gsap.core.Timeline | undefined
    let ctx: gsap.Context
    try {
      ctx = buildIntro()
    } catch {
      finish()
      return () => window.clearTimeout(failsafe)
    }

    function buildIntro() {
      return gsap.context(() => {
      gsap.set(".hb-petal", { scale: 0, opacity: 0, svgOrigin: "150 185" })
      gsap.set(".hb-stamen", { scale: 0, opacity: 0, svgOrigin: "150 186" })
      gsap.set(".hb-throat, .hb-anthers", { opacity: 0 })
      gsap.set(".hb-glow", { scale: 0.3, opacity: 0, svgOrigin: "150 168" })
      gsap.set(".pl-logo", { opacity: 0, y: 26, filter: "blur(10px)" })
      gsap.set(".pl-line", { opacity: 0, y: 14 })

      tl = gsap.timeline({ onComplete: finish })

      tl.to(".hb-glow", { scale: 1, opacity: 1, duration: 1.1, ease: "power2.out" }, 0)
        // Petals open one after another, each with its own overshoot.
        .to(
          ".hb-petal",
          {
            scale: 1,
            opacity: 1,
            duration: 1.05,
            ease: "back.out(1.5)",
            stagger: { each: 0.09, from: "random" },
          },
          0.12
        )
        .to(".hb-throat", { opacity: 1, duration: 0.6, ease: "power2.out" }, 0.5)
        .to(".hb-stamen", { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(2)" }, 0.62)
        .to(".hb-anthers", { opacity: 1, duration: 0.5, ease: "power2.out" }, 0.9)
        .to(
          ".pl-logo",
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" },
          0.86
        )
        .to(".pl-line", { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 1.08)
        .to({}, { duration: 0.34 })
        // Lift away as a soft organic wipe rather than a hard fade.
        .to(".pl-flower", { scale: 1.5, opacity: 0, duration: 0.9, ease: "power2.inOut" }, ">-0.1")
        .to(".pl-logo, .pl-line", { opacity: 0, y: -18, duration: 0.6, ease: "power2.in" }, "<")
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.95, ease: "power3.inOut" }, "<0.15")

        // Dev aid: ?holdintro=<seconds> freezes the opening bloom for inspection.
        // Development only — a visitor must never be able to stall the intro.
        if (process.env.NODE_ENV !== "production") {
          const hold = new URLSearchParams(location.search).get("holdintro")
          if (hold !== null) tl!.pause(Number(hold) || 1.35)
        }
      }, scope)
    }

    return () => {
      window.clearTimeout(failsafe)
      window.removeEventListener("keydown", onKey)
      tl?.kill()
      ctx.revert()
      document.documentElement.classList.remove("intro-lock")
    }
  }, [play, done])

  if (!play || done) return null

  return (
    <div
      ref={root}
      className="on-dark fixed inset-0 z-[100] flex flex-col items-center justify-center bg-forest"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      role="status"
      aria-live="polite"
      aria-label={loader.label}
    >
      <div className="wash-forest pointer-events-none absolute inset-0 opacity-70" />

      <div className="pl-flower relative w-[42vw] max-w-[280px] min-w-[170px]">
        <Hibiscus seed={97} idPrefix="pl" className="h-auto w-full" />
      </div>

      <div className="pl-logo relative mt-6 w-[54vw] max-w-[320px] min-w-[190px]">
        <Image
          src="/brand/logo-green-640.webp"
          alt="Hibi Bloom"
          width={640}
          height={532}
          priority
          className="h-auto w-full"
        />
      </div>

      <p className="pl-line relative mt-4 text-center text-[0.82rem] tracking-[0.16em] text-leaf-200/80 uppercase">
        {loader.line}
      </p>
    </div>
  )
}
