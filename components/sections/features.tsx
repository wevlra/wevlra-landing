import { Card, CardContent } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/section";
import type { LucideIcon } from "lucide-react";
import { features } from "@/lib/content/features";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="group relative h-full overflow-hidden border-border/60 bg-card/80 backdrop-blur-sm transition-all duration-300 hover-lift hover:border-primary/40">
      <CardContent className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-xl bg-primary/20 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"
            />
            <div className="relative flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary ring-1 ring-primary/10 transition-transform duration-300 group-hover:scale-105 sm:size-11">
              <Icon aria-hidden className="size-5" />
            </div>
          </div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            {title}
          </h3>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
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
  );
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

      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3">
          {features.slice(0, 3).map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:mx-auto md:max-w-[calc(66.666%+0.625rem)] md:w-full">
          {features.slice(3).map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
