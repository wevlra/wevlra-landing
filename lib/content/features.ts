import { Globe, Palette, Search, Sparkles, Zap, type LucideIcon } from "lucide-react";

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const features: Feature[] = [
  {
    icon: Sparkles,
    title: "Platform Modern",
    description:
      "Sampaikan kebutuhan website Anda, dan sistem kami langsung merancang draf website lengkap dalam waktu singkat.",
  },
  {
    icon: Palette,
    title: "Desain Custom",
    description:
      "Tim desainer kami menyempurnakan setiap detail visual agar sesuai dengan identitas brand Anda.",
  },
  {
    icon: Search,
    title: "Optimasi SEO",
    description:
      "Setiap website dibangun dengan fondasi SEO yang kuat agar mudah ditemukan di Google dan mesin pencari lainnya.",
  },
  {
    icon: Zap,
    title: "Performa Kencang",
    description:
      "Dioptimalkan untuk kecepatan loading di bawah 2 detik. Pengunjung tidak perlu menunggu, konversi meningkat.",
  },
  {
    icon: Globe,
    title: "Domain & Hosting",
    description:
      "Kami urus semua kebutuhan teknis: domain, hosting, SSL, hingga email profesional — semuanya dalam satu paket.",
  },
];
