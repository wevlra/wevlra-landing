"use client"

import { ArrowRight } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterForm() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const email = data.get("email") as string

    if (!email || !email.includes("@")) {
      toast.error("Masukkan alamat email yang valid.")
      return
    }

    toast.success("Terima kasih! Anda akan mendapat update dari kami.")
    form.reset()
  }

  return (
    <form className="flex flex-col gap-2 sm:flex-row" onSubmit={handleSubmit}>
      <label htmlFor="newsletter-email" className="sr-only">
        Email
      </label>
      <Input
        id="newsletter-email"
        name="email"
        type="email"
        placeholder="email@contoh.com"
        className="h-11 sm:flex-1"
        autoComplete="email"
        required
      />
      <Button type="submit" size="lg" className="h-11 px-6">
        Berlangganan
        <ArrowRight aria-hidden className="size-4" />
      </Button>
    </form>
  )
}
