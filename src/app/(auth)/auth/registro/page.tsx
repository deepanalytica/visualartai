"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { NeonCard } from "@/components/brand/NeonCard"
import { NeonButton } from "@/components/brand/NeonButton"
import { NeonBadge } from "@/components/brand/NeonBadge"
import { createClient } from "@/lib/supabase/client"
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react"

export default function RegistroPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.")
      setLoading(false)
      return
    }

    const { error: authError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { full_name: fullName.trim() },
      },
    })

    if (authError) {
      if (authError.message.includes("already registered")) {
        setError("Este email ya está registrado. ¿Quieres iniciar sesión?")
      } else {
        setError("Error al crear la cuenta. Intenta de nuevo.")
      }
      setLoading(false)
      return
    }

    // Sign in directly after registration
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (signInError) {
      setSuccess(true) // Show "check email" message
      setLoading(false)
      return
    }

    router.push("/app")
    router.refresh()
  }

  if (success) {
    return (
      <div className="w-full max-w-md text-center">
        <NeonCard glow="cyan" className="p-10">
          <CheckCircle2 className="size-14 text-[var(--neon-cyan)] mx-auto mb-6" />
          <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-3">
            ¡Cuenta creada!
          </h2>
          <p className="text-[var(--text-secondary)] text-sm mb-6">
            Revisa tu email para confirmar tu cuenta. Luego puedes iniciar sesión.
          </p>
          <NeonButton href="/auth/login" variant="neon" className="w-full">
            Ir a iniciar sesión
          </NeonButton>
        </NeonCard>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <NeonBadge variant="magenta" className="mb-4">
          Crear cuenta
        </NeonBadge>
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-2">
          Empieza a aprender con IA
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          ¿Ya tienes cuenta?{" "}
          <Link href="/auth/login" className="text-[var(--neon-cyan)] hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </div>

      <NeonCard glow="magenta" className="p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-[var(--radius-md)] bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              <AlertCircle className="size-4 shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
              Nombre completo
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Tu nombre"
              required
              autoComplete="name"
              className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--neon-magenta)] transition-colors text-sm"
            />
          </div>

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
              className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--neon-magenta)] transition-colors text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 8 caracteres"
                required
                autoComplete="new-password"
                className="w-full px-4 py-3 pr-11 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--neon-magenta)] transition-colors text-sm"
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
            {loading ? "Creando cuenta..." : "Crear cuenta gratis"}
          </NeonButton>
        </form>
      </NeonCard>

      <p className="text-xs text-center text-[var(--text-muted)] mt-6">
        Al registrarte aceptas nuestros{" "}
        <Link href="/legal" className="hover:text-[var(--neon-cyan)] transition-colors">
          Términos y Privacidad
        </Link>
      </p>
    </div>
  )
}
