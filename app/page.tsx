import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/sections/hero"
import { LogoCloud } from "@/components/sections/logo-cloud"
import { Features } from "@/components/sections/features"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Showcase } from "@/components/sections/showcase"
import { getShowcaseData } from "@/lib/content/showcase-data"
import { Comparison } from "@/components/sections/comparison"
import { Pricing } from "@/components/sections/pricing"
import { Testimonials } from "@/components/sections/testimonials"
import { Faq } from "@/components/sections/faq"
import { Contact } from "@/components/sections/contact"

export default async function HomePage() {
  const showcaseCategories = await getShowcaseData()
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <LogoCloud />
        <Features />
        <HowItWorks />
        <Showcase categories={showcaseCategories} />
        <Comparison />
        <Pricing />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
