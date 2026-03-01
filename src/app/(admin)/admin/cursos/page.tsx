import Link from "next/link"
import { db } from "@/db"
import { courses } from "@/db/schema"
import { desc } from "drizzle-orm"
import { NeonCard } from "@/components/brand/NeonCard"
import { NeonBadge } from "@/components/brand/NeonBadge"
import { NeonButton } from "@/components/brand/NeonButton"
import { Plus, Edit, Eye } from "lucide-react"

export const metadata = { title: "Admin — Cursos" }

export default async function AdminCursosPage() {
  const allCourses = await db.select().from(courses).orderBy(desc(courses.createdAt))

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Cursos</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">{allCourses.length} cursos</p>
        </div>
        <NeonButton href="/admin/cursos/nuevo" variant="neon" size="sm">
          <Plus className="size-4" />
          Nuevo curso
        </NeonButton>
      </div>

      <NeonCard glow="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-subtle)]">
                <th className="text-left p-4 text-xs text-[var(--text-muted)] font-medium">Título</th>
                <th className="text-left p-4 text-xs text-[var(--text-muted)] font-medium">Ruta</th>
                <th className="text-left p-4 text-xs text-[var(--text-muted)] font-medium">Estado</th>
                <th className="text-left p-4 text-xs text-[var(--text-muted)] font-medium">Lecciones</th>
                <th className="text-left p-4 text-xs text-[var(--text-muted)] font-medium">Precio</th>
                <th className="p-4" />
              </tr>
            </thead>
            <tbody>
              {allCourses.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[var(--text-muted)]">
                    No hay cursos. Crea el primero.
                  </td>
                </tr>
              )}
              {allCourses.map((c) => (
                <tr key={c.id} className="border-b border-[var(--border-subtle)] last:border-0 hover:bg-[var(--bg-overlay)] transition-colors">
                  <td className="p-4">
                    <p className="font-medium text-[var(--text-primary)] line-clamp-1">{c.title}</p>
                    <p className="text-xs text-[var(--text-muted)] font-mono">{c.slug}</p>
                  </td>
                  <td className="p-4">
                    <NeonBadge variant="cyan">{c.route}</NeonBadge>
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        c.status === "published"
                          ? "bg-[var(--neon-cyan-dim)] text-[var(--neon-cyan)]"
                          : c.status === "draft"
                            ? "bg-amber-500/10 text-amber-400"
                            : "bg-[var(--bg-overlay)] text-[var(--text-muted)]"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-[var(--text-secondary)]">{c.totalLessons ?? 0}</td>
                  <td className="p-4 text-[var(--text-primary)] font-medium">
                    {c.isFree ? "Gratis" : `$${c.priceClp?.toLocaleString("es-CL")} CLP`}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 justify-end">
                      <Link
                        href={`/academia/cursos/${c.slug}`}
                        className="p-1.5 rounded-[var(--radius-sm)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-overlay)] transition-colors"
                        title="Ver página pública"
                      >
                        <Eye className="size-4" />
                      </Link>
                      <Link
                        href={`/admin/cursos/${c.id}`}
                        className="p-1.5 rounded-[var(--radius-sm)] text-[var(--text-muted)] hover:text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan-dim)] transition-colors"
                        title="Editar"
                      >
                        <Edit className="size-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </NeonCard>
    </div>
  )
}
