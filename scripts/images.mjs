/**
 * Turns the generated photography into web assets.
 *
 * Run: node scripts/images.mjs
 * Source PNGs are ~7MB each at 2k; these come out as sub-200KB WebP.
 */
import sharp from "sharp"
import fs from "node:fs"
import path from "node:path"

const SRC = process.env.SRC_DIR ?? "/private/tmp/claude-501/-Users-konstantinoslepidas/979a278a-0945-475e-9043-e828a95e9bea/scratchpad/gen"
const OUT = path.join(process.cwd(), "public/images")
fs.mkdirSync(OUT, { recursive: true })

// source file -> published name, target width
const MAP = [
  ["main.png", "space-main", 1800],
  ["reading.png", "space-reading", 1400],
  ["light.png", "space-light", 1800],
  ["plants.png", "space-plants", 1400],
  ["waiting.png", "space-waiting", 1800],
  ["macro.png", "hibiscus-macro", 1400],
  ["texture.png", "canopy-texture", 1920],
]

let made = 0
for (const [file, name, width] of MAP) {
  const src = path.join(SRC, file)
  if (!fs.existsSync(src)) {
    console.log(`skip  ${name.padEnd(18)} (no ${file})`)
    continue
  }
  const buf = await sharp(src)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toBuffer()
  fs.writeFileSync(path.join(OUT, `${name}.webp`), buf)
  const meta = await sharp(buf).metadata()
  console.log(`ok    ${name.padEnd(18)} ${meta.width}x${meta.height}  ${(buf.length / 1024).toFixed(0)}KB`)
  made++
}

console.log(`\n${made}/${MAP.length} images written to public/images`)
