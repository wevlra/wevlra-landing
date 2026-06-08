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

function FeatureCard({
  icon: Icon,
  title,
  description,
  videoSrc,
  poster,
  className,
}: FeatureCardProps) {
  return (
    <Card
      className={`group relative isolate h-full transform-gpu overflow-hidden transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 ${
        videoSrc
          ? "border-border/60 bg-card dark:border-transparent dark:bg-black"
          : "border-border/60 bg-card/80 backdrop-blur-sm hover:border-primary/40"
      } ${className ? ` ${className}` : ""} `}
    >
      {videoSrc && (
        <video
          src={videoSrc}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 z-0 h-full w-full object-cover brightness-105 contrast-90 hue-rotate-180 invert saturate-125 transition-transform duration-700 ease-out group-hover:scale-105 dark:filter-none"
        />
      )}

      {videoSrc && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-0 -bottom-2 left-0 z-[1] bg-gradient-to-t from-card via-card/70 to-transparent transition-opacity duration-500 group-hover:opacity-90 dark:from-black dark:via-black/60"
        />
      )}

      <CardContent className="relative z-10 flex h-full min-h-[280px] flex-1 flex-col sm:min-h-[320px]">
        {!videoSrc && (
          <div className="flex flex-1 items-center justify-center text-primary transition-transform duration-500 group-hover:scale-110">
            <Icon aria-hidden className="size-12" />
          </div>
        )}

        {videoSrc && <div className="flex-1" />}

        <div className="relative mt-auto flex flex-col gap-2 text-left transition-transform duration-500 ease-out group-hover:-translate-y-1">
          <h3
            className={`text-lg font-bold tracking-tight ${videoSrc ? "text-foreground dark:text-white" : "text-foreground"}`}
          >
            {title}
          </h3>
          <p
            className={`text-sm leading-relaxed ${videoSrc ? "text-muted-foreground dark:text-white/80" : "text-muted-foreground"}`}
          >
            {description}
          </p>
        </div>
      </CardContent>

      {!videoSrc && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 z-20 h-px scale-x-0 bg-gradient-to-r from-transparent via-primary/60 to-transparent transition-transform duration-500 group-hover:scale-x-100"
          />
        </>
      )}
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
