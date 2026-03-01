"use client"

import { useState } from "react"
import { NeonButton } from "@/components/brand/NeonButton"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Save } from "lucide-react"

interface Props {
  userId: string
  initialData: { fullName: string; email: string }
}

export function AccountForm({ userId, initialData }: Props) {
  const [fullName, setFullName] = useState(initialData.fullName)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ full_name: fullName.trim(), updated_at: new Date().toISOString() })
        .eq("id", userId)

      if (error) throw error
      toast.success("Perfil actualizado correctamente")
    } catch {
      toast.error("No se pudo guardar. Intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-5">
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
          className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--neon-cyan)] transition-colors text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
          Email
        </label>
        <input
          type="email"
          value={initialData.email}
          disabled
          className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] border border-[var(--border-subtle)] text-[var(--text-muted)] text-sm cursor-not-allowed"
        />
        <p className="text-xs text-[var(--text-muted)] mt-1">
          El email no se puede cambiar desde aquí.
        </p>
      </div>

      <div className="flex justify-end">
        <NeonButton type="submit" variant="neon" size="sm" disabled={loading}>
          <Save className="size-4" />
          {loading ? "Guardando..." : "Guardar cambios"}
        </NeonButton>
      </div>
    </form>
  )
}
