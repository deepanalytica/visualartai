import { createClient } from "@/lib/supabase/server"
import { db } from "@/db"
import { courses, enrollments, purchases, profiles } from "@/db/schema"
import { eq, count, sum, gte } from "drizzle-orm"
import { NeonCard } from "@/components/brand/NeonCard"
import { BookOpen, Users, CreditCard, TrendingUp } from "lucide-react"
import { formatPriceClp } from "@/lib/utils"

export const metadata = { title: "Admin Dashboard" }

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const [
    [{ totalCourses }],
    [{ totalUsers }],
    [{ totalEnrollments }],
    revenueResult,
  ] = await Promise.all([
    db.select({ totalCourses: count() }).from(courses),
    db.select({ totalUsers: count() }).from(profiles),
    db.select({ totalEnrollments: count() }).from(enrollments),
    db.select({ total: sum(purchases.amount) }).from(purchases).where(eq(purchases.status, "paid")),
  ])

  const totalRevenue = Number(revenueResult[0]?.total ?? 0)

  // Recent purchases
  const recentPurchases = await db.query.purchases.findMany({
    orderBy: (p, { desc }) => [desc(p.createdAt)],
    limit: 8,
  })

  const stats = [
    {
      label: "Cursos publicados",
      value: totalCourses,
      icon: <BookOpen className="size-5 text-[var(--neon-cyan)]" />,
      glow: "cyan" as const,
    },
    {
      label: "Usuarios registrados",
      value: totalUsers,
      icon: <Users className="size-5 text-[var(--neon-magenta)]" />,
      glow: "magenta" as const,
    },
    {
      label: "Inscripciones activas",
      value: totalEnrollments,
      icon: <TrendingUp className="size-5 text-[var(--neon-violet)]" />,
      glow: "violet" as const,
    },
    {
      label: "Ingresos totales",
      value: formatPriceClp(totalRevenue),
      icon: <CreditCard className="size-5 text-[var(--neon-amber)]" />,
      glow: "none" as const,
    },
  ]

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Dashboard</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">Vista general de la plataforma.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <NeonCard key={s.label} glow={s.glow} className="p-5">
            <div className="flex items-center gap-2 mb-2">
              {s.icon}
              <span className="text-xs text-[var(--text-muted)]">{s.label}</span>
            </div>
            <p className="font-display text-2xl font-bold text-[var(--text-primary)]">{s.value}</p>
          </NeonCard>
        ))}
      </div>

      {/* Recent purchases */}
      <NeonCard glow="none" className="p-6">
        <h2 className="font-semibold text-[var(--text-primary)] mb-5">
          Últimas transacciones
        </h2>
        {recentPurchases.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)]">Sin transacciones aún.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border-subtle)]">
                  <th className="text-left py-3 text-xs text-[var(--text-muted)] font-medium">ID</th>
                  <th className="text-left py-3 text-xs text-[var(--text-muted)] font-medium">Descripción</th>
                  <th className="text-left py-3 text-xs text-[var(--text-muted)] font-medium">Monto</th>
                  <th className="text-left py-3 text-xs text-[var(--text-muted)] font-medium">Estado</th>
                  <th className="text-left py-3 text-xs text-[var(--text-muted)] font-medium">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {recentPurchases.map((p) => (
                  <tr key={p.id} className="border-b border-[var(--border-subtle)] last:border-0">
                    <td className="py-3 text-[var(--text-muted)] font-mono text-xs">
                      {p.id.slice(0, 8)}…
                    </td>
                    <td className="py-3 text-[var(--text-secondary)]">
                      {p.description ?? "—"}
                    </td>
                    <td className="py-3 text-[var(--text-primary)] font-medium">
                      {formatPriceClp(p.amount)}
                    </td>
                    <td className="py-3">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          p.status === "paid"
                            ? "bg-[var(--neon-cyan-dim)] text-[var(--neon-cyan)]"
                            : p.status === "pending"
                              ? "bg-amber-500/10 text-amber-400"
                              : "bg-[var(--bg-overlay)] text-[var(--text-muted)]"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 text-[var(--text-muted)] text-xs">
                      {new Date(p.createdAt!).toLocaleDateString("es-CL")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </NeonCard>
    </div>
  )
}
