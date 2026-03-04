import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { db } from "@/db"
import { enrollments, courses, progress, lessons, modules } from "@/db/schema"
import { eq, and, inArray } from "drizzle-orm"
import { NeonCard } from "@/components/brand/NeonCard"
import { NeonBadge } from "@/components/brand/NeonBadge"
import { NeonButton } from "@/components/brand/NeonButton"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  ArrowRight,
  Zap,
  Clock,
  TrendingUp,
} from "lucide-react"

export const metadata = { title: "Dashboard — Mi Academia" }

export default async function AppDashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  // Fetch enrollments with course info
  // Note: enrollments uses `grantedAt` (not enrolledAt)
  const userEnrollments = await db
    .select({
      enrollmentId: enrollments.id,
      grantedAt: enrollments.grantedAt,
      courseId: courses.id,
      courseTitle: courses.title,
      courseSlug: courses.slug,
      courseRoute: courses.route,
      totalLessons: courses.totalLessons,
    })
    .from(enrollments)
    .innerJoin(courses, eq(enrollments.courseId, courses.id))
    .where(and(eq(enrollments.userId, user.id), eq(enrollments.status, "active")))

  // Calculate completed lessons per course.
  // progress has no `completed` boolean — row existing = completed.
  // lessons have no courseId — must join via modules.
  const courseIds = userEnrollments.map((e) => e.courseId)
  const completedMap: Record<string, number> = {}

  if (courseIds.length > 0) {
    const courseModules = await db
      .select({ id: modules.id, courseId: modules.courseId })
      .from(modules)
      .where(inArray(modules.courseId, courseIds))

    const moduleIds = courseModules.map((m) => m.id)
    const moduleCourseMap = Object.fromEntries(courseModules.map((m) => [m.id, m.courseId]))

    if (moduleIds.length > 0) {
      const completedRows = await db
        .select({ moduleId: lessons.moduleId })
        .from(progress)
        .innerJoin(lessons, eq(progress.lessonId, lessons.id))
        .where(and(eq(progress.userId, user.id), inArray(lessons.moduleId, moduleIds)))

      for (const row of completedRows) {
        const cId = moduleCourseMap[row.moduleId]
        if (cId) completedMap[cId] = (completedMap[cId] ?? 0) + 1
      }
    }
  }

  const profile = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single()

  const firstName = profile.data?.full_name?.split(" ")[0] ?? "alumno"

  const totalProgress = userEnrollments.reduce((acc, e) => {
    const completed = completedMap[e.courseId] ?? 0
    const total = e.totalLessons ?? 1
    return acc + (completed / total) * 100
  }, 0)

  const avgProgress =
    userEnrollments.length > 0 ? Math.round(totalProgress / userEnrollments.length) : 0

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">
          Hola, {firstName} 👋
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Aquí tienes un resumen de tu progreso.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <NeonCard glow="cyan" className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="size-5 text-[var(--neon-cyan)]" />
            <span className="text-xs text-[var(--text-muted)]">Cursos activos</span>
          </div>
          <p className="font-display text-3xl font-bold text-[var(--text-primary)]">
            {userEnrollments.length}
          </p>
        </NeonCard>
        <NeonCard glow="magenta" className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="size-5 text-[var(--neon-magenta)]" />
            <span className="text-xs text-[var(--text-muted)]">Progreso promedio</span>
          </div>
          <p className="font-display text-3xl font-bold text-[var(--text-primary)]">
            {avgProgress}%
          </p>
        </NeonCard>
        <NeonCard glow="violet" className="p-5 col-span-2 md:col-span-1">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="size-5 text-[var(--neon-violet)]" />
            <span className="text-xs text-[var(--text-muted)]">Lecciones completadas</span>
          </div>
          <p className="font-display text-3xl font-bold text-[var(--text-primary)]">
            {Object.values(completedMap).reduce((a, b) => a + b, 0)}
          </p>
        </NeonCard>
      </div>

      {/* Cursos en progreso */}
      {userEnrollments.length > 0 ? (
        <div>
          <h2 className="font-display text-lg font-bold text-[var(--text-primary)] mb-4">
            Continúa aprendiendo
          </h2>
          <div className="flex flex-col gap-4">
            {userEnrollments.map((e) => {
              const completed = completedMap[e.courseId] ?? 0
              const total = e.totalLessons ?? 1
              const pct = Math.round((completed / total) * 100)
              return (
                <NeonCard key={e.enrollmentId} glow="none" hoverable className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <NeonBadge variant="cyan">{e.courseRoute}</NeonBadge>
                      </div>
                      <h3 className="font-semibold text-[var(--text-primary)] mb-3 truncate">
                        {e.courseTitle}
                      </h3>
                      <div className="flex items-center gap-3 mb-3">
                        <Progress value={pct} className="flex-1 h-1.5" />
                        <span className="text-xs text-[var(--text-muted)] shrink-0">
                          {pct}%
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-muted)]">
                        {completed} / {total} lecciones completadas
                      </p>
                    </div>
                    <NeonButton
                      href={`/app/cursos/${e.courseSlug}`}
                      variant="ghost-neon"
                      size="sm"
                      className="shrink-0"
                    >
                      {pct === 0 ? "Empezar" : "Continuar"}{" "}
                      <ArrowRight className="size-3.5" />
                    </NeonButton>
                  </div>
                </NeonCard>
              )
            })}
          </div>
        </div>
      ) : (
        <NeonCard glow="cyan" className="p-10 text-center">
          <BookOpen className="size-12 text-[var(--text-muted)] mx-auto mb-4" />
          <h3 className="font-display text-lg font-bold text-[var(--text-primary)] mb-2">
            Aún no tienes cursos
          </h3>
          <p className="text-sm text-[var(--text-muted)] mb-6">
            Explora nuestro catálogo y empieza tu primer curso.
          </p>
          <NeonButton href="/academia/cursos" variant="neon">
            Ver cursos <ArrowRight className="size-4" />
          </NeonButton>
        </NeonCard>
      )}

      {/* Quick links */}
      <div>
        <h2 className="font-display text-lg font-bold text-[var(--text-primary)] mb-4">
          Acceso rápido
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <Link
            href="/app/recursos"
            className="flex items-center gap-3 p-4 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-accent)] transition-colors group"
          >
            <Clock className="size-5 text-[var(--text-muted)] group-hover:text-[var(--neon-cyan)] transition-colors" />
            <span className="text-sm text-[var(--text-secondary)]">Mis recursos</span>
          </Link>
          <Link
            href="/academia/cursos"
            className="flex items-center gap-3 p-4 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-accent)] transition-colors group"
          >
            <BookOpen className="size-5 text-[var(--text-muted)] group-hover:text-[var(--neon-cyan)] transition-colors" />
            <span className="text-sm text-[var(--text-secondary)]">Catálogo de cursos</span>
          </Link>
          <Link
            href="/app/cuenta"
            className="flex items-center gap-3 p-4 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-accent)] transition-colors group"
          >
            <Zap className="size-5 text-[var(--text-muted)] group-hover:text-[var(--neon-cyan)] transition-colors" />
            <span className="text-sm text-[var(--text-secondary)]">Mi cuenta</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
