import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { db } from "@/db"
import { courses, modules, lessons, enrollments } from "@/db/schema"
import { eq, count, inArray, asc } from "drizzle-orm"
import { NeonCard } from "@/components/brand/NeonCard"
import { NeonBadge } from "@/components/brand/NeonBadge"
import { BookOpen, Eye, Layers, Users, Clock } from "lucide-react"

export const metadata = { title: "Mentor — Mis cursos" }

export default async function MentorCursosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  // Get courses assigned to this instructor
  const myCourses = await db
    .select()
    .from(courses)
    .where(eq(courses.instructorId, user.id))
    .orderBy(asc(courses.sortOrder))

  const courseIds = myCourses.map((c) => c.id)

  // For each course: count modules, lessons, enrollments
  type CourseStats = { modules: number; lessons: number; students: number }
  const statsMap: Record<string, CourseStats> = {}

  if (courseIds.length > 0) {
    // Module counts per course
    const modRows = await db
      .select({ courseId: modules.courseId, cnt: count() })
      .from(modules)
      .where(inArray(modules.courseId, courseIds))
      .groupBy(modules.courseId)

    // Lesson counts via modules
    const allMods = await db
      .select({ id: modules.id, courseId: modules.courseId })
      .from(modules)
      .where(inArray(modules.courseId, courseIds))

    const modIds = allMods.map((m) => m.id)
    const lessonRows = modIds.length > 0
      ? await db
          .select({ moduleId: lessons.moduleId, cnt: count() })
          .from(lessons)
          .where(inArray(lessons.moduleId, modIds))
          .groupBy(lessons.moduleId)
      : []

    // Enrollment counts per course
    const enrollRows = await db
      .select({ courseId: enrollments.courseId, cnt: count() })
      .from(enrollments)
      .where(inArray(enrollments.courseId, courseIds))
      .groupBy(enrollments.courseId)

    // Build module → course map for lesson counting
    const modToCourse: Record<string, string> = {}
    allMods.forEach((m) => { modToCourse[m.id] = m.courseId })

    for (const c of myCourses) {
      statsMap[c.id] = { modules: 0, lessons: 0, students: 0 }
    }
    modRows.forEach((r) => {
      if (statsMap[r.courseId]) statsMap[r.courseId].modules = Number(r.cnt)
    })
    lessonRows.forEach((r) => {
      const cId = modToCourse[r.moduleId]
      if (cId && statsMap[cId]) statsMap[cId].lessons += Number(r.cnt)
    })
    enrollRows.forEach((r) => {
      if (statsMap[r.courseId]) statsMap[r.courseId].students = Number(r.cnt)
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Mis cursos</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          {myCourses.length} {myCourses.length === 1 ? "curso asignado" : "cursos asignados"}
        </p>
      </div>

      {myCourses.length === 0 ? (
        <NeonCard glow="none" className="p-12 text-center">
          <BookOpen className="size-12 text-[var(--text-muted)] mx-auto mb-4" />
          <p className="text-[var(--text-primary)] font-semibold">Sin cursos asignados</p>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Contacta a un administrador para que te asigne cursos como instructor.
          </p>
        </NeonCard>
      ) : (
        <div className="flex flex-col gap-4">
          {myCourses.map((course) => {
            const stats = statsMap[course.id] ?? { modules: 0, lessons: 0, students: 0 }
            return (
              <NeonCard key={course.id} glow="none" className="p-5">
                <div className="flex items-start gap-4">
                  {/* Thumbnail */}
                  {course.thumbnailUrl ? (
                    <img
                      src={course.thumbnailUrl}
                      alt={course.title}
                      className="size-16 rounded-[var(--radius-md)] object-cover shrink-0 bg-[var(--bg-overlay)]"
                    />
                  ) : (
                    <div className="size-16 rounded-[var(--radius-md)] bg-[var(--bg-overlay)] shrink-0 flex items-center justify-center">
                      <BookOpen className="size-6 text-[var(--text-muted)]" />
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <NeonBadge variant="cyan">{course.route}</NeonBadge>
                      <NeonBadge variant="neutral">{course.level}</NeonBadge>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          course.status === "published"
                            ? "bg-[var(--neon-cyan-dim)] text-[var(--neon-cyan)]"
                            : course.status === "draft"
                              ? "bg-amber-500/10 text-amber-400"
                              : "bg-[var(--bg-overlay)] text-[var(--text-muted)]"
                        }`}
                      >
                        {course.status}
                      </span>
                    </div>

                    <p className="font-semibold text-[var(--text-primary)] truncate">{course.title}</p>
                    <p className="text-sm text-[var(--text-muted)] mt-0.5 line-clamp-1">
                      {course.shortDescription}
                    </p>

                    {/* Stats row */}
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-[var(--text-muted)]">
                      <span className="flex items-center gap-1">
                        <Layers className="size-3.5" />
                        {stats.modules} módulos · {stats.lessons} lecciones
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="size-3.5" />
                        {stats.students} alumnos inscritos
                      </span>
                      {course.durationMinutes ? (
                        <span className="flex items-center gap-1">
                          <Clock className="size-3.5" />
                          {course.durationMinutes} min
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="shrink-0 flex flex-col items-end gap-2">
                    <Link
                      href={`/academia/cursos/${course.slug}`}
                      target="_blank"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-overlay)] border border-[var(--border-subtle)] transition-colors"
                    >
                      <Eye className="size-3.5" />
                      Ver público
                    </Link>
                  </div>
                </div>
              </NeonCard>
            )
          })}
        </div>
      )}
    </div>
  )
}
