import {
  Globe,
  Palette,
  Search,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react"

export type Feature = {
  icon: LucideIcon
  title: string
  description: string
  videoSrc?: string
  poster?: string
}

export const features: Feature[] = [
  {
    icon: Sparkles,
    title: "Platform Modern",
    description:
      "Sampaikan kebutuhan website Anda, dan sistem kami langsung merancang draf website lengkap dalam waktu singkat.",
    videoSrc: "/videos/features1.mp4", // Contoh: "/videos/platform-modern.mp4"
    poster: "", // Contoh: "/images/posters/platform-modern.jpg"
  },
  {
    icon: Palette,
    title: "Desain Custom",
    description:
      "Tim desainer kami menyempurnakan setiap detail visual agar sesuai dengan identitas brand Anda.",
    videoSrc: "/videos/features2.mp4", // Contoh: "/videos/desain-custom.mp4"
    poster: "", // Contoh: "/images/posters/desain-custom.jpg"
  },
  {
    icon: Search,
    title: "Optimasi SEO",
    description:
      "Setiap website dibangun dengan fondasi SEO yang kuat agar mudah ditemukan di Google dan mesin pencari lainnya.",
    videoSrc: "/videos/features3.mp4", // Contoh: "/videos/optimasi-seo.mp4"
    poster: "", // Contoh: "/images/posters/optimasi-seo.jpg"
  },
  {
    icon: Zap,
    title: "Performa Kencang",
    description:
      "Dioptimalkan untuk kecepatan loading di bawah 2 detik. Pengunjung tidak perlu menunggu, konversi meningkat.",
    videoSrc: "/videos/features4.mp4", // Contoh: "/videos/performa-kencang.mp4"
    poster: "", // Contoh: "/images/posters/performa-kencang.jpg"
  },
  {
    icon: Globe,
    title: "Domain & Hosting",
    description:
      "Kami urus semua kebutuhan teknis: domain, hosting, SSL, hingga email profesional — semuanya dalam satu paket.",
    videoSrc: "/videos/features5.mp4", // Contoh: "/videos/domain-hosting.mp4"
    poster: "", // Contoh: "/images/posters/domain-hosting.jpg"
  },
]
