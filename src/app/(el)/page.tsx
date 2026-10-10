import type { Metadata } from "next"
import { HomePage } from "@/components/HomePage"
import { alternates } from "@/content"

export const metadata: Metadata = { alternates: alternates("home", "el") }

export default function Page() {
  return <HomePage lang="el" />
}
