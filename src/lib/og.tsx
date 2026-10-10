import { ImageResponse } from "next/og"
import fs from "node:fs/promises"
import path from "node:path"

/**
 * Social sharing card.
 *
 * Uses the supplied logo bitmap as-is (read off disk and inlined, since the OG
 * renderer cannot fetch relative URLs at build time) over the brand's forest
 * ground, with the headline set in Comfortaa — the only brand face with Greek.
 */

export const ogSize = { width: 1200, height: 630 }

/** `line` is the headline, `kicker` the small caps line under it. */
export async function renderOg({ line, kicker }: { line: string; kicker: string }) {
  const [logo, font] = await Promise.all([
    // PNG, not WebP — Satori's image decoder does not handle WebP.
    fs.readFile(path.join(process.cwd(), "public/brand/logo-green-og.png")),
    // Satori cannot parse woff2 ("Unsupported OpenType signature wOF2"), so the
    // OG card uses the static TTF. Build-time only — never sent to the browser.
    fs.readFile(path.join(process.cwd(), "src/fonts/Comfortaa-Light.ttf")),
  ])

  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#101a0d",
          position: "relative",
        }}
      >
        {/* botanical wash */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(closest-side at 22% 18%, rgba(171,201,82,0.28), transparent), radial-gradient(closest-side at 82% 82%, rgba(237,21,137,0.3), transparent)",
          }}
        />

        {/* Five petals, the logo's silhouette. Kept at high opacity: brand
            magenta faded over deep forest turns to muddy maroon rather than
            reading as the flower. */}
        <svg
          width="340"
          height="340"
          viewBox="0 0 300 300"
          style={{ position: "absolute", right: -96, top: -84, opacity: 0.85 }}
        >
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse
              key={a}
              cx="150"
              cy="92"
              rx="56"
              ry="66"
              fill="#ed1589"
              transform={`rotate(${a} 150 158)`}
            />
          ))}
          <circle cx="150" cy="158" r="26" fill="#ffb310" />
        </svg>

        {/* A leaf-green counterweight in the opposite corner. */}
        <svg
          width="230"
          height="230"
          viewBox="0 0 300 300"
          style={{ position: "absolute", left: -78, bottom: -86, opacity: 0.5 }}
        >
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse
              key={a}
              cx="150"
              cy="92"
              rx="56"
              ry="66"
              fill="#abc952"
              transform={`rotate(${a} 150 158)`}
            />
          ))}
          <circle cx="150" cy="158" r="26" fill="#ffb310" />
        </svg>

        {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> only */}
        <img src={logoSrc} alt="" width={420} style={{ marginBottom: 34 }} />

        <div
          style={{
            fontFamily: "Comfortaa",
            fontSize: 52,
            fontWeight: 300,
            color: "#fbf8ef",
            letterSpacing: "-0.02em",
          }}
        >
          {line}
        </div>

        <div
          style={{
            fontFamily: "Comfortaa",
            fontSize: 24,
            color: "#ffb310",
            marginTop: 20,
            letterSpacing: "0.14em",
          }}
        >
          {kicker}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [{ name: "Comfortaa", data: font, style: "normal", weight: 400 }],
    }
  )
}
