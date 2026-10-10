import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import localFont from "next/font/local"
import "@/app/globals.css"
import { getContent, type Lang } from "@/content"
import { LangProvider } from "@/content/LangProvider"
import { Analytics } from "@/components/Analytics"

/**
 * Everything the two root layouts share. Greek (/) and English (/en) are
 * separate root layouts so each page ships the right <html lang>; this keeps
 * them identical otherwise.
 */

/**
 * Comfortaa carries the entire UI: it is the only one of the two brand faces
 * with Greek coverage (872 glyphs, including every accented form).
 */
const comfortaa = localFont({
  src: "../fonts/Comfortaa-Variable.woff2",
  weight: "300 700",
  style: "normal",
  variable: "--font-comfortaa",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
})

/**
 * Simple-Handwriting is the logo face. It ships 99 glyphs and contains **no
 * Greek**, so it is scoped to Latin wordmark moments only. The unicode-range
 * keeps the browser from ever selecting it for Greek text, which would
 * otherwise fall back mid-word and break the line.
 */
const handwriting = localFont({
  src: "../fonts/SimpleHandwriting.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-handwriting",
  display: "swap",
  declarations: [{ prop: "unicode-range", value: "U+0000-00FF, U+2018-201D, U+2026" }],
})

/** The share card for each language, served by src/app/og/[lang]/route.tsx. */
export const ogImage = (lang: Lang) => ({
  url: `/og/${lang}`,
  width: 1200,
  height: 630,
  alt: getContent(lang).site.ogTitle,
  type: "image/png",
})

export function rootMetadata(lang: Lang): Metadata {
  const { site } = getContent(lang)
  return {
    metadataBase: new URL(site.url),
    title: { default: site.title, template: `%s · ${site.name}` },
    description: site.description,
    applicationName: site.name,
    keywords: site.keywords,
    authors: [{ name: site.name }],
    openGraph: {
      type: "website",
      locale: site.locale,
      alternateLocale: lang === "el" ? "en_GB" : "el_GR",
      siteName: site.name,
      title: site.ogTitle,
      description: site.description,
      images: [ogImage(lang)],
    },
    twitter: { card: "summary_large_image", title: site.ogTitle, description: site.description, images: [ogImage(lang).url] },
    robots: { index: true, follow: true },
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf8ef" },
    { media: "(prefers-color-scheme: dark)", color: "#101a0d" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
}

/** Structured data rendered as a JSON-LD <script>. Author-controlled objects only. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

/**
 * Rich result. Hibi Bloom has no premises: lessons happen at families' homes
 * and in partner studios, so this is a mobile LocalBusiness with areaServed
 * rather than a place with an address.
 */
function businessLd(lang: Lang) {
  const { site, contact, instructor } = getContent(lang)
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.description,
    url: lang === "el" ? site.url : `${site.url}/en`,
    logo: `${site.url}/brand/logo-green-640.webp`,
    image: `${site.url}/og/${lang}`,
    telephone: "+306999114031",
    email: contact.details.email,
    founder: { "@type": "Person", name: instructor.name },
    areaServed: { "@type": "City", name: site.areaServed },
    inLanguage: lang,
    sameAs: contact.social.map((s) => s.href),
  }
}

export function RootShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={lang} className={`${comfortaa.variable} ${handwriting.variable}`}>
      {/* suppressHydrationWarning: browser extensions (π.χ. ColorZilla βάζει
          cz-shortcut-listen) πειράζουν attributes του <body> πριν το hydration.
          Αφορά ΜΟΝΟ attributes αυτού του στοιχείου, όχι το δέντρο από κάτω. */}
      <body className="antialiased" suppressHydrationWarning>
        <JsonLd data={businessLd(lang)} />
        <LangProvider lang={lang}>
          {children}
          <Analytics />
        </LangProvider>
      </body>
    </html>
  )
}
