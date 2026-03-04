import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { db } from "@/db"
import { courses, enrollments, profiles, progress, modules, lessons } from "@/db/schema"
import { eq, inArray, desc, count } from "drizzle-orm"
import { NeonCard } from "@/components/brand/NeonCard"
import { NeonBadge } from "@/components/brand/NeonBadge"
import { Users, BookOpen, CheckCircle2, Clock } from "lucide-react"

export const metadata = { title: "Mentor — Alumnos" }

export default async function MentorAlumnosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  // Get courses by this instructor
  const myCourses = await db
    .select({ id: courses.id, title: courses.title, slug: courses.slug })
    .from(courses)
    .where(eq(courses.instructorId, user.id))

  const courseIds = myCourses.map((c) => c.id)
  const courseMap = Object.fromEntries(myCourses.map((c) => [c.id, c]))

  if (courseIds.length === 0) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Alumnos</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">Sin cursos asignados aún.</p>
        </div>
        <NeonCard glow="none" className="p-12 text-center">
          <Users className="size-12 text-[var(--text-muted)] mx-auto mb-4" />
          <p className="text-[var(--text-primary)] font-semibold">No tienes cursos asignados</p>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Cuando tengas cursos como instructor, aquí verás a tus alumnos.
          </p>
        </NeonCard>
      </div>
    )
  }

  // Get all active enrollments for my courses
  const allEnrollments = await db
    .select({
      id: enrollments.id,
      userId: enrollments.userId,
      courseId: enrollments.courseId,
      status: enrollments.status,
      grantedAt: enrollments.grantedAt,
    })
    .from(enrollments)
    .where(inArray(enrollments.courseId, courseIds))
    .orderBy(desc(enrollments.grantedAt))

  const userIds = [...new Set(allEnrollments.map((e) => e.userId))]

  // Fetch student profiles
  const studentProfiles = userIds.length > 0
    ? await db
        .select({ id: profiles.id, fullName: profiles.fullName, email: profiles.email, avatarUrl: profiles.avatarUrl })
        .from(profiles)
        .where(inArray(profiles.id, userIds))
    : []
  const profileMap = Object.fromEntries(studentProfiles.map((p) => [p.id, p]))

  // For each enrollment, compute progress percentage
  // Get all lessons for my courses via modules
  const allMods = courseIds.length > 0
    ? await db.select({ id: modules.id, courseId: modules.courseId }).from(modules).where(inArray(modules.courseId, courseIds))
    : []
  const modIds = allMods.map((m) => m.id)
  const modToCourse: Record<string, string> = {}
  allMods.forEach((m) => { modToCourse[m.id] = m.courseId })

  const allLessons = modIds.length > 0
    ? await db.select({ id: lessons.id, moduleId: lessons.moduleId }).from(lessons).where(inArray(lessons.moduleId, modIds))
    : []

  // lessonIds per course
  const lessonsByCourse: Record<string, string[]> = {}
  for (const cId of courseIds) lessonsByCourse[cId] = []
  allLessons.forEach((l) => {
    const cId = modToCourse[l.moduleId]
    if (cId) lessonsByCourse[cId].push(l.id)
  })

  // Get progress rows for all involved users + lessons
  const allLessonIds = allLessons.map((l) => l.id)
  const progressRows = userIds.length > 0 && allLessonIds.length > 0
    ? await db
        .select({ userId: progress.userId, lessonId: progress.lessonId })
        .from(progress)
        .where(inArray(progress.userId, userIds))
    : []

  // Build set: userId+lessonId
  const completedSet = new Set(progressRows.map((p) => `${p.userId}:${p.lessonId}`))

  function getProgressPct(userId: string, courseId: string) {
    const lIds = lessonsByCourse[courseId] ?? []
    if (lIds.length === 0) return 0
    const done = lIds.filter((lid) => completedSet.has(`${userId}:${lid}`)).length
    return Math.round((done / lIds.length) * 100)
  }

  // Group enrollments by student for summary
  const studentSummary = userIds.map((uid) => {
    const studentEnrollments = allEnrollments.filter((e) => e.userId === uid)
    const profile = profileMap[uid]
    return { uid, profile, enrollments: studentEnrollments }
  })

  // Count stats
  const totalStudents = userIds.length
  const totalEnrollments = allEnrollments.length
  const completedEnrollments = allEnrollments.filter((e) => getProgressPct(e.userId, e.courseId) === 100).length

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)]">Alumnos</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Seguimiento de alumnos inscritos en tus cursos.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4">
        <NeonCard glow="none" className="p-4">
          <p className="text-xs text-[var(--text-muted)] mb-1">Alumnos únicos</p>
          <p className="text-2xl font-bold font-display text-[var(--neon-cyan)]">{totalStudents}</p>
        </NeonCard>
        <NeonCard glow="none" className="p-4">
          <p className="text-xs text-[var(--text-muted)] mb-1">Inscripciones totales</p>
          <p className="text-2xl font-bold font-display text-[var(--neon-violet)]">{totalEnrollments}</p>
        </NeonCard>
        <NeonCard glow="none" className="p-4">
          <p className="text-xs text-[var(--text-muted)] mb-1">Cursos completados</p>
          <p className="text-2xl font-bold font-display text-[var(--neon-magenta)]">{completedEnrollments}</p>
        </NeonCard>
      </div>

      {/* Student list */}
      {studentSummary.length === 0 ? (
        <NeonCard glow="none" className="p-12 text-center">
          <Users className="size-12 text-[var(--text-muted)] mx-auto mb-4" />
          <p className="text-[var(--text-primary)] font-semibold">Sin alumnos todavía</p>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Cuando alguien se inscriba en tus cursos, aparecerá aquí.
          </p>
        </NeonCard>
      ) : (
        <NeonCard glow="none" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border-subtle)]">
                  <th className="text-left p-4 text-xs text-[var(--text-muted)] font-medium">Alumno</th>
                  <th className="text-left p-4 text-xs text-[var(--text-muted)] font-medium">Curso</th>
                  <th className="text-left p-4 text-xs text-[var(--text-muted)] font-medium">Progreso</th>
                  <th className="text-left p-4 text-xs text-[var(--text-muted)] font-medium">Inscrito</th>
                  <th className="text-left p-4 text-xs text-[var(--text-muted)] font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                {allEnrollments.map((enroll) => {
                  const profile = profileMap[enroll.userId]
                  const course = courseMap[enroll.courseId]
                  const pct = getProgressPct(enroll.userId, enroll.courseId)
                  return (
                    <tr
                      key={enroll.id}
                      className="border-b border-[var(--border-subtle)] last:border-0 hover:bg-[var(--bg-overlay)] transition-colors"
                    >
                      {/* Alumno */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {profile?.avatarUrl ? (
                            <img
                              src={profile.avatarUrl}
                              alt={profile.fullName ?? ""}
                              className="size-8 rounded-full object-cover bg-[var(--bg-overlay)]"
                            />
                          ) : (
                            <div className="size-8 rounded-full bg-[var(--neon-cyan-dim)] flex items-center justify-center text-[var(--neon-cyan)] text-xs font-bold shrink-0">
                              {(profile?.fullName ?? profile?.email ?? "?")[0].toUpperCase()}
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-medium text-[var(--text-primary)] truncate max-w-[140px]">
                              {profile?.fullName ?? "Sin nombre"}
                            </p>
                            <p className="text-xs text-[var(--text-muted)] truncate max-w-[140px]">
                              {profile?.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Curso */}
                      <td className="p-4">
                        <p className="text-[var(--text-secondary)] truncate max-w-[160px]">
                          {course?.title ?? "—"}
                        </p>
                      </td>

                      {/* Progreso */}
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 rounded-full bg-[var(--bg-overlay)] overflow-hidden">
                            <div
                              className="h-full rounded-full bg-[var(--neon-cyan)] transition-all"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-xs text-[var(--text-muted)] shrink-0">{pct}%</span>
                          {pct === 100 && (
                            <CheckCircle2 className="size-4 text-[var(--neon-cyan)] shrink-0" />
                          )}
                        </div>
                      </td>

                      {/* Inscrito */}
                      <td className="p-4">
                        <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                          <Clock className="size-3" />
                          {enroll.grantedAt
                            ? new Date(enroll.grantedAt).toLocaleDateString("es-CL")
                            : "—"}
                        </span>
                      </td>

                      {/* Estado */}
                      <td className="p-4">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            enroll.status === "active"
                              ? "bg-[var(--neon-cyan-dim)] text-[var(--neon-cyan)]"
                              : "bg-[var(--bg-overlay)] text-[var(--text-muted)]"
                          }`}
                        >
                          {enroll.status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </NeonCard>
      )}
    </div>
  )
}
