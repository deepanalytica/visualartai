import { cn } from "@/lib/utils"

type BadgeColor = "cyan" | "magenta" | "violet" | "amber" | "neutral"

interface NeonBadgeProps {
  children: React.ReactNode
  variant?: BadgeColor
  className?: string
}

const colorMap: Record<BadgeColor, string> = {
  cyan: "bg-[var(--neon-cyan-dim)] text-[var(--neon-cyan)] border-[rgba(0,229,255,0.3)]",
  magenta:
    "bg-[var(--neon-magenta-dim)] text-[var(--neon-magenta)] border-[rgba(224,64,251,0.3)]",
  violet:
    "bg-[var(--neon-violet-dim)] text-[var(--neon-violet)] border-[rgba(124,77,255,0.3)]",
  amber: "bg-[rgba(255,215,64,0.15)] text-[var(--neon-amber)] border-[rgba(255,215,64,0.3)]",
  neutral: "bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-subtle)]",
}

export function NeonBadge({ children, variant = "cyan", className }: NeonBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5",
        "px-2.5 py-1 text-xs font-medium tracking-wide",
        "rounded-full border",
        colorMap[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
