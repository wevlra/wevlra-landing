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
      "Ubah ide menjadi solusi digital yang modern, terstruktur, dan siap berkembang bersama bisnis Anda.",
    videoSrc: "/videos/features1.mp4", // Contoh: "/videos/platform-modern.mp4"
    poster: "", // Contoh: "/images/posters/platform-modern.jpg"
  },
  {
    icon: Palette,
    title: "Desain Custom",
    description:
      "Setiap antarmuka dirancang sesuai identitas brand dengan fokus pada pengalaman pengguna yang nyaman.",
    videoSrc: "/videos/features2.mp4", // Contoh: "/videos/desain-custom.mp4"
    poster: "", // Contoh: "/images/posters/desain-custom.jpg"
  },
  {
    icon: Search,
    title: "Optimasi SEO",
    description:
      "Dibangun dengan fondasi SEO yang kuat agar lebih mudah ditemukan dan menjangkau pelanggan baru.",
    videoSrc: "/videos/features3.mp4", // Contoh: "/videos/optimasi-seo.mp4"
    poster: "", // Contoh: "/images/posters/optimasi-seo.jpg"
  },
  {
    icon: Zap,
    title: "Performa Kencang",
    description:
      "Dioptimalkan untuk kecepatan, stabilitas, dan pengalaman pengguna yang konsisten di berbagai perangkat.",
    videoSrc: "/videos/features4.mp4", // Contoh: "/videos/performa-kencang.mp4"
    poster: "", // Contoh: "/images/posters/performa-kencang.jpg"
  },
  {
    icon: Globe,
    title: "Domain & Hosting",
    description:
      "Kami menangani domain, hosting, SSL, dan deployment agar produk siap digunakan dengan aman..",
    videoSrc: "/videos/features5.mp4", // Contoh: "/videos/domain-hosting.mp4"
    poster: "", // Contoh: "/images/posters/domain-hosting.jpg"
  },
]
