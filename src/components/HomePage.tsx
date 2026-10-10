import { SmoothScroll } from "@/components/SmoothScroll"
import { Preloader } from "@/components/Preloader"
import { Grain } from "@/components/ui/Grain"
import { Nav } from "@/components/Nav"
import { JsonLd } from "@/components/RootShell"
import { Hero } from "@/components/sections/Hero"
import { Why } from "@/components/sections/Why"
import { Benefits } from "@/components/sections/Benefits"
import { BloomSequence } from "@/components/sections/BloomSequence"
import { Programs } from "@/components/sections/Programs"
import { HomeLessons } from "@/components/sections/HomeLessons"
import { Instructor } from "@/components/sections/Instructor"
import { Faq } from "@/components/sections/Faq"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/sections/Footer"
import { getContent, href, type Lang } from "@/content"
import { pageContent, landingKeys } from "@/content/pages"

/** FAQ rich result, built from the same answers the visitor reads. */
export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  }
}

/**
 * One continuous journey, in six scenes:
 *   01 a hibiscus blooms             → Hero
 *   02 children discover movement    → Why
 *   03 movement creates confidence   → Benefits
 *   04 confidence creates connection → Programs, sealed by the bloom timelapse
 *   05 the yoga comes to the child   → HomeLessons / Instructor
 *   06 the whole garden blooms       → Contact
 *
 * Extra thread: ScrollBloom flowers scattered through the light sections open
 * as the reader scrolls, so the page itself keeps blooming on the way down.
 *
 * Section grounds alternate cream → forest → cream so the scroll reads as light
 * moving through a day rather than as a stack of separate pages.
 */
export function HomePage({ lang }: { lang: Lang }) {
  const { faq } = getContent(lang)
  const pages = pageContent[lang].pages
  const links = landingKeys.map((k) => ({ label: pages[k].link, href: href(k, lang) }))

  return (
    <>
      <JsonLd data={faqLd(faq.items)} />
      <SmoothScroll />
      <Preloader />
      <Grain />
      <Nav />

      <main id="main">
        <Hero />
        <Why />
        <Benefits />
        <Programs links={links} />
        <BloomSequence />
        <HomeLessons />
        <Instructor />
        <Faq />
        <Contact />
      </main>

      <Footer lang={lang} />
    </>
  )
}
