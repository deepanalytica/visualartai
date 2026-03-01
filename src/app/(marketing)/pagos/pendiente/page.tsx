import Link from "next/link"
import { Clock, RefreshCw, Mail } from "lucide-react"
import { NeonCard } from "@/components/brand/NeonCard"
import { NeonButton } from "@/components/brand/NeonButton"
import { NeonBadge } from "@/components/brand/NeonBadge"

export const metadata = {
  title: "Pago en proceso — Visual Art AI",
  robots: { index: false, follow: false },
}

interface Props {
  searchParams: Promise<{ courseSlug?: string }>
}

export default async function PagoPendientePage({ searchParams }: Props) {
  const params = await searchParams
  const courseSlug = params.courseSlug

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <NeonBadge variant="amber">En proceso</NeonBadge>

        <NeonCard glow="none" className="p-10 space-y-8 border-[var(--neon-amber)]/20">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[var(--neon-amber)] opacity-10 blur-xl scale-150" />
              <Clock className="relative size-20 text-[var(--neon-amber)]" />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-3">
            <h1 className="font-display text-3xl font-bold text-[var(--text-primary)]">
              Pago en procesamiento
            </h1>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              Tu pago fue recibido y está siendo procesado por el banco. Esto puede
              tomar entre 1 y 24 horas. Te notificaremos por email cuando se confirme.
            </p>
          </div>

          {/* What to expect */}
          <div className="text-left space-y-3 bg-[var(--bg-elevated)] rounded-[var(--radius-md)] p-4">
            <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
              ¿Qué pasa ahora?
            </p>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-[var(--neon-amber)] mt-0.5">1.</span>
                Tu banco procesa el pago (máx. 24 hs)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--neon-amber)] mt-0.5">2.</span>
                Recibirás un email de confirmación
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--neon-amber)] mt-0.5">3.</span>
                Tu acceso al curso se activa automáticamente
              </li>
            </ul>
          </div>

          {/* CTAs */}
          <div className="space-y-3">
            <NeonButton href="/app/mis-cursos" variant="ghost" className="w-full">
              <span className="flex items-center justify-center gap-2">
                <RefreshCw className="size-4" />
                Revisar mis cursos
              </span>
            </NeonButton>
            <NeonButton href="/contacto" variant="ghost" className="w-full">
              <span className="flex items-center justify-center gap-2">
                <Mail className="size-4" />
                Contactar soporte
              </span>
            </NeonButton>
          </div>
        </NeonCard>

        <p className="text-xs text-[var(--text-muted)]">
          ¿No recibiste el email después de 24 horas?{" "}
          <Link href="/contacto" className="text-[var(--neon-cyan)] hover:underline">
            Escríbenos
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
