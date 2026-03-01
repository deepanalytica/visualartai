"use client"

import { cn } from "@/lib/utils"
import type { ComponentPropsWithoutRef } from "react"

type ButtonVariant = "neon" | "ghost-neon" | "solid" | "outline"
type ButtonSize = "sm" | "md" | "lg"

interface NeonButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  children: React.ReactNode
}

const variantMap: Record<ButtonVariant, string> = {
  neon: cn(
    "bg-[var(--neon-cyan)] text-[var(--bg-void)] font-semibold",
    "hover:shadow-[0_0_24px_rgba(0,229,255,0.5)] hover:bg-[#1aebff]",
    "active:scale-[0.98]"
  ),
  "ghost-neon": cn(
    "bg-transparent text-[var(--neon-cyan)] border border-[var(--border-accent)]",
    "hover:bg-[var(--neon-cyan-dim)] hover:border-[var(--neon-cyan)]"
  ),
  solid: cn(
    "bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-default)]",
    "hover:bg-[var(--bg-overlay)] hover:border-[var(--border-accent)]"
  ),
  outline: cn(
    "bg-transparent text-[var(--text-primary)] border border-[var(--border-default)]",
    "hover:border-[var(--border-accent)] hover:text-[var(--neon-cyan)]"
  ),
}

const sizeMap: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-[var(--radius-sm)]",
  md: "px-6 py-3 text-base rounded-[var(--radius-md)]",
  lg: "px-8 py-4 text-lg rounded-[var(--radius-md)]",
}

export function NeonButton({
  variant = "neon",
  size = "md",
  href,
  className,
  children,
  ...props
}: NeonButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2",
    "font-medium tracking-wide",
    "transition-all duration-[var(--duration-fast)]",
    "disabled:opacity-50 disabled:pointer-events-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-void)]",
    variantMap[variant],
    sizeMap[size],
    className
  )

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
