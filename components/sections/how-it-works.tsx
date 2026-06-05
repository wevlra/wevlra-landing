import { Section, SectionHeader } from "@/components/section"
import { steps } from "@/lib/content/how-it-works"

export function HowItWorks() {
  return (
    <Section id="cara-kerja" className="relative bg-muted/30">
      <SectionHeader
        eyebrow="Cara Kerja"
        title={
          <>
            Dari ide ke website hidup,{" "}
            <span className="text-gradient-brand">hanya 4 langkah</span>
          </>
        }
        description="Proses kami dirancang sesederhana mungkin — Anda fokus pada bisnis, kami urus semua teknisnya."
        className="mb-12 sm:mb-14"
      />

      <div className="relative">
        {/* Connector line — desktop only */}
        <div
          aria-hidden="true"
          className="absolute top-10 right-0 left-0 hidden lg:block"
        >
          <div className="mx-auto max-w-7xl px-24">
            <div className="h-px w-full bg-[linear-gradient(to_right,transparent,var(--border)_15%,var(--border)_85%,transparent)]" />
          </div>
        </div>

        <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-6">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <li
                key={step.step}
                className="relative flex flex-col items-center gap-5 text-center"
              >
                {/* Step icon cluster */}
                <div className="relative z-10 flex size-20 items-center justify-center">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-primary/15 blur-xl"
                  />
                  <div className="absolute inset-0 rounded-full bg-background ring-1 ring-border/60" />
                  <div className="relative flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                    <Icon aria-hidden className="size-6" />
                  </div>
                  <span className="absolute -top-1 -right-1 flex size-7 items-center justify-center rounded-full border-2 border-background bg-foreground text-xs font-bold text-background">
                    {step.step}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="mx-auto max-w-[260px] text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </Section>
  )
}
