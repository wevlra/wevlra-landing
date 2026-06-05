"use client";

import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Section, SectionHeader } from "@/components/section";
import { pricingCategories } from "@/lib/content/pricing";
import { cn } from "@/lib/utils";

function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function Pricing() {
  return (
    <Section id="harga" className="relative overflow-x-clip">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 size-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl"
      />

      <SectionHeader
        eyebrow="Harga"
        title={
          <>
            Pilih paket{" "}
            <span className="text-gradient-brand">sesuai kebutuhan</span>
          </>
        }
        description="Semua paket sudah termasuk domain, hosting, dan SSL. Tidak ada biaya tersembunyi."
        className="mb-12 sm:mb-14"
      />

      <Tabs defaultValue="website" className="w-full">
        <div className="mb-2 flex justify-center sm:mb-8 md:mb-10">
          <TabsList className="h-auto w-full max-w-md gap-0.5 overflow-x-auto rounded-full p-1 sm:w-auto sm:overflow-visible sm:p-1.5">
            {pricingCategories.map((cat) => (
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

        {pricingCategories.map((cat) => (
          <TabsContent
            key={cat.id}
            value={cat.id}
            className="focus-visible:outline-none"
          >
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-6 px-1 pt-5 sm:gap-7 md:grid-cols-3 md:gap-5 lg:gap-6">
              {cat.tiers.map((tier) => {
                const pricePerMonth = tier.monthlyPrice;

                return (
                  <div
                    key={tier.name}
                    className={cn(
                      "relative flex",
                      tier.popular && "z-10 md:-my-3"
                    )}
                  >
                    {tier.popular && (
                      <div className="pointer-events-none absolute inset-x-0 -top-3.5 z-20 flex justify-center">
                        <Badge className="pointer-events-auto gap-1.5 border-0 bg-gradient-to-r from-primary to-chart-3 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary-foreground shadow-lg shadow-primary/25">
                          <Sparkles aria-hidden className="size-3" />
                          Paling Populer
                        </Badge>
                      </div>
                    )}

                    <Card
                      className={cn(
                        "relative flex flex-1 flex-col transition-all duration-300",
                        tier.popular
                          ? "border-primary/60 bg-card shadow-2xl shadow-primary/15 ring-1 ring-primary/30 md:scale-[1.02]"
                          : "border-border/60 hover-lift hover:border-border"
                      )}
                    >
                      {tier.popular && (
                        <div
                          aria-hidden="true"
                          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-chart-3 to-primary"
                        />
                      )}

                      <CardHeader className="gap-1.5 pt-7 pb-4">
                        <CardTitle className="text-xl font-semibold tracking-tight">
                          {tier.name}
                        </CardTitle>
                        <CardDescription className="text-sm leading-relaxed">
                          {tier.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="flex flex-1 flex-col gap-6 pt-0">
                        <div className="border-b border-border/60 pb-6">
                          {pricePerMonth !== null ? (
                            <div className="flex flex-wrap items-baseline gap-x-1.5">
                              <span className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-3xl lg:text-4xl">
                                {formatIDR(pricePerMonth)}
                              </span>
                            </div>
                          ) : (
                            <span className="text-3xl font-bold tracking-tight text-foreground md:text-2xl lg:text-3xl">
                              Hubungi kami
                            </span>
                          )}
                        </div>

                        <ul className="flex flex-col gap-3">
                          {tier.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-3 text-sm"
                            >
                              <div
                                className={cn(
                                  "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                                  tier.popular
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-primary/10 text-primary"
                                )}
                              >
                                <Check aria-hidden className="size-3" />
                              </div>
                              <span className="leading-relaxed text-foreground/90">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-auto pt-2">
                          <CardFooter className="border-t-0 bg-transparent px-0">
                            <Button
                              className="h-11 w-full"
                              variant={tier.popular ? "default" : "outline"}
                              size="lg"
                              asChild
                            >
                              <a href={tier.ctaHref}>{tier.cta}</a>
                            </Button>
                          </CardFooter>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <p className="mt-10 text-center text-sm text-muted-foreground sm:mt-12">
        Butuh paket khusus?{" "}
        <a
          href="mailto:halo@webvlora.id"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Hubungi tim kami
        </a>{" "}
        — kami siap membantu.
      </p>
    </Section>
  );
}
