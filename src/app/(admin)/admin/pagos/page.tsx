import { db } from "@/db"
import { purchases } from "@/db/schema"
import { desc } from "drizzle-orm"
import { NeonCard } from "@/components/brand/NeonCard"
import { NeonBadge } from "@/components/brand/NeonBadge"
import { formatPriceClp } from "@/lib/utils"

export const metadata = { title: "Admin — Pagos" }

const statusMap: Record<string, { label: string; variant: "cyan" | "amber" | "neutral" | "magenta" }> = {
  paid: { label: "Pagado", variant: "cyan" },
  pending: { label: "Pendiente", variant: "amber" },
  failed: { label: "Fallido", variant: "neutral" },
  refunded: { label: "Reembolsado", variant: "magenta" },
}

export default async function AdminPagosPage() {
  const allPurchases = await db
    .select()
    .from(purchases)
    .orderBy(desc(purchases.createdAt))
    .limit(200)

  const totalPaid = allPurchases
    .filter((p) => p.status === "paid")
    .reduce((acc, p) => acc + p.amount, 0)

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Pagos</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            {allPurchases.length} transacciones · {formatPriceClp(totalPaid)} total cobrado
          </p>
        </div>
      </div>

      <NeonCard glow="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-subtle)]">
                <th className="text-left p-4 text-xs text-[var(--text-muted)] font-medium">ID</th>
                <th className="text-left p-4 text-xs text-[var(--text-muted)] font-medium">Usuario</th>
                <th className="text-left p-4 text-xs text-[var(--text-muted)] font-medium">Descripción</th>
                <th className="text-left p-4 text-xs text-[var(--text-muted)] font-medium">Monto</th>
                <th className="text-left p-4 text-xs text-[var(--text-muted)] font-medium">Proveedor</th>
                <th className="text-left p-4 text-xs text-[var(--text-muted)] font-medium">Estado</th>
                <th className="text-left p-4 text-xs text-[var(--text-muted)] font-medium">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {allPurchases.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-[var(--text-muted)]">
                    Sin transacciones.
                  </td>
                </tr>
              ) : (
                allPurchases.map((p) => {
                  const s = statusMap[p.status] ?? { label: p.status, variant: "neutral" as const }
                  return (
                    <tr
                      key={p.id}
                      className="border-b border-[var(--border-subtle)] last:border-0 hover:bg-[var(--bg-overlay)] transition-colors"
                    >
                      <td className="p-4 font-mono text-xs text-[var(--text-muted)]">
                        {p.id.slice(0, 8)}…
                      </td>
                      <td className="p-4 text-xs text-[var(--text-muted)] font-mono">
                        {p.userId.slice(0, 8)}…
                      </td>
                      <td className="p-4 text-[var(--text-secondary)]">
                        {p.description ?? "—"}
                      </td>
                      <td className="p-4 font-semibold text-[var(--text-primary)]">
                        {formatPriceClp(p.amount)}
                      </td>
                      <td className="p-4 text-[var(--text-muted)] capitalize">{p.provider}</td>
                      <td className="p-4">
                        <NeonBadge variant={s.variant}>{s.label}</NeonBadge>
                      </td>
                      <td className="p-4 text-xs text-[var(--text-muted)]">
                        {new Date(p.createdAt!).toLocaleDateString("es-CL")}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </NeonCard>
    </div>
  )
}
