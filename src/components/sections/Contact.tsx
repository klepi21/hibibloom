"use client"

import { useEffect, useRef } from "react"
import { gsap, prefersReducedMotion } from "@/lib/gsap"
import { Hibiscus } from "@/components/botanical/Hibiscus"
import { Pollen } from "@/components/botanical/Pollen"
import { Flight } from "@/components/botanical/Flight"
import { RevealText } from "@/components/ui/Reveal"
import { useContent } from "@/content/LangProvider"

/**
 * Scene 06 — the whole garden blooms.
 *
 * A giant hibiscus opens behind the closing call to action as the section is
 * pinned. No form: parents call, message on Viber or write, straight from the
 * links below.
 */

/** `kicker`: landing pages drop the home page's section number. */
export function Contact({ kicker }: { kicker?: string } = {}) {
  const { contact } = useContent()
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.set(".hb-petal", { scale: 0.25, opacity: 0, svgOrigin: "150 185" })
      gsap.set(".hb-stamen, .hb-anthers, .hb-throat", { opacity: 0 })

      // The closing bloom is scrubbed to scroll — the reader opens it.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 78%",
          end: "top 18%",
          scrub: 1.1,
        },
      })

      tl.to(".hb-petal", {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        stagger: { each: 0.12, from: "random" },
      })
        .to(".hb-throat", { opacity: 1, duration: 0.5 }, 0.4)
        .to(".hb-stamen", { opacity: 1, duration: 0.6 }, 0.5)
        .to(".hb-anthers", { opacity: 1, duration: 0.5 }, 0.7)

      gsap.to(".contact-flower", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.2 },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      id={contact.id}
      className="on-dark relative isolate overflow-hidden bg-forest py-28 text-cream sm:py-36"
    >
      <div className="wash-forest pointer-events-none absolute inset-0 -z-30 opacity-90" />

      {/* The giant closing bloom. */}
      <div className="contact-flower pointer-events-none absolute top-1/2 left-1/2 -z-20 w-[130vw] max-w-[1100px] -translate-x-1/2 -translate-y-1/2 opacity-[0.16] sm:w-[95vw]">
        <Hibiscus seed={1500} idPrefix="contact" className="h-auto w-full" />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10">
        <Pollen count={80} tone="mixed" seed={77} speed={0.7} />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Flight kind="butterfly" seed={91} size={44} tone="melon" duration={38} />
        <Flight kind="bee" seed={73} size={24} duration={30} />
      </div>

      <div className="mx-auto max-w-[1140px] px-5 sm:px-8">
        <div className="text-center">
          <span className="mb-5 block text-[0.7rem] tracking-[0.26em] text-melon/70 uppercase">
            {kicker ?? contact.kicker}
          </span>
          <RevealText
            as="h2"
            text={contact.title}
            className="font-display text-[clamp(2.2rem,6.6vw,4.6rem)] text-cream"
          />
          <p className="mx-auto mt-6 max-w-[46ch] text-[1.02rem] leading-[1.8] text-cream/65">
            {contact.lead}
          </p>
        </div>

        <dl className="mx-auto mt-16 grid max-w-[980px] gap-10 text-center sm:grid-cols-3 sm:gap-8">
          <div>
            <dt className={dtCls}>{contact.details.phoneLabel}</dt>
            <dd className="flex items-center justify-center gap-3">
              <a href={contact.details.phoneHref} onClick={() => lead("phone")} className={linkCls}>
                {contact.details.phone}
              </a>
              <a
                href={contact.details.viberHref}
                onClick={() => lead("viber")}
                aria-label={contact.details.viberLabel}
                title={contact.details.viberLabel}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-leaf/25 text-cream/80 transition-all duration-400 hover:border-[#7360f2] hover:bg-[#7360f2] hover:text-white"
              >
                <ViberIcon className="h-5 w-5" />
              </a>
            </dd>
          </div>
          <div>
            <dt className={dtCls}>{contact.details.emailLabel}</dt>
            <dd>
              <a
                href={`mailto:${contact.details.email}`}
                onClick={() => lead("email")}
                className={linkCls}
              >
                {contact.details.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className={dtCls}>{contact.details.areasLabel}</dt>
            <dd className="text-[1.1rem] text-cream/85">{contact.details.areas}</dd>
          </div>
        </dl>

        <ul className="mt-14 flex flex-wrap justify-center gap-3">
          {contact.social.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full border border-leaf/25 px-5 py-2.5 text-[0.85rem] text-cream/75 transition-all duration-400 hover:border-melon/60 hover:text-melon"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Χωρίς φυσικό χώρο δεν υπάρχει χάρτης: τα μαθήματα γίνονται
            κατ' οίκον και σε συνεργαζόμενους χώρους. */}
      </div>
    </section>
  )
}

const dtCls = "mb-2.5 text-[0.68rem] tracking-[0.22em] text-melon/60 uppercase"
const linkCls =
  "text-[1.1rem] text-cream/90 underline decoration-melon/30 underline-offset-4 transition-colors duration-300 hover:text-melon hover:decoration-melon"

/** A tap on a contact link is the site's lead now that there is no form. */
const lead = (method: "phone" | "viber" | "email") =>
  window.gtag?.("event", "generate_lead", { method })

/** Viber glyph from Simple Icons (CC0). */
function ViberIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M11.4 0C9.473.028 5.333.344 3.02 2.467 1.302 4.187.696 6.7.633 9.817.57 12.933.488 18.776 6.12 20.36h.003l-.004 2.416s-.037.977.61 1.177c.777.242 1.234-.5 1.98-1.302.407-.44.972-1.084 1.397-1.58 3.85.326 6.812-.416 7.15-.525.776-.252 5.176-.816 5.892-6.657.74-6.02-.36-9.83-2.34-11.546-.596-.55-3.006-2.3-8.375-2.323 0 0-.395-.025-1.037-.017zm.058 1.693c.545-.004.88.017.88.017 4.542.02 6.717 1.388 7.222 1.846 1.675 1.435 2.53 4.868 1.906 9.897v.002c-.604 4.878-4.174 5.184-4.832 5.395-.28.09-2.882.737-6.153.524 0 0-2.436 2.94-3.197 3.704-.12.12-.26.167-.352.144-.13-.033-.166-.188-.165-.414l.02-4.018c-4.762-1.32-4.485-6.292-4.43-8.895.054-2.604.543-4.738 1.996-6.173 1.96-1.773 5.474-2.018 7.11-2.03zm.38 2.602c-.167 0-.303.135-.304.302 0 .167.133.303.3.305 1.624.01 2.946.537 4.028 1.592 1.073 1.046 1.62 2.468 1.633 4.334.002.167.14.3.307.3.166-.002.3-.138.3-.304-.014-1.984-.618-3.596-1.816-4.764-1.19-1.16-2.692-1.753-4.447-1.765zm-3.96.695c-.19-.032-.4.005-.616.117l-.01.002c-.43.247-.816.562-1.146.932-.002.004-.006.004-.008.008-.267.323-.42.638-.46.948-.008.046-.01.093-.007.14 0 .136.022.27.065.4l.013.01c.135.48.473 1.276 1.205 2.604.42.768.903 1.5 1.446 2.186.27.344.56.673.87.984l.132.132c.31.308.64.6.984.87.686.543 1.418 1.027 2.186 1.447 1.328.733 2.126 1.07 2.604 1.206l.01.014c.13.042.265.064.402.063.046.002.092 0 .138-.008.31-.036.627-.19.948-.46.004 0 .003-.002.008-.005.37-.33.683-.72.93-1.148l.003-.01c.225-.432.15-.842-.18-1.12-.004 0-.698-.58-1.037-.83-.36-.255-.73-.492-1.113-.71-.51-.285-1.032-.106-1.248.174l-.447.564c-.23.283-.657.246-.657.246-3.12-.796-3.955-3.955-3.955-3.955s-.037-.426.248-.656l.563-.448c.277-.215.456-.737.17-1.248-.217-.383-.454-.756-.71-1.115-.25-.34-.826-1.033-.83-1.035-.137-.165-.31-.265-.502-.297zm4.49.88c-.158.002-.29.124-.3.282-.01.167.115.312.282.324 1.16.085 2.017.466 2.645 1.15.63.688.93 1.524.906 2.57-.002.168.13.306.3.31.166.003.305-.13.31-.297.025-1.175-.334-2.193-1.067-2.994-.74-.81-1.777-1.253-3.05-1.346h-.024zm.463 1.63c-.16.002-.29.127-.3.287-.008.167.12.31.288.32.523.028.875.175 1.113.422.24.245.388.62.416 1.164.01.167.15.295.318.287.167-.008.295-.15.287-.317-.03-.644-.215-1.178-.58-1.557-.367-.378-.893-.574-1.52-.607h-.018z" />
    </svg>
  )
}
