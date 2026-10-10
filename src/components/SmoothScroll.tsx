"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap"

/**
 * Lenis, driven by GSAP's ticker.
 *
 * Running Lenis on its own rAF alongside GSAP's produces a one-frame lag
 * between the scroll position and any ScrollTrigger-driven animation, which
 * shows up as jitter on pinned sections. Driving Lenis from `gsap.ticker` keeps
 * both on the same clock.
 *
 * Also exposes the instance on `window.__lenis` so anchor links elsewhere can
 * ask it to scroll rather than fighting it with native `scrollIntoView`.
 */

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      duration: 1.15,
      // Long, soft tail — the scroll should feel like it settles, not stops.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
      wheelMultiplier: 0.95,
    })

    window.__lenis = lenis
    lenis.on("scroll", ScrollTrigger.update)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Anchor links: hand navigation to Lenis so the easing matches.
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]')
      if (!target) return
      const href = target.getAttribute("href")
      if (!href || href === "#") return
      const el = document.querySelector(href)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el as HTMLElement, { offset: -12, duration: 1.4 })
      // Keep the URL and focus honest for keyboard and screen-reader users.
      history.pushState(null, "", href)
      ;(el as HTMLElement).setAttribute("tabindex", "-1")
      ;(el as HTMLElement).focus({ preventScroll: true })
    }
    document.addEventListener("click", onClick)

    // Arriving on /#section: the browser's native jump happens before pins and
    // images settle (and the intro scrolls to top), so land again once the
    // intro is over and ScrollTrigger has measured the final layout.
    const hash = location.hash.length > 1 ? decodeURIComponent(location.hash.slice(1)) : ""
    const landOnHash = () =>
      requestAnimationFrame(() => {
        const el = hash && document.getElementById(hash)
        if (!el) return
        ScrollTrigger.refresh()
        lenis.scrollTo(el, { offset: -12, immediate: true, force: true })
      })
    if (hash) window.addEventListener("hb:intro-done", landOnHash, { once: true })

    return () => {
      window.removeEventListener("hb:intro-done", landOnHash)
      document.removeEventListener("click", onClick)
      gsap.ticker.remove(raf)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])

  return null
}
