"use client"

import { useRef, useState } from "react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { Leaf } from "@/components/botanical/Flora"
import { ScrollBloom } from "@/components/botanical/ScrollBloom"
import { KidFloat } from "@/components/botanical/KidFloat"
import { faq } from "@/content/site"

/**
 * FAQ.
 *
 * Built on real buttons with `aria-expanded` / `aria-controls` rather than
 * <details>, so the open/close can be animated by height without fighting the
 * element's native toggle. Panels stay in the DOM and are hidden with `hidden`
 * so the answers remain indexable.
 */

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section
      id={faq.id}
      className="relative isolate overflow-hidden bg-cream-warm py-28 sm:py-36"
    >
      <div className="wash-bloom pointer-events-none absolute inset-0 -z-20 opacity-30" />

      <div className="mx-auto grid max-w-[1180px] gap-14 px-5 sm:px-8 lg:grid-cols-12">
        <div className="relative lg:col-span-4">
          <SectionHeading kicker={faq.kicker} title={faq.title} />
          <div className="pointer-events-none mt-10 hidden w-32 opacity-40 lg:block">
            <Leaf seed={1201} tone="leaf" className="h-auto w-full" />
          </div>
          <ScrollBloom
            seed={3130}
            idPrefix="faqbloom"
            rotate={8}
            className="top-40 -left-16 -z-10 hidden w-44 opacity-[0.14] lg:block"
          />
          <KidFloat
            pose="dog"
            drift={30}
            className="bottom-4 left-2 hidden w-36 opacity-90 lg:block"
          />
        </div>

        <div className="lg:col-span-8">
          <ul className="divide-y divide-forest/10 border-y border-forest/10">
            {faq.items.map((item, i) => (
              <FaqRow
                key={item.q}
                item={item}
                index={i}
                open={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function FaqRow({
  item,
  index,
  open,
  onToggle,
}: {
  item: { q: string; a: string }
  index: number
  open: boolean
  onToggle: () => void
}) {
  const panel = useRef<HTMLDivElement>(null)

  return (
    <li>
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`faq-panel-${index}`}
          id={`faq-button-${index}`}
          className="group flex w-full items-start gap-5 py-6 text-left transition-colors duration-300"
        >
          <span className="mt-1.5 text-[0.68rem] tracking-[0.2em] text-magenta/45 tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span
            className={`flex-1 text-[clamp(1.02rem,2.1vw,1.2rem)] leading-snug transition-colors duration-300 ${
              open ? "text-magenta" : "text-forest group-hover:text-magenta/80"
            }`}
          >
            {item.q}
          </span>

          {/* A bud that opens into a cross-free bloom. */}
          <span
            aria-hidden="true"
            className={`relative mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              open
                ? "rotate-90 border-magenta/40 bg-magenta/10"
                : "border-forest/15 group-hover:border-magenta/40"
            }`}
          >
            <span
              className={`absolute h-px w-3 transition-colors duration-300 ${
                open ? "bg-magenta" : "bg-forest/60"
              }`}
            />
            <span
              className={`absolute h-3 w-px transition-all duration-500 ${
                open ? "scale-y-0 bg-magenta" : "scale-y-100 bg-forest/60"
              }`}
            />
          </span>
        </button>
      </h3>

      <div
        id={`faq-panel-${index}`}
        role="region"
        aria-labelledby={`faq-button-${index}`}
        ref={panel}
        className="grid transition-[grid-template-rows,opacity] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          <p className="max-w-[62ch] pt-1 pr-10 pb-7 pl-[3.1rem] text-[0.97rem] leading-[1.85] text-forest/68">
            {item.a}
          </p>
        </div>
      </div>
    </li>
  )
}
