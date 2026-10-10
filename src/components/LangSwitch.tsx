"use client"

import { useId } from "react"
import { usePathname } from "next/navigation"
import { counterpart, langs, type Lang } from "@/content"
import { useContent, useLang } from "@/content/LangProvider"

/**
 * GR / EN toggle. Each option links to the same page in the other language.
 *
 * Plain <a>, not next/link: the two languages are separate root layouts, so
 * crossing between them is a full page load anyway. The flags are drawn as SVG
 * because emoji flags do not render on Windows.
 */

const LABEL: Record<Lang, string> = { el: "GR", en: "EN" }
const NAME: Record<Lang, string> = { el: "Ελληνικά", en: "English" }

export function LangSwitch({
  tone = "forest",
  className = "",
  labels = false,
}: {
  tone?: "forest" | "cream"
  className?: string
  /** Always show GR / EN, even on small screens (the mobile menu has room). */
  labels?: boolean
}) {
  const lang = useLang()
  const { ui } = useContent()
  const pathname = usePathname() ?? "/"

  const idle = tone === "cream" ? "text-cream/60 hover:text-cream" : "text-forest/55 hover:text-forest"
  const active = tone === "cream" ? "bg-cream/12 text-cream" : "bg-forest/8 text-forest"
  const ring = tone === "cream" ? "border-leaf/25" : "border-forest/12"

  return (
    <nav aria-label={ui.langSwitch} className={`inline-flex items-center gap-0.5 rounded-full border p-0.5 ${ring} ${className}`}>
      {langs.map((l) => {
        const current = l === lang
        return (
          <a
            key={l}
            href={current ? undefined : counterpart(pathname, l)}
            hrefLang={l}
            lang={l}
            aria-current={current ? "true" : undefined}
            aria-label={NAME[l]}
            className={`flex items-center gap-1.5 rounded-full px-2 py-2 sm:px-2.5 sm:py-1.5 text-[0.74rem] tracking-[0.08em] transition-colors duration-300 ${
              current ? active : idle
            }`}
          >
            <Flag lang={l} />
            {/* Flags alone on small phones, where the header has no room to spare. */}
            <span className={labels ? "" : "hidden sm:inline"}>{LABEL[l]}</span>
          </a>
        )
      })}
    </nav>
  )
}

function Flag({ lang }: { lang: Lang }) {
  // Two switches can be on the page at once (bar + mobile menu): unique clip id.
  const clip = useId()
  return (
    <svg viewBox="0 0 27 18" className="h-[11px] w-[16px] shrink-0 overflow-hidden rounded-[2px]" aria-hidden="true">
      {lang === "el" ? (
        <>
          <rect width="27" height="18" fill="#0D5EAF" />
          {[1, 3, 5, 7].map((i) => (
            <rect key={i} y={i * 2} width="27" height="2" fill="#fff" />
          ))}
          <rect width="10" height="10" fill="#0D5EAF" />
          <rect x="4" width="2" height="10" fill="#fff" />
          <rect y="4" width="10" height="2" fill="#fff" />
        </>
      ) : (
        <>
          <clipPath id={clip}>
            <rect width="27" height="18" />
          </clipPath>
          <g clipPath={`url(#${clip})`}>
            <rect width="27" height="18" fill="#012169" />
            <path d="M0 0 27 18M27 0 0 18" stroke="#fff" strokeWidth="3.6" />
            <path d="M0 0 27 18M27 0 0 18" stroke="#C8102E" strokeWidth="1.4" />
            <path d="M13.5 0v18M0 9h27" stroke="#fff" strokeWidth="6" />
            <path d="M13.5 0v18M0 9h27" stroke="#C8102E" strokeWidth="3.4" />
          </g>
        </>
      )}
    </svg>
  )
}
