import { CircleCheck, TrendingUp, Zap, type LucideIcon } from "lucide-react";

export function HeroMockup() {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      className="relative rounded-2xl border bg-card shadow-2xl shadow-primary/10 overflow-hidden ring-1 ring-border/40"
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full bg-red-400/80" />
          <span className="size-3 rounded-full bg-yellow-400/80" />
          <span className="size-3 rounded-full bg-green-400/80" />
        </div>
        <div className="flex-1 mx-4">
          <div className="mx-auto max-w-[260px] rounded-md bg-background border px-3 py-1.5 text-[10px] text-muted-foreground text-center font-mono flex items-center justify-center gap-1.5">
            <span className="size-1.5 rounded-full bg-green-500" />
            WEVLRA.COM
          </div>
        </div>
        <div className="size-3" />
      </div>

      {/* Website preview body */}
      <div className="p-5 space-y-4 bg-gradient-to-b from-background to-muted/20">
        {/* Nav bar mock */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-5 rounded-md bg-primary/30" />
            <div className="h-2.5 w-16 rounded bg-foreground/15" />
          </div>
          <div className="flex gap-3">
            <div className="h-2 w-10 rounded bg-foreground/10" />
            <div className="h-2 w-10 rounded bg-foreground/10" />
            <div className="h-2 w-10 rounded bg-foreground/10" />
          </div>
          <div className="h-6 w-16 rounded-md bg-primary/80" />
        </div>

        {/* Hero block mock */}
        <div className="relative rounded-xl bg-gradient-to-br from-primary/15 via-primary/5 to-transparent p-6 space-y-3 overflow-hidden border border-border/40">
          <div className="absolute top-2 right-2 rounded-full bg-primary/20 px-2 py-0.5 text-[8px] font-semibold text-primary">
            PREMIUM
          </div>
          <div className="h-3 w-1/3 rounded bg-primary/30" />
          <div className="space-y-1.5 pt-1">
            <div className="h-4 w-4/5 rounded bg-foreground/15" />
            <div className="h-4 w-3/5 rounded bg-foreground/12" />
          </div>
          <div className="h-2 w-full rounded bg-muted-foreground/10" />
          <div className="h-2 w-2/3 rounded bg-muted-foreground/10" />
          <div className="flex gap-2 pt-2">
            <div className="h-7 w-24 rounded-md bg-primary shadow-sm" />
            <div className="h-7 w-20 rounded-md border border-border bg-background" />
          </div>
        </div>

        {/* Feature cards mock */}
        <div className="grid grid-cols-3 gap-2.5">
          {(
            [
              { Icon: Zap, accent: "bg-chart-3/15 text-chart-3" },
              { Icon: TrendingUp, accent: "bg-primary/15 text-primary" },
              { Icon: CircleCheck, accent: "bg-chart-2/15 text-chart-2" },
            ] as { Icon: LucideIcon; accent: string }[]
          ).map(({ Icon, accent }, i) => (
            <div
              key={i}
              className="rounded-lg border bg-background/80 p-3 space-y-2 backdrop-blur-sm"
            >
              <div
                className={`flex size-7 items-center justify-center rounded-md ${accent}`}
              >
                <Icon aria-hidden className="size-3.5" />
              </div>
              <div className="h-2 w-full rounded bg-foreground/12" />
              <div className="h-1.5 w-3/4 rounded bg-foreground/8" />
            </div>
          ))}
        </div>

        {/* Stats row mock */}
        <div className="grid grid-cols-4 gap-2 rounded-lg border bg-background/60 px-3 py-3">
          {[
            { label: "100+" },
            { label: "98%" },
            { label: "24/7" },
            { label: "5★" },
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-1">
              <div className="text-[10px] font-bold text-primary">
                {stat.label}
              </div>
              <div className="h-1 w-8 mx-auto rounded bg-foreground/8" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
