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
  image?: string
  socials?: {
    facebook?: string
    instagram?: string
    twitter?: string
    linkedin?: string
  }
}

export const founders: Founder[] = [
  {
    name: "Bintang Surya Nugraha",
    role: "Founder",
    image: "/images/bintang.png",
    socials: {
      instagram: "https://instagram.com/bintangsn",
      linkedin: "https://linkedin.com/in/bintangsn",
    },
  },
  {
    name: "Azni Muzaiyin",
    role: "Founder",
    image: "/images/azni.png",
    socials: {
      instagram: "https://instagram.com/aznimuzaiyin",
      linkedin: "https://linkedin.com/in/aznimuzaiyin",
    },
  },
  {
    name: "Murphy Ibrahim Movic",
    role: "Founder",
    image: "/images/murphy.png",
    socials: {
      instagram: "https://instagram.com/murphy",
      facebook: "https://facebook.com/murphy",
    },
  },
  {
    name: "Budi Safta Nugraha",
    role: "Founder",
    image: "/images/budi.png",
    socials: {
      twitter: "https://twitter.com/budis",
      linkedin: "https://linkedin.com/in/budisn",
    },
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

export type HeroStat = {
  value: string
  label: string
}

export const heroStats: HeroStat[] = [
  { value: "50+", label: "Klien Puas" },
  { value: "2hari", label: "Rata-rata Pengerjaan" },
  { value: "4.9★", label: "Rating Klien" },
]

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
