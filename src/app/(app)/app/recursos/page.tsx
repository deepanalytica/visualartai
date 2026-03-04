import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { db } from "@/db"
import { resources, enrollments } from "@/db/schema"
import { eq, and } from "drizzle-orm"
import { NeonCard } from "@/components/brand/NeonCard"
import { NeonBadge } from "@/components/brand/NeonBadge"
import { NeonButton } from "@/components/brand/NeonButton"
import { Download, FileText, CheckSquare, MessageSquare, BookMarked } from "lucide-react"

export const metadata = { title: "Recursos" }

const tipoIcono: Record<string, React.ReactNode> = {
  checklist: <CheckSquare className="size-5 text-[var(--neon-cyan)]" />,
  prompt: <MessageSquare className="size-5 text-[var(--neon-magenta)]" />,
  template: <FileText className="size-5 text-[var(--neon-violet)]" />,
  guide: <BookMarked className="size-5 text-[var(--neon-amber)]" />,
}

const tipoBadge: Record<string, "cyan" | "magenta" | "violet" | "amber"> = {
  checklist: "cyan",
  prompt: "magenta",
  template: "violet",
  guide: "amber",
}

export default async function RecursosAppPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  // Fetch resources — wrapped in try/catch so a bad DB connection degrades gracefully
  type ResourceRow = typeof resources.$inferSelect
  let allAccessible: ResourceRow[] = []

  try {
    // Get published free resources (always accessible)
    const freeResources = await db
      .select()
      .from(resources)
      .where(and(eq(resources.isFree, true), eq(resources.status, "published")))

    // Check if user has any active enrollment → unlock paid resources
    const [activeEnrollment] = await db
      .select({ id: enrollments.id })
      .from(enrollments)
      .where(and(eq(enrollments.userId, user.id), eq(enrollments.status, "active")))
      .limit(1)

    // Get published paid resources only if user has at least one active enrollment
    let paidResources: ResourceRow[] = []
    if (activeEnrollment) {
      paidResources = await db
        .select()
        .from(resources)
        .where(and(eq(resources.isFree, false), eq(resources.status, "published")))
    }

    allAccessible = [...freeResources, ...paidResources]
  } catch (err) {
    console.error("[Recursos] DB query failed:", err)
    // Continue with empty list
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">
          Mis Recursos
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          {allAccessible.length} recurso{allAccessible.length !== 1 ? "s" : ""} disponible
          {allAccessible.length !== 1 ? "s" : ""}
        </p>
      </div>

      {allAccessible.length === 0 ? (
        <NeonCard glow="violet" className="p-10 text-center">
          <FileText className="size-12 text-[var(--text-muted)] mx-auto mb-4" />
          <p className="text-[var(--text-secondary)]">
            Inscríbete en un curso para acceder a recursos premium.
          </p>
        </NeonCard>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {allAccessible.map((r) => (
            <NeonCard key={r.id} glow="none" hoverable className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="size-10 rounded-lg bg-[var(--bg-overlay)] flex items-center justify-center">
                  {tipoIcono[r.type] ?? <FileText className="size-5 text-[var(--text-muted)]" />}
                </div>
                <NeonBadge variant={tipoBadge[r.type] ?? "neutral"}>{r.type}</NeonBadge>
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] text-sm mb-2 leading-snug">
                {r.title}
              </h3>
              {r.description && (
                <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                  {r.description}
                </p>
              )}
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs text-[var(--text-muted)]">v{r.version}</span>
                {r.filePath ? (
                  <a
                    href={r.filePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="inline-flex items-center gap-1.5 text-xs text-[var(--neon-cyan)] border border-[var(--neon-cyan-dim)] hover:bg-[var(--neon-cyan-dim)] px-3 py-1.5 rounded-full transition-colors"
                  >
                    <Download className="size-3.5" />
                    Descargar
                  </a>
                ) : (
                  <span className="text-xs text-[var(--text-muted)]">Próximamente</span>
                )}
              </div>
            </NeonCard>
          ))}
        </div>
      )}
    </div>
  )
}
