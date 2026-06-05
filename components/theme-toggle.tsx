"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Ubah mode tema" disabled>
        <Sun aria-hidden className="size-4" />
      </Button>
    )
  }

  const Icon = theme === "dark" ? Sun : Moon

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Ubah mode tema"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Icon aria-hidden className="size-4" />
    </Button>
  )
}
