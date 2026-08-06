import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { site } from "@/content/site"

/**
 * Comfortaa carries the entire Greek UI — it is the only one of the two brand
 * faces with Greek coverage (872 glyphs, including every accented form).
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Yoga για παιδιά & εφήβους`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "παιδική yoga",
    "yoga για παιδιά",
    "yoga για εφήβους",
    "ενσυνειδητότητα παιδιά",
    "αυτορρύθμιση",
    "παιδική ευεξία",
    "Hibi Bloom",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Κάθε παιδί αξίζει να ανθίσει`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Κάθε παιδί αξίζει να ανθίσει`,
    description: site.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
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

/** Rich result for a local business — helps the studio surface in search. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: site.name,
  description: site.description,
  url: site.url,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Αθήνα",
    addressCountry: "GR",
  },
  areaServed: "Αθήνα",
  knowsLanguage: ["el", "en"],
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="el" className={`${comfortaa.variable} ${handwriting.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          // Static, author-controlled object — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
