/**
 * The film grain that sits over the whole page.
 *
 * The noise is a tiny inline SVG turbulence filter as a data URI — no network
 * request, no image asset, and it scales to any viewport. Kept at very low
 * opacity: it should register as texture, not as noise.
 */

const NOISE = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="200" height="200" filter="url(#n)" opacity="0.55"/></svg>`

export function Grain() {
  return (
    <div
      className="grain-overlay"
      aria-hidden="true"
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(NOISE)}")`,
      }}
    />
  )
}
