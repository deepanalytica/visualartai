import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-[var(--text-muted)] selection:bg-[var(--neon-cyan-dim)] selection:text-[var(--neon-cyan)] dark:bg-input/30 border-input flex h-10 w-full min-w-0 rounded-md border bg-[var(--bg-elevated)] px-3 py-2 text-base text-[var(--text-primary)] shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "border-[var(--border-default)] focus:border-[var(--neon-cyan)] focus:ring-1 focus:ring-[var(--neon-cyan)] focus:shadow-[0_0_0_3px_rgba(0,229,255,0.1)]",
        "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
