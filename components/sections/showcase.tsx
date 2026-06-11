"use client"

import { Card, CardFooter } from "@/components/ui/card"
import { ArrowUpRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Section, SectionHeader } from "@/components/section"
import { showcaseCategories } from "@/lib/content/showcase"
import { cn } from "@/lib/utils"

const GRADIENTS: Record<string, string> = {
  umkm: "from-primary/15 via-chart-1/10 to-transparent",
  personal: "from-chart-3/15 via-chart-2/10 to-transparent",
  korporat: "from-foreground/8 via-muted/40 to-transparent",
  ecommerce: "from-chart-5/15 via-chart-4/10 to-transparent",
}

const GLOW_GRADIENTS: Record<string, string> = {
  umkm: "from-primary/10 via-chart-1/5 to-transparent",
  personal: "from-chart-3/10 via-chart-2/5 to-transparent",
  korporat: "from-foreground/5 via-muted/20 to-transparent",
  ecommerce: "from-chart-5/10 via-chart-4/5 to-transparent",
}

const staggerClasses = ["stagger-1", "stagger-2", "stagger-3"]

export function Showcase() {
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
            {showcaseCategories.map((cat) => (
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

        {showcaseCategories.map((cat) => (
          <TabsContent
            key={cat.id}
            value={cat.id}
            className="focus-visible:outline-none"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
              {cat.items.map((item, idx) => (
                <Card
                  key={item.name}
                  className={cn(
                    "group animate-fade-up relative cursor-pointer overflow-hidden border-border/60 p-0",
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
                    aria-hidden="true"
                  >
                    <div className="absolute inset-3 flex flex-col overflow-hidden rounded-xl border border-border/50 bg-background/80 shadow-xl shadow-black/5 backdrop-blur-sm">
                      <div className="flex items-center gap-1.5 border-b border-border/50 bg-muted/50 px-3 py-2">
                        <div className="size-2 rounded-full bg-red-400/70 ring-1 ring-red-400/20" />
                        <div className="size-2 rounded-full bg-yellow-400/70 ring-1 ring-yellow-400/20" />
                        <div className="size-2 rounded-full bg-green-400/70 ring-1 ring-green-400/20" />
                        <div className="ml-3 h-1.5 flex-1 rounded-full bg-muted-foreground/10" />
                      </div>

                      <div className="flex flex-1 flex-col gap-3 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="size-4 rounded-md bg-primary/30" />
                            <div className="h-2 w-16 rounded bg-foreground/15" />
                          </div>
                          <div className="flex gap-1.5">
                            <div className="h-1.5 w-6 rounded-full bg-foreground/10" />
                            <div className="h-1.5 w-6 rounded-full bg-foreground/10" />
                          </div>
                        </div>

                        <div className="mt-1 grid grid-cols-4 gap-2">
                          <div className="col-span-3 space-y-2">
                            <div className="h-2 w-full rounded bg-foreground/15" />
                            <div className="h-2 w-4/5 rounded bg-foreground/10" />
                            <div className="h-2 w-3/5 rounded bg-foreground/8" />
                          </div>
                          <div className="col-span-1 flex items-center justify-center rounded-lg bg-primary/10">
                            <div className="size-6 rounded-md bg-primary/20" />
                          </div>
                        </div>

                        <div className="mt-auto flex items-center gap-2 border-t border-border/30 pt-3">
                          <div className="h-2 w-12 rounded-full bg-primary/25" />
                          <div className="h-2 w-8 rounded-full bg-foreground/10" />
                          <div className="ml-auto flex gap-1">
                            <div className="size-3 rounded-full bg-foreground/8" />
                            <div className="size-3 rounded-full bg-foreground/8" />
                            <div className="size-3 rounded-full bg-foreground/8" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100">
                      <div className="flex translate-y-2 items-center gap-2 rounded-full bg-background px-5 py-2.5 text-sm font-medium shadow-xl shadow-black/10 transition-transform duration-300 group-hover:translate-y-0">
                        Lihat Detail
                        <ArrowUpRight aria-hidden className="size-4" />
                      </div>
                    </div>
                  </div>
                  <CardFooter className="relative flex-col items-start gap-1 border-t-0 bg-transparent px-5 py-4">
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
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Section>
  )
}
