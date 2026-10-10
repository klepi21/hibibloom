import type { MetadataRoute } from "next"
import { content } from "@/content"

const site = content.el.site

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  }
}
