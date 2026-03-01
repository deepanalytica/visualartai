"use client"

import { cn } from "@/lib/utils"

interface GlitchTextProps {
  text: string
  className?: string
  as?: "h1" | "h2" | "h3" | "span" | "p"
}

export function GlitchText({ text, className, as: Tag = "span" }: GlitchTextProps) {
  return (
    <Tag
      className={cn(
        "relative inline-block",
        "text-gradient-hero",
        className
      )}
      data-text={text}
      aria-label={text}
    >
      {text}
      <style jsx>{`
        @media (prefers-reduced-motion: no-preference) {
          [data-text]::before,
          [data-text]::after {
            content: attr(data-text);
            position: absolute;
            inset: 0;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          [data-text]::before {
            background: linear-gradient(135deg, var(--neon-cyan), #60efff);
            left: -1px;
            animation: glitch-before 6s steps(2) infinite;
            opacity: 0;
          }

          [data-text]::after {
            background: linear-gradient(135deg, var(--neon-magenta), #ff80fc);
            left: 1px;
            animation: glitch-after 6s steps(2) infinite;
            animation-delay: 3s;
            opacity: 0;
          }

          @keyframes glitch-before {
            0%,
            93%,
            100% {
              opacity: 0;
            }
            94% {
              opacity: 0.5;
              clip-path: inset(20% 0 60% 0);
            }
            95% {
              opacity: 0.5;
              clip-path: inset(60% 0 10% 0);
            }
            96%,
            99% {
              opacity: 0;
            }
          }

          @keyframes glitch-after {
            0%,
            93%,
            100% {
              opacity: 0;
            }
            94% {
              opacity: 0.4;
              clip-path: inset(40% 0 40% 0);
            }
            96% {
              opacity: 0;
            }
          }
        }
      `}</style>
    </Tag>
  )
}
