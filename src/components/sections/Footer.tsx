import Image from "next/image"
import { getContent, href, type Lang } from "@/content"
import { pageContent, landingKeys } from "@/content/pages"
import { CookieSettingsButton } from "@/components/Analytics"

/**
 * Footer. Server-rendered — nothing here needs to be interactive.
 */
export function Footer({ lang, onHome = true }: { lang: Lang; onHome?: boolean }) {
  const { footer, nav, site, contact, ui } = getContent(lang)
  const pages = pageContent[lang].pages
  const homePath = href("home", lang)
  const year = 2026 // Static so the markup is deterministic between builds.

  return (
    <footer className="on-dark relative isolate overflow-hidden bg-ink text-cream/70">
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="w-[150px]">
              <Image
                src="/brand/logo-green-320.webp"
                alt={site.name}
                width={320}
                height={266}
                className="h-auto w-full"
              />
            </div>
            <p className="mt-6 max-w-[34ch] text-[0.97rem] leading-[1.8] text-cream/55">
              {footer.blurb}
            </p>
          </div>

          <nav aria-label={ui.footerNav} className="lg:col-span-3">
            <h2 className="mb-5 text-[0.68rem] tracking-[0.22em] text-melon/60 uppercase">
              {footer.navTitle}
            </h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 lg:grid-cols-1">
              {nav.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={onHome ? l.href : `${homePath}${l.href}`}
                    className="text-[0.92rem] text-cream/65 transition-colors duration-300 hover:text-melon"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="mb-5 text-[0.68rem] tracking-[0.22em] text-melon/60 uppercase">
              {footer.programsTitle}
            </h2>
            <ul className="space-y-3">
              {landingKeys.map((k) => (
                <li key={k}>
                  <a
                    href={href(k, lang)}
                    className="text-[0.92rem] text-cream/65 transition-colors duration-300 hover:text-melon"
                  >
                    {pages[k].link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="mb-5 text-[0.68rem] tracking-[0.22em] text-melon/60 uppercase">
              {footer.contactTitle}
            </h2>
            <address className="space-y-2 text-[0.92rem] not-italic text-cream/65">
              <p>{contact.details.areas}</p>
              <p>
                <a href={contact.details.phoneHref} className="transition-colors hover:text-melon">
                  {contact.details.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${contact.details.email}`} className="transition-colors hover:text-melon">
                  {contact.details.email}
                </a>
              </p>
            </address>

            <ul className="mt-6 flex flex-wrap gap-4">
              {contact.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.86rem] text-cream/55 underline-offset-4 transition-colors duration-300 hover:text-melon hover:underline"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-cream/10 pt-7 text-[0.82rem] text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {footer.rights}
          </p>
          <ul className="flex gap-6">
            {footer.legal.map((l) => (
              <li key={l.label}>
                <a href={href(l.route as "privacy", lang)} className="transition-colors duration-300 hover:text-melon">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <CookieSettingsButton
                label={footer.cookies}
                className="transition-colors duration-300 hover:text-melon"
              />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
