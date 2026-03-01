import { cn } from "@/lib/utils"

interface GlowDividerProps {
  color?: "cyan" | "magenta" | "violet"
  className?: string
}

const colorMap = {
  cyan: "bg-gradient-to-r from-transparent via-[var(--neon-cyan)] to-transparent",
  magenta: "bg-gradient-to-r from-transparent via-[var(--neon-magenta)] to-transparent",
  violet: "bg-gradient-to-r from-transparent via-[var(--neon-violet)] to-transparent",
}

export function GlowDivider({ color = "cyan", className }: GlowDividerProps) {
  return (
    <div
      className={cn("relative h-px w-full my-12", className)}
      aria-hidden="true"
    >
      <div className={cn("h-px w-full opacity-50", colorMap[color])} />
      <div
        className={cn(
          "absolute inset-0 blur-sm opacity-30",
          colorMap[color]
        )}
      />
    </div>
  )
}
