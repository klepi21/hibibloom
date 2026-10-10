import type { Metadata } from "next"
import Image from "next/image"
import { Footer } from "@/components/sections/Footer"
import { alternates, href, type Lang } from "@/content"
import { privacy } from "@/content/privacy"

export function privacyMetadata(lang: Lang): Metadata {
  const p = privacy[lang]
  return { title: p.title, description: p.description, alternates: alternates("privacy", lang) }
}

export function PrivacyPage({ lang }: { lang: Lang }) {
  const p = privacy[lang]
  const home = href("home", lang)

  return (
    <>
      <main id="main" className="bg-cream text-forest">
        <div className="mx-auto max-w-[760px] px-5 pt-10 pb-24 sm:px-8 sm:pt-14">
          <a href={home} className="inline-block w-[120px]" aria-label={p.logoLabel}>
            <Image src="/brand/logo-green-320.webp" alt="Hibi Bloom" width={320} height={266} className="h-auto w-full" />
          </a>

          <h1 className="mt-12 font-display text-[clamp(2rem,5.5vw,3.2rem)] leading-tight text-forest">{p.title}</h1>
          <p className="mt-3 text-[0.85rem] text-forest/50">
            {p.updatedLabel}: {p.updated}
          </p>

          <div className="mt-12 space-y-11">
            {p.sections.map((s) => (
              <section key={s.title}>
                <h2 className="font-display text-[1.35rem] text-forest">{s.title}</h2>
                {s.body.map((para) => (
                  <p key={para.slice(0, 32)} className="mt-4 text-[1rem] leading-[1.85] text-forest/75">
                    {para}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <a href={home} className="mt-16 inline-block text-[0.95rem] text-magenta-600 underline underline-offset-4">
            {p.back}
          </a>
        </div>
      </main>
      <Footer lang={lang} onHome={false} />
    </>
  )
}
