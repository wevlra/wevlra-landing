"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Section, SectionHeader } from "@/components/section"
import {
  Mail,
  MapPin,
  MessageCircle,
  Send,
  type LucideIcon,
} from "lucide-react"
import { contact } from "@/lib/content/site"

const contactInfo: {
  icon: LucideIcon
  label: string
  value: string
  href: string | null
}[] = [
  {
    icon: Mail,
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: contact.whatsapp_text,
    href: contact.whatsapp_link,
  },
  {
    icon: MapPin,
    label: "Lokasi",
    value: "Lampung, Indonesia",
    href: null,
  },
]

export function Contact() {
  return (
    <Section id="kontak" className="bg-muted/30">
      <SectionHeader
        eyebrow="Kontak"
        title="Hubungi Kami"
        description="Punya pertanyaan atau ingin konsultasi gratis? Tim kami siap membantu."
        className="mb-12 sm:mb-14"
      />

      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
        <div className="grid lg:grid-cols-5">
          <aside className="relative flex flex-col gap-6 border-b border-border/60 bg-muted/40 p-6 sm:p-8 lg:col-span-2 lg:border-r lg:border-b-0">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Mari mulai obrolan
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Balasan tercepat lewat WhatsApp pada jam kerja. Untuk permintaan
                formal, kirim email kapan saja.
              </p>
            </div>

            <ul className="flex flex-col gap-1">
              {contactInfo.map((item) => {
                const content = (
                  <>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <item.icon aria-hidden className="size-4" />
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                        {item.label}
                      </span>
                      <span className="truncate text-sm font-semibold text-foreground">
                        {item.value}
                      </span>
                    </span>
                  </>
                )

                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="group -mx-2 flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-background/60"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="-mx-2 flex items-center gap-3 px-2 py-2">
                        {content}
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </aside>
          <div className="lg:col-span-3">
            <form
              className="flex flex-col gap-4 p-6 sm:p-8"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="name"
                    className="text-xs font-medium text-foreground"
                  >
                    Nama
                  </label>
                  <Input
                    id="name"
                    placeholder="Nama lengkap"
                    className="h-10"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-xs font-medium text-foreground"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@contoh.com"
                    className="h-10"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="subject"
                  className="text-xs font-medium text-foreground"
                >
                  Subjek
                </label>
                <Input
                  id="subject"
                  placeholder="Apa yang bisa kami bantu?"
                  className="h-10"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="message"
                  className="text-xs font-medium text-foreground"
                >
                  Pesan
                </label>
                <Textarea
                  id="message"
                  placeholder="Ceritakan kebutuhan website Anda..."
                  rows={4}
                  className="min-h-28"
                />
              </div>
              <div className="flex items-center justify-between gap-3 pt-1">
                <p className="text-xs text-muted-foreground">
                  Kami balas dalam 1×24 jam.
                </p>
                <Button type="submit" size="default">
                  <Send aria-hidden className="size-4" />
                  Kirim Pesan
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Section>
  )
}
