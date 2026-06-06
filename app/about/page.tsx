import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Section, SectionHeader } from "@/components/section"
import { Card, CardContent } from "@/components/ui/card"
import { brand } from "@/lib/content/site"
import {
  Globe,
  Heart,
  Lightbulb,
  Rocket,
  Users,
  Zap,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Kenali tim di balik WEVLRA — orang-orang yang berdedikasi membangun website impian klien dengan teknologi modern dan sentuhan desain premium.",
}

// ─── Data Founder ────────────────────────────────────────────────────────────

type Founder = {
  name: string
  role: string
  bio: string
  /** Inisial untuk avatar placeholder */
  initial: string
  /** Warna gradient avatar — pasangan from/to Tailwind */
  gradient: string
}

const founders: Founder[] = [
  {
    name: "Raka Pratama",
    role: "CEO & Co-Founder",
    bio: "Visioner di balik WEVLRA. Berpengalaman 5+ tahun di industri teknologi dan desain produk digital.",
    initial: "RP",
    gradient: "from-violet-500 to-primary",
  },
  {
    name: "Deva Ananda",
    role: "CTO & Co-Founder",
    bio: "Arsitek sistem WEVLRA. Ahli dalam Next.js, cloud infrastructure, dan performa web skala enterprise.",
    initial: "DA",
    gradient: "from-sky-500 to-cyan-400",
  },
  {
    name: "Laras Kinanti",
    role: "Head of Design",
    bio: "Penyempurna estetika setiap proyek. Berlatar belakang UI/UX dan brand identity selama 4 tahun.",
    initial: "LK",
    gradient: "from-rose-400 to-pink-500",
  },
  {
    name: "Bima Satriya",
    role: "Lead Developer",
    bio: "Penerjemah desain menjadi kode. Spesialis React, animasi web, dan optimasi performa front-end.",
    initial: "BS",
    gradient: "from-amber-400 to-orange-500",
  },
]

// ─── Nilai Perusahaan ─────────────────────────────────────────────────────────

const values = [
  {
    icon: Zap,
    title: "Kecepatan",
    description:
      "Kami percaya waktu adalah aset terpenting klien. Setiap proses kami rancang untuk efisiensi maksimal.",
  },
  {
    icon: Heart,
    title: "Dedikasi",
    description:
      "Setiap website yang kami bangun diperlakukan seperti milik sendiri — dengan perhatian penuh pada detail.",
  },
  {
    icon: Lightbulb,
    title: "Inovasi",
    description:
      "Kami selalu mengikuti perkembangan teknologi terbaru untuk memberikan solusi yang relevan dan future-proof.",
  },
  {
    icon: Globe,
    title: "Dampak Nyata",
    description:
      "Kesuksesan klien adalah tolok ukur kami. Website bukan sekadar estetika — ia harus menghasilkan bisnis.",
  },
]

// ─── Komponen ─────────────────────────────────────────────────────────────────

