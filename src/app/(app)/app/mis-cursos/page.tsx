import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { db } from "@/db"
import { enrollments, courses, progress, lessons, modules } from "@/db/schema"
import { eq, and, count, inArray } from "drizzle-orm"
import { NeonCard } from "@/components/brand/NeonCard"
import { NeonBadge } from "@/components/brand/NeonBadge"
import { NeonButton } from "@/components/brand/NeonButton"
import { Progress } from "@/components/ui/progress"
import { BookOpen, ArrowRight, ExternalLink } from "lucide-react"

export const metadata = { title: "Mis Cursos" }

export default async function MisCursosPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  // Get active enrollments with course data
  const userEnrollments = await db
    .select({
      enrollmentId: enrollments.id,
      grantedAt: enrollments.grantedAt,
      courseId: courses.id,
      courseTitle: courses.title,
      courseSlug: courses.slug,
      courseRoute: courses.route,
      courseLevel: courses.level,
      totalLessons: courses.totalLessons,
      durationMinutes: courses.durationMinutes,
    })
    .from(enrollments)
    .innerJoin(courses, eq(enrollments.courseId, courses.id))
    .where(and(eq(enrollments.userId, user.id), eq(enrollments.status, "active")))

  // Calculate progress per course:
  // progress table has no `completed` boolean — a row's existence = completed.
  // lessons don't have courseId — must go via modules.
  const courseIds = userEnrollments.map((e) => e.courseId)

  // Build courseId → completedCount map
  const completedMap: Record<string, number> = {}

  if (courseIds.length > 0) {
    // Get all modules for enrolled courses
    const courseModules = await db
      .select({ id: modules.id, courseId: modules.courseId })
      .from(modules)
      .where(inArray(modules.courseId, courseIds))

    const moduleIds = courseModules.map((m) => m.id)

    // Get all completed lesson IDs for this user (in these modules)
    const completedRows =
      moduleIds.length > 0
        ? await db
          .select({ lessonId: progress.lessonId, moduleId: lessons.moduleId })
          .from(progress)
          .innerJoin(lessons, eq(progress.lessonId, lessons.id))
          .where(
            and(
              eq(progress.userId, user.id),
              inArray(lessons.moduleId, moduleIds)
            )
          )
        : []

    // Build moduleId → courseId lookup
    const moduleCourseMap = Object.fromEntries(courseModules.map((m) => [m.id, m.courseId]))

    // Aggregate per course
    for (const row of completedRows) {
      const cId = moduleCourseMap[row.moduleId]
      if (cId) {
        completedMap[cId] = (completedMap[cId] ?? 0) + 1
      }
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Mis Cursos</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          {userEnrollments.length} curso{userEnrollments.length !== 1 ? "s" : ""} activo
          {userEnrollments.length !== 1 ? "s" : ""}
        </p>
      </div>

      {userEnrollments.length === 0 ? (
        <NeonCard glow="cyan" className="p-12 text-center">
          <BookOpen className="size-14 text-[var(--text-muted)] mx-auto mb-5" />
          <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-3">
            Todavía no tienes cursos
          </h3>
          <p className="text-[var(--text-secondary)] text-sm mb-8 max-w-xs mx-auto">
            Explora el catálogo y comienza tu primer curso. Pago único, acceso de por vida.
          </p>
          <NeonButton href="/academia/cursos" variant="neon">
            Ver catálogo <ArrowRight className="size-4" />
          </NeonButton>
        </NeonCard>
      ) : (
        <div className="flex flex-col gap-5">
          {userEnrollments.map((e) => {
            const completed = completedMap[e.courseId] ?? 0
            const total = e.totalLessons ?? 1
            const pct = total > 0 ? Math.round((completed / total) * 100) : 0
            const isFinished = pct === 100

            return (
              <NeonCard key={e.enrollmentId} glow={isFinished ? "violet" : "none"} className="p-7">
                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                  {/* Thumbnail placeholder */}
                  <div className="shrink-0 w-full sm:w-40 aspect-video rounded-[var(--radius-md)] bg-gradient-to-br from-[var(--bg-overlay)] to-[var(--bg-void)] flex items-center justify-center border border-[var(--border-subtle)]">
                    <BookOpen className="size-8 text-[var(--text-muted)]" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <NeonBadge variant="cyan">{e.courseRoute}</NeonBadge>
                      <NeonBadge variant="neutral">{e.courseLevel}</NeonBadge>
                      {isFinished && <NeonBadge variant="violet">✓ Completado</NeonBadge>}
                    </div>
                    <h3 className="font-semibold text-[var(--text-primary)] mb-3 line-clamp-2">
                      {e.courseTitle}
                    </h3>

                    <div className="flex items-center gap-3 mb-2">
                      <Progress value={pct} className="flex-1 h-1.5" />
                      <span className="text-xs text-[var(--text-muted)] shrink-0 w-10 text-right">
                        {pct}%
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)]">
                      {completed} / {e.totalLessons ?? "?"} lecciones · inscrito{" "}
                      {new Date(e.grantedAt).toLocaleDateString("es-CL")}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex sm:flex-col gap-2 shrink-0">
                    <NeonButton href={`/app/cursos/${e.courseSlug}`} variant="neon" size="sm">
                      {pct === 0 ? "Empezar" : isFinished ? "Revisar" : "Continuar"}
                      <ArrowRight className="size-3.5" />
                    </NeonButton>
                    <Link
                      href={`/academia/cursos/${e.courseSlug}`}
                      className="flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors justify-center"
                    >
                      <ExternalLink className="size-3" /> Ver detalles
                    </Link>
                  </div>
                </div>
              </NeonCard>
            )
          })}
        </div>
      )}

      {/* Discover */}
      <div className="border-t border-[var(--border-subtle)] pt-6 flex items-center justify-between">
        <p className="text-sm text-[var(--text-muted)]">¿Buscas más contenido?</p>
        <NeonButton href="/academia/cursos" variant="ghost-neon" size="sm">
          Ver catálogo completo <ArrowRight className="size-3.5" />
        </NeonButton>
      </div>
    </div>
  )
}
