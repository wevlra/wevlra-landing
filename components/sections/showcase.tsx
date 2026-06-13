"use client"

import { ArrowUpRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Section, SectionHeader } from "@/components/section"
import { cn } from "@/lib/utils"
import type { ShowcaseCategory } from "@/lib/content/showcase-data"

const GRADIENTS: Record<string, string> = {
  umkm: "from-primary/15 via-chart-1/10 to-transparent",
  personal: "from-chart-3/15 via-chart-2/10 to-transparent",
  korporat: "from-foreground/8 via-muted/40 to-transparent",
}

const GLOW_GRADIENTS: Record<string, string> = {
  umkm: "from-primary/10 via-chart-1/5 to-transparent",
  personal: "from-chart-3/10 via-chart-2/5 to-transparent",
  korporat: "from-foreground/5 via-muted/20 to-transparent",
}

const staggerClasses = ["stagger-1", "stagger-2", "stagger-3"]

type Props = {
  categories: ShowcaseCategory[]
}

export function Showcase({ categories }: Props) {
  return (
    <Section id="showcase" className="relative overflow-hidden">
      <SectionHeader
        eyebrow="Showcase"
        title={
          <>
            Hasil karya untuk{" "}
            <span className="text-gradient-brand">berbagai industri</span>
          </>
        }
        description="Dari UMKM lokal hingga perusahaan besar — kami telah membantu ratusan bisnis tampil profesional di internet."
        className="mb-12 sm:mb-14"
      />

      <Tabs defaultValue="umkm" className="w-full">
        <div className="mb-6 flex justify-center sm:mb-8 md:mb-10">
          <TabsList className="h-auto w-full max-w-md gap-0.5 overflow-x-auto rounded-full p-1 sm:w-auto sm:p-1.5">
            {categories.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Belum ada data showcase.
              </p>
            ) : null}
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="flex-1 rounded-full px-3 py-1.5 text-xs font-medium data-[state=active]:shadow-sm sm:flex-none sm:px-5 sm:py-2 sm:text-sm"
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {categories.length > 0 && categories.map((cat) => (
          <TabsContent
            key={cat.id}
            value={cat.id}
            className="focus-visible:outline-none"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
              {cat.items.map((item, idx) => (
                <a
                  key={item.name}
                  href={`/showcase/${item.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group animate-fade-up relative block overflow-hidden rounded-xl border border-border/60",
                    staggerClasses[idx % staggerClasses.length]
                  )}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${GLOW_GRADIENTS[cat.id] ?? "from-muted/30 to-transparent"} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                    aria-hidden="true"
                  />
                  <div
                    className={`relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br ${
                      GRADIENTS[cat.id] ?? "from-muted to-muted/50"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="size-full object-cover transition-all duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100">
                      <div className="flex translate-y-2 items-center gap-2 rounded-full bg-background px-5 py-2.5 text-sm font-medium shadow-xl shadow-black/10 transition-transform duration-300 group-hover:translate-y-0">
                        Lihat Detail
                        <ArrowUpRight aria-hidden className="size-4" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-1 border-t-0 bg-transparent px-5 py-4">
                    <div className="flex w-full items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-base font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                          {item.name}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <ArrowUpRight
                        aria-hidden
                        className="size-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                      />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Section>
  )
}
