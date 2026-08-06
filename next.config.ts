import type { NextConfig } from "next"
import path from "node:path"

const nextConfig: NextConfig = {
  // This project lives under the home directory, which contains an unrelated
  // package-lock.json. Pinning the root stops Turbopack from walking up and
  // picking that file as the workspace root.
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    // The brand and photography assets are all local; AVIF first, WebP behind.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [400, 640, 828, 1080, 1280, 1600, 1920, 2560],
  },
  poweredByHeader: false,
}

export default nextConfig
