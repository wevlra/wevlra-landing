import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, type LucideIcon } from "lucide-react"
import {
  FiFacebook as Facebook,
  FiInstagram as Instagram,
  FiTwitter as Twitter,
  FiLinkedin as Linkedin,
} from "react-icons/fi"
import type { IconType } from "react-icons"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Section, SectionHeader } from "@/components/section"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { brand } from "@/lib/content/site"
import {
  founders,
  companyValues,
  companyInfoCards,
  type Founder,
} from "@/lib/content/about"

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Kenali tim di balik WEVLRA — orang-orang yang berdedikasi membangun website impian klien dengan teknologi modern dan sentuhan desain premium.",
}

function FounderCard({ founder }: { founder: Founder }) {
  return (
    <Card className="group relative h-[420px] overflow-hidden border-border/60 bg-card transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 sm:h-[460px]">
      <div className="absolute inset-x-0 top-0 h-[80%] w-full overflow-hidden">
        <Image
          src={
            founder.image ||
            "https://ui-avatars.com/api/?name=" +
              founder.name +
              "&size=512&background=random"
          }
          alt={founder.name}
          fill
          sizes="(min-width: 640px) 33vw, 100vw"
          unoptimized
          loading="lazy"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[85%] w-full bg-gradient-to-t from-card via-card/80 to-transparent" />
      <CardContent className="relative z-10 flex h-full flex-col items-center justify-end p-6 text-center">
        <div className="flex flex-col gap-1 transition-transform duration-500 group-hover:-translate-y-1">
          <h3 className="text-xl font-semibold tracking-tight text-foreground">
            {founder.name}
          </h3>
          <p className="text-sm font-medium text-muted-foreground">
            {founder.role}
          </p>
        </div>
        <div className="my-5 h-px w-4/5 bg-border/60 transition-all duration-500 group-hover:w-full group-hover:bg-primary/30" />
        <div className="flex items-center gap-3 transition-transform duration-500 group-hover:-translate-y-1">
          {founder.socials?.facebook && (
            <SocialIcon
              Icon={Facebook}
              href={founder.socials.facebook}
              hoverColor="hover:text-blue-500"
            />
          )}
          {founder.socials?.instagram && (
            <SocialIcon
              Icon={Instagram}
              href={founder.socials.instagram}
              hoverColor="hover:text-pink-500"
            />
          )}
          {founder.socials?.twitter && (
            <SocialIcon
              Icon={Twitter}
              href={founder.socials.twitter}
              hoverColor="hover:text-sky-400"
            />
          )}
          {founder.socials?.linkedin && (
            <SocialIcon
              Icon={Linkedin}
              href={founder.socials.linkedin}
              hoverColor="hover:text-blue-600"
            />
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function SocialIcon({
  Icon,
  href,
  hoverColor,
}: {
  Icon: IconType
  href: string
  hoverColor: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`flex size-10 items-center justify-center rounded-xl bg-background/50 shadow-sm ring-1 ring-border/50 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-background hover:shadow-md hover:ring-primary/50 ${hoverColor}`}
    >
      <Icon className="size-4 text-foreground/70 transition-colors" />
    </a>
  )
}

function ValueCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/60 p-6 transition-all duration-200 hover:border-primary/30 hover:bg-card/80">
      <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon aria-hidden className="size-5" />
      </span>
      <div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}

export default function TentangPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Section
          id="tentang-hero"
          size="md"
          className="bg-background pt-12 pb-8"
        >
          <div>
            <div className="max-w-3xl">
              <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium tracking-wider text-primary uppercase">
                Tentang Kami
              </span>
              <h1 className="mt-4 text-4xl leading-[1.08] font-semibold tracking-[-0.04em] text-balance text-foreground sm:text-5xl lg:text-[3.6rem]">
                Kami ingin bisnis lokal punya website yang
                <span className="text-gradient-brand"> terlihat serius</span>,
                bukan sekadar online.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                {brand.name} membantu bisnis tampil lebih profesional melalui
                desain yang rapi, struktur konten yang jelas, dan proses kerja
                yang transparan dari brief sampai website live.
              </p>
            </div>

            <div className="mt-12 grid gap-10 border-t border-border/60 pt-10 md:grid-cols-2">
              <div>
                <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                  Visi
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Membuat website profesional lebih mudah diakses.
                </h2>
                <p className="mt-4 text-base leading-8 text-muted-foreground">
                  Kami ingin UMKM, kreator, dan perusahaan lokal bisa punya
                  website yang dipercaya tanpa harus melewati proses yang mahal,
                  lambat, dan membingungkan.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                  Misi
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Menggabungkan desain, teknologi, dan komunikasi yang jelas.
                </h2>
                <p className="mt-4 text-base leading-8 text-muted-foreground">
                  Setiap proyek kami arahkan agar tidak hanya terlihat bagus,
                  tapi juga cepat diakses, mudah dipahami, dan siap membantu
                  bisnis mendapatkan kepercayaan dari calon pelanggan.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section id="cerita-wevlra" size="md" className="bg-muted/30">
          <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
            <div className="space-y-5">
              <SectionHeader
                eyebrow="Cerita Kami"
                title={
                  <>
                    Dari Lampung,{" "}
                    <span className="text-gradient-brand">untuk Indonesia</span>
                  </>
                }
                align="left"
                className="max-w-none"
              />
              <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                <p>
                  WEVLRA didirikan pada 2024 oleh empat mahasiswa teknologi yang
                  frustrasi melihat banyak UMKM lokal kesulitan memiliki website
                  yang bagus karena harga jasa web yang mahal dan proses yang
                  tidak transparan.
                </p>
                <p>
                  Kami membangun platform yang memungkinkan siapa saja — pemilik
                  warung, kreator konten, hingga perusahaan besar — mendapatkan
                  website premium dengan harga terjangkau dan proses yang
                  menyenangkan.
                </p>
                <p>
                  Hari ini, kami telah membantu lebih dari 50 klien dari
                  berbagai kota di Indonesia untuk hadir secara profesional di
                  internet.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {companyInfoCards.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card/60 p-5"
                >
                  <item.icon aria-hidden className="size-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-base font-semibold text-foreground">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="nilai-kami" size="md" className="bg-background">
          <SectionHeader
            eyebrow="Nilai Kami"
            title="Prinsip yang memandu setiap karya kami"
            description="Empat nilai ini tertanam dalam setiap baris kode dan setiap piksel desain yang kami hasilkan."
            className="mb-10"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {companyValues.map((v) => (
              <ValueCard
                key={v.title}
                icon={v.icon}
                title={v.title}
                description={v.description}
              />
            ))}
          </div>
        </Section>

        <Section id="tim-founder" size="md" className="bg-muted/30">
          <SectionHeader
            eyebrow="Tim Founder"
            title={
              <>
                Orang-orang di balik{" "}
                <span className="text-gradient-brand">{brand.name}</span>
              </>
            }
            description="Empat founder dengan keahlian saling melengkapi, bersatu untuk membangun solusi web terbaik bagi bisnis Indonesia."
            className="mb-10"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {founders.map((founder) => (
              <FounderCard key={founder.name} founder={founder} />
            ))}
          </div>
        </Section>

        <Section id="tentang-cta" size="md" className="bg-background">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 px-8 py-12 text-center backdrop-blur-sm sm:px-12 sm:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.07] via-transparent to-transparent"
            />
            <div className="relative flex flex-col items-center gap-5">
              <h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
                Siap bekerja sama dengan kami?
              </h2>
              <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
                Ceritakan kebutuhan website Anda. Kami siap membantu Anda hadir
                secara profesional di internet.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="h-11 px-6 sm:w-auto" asChild>
                  <Link href="/#kontak">
                    Hubungi Kami
                    <ArrowRight aria-hidden className="size-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-11 px-6 sm:w-auto"
                  asChild
                >
                  <Link href="/#harga">
                    Lihat Harga
                    <ArrowRight aria-hidden className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  )
}
