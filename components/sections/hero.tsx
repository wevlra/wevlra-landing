import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Section } from "@/components/section"

export function Hero() {
  return (
    <Section
      id="beranda"
      size="md"
      className="relative overflow-hidden pt-8 pb-6"
    >
      <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="animate-fade-up max-w-xl space-y-8">
          <div className="space-y-5">
            <h1 className="text-4xl leading-[1.05] font-semibold tracking-[-0.04em] text-balance text-foreground sm:text-5xl lg:text-[3.2rem]">
              Website yang membuat bisnis Anda terlihat profesional dan{" "}
              <span className="text-gradient-brand">dipercaya.</span>
            </h1>
            <p className="text-base leading-8 text-muted-foreground sm:text-lg">
              Dari strategi, desain, copywriting, hingga deploy — semua dalam
              satu proses yang rapi, transparan, dan tanpa template murahan.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="h-12 px-7 text-base sm:w-auto" asChild>
              <Link href="/#kontak">
                Mulai konsultasi gratis
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-7 text-base sm:w-auto"
              asChild
            >
              <Link href="/#showcase">Lihat portfolio</Link>
            </Button>
          </div>
        </div>

        <div
          className="animate-fade-up flex items-center justify-center"
          style={{ animationDelay: "120ms" }}
        >
          <HeroIllustration />
        </div>
      </div>
    </Section>
  )
}

function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 520 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[520px]"
      aria-hidden="true"
    >
      <rect
        x="60"
        y="30"
        width="310"
        height="220"
        rx="14"
        className="fill-card"
        stroke="var(--border)"
        strokeWidth="1.5"
      />
      <rect
        x="60"
        y="30"
        width="310"
        height="36"
        rx="14"
        className="fill-muted"
      />
      <rect x="60" y="52" width="310" height="14" className="fill-muted" />
      <circle cx="84" cy="48" r="5" fill="#fc6058" />
      <circle cx="100" cy="48" r="5" fill="#fec02f" />
      <circle cx="116" cy="48" r="5" fill="#2aca44" />
      <rect
        x="148"
        y="38"
        width="130"
        height="20"
        rx="10"
        className="fill-background"
        opacity="0.8"
      />
      <circle cx="163" cy="48" r="3" className="fill-primary" opacity="0.5" />
      <rect
        x="170"
        y="45"
        width="72"
        height="5"
        rx="2.5"
        className="fill-foreground"
        opacity="0.2"
      />
      <rect
        x="80"
        y="88"
        width="80"
        height="8"
        rx="4"
        className="fill-foreground"
        opacity="0.18"
      />
      <rect
        x="80"
        y="106"
        width="200"
        height="14"
        rx="6"
        className="fill-foreground"
        opacity="0.85"
      />
      <rect
        x="80"
        y="128"
        width="175"
        height="14"
        rx="6"
        className="fill-foreground"
        opacity="0.65"
      />
      <rect
        x="80"
        y="152"
        width="190"
        height="7"
        rx="3.5"
        className="fill-foreground"
        opacity="0.22"
      />
      <rect
        x="80"
        y="165"
        width="155"
        height="7"
        rx="3.5"
        className="fill-foreground"
        opacity="0.16"
      />
      <rect
        x="80"
        y="188"
        width="88"
        height="30"
        rx="15"
        className="fill-primary"
      />
      <rect
        x="178"
        y="188"
        width="72"
        height="30"
        rx="15"
        className="fill-muted stroke-border"
        strokeWidth="1"
      />
      <rect
        x="340"
        y="50"
        width="130"
        height="96"
        rx="14"
        className="fill-card"
        stroke="var(--border)"
        strokeWidth="1.5"
      />
      <rect
        x="356"
        y="68"
        width="40"
        height="40"
        rx="10"
        className="fill-primary"
        opacity="0.15"
      />
      <path
        d="M367 88 l7 7 l13-13"
        className="stroke-primary"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="356"
        y="118"
        width="64"
        height="7"
        rx="3.5"
        className="fill-foreground"
        opacity="0.45"
      />
      <rect
        x="356"
        y="130"
        width="44"
        height="6"
        rx="3"
        className="fill-foreground"
        opacity="0.22"
      />
      <path
        d="M370 30 C370 20 375 18 380 18 C395 18 398 30 398 50"
        className="stroke-primary"
        strokeWidth="1.5"
        strokeDasharray="5 4"
        opacity="0.4"
        strokeLinecap="round"
      />
      <rect
        x="60"
        y="278"
        width="94"
        height="78"
        rx="12"
        className="fill-card"
        stroke="var(--border)"
        strokeWidth="1.5"
      />
      <circle cx="83" cy="305" r="13" className="fill-primary" opacity="0.15" />
      <rect
        x="73"
        y="325"
        width="50"
        height="6"
        rx="3"
        className="fill-foreground"
        opacity="0.45"
      />
      <rect
        x="78"
        y="337"
        width="38"
        height="5"
        rx="2.5"
        className="fill-foreground"
        opacity="0.22"
      />
      <rect
        x="168"
        y="278"
        width="94"
        height="78"
        rx="12"
        className="fill-card"
        stroke="var(--border)"
        strokeWidth="1.5"
      />
      <circle
        cx="191"
        cy="305"
        r="13"
        className="fill-primary"
        opacity="0.15"
      />
      <rect
        x="181"
        y="325"
        width="50"
        height="6"
        rx="3"
        className="fill-foreground"
        opacity="0.45"
      />
      <rect
        x="186"
        y="337"
        width="38"
        height="5"
        rx="2.5"
        className="fill-foreground"
        opacity="0.22"
      />
      <rect
        x="276"
        y="278"
        width="94"
        height="78"
        rx="12"
        className="fill-card"
        stroke="var(--border)"
        strokeWidth="1.5"
      />
      <circle
        cx="299"
        cy="305"
        r="13"
        className="fill-primary"
        opacity="0.15"
      />
      <rect
        x="289"
        y="325"
        width="50"
        height="6"
        rx="3"
        className="fill-foreground"
        opacity="0.45"
      />
      <rect
        x="294"
        y="337"
        width="38"
        height="5"
        rx="2.5"
        className="fill-foreground"
        opacity="0.22"
      />
      <path
        d="M215 250 L215 278"
        className="stroke-primary"
        strokeWidth="1.5"
        strokeDasharray="5 4"
        opacity="0.35"
        strokeLinecap="round"
      />
      <rect
        x="380"
        y="185"
        width="118"
        height="56"
        rx="12"
        className="fill-card"
        stroke="var(--border)"
        strokeWidth="1.5"
      />
      <rect
        x="394"
        y="199"
        width="40"
        height="7"
        rx="3.5"
        className="fill-foreground"
        opacity="0.25"
      />
      <rect
        x="394"
        y="213"
        width="64"
        height="10"
        rx="5"
        className="fill-foreground"
        opacity="0.65"
      />
      <rect
        x="394"
        y="229"
        width="48"
        height="6"
        rx="3"
        className="fill-primary"
        opacity="0.45"
      />
      <path
        d="M370 160 C400 160 400 185 400 185"
        className="stroke-primary"
        strokeWidth="1.5"
        strokeDasharray="5 4"
        opacity="0.4"
        strokeLinecap="round"
      />
    </svg>
  )
}
