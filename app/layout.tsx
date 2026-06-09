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

export const metadata: Metadata = {
  metadataBase: new URL("https://wevlra.com"),
  title: {
    template: "%s | WEVLRA",
    default: "WEVLRA — Software House & Digital Solutions",
  },
  description:
    "WEVLRA membantu bisnis membangun website, aplikasi, dan solusi digital modern melalui kombinasi teknologi, desain, dan strategi yang berorientasi pada hasil.",
  keywords: [
    "software house indonesia",
    "software development",
    "jasa pembuatan website",
    "jasa pembuatan aplikasi",
    "web development",
    "mobile app development",
    "custom software development",
    "solusi digital",
    "website perusahaan",
    "website UMKM",
    "website profesional",
    "aplikasi bisnis",
    "transformasi digital",
    "software house lampung",
    "wevlra",
  ],
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
    title: "WEVLRA — Software House & Digital Solutions",
    description:
      "Bangun website, aplikasi, dan solusi digital modern bersama WEVLRA. Kami membantu bisnis mengubah ide menjadi produk digital yang profesional dan berdampak.",
    url: "https://wevlra.com",
    siteName: "WEVLRA",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/icon-dark.png",
        width: 730,
        height: 730,
        alt: "WEVLRA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WEVLRA — Software House & Digital Solutions",
    description:
      "Bangun website, aplikasi, dan solusi digital modern bersama WEVLRA. Dari ide hingga produk digital yang siap berkembang.",
    images: ["/icon-dark.png"],
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
