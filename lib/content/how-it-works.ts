import {
  MessageCircle,
  Rocket,
  Users,
  WandSparkles,
  type LucideIcon,
} from "lucide-react"

export type Step = {
  step: number
  title: string
  description: string
  icon: LucideIcon
}

export const steps: Step[] = [
  {
    step: 1,
    icon: MessageCircle,
    title: "Ceritakan Kebutuhan Anda",
    description:
      "Jelaskan ide, tantangan, atau kebutuhan bisnis Anda melalui AI Assistant atau konsultasi langsung dengan tim kami.",
  },
  {
    step: 2,
    icon: WandSparkles,
    title: "Analisis & Rekomendasi Solusi",
    description:
      "Kami membantu mengidentifikasi kebutuhan dan merekomendasikan solusi digital yang paling sesuai.",
  },
  {
    step: 3,
    icon: Users,
    title: "Pengembangan oleh Tim Ahli",
    description:
      "Developer dan designer kami membangun solusi yang telah disepakati dengan fokus pada kualitas, performa, dan pengalaman pengguna.",
  },
  {
    step: 4,
    icon: Rocket,
    title: "Launch & Dukungan Berkelanjutan",
    description:
      "Produk siap digunakan dan kami tetap mendampingi melalui pemeliharaan, pengembangan lanjutan, dan dukungan teknis.",
  },
]
