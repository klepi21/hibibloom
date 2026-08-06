import { SmoothScroll } from "@/components/SmoothScroll"
import { Preloader } from "@/components/Preloader"
import { Grain } from "@/components/ui/Grain"
import { Nav } from "@/components/Nav"
import { Hero } from "@/components/sections/Hero"
import { Why } from "@/components/sections/Why"
import { Benefits } from "@/components/sections/Benefits"
import { Programs } from "@/components/sections/Programs"
import { Space } from "@/components/sections/Space"
import { Instructors } from "@/components/sections/Instructors"
import { Testimonials } from "@/components/sections/Testimonials"
import { Faq } from "@/components/sections/Faq"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/sections/Footer"

/**
 * One continuous journey, in six scenes:
 *   01 a hibiscus blooms             → Hero
 *   02 children discover movement    → Why
 *   03 movement creates confidence   → Benefits
 *   04 confidence creates connection → Programs
 *   05 connection creates growth     → Space / Instructors / Testimonials
 *   06 the whole garden blooms       → Contact
 *
 * Section grounds alternate cream → forest → cream so the scroll reads as light
 * moving through a day rather than as a stack of separate pages.
 */
export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <Grain />
      <Nav />

      <main id="main">
        <Hero />
        <Why />
        <Benefits />
        <Programs />
        <Space />
        <Instructors />
        <Testimonials />
        <Faq />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
