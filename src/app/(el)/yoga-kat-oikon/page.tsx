import { LandingPage, landingMetadata } from "@/components/landing/LandingPage"

export const metadata = landingMetadata("atHome", "el")

export default function Page() {
  return <LandingPage page="atHome" lang="el" />
}
