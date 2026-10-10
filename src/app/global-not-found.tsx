import type { Metadata } from "next"
import Link from "next/link"
import localFont from "next/font/local"
import "./globals.css"

/**
 * 404 for any URL that matches no route, in both languages at once: we cannot
 * know which one the visitor reads, and the page is two lines long.
 */

const comfortaa = localFont({
  src: "../fonts/Comfortaa-Variable.woff2",
  weight: "300 700",
  variable: "--font-comfortaa",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hibibloom.gr"),
  title: "404 · Hibi Bloom",
  robots: { index: false },
}

export default function GlobalNotFound() {
  return (
    <html lang="el" className={comfortaa.variable}>
      <body className="antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center text-forest">
          <span className="font-display text-[clamp(4rem,14vw,8rem)] leading-none text-magenta/30">404</span>
          <h1 className="mt-6 font-display text-[clamp(1.6rem,4vw,2.4rem)]">Αυτή η σελίδα δεν άνθισε.</h1>
          <p lang="en" className="mt-2 text-forest/60">This page didn&apos;t bloom.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3 text-[0.92rem]">
            <Link href="/" className="rounded-full bg-forest px-6 py-3 text-cream transition-colors hover:bg-magenta-600">
              Αρχική σελίδα
            </Link>
            <a
              href="/en"
              lang="en"
              className="rounded-full border border-forest/20 px-6 py-3 transition-colors hover:border-magenta hover:text-magenta"
            >
              English home
            </a>
          </div>
        </main>
      </body>
    </html>
  )
}
