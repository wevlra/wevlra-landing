import {
  Globe,
  Heart,
  Lightbulb,
  Rocket,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react"

export type Founder = {
  name: string
  role: string
  bio: string
  initial: string
  gradient: string
}

export const founders: Founder[] = [
  {
    name: "Bintang Surya Nugraha",
    role: "Founder",
    bio: "Visioner di balik WEVLRA. Berpengalaman 2+ tahun di industri teknologi dan desain produk digital.",
    initial: "BSN",
    gradient: "from-violet-500 to-primary",
  },
  {
    name: "Azni Muzaiyin",
    role: "Founder",
    bio: "Arsitek sistem WEVLRA. Ahli dalam Next.js, cloud infrastructure, dan performa web skala enterprise.",
    initial: "AM",
    gradient: "from-sky-500 to-cyan-400",
  },
  {
    name: "Murphy Ibrahim Movic",
    role: "Founder",
    bio: "Penyempurna estetika setiap proyek. Berlatar belakang Graphic Designer dan brand identity selama 4 tahun.",
    initial: "MIM",
    gradient: "from-rose-400 to-pink-500",
  },
  {
    name: "Budi Safta Nugraha",
    role: "Founder",
    bio: "Penerjemah desain menjadi kode. Ahli dalam animasi web, dan optimasi performa front-end.",
    initial: "BSN",
    gradient: "from-amber-400 to-orange-500",
  },
]

export type CompanyValue = {
  icon: LucideIcon
  title: string
  description: string
}

export const companyValues: CompanyValue[] = [
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

// ─── Statistik Hero ───────────────────────────────────────────────────────────

export type HeroStat = {
  value: string
  label: string
}

export const heroStats: HeroStat[] = [
  { value: "50+", label: "Klien Puas" },
  { value: "2hari", label: "Rata-rata Pengerjaan" },
  { value: "4.9★", label: "Rating Klien" },
]

// ─── Info Card (Cerita Kami) ──────────────────────────────────────────────────

export type InfoCard = {
  icon: LucideIcon
  label: string
  value: string
}

export const companyInfoCards: InfoCard[] = [
  { icon: Rocket, label: "Didirikan", value: "2024" },
  { icon: Users, label: "Tim Inti", value: "4 Orang" },
  { icon: Globe, label: "Lokasi", value: "Lampung, ID" },
  { icon: Heart, label: "Misi", value: "UMKM Digital" },
]
