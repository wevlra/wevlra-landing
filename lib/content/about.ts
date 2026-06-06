import {
  Globe,
  Heart,
  Lightbulb,
  Rocket,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react"

// ─── Founder ──────────────────────────────────────────────────────────────────

export type Founder = {
  name: string
  role: string
  bio: string
  /** Inisial untuk avatar placeholder */
  initial: string
  /** Warna gradient avatar — pasangan from/to Tailwind */
  gradient: string
}

export const founders: Founder[] = [
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
