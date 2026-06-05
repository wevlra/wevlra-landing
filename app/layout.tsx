import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://webvlora.id"),
  title: {
    template: "%s | WebVlora",
    default: "WebVlora — Jasa Pembuatan Website Premium",
  },
  description:
    "WebVlora menggabungkan kecepatan teknologi modern dengan sentuhan desainer manusia. Buat website profesional untuk UMKM, portofolio, atau perusahaan Anda mulai dari Rp 499 ribu.",
  keywords: [
    "jasa pembuatan website",
    "pembuatan website cepat",
    "website UMKM Indonesia",
    "buat website murah",
    "website profesional",
    "jasa website Indonesia",
    "landing page",
    "toko online",
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
    title: "WebVlora — Jasa Pembuatan Website Premium",
    description:
      "Ceritakan website impian Anda. Kami bangun dengan cepat menggunakan teknologi modern + tim desainer lokal.",
    url: "https://webvlora.id",
    siteName: "WebVlora",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/icon-dark.png",
        width: 730,
        height: 730,
        alt: "WebVlora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WebVlora — Jasa Pembuatan Website Premium",
    description:
      "Ceritakan website impian Anda. Kami bangun dengan cepat menggunakan teknologi modern + tim desainer lokal.",
    images: ["/icon-dark.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body>
        <ThemeProvider>
          {children}
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
