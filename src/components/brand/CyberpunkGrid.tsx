import { cn } from "@/lib/utils"

interface CyberpunkGridProps {
  className?: string
  radialColor?: "cyan" | "magenta" | "violet"
}

export function CyberpunkGrid({ className, radialColor = "cyan" }: CyberpunkGridProps) {
  const radialClass = {
    cyan: "bg-radial-cyan",
    magenta: "bg-radial-magenta",
    violet: "bg-radial-violet",
  }[radialColor]

  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      {/* Grid lines */}
      <div className="absolute inset-0 grid-lines opacity-60" />
      {/* Radial glow at top */}
      <div className={cn("absolute inset-0", radialClass)} />
      {/* Fade to void at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[var(--bg-void)] to-transparent" />
    </div>
  )
}
