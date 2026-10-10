import { LandingPage, landingMetadata } from "@/components/landing/LandingPage"

export const metadata = landingMetadata("kids", "en")

export default function Page() {
  return <LandingPage page="kids" lang="en" />
}
