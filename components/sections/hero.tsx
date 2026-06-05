import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Section } from "@/components/section"
import { HeroMockup } from "@/components/sections/hero-mockup"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <Section
      id="beranda"
      size="md"
      className="relative overflow-hidden pt-10 sm:pt-14 md:pt-20"
    >
      <div
        aria-hidden="true"
        className="bg-grid mask-radial-fade pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] opacity-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-10%] right-[-10%] -z-10 size-[420px] rounded-full bg-primary/10 blur-3xl"
      />

      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="animate-fade-up flex flex-col gap-6 lg:col-span-6">
          <h1 className="text-4xl leading-[1.1] font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-[3.25rem]">
            Website impian Anda,{" "}
            <span className="text-gradient-brand">jadi nyata</span> dalam
            hitungan menit.
          </h1>

          <p className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Gabungkan kecepatan teknologi modern dengan sentuhan desainer
            profesional — untuk UMKM hingga enterprise.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="h-11 px-6 sm:w-auto" asChild>
              <Link href="/#showcase">
                Lihat Katalog
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 px-6 sm:w-auto"
              asChild
            >
              <Link href="/#harga">
                Lihat Harga
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div
          className="animate-fade-up lg:col-span-6"
          style={{ animationDelay: "100ms" }}
        >
          <HeroMockup />
        </div>
      </div>
    </Section>
  )
}
