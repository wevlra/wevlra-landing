import { cn } from "@/lib/utils"

type SectionProps = {
  id?: string
  className?: string
  containerClassName?: string
  size?: "sm" | "md" | "lg"
  bleed?: boolean
  ariaLabel?: string
  children: React.ReactNode
}

const sizeClasses: Record<NonNullable<SectionProps["size"]>, string> = {
  sm: "py-10 sm:py-12 md:py-16",
  md: "py-16 sm:py-20 md:py-24 lg:py-28",
  lg: "py-20 sm:py-24 md:py-28 lg:py-32",
}

export function Section({
  id,
  className,
  containerClassName,
  size = "md",
  bleed = false,
  ariaLabel,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn("relative", sizeClasses[size], className)}
    >
      {bleed ? (
        children
      ) : (
        <div
          className={cn(
            "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
            containerClassName
          )}
        >
          {children}
        </div>
      )}
    </section>
  )
}
type SectionHeaderProps = {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: "center" | "left"
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mx-auto flex max-w-3xl flex-col gap-4",
        align === "center"
          ? "items-center text-center"
          : "items-start text-left",
        className
      )}
    >
      {eyebrow ? (
        <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium tracking-wider text-primary uppercase">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  )
}
