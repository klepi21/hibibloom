import { renderOg } from "@/lib/og"

// Social share card, rendered once at build time.
export const dynamic = "force-static"

export function GET() {
  return renderOg({ line: "Κάθε παιδί αξίζει να ανθίσει.", kicker: "YOGA ΓΙΑ ΠΑΙΔΙΑ & ΕΦΗΒΟΥΣ" })
}
