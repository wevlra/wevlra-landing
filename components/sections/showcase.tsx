"use client"

import { Card, CardFooter } from "@/components/ui/card"
import { ArrowUpRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Section, SectionHeader } from "@/components/section"
import { showcaseCategories } from "@/lib/content/showcase"

const GRADIENTS: Record<string, string> = {
  umkm: "from-primary/15 via-chart-1/10 to-transparent",
  personal: "from-chart-3/15 via-chart-2/10 to-transparent",
  korporat: "from-foreground/8 via-muted/40 to-transparent",
  ecommerce: "from-chart-5/15 via-chart-4/10 to-transparent",
}

export function Showcase() {
  return (
    <Section id="showcase">
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
              {cat.items.map((item) => (
                <Card
                  key={item.name}
                  className="group hover-lift cursor-pointer overflow-hidden border-border/60 p-0 hover:border-primary/40"
                >
                  <div
                    className={`relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br ${
                      GRADIENTS[cat.id] ?? "from-muted to-muted/50"
                    }`}
                    aria-hidden="true"
                  >
                    <div className="absolute inset-4 flex flex-col overflow-hidden rounded-lg border border-border/40 bg-background/70 shadow-lg backdrop-blur-sm">
                      <div className="flex items-center gap-1 border-b border-border/40 bg-muted/40 px-2.5 py-1.5">
                        <div className="size-1.5 rounded-full bg-red-400/70" />
                        <div className="size-1.5 rounded-full bg-yellow-400/70" />
                        <div className="size-1.5 rounded-full bg-green-400/70" />
                      </div>
                      <div className="flex flex-1 flex-col gap-2 p-3">
                        <div className="flex items-center justify-between">
                          <div className="size-3 rounded bg-primary/40" />
                          <div className="flex gap-1.5">
                            <div className="h-1 w-6 rounded bg-foreground/10" />
                            <div className="h-1 w-6 rounded bg-foreground/10" />
                          </div>
                        </div>
                        <div className="space-y-1.5 pt-1">
                          <div className="h-2 w-3/4 rounded bg-foreground/15" />
                          <div className="h-1.5 w-1/2 rounded bg-foreground/10" />
                        </div>
                        <div className="mt-auto flex gap-1.5">
                          <div className="h-3 w-10 rounded bg-primary/30" />
                          <div className="h-3 w-8 rounded bg-foreground/10" />
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 opacity-0 transition-all duration-300 group-hover:bg-foreground/20 group-hover:opacity-100">
                      <div className="flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-medium shadow-lg">
                        Lihat Detail
                        <ArrowUpRight aria-hidden className="size-4" />
                      </div>
                    </div>
                  </div>
                  <CardFooter className="flex-col items-start gap-1 border-t-0 bg-transparent px-5 py-4">
                    <div className="flex w-full items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-base font-semibold text-foreground">
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
