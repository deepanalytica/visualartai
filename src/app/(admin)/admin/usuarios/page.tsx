import { createClient } from "@/lib/supabase/server"
import { db } from "@/db"
import { enrollments } from "@/db/schema"
import { count } from "drizzle-orm"
import { NeonCard } from "@/components/brand/NeonCard"
import { NeonBadge } from "@/components/brand/NeonBadge"

export const metadata = { title: "Admin — Usuarios" }

export default async function AdminUsuariosPage() {
  const supabase = await createClient()

  // Get all profiles via Supabase (includes auth.users join)
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, email, role, created_at")
    .order("created_at", { ascending: false })
    .limit(100)

  // Get enrollment count per user
  const enrollCounts = await db
    .select({ userId: enrollments.userId, count: count() })
    .from(enrollments)
    .groupBy(enrollments.userId)

  const enrollMap = Object.fromEntries(enrollCounts.map((e) => [e.userId, Number(e.count)]))

  const roleVariant: Record<string, "cyan" | "magenta" | "neutral" | "violet"> = {
    admin: "magenta",
    mentor: "violet",
    student: "neutral",
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Usuarios</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">{profiles?.length ?? 0} usuarios registrados</p>
      </div>

      <NeonCard glow="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-subtle)]">
                <th className="text-left p-4 text-xs text-[var(--text-muted)] font-medium">Usuario</th>
                <th className="text-left p-4 text-xs text-[var(--text-muted)] font-medium">Rol</th>
                <th className="text-left p-4 text-xs text-[var(--text-muted)] font-medium">Cursos</th>
                <th className="text-left p-4 text-xs text-[var(--text-muted)] font-medium">Registro</th>
              </tr>
            </thead>
            <tbody>
              {!profiles || profiles.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-[var(--text-muted)]">
                    No hay usuarios.
                  </td>
                </tr>
              ) : (
                profiles.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-[var(--border-subtle)] last:border-0 hover:bg-[var(--bg-overlay)] transition-colors"
                  >
                    <td className="p-4">
                      <p className="font-medium text-[var(--text-primary)]">{p.full_name ?? "—"}</p>
                      <p className="text-xs text-[var(--text-muted)]">{p.email}</p>
                    </td>
                    <td className="p-4">
                      <NeonBadge variant={roleVariant[p.role ?? "student"] ?? "neutral"}>
                        {p.role ?? "student"}
                      </NeonBadge>
                    </td>
                    <td className="p-4 text-[var(--text-secondary)]">
                      {enrollMap[p.id] ?? 0}
                    </td>
                    <td className="p-4 text-[var(--text-muted)] text-xs">
                      {p.created_at
                        ? new Date(p.created_at).toLocaleDateString("es-CL")
                        : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </NeonCard>
    </div>
  )
}
