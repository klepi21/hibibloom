"use client"

import { useEffect, useRef, useState } from "react"
import { gsap, prefersReducedMotion } from "@/lib/gsap"
import { Hibiscus } from "@/components/botanical/Hibiscus"
import { Pollen } from "@/components/botanical/Pollen"
import { Flight } from "@/components/botanical/Flight"
import { MagneticButton } from "@/components/ui/MagneticButton"
import { RevealText } from "@/components/ui/Reveal"
import { contact } from "@/content/site"

/**
 * Scene 06 — the whole garden blooms.
 *
 * A giant hibiscus opens behind the closing call to action as the section is
 * pinned, then the form arrives. The form validates client-side and reports
 * errors through `aria-describedby`; it has no backend yet, so submission is
 * simulated and clearly marked below.
 */

type Status = "idle" | "sending" | "sent" | "error"

export function Contact() {
  const root = useRef<HTMLElement>(null)
  const [status, setStatus] = useState<Status>("idle")
  const [errors, setErrors] = useState<Record<string, string>>({})

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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const next: Record<string, string> = {}

    const name = String(data.get("name") ?? "").trim()
    const email = String(data.get("email") ?? "").trim()
    const message = String(data.get("message") ?? "").trim()

    if (!name) next.name = contact.form.required
    if (!email) next.email = contact.form.required
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = contact.form.invalidEmail
    if (!message) next.message = contact.form.required

    setErrors(next)
    if (Object.keys(next).length) {
      const first = document.getElementById(Object.keys(next)[0])
      first?.focus()
      return
    }

    // NOTE: no backend is wired up. Point this at your form handler
    // (Formspree, Resend, a route handler, …) before launch.
    setStatus("sending")
    window.setTimeout(() => setStatus("sent"), 900)
  }

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
            {contact.kicker}
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

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ---- form ---- */}
          <div className="lg:col-span-7">
            {status === "sent" ? (
              <div
                role="status"
                className="glass-dark radius-soft flex min-h-[320px] flex-col items-center justify-center p-10 text-center"
              >
                <div className="mb-5 w-20">
                  <Hibiscus seed={321} idPrefix="thanks" glow={false} className="h-auto w-full" />
                </div>
                <p className="font-display text-[1.5rem] text-cream">{contact.form.success}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
                <Field
                  id="name"
                  name="name"
                  label={contact.form.name}
                  error={errors.name}
                  autoComplete="name"
                />
                <Field
                  id="email"
                  name="email"
                  type="email"
                  label={contact.form.email}
                  error={errors.email}
                  autoComplete="email"
                />
                <Field
                  id="phone"
                  name="phone"
                  type="tel"
                  label={contact.form.phone}
                  autoComplete="tel"
                />
                <Field id="child" name="child" label={contact.form.child} />

                {/* Χωρίς δικό μας χώρο, η περιοχή είναι το πρώτο πράγμα που
                    χρειαζόμαστε για να απαντήσουμε αν καλύπτεται κατ' οίκον. */}
                <div className="sm:col-span-2">
                  <Field id="area" name="area" label={contact.form.area} />
                </div>

                <div className="sm:col-span-2">
                  <Field
                    id="message"
                    name="message"
                    label={contact.form.message}
                    error={errors.message}
                    textarea
                  />
                </div>

                <label className="flex items-start gap-3 text-[0.84rem] leading-relaxed text-cream/60 sm:col-span-2">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-magenta)]"
                  />
                  {contact.form.consent}
                </label>

                <div className="sm:col-span-2">
                  <MagneticButton type="submit" variant="primary" disabled={status === "sending"}>
                    {status === "sending" ? contact.form.sending : contact.form.submit}
                  </MagneticButton>
                </div>
              </form>
            )}
          </div>

          {/* ---- details ---- */}
          <div className="lg:col-span-5">
            <dl className="space-y-7">
              {[
                [contact.details.areasLabel, contact.details.areas],
                [contact.details.phoneLabel, contact.details.phone],
                [contact.details.emailLabel, contact.details.email],
                [contact.details.hoursLabel, contact.details.hours],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="mb-1.5 text-[0.68rem] tracking-[0.22em] text-melon/60 uppercase">
                    {label}
                  </dt>
                  <dd className="text-[1.02rem] text-cream/85">{value}</dd>
                </div>
              ))}
            </dl>

            <ul className="mt-9 flex flex-wrap gap-3">
              {contact.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
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
        </div>
      </div>
    </section>
  )
}

function Field({
  id,
  name,
  label,
  type = "text",
  error,
  textarea,
  autoComplete,
}: {
  id: string
  name: string
  label: string
  type?: string
  error?: string
  textarea?: boolean
  autoComplete?: string
}) {
  const cls = `peer w-full rounded-2xl border bg-white/5 px-4 pt-6 pb-2.5 text-[0.97rem] text-cream outline-none transition-colors duration-300 placeholder-transparent ${
    error ? "border-magenta" : "border-leaf/20 focus:border-melon/60"
  }`

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={5}
          placeholder={label}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${cls} resize-none`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={label}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cls}
        />
      )}

      <label
        htmlFor={id}
        className="pointer-events-none absolute top-2 left-4 text-[0.7rem] tracking-wide text-cream/45 transition-all duration-300 peer-placeholder-shown:top-4.5 peer-placeholder-shown:text-[0.95rem] peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-melon/80"
      >
        {label}
      </label>

      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 pl-1 text-[0.78rem] text-magenta-300">
          {error}
        </p>
      )}
    </div>
  )
}
