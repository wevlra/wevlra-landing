"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Section, SectionHeader } from "@/components/section"
import {
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Loader2,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react"
import { contact } from "@/lib/content/site"
import { submitContact, type ContactFormState } from "@/app/actions/contact"
import { toast } from "sonner"

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

function ContactForm({ onSuccess }: { onSuccess: () => void }) {
  const [state, formAction, pending] = useActionState(
    submitContact,
    {} as ContactFormState
  )
  const formRef = useRef<HTMLFormElement>(null)
  const successHandled = useRef(false)
  const [isValid, setIsValid] = useState(false)

  function checkValidity() {
    setIsValid(formRef.current?.checkValidity() ?? false)
  }

  useEffect(() => {
    if (state.success && !successHandled.current) {
      successHandled.current = true
      onSuccess()
    } else if (state.message && !state.success) {
      toast.error(state.message)
    }
  }, [state, onSuccess])

  return (
    <form
      ref={formRef}
      className="flex flex-col gap-4 p-6 sm:p-8"
      onChange={checkValidity}
      onSubmit={(e) => {
        e.preventDefault()
        if (pending || !isValid) return
        const fd = new FormData(e.currentTarget)
        formAction(fd)
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-xs font-medium text-foreground">
            Nama
          </label>
          <Input
            id="name"
            name="name"
            placeholder="Nama lengkap"
            className="h-10"
            required
            disabled={pending}
          />
          {state.errors?.name && (
            <p className="text-xs text-destructive">{state.errors.name[0]}</p>
          )}
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
            name="email"
            type="email"
            placeholder="email@contoh.com"
            className="h-10"
            required
            disabled={pending}
          />
          {state.errors?.email && (
            <p className="text-xs text-destructive">{state.errors.email[0]}</p>
          )}
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
          name="subject"
          placeholder="Apa yang bisa kami bantu?"
          className="h-10"
          required
          disabled={pending}
        />
        {state.errors?.subject && (
          <p className="text-xs text-destructive">{state.errors.subject[0]}</p>
        )}
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
          name="message"
          placeholder="Ceritakan kebutuhan website Anda..."
          rows={4}
          className="min-h-28"
          required
          disabled={pending}
        />
        {state.errors?.message && (
          <p className="text-xs text-destructive">{state.errors.message[0]}</p>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 pt-1">
        <p className="text-xs text-muted-foreground">
          Kami balas dalam 1×24 jam.
        </p>
        <Button type="submit" size="default" disabled={pending || !isValid}>
          {pending ? (
            <Loader2 aria-hidden className="size-4 animate-spin" />
          ) : (
            <Send aria-hidden className="size-4" />
          )}
          {pending ? "Mengirim..." : "Kirim Pesan"}
        </Button>
      </div>
    </form>
  )
}

export function Contact() {
  const [formKey, setFormKey] = useState(0)
  const [submitted, setSubmitted] = useState(false)

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
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 p-6 sm:p-8">
                <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CheckCircle2 aria-hidden className="size-5" />
                </span>
                <div className="text-center">
                  <h4 className="text-base font-semibold text-foreground">
                    Pesan Terkirim!
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Terima kasih sudah menghubungi kami. Kami akan membalas
                    dalam 1×24 jam.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSubmitted(false)
                    setFormKey((k) => k + 1)
                  }}
                >
                  Kirim pesan lagi
                </Button>
              </div>
            ) : (
              <ContactForm key={formKey} onSuccess={() => setSubmitted(true)} />
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}
