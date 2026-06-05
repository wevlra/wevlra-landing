import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/section"
import { ArrowRight, Mail, Sparkles } from "lucide-react"
import { contact } from "@/lib/content/site"

export function FinalCta() {
  return (
    <Section size="lg" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-chart-3/8"
      />
      <div
        aria-hidden="true"
        className="bg-grid mask-radial-fade pointer-events-none absolute inset-0 opacity-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 size-[700px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -bottom-40 size-[500px] rounded-full bg-chart-3/15 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 size-[400px] rounded-full bg-chart-2/10 blur-[80px]"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-5 text-center sm:gap-7 md:gap-8">
        <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary backdrop-blur sm:px-4 sm:py-1.5 sm:text-xs">
          <span>Mulai dalam 60 detik</span>
        </div>

        <h2 className="text-3xl leading-[1.1] font-semibold tracking-tight text-balance text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
          Siap membangun{" "}
          <span className="text-gradient-brand">website impian</span> Anda?
        </h2>

        <p className="max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
          Bergabunglah dengan 500+ bisnis yang sudah mempercayakan kehadiran
          online mereka kepada WEVLRA. Mulai gratis, tanpa kartu kredit.
        </p>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button
            size="lg"
            className="h-12 w-full px-7 text-base font-medium shadow-xl shadow-primary/25 transition-transform hover:scale-[1.02] sm:w-auto"
            asChild
          >
            <Link href="/#kontak">
              <Sparkles aria-hidden className="size-4" />
              Mulai Gratis Sekarang
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 w-full px-7 text-base font-medium backdrop-blur sm:w-auto"
            asChild
          >
            <a href={`mailto:${contact.email}`}>
              <Mail aria-hidden className="size-4" />
              Hubungi Tim Kami
            </a>
          </Button>
        </div>

        <div className="mt-1 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span
              className="size-1.5 rounded-full bg-emerald-500"
              aria-hidden="true"
            />
            Tanpa kartu kredit
          </span>
          <span
            className="hidden h-3 w-px bg-border sm:inline-block"
            aria-hidden="true"
          />
          <span className="flex items-center gap-1.5">
            <span
              className="size-1.5 rounded-full bg-emerald-500"
              aria-hidden="true"
            />
            Pratinjau gratis
          </span>
          <span
            className="hidden h-3 w-px bg-border sm:inline-block"
            aria-hidden="true"
          />
          <span className="flex items-center gap-1.5">
            <span
              className="size-1.5 rounded-full bg-emerald-500"
              aria-hidden="true"
            />
            Dukungan tim lokal
          </span>
        </div>
      </div>
    </Section>
  )
}
