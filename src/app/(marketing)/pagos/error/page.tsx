import Link from "next/link"
import { XCircle, RotateCcw, MessageCircle } from "lucide-react"
import { NeonCard } from "@/components/brand/NeonCard"
import { NeonButton } from "@/components/brand/NeonButton"
import { NeonBadge } from "@/components/brand/NeonBadge"

export const metadata = {
  title: "Error en el pago — Visual Art AI",
  robots: { index: false, follow: false },
}

const reasonMessages: Record<string, string> = {
  cancelado: "Cancelaste el proceso de pago. Puedes intentarlo cuando quieras.",
  rechazado:
    "Tu banco rechazó la transacción. Verifica el saldo o usa otra tarjeta.",
  error_transbank: "Ocurrió un error con el procesador de pagos. Intenta de nuevo.",
  commit_failed: "No pudimos confirmar el pago con Transbank. Intenta de nuevo.",
  purchase_not_found: "No encontramos tu orden de compra. Contáctanos si ya se cobró.",
  token_missing: "El pago fue interrumpido. Por favor intenta de nuevo.",
  error_interno: "Error interno. Nuestro equipo ya fue notificado.",
}

interface Props {
  searchParams: Promise<{ reason?: string; courseSlug?: string }>
}

export default async function PagoErrorPage({ searchParams }: Props) {
  const params = await searchParams
  const reason = params.reason ?? "error_interno"
  const courseSlug = params.courseSlug
  const message = reasonMessages[reason] ?? "Ocurrió un error durante el pago."

  const canRetry = !["purchase_not_found", "error_interno"].includes(reason)

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <NeonBadge variant="neutral">Pago no completado</NeonBadge>

        <NeonCard glow="none" className="p-10 space-y-8 border-red-500/20">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-red-500 opacity-10 blur-xl scale-150" />
              <XCircle className="relative size-20 text-red-400" />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-3">
            <h1 className="font-display text-3xl font-bold text-[var(--text-primary)]">
              Pago no completado
            </h1>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              {message}
            </p>
          </div>

          {/* CTAs */}
          <div className="space-y-3">
            {canRetry && courseSlug && (
              <NeonButton
                href={`/academia/cursos/${courseSlug}`}
                variant="neon"
                className="w-full"
              >
                <span className="flex items-center justify-center gap-2">
                  <RotateCcw className="size-4" />
                  Intentar de nuevo
                </span>
              </NeonButton>
            )}
            {canRetry && !courseSlug && (
              <NeonButton href="/academia/cursos" variant="neon" className="w-full">
                <span className="flex items-center justify-center gap-2">
                  <RotateCcw className="size-4" />
                  Ver cursos
                </span>
              </NeonButton>
            )}
            <NeonButton href="/contacto" variant="ghost" className="w-full">
              <span className="flex items-center justify-center gap-2">
                <MessageCircle className="size-4" />
                Contactar soporte
              </span>
            </NeonButton>
          </div>
        </NeonCard>

        <p className="text-xs text-[var(--text-muted)]">
          Si ya se realizó un cobro,{" "}
          <Link href="/contacto" className="text-[var(--neon-cyan)] hover:underline">
            contáctanos
          </Link>{" "}
          con tu comprobante y lo solucionamos.
        </p>
      </div>
    </section>
  )
}
