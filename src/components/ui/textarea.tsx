import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-[var(--border-default)] placeholder:text-[var(--text-muted)] flex min-h-[80px] w-full rounded-md border bg-[var(--bg-elevated)] px-3 py-2 text-base text-[var(--text-primary)] shadow-xs transition-[color,box-shadow] outline-none",
        "focus:border-[var(--neon-cyan)] focus:ring-1 focus:ring-[var(--neon-cyan)] focus:shadow-[0_0_0_3px_rgba(0,229,255,0.1)]",
        "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
