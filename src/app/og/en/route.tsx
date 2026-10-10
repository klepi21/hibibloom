import { renderOg } from "@/lib/og"

// Social share card, rendered once at build time.
export const dynamic = "force-static"

export function GET() {
  return renderOg({ line: "Every child deserves to bloom.", kicker: "YOGA FOR CHILDREN & TEENS" })
}
