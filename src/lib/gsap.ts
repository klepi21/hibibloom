"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"

/**
 * Single registration point for GSAP plugins.
 *
 * Registering more than once is harmless but registering in a server bundle is
 * not, so every consumer imports from here and only from a client component.
 */
if (typeof window !== "undefined") {
  // All GSAP plugins are free as of 3.13 — MotionPath drives the insects'
  // flight, DrawSVG grows the vines.
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, DrawSVGPlugin)
  // ScrollTrigger must not fight Lenis over scroll position.
  ScrollTrigger.config({ ignoreMobileResize: true })
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

export { gsap, ScrollTrigger, MotionPathPlugin, DrawSVGPlugin }
