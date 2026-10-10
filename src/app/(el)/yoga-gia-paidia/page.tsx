import { LandingPage, landingMetadata } from "@/components/landing/LandingPage"

export const metadata = landingMetadata("kids", "el")

export default function Page() {
  return <LandingPage page="kids" lang="el" />
}
