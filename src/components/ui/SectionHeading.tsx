"use client"

import { Reveal, RevealText } from "@/components/ui/Reveal"

/**
 * The shared section opener: a small numbered kicker over a large Greek title.
 * Keeping it in one place is what makes the rhythm of the page feel composed
 * rather than assembled section by section.
 */
export function SectionHeading({
  kicker,
  title,
  lead,
  align = "left",
  tone = "forest",
}: {
  kicker: string
  title: string
  lead?: string
  align?: "left" | "center"
  tone?: "forest" | "cream"
}) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left"
  const titleColour = tone === "cream" ? "text-cream" : "text-forest"
  const kickerColour = tone === "cream" ? "text-melon/70" : "text-magenta/60"
  const leadColour = tone === "cream" ? "text-cream/70" : "text-forest/65"

  return (
    <div className={`flex flex-col ${alignment}`}>
      <Reveal y={18} duration={0.8}>
        <span
          className={`mb-5 block text-[0.7rem] tracking-[0.26em] uppercase ${kickerColour}`}
        >
          {kicker}
        </span>
      </Reveal>

      <RevealText
        as="h2"
        text={title}
        className={`font-display text-[clamp(2rem,5.6vw,3.9rem)] ${titleColour}`}
      />

      {lead && (
        <Reveal delay={0.12} y={22}>
          <p
            className={`mt-6 max-w-[52ch] text-[clamp(1rem,2vw,1.16rem)] leading-[1.75] ${leadColour}`}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  )
}
