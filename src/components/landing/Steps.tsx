"use client"

import { SectionHeading } from "@/components/ui/SectionHeading"
import { Reveal } from "@/components/ui/Reveal"
import { Leaf } from "@/components/botanical/Flora"

/**
 * Four numbered beats in the same hand as the home page's "three steps":
 * a soft magenta numeral, a short title, one sentence.
 */
export function Steps({
  id,
  kicker,
  title,
  items,
}: {
  id: string
  kicker: string
  title: string
  items: { title: string; text: string }[]
}) {
  return (
    <section id={id} className="relative isolate overflow-hidden bg-cream py-24 sm:py-32">
      <div className="wash-bloom pointer-events-none absolute inset-0 -z-20 opacity-30" />
      <div className="pointer-events-none absolute -bottom-6 -left-8 -z-10 w-28 rotate-[150deg] opacity-25 sm:w-40">
        <Leaf seed={1777} tone="leaf" className="h-auto w-full" />
      </div>

      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <SectionHeading kicker={kicker} title={title} />

        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {items.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 0.08} y={28}>
                <span className="mb-3 block font-display text-[2.4rem] text-magenta/30">0{i + 1}</span>
                <h3 className="mb-2 text-[1.08rem] font-medium text-forest">{s.title}</h3>
                <p className="text-[0.94rem] leading-[1.75] text-forest/64">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
