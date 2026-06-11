import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { ChatWidget } from "@/components/chat-widget"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const BASE = "https://www.wevlra.dev"

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    template: "%s | WEVLRA",
    default: "WEVLRA — Jasa Pembuatan Website & Aplikasi",
  },
  description:
    "WEVLRA menggabungkan kecepatan teknologi modern dengan sentuhan desainer manusia. Buat website, aplikasi mobile & desktop profesional mulai Rp 499 ribu.",
  keywords: [
    "jasa pembuatan website",
    "pembuatan website cepat",
    "website UMKM Indonesia",
    "buat website murah",
    "website profesional",
    "jasa website Indonesia",
    "landing page",
    "toko online",
    "jasa pembuatan aplikasi",
    "aplikasi mobile",
    "aplikasi desktop",
    "WEVLRA",
  ],
  authors: [{ name: "WEVLRA" }],
  creator: "WEVLRA",
  publisher: "WEVLRA",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  icons: {
    icon: [
      {
        url: "/icon-dark.png",
        media: "(prefers-color-scheme: light)",
        type: "image/png",
      },
      {
        url: "/icon-light.png",
        media: "(prefers-color-scheme: dark)",
        type: "image/png",
      },
    ],
    apple: "/icon-dark.png",
  },
  openGraph: {
    title: "WEVLRA — Jasa Pembuatan Website & Aplikasi Premium",
    description:
      "Ceritakan website impian Anda. Kami bangun dengan cepat menggunakan teknologi modern + tim desainer lokal.",
    url: BASE,
    siteName: "WEVLRA",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "WEVLRA — Jasa Pembuatan Website & Aplikasi Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WEVLRA — Jasa Pembuatan Website & Aplikasi Premium",
    description:
      "Ceritakan website impian Anda. Kami bangun dengan cepat menggunakan teknologi modern + tim desainer lokal.",
    images: ["/opengraph-image.png"],
    creator: "@wevlra",
    site: "@wevlra",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE,
    languages: {
      "id-ID": BASE,
    },
  },
  appleWebApp: {
    title: "WEVLRA",
    statusBarStyle: "black-translucent",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ?? "",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <ThemeProvider>
          {children}
          <ChatWidget />
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  )
}
