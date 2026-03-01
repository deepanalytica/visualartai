"use client"

import type { Metadata } from "next"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { NeonCard } from "@/components/brand/NeonCard"
import { NeonButton } from "@/components/brand/NeonButton"
import { NeonBadge } from "@/components/brand/NeonBadge"
import { createClient } from "@/lib/supabase/client"
import { SITE_NAME } from "@/lib/constants"
import { Eye, EyeOff, AlertCircle } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (authError) {
      setError(
        authError.message === "Invalid login credentials"
          ? "Email o contraseña incorrectos."
          : "Error al iniciar sesión. Intenta de nuevo."
      )
      setLoading(false)
      return
    }

    router.push("/app")
    router.refresh()
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <NeonBadge variant="cyan" className="mb-4">
          Acceder
        </NeonBadge>
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-2">
          Bienvenido de vuelta
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          ¿No tienes cuenta?{" "}
          <Link
            href="/auth/registro"
            className="text-[var(--neon-cyan)] hover:underline"
          >
            Regístrate gratis
          </Link>
        </p>
      </div>

      <NeonCard glow="cyan" className="p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-[var(--radius-md)] bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              <AlertCircle className="size-4 shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              autoComplete="email"
              className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--neon-cyan)] transition-colors text-sm"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-[var(--text-secondary)]">
                Contraseña
              </label>
              <Link
                href="/auth/recuperar"
                className="text-xs text-[var(--text-muted)] hover:text-[var(--neon-cyan)] transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 pr-11 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--neon-cyan)] transition-colors text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <NeonButton
            type="submit"
            variant="neon"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </NeonButton>
        </form>
      </NeonCard>

      <p className="text-xs text-center text-[var(--text-muted)] mt-6">
        Al iniciar sesión aceptas nuestros{" "}
        <Link href="/legal" className="hover:text-[var(--neon-cyan)] transition-colors">
          Términos y Privacidad
        </Link>
      </p>
    </div>
  )
}
