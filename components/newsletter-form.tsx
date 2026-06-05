"use client"

import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterForm() {
  return (
    <form
      className="flex flex-col gap-2 sm:flex-row"
      onSubmit={(e) => e.preventDefault()}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email
      </label>
      <Input
        id="newsletter-email"
        type="email"
        placeholder="email@contoh.com"
        className="h-11 sm:flex-1"
        autoComplete="email"
      />
      <Button type="submit" size="lg" className="h-11">
        Berlangganan
        <ArrowRight aria-hidden className="size-4" />
      </Button>
    </form>
  )
}
