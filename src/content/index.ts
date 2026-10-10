import { el, type Content } from "./el"
import { en } from "./en"

export type { Content }
export type Lang = "el" | "en"
export const langs: Lang[] = ["el", "en"]

export const content: Record<Lang, Content> = { el, en }
export const getContent = (lang: Lang) => content[lang]

/**
 * Every page in both languages. Greek lives at the root, English under /en;
 * the slugs are written in each language because the URL is part of what a
 * search engine reads.
 */
export const routes = {
  home: { el: "/", en: "/en" },
  kids: { el: "/yoga-gia-paidia", en: "/en/kids-yoga" },
  teens: { el: "/yoga-gia-efivous", en: "/en/teen-yoga" },
  atHome: { el: "/yoga-kat-oikon", en: "/en/home-yoga-lessons" },
  privacy: { el: "/aporrito", en: "/en/privacy" },
} as const satisfies Record<string, Record<Lang, string>>

export type RouteKey = keyof typeof routes

export const href = (route: RouteKey, lang: Lang) => routes[route][lang]

/** The other language's address for the page at `pathname`. */
export function counterpart(pathname: string, to: Lang): string {
  const clean = pathname.replace(/\/$/, "") || "/"
  for (const r of Object.values(routes)) {
    if (r.el === clean || r.en === clean) return r[to]
  }
  return routes.home[to]
}

/** <link rel=alternate hreflang> set for one route, x-default pointing at Greek. */
export function alternates(route: RouteKey, lang: Lang) {
  return {
    canonical: routes[route][lang],
    languages: {
      el: routes[route].el,
      en: routes[route].en,
      "x-default": routes[route].el,
    },
  }
}
