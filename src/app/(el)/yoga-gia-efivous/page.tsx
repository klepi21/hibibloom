import { LandingPage, landingMetadata } from "@/components/landing/LandingPage"

export const metadata = landingMetadata("teens", "el")

export default function Page() {
  return <LandingPage page="teens" lang="el" />
}
