import {
  SiFigma,
  SiNextdotjs,
  SiReact,
  SiShopify,
  SiStripe,
  SiTailwindcss,
  SiVercel,
  SiWordpress,
} from "react-icons/si"
import type { IconType } from "react-icons"

import { Section } from "@/components/section"

const BRAND_LOGOS: { name: string; Icon: IconType }[] = [
  { name: "Shopify", Icon: SiShopify },
  { name: "WordPress", Icon: SiWordpress },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "React", Icon: SiReact },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "Figma", Icon: SiFigma },
  { name: "Vercel", Icon: SiVercel },
  { name: "Stripe", Icon: SiStripe },
]

export function LogoCloud() {
  const logos = [...BRAND_LOGOS, ...BRAND_LOGOS]

  return (
    <Section
      size="sm"
      className="bg-muted/30"
      ariaLabel="Teknologi yang kami gunakan"
    >
      <div className="flex flex-col items-center gap-6 sm:gap-8">
        <p className="text-center text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase sm:text-xs">
          Dibangun dengan teknologi{" "}
          <span className="font-semibold text-foreground">terbaik</span> di
          kelasnya
        </p>
        <div
          className="relative w-full overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0px, black 48px, black calc(100% - 48px), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0px, black 48px, black calc(100% - 48px), transparent 100%)",
          }}
        >
          <div className="animate-marquee flex w-max motion-reduce:animate-none">
            {logos.map((item, i) => (
              <div
                key={`${item.name}-${i}`}
                className="flex shrink-0 items-center gap-2 pr-10 whitespace-nowrap text-muted-foreground/50 transition-colors select-none hover:text-muted-foreground sm:pr-14"
                aria-hidden={i >= BRAND_LOGOS.length ? "true" : undefined}
              >
                <item.Icon className="size-5 sm:size-6" />
                <span className="text-sm font-semibold sm:text-base">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
