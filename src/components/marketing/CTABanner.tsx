import { cn } from "@/lib/utils"
import { NeonButton } from "@/components/brand/NeonButton"
import { ArrowRight, Sparkles } from "lucide-react"

interface CTABannerProps {
  title?: string
  description?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  className?: string
}

export function CTABanner({
  title = "¿Listo para dejar de perder tiempo?",
  description = "Tu competencia ya está usando inteligencia artificial para facturar más rápido. Inicia hoy mismo y garantiza tu ventaja estratégica.",
  primaryCta = { label: "Ingresar a la academia", href: "/academia/cursos" },
  secondaryCta = { label: "Conversar por WhatsApp", href: "/contacto" },
  className,
}: CTABannerProps) {
  return (
    <section className={cn("px-4", className)}>
      <div className="container max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-[2rem] border border-[rgba(0,229,255,0.3)] bg-[var(--bg-surface)] p-12 sm:p-20 text-center shadow-[0_0_50px_rgba(0,255,255,0.1)] group">

          {/* Animated Glow bg */}
          <div className="absolute inset-0 bg-radial-cyan opacity-40 group-hover:opacity-80 transition-opacity duration-1000 pointer-events-none mix-blend-screen" />

          {/* Rotating borders abstract */}
          <div className="absolute -inset-[100%] animate-spin-slow opacity-[0.15] pointer-events-none"
            style={{ background: 'conic-gradient(from 90deg at 50% 50%, transparent 50%, var(--neon-cyan) 100%, transparent)' }} />

          <div className="relative z-10 flex flex-col items-center gap-8">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--neon-cyan-dim)] text-[var(--neon-cyan)] font-semibold shadow-inner">
              <Sparkles className="size-4 animate-pulse" />
              <span>Acceso inmediato 24/7</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[var(--neon-cyan)] tracking-tight max-w-2xl leading-tight">
              {title}
            </h2>

            <p className="text-[1.1rem] sm:text-xl text-[var(--text-secondary)] font-medium max-w-2xl">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto mt-4">
              <NeonButton href={primaryCta.href} variant="neon" size="lg" className="w-full sm:w-auto text-[1.05rem] py-6 shadow-[0_0_20px_rgba(0,255,255,0.4)] group-hover:scale-105 transition-all">
                {primaryCta.label}
                <ArrowRight className="size-5 ml-2" />
              </NeonButton>
              <NeonButton href={secondaryCta.href} variant="outline" size="lg" className="w-full sm:w-auto text-[1.05rem] py-6 backdrop-blur-md">
                {secondaryCta.label}
              </NeonButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
