import {
  Briefcase,
  Building2,
  CircleHelp,
  Images,
  Layers,
  Quote,
  Rocket,
  ShoppingCart,
  Store,
  User,
  Workflow,
  type LucideIcon,
} from "lucide-react"

export type NavLeaf = {
  label: string
  href: string
  description?: string
  icon?: LucideIcon
}

export type NavGroup = {
  title: string
  items: NavLeaf[]
}

export type NavItem =
  | { kind: "link"; label: string; href: string }
  | {
      kind: "panel"
      label: string
      groups: NavGroup[]
      featured?: {
        title: string
        description: string
        href: string
        cta: string
      }
    }

export const nav: NavItem[] = [
  {
    kind: "panel",
    label: "Produk",
    groups: [
      {
        title: "Platform",
        items: [
          {
            label: "Fitur",
            href: "/#fitur",
            description: "Apa saja yang Anda dapatkan",
            icon: Layers,
          },
          {
            label: "Cara Kerja",
            href: "/#cara-kerja",
            description: "Dari ide ke website hidup",
            icon: Workflow,
          },
        ],
      },
      {
        title: "Untuk Anda",
        items: [
          {
            label: "UMKM & Bisnis",
            href: "/#showcase",
            description: "Toko, katalog, dan landing page",
            icon: Store,
          },
          {
            label: "Personal & Kreator",
            href: "/#showcase",
            description: "Portofolio dan blog yang menonjol",
            icon: User,
          },
          {
            label: "Korporat",
            href: "/#showcase",
            description: "Profil perusahaan profesional",
            icon: Building2,
          },
        ],
      },
    ],
  },
  {
    kind: "panel",
    label: "Solusi",
    groups: [
      {
        title: "Berdasarkan kebutuhan",
        items: [
          {
            label: "Landing Page",
            href: "/#showcase",
            description: "Halaman tunggal berkonversi tinggi",
            icon: Rocket,
          },
          {
            label: "Toko Online",
            href: "/#showcase",
            description: "E-commerce dengan pembayaran",
            icon: ShoppingCart,
          },
          {
            label: "Profil Perusahaan",
            href: "/#showcase",
            description: "Website korporat lengkap",
            icon: Briefcase,
          },
        ],
      },
      {
        title: "Sumber daya",
        items: [
          {
            label: "Showcase",
            href: "/#showcase",
            description: "Hasil nyata dari klien kami",
            icon: Images,
          },
          {
            label: "Testimoni",
            href: "/#testimoni",
            description: "Cerita dari pengguna",
            icon: Quote,
          },
          {
            label: "Pertanyaan Umum",
            href: "/#pertanyaan",
            description: "Jawaban yang sering ditanyakan",
            icon: CircleHelp,
          },
        ],
      },
    ],
  },
  { kind: "link", label: "Harga", href: "/#harga" },
  { kind: "link", label: "Tentang", href: "/tentang" },
  { kind: "link", label: "Kontak", href: "/#kontak" },
]

export const navFlat = [
  { label: "Fitur", href: "/#fitur" },
  { label: "Cara Kerja", href: "/#cara-kerja" },
  { label: "Harga", href: "/#harga" },
  { label: "Tentang", href: "/tentang" },
  { label: "Kontak", href: "/#kontak" },
]

export const brand = {
  name: "WEVLRA",
  tagline: "Mengubah Ide Menjadi Solusi Digital.",
  description:
    "Software house yang membantu bisnis membangun website, aplikasi, dan solusi digital modern melalui kombinasi teknologi, desain, dan strategi yang berorientasi pada hasil.",
}

export const social = {
  instagram: "#",
  twitter: "#",
  linkedin: "#",
  youtube: "#",
}

export const contact = {
  email: "wevlratech@gmail.com",
  whatsapp_link: "https://wa.me/6285122305720",
  whatsapp_text: "+62 851-2230-5720",
}
