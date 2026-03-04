import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { db } from "@/db"
import { enrollments, courses, modules, lessons, progress } from "@/db/schema"
import { eq, and, asc, inArray } from "drizzle-orm"
import { NeonCard } from "@/components/brand/NeonCard"
import { NeonBadge } from "@/components/brand/NeonBadge"
import { NeonButton } from "@/components/brand/NeonButton"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Lock, PlayCircle, Clock, Layers } from "lucide-react"

export const metadata = { title: "Contenido del curso" }

interface Props {
  params: { slug: string }
}

export default async function CoursePlayerPage({ params }: Props) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  // Get course
  const [course] = await db.select().from(courses).where(eq(courses.slug, params.slug)).limit(1)
  if (!course) notFound()

  // Check enrollment
  const [enrollment] = await db
    .select()
    .from(enrollments)
    .where(and(eq(enrollments.userId, user.id), eq(enrollments.courseId, course.id), eq(enrollments.status, "active")))
    .limit(1)

  if (!enrollment) {
    redirect(`/academia/cursos/${params.slug}`)
  }

  // Get modules ordered correctly (sortOrder, not order)
  const courseModules = await db
    .select()
    .from(modules)
    .where(eq(modules.courseId, course.id))
    .orderBy(asc(modules.sortOrder))

  const moduleIds = courseModules.map((m) => m.id)

  // Get lessons via inArray on moduleId (lessons have no courseId column)
  const courseLessons =
    moduleIds.length > 0
      ? await db
        .select()
        .from(lessons)
        .where(inArray(lessons.moduleId, moduleIds))
        .orderBy(asc(lessons.sortOrder))
      : []

  // Get user progress for these lessons — a row existing = completed
  const userProgress =
    courseLessons.length > 0
      ? await db
        .select({ lessonId: progress.lessonId })
        .from(progress)
        .where(
          and(
            eq(progress.userId, user.id),
            inArray(
              progress.lessonId,
              courseLessons.map((l) => l.id)
            )
          )
        )
      : []

  const completedLessonIds = new Set(userProgress.map((p) => p.lessonId))

  const lessonsByModule = courseModules.map((mod) => ({
    ...mod,
    lessons: courseLessons.filter((l) => l.moduleId === mod.id),
  }))

  const totalLessons = courseLessons.length
  const completedCount = courseLessons.filter((l) => completedLessonIds.has(l.id)).length
  const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

  // Find next lesson to continue
  const nextLesson = courseLessons.find((l) => !completedLessonIds.has(l.id))

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap gap-2 mb-3">
          <NeonBadge variant="cyan">{course.route}</NeonBadge>
          <NeonBadge variant="neutral">{course.level}</NeonBadge>
        </div>
        <h1 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-2">
          {course.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-[var(--text-muted)] mb-4">
          <span className="flex items-center gap-1">
            <Layers className="size-4" />
            {courseModules.length} módulos
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-4" />
            {course.durationMinutes ?? "~"} min total
          </span>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3">
          <Progress value={progressPct} className="flex-1 h-2" />
          <span className="text-sm font-medium text-[var(--text-primary)] shrink-0">
            {progressPct}%
          </span>
        </div>
        <p className="text-xs text-[var(--text-muted)] mt-1">
          {completedCount} / {totalLessons} lecciones completadas
        </p>
      </div>

      {/* Continue button */}
      {nextLesson && (
        <NeonButton
          href={`/app/cursos/${params.slug}/${nextLesson.slug}`}
          variant="neon"
          size="lg"
        >
          {completedCount === 0 ? "Empezar curso" : "Continuar"} →{" "}
          {nextLesson.title}
        </NeonButton>
      )}

      {progressPct === 100 && (
        <NeonCard glow="violet" className="p-6 text-center">
          <CheckCircle2 className="size-10 text-[var(--neon-violet)] mx-auto mb-3" />
          <p className="font-semibold text-[var(--text-primary)]">
            ¡Completaste este curso!
          </p>
        </NeonCard>
      )}

      {/* Modules & Lessons list */}
      <div className="flex flex-col gap-3">
        {lessonsByModule.map((mod) => {
          const modCompleted = mod.lessons.filter((l) => completedLessonIds.has(l.id)).length
          return (
            <details key={mod.id} className="group" open>
              <summary className="flex items-center justify-between p-5 cursor-pointer rounded-t-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] transition-colors list-none">
                <div>
                  <p className="font-semibold text-[var(--text-primary)] text-sm">{mod.title}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    {modCompleted}/{mod.lessons.length} lecciones
                  </p>
                </div>
              </summary>
              <div className="border border-t-0 border-[var(--border-subtle)] rounded-b-[var(--radius-md)] overflow-hidden">
                {mod.lessons.map((lesson) => {
                  const done = completedLessonIds.has(lesson.id)
                  const isNext = lesson.id === nextLesson?.id
                  return (
                    <Link
                      key={lesson.id}
                      href={`/app/cursos/${params.slug}/${lesson.slug}`}
                      className={`flex items-center gap-4 px-5 py-3.5 border-b border-[var(--border-subtle)] last:border-0 hover:bg-[var(--bg-overlay)] transition-colors ${isNext ? "bg-[var(--neon-cyan-dim)]" : ""
                        }`}
                    >
                      {done ? (
                        <CheckCircle2 className="size-5 text-[var(--neon-cyan)] shrink-0" />
                      ) : lesson.isFreePreview ? (
                        <PlayCircle className="size-5 text-[var(--neon-violet)] shrink-0" />
                      ) : (
                        <Lock className="size-5 text-[var(--text-muted)] shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm ${done
                            ? "text-[var(--text-muted)] line-through"
                            : isNext
                              ? "text-[var(--neon-cyan)] font-medium"
                              : "text-[var(--text-secondary)]"
                            }`}
                        >
                          {lesson.title}
                        </p>
                      </div>
                      <span className="text-xs text-[var(--text-muted)] shrink-0">
                        {lesson.durationMin ?? "—"} min
                      </span>
                    </Link>
                  )
                })}
              </div>
            </details>
          )
        })}
      </div>
    </div>
  )
}
