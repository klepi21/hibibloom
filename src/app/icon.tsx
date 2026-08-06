import { ImageResponse } from "next/og"

/**
 * Favicon: the logo's hibiscus, reduced to what still reads at 32px.
 *
 * The full flower loses its veins and stamen at favicon size, so this keeps
 * five brand-magenta petals around a melon-yellow centre — the logo's
 * silhouette and its exact colours, simplified rather than redrawn.
 */

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#101a0d",
        }}
      >
        <svg width="30" height="30" viewBox="0 0 300 300">
          <g>
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
          </g>
        </svg>
      </div>
    ),
    size
  )
}
