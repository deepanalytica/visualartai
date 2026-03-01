import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { db } from "@/db"
import { enrollments, courses, lessons, progress } from "@/db/schema"
import { eq, and, asc } from "drizzle-orm"
import { NeonButton } from "@/components/brand/NeonButton"
import { NeonCard } from "@/components/brand/NeonCard"
import { MarkLessonCompleteButton } from "@/components/app/MarkLessonCompleteButton"
import { CheckCircle2, ArrowLeft, ArrowRight, Layers } from "lucide-react"

interface Props {
  params: { slug: string; lesson: string }
}

export default async function LessonPage({ params }: Props) {
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

  if (!enrollment) redirect(`/academia/cursos/${params.slug}`)

  // Get lesson
  const [lesson] = await db
    .select()
    .from(lessons)
    .where(and(eq(lessons.slug, params.lesson), eq(lessons.courseId, course.id)))
    .limit(1)

  if (!lesson) notFound()

  // Get all lessons in order for prev/next navigation
  const allLessons = await db
    .select({ id: lessons.id, slug: lessons.slug, title: lessons.title, order: lessons.order })
    .from(lessons)
    .where(eq(lessons.courseId, course.id))
    .orderBy(asc(lessons.order))

  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id)
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null

  // Check if lesson is completed
  const [lessonProgress] = await db
    .select()
    .from(progress)
    .where(and(eq(progress.userId, user.id), eq(progress.lessonId, lesson.id)))
    .limit(1)

  const isCompleted = lessonProgress?.completed ?? false

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
        <Link
          href={`/app/cursos/${params.slug}`}
          className="flex items-center gap-1 hover:text-[var(--neon-cyan)] transition-colors"
        >
          <Layers className="size-3.5" />
          {course.title}
        </Link>
        <span>›</span>
        <span className="text-[var(--text-secondary)] truncate max-w-xs">{lesson.title}</span>
      </div>

      {/* Video area */}
      <NeonCard glow="none" className="overflow-hidden">
        {lesson.videoUrl ? (
          <div className="aspect-video bg-black">
            <iframe
              src={lesson.videoUrl}
              className="w-full h-full"
              allowFullScreen
              allow="autoplay; fullscreen"
            />
          </div>
        ) : (
          <div className="aspect-video bg-gradient-to-br from-[var(--bg-overlay)] to-[var(--bg-void)] flex items-center justify-center">
            <p className="text-[var(--text-muted)] text-sm">Video próximamente disponible</p>
          </div>
        )}
      </NeonCard>

      {/* Lesson info + complete button */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex-1">
          <h1 className="font-display text-xl font-bold text-[var(--text-primary)] mb-2">
            {lesson.title}
          </h1>
          {lesson.description && (
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {lesson.description}
            </p>
          )}
        </div>
        <MarkLessonCompleteButton
          lessonId={lesson.id}
          courseSlug={params.slug}
          isCompleted={isCompleted}
          nextLessonSlug={nextLesson?.slug}
        />
      </div>

      {/* MDX content */}
      {lesson.mdxContent && (
        <NeonCard glow="none" className="p-8">
          <div
            className="prose-neon"
            dangerouslySetInnerHTML={{ __html: lesson.mdxContent }}
          />
        </NeonCard>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
        {prevLesson ? (
          <NeonButton
            href={`/app/cursos/${params.slug}/${prevLesson.slug}`}
            variant="ghost-neon"
            size="sm"
          >
            <ArrowLeft className="size-4" />
            <span className="hidden sm:inline truncate max-w-32">{prevLesson.title}</span>
            <span className="sm:hidden">Anterior</span>
          </NeonButton>
        ) : (
          <div />
        )}

        {isCompleted && (
          <div className="flex items-center gap-1.5 text-xs text-[var(--neon-cyan)]">
            <CheckCircle2 className="size-4" />
            Completada
          </div>
        )}

        {nextLesson ? (
          <NeonButton
            href={`/app/cursos/${params.slug}/${nextLesson.slug}`}
            variant="ghost-neon"
            size="sm"
          >
            <span className="hidden sm:inline truncate max-w-32">{nextLesson.title}</span>
            <span className="sm:hidden">Siguiente</span>
            <ArrowRight className="size-4" />
          </NeonButton>
        ) : (
          <NeonButton href={`/app/cursos/${params.slug}`} variant="neon" size="sm">
            Ver resumen <ArrowRight className="size-4" />
          </NeonButton>
        )}
      </div>
    </div>
  )
}
