import { Section, SectionHeader } from "@/components/section"
import { Check, Minus, X } from "lucide-react"
import { comparisonRows } from "@/lib/content/comparison"
import { cn } from "@/lib/utils"

type ColumnKey = "diy" | "agency" | "wevlra"

const COLUMNS: {
  key: ColumnKey
  label: string
  highlight: boolean
}[] = [
  { key: "diy", label: "DIY", highlight: false },
  { key: "agency", label: "Agensi", highlight: false },
  { key: "wevlra", label: "WEVLRA", highlight: true },
]

function StatusIcon({ col }: { col: ColumnKey }) {
  if (col === "wevlra") {
    return <Check className="size-4 text-primary" aria-label="Tersedia" />
  }
  if (col === "agency") {
    return (
      <Minus className="size-4 text-muted-foreground" aria-label="Sebagian" />
    )
  }
  return (
    <X
      className="size-4 text-muted-foreground/50"
      aria-label="Tidak tersedia"
    />
  )
}

export function Comparison() {
  return (
    <Section id="perbandingan" className="bg-muted/30">
      <SectionHeader
        eyebrow="Perbandingan"
        title={
          <>
            Kenapa <span className="text-gradient-brand">WEVLRA</span> lebih
            unggul
          </>
        }
        description="Bandingkan langsung dengan alternatif lain — kecepatan, biaya, dan dukungan yang membuat perbedaan."
        className="mb-12 sm:mb-14"
      />

      {/* Desktop / tablet — table layout */}
      <div className="mx-auto hidden max-w-7xl overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm md:block">
        <div className="grid grid-cols-[1.5fr_repeat(3,1fr)] border-b border-border/60 bg-muted/40">
          <div className="px-6 py-4 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Atribut
          </div>
          {COLUMNS.map((col) => (
            <div
              key={col.key}
              className={cn(
                "px-4 py-4 text-center text-sm font-semibold",
                col.highlight && "text-primary"
              )}
            >
              {col.label}
              {col.highlight ? (
                <span className="ml-2 inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase">
                  Pilihan
                </span>
              ) : null}
            </div>
          ))}
        </div>

        {comparisonRows.map((row, i) => (
          <div
            key={row.attribute}
            className={cn(
              "grid grid-cols-[1.5fr_repeat(3,1fr)] items-center transition-colors",
              i !== comparisonRows.length - 1 && "border-b border-border/40"
            )}
          >
            <div className="px-6 py-4 text-sm font-medium text-foreground">
              {row.attribute}
            </div>
            {COLUMNS.map((col) => (
              <div
                key={col.key}
                className={cn(
                  "flex flex-col items-center justify-center gap-1.5 px-4 py-4 text-center",
                  col.highlight && "bg-primary/5"
                )}
              >
                <StatusIcon col={col.key} />
                <span
                  className={cn(
                    "text-xs leading-tight",
                    col.highlight
                      ? "font-medium text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {row[col.key]}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Mobile — stacked cards per attribute */}
      <div className="mx-auto flex max-w-7xl flex-col gap-3 md:hidden">
        {comparisonRows.map((row) => (
          <div
            key={row.attribute}
            className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm"
          >
            <div className="border-b border-border/40 bg-muted/40 px-4 py-3">
              <h3 className="text-sm font-semibold text-foreground">
                {row.attribute}
              </h3>
            </div>
            <div className="divide-y divide-border/40">
              {COLUMNS.map((col) => (
                <div
                  key={col.key}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3",
                    col.highlight && "bg-primary/5"
                  )}
                >
                  <span
                    className={cn(
                      "shrink-0 text-xs font-semibold tracking-wider uppercase",
                      col.highlight ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {col.label}
                  </span>
                  <span className="ml-auto inline-flex items-center gap-2">
                    <StatusIcon col={col.key} />
                    <span
                      className={cn(
                        "text-sm",
                        col.highlight
                          ? "font-medium text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {row[col.key]}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
