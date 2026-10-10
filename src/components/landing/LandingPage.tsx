import type { Metadata } from "next"
import { SmoothScroll } from "@/components/SmoothScroll"
import { Grain } from "@/components/ui/Grain"
import { Nav } from "@/components/Nav"
import { JsonLd, ogImage } from "@/components/RootShell"
import { faqLd } from "@/components/HomePage"
import { Programs } from "@/components/sections/Programs"
import { HomeLessons } from "@/components/sections/HomeLessons"
import { Benefits } from "@/components/sections/Benefits"
import { Faq } from "@/components/sections/Faq"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/sections/Footer"
import { RevealText, Reveal } from "@/components/ui/Reveal"
import { MagneticButton } from "@/components/ui/MagneticButton"
import { ScrollBloom } from "@/components/botanical/ScrollBloom"
import { KidFloat } from "@/components/botanical/KidFloat"
import { Steps } from "./Steps"
import { getContent, href, alternates, type Lang } from "@/content"
import { pageContent, landingKeys, type LandingKey } from "@/content/pages"

/**
 * A search landing page: one intent, one H1, then the home page's own sections
 * re-headed for the topic, ending on the same contact form. No intro overlay;
 * someone arriving from Google came for the answer, not the show.
 */

const POSE: Record<LandingKey, "tree" | "warrior" | "lotus"> = {
  kids: "tree",
  teens: "warrior",
  atHome: "lotus",
}

export function landingMetadata(key: LandingKey, lang: Lang): Metadata {
  const p = pageContent[lang].pages[key]
  return {
    title: p.metaTitle,
    description: p.metaDescription,
    alternates: alternates(key, lang),
    // Page-level openGraph replaces the layout's wholesale, so the image is restated.
    openGraph: { title: p.metaTitle, description: p.metaDescription, url: href(key, lang), images: [ogImage(lang)] },
    twitter: { card: "summary_large_image", title: p.metaTitle, description: p.metaDescription, images: [ogImage(lang).url] },
  }
}

export function LandingPage({ page: key, lang }: { page: LandingKey; lang: Lang }) {
  const { site, contact } = getContent(lang)
  const set = pageContent[lang]
  const p = set.pages[key]
  const homePath = href("home", lang)
  const others = landingKeys.filter((k) => k !== key)

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: set.crumbs, item: `${site.url}${homePath === "/" ? "" : homePath}` },
      { "@type": "ListItem", position: 2, name: p.link, item: `${site.url}${href(key, lang)}` },
    ],
  }

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={faqLd(p.faq.items)} />
      <SmoothScroll waitForIntro={false} />
      <Grain />
      <Nav onHome={false} />

      <main id="main">
        {/* ---- page hero ---- */}
        <section className="relative isolate overflow-hidden bg-cream pt-36 pb-16 sm:pt-44 sm:pb-24">
          <div className="wash-bloom pointer-events-none absolute inset-0 -z-20 opacity-60" />
          <ScrollBloom
            seed={key === "kids" ? 4120 : key === "teens" ? 4380 : 4610}
            idPrefix={`lp-${key}`}
            rotate={-8}
            start="top bottom"
            end="bottom top"
            className="top-24 -right-20 -z-10 w-64 opacity-30 sm:w-96"
          />
          <KidFloat
            pose={POSE[key]}
            drift={-36}
            className="right-[7%] bottom-[8%] -z-10 hidden w-28 opacity-90 lg:block"
          />

          <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
            <nav aria-label={set.crumbLabel} className="mb-10 text-[0.8rem] text-forest/50">
              <ol className="flex items-center gap-2">
                <li>
                  <a href={homePath} className="transition-colors hover:text-magenta">
                    {set.crumbs}
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-forest/75">
                  {p.link}
                </li>
              </ol>
            </nav>

            <Reveal y={18} duration={0.8}>
              <span className="mb-5 block text-[0.7rem] tracking-[0.26em] text-magenta/60 uppercase">
                {p.kicker}
              </span>
            </Reveal>
            <RevealText
              as="h1"
              text={p.h1}
              className="max-w-[16ch] font-display text-[clamp(2.4rem,7vw,4.8rem)] leading-[1.05] text-forest"
            />
            <Reveal delay={0.15} y={22}>
              <p className="mt-7 max-w-[54ch] text-[clamp(1.02rem,2vw,1.2rem)] leading-[1.75] text-forest/68">
                {p.lead}
              </p>
            </Reveal>
            <Reveal delay={0.25} y={22}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <MagneticButton href={`#${contact.id}`} variant="primary">
                  {p.cta}
                </MagneticButton>
                <MagneticButton href={`#${p.ctaSecondary.anchor}`} variant="ghost" strength={0.2}>
                  {p.ctaSecondary.label}
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---- intro ---- */}
        <section className={`relative isolate py-20 sm:py-28 ${key === "atHome" ? "bg-cream-warm" : "bg-cream"}`}>
          <div className="mx-auto grid max-w-[1180px] gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <RevealText
                as="h2"
                text={p.intro.title}
                className="font-display text-[clamp(1.8rem,4.4vw,3rem)] leading-[1.15] text-forest"
              />
            </div>
            <div className="space-y-6 lg:col-span-7">
              {p.intro.body.map((para, i) => (
                <Reveal key={para.slice(0, 24)} delay={i * 0.1} y={24}>
                  <p className="text-[1.04rem] leading-[1.9] text-forest/70">{para}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---- the home page's own section, re-headed for this topic ---- */}
        {p.programs ? (
          <Programs only={p.programs} {...p.section} />
        ) : (
          <HomeLessons {...p.section} />
        )}

        <Steps
          id={p.steps.id}
          kicker={p.steps.kicker}
          title={p.steps.title}
          items={p.steps.items}
        />

        {p.benefits && <Benefits kicker={p.benefits} />}

        <Faq id={`${key}-faq`} kicker={p.faq.kicker} title={p.faq.title} items={p.faq.items} />

        {/* ---- the other two pages ---- */}
        <section className="relative isolate bg-cream py-20 sm:py-28">
          <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
            <span className="mb-5 block text-[0.7rem] tracking-[0.26em] text-magenta/60 uppercase">
              {set.related.kicker}
            </span>
            <h2 className="font-display text-[clamp(1.8rem,4.4vw,3rem)] text-forest">{set.related.title}</h2>

            <ul className="mt-12 grid gap-6 md:grid-cols-2">
              {others.map((k, i) => (
                <li key={k}>
                  <Reveal delay={i * 0.1} y={30}>
                    <a
                      href={href(k, lang)}
                      className="group radius-soft relative block overflow-hidden border border-forest/8 bg-white/70 p-8 transition-all duration-500 hover:border-magenta/40 hover:shadow-[0_30px_80px_-40px_rgba(237,21,137,0.45)] sm:p-10"
                    >
                      <h3 className="text-[1.35rem] font-medium text-forest transition-colors group-hover:text-magenta">
                        {set.pages[k].link}
                      </h3>
                      <p className="mt-3 max-w-[40ch] text-[0.97rem] leading-[1.75] text-forest/65">
                        {set.pages[k].teaser}
                      </p>
                      <span
                        aria-hidden="true"
                        className="mt-6 inline-block text-magenta transition-transform duration-500 group-hover:translate-x-1.5"
                      >
                        →
                      </span>
                    </a>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Contact kicker={contact.kicker.replace(/^\d+ · /, "")} />
      </main>

      <Footer lang={lang} onHome={false} />
    </>
  )
}
