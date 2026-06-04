import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Section, SectionHeader } from "@/components/section";
import { testimonials } from "@/lib/content/testimonials";

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  return (
    <Section id="testimoni" size="sm" className="bg-muted/30">
      <SectionHeader
        eyebrow="Testimoni"
        title={
          <>
            Dipercaya oleh{" "}
            <span className="text-primary">500+ bisnis</span>
          </>
        }
        description="Cerita nyata dari pemilik bisnis yang membangun kehadiran online bersama WEVLRA."
        className="mb-10 sm:mb-12"
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="flex flex-col gap-4 rounded-xl border border-border/60 bg-background/80 p-5 transition-colors hover:border-border"
          >
            <blockquote className="text-sm leading-relaxed text-foreground/90">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            <figcaption className="flex items-center gap-3 border-t border-border/60 pt-4">
              <Avatar className="size-9">
                <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                  {getInitials(t.name)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">
                  {t.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {t.role}
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
