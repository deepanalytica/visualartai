"use client"

import Link from "next/link"
import { useState } from "react"
import { NeonCard } from "@/components/brand/NeonCard"
import { NeonButton } from "@/components/brand/NeonButton"
import { NeonBadge } from "@/components/brand/NeonBadge"
import { createClient } from "@/lib/supabase/client"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function RecuperarPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [sent, setSent] = useState(false)
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/auth/actualizar-password`,
    })

    if (resetError) {
      setError("Error al enviar el email. Verifica la dirección e intenta de nuevo.")
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="w-full max-w-md text-center">
        <NeonCard glow="cyan" className="p-10">
          <CheckCircle2 className="size-14 text-[var(--neon-cyan)] mx-auto mb-6" />
          <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-3">
            Email enviado
          </h2>
          <p className="text-[var(--text-secondary)] text-sm mb-6">
            Revisa tu bandeja de entrada. El link expira en 1 hora.
          </p>
          <NeonButton href="/auth/login" variant="ghost-neon" className="w-full">
            Volver al login
          </NeonButton>
        </NeonCard>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <NeonBadge variant="violet" className="mb-4">
          Recuperar acceso
        </NeonBadge>
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-2">
          ¿Olvidaste tu contraseña?
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          Te enviamos un link para resetearla.
        </p>
      </div>

      <NeonCard glow="violet" className="p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-[var(--radius-md)] bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              <AlertCircle className="size-4 shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
              Email de tu cuenta
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              autoComplete="email"
              className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--neon-violet)] transition-colors text-sm"
            />
          </div>

          <NeonButton type="submit" variant="neon" className="w-full" disabled={loading}>
            {loading ? "Enviando..." : "Enviar link de recuperación"}
          </NeonButton>

          <Link
            href="/auth/login"
            className="text-sm text-center text-[var(--text-muted)] hover:text-[var(--neon-cyan)] transition-colors"
          >
            Volver al login
          </Link>
        </form>
      </NeonCard>
    </div>
  )
}
