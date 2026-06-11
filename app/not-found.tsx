import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 p-6 text-center">
      <span className="text-8xl font-bold tracking-tight text-primary/20 sm:text-9xl">
        404
      </span>
      <div className="flex max-w-md flex-col gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Halaman tidak ditemukan
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau tidak
          pernah ada. Silakan kembali ke beranda.
        </p>
      </div>
      <Button asChild>
        <Link href="/">
          <ArrowLeft aria-hidden className="size-4" />
          Kembali ke Beranda
        </Link>
      </Button>
    </div>
  )
}
