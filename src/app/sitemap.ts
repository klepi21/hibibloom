import type { MetadataRoute } from "next"
import { content, routes, type RouteKey } from "@/content"

const PRIORITY: Record<RouteKey, number> = { home: 1, kids: 0.9, teens: 0.9, atHome: 0.9, privacy: 0.2 }

/** Every page in both languages, each listing its counterpart for hreflang. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = content.el.site.url
  const abs = (p: string) => (p === "/" ? base : `${base}${p}`)

  return (Object.keys(routes) as RouteKey[]).flatMap((key) =>
    (["el", "en"] as const).map((lang) => ({
      url: abs(routes[key][lang]),
      changeFrequency: key === "privacy" ? ("yearly" as const) : ("monthly" as const),
      priority: lang === "el" ? PRIORITY[key] : Math.max(0.2, PRIORITY[key] - 0.1),
      alternates: { languages: { el: abs(routes[key].el), en: abs(routes[key].en) } },
    }))
  )
}
