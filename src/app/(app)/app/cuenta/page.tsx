import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { db } from "@/db"
import { purchases } from "@/db/schema"
import { eq, desc } from "drizzle-orm"
import { NeonCard } from "@/components/brand/NeonCard"
import { NeonBadge } from "@/components/brand/NeonBadge"
import { AccountForm } from "@/components/app/AccountForm"
import { User, ShoppingBag, Shield } from "lucide-react"
import { formatPriceClp } from "@/lib/utils"

export const metadata = { title: "Mi Cuenta" }

export default async function CuentaPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  const userPurchases = await db
    .select()
    .from(purchases)
    .where(eq(purchases.userId, user.id))
    .orderBy(desc(purchases.createdAt))
    .limit(10)

  const statusLabel: Record<string, { label: string; variant: "cyan" | "amber" | "neutral" }> = {
    paid: { label: "Pagado", variant: "cyan" },
    pending: { label: "Pendiente", variant: "amber" },
    failed: { label: "Fallido", variant: "neutral" },
    refunded: { label: "Reembolsado", variant: "neutral" },
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Mi Cuenta</h1>

      {/* Profile */}
      <NeonCard glow="none" className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <User className="size-5 text-[var(--neon-cyan)]" />
          <h2 className="font-semibold text-[var(--text-primary)]">Información personal</h2>
        </div>
        <AccountForm
          userId={user.id}
          initialData={{
            fullName: profile?.full_name ?? "",
            email: user.email ?? "",
          }}
        />
      </NeonCard>

      {/* Purchases */}
      <NeonCard glow="none" className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <ShoppingBag className="size-5 text-[var(--neon-magenta)]" />
          <h2 className="font-semibold text-[var(--text-primary)]">Historial de compras</h2>
        </div>

        {userPurchases.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)]">Aún no tienes compras registradas.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {userPurchases.map((p) => {
              const status = statusLabel[p.status] ?? { label: p.status, variant: "neutral" as const }
              return (
                <div
                  key={p.id}
                  className="flex items-center justify-between py-3 border-b border-[var(--border-subtle)] last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">
                      {p.description ?? `Compra #${p.id.slice(0, 8)}`}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      {new Date(p.createdAt!).toLocaleDateString("es-CL")} · {p.provider}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-[var(--text-primary)]">
                      {formatPriceClp(p.amount)}
                    </span>
                    <NeonBadge variant={status.variant}>{status.label}</NeonBadge>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </NeonCard>

      {/* Security */}
      <NeonCard glow="none" className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="size-5 text-[var(--neon-violet)]" />
          <h2 className="font-semibold text-[var(--text-primary)]">Seguridad</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[var(--text-secondary)]">Contraseña</p>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Actualiza tu contraseña regularmente
            </p>
          </div>
          <a
            href="/auth/recuperar"
            className="text-sm text-[var(--neon-cyan)] hover:underline underline-offset-4"
          >
            Cambiar contraseña
          </a>
        </div>
      </NeonCard>
    </div>
  )
}
