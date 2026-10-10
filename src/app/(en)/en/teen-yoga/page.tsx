import { LandingPage, landingMetadata } from "@/components/landing/LandingPage"

export const metadata = landingMetadata("teens", "en")

export default function Page() {
  return <LandingPage page="teens" lang="en" />
}
