import Image from "next/image"
import Link from "next/link"

import { NewsletterForm } from "@/components/newsletter-form"
import { brand, contact } from "@/lib/content/site"

const productLinks = [
  { label: "Fitur", href: "/#fitur" },
  { label: "Cara Kerja", href: "/#cara-kerja" },
  { label: "Harga", href: "/#harga" },
  { label: "Showcase", href: "/#showcase" },
]

const solutionLinks = [
  { label: "Landing Page", href: "/#showcase" },
  { label: "Toko Online", href: "/#showcase" },
  { label: "Profil Perusahaan", href: "/#showcase" },
  { label: "Portofolio Personal", href: "/#showcase" },
  { label: "Blog & Konten", href: "/#showcase" },
]

const companyLinks = [
  { label: "Tentang Kami", href: "/about" },
  { label: "Karir", href: "#" },
  { label: "Mitra", href: "#" },
  { label: "Kontak", href: "/#kontak" },
  { label: "Press Kit", href: "#" },
]

const resourceLinks = [
  { label: "Blog", href: "#" },
  { label: "Pertanyaan Umum", href: "/#pertanyaan" },
  { label: "Testimoni", href: "/#testimoni" },
  { label: "Panduan", href: "#" },
  { label: "Status", href: "#" },
]

const legalLinks = [
  { label: "Syarat & Ketentuan", href: "#" },
  { label: "Kebijakan Privasi", href: "#" },
  { label: "Kebijakan Cookie", href: "#" },
]

const socialLinks: { label: string; href: string; icon: React.ReactNode }[] = [
  {
    label: "Instagram WEVLRA",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="size-4"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "X (Twitter) WEVLRA",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="size-4"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn WEVLRA",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="size-4"
      >
        <path d="M20.451 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.355V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "YouTube WEVLRA",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="size-4"
      >
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top: newsletter band */}
        <div className="grid gap-6 border-b border-border/60 py-10 md:grid-cols-2 md:items-center md:gap-10 md:py-12">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Dapat insight web bisnis tiap minggu
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Tips desain, SEO, dan studi kasus singkat. Tanpa spam, batalkan
              kapan saja.
            </p>
          </div>
          <NewsletterForm />
        </div>

        {/* Main: brand + columns */}
        <div className="grid gap-10 py-12 md:grid-cols-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5"
              aria-label={`${brand.name} — kembali ke beranda`}
            >
              <Image
                src="/icon-dark-transparent.png"
                alt=""
                width={32}
                height={32}
                className="rounded-md dark:hidden"
              />
              <Image
                src="/icon-light-transparent.png"
                alt=""
                width={32}
                height={32}
                className="hidden rounded-md dark:block"
              />
              <span className="text-base font-bold tracking-tight">
                {brand.name}
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {brand.description}
            </p>

            <ul className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors hover:text-foreground"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={contact.whatsapp_link}
                  className="transition-colors hover:text-foreground"
                >
                  {contact.whatsapp_text}
                </a>
              </li>
              <li>Lampung, Indonesia</li>
            </ul>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:col-span-8 md:gap-6">
            <FooterColumn title="Produk" links={productLinks} />
            <FooterColumn title="Solusi" links={solutionLinks} />
            <FooterColumn title="Sumber Daya" links={resourceLinks} />
            <FooterColumn title="Perusahaan" links={companyLinks} />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-border/60 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted-foreground">
            © 2026 {brand.name}. Semua hak dilindungi.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex size-8 items-center justify-center rounded-full border border-border/60 bg-background text-muted-foreground transition hover:border-primary/40 hover:text-primary"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

type FooterColumnProps = {
  title: string
  links: { label: string; href: string }[]
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold tracking-wider text-foreground uppercase">
        {title}
      </h3>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
