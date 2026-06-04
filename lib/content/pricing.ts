export type PricingTier = {
  name: string;
  description: string;
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  popular?: boolean;
  features: string[];
  cta: string;
  ctaHref: string;
};

export type PricingCategory = {
  id: string;
  label: string;
  tiers: PricingTier[];
};

export const pricingCategories: PricingCategory[] = [
  {
    id: "website",
    label: "Website",
    tiers: [
      {
        name: "Starter",
        description: "Cocok untuk UMKM dan profesional yang baru mulai online.",
        monthlyPrice: 499000,
        yearlyPrice: Math.round(499000 * 12 * 0.8),
        features: [
          "1 halaman landing page profesional",
          "Domain .id gratis 1 tahun",
          "Hosting SSD 5 GB + SSL gratis",
          "Desain responsif mobile-friendly",
          "Formulir kontak & tombol WhatsApp",
          "Optimasi SEO dasar",
          "Revisi desain 1x",
          "Dukungan via email",
        ],
        cta: "Mulai Sekarang",
        ctaHref: "#",
      },
      {
        name: "Pro",
        description:
          "Untuk bisnis yang ingin tampil profesional dan tumbuh lebih cepat.",
        monthlyPrice: 1499000,
        yearlyPrice: Math.round(1499000 * 12 * 0.8),
        popular: true,
        features: [
          "Semua fitur Starter, plus:",
          "Hingga 10 halaman kustom",
          "Domain .com/.id gratis 1 tahun",
          "Hosting SSD 20 GB + SSL gratis",
          "Optimasi SEO lanjutan + Google Analytics",
          "Integrasi WhatsApp, Instagram & email",
          "Blog/artikel siap pakai",
          "Revisi desain hingga 3x",
          "Dukungan prioritas via WhatsApp",
        ],
        cta: "Mulai Sekarang",
        ctaHref: "#",
      },
      {
        name: "Enterprise",
        description: "Solusi penuh untuk perusahaan dengan kebutuhan khusus.",
        monthlyPrice: null,
        yearlyPrice: null,
        features: [
          "Semua fitur Pro, plus:",
          "Halaman & fitur tanpa batas",
          "Hosting dedicated & domain premium",
          "Toko online & gateway pembayaran",
          "Integrasi sistem kustom (CRM/ERP)",
          "Optimasi performa & keamanan lanjutan",
          "Manajer akun dedikasi",
          "SLA & dukungan prioritas 24/7",
          "Pelatihan & onboarding tim",
        ],
        cta: "Hubungi Kami",
        ctaHref: "mailto:halo@webvlora.id",
      },
    ],
  },
  {
    id: "mobile",
    label: "Mobile Application",
    tiers: [
      {
        name: "Starter",
        description:
          "Ideal untuk startup dan bisnis yang baru masuk ke ekosistem mobile.",
        monthlyPrice: 2999000,
        yearlyPrice: Math.round(2999000 * 12 * 0.8),
        features: [
          "Aplikasi Android (APK siap publish)",
          "Hingga 5 layar / fitur utama",
          "Desain UI kustom mobile-friendly",
          "Koneksi REST API dasar",
          "Push notification sederhana",
          "Publikasi ke Google Play Store",
          "Revisi desain 1x",
          "Dukungan via email",
        ],
        cta: "Mulai Sekarang",
        ctaHref: "#",
      },
      {
        name: "Pro",
        description:
          "Untuk bisnis yang membutuhkan aplikasi lengkap di Android & iOS.",
        monthlyPrice: 5999000,
        yearlyPrice: Math.round(5999000 * 12 * 0.8),
        popular: true,
        features: [
          "Semua fitur Starter, plus:",
          "Android & iOS (React Native / Flutter)",
          "Hingga 15 layar / fitur lanjutan",
          "Autentikasi pengguna (OTP / OAuth)",
          "Integrasi payment gateway lokal",
          "Dashboard admin berbasis web",
          "Push notification & in-app messaging",
          "Revisi desain hingga 3x",
          "Dukungan prioritas via WhatsApp",
        ],
        cta: "Mulai Sekarang",
        ctaHref: "#",
      },
      {
        name: "Enterprise",
        description:
          "Solusi mobile skala besar dengan fitur & keamanan tingkat enterprise.",
        monthlyPrice: null,
        yearlyPrice: null,
        features: [
          "Semua fitur Pro, plus:",
          "Fitur & layar tanpa batas",
          "Arsitektur microservice & API gateway",
          "Integrasi sistem kustom (ERP/CRM)",
          "Enkripsi data & keamanan tingkat lanjut",
          "CI/CD pipeline & automated testing",
          "Manajer proyek & tim dedikasi",
          "SLA & dukungan prioritas 24/7",
          "Pelatihan & onboarding tim",
        ],
        cta: "Hubungi Kami",
        ctaHref: "mailto:halo@webvlora.id",
      },
    ],
  },
  {
    id: "desktop",
    label: "Desktop Application",
    tiers: [
      {
        name: "Starter",
        description:
          "Solusi desktop ringan untuk kebutuhan operasional bisnis sehari-hari.",
        monthlyPrice: 3499000,
        yearlyPrice: Math.round(3499000 * 12 * 0.8),
        features: [
          "Aplikasi Windows (installer siap pakai)",
          "Hingga 5 modul / fitur utama",
          "Antarmuka GUI modern & intuitif",
          "Penyimpanan data lokal (SQLite)",
          "Ekspor laporan ke PDF / Excel",
          "Pembaruan manual via file installer",
          "Revisi desain 1x",
          "Dukungan via email",
        ],
        cta: "Mulai Sekarang",
        ctaHref: "#",
      },
      {
        name: "Pro",
        description:
          "Aplikasi desktop lintas platform dengan fitur kolaborasi dan cloud.",
        monthlyPrice: 7499000,
        yearlyPrice: Math.round(7499000 * 12 * 0.8),
        popular: true,
        features: [
          "Semua fitur Starter, plus:",
          "Lintas platform: Windows & macOS",
          "Hingga 15 modul / fitur lanjutan",
          "Sinkronisasi data cloud real-time",
          "Manajemen pengguna & hak akses",
          "Notifikasi & laporan terjadwal otomatis",
          "Pembaruan otomatis (auto-update)",
          "Revisi desain hingga 3x",
          "Dukungan prioritas via WhatsApp",
        ],
        cta: "Mulai Sekarang",
        ctaHref: "#",
      },
      {
        name: "Enterprise",
        description:
          "Sistem desktop skala perusahaan dengan integrasi penuh dan keamanan tinggi.",
        monthlyPrice: null,
        yearlyPrice: null,
        features: [
          "Semua fitur Pro, plus:",
          "Modul & fitur tanpa batas",
          "Integrasi ERP / CRM / sistem internal",
          "Active Directory & SSO support",
          "Enkripsi data end-to-end",
          "Deployment terpusat via enterprise MDM",
          "Manajer akun & tim developer dedikasi",
          "SLA & dukungan prioritas 24/7",
          "Pelatihan & onboarding tim",
        ],
        cta: "Hubungi Kami",
        ctaHref: "mailto:halo@webvlora.id",
      },
    ],
  },
];

// Backward-compatible export (agar tidak ada komponen lain yang rusak)
export const pricingTiers = pricingCategories[0].tiers;
