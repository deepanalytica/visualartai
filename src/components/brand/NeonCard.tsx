"use client"

import { cn } from "@/lib/utils"
import type { ComponentPropsWithoutRef } from "react"

type GlowColor = "cyan" | "magenta" | "violet" | "none"

interface NeonCardProps extends ComponentPropsWithoutRef<"div"> {
  glow?: GlowColor
  glass?: boolean
  hoverable?: boolean
  children: React.ReactNode
}

const glowMap: Record<GlowColor, string> = {
  cyan: "hover:border-[rgba(0,229,255,0.5)] hover:shadow-[0_0_20px_rgba(0,229,255,0.2),0_0_60px_rgba(0,229,255,0.06)]",
  magenta:
    "hover:border-[rgba(224,64,251,0.5)] hover:shadow-[0_0_20px_rgba(224,64,251,0.2),0_0_60px_rgba(224,64,251,0.06)]",
  violet:
    "hover:border-[rgba(124,77,255,0.5)] hover:shadow-[0_0_20px_rgba(124,77,255,0.2),0_0_60px_rgba(124,77,255,0.06)]",
  none: "",
}

export function NeonCard({
  glow = "cyan",
  glass = true,
  hoverable = true,
  className,
  children,
  ...props
}: NeonCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-[var(--radius-lg)] border border-[var(--border-default)]",
        "shadow-[var(--glow-card)]",
        glass &&
          "bg-[var(--glass-bg)] backdrop-blur-[var(--glass-blur)]",
        !glass && "bg-[var(--bg-elevated)]",
        hoverable && [
          "transition-all duration-[var(--duration-normal)] cursor-default",
          glowMap[glow],
        ],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
