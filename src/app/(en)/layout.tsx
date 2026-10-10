import type { ReactNode } from "react"
import { RootShell, rootMetadata, viewport as shared } from "@/components/RootShell"

export const metadata = rootMetadata("en")
export const viewport = shared

export default function Layout({ children }: { children: ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>
}