function FounderCard({ founder }: { founder: Founder }) {
  return (
    <Card className="group relative h-full overflow-hidden border-border/60 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
      <CardContent className="flex flex-col items-center gap-5 p-6 text-center sm:p-8">
        {/* Avatar placeholder */}
        <div className="relative shrink-0">
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-primary/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
          />
          <div
            className={`relative flex size-24 items-center justify-center rounded-full bg-gradient-to-br ${founder.gradient} text-2xl font-bold text-white shadow-lg ring-2 ring-white/10 transition-transform duration-300 group-hover:scale-105`}
          >
            {founder.initial}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1.5">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            {founder.name}
          </h3>
          <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-3 py-0.5 text-xs font-medium tracking-wider text-primary">
            {founder.role}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {founder.bio}
        </p>
      </CardContent>

      {/* Hover effects — gradient overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      {/* Top line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-primary/60 to-transparent transition-transform duration-500 group-hover:scale-x-100"
      />
    </Card>
  )
}

function ValueCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Zap
  title: string
  description: string
}) {
  return (
    <div className="group flex flex-col gap-3 rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/80">
      <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary ring-1 ring-primary/10 transition-transform duration-300 group-hover:scale-105">
        <Icon aria-hidden className="size-5" />
      </div>
      <h3 className="text-base font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <main>
        {/* ── Hero Section ────────────────────────────────────── */}
        <Section id="tentang-hero" size="lg">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium tracking-wider text-primary uppercase">
              Tentang Kami
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl md:text-6xl">
              Kami hadir untuk membuat{" "}
              <span className="text-gradient-brand">bisnis Anda bersinar</span>{" "}
              di internet
            </h1>
            <p className="mt-6 text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
              {brand.name} lahir dari satu keyakinan sederhana: setiap bisnis
              berhak tampil profesional di internet, tanpa biaya yang mencekik
              dan proses yang rumit. Kami menggabungkan teknologi modern dengan
              tim desainer berpengalaman untuk mewujudkan website impian Anda.
            </p>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border/60 pt-10">
              {[
                { value: "50+", label: "Klien Puas" },
                { value: "2hari", label: "Rata-rata Pengerjaan" },
                { value: "4.9★", label: "Rating Klien" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted-foreground sm:text-sm">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Cerita Perusahaan ────────────────────────────────── */}
        <Section id="cerita-wevlra" size="md">
          <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
            {/* Teks */}
            <div className="flex flex-col gap-6">
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
              <div className="flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                <p>
                  WEVLRA didirikan pada 2024 oleh empat mahasiswa teknologi
                  yang frustrasi melihat banyak UMKM lokal kesulitan memiliki
                  website yang bagus karena harga jasa web yang mahal dan proses
                  yang tidak transparan.
                </p>
                <p>
                  Kami membangun platform yang memungkinkan siapa saja —
                  pemilik warung, kreator konten, hingga perusahaan besar —
                  mendapatkan website premium dengan harga terjangkau dan proses
                  yang menyenangkan.
                </p>
                <p>
                  Hari ini, kami telah membantu lebih dari 50 klien dari
                  berbagai kota di Indonesia untuk hadir secara profesional di
                  internet.
                </p>
              </div>
            </div>

            {/* Visual card info */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Rocket, label: "Didirikan", value: "2024" },
                { icon: Users, label: "Tim Inti", value: "4 Orang" },
                { icon: Globe, label: "Lokasi", value: "Lampung, ID" },
                { icon: Heart, label: "Misi", value: "UMKM Digital" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm"
                >
                  <item.icon
                    aria-hidden
                    className="size-5 text-primary"
                  />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="text-base font-semibold text-foreground">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Nilai-Nilai ──────────────────────────────────────── */}
        <Section id="nilai-kami" size="md">
          <SectionHeader
            eyebrow="Nilai Kami"
            title="Prinsip yang memandu setiap karya kami"
            description="Empat nilai ini bukan sekadar kata-kata — mereka tertanam dalam setiap baris kode dan setiap piksel desain yang kami hasilkan."
            className="mb-12"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-4">
            {values.map((v) => (
              <ValueCard
                key={v.title}
                icon={v.icon}
                title={v.title}
                description={v.description}
              />
            ))}
          </div>
        </Section>

        {/* ── Tim Founder ──────────────────────────────────────── */}
        <Section id="tim-founder" size="md">
          <SectionHeader
            eyebrow="Tim Founder"
            title={
              <>
                Orang-orang di balik{" "}
                <span className="text-gradient-brand">{brand.name}</span>
              </>
            }
            description="Empat founder dengan keahlian saling melengkapi, bersatu untuk membangun solusi web terbaik bagi bisnis Indonesia."
            className="mb-12"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {founders.map((founder) => (
              <FounderCard key={founder.name} founder={founder} />
            ))}
          </div>
        </Section>

        {/* ── CTA ─────────────────────────────────────────────── */}
        <Section id="about-cta" size="md">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 px-8 py-14 text-center backdrop-blur-sm sm:px-12 sm:py-20">
            {/* Background glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-transparent to-transparent"
            />
            <div className="relative flex flex-col items-center gap-6">
              <h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
                Siap bekerja sama dengan kami?
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
                Ceritakan kebutuhan website Anda. Kami siap membantu Anda hadir
                secara profesional di internet.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/#kontak"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground shadow transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:shadow-primary/25"
                >
                  Hubungi Kami
                </Link>
                <Link
                  href="/#harga"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-border/60 bg-background px-7 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/40 hover:text-primary"
                >
                  Lihat Harga
                </Link>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <SiteFooter />
    </>
  )
}
