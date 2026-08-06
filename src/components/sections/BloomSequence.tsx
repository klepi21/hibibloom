"use client"

import { useEffect, useRef, useSyncExternalStore } from "react"
import Image from "next/image"
import { gsap, prefersReducedMotion } from "@/lib/gsap"
import { bloom } from "@/content/site"

/**
 * Το κινηματογραφικό ιντερμέδιο: ένας ιβίσκος ανθίζει καρέ-καρέ, οδηγημένος
 * αποκλειστικά από το scroll.
 *
 * Τα καρέ προέρχονται από timelapse που παρήχθη με Higgsfield (nano_banana_pro
 * για τα δύο ακραία καρέ, seedance για την ενδιάμεση κίνηση) και σερβίρονται ως
 * ακολουθία webp. Το section καρφώνεται (pin) για ~2.2 οθόνες και ο δείκτης
 * καρέ είναι scrubbed στην πρόοδο, οπότε η άνθιση τρέχει μπρος-πίσω με τον
 * επισκέπτη, όχι με ρολόι.
 *
 * - Τα καρέ προφορτώνονται μόλις το section πλησιάσει (μία οθόνη νωρίτερα).
 * - Μέχρι να φορτώσουν, φαίνεται το πρώτο καρέ ως ποστ-εικόνα από κάτω.
 * - Σε prefers-reduced-motion δεν υπάρχει pin: μόνο το ανοιχτό λουλούδι.
 */

const FRAME_COUNT = 61
const frameSrc = (i: number) => `/bloom/frame-${String(i + 1).padStart(3, "0")}.webp`

// false στον server, πραγματική απάντηση στον client, χωρίς setState-σε-effect.
const noop = () => () => {}

export function BloomSequence() {
  const section = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useSyncExternalStore(noop, prefersReducedMotion, () => false)

  useEffect(() => {
    if (reduced) return

    const el = section.current
    const canvas = canvasRef.current
    if (!el || !canvas) return
    const ctx2d = canvas.getContext("2d")
    if (!ctx2d) return

    const images: (HTMLImageElement | null)[] = Array(FRAME_COUNT).fill(null)
    let loadedCount = 0
    let started = false
    const state = { frame: 0 }

    const draw = () => {
      // Ζωγραφίζουμε το κοντινότερο φορτωμένο καρέ προς τα πίσω, ώστε το
      // scrubbing να μη σκοντάφτει όσο η προφόρτωση τρέχει ακόμη.
      let idx = Math.round(state.frame)
      while (idx > 0 && !images[idx]) idx--
      const img = images[idx]
      if (!img) return
      const cw = canvas.width
      const ch = canvas.height
      // cover
      const scale = Math.max(cw / img.width, ch / img.height)
      const w = img.width * scale
      const h = img.height * scale
      ctx2d.clearRect(0, 0, cw, ch)
      ctx2d.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h)
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      draw()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const preload = () => {
      if (started) return
      started = true
      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new window.Image()
        img.src = frameSrc(i)
        img.onload = () => {
          images[i] = img
          loadedCount++
          // Ξαναζωγραφίζουμε όποτε φτάνει καρέ στο ύψος του τρέχοντος στόχου ή
          // πιο κάτω: το draw() διαλέγει πάντα το κοντινότερο φορτωμένο, οπότε
          // η εικόνα βελτιώνεται μονότονα αντί να περιμένει το ακριβές καρέ.
          if (i <= Math.ceil(state.frame) || loadedCount === 1) draw()
        }
      }
    }

    // Η προφόρτωση ξεκινά μία οθόνη πριν φανεί το section.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          preload()
          io.disconnect()
        }
      },
      { rootMargin: "100% 0px" }
    )
    io.observe(el)

    // Το pin δημιουργείται ένα frame μετά το mount, αφού έχουν στηθεί όλα τα
    // υπόλοιπα (μη-pinned) triggers της σελίδας: η δημιουργία pin ανάμεσα σε
    // άλλα create προκαλούσε αναδρομικό refresh που έσκαγε μέσα στο GSAP.
    let ctx: gsap.Context | undefined
    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        // Ένα κοινό scrubbed timeline: τα καρέ τρέχουν σε όλη τη διάρκεια του
        // pin και η φράση ανθίζει μαζί με τα τελευταία πέταλα (στο ~72%).
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=220%",
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
          },
        })
        tl.to(state, { frame: FRAME_COUNT - 1, ease: "none", onUpdate: draw, duration: 1 }, 0)
        tl.fromTo(
          ".bloomseq-copy",
          { opacity: 0, y: 34 },
          { opacity: 1, y: 0, duration: 0.24, ease: "none" },
          0.72
        )
      }, el)
    })

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      ctx?.revert()
    }
  }, [reduced])

  if (reduced) {
    return (
      <section className="on-dark relative isolate overflow-hidden bg-forest" aria-label={bloom.aria}>
        <div className="relative mx-auto max-w-[1400px]">
          <Image
            src={frameSrc(FRAME_COUNT - 1)}
            alt={bloom.aria}
            width={1280}
            height={720}
            className="h-auto w-full"
          />
          <p className="absolute inset-x-0 bottom-10 text-center font-display text-[clamp(1.4rem,3.5vw,2.4rem)] text-cream">
            {bloom.line}
          </p>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={section}
      className="on-dark relative isolate h-[100svh] overflow-hidden bg-forest"
      aria-label={bloom.aria}
    >
      {/* Ποστ-εικόνα κάτω από τον καμβά μέχρι να φορτώσουν τα καρέ. Eager,
          ώστε ακόμα και ένα ακαριαίο άλμα στη μέση της σελίδας να μη δείξει
          ποτέ κενό μαύρο καρέ. */}
      <Image
        src={frameSrc(0)}
        alt=""
        fill
        sizes="100vw"
        loading="eager"
        className="object-cover"
        aria-hidden="true"
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />

      {/* Ομαλά περάσματα από/προς τα γειτονικά sections. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-forest to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-forest to-transparent" />

      <div className="bloomseq-copy pointer-events-none absolute inset-x-0 bottom-[12%] px-6 text-center">
        <span className="mb-4 block text-[0.7rem] tracking-[0.26em] text-melon/70 uppercase">
          {bloom.kicker}
        </span>
        <p className="mx-auto max-w-[26ch] font-display text-[clamp(1.6rem,4.2vw,3rem)] text-cream">
          {bloom.line}
        </p>
      </div>
    </section>
  )
}
