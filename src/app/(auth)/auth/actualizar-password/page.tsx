"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@supabase/ssr"
import { NeonCard } from "@/components/brand/NeonCard"
import { NeonButton } from "@/components/brand/NeonButton"
import { NeonBadge } from "@/components/brand/NeonBadge"
import { Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react"

export default function ActualizarPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    // Verify we have an active session from the reset link
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace("/auth/recuperar")
      }
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const requirements = [
    { label: "Mínimo 8 caracteres", met: password.length >= 8 },
    { label: "Al menos una mayúscula", met: /[A-Z]/.test(password) },
    { label: "Al menos un número", met: /[0-9]/.test(password) },
  ]

  const allMet = requirements.every((r) => r.met)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!allMet) {
      setError("La contraseña no cumple los requisitos mínimos.")
      return
    }

    if (password !== confirm) {
      setError("Las contraseñas no coinciden.")
      return
    }

    setLoading(true)

    const { error: updateError } = await supabase.auth.updateUser({ password })

    if (updateError) {
      setError(updateError.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setTimeout(() => {
      router.push("/app")
    }, 2500)
  }

  if (success) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-sm w-full text-center space-y-6">
          <NeonCard glow="cyan" className="p-10 space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[var(--neon-cyan)] opacity-10 blur-xl scale-150" />
                <CheckCircle2 className="relative size-16 text-[var(--neon-cyan)]" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                ¡Contraseña actualizada!
              </h1>
              <p className="text-sm text-[var(--text-secondary)]">
                Redirigiendo a tu cuenta...
              </p>
            </div>
          </NeonCard>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-sm w-full space-y-6">
        <div className="text-center space-y-2">
          <NeonBadge variant="cyan">Nueva contraseña</NeonBadge>
          <h1 className="font-display text-3xl font-bold text-[var(--text-primary)]">
            Actualiza tu contraseña
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Elige una contraseña segura para tu cuenta.
          </p>
        </div>

        <NeonCard glow="none" className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nueva contraseña */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[var(--text-secondary)] block">
                Nueva contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[var(--text-muted)]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-[var(--radius-md)] pl-10 pr-10 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--neon-cyan)] transition-colors"
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>

              {/* Requirements */}
              {password.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {requirements.map((req) => (
                    <li
                      key={req.label}
                      className={`flex items-center gap-2 text-xs transition-colors ${
                        req.met ? "text-[var(--neon-cyan)]" : "text-[var(--text-muted)]"
                      }`}
                    >
                      <CheckCircle2 className="size-3 shrink-0" />
                      {req.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Confirmar contraseña */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[var(--text-secondary)] block">
                Confirmar contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[var(--text-muted)]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  className={`w-full bg-[var(--bg-elevated)] border rounded-[var(--radius-md)] pl-10 pr-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-colors ${
                    confirm && confirm !== password
                      ? "border-red-500/50 focus:border-red-500"
                      : "border-[var(--border-default)] focus:border-[var(--neon-cyan)]"
                  }`}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
              </div>
              {confirm && confirm !== password && (
                <p className="text-xs text-red-400">Las contraseñas no coinciden</p>
              )}
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-[var(--radius-md)] px-4 py-3">
                {error}
              </p>
            )}

            <NeonButton
              type="submit"
              variant="neon"
              className="w-full"
              disabled={loading || !allMet || password !== confirm}
            >
              {loading ? "Actualizando..." : "Actualizar contraseña"}
            </NeonButton>
          </form>
        </NeonCard>
      </div>
    </section>
  )
}
