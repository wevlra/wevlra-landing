import { Card, CardContent } from "@/components/ui/card"
import { Section, SectionHeader } from "@/components/section"
import type { LucideIcon } from "lucide-react"
import { features } from "@/lib/content/features"

type FeatureCardProps = {
  icon: LucideIcon
  title: string
  description: string
  videoSrc?: string
  poster?: string
  className?: string
}

function FeatureCard({ icon: Icon, title, description, videoSrc, poster, className }: FeatureCardProps) {
  return (
    <Card className={`group hover-lift relative h-full overflow-hidden border-border/60 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/40${className ? ` ${className}` : ""}`}>
      <CardContent className="flex flex-1 flex-col gap-4">
        {/* BAGIAN ATAS — Media Container Landscape */}
        <div className="relative">
          {/* Glow effect behind media container */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-xl bg-primary/20 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"
          />
          <div className="relative w-full h-48 sm:h-[200px] rounded-xl overflow-hidden bg-primary/[0.03] flex items-center justify-center p-4">
            {videoSrc ? (
              <video
                src={videoSrc}
                poster={poster}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-contain drop-shadow-sm"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-primary">
                <Icon aria-hidden className="size-12" />
              </div>
            )}
          </div>
        </div>

        {/* BAGIAN BAWAH — Text Content */}
        <div className="flex flex-col gap-1.5 text-left">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </CardContent>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-primary/60 to-transparent transition-transform duration-500 group-hover:scale-x-100"
      />
    </Card>
  )
}

export function Features() {
  return (
    <Section id="fitur">
      <SectionHeader
        eyebrow="Fitur Unggulan"
        title={
          <>
            Semua yang Anda butuhkan untuk{" "}
            <span className="text-gradient-brand">online</span>
          </>
        }
        description="Dari pembuatan hingga pemeliharaan — semua yang dibutuhkan bisnis Anda untuk hadir secara profesional di internet."
        className="mb-12 sm:mb-14"
      />

      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              videoSrc={feature.videoSrc}
              poster={feature.poster}
              className={index < 3 ? "md:col-span-2" : "md:col-span-3"}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}
