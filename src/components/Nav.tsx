"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap, prefersReducedMotion } from "@/lib/gsap"
import { MagneticButton } from "@/components/ui/MagneticButton"
import { Hibiscus } from "@/components/botanical/Hibiscus"
import { useContent, useLang } from "@/content/LangProvider"
import { href } from "@/content"
import { LangSwitch } from "@/components/LangSwitch"

/**
 * Navigation.
 *
 * Transparent over the hero, then settles into glass once the page has moved.
 * The mobile panel is a real modal: focus is trapped, Escape closes it, Lenis
 * is stopped so the page behind cannot scroll, and the trigger is restored on
 * close.
 */

/**
 * `onHome`: section links are in-page anchors. On the landing pages they point
 * back at the home page's sections instead.
 */
export function Nav({ onHome = true }: { onHome?: boolean }) {
  const { nav, ui, contact } = useContent()
  const lang = useLang()
  const homePath = href("home", lang)
  const to = (anchor: string) => (onHome ? anchor : `${homePath}${anchor}`)
  const [open, setOpen] = useState(false)
  const [settled, setSettled] = useState(false)
  const panel = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)

  // Settle the bar after the first screenful.
  useEffect(() => {
    const onScroll = () => setSettled(window.scrollY > 80)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Modal behaviour for the mobile panel.
  useEffect(() => {
    if (!open) return
    // Captured now: by cleanup time the ref may point elsewhere, and we need
    // the element that actually opened the menu to restore focus to.
    const opener = trigger.current
    const lenis = window.__lenis
    lenis?.stop()
    document.documentElement.classList.add("lenis-stopped")

    const node = panel.current
    const focusables = node?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
    )
    focusables?.[0]?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        return
      }
      if (e.key !== "Tab" || !focusables?.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener("keydown", onKey)

    let ctx: gsap.Context | undefined
    if (!prefersReducedMotion() && node) {
      ctx = gsap.context(() => {
        gsap.fromTo(
          ".nav-item",
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.07, delay: 0.12 }
        )
        gsap.fromTo(
          ".nav-flower",
          { scale: 0.6, opacity: 0, rotate: -20 },
          { scale: 1, opacity: 1, rotate: 0, duration: 1.2, ease: "back.out(1.4)" }
        )
      }, node)
    }

    return () => {
      document.removeEventListener("keydown", onKey)
      document.documentElement.classList.remove("lenis-stopped")
      lenis?.start()
      ctx?.revert()
      opener?.focus()
    }
  }, [open])

  return (
    <>
      <a href="#main" className="sr-only-focusable fixed top-3 left-3 z-[120] rounded-full bg-magenta px-5 py-3 text-sm text-white">
        {nav.skip}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-[80] transition-all duration-500 ${
          settled ? "nav-glass py-2.5 shadow-[0_8px_30px_-20px_rgba(16,26,13,0.4)]" : "py-4"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8">
          <a href={onHome ? "#" : homePath} aria-label="Hibi Bloom" className="relative block w-[112px] shrink-0 sm:w-[132px]">
            <Image
              src="/brand/logo-full-320.webp"
              alt="Hibi Bloom"
              width={320}
              height={245}
              priority
              className="h-auto w-full"
            />
          </a>

          <nav aria-label={ui.mainNav} className="hidden items-center gap-7 lg:flex">
            {nav.links.map((l) => (
              <a
                key={l.href}
                href={to(l.href)}
                className="group relative text-[0.9rem] text-forest/75 transition-colors duration-300 hover:text-forest"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-magenta transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LangSwitch />
            {/* Wrapped rather than given `hidden sm:inline-flex` directly:
                MagneticButton's own base classes include `inline-flex`, and two
                competing display utilities at equal specificity let the base
                win — the button stayed visible at every width. */}
            <span className="hidden sm:block">
              <MagneticButton
                href={`#${contact.id}`}
                variant="primary"
                strength={0.24}
                className="!px-6 !py-3 !text-[0.86rem]"
              >
                {nav.cta}
              </MagneticButton>
            </span>

            <button
              ref={trigger}
              type="button"
              onClick={() => setOpen(true)}
              aria-label={nav.menuOpen}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative grid h-11 w-11 place-items-center rounded-full border border-forest/15 text-forest transition-colors hover:border-magenta/50 hover:text-magenta lg:hidden"
            >
              <span className="sr-only">{nav.menuOpen}</span>
              <span aria-hidden="true" className="flex flex-col gap-[5px]">
                <span className="block h-px w-5 bg-current" />
                <span className="block h-px w-5 bg-current" />
                <span className="block h-px w-3.5 bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          ref={panel}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={ui.menu}
          className="on-dark fixed inset-0 z-[110] flex flex-col bg-forest"
        >
          <div className="wash-forest pointer-events-none absolute inset-0 opacity-80" />

          <div className="nav-flower pointer-events-none absolute -right-16 -bottom-16 w-[62vw] max-w-[420px] opacity-25">
            <Hibiscus seed={55} idPrefix="navflower" className="h-auto w-full" glow={false} />
          </div>

          <div className="relative flex items-center justify-between px-5 py-5 sm:px-8">
            <div className="w-[124px]">
              <Image
                src="/brand/logo-green-320.webp"
                alt="Hibi Bloom"
                width={320}
                height={266}
                className="h-auto w-full"
              />
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={nav.menuClose}
              className="grid h-11 w-11 place-items-center rounded-full border border-leaf/30 text-cream transition-colors hover:border-melon hover:text-melon"
            >
              <span aria-hidden="true" className="relative block h-4 w-4">
                <span className="absolute top-1/2 left-0 block h-px w-4 rotate-45 bg-current" />
                <span className="absolute top-1/2 left-0 block h-px w-4 -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <nav
            aria-label={ui.mobileNav}
            className="relative flex flex-1 flex-col justify-center gap-1 px-6 sm:px-10"
          >
            {nav.links.map((l, i) => (
              <a
                key={l.href}
                href={to(l.href)}
                onClick={() => setOpen(false)}
                className="nav-item group flex items-baseline gap-4 py-2.5 text-[clamp(1.6rem,7vw,2.6rem)] font-light text-cream transition-colors duration-300 hover:text-melon"
              >
                <span className="text-[0.7rem] tracking-widest text-leaf/50 tabular-nums">
                  0{i + 1}
                </span>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="nav-item relative px-6 pb-10 sm:px-10">
            <LangSwitch tone="cream" labels className="mb-6" />
            <MagneticButton
              href={`#${contact.id}`}
              variant="primary"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              {nav.cta}
            </MagneticButton>
          </div>
        </div>
      )}
    </>
  )
}
