"use client"

import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Loader, Sparkles } from "lucide-react"

const SUGGESTION_CHIPS = [
  {
    label: "Toko online UMKM",
    expanded:
      "Saya ingin membuat website toko online untuk UMKM yang menjual produk fashion lokal dengan katalog produk dan keranjang belanja.",
  },
  {
    label: "Portofolio fotografer",
    expanded:
      "Saya ingin membuat website portofolio untuk fotografer profesional dengan galeri foto, tentang saya, dan formulir kontak.",
  },
  {
    label: "Landing page produk",
    expanded:
      "Saya ingin membuat landing page untuk produk baru saya dengan fitur unggulan, testimoni pelanggan, dan tombol beli sekarang.",
  },
  {
    label: "Profil perusahaan",
    expanded:
      "Saya ingin membuat website profil perusahaan yang menampilkan layanan, tim, portofolio proyek, dan informasi kontak.",
  },
  {
    label: "Blog kuliner",
    expanded:
      "Saya ingin membuat blog kuliner yang berisi resep masakan, ulasan restoran, dan tips memasak untuk pembaca Indonesia.",
  },
]

export function PromptBuilder() {
  const [value, setValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  function handleChipClick(expanded: string) {
    setValue(expanded)
  }

  function handleSubmit() {
    if (value.trim().length < 10) {
      toast.warning(
        "Tolong ceritakan sedikit lebih detail (minimal 10 karakter)."
      )
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      toast.success(
        "Permintaan Anda diterima! Kami akan kirim draft dalam 24 jam."
      )
      setValue("")
      setIsLoading(false)
    }, 1200)
  }

  return (
    <div className="flex flex-col gap-5 text-left">
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/30 via-chart-2/15 to-chart-3/30 opacity-50 blur-xl"
        />
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-primary/5">
          <Textarea
            placeholder="Ceritakan website seperti apa yang ingin Anda buat. Misal: toko online untuk brand fashion lokal saya yang fokus pada batik modern..."
            rows={5}
            maxLength={500}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="min-h-[140px] resize-none border-0 bg-transparent px-5 py-4 text-base shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            disabled={isLoading}
          />
          <div className="flex items-center justify-between gap-3 border-t border-border/60 bg-muted/30 px-4 py-3">
            <span className="text-xs text-muted-foreground">
              {value.length}/500
            </span>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              size="lg"
              className="h-11 px-5"
            >
              {isLoading ? (
                <>
                  <Loader aria-hidden className="size-4 animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <Sparkles aria-hidden className="size-4" />
                  Buatkan Sekarang
                  <ArrowRight aria-hidden className="size-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
          Coba contoh:
        </p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTION_CHIPS.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => handleChipClick(chip.expanded)}
              disabled={isLoading}
              className="rounded-full border border-border bg-background/60 px-3.5 py-1.5 text-xs font-medium text-foreground/80 transition hover:border-primary/40 hover:text-foreground disabled:opacity-50"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Pratinjau gratis. Tanpa kartu kredit.
      </p>
    </div>
  )
}
